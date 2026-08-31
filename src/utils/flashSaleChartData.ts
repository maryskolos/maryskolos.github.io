import type { LogLine } from '@/utils/flashSaleSimulator';

export interface ChartSeries {
  naive: ChartPoint[];
  fixed: ChartPoint[];
}

export interface ChartPoint {
  t: number;
  rps: number;
  p95Ms: number;
  errorRate: number;
  activeHolds: number;
}

const DEFAULT_BUCKETS = 56;

function p95(values: number[]) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))];
}

function isError(line: LogLine) {
  return line.status >= 400;
}

/** Deterministic 0..1 from integers (stable per run's log content) */
function hash01(...parts: number[]) {
  let h = 2166136261;
  for (const p of parts) {
    h ^= Math.imul(p | 0, 16777619);
    h = Math.imul(h, 2246822519);
  }
  return ((h >>> 0) % 10000) / 10000;
}

/**
 * Map each log line onto the checkout window with a flash-sale load shape:
 * heavy early rush, mid plateau, taper — plus jitter so buckets aren't uniform.
 */
function timedLines(lines: LogLine[], durationSec: number) {
  return lines.map((line, idx) => {
    const u = hash01(idx, line.ms, line.status, line.path.length);
    const v = hash01(line.ms, idx * 13, line.status);

    // Mixture: 50% early rush, 30% mid, 20% long tail
    let t: number;
    if (u < 0.5) {
      t = durationSec * 0.32 * Math.pow(v, 0.55);
    } else if (u < 0.8) {
      t = durationSec * (0.28 + 0.4 * v);
    } else {
      t = durationSec * (0.65 + 0.33 * v);
    }

    // Path-type bias: holds slightly earlier, completes later in the rush
    if (line.path.includes('/hold')) t *= 0.92;
    if (line.path.includes('/complete')) t = Math.min(durationSec * 0.98, t * 1.08 + durationSec * 0.04);
    if (line.path.includes('/inventory') && line.method === 'GET') t *= 0.15 + v * 0.1;

    const jitter = (hash01(idx * 7, line.ms) - 0.5) * (durationSec / 28);
    return {
      line,
      t: Math.min(durationSec * 0.995, Math.max(0.01, t + jitter)),
    };
  });
}

function smoothSeries(points: ChartPoint[]): ChartPoint[] {
  // Keep edges sharp — only a light 3-point blend so charts don't look like soft Bezier waves
  if (points.length < 3) return points;
  return points.map((p, i) => {
    if (i === 0 || i === points.length - 1) return p;
    const prev = points[i - 1];
    const next = points[i + 1];
    return {
      ...p,
      rps: Math.round(prev.rps * 0.15 + p.rps * 0.7 + next.rps * 0.15),
      p95Ms: Math.round(prev.p95Ms * 0.1 + p.p95Ms * 0.8 + next.p95Ms * 0.1),
      errorRate: Math.round((prev.errorRate * 0.15 + p.errorRate * 0.7 + next.errorRate * 0.15) * 10) / 10,
    };
  });
}

/** Build telemetry buckets from the same log lines shown in the request panels */
export function buildChartSeriesFromLogs(
  naiveLines: LogLine[],
  fixedLines: LogLine[],
  durationSec: number,
  bucketCount = DEFAULT_BUCKETS
): ChartSeries {
  return {
    naive: seriesForStrategy(naiveLines, durationSec, bucketCount),
    fixed: seriesForStrategy(fixedLines, durationSec, bucketCount),
  };
}

function seriesForStrategy(lines: LogLine[], durationSec: number, bucketCount: number): ChartPoint[] {
  const bucketDuration = durationSec / bucketCount;
  const buckets: LogLine[][] = Array.from({ length: bucketCount }, () => []);

  if (lines.length === 0) {
    return Array.from({ length: bucketCount }, (_, i) => ({
      t: Math.round((i + 1) * bucketDuration * 10) / 10,
      rps: 0,
      p95Ms: 0,
      errorRate: 0,
      activeHolds: 0,
    }));
  }

  for (const { line, t } of timedLines(lines, durationSec)) {
    const bucket = Math.min(bucketCount - 1, Math.floor((t / durationSec) * bucketCount));
    buckets[bucket].push(line);
  }

  const rollingLatencies: number[] = [];
  let openHolds = 0;
  let emaRps = 0;

  const raw = buckets.map((bucketLines, i) => {
    for (const line of bucketLines) {
      rollingLatencies.push(line.ms);
      if (rollingLatencies.length > 18) rollingLatencies.shift();

      if (line.path.includes('/hold')) {
        if (line.status >= 200 && line.status < 300) openHolds += 1;
        if (line.status === 409) openHolds = Math.max(0, openHolds - 1);
      }
      if (line.path.includes('/complete') && line.status >= 200 && line.status < 300) {
        openHolds = Math.max(0, openHolds - 1);
      }
    }

    const instantRps = bucketLines.length / bucketDuration;
    // Light EMA so the area reads as a wave, not a picket fence
    emaRps = i === 0 ? instantRps : emaRps * 0.45 + instantRps * 0.55;

    // Blend bucket-local and rolling P95 so latency moves with the rush
    const local = bucketLines.map((l) => l.ms);
    const localP95 = local.length ? p95(local) : rollingLatencies.length ? p95(rollingLatencies) : 0;
    const rollP95 = rollingLatencies.length ? p95(rollingLatencies) : localP95;
    const p95Ms = Math.round(localP95 * 0.55 + rollP95 * 0.45);

    const errors = bucketLines.filter(isError).length;
    const errorRate =
      bucketLines.length > 0 ? Math.round((errors / bucketLines.length) * 1000) / 10 : 0;

    // Tiny hash noise so empty-ish buckets aren't perfectly flat zeros next to peaks
    const texture = hash01(i, bucketLines.length, p95Ms) * 0.08;

    return {
      t: Math.round((i + 1) * bucketDuration * 10) / 10,
      rps: Math.max(0, Math.round(emaRps * (1 + texture))),
      p95Ms,
      errorRate,
      activeHolds: Math.max(0, openHolds),
    };
  });

  return smoothSeries(raw);
}

/** Map log playback progress to chart bucket index */
export function logProgressToChartIndex(visibleLogCount: number, totalLogs: number, chartLength: number) {
  if (totalLogs <= 0 || chartLength <= 0) return 0;
  const ratio = Math.min(1, visibleLogCount / totalLogs);
  // Ease so the playhead lingers a bit in the early rush
  const eased = Math.pow(ratio, 0.85);
  return Math.min(chartLength - 1, Math.max(0, Math.floor(eased * chartLength)));
}
