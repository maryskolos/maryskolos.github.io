'use client';

import { useId, useMemo } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { buildChartSeriesFromLogs, logProgressToChartIndex } from '@/utils/flashSaleChartData';
import { metricsFromLines, type LogLine } from '@/utils/flashSaleSimulator';

interface FlashSaleMetricsChartProps {
  naiveLines: LogLine[];
  fixedLines: LogLine[];
  visibleCount: number;
  durationSec: number;
  running: boolean;
  hasSession: boolean;
}

const W = 720;
const H = 300;
const PAD = { top: 32, right: 56, bottom: 36, left: 48 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

function scaleLinear(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;
  return (v: number) => r0 + ((v - d0) / span) * (r1 - r0);
}

function linePath(points: { x: number; y: number }[], closeBaseline?: number) {
  if (points.length === 0) return '';
  const head = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  if (closeBaseline === undefined) return head;
  const last = points[points.length - 1];
  const first = points[0];
  return `${head} L ${last.x.toFixed(1)} ${closeBaseline.toFixed(1)} L ${first.x.toFixed(1)} ${closeBaseline.toFixed(1)} Z`;
}

export default function FlashSaleMetricsChart({
  naiveLines,
  fixedLines,
  visibleCount,
  durationSec,
  running,
  hasSession,
}: FlashSaleMetricsChartProps) {
  const gradientId = useId().replace(/:/g, '');

  const naiveVisible = naiveLines.slice(0, visibleCount);
  const fixedVisible = fixedLines.slice(0, visibleCount);

  // Build once from the full run — playback only reveals points, it must not rewrite history
  const fullSeries = useMemo(
    () => buildChartSeriesFromLogs(naiveLines, fixedLines, durationSec),
    [naiveLines, fixedLines, durationSec]
  );

  const maxLogs = Math.max(naiveLines.length, fixedLines.length, 1);
  const playIdx = logProgressToChartIndex(visibleCount, maxLogs, fullSeries.naive.length);

  const visibleNaive = fullSeries.naive.slice(0, playIdx + 1);
  const visibleFixed = fullSeries.fixed.slice(0, playIdx + 1);

  const maxRps = Math.max(
    ...fullSeries.naive.map((p) => p.rps),
    ...fullSeries.fixed.map((p) => p.rps),
    1
  );
  const maxP95 = Math.max(
    ...fullSeries.naive.map((p) => p.p95Ms),
    ...fullSeries.fixed.map((p) => p.p95Ms),
    100
  );
  const maxError = Math.max(
    ...fullSeries.naive.map((p) => p.errorRate),
    ...fullSeries.fixed.map((p) => p.errorRate),
    1
  );

  const xScale = scaleLinear([0, Math.max(fullSeries.naive.length - 1, 1)], [PAD.left, PAD.left + innerW]);
  const yRps = scaleLinear([0, maxRps * 1.12], [PAD.top + innerH, PAD.top]);
  const yP95 = scaleLinear([0, maxP95 * 1.1], [PAD.top + innerH, PAD.top]);

  const naiveRpsArea = visibleNaive.map((p, i) => ({ x: xScale(i), y: yRps(p.rps) }));
  const fixedRpsArea = visibleFixed.map((p, i) => ({ x: xScale(i), y: yRps(p.rps) }));
  const naiveP95Line = visibleNaive.map((p, i) => ({ x: xScale(i), y: yP95(p.p95Ms) }));
  const fixedP95Line = visibleFixed.map((p, i) => ({ x: xScale(i), y: yP95(p.p95Ms) }));

  const baseline = PAD.top + innerH;
  const playheadX = xScale(playIdx);

  const naiveMetrics = metricsFromLines(naiveVisible);
  const fixedMetrics = metricsFromLines(fixedVisible);

  return (
    <Paper
      id="load-telemetry"
      elevation={0}
      sx={{
        bgcolor: flashSaleColors.bgPanel,
        border: `1px solid ${flashSaleColors.border}`,
        borderRadius: 2.5,
        overflow: 'hidden',
        scrollMarginTop: '5.5rem',
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: `1px solid ${flashSaleColors.border}`,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: flashSaleColors.text, fontWeight: 600, fontFamily: flashSaleColors.display }}
          >
            Load telemetry
          </Typography>
          <Typography variant="caption" sx={{ color: flashSaleColors.textMuted }}>
            Throughput rush, rolling P95, and error density · {durationSec}s window
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {running && (
            <Chip
              label="Streaming"
              size="small"
              sx={{
                bgcolor: 'rgba(245, 158, 11, 0.12)',
                color: flashSaleColors.amber,
                fontWeight: 700,
                fontSize: '0.65rem',
              }}
            />
          )}
          <Chip
            label="Simulated"
            size="small"
            sx={{
              bgcolor: flashSaleColors.bgElevated,
              color: flashSaleColors.textMuted,
              fontFamily: flashSaleColors.mono,
              fontSize: '0.65rem',
            }}
          />
        </Box>
      </Box>

      <Box sx={{ p: { xs: 1, md: 2 }, overflowX: 'auto' }}>
        {!hasSession ? (
          <Box
            sx={{
              height: H,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: flashSaleColors.textMuted,
              fontFamily: flashSaleColors.sans,
              fontSize: '0.9rem',
            }}
          >
            Run a test to generate telemetry from the simulated request log
          </Box>
        ) : (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ minWidth: 320, display: 'block' }}
            role="img"
            aria-label="Load telemetry derived from simulated request log"
          >
            <defs>
              <linearGradient id={`${gradientId}-naive`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={flashSaleColors.fail} stopOpacity="0.4" />
                <stop offset="55%" stopColor={flashSaleColors.fail} stopOpacity="0.12" />
                <stop offset="100%" stopColor={flashSaleColors.fail} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id={`${gradientId}-fixed`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={flashSaleColors.pass} stopOpacity="0.35" />
                <stop offset="55%" stopColor={flashSaleColors.pass} stopOpacity="0.1" />
                <stop offset="100%" stopColor={flashSaleColors.pass} stopOpacity="0.02" />
              </linearGradient>
              <filter id={`${gradientId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id={`${gradientId}-plot`}>
                <rect x={PAD.left} y={PAD.top} width={innerW} height={innerH} />
              </clipPath>
            </defs>

            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = PAD.top + innerH * (1 - t);
              return (
                <g key={t}>
                  <line
                    x1={PAD.left}
                    y1={y}
                    x2={PAD.left + innerW}
                    y2={y}
                    stroke={flashSaleColors.border}
                    strokeOpacity={0.4}
                    strokeDasharray="4 6"
                  />
                  <text
                    x={PAD.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill={flashSaleColors.textMuted}
                    fontSize="9"
                    fontFamily={flashSaleColors.mono}
                  >
                    {Math.round(maxRps * 1.12 * t)}
                  </text>
                </g>
              );
            })}

            <text
              x={14}
              y={PAD.top + innerH / 2}
              transform={`rotate(-90 14 ${PAD.top + innerH / 2})`}
              textAnchor="middle"
              fill={flashSaleColors.textMuted}
              fontSize="9"
              fontFamily={flashSaleColors.sans}
            >
              req/s
            </text>
            <text
              x={W - 12}
              y={PAD.top + innerH / 2}
              transform={`rotate(90 ${W - 12} ${PAD.top + innerH / 2})`}
              textAnchor="middle"
              fill={flashSaleColors.amber}
              fontSize="9"
              fontFamily={flashSaleColors.sans}
            >
              P95 ms
            </text>

            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const x = PAD.left + innerW * t;
              return (
                <text
                  key={t}
                  x={x}
                  y={H - 10}
                  textAnchor="middle"
                  fill={flashSaleColors.textMuted}
                  fontSize="9"
                  fontFamily={flashSaleColors.mono}
                >
                  {Math.round(t * durationSec)}s
                </text>
              );
            })}

            <g clipPath={`url(#${gradientId}-plot)`}>
              {naiveRpsArea.length > 1 && (
                <path d={linePath(naiveRpsArea, baseline)} fill={`url(#${gradientId}-naive)`} opacity={0.9} />
              )}
              {fixedRpsArea.length > 1 && (
                <path d={linePath(fixedRpsArea, baseline)} fill={`url(#${gradientId}-fixed)`} opacity={0.85} />
              )}

              {naiveRpsArea.length > 1 && (
                <path
                  d={linePath(naiveRpsArea)}
                  fill="none"
                  stroke={flashSaleColors.fail}
                  strokeWidth="1.5"
                  strokeOpacity={0.55}
                  strokeLinejoin="round"
                />
              )}
              {fixedRpsArea.length > 1 && (
                <path
                  d={linePath(fixedRpsArea)}
                  fill="none"
                  stroke={flashSaleColors.pass}
                  strokeWidth="1.5"
                  strokeOpacity={0.65}
                  strokeLinejoin="round"
                />
              )}

              {naiveP95Line.length > 1 && (
                <path
                  d={linePath(naiveP95Line)}
                  fill="none"
                  stroke={flashSaleColors.fail}
                  strokeWidth="2.25"
                  strokeLinejoin="round"
                  strokeDasharray="7 5"
                  filter={`url(#${gradientId}-glow)`}
                />
              )}
              {fixedP95Line.length > 1 && (
                <path
                  d={linePath(fixedP95Line)}
                  fill="none"
                  stroke={flashSaleColors.pass}
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  filter={`url(#${gradientId}-glow)`}
                />
              )}

              {visibleNaive.map((p, i) => {
                if (p.errorRate <= 0) return null;
                const barH = Math.max(3, (p.errorRate / maxError) * innerH * 0.28);
                return (
                  <rect
                    key={`err-${i}`}
                    x={xScale(i) - 2.5}
                    y={baseline - barH}
                    width={5}
                    height={barH}
                    fill={flashSaleColors.fail}
                    opacity={0.18 + (p.errorRate / maxError) * 0.45}
                    rx={1}
                  />
                );
              })}

              {visibleCount > 0 && (
                <g>
                  <line
                    x1={playheadX}
                    y1={PAD.top}
                    x2={playheadX}
                    y2={baseline}
                    stroke={flashSaleColors.amber}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity={0.9}
                  />
                  <circle cx={playheadX} cy={PAD.top + 4} r={3} fill={flashSaleColors.amber} />
                </g>
              )}
            </g>

            <g transform={`translate(${PAD.left} ${PAD.top - 12})`}>
              {[
                { c: flashSaleColors.fail, label: 'Naive RPS', dash: false, fill: true },
                { c: flashSaleColors.pass, label: 'Fixed RPS', dash: false, fill: true },
                { c: flashSaleColors.fail, label: 'Naive P95', dash: true, fill: false },
                { c: flashSaleColors.pass, label: 'Fixed P95', dash: false, fill: false },
              ].map((item, i) => (
                <g key={item.label} transform={`translate(${i * 108} 0)`}>
                  {item.fill ? (
                    <rect x={0} y={-9} width={10} height={8} fill={item.c} opacity={0.55} rx={1} />
                  ) : (
                    <line
                      x1={0}
                      y1={-5}
                      x2={14}
                      y2={-5}
                      stroke={item.c}
                      strokeWidth="2"
                      strokeDasharray={item.dash ? '5 3' : undefined}
                    />
                  )}
                  <text x={18} y={-2} fill={flashSaleColors.textMuted} fontSize="8.5" fontFamily={flashSaleColors.sans}>
                    {item.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        )}
      </Box>

      {hasSession && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 1.5,
            px: 2.5,
            pb: 2.5,
            pt: 0.5,
          }}
        >
          {[
            { label: 'Naive P95', value: `${naiveMetrics.p95Latency}ms`, color: flashSaleColors.fail },
            { label: 'Fixed P95', value: `${fixedMetrics.p95Latency}ms`, color: flashSaleColors.pass },
            {
              label: 'Naive errors',
              value: naiveMetrics.oversells + naiveMetrics.timeouts,
              color: flashSaleColors.fail,
            },
            {
              label: 'Fixed errors',
              value: fixedMetrics.oversells + fixedMetrics.timeouts,
              color: flashSaleColors.pass,
            },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                bgcolor: flashSaleColors.bgElevated,
                border: `1px solid ${flashSaleColors.border}`,
                borderRadius: 1.5,
                px: 1.5,
                py: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: flashSaleColors.textMuted, fontSize: '0.65rem' }}>
                {item.label}
              </Typography>
              <Typography
                sx={{
                  color: item.color,
                  fontFamily: flashSaleColors.mono,
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
