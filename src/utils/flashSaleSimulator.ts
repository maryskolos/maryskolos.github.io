import type { FlashSaleScenarioId } from '@/constants/flashSaleLab';

export interface LogLine {
  id: string;
  method: string;
  path: string;
  status: number;
  ms: number;
  note?: string;
}

export interface RunMetrics {
  successfulCheckouts: number;
  oversells: number;
  timeouts: number;
  p95Latency: number;
}

export type CheckoutStrategy = 'naive' | 'fixed';

export interface SimulateRunResult {
  lines: LogLine[];
  metrics: RunMetrics;
}

function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function holdPath(sku: string) {
  return `/api/v1/inventory/${sku}/hold`;
}

function completePath() {
  return '/api/v1/checkout/complete';
}

function latency(rng: () => number, base: number, jitter: number) {
  return Math.max(1, Math.round(base + rng() * jitter));
}

/** Integer in [min, max] inclusive */
function intBetween(rng: () => number, min: number, max: number) {
  if (max <= min) return min;
  return min + Math.floor(rng() * (max - min + 1));
}

/** Scale a count with buyers + run jitter, clamped */
function scaledCount(
  rng: () => number,
  buyers: number,
  base: number,
  perBuyer: number,
  min: number,
  max: number,
  jitterFrac = 0.25
) {
  const raw = base + buyers * perBuyer;
  const jitter = raw * jitterFrac * (rng() * 2 - 1);
  return Math.min(max, Math.max(min, Math.round(raw + jitter)));
}

export function simulateRun(
  scenario: FlashSaleScenarioId,
  concurrentBuyers: number,
  strategy: CheckoutStrategy,
  sku: string,
  stock: number,
  runSeed: number
): SimulateRunResult {
  const strategySalt = strategy === 'naive' ? 0x9e3779b9 : 0x85ebca6b;
  const rng = createRng(runSeed ^ strategySalt);

  const lines: LogLine[] = [];
  let id = 0;
  const add = (line: Omit<LogLine, 'id'>) => {
    lines.push({ ...line, id: String(id++) });
  };

  const buyers = Math.min(Math.max(concurrentBuyers, 10), 500);
  const load = buyers / 100; // 0.1 .. 5
  const winner = 800 + intBetween(rng, 0, 80);

  if (strategy === 'naive') {
    // Contention grows with load — latencies and failure volume climb
    const holdBase = 22 + load * 8;
    const holdJitter = 28 + load * 40;
    const completeBase = 95 + load * 45;
    const completeJitter = 120 + load * 180;

    add({
      method: 'GET',
      path: `/api/v1/inventory/${sku}`,
      status: 200,
      ms: latency(rng, 12 + load * 4, 10 + load * 8),
      note: `qty=${stock} (flash sale armed)`,
    });

    // Many clients "think" they held inventory (race) — scales hard with buyers
    const raceCount = scaledCount(rng, buyers, 8, 0.12, 8, 90);
    for (let i = 0; i < raceCount; i++) {
      add({
        method: 'POST',
        path: holdPath(sku),
        status: 200,
        ms: latency(rng, holdBase, holdJitter),
        note: `buyer=#${winner + i}`,
      });
    }

    // First `stock` completes succeed; remaining are oversells (402)
    const oversellAttempts = scaledCount(rng, buyers, 2 + stock, 0.045, stock + 1, 48);
    let naiveSuccesses = 0;
    let oversells = 0;
    for (let i = 0; i < oversellAttempts; i++) {
      const isSuccess = naiveSuccesses < stock;
      if (isSuccess) {
        naiveSuccesses += 1;
        add({
          method: 'POST',
          path: completePath(),
          status: 200,
          ms: latency(rng, completeBase, completeJitter),
          note: `buyer=#${winner + i}`,
        });
      } else {
        oversells += 1;
        add({
          method: 'POST',
          path: completePath(),
          status: 402,
          ms: latency(rng, completeBase * 0.9, completeJitter),
          note: `buyer=#${winner + i} oversold`,
        });
      }
    }

    if (scenario === 'timeout-storm') {
      const timeouts = scaledCount(rng, buyers, 2, 0.035, 2, 28);
      for (let i = 0; i < timeouts; i++) {
        add({
          method: 'POST',
          path: completePath(),
          status: 504,
          ms: latency(rng, 2200 + load * 400, 800 + load * 500),
          note: `buyer=#${winner + 400 + i} gateway timeout`,
        });
      }
    }

    if (scenario === 'hold-expiry') {
      const expired = scaledCount(rng, buyers, 1, 0.02, 1, 12);
      for (let i = 0; i < expired; i++) {
        add({
          method: 'POST',
          path: completePath(),
          status: 409,
          ms: latency(rng, 70 + load * 20, 40 + load * 30),
          note: `buyer=#${winner + 500 + i} hold expired`,
        });
      }
    }

    const rejected = scaledCount(rng, buyers, 4, 0.06, 4, 60);
    for (let i = 0; i < rejected; i++) {
      add({
        method: 'POST',
        path: holdPath(sku),
        status: 409,
        ms: latency(rng, 28 + load * 6, 20 + load * 18),
        note: `buyer=#${winner + raceCount + i} (no stock)`,
      });
    }

    // Extra read traffic under load so P95 / chart volume move with buyers
    const peekReads = scaledCount(rng, buyers, 2, 0.02, 2, 16);
    for (let i = 0; i < peekReads; i++) {
      add({
        method: 'GET',
        path: `/api/v1/inventory/${sku}`,
        status: 200,
        ms: latency(rng, 14 + load * 5, 12 + load * 10),
        note: i === peekReads - 1 ? `qty=${Math.max(0, stock - naiveSuccesses)}` : 'qty check',
      });
    }
  } else {
    // Fixed path: inventory holds serialize access — latency rises gently with load,
    // but oversells stay 0 and success stays at stock.
    const holdBase = 30 + load * 4;
    const holdJitter = 16 + load * 12;
    const completeBase = 110 + load * 18;
    const completeJitter = 40 + load * 35;

    add({
      method: 'GET',
      path: `/api/v1/inventory/${sku}`,
      status: 200,
      ms: latency(rng, 12 + load * 2, 8 + load * 4),
      note: `qty=${stock}`,
    });

    // Contention shows up as rejected holds, not oversells
    const rejected = scaledCount(rng, buyers, 6, 0.1, 6, 120);
    // Interleave: successful holds/completes for each unit, surrounded by rejects
    const rejectBefore = Math.floor(rejected * (0.35 + rng() * 0.2));
    const rejectAfter = rejected - rejectBefore;

    for (let i = 0; i < rejectBefore; i++) {
      add({
        method: 'POST',
        path: holdPath(sku),
        status: 409,
        ms: latency(rng, holdBase * 0.85, holdJitter),
        note: `buyer=#${winner + 1 + i} (no stock)`,
      });
    }

    const sold = stock;
    for (let i = 0; i < sold; i++) {
      const buyerId = winner + (i === 0 ? 0 : 200 + i);
      add({
        method: 'POST',
        path: holdPath(sku),
        status: 200,
        ms: latency(rng, holdBase, holdJitter),
        note: `buyer=#${buyerId}`,
      });
      add({
        method: 'POST',
        path: completePath(),
        status: 200,
        ms: latency(rng, completeBase, completeJitter),
        note: `buyer=#${buyerId} idempotency-key=k${i + 1}`,
      });
    }

    // Idempotent client retry — same sale, not another unit
    if (rng() > 0.15) {
      add({
        method: 'POST',
        path: completePath(),
        status: 200,
        ms: latency(rng, 8 + load * 2, 6 + load * 4),
        note: `buyer=#${winner} idempotency-key=k1 (replay)`,
      });
    }

    for (let i = 0; i < rejectAfter; i++) {
      add({
        method: 'POST',
        path: holdPath(sku),
        status: 409,
        ms: latency(rng, holdBase * 0.85, holdJitter),
        note: `buyer=#${winner + rejectBefore + 1 + i} (no stock)`,
      });
    }

    if (scenario === 'timeout-storm') {
      // Occasional gateway blip — recovered; count scales lightly with load
      const blips = scaledCount(rng, buyers, 0, 0.008, 0, 4);
      for (let i = 0; i < blips; i++) {
        add({
          method: 'POST',
          path: completePath(),
          status: 504,
          ms: latency(rng, 900 + load * 120, 280 + load * 150),
          note: `buyer=#${910 + i} gateway timeout (recovered on retry)`,
        });
        add({
          method: 'POST',
          path: completePath(),
          status: 200,
          ms: latency(rng, 12, 8),
          note: `buyer=#${910 + i} idempotency-key=retry${i} (replay)`,
        });
      }
    }

    if (scenario === 'hold-expiry') {
      const expired = scaledCount(rng, buyers, 1, 0.012, 1, 8);
      for (let i = 0; i < expired; i++) {
        add({
          method: 'POST',
          path: completePath(),
          status: 409,
          ms: latency(rng, 80 + load * 10, 28 + load * 16),
          note: `buyer=#${900 + i} hold expired (blocked)`,
        });
      }
    }

    const peekReads = scaledCount(rng, buyers, 1, 0.015, 1, 10);
    for (let i = 0; i < peekReads; i++) {
      add({
        method: 'GET',
        path: `/api/v1/inventory/${sku}`,
        status: 200,
        ms: latency(rng, 12 + load * 2, 8 + load * 5),
        note: i === peekReads - 1 ? 'qty=0' : 'qty check',
      });
    }
  }

  return { lines, metrics: metricsFromLines(lines) };
}

