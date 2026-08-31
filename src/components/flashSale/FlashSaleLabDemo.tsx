'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Slider,
  Chip,
  LinearProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { sectionInsetX } from '@/styles/commonStyles';
import {
  FSL_CLIENT,
  FSL_ENDPOINTS,
  FSL_SCENARIOS,
  type FlashSaleScenarioId,
} from '@/constants/flashSaleLab';
import {
  simulateRun,
  runPasses,
  recommendation,
  metricsFromLines,
  type LogLine,
  type RunMetrics,
} from '@/utils/flashSaleSimulator';
import FlashSaleMetricsChart from '@/components/flashSale/FlashSaleMetricsChart';

type RunSession = {
  naiveLines: LogLine[];
  fixedLines: LogLine[];
  naiveMetrics: RunMetrics;
  fixedMetrics: RunMetrics;
};

type RunPhase = 'idle' | 'running' | 'done';

const panelSx = {
  bgcolor: flashSaleColors.bgPanel,
  border: `1px solid ${flashSaleColors.border}`,
  borderRadius: 2.5,
  overflow: 'hidden',
};

const sectionGap = { xs: 4, md: 5 };

function statusColor(status: number) {
  if (status >= 200 && status < 300) return flashSaleColors.pass;
  if (status >= 400 && status < 500) return flashSaleColors.amber;
  return flashSaleColors.fail;
}

