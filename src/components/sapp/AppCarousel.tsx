'use client';

import { useState, useEffect, useRef } from 'react';
import { mockProfiles } from '@/constants/mockProfiles';
import GrowingCarouselScreen from './screens/GrowingCarouselScreen';
import InterestsCarouselScreen from './screens/InterestsCarouselScreen';
import DiscoverProfileScreen from './screens/DiscoverProfileScreen';

export const SCREENS = [
  { id: 'growing', type: 'growing' as const },
  { id: 'interests', type: 'interests' as const },
  { id: 'profile-herbs', type: 'profile' as const, profileIndex: 0 },
  { id: 'profile-tomatoes', type: 'profile' as const, profileIndex: 1 },
  { id: 'profile-apple', type: 'profile' as const, profileIndex: 2 },
];

const INTERVAL_MS = 2800;

interface AppCarouselProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export default function AppCarousel({ activeIndex, onIndexChange }: AppCarouselProps) {
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setPaused(true);
    const handler = () => setPaused(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % SCREENS.length;
      onIndexChange(next);
    }, INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, onIndexChange]);

  return (
    <div
      className="sapp-carousel-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="sapp-carousel-viewport">
        {SCREENS.map((screen, index) => (
          <div
            key={screen.id}
            className={`sapp-screen ${index === activeIndex ? 'active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            {screen.type === 'growing' && <GrowingCarouselScreen />}
            {screen.type === 'interests' && <InterestsCarouselScreen />}
            {screen.type === 'profile' && (
              <DiscoverProfileScreen profile={mockProfiles[screen.profileIndex]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