/** Derive live metrics from visible log lines during playback */
export function metricsFromLines(lines: LogLine[]): RunMetrics {
  let successfulCheckouts = 0;
  let oversells = 0;
  let timeouts = 0;
  const latencies: number[] = [];

  for (const line of lines) {
    latencies.push(line.ms);
    if (line.path.includes('/complete')) {
      // Idempotent replays return 200 but are the same sale — don't double-count
      if (line.status >= 200 && line.status < 300 && !line.note?.includes('(replay)')) {
        successfulCheckouts += 1;
      }
      if (line.status === 402 || line.note?.includes('oversold')) oversells += 1;
      if (line.status === 504) timeouts += 1;
    }
    if (line.status === 409 && line.note?.includes('hold expired')) timeouts += 1;
  }

  const sorted = [...latencies].sort((a, b) => a - b);
  const p95Latency = sorted.length
    ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))]
    : 0;

  return { successfulCheckouts, oversells, timeouts, p95Latency };
}

export function runPasses(metrics: RunMetrics, strategy: CheckoutStrategy) {
  if (strategy === 'naive') return false;
  return metrics.oversells === 0 && metrics.successfulCheckouts >= 1 && metrics.p95Latency < 2000;
}

export function recommendation(
  strategy: CheckoutStrategy,
  passes: boolean,
  concurrentBuyers: number
): string {
  if (passes) {
    return `Hold + idempotent complete passes at ${concurrentBuyers} concurrent buyers - ready for launch review.`;
  }
  if (strategy === 'naive') {
    return 'Enable inventory holds and idempotent checkout before high-traffic launch.';
  }
  return 'Review timeout handling and hold TTL before production cutover.';
}
