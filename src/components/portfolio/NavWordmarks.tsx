'use client';

import { Box } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { flashSaleColors } from '@/constants/flashSaleTheme';

type MarkTheme = 'light' | 'dark';

const markRowSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  lineHeight: 1,
} as const;

function labelSx(ink: string, height: number) {
  return {
    fontFamily: 'var(--font-fraunces), "Fraunces", Georgia, serif',
    fontWeight: 600,
    fontSize: height >= 32 ? '1.25rem' : '1.02rem',
    letterSpacing: '0.01em',
    color: ink,
    fontStyle: 'normal' as const,
  };
}

interface DemosMarkProps {
  theme?: MarkTheme;
  height?: number;
  showLabel?: boolean;
}

/** Layers / window mark + Fraunces label for Demos */
export function DemosMark({ theme = 'light', height = 28, showLabel = true }: DemosMarkProps) {
  const ink = theme === 'dark' ? flashSaleColors.text : oliveColors.oliveDeep;
  const fill = theme === 'dark' ? flashSaleColors.bgElevated : oliveColors.cream;
  const accent = theme === 'dark' ? flashSaleColors.amber : oliveColors.oliveMoss;
  const iconSize = Math.round(height * 0.92);

  return (
    <Box component="span" sx={markRowSx}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        style={{ display: 'block', flexShrink: 0 }}
      >
        <rect x="1" y="6" width="14" height="14" rx="2" fill={fill} stroke={ink} strokeWidth="1.5" />
        <rect x="7" y="2" width="14" height="14" rx="2" fill={fill} stroke={accent} strokeWidth="1.5" />
        <path d="M10.5 7h7M10.5 11h4.5" stroke={accent} strokeWidth="1.35" strokeLinecap="round" />
      </svg>
      {showLabel && (
        <Box component="span" sx={labelSx(ink, height)}>
          Demos
        </Box>
      )}
    </Box>
  );
}

interface WritingMarkProps {
  theme?: MarkTheme;
  height?: number;
  showLabel?: boolean;
}

/** Pen-and-paper mark + Fraunces label for Writing */
export function WritingMark({ theme = 'light', height = 28, showLabel = true }: WritingMarkProps) {
  const ink = theme === 'dark' ? flashSaleColors.text : oliveColors.oliveDeep;
  const paper = theme === 'dark' ? flashSaleColors.bgElevated : oliveColors.cream;
  const accent = theme === 'dark' ? flashSaleColors.amber : oliveColors.oliveMoss;
  const iconSize = Math.round(height * 0.92);

  return (
    <Box component="span" sx={markRowSx}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        style={{ display: 'block', flexShrink: 0 }}
      >
        <rect x="2" y="2" width="13" height="18" rx="1.5" fill={paper} stroke={ink} strokeWidth="1.4" />
        <path d="M5 7h7M5 10.5h7M5 14h4" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
        <path
          d="M14.5 13.5l6-6a1.2 1.2 0 0 0 0-1.7l-1-1a1.2 1.2 0 0 0-1.7 0l-6 6-.6 3.3 3.3-.6z"
          fill={accent}
          stroke={ink}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
      {showLabel && (
        <Box component="span" sx={labelSx(ink, height)}>
          Writing
        </Box>
      )}
    </Box>
  );
}

interface AboutMeMarkProps {
  theme?: MarkTheme;
  height?: number;
}

/** Styled About Me wordmark for nav / section headers */
export function AboutMeMark({ theme = 'light', height = 28 }: AboutMeMarkProps) {
  const ink = theme === 'dark' ? flashSaleColors.text : oliveColors.oliveDeep;
  const accent = theme === 'dark' ? flashSaleColors.amber : oliveColors.oliveMoss;
  const iconSize = Math.round(height * 0.85);

  return (
    <Box component="span" sx={markRowSx}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        style={{ display: 'block', flexShrink: 0 }}
      >
        <circle cx="12" cy="8.5" r="3.6" stroke={ink} strokeWidth="1.5" fill="none" />
        <path
          d="M4.5 20c1.4-3.6 3.8-5.3 7.5-5.3S18.1 16.4 19.5 20"
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <Box component="span" sx={labelSx(ink, height)}>
        About{' '}
        <Box component="span" sx={{ fontWeight: 700, color: accent }}>
          Me
        </Box>
      </Box>
    </Box>
  );
}
