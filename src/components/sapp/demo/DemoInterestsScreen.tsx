'use client';

import { useMemo, useRef, useState } from 'react';
import { useCoachmark } from '../useCoachmark';
import { usePhoneCoachmark } from '../PhoneCoachmark';
import { DemoSetupSearch } from './DemoSetupSearch';
import { SetupOptionChip } from './SetupOptionChip';
import {
  INTEREST_COACHMARK_TARGETS,
  INTEREST_OPTIONS,
  filterSetupOptions,
} from './demoSetupOptions';

interface DemoInterestsScreenProps {
  onContinue: () => void;
}

export function DemoInterestsScreen({ onContinue }: DemoInterestsScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const basilRef = useRef<HTMLButtonElement>(null);
  const { bubbleVisible } = useCoachmark(true);
  const isSearching = searchQuery.trim().length > 0;

  usePhoneCoachmark('Try tomatoes, basil & trades!', bubbleVisible && !isSearching, {
    anchorRef: basilRef,
    side: 'left',
  });

  const visibleOptions = useMemo(
    () => filterSetupOptions(INTEREST_OPTIONS, searchQuery),
    [searchQuery]
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canContinue = selected.length >= 2;

  return (
    <div className="sapp-screen-layout">
      <div className="sapp-screen-body sapp-demo-setup-scroll">
        <h2 className="sapp-demo-setup-title">What are you looking for?</h2>
        <p className="sapp-demo-setup-sub">Pick what you&apos;d like to find nearby</p>
        <DemoSetupSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search interests…"
        />

        {!isSearching && <p className="sapp-demo-setup-section-label">Popular nearby</p>}

        <div className="sapp-chips sapp-chips--list sapp-chips--compact sapp-chips--setup">
          {visibleOptions.length === 0 ? (
            <p className="sapp-demo-setup-empty">No matches - try another search</p>
          ) : (
            visibleOptions.map((opt) => (
              <SetupOptionChip
                key={opt.id}
                ref={opt.id === 'basil' ? basilRef : undefined}
                emoji={opt.emoji}
                label={opt.label}
                selected={selected.includes(opt.id)}
                highlighted={bubbleVisible && INTEREST_COACHMARK_TARGETS.has(opt.id)}
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
