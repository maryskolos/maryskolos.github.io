'use client';

import { useMemo, useRef, useState } from 'react';
import { useCoachmark } from '../useCoachmark';
import { usePhoneCoachmark } from '../PhoneCoachmark';
import { DemoSetupSearch } from './DemoSetupSearch';
import { SetupOptionChip } from './SetupOptionChip';
import { GROWING_OPTIONS, filterSetupOptions } from './demoSetupOptions';

interface DemoGrowingScreenProps {
  onContinue: () => void;
}

export function DemoGrowingScreen({ onContinue }: DemoGrowingScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const applesRef = useRef<HTMLButtonElement>(null);
  const { bubbleVisible } = useCoachmark(true);
  const isSearching = searchQuery.trim().length > 0;

  usePhoneCoachmark('Tap Apples to select!', bubbleVisible && !isSearching, {
    anchorRef: applesRef,
    side: 'left',
  });

  const visibleOptions = useMemo(
    () => filterSetupOptions(GROWING_OPTIONS, searchQuery),
    [searchQuery]
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canContinue = selected.includes('apples');

  return (
    <div className="sapp-screen-layout">
      <div className="sapp-screen-body sapp-demo-setup-scroll">
        <h2 className="sapp-demo-setup-title">What&apos;s growing?</h2>
        <p className="sapp-demo-setup-sub">Select everything in your garden</p>
        <DemoSetupSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search plants…"
        />

        {!isSearching && <p className="sapp-demo-setup-section-label">Popular nearby</p>}

        <div className="sapp-chips sapp-chips--list sapp-chips--setup">
          {visibleOptions.length === 0 ? (
            <p className="sapp-demo-setup-empty">No matches - try another search</p>
          ) : (
            visibleOptions.map((opt) => (
              <SetupOptionChip
                key={opt.id}
                ref={opt.id === 'apples' ? applesRef : undefined}
                emoji={opt.emoji}
                label={opt.label}
                selected={selected.includes(opt.id)}
                highlighted={bubbleVisible && opt.id === 'apples'}
                onClick={() => toggle(opt.id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="sapp-demo-setup-footer">
        <button
          type="button"
          className="sapp-onboarding-cta"
          disabled={!canContinue}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
