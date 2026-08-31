'use client';

import { useState, useEffect, useCallback } from 'react';

const BUBBLE_DELAY_MS = 500;

export function useCoachmark(active: boolean, resetKey?: string) {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [dimActive, setDimActive] = useState(false);

  useEffect(() => {
    if (!active) {
      setBubbleVisible(false);
      setDimActive(false);
      return;
    }
    setBubbleVisible(false);
    setDimActive(false);
    const timer = setTimeout(() => setBubbleVisible(true), BUBBLE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [active, resetKey]);

  const triggerDim = useCallback(() => {
    setDimActive((prev) => {
      if (!bubbleVisible) return prev;
      return true;
    });
  }, [bubbleVisible]);

  return { bubbleVisible, dimActive, triggerDim };
}
