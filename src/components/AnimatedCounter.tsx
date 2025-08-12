'use client';

import { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';

type AnimatedCounterProps = {
  target: number;
  durationMs?: number;
  suffix?: string;
};

export default function AnimatedCounter({ target, durationMs = 1200, suffix = '' }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const startTimestampRef = useRef<number | null>(null);

  useEffect(() => {
    let frameId: number;

    const step = (timestamp: number) => {
      if (startTimestampRef.current === null) startTimestampRef.current = timestamp;
      const elapsed = timestamp - startTimestampRef.current;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic for a nice finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextVal = Math.round(eased * target);
      setValue(nextVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      startTimestampRef.current = null;
    };
  }, [target, durationMs]);

  return (
    <Typography variant="h4" component="div">
      {value}
      {suffix}
    </Typography>
  );
} 