function LogPanel({
  title,
  tint,
  lines,
  visibleCount,
  running,
}: {
  title: string;
  tint: 'fail' | 'pass';
  lines: LogLine[];
  visibleCount: number;
  running: boolean;
}) {
  const visible = lines.slice(0, visibleCount);
  const bg = tint === 'fail' ? flashSaleColors.failBg : flashSaleColors.passBg;
  const border = tint === 'fail' ? 'rgba(239,68,68,0.28)' : 'rgba(34,197,94,0.28)';

  return (
    <Paper elevation={0} sx={{ ...panelSx, borderColor: border, bgcolor: bg, height: '100%' }}>
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          borderBottom: `1px solid ${flashSaleColors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: flashSaleColors.text,
            fontWeight: 600,
            fontFamily: flashSaleColors.display,
            fontSize: '0.9rem',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </Typography>
        {running && (
          <Chip
            label="Live"
            size="small"
            sx={{
              height: 22,
              bgcolor: tint === 'fail' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
              color: tint === 'fail' ? flashSaleColors.fail : flashSaleColors.pass,
              fontFamily: flashSaleColors.mono,
              fontSize: '0.65rem',
              fontWeight: 700,
              animation: 'pulse 1.2s ease-in-out infinite',
              '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.55 } },
            }}
          />
        )}
      </Box>
      <Box
        role="log"
        aria-live="polite"
        aria-label={`${title} request log`}
        sx={{
          height: { xs: 240, md: 320 },
          overflow: 'auto',
          p: 2,
          fontFamily: flashSaleColors.mono,
          fontSize: { xs: '0.68rem', md: '0.74rem' },
          lineHeight: 1.7,
        }}
      >
        {visible.map((line) => (
          <Box
            key={line.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: '42px 1fr auto auto',
              gap: { xs: 0.75, md: 1.25 },
              mb: 1,
              color: flashSaleColors.textMuted,
              alignItems: 'baseline',
            }}
          >
            <Box component="span" sx={{ color: flashSaleColors.amber, fontWeight: 600 }}>
              {line.method}
            </Box>
            <Box component="span" sx={{ color: flashSaleColors.text, wordBreak: 'break-all' }}>
              {line.path}
            </Box>
            <Box component="span" sx={{ color: statusColor(line.status), fontWeight: 700 }}>
              {line.status}
            </Box>
            <Box component="span" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {line.ms}ms
            </Box>
            {line.note && (
              <Box
                component="span"
                sx={{
                  gridColumn: '2 / -1',
                  color: flashSaleColors.textMuted,
                  opacity: 0.9,
                  fontSize: '0.92em',
                }}
              >
                {line.note}
              </Box>
            )}
          </Box>
        ))}
        {visible.length === 0 && (
          <Typography
            variant="body2"
            sx={{ color: flashSaleColors.textMuted, fontStyle: 'italic', fontFamily: flashSaleColors.sans }}
          >
            Hit Run test to stream simulated requests…
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Box
      sx={{
        bgcolor: flashSaleColors.bgElevated,
        border: `1px solid ${flashSaleColors.border}`,
        borderRadius: 2,
        px: 1.5,
        py: 1.25,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: flashSaleColors.textMuted,
          display: 'block',
          mb: 0.5,
          fontSize: '0.68rem',
          fontFamily: flashSaleColors.sans,
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: flashSaleColors.text,
          fontWeight: 700,
          fontFamily: flashSaleColors.mono,
          fontSize: '1.15rem',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function FlashSaleLabDemo() {
  const [scenarioId, setScenarioId] = useState<FlashSaleScenarioId>('last-unit');
  const [concurrentBuyers, setConcurrentBuyers] = useState(200);
  const [phase, setPhase] = useState<RunPhase>('idle');
  const [visibleCount, setVisibleCount] = useState(0);
  const [session, setSession] = useState<RunSession | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const scenario = FSL_SCENARIOS.find((s) => s.id === scenarioId) ?? FSL_SCENARIOS[0];
  const running = phase === 'running';
  const runComplete = phase === 'done';

  const maxLines = session
    ? Math.max(session.naiveLines.length, session.fixedLines.length)
    : 0;
  const progress = maxLines > 0 ? Math.round((visibleCount / maxLines) * 100) : 0;

  const liveNaiveMetrics = session
    ? metricsFromLines(session.naiveLines.slice(0, visibleCount))
    : null;
  const liveFixedMetrics = session
    ? metricsFromLines(session.fixedLines.slice(0, visibleCount))
    : null;

  const displayNaiveMetrics = runComplete && session ? session.naiveMetrics : liveNaiveMetrics;
  const displayFixedMetrics = runComplete && session ? session.fixedMetrics : liveFixedMetrics;

  const applyScenario = (id: FlashSaleScenarioId) => {
    const next = FSL_SCENARIOS.find((s) => s.id === id)!;
    setScenarioId(id);
    setConcurrentBuyers(next.defaultBuyers);
    setPhase('idle');
    setVisibleCount(0);
    setSession(null);
  };

  const runTest = () => {
    if (running) return;

    const runSeed = (Math.random() * 0xffffffff) >>> 0;
    const naive = simulateRun(scenarioId, concurrentBuyers, 'naive', FSL_CLIENT.sku, scenario.stock, runSeed);
    const fixed = simulateRun(scenarioId, concurrentBuyers, 'fixed', FSL_CLIENT.sku, scenario.stock, runSeed);

    setSession({
      naiveLines: naive.lines,
      fixedLines: fixed.lines,
      naiveMetrics: naive.metrics,
      fixedMetrics: fixed.metrics,
    });
    setVisibleCount(0);
    setPhase('running');

    requestAnimationFrame(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  useEffect(() => {
    if (phase !== 'running' || !session) return;

    const total = Math.max(session.naiveLines.length, session.fixedLines.length);
    if (total === 0 || visibleCount >= total) {
      setPhase('done');
      return;
    }

    const timer = window.setTimeout(() => {
      const remaining = total - visibleCount;
      // Keep runs snappy when high buyer counts produce long logs
      const step = total > 160 ? 4 : total > 90 ? 2 : 1;
      setVisibleCount((prev) => Math.min(total, prev + Math.min(step, remaining)));
    }, total > 120 ? 40 : 65);

    return () => window.clearTimeout(timer);
  }, [phase, visibleCount, session]);

  const fixedPasses = session ? runPasses(session.fixedMetrics, 'fixed') : false;

  return (
    <Box
      id="lab"
      component="section"
      sx={{
        py: sectionGap,
        ...sectionInsetX,
        bgcolor: flashSaleColors.bg,
        fontFamily: flashSaleColors.sans,
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: sectionGap }}>
        {/* Scenarios */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: flashSaleColors.amber,
              letterSpacing: '0.14em',
              fontWeight: 700,
              fontFamily: flashSaleColors.display,
            }}
          >
            Scenarios
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mt: 2, mb: 2 }}>
            {FSL_SCENARIOS.map((s) => (
              <Button
                key={s.id}
                variant={scenarioId === s.id ? 'contained' : 'outlined'}
                onClick={() => applyScenario(s.id)}
                disabled={running}
                sx={{
                  textTransform: 'none',
                  fontFamily: flashSaleColors.sans,
                  fontWeight: 600,
                  px: 2,
                  py: 0.875,
                  ...(scenarioId === s.id
                    ? {
                        bgcolor: flashSaleColors.amber,
                        color: flashSaleColors.bg,
                        '&:hover': { bgcolor: flashSaleColors.amberDim },
                      }
                    : {
                        borderColor: flashSaleColors.border,
                        color: flashSaleColors.text,
                        '&:hover': { borderColor: flashSaleColors.amber, bgcolor: 'transparent' },
                      }),
                }}
              >
                {s.title}
              </Button>
            ))}
          </Box>
          <Typography
            variant="body1"
            sx={{ color: flashSaleColors.textMuted, maxWidth: 560, lineHeight: 1.75 }}
          >
            {scenario.description}
          </Typography>
        </Box>

        {/* Sandbox + config */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <Paper elevation={0} sx={{ ...panelSx, p: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: flashSaleColors.text, fontWeight: 600, mb: 2.5, fontFamily: flashSaleColors.display }}
            >
              Sandbox tenant
            </Typography>
            {(
              [
                ['Base URL', FSL_CLIENT.baseUrl],
                ['API key', FSL_CLIENT.apiKeyMasked],
                ['Environment', FSL_CLIENT.environment],
                ['SKU', FSL_CLIENT.sku],
              ] as const
            ).map(([label, value]) => (
              <Box key={label} sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: flashSaleColors.textMuted,
                    display: 'block',
                    mb: 0.5,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontSize: '0.68rem',
                  }}
                >
                  {label}
                </Typography>
                <Typography sx={{ color: flashSaleColors.text, fontFamily: flashSaleColors.mono, fontSize: '0.85rem' }}>
                  {value}
                </Typography>
              </Box>
            ))}
            <Typography
              variant="caption"
              sx={{ color: flashSaleColors.textMuted, fontStyle: 'italic', display: 'block', mt: 1 }}
            >
              Demo uses simulated responses - no live integration
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ ...panelSx, p: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: flashSaleColors.text, fontWeight: 600, mb: 2.5, fontFamily: flashSaleColors.display }}
            >
              Run configuration
            </Typography>
            <Typography variant="body2" sx={{ color: flashSaleColors.textMuted, mb: 0.5 }}>
              {FSL_CLIENT.skuLabel}
            </Typography>
            <Typography variant="body2" sx={{ color: flashSaleColors.text, mb: 3 }}>
              Checkout window: {scenario.checkoutWindowSec}s · Stock: {scenario.stock}
            </Typography>

            <Typography variant="body2" sx={{ color: flashSaleColors.text, mb: 1, fontWeight: 600 }}>
              Concurrent buyers: {concurrentBuyers}
            </Typography>
            <Slider
              value={concurrentBuyers}
              onChange={(_, v) => setConcurrentBuyers(v as number)}
              min={10}
              max={500}
              step={10}
              disabled={running}
              sx={{
                color: flashSaleColors.amber,
                mb: 3,
                '& .MuiSlider-thumb': { bgcolor: flashSaleColors.amber },
              }}
              aria-label="Concurrent buyers"
            />

            <Typography variant="body2" sx={{ color: flashSaleColors.text, mb: 1, fontWeight: 600 }}>
              Sandbox endpoints
            </Typography>
            <Box sx={{ mb: 3, pl: 0.5 }}>
              {FSL_ENDPOINTS.map((ep) => (
                <Typography
                  key={ep}
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: flashSaleColors.textMuted,
                    fontFamily: flashSaleColors.mono,
                    fontSize: '0.72rem',
                    mb: 0.75,
                    lineHeight: 1.5,
                  }}
                >
                  {ep}
                </Typography>
              ))}
            </Box>

            <Button
              variant="contained"
              startIcon={runComplete ? <ReplayIcon /> : <PlayArrowIcon />}
              onClick={runTest}
              disabled={running}
              size="large"
              sx={{
                bgcolor: flashSaleColors.amber,
                color: flashSaleColors.bg,
                fontWeight: 700,
                fontFamily: flashSaleColors.display,
                textTransform: 'none',
                px: 3,
                '&:hover': { bgcolor: flashSaleColors.amberDim },
                '&:disabled': { bgcolor: flashSaleColors.bgElevated, color: flashSaleColors.textMuted },
              }}
            >
              {running ? `Running… ${progress}%` : runComplete ? 'Run again' : 'Run test'}
            </Button>

            {running && (
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  mt: 2,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: flashSaleColors.bgElevated,
                  '& .MuiLinearProgress-bar': { bgcolor: flashSaleColors.amber },
                }}
              />
            )}
          </Paper>
        </Box>

        {/* Load telemetry chart - derived from this run's log lines */}
        <Box ref={chartRef}>
          <FlashSaleMetricsChart
            naiveLines={session?.naiveLines ?? []}
            fixedLines={session?.fixedLines ?? []}
            visibleCount={visibleCount}
            durationSec={scenario.checkoutWindowSec}
            running={running}
            hasSession={session !== null}
          />
        </Box>

        {/* Metrics - show during/after run */}
        {session && displayNaiveMetrics && displayFixedMetrics && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: flashSaleColors.fail,
                  fontWeight: 700,
                  mb: 1.25,
                  display: 'block',
                  fontFamily: flashSaleColors.display,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Naive checkout
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.25 }}>
                <MetricCard label="Success" value={displayNaiveMetrics.successfulCheckouts} />
                <MetricCard label="Oversells" value={displayNaiveMetrics.oversells} />
                <MetricCard label="Timeouts" value={displayNaiveMetrics.timeouts} />
                <MetricCard label="P95" value={`${displayNaiveMetrics.p95Latency}ms`} />
              </Box>
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: flashSaleColors.pass,
                  fontWeight: 700,
                  mb: 1.25,
                  display: 'block',
                  fontFamily: flashSaleColors.display,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Hold + idempotent complete
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.25 }}>
                <MetricCard label="Success" value={displayFixedMetrics.successfulCheckouts} />
                <MetricCard label="Oversells" value={displayFixedMetrics.oversells} />
                <MetricCard label="Timeouts" value={displayFixedMetrics.timeouts} />
                <MetricCard label="P95" value={`${displayFixedMetrics.p95Latency}ms`} />
              </Box>
            </Box>
          </Box>
        )}

        {/* Split logs */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <LogPanel
            title="Naive checkout"
            tint="fail"
            lines={session?.naiveLines ?? []}
            visibleCount={visibleCount}
            running={running}
          />
          <LogPanel
            title="Hold + idempotent complete"
            tint="pass"
            lines={session?.fixedLines ?? []}
            visibleCount={visibleCount}
            running={running}
          />
        </Box>

        {/* Report */}
        {runComplete && session && (
          <Paper
            elevation={0}
            sx={{
              ...panelSx,
              p: 3,
              borderColor: fixedPasses ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.45)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Chip
                label={fixedPasses ? 'Production-ready (simulated)' : 'Not production-ready'}
                size="small"
                sx={{
                  bgcolor: fixedPasses ? flashSaleColors.passBg : flashSaleColors.failBg,
                  color: fixedPasses ? flashSaleColors.pass : flashSaleColors.fail,
                  fontWeight: 700,
                  fontFamily: flashSaleColors.sans,
                }}
              />
              <Typography variant="body2" sx={{ color: flashSaleColors.textMuted }}>
                Run report · {FSL_CLIENT.name}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: flashSaleColors.text, lineHeight: 1.75, maxWidth: 640 }}>
              {recommendation('fixed', fixedPasses, concurrentBuyers)}
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
