'use client';

import { DemoSetupSearch } from '../demo/DemoSetupSearch';
import { SetupOptionChip } from '../demo/SetupOptionChip';
import { INTEREST_OPTIONS } from '../demo/demoSetupOptions';

const PRESELECTED = ['cherry-tomatoes', 'basil', 'plant-trades'];

export default function InterestsCarouselScreen() {
  const popularOptions = INTEREST_OPTIONS.filter((option) => option.popular);

  return (
    <div className="sapp-screen-layout">
      <div className="sapp-screen-body sapp-demo-setup-scroll">
        <h2 className="sapp-demo-setup-title">What are you looking for?</h2>
        <p className="sapp-demo-setup-sub">Pick what you&apos;d like to find nearby</p>
        <DemoSetupSearch placeholder="Search interests…" value="" readOnly />
        <p className="sapp-demo-setup-section-label">Popular nearby</p>

        <div className="sapp-chips sapp-chips--list sapp-chips--compact sapp-chips--setup">
          {popularOptions.map((opt) => (
            <SetupOptionChip
              key={opt.id}
              emoji={opt.emoji}
              label={opt.label}
              selected={PRESELECTED.includes(opt.id)}
              readOnly
            />
          ))}
        </div>
      </div>

      <div className="sapp-demo-setup-footer">
        <button type="button" className="sapp-onboarding-cta" disabled tabIndex={-1}>
          Continue
        </button>
      </div>
    </div>
  );
}
