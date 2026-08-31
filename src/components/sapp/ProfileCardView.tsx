'use client';

import { useRef } from 'react';
import { PlantProfile } from '@/constants/mockProfiles';
import { useCoachmark } from './useCoachmark';
import { usePhoneCoachmark } from './PhoneCoachmark';

function HeartIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export interface CoachmarkConfig {
  text: string;
  target: 'pass' | 'grow';
}

interface ProfileCardViewProps {
  profile: PlantProfile;
  coachmark?: CoachmarkConfig;
  preview?: boolean;
  onPass?: () => void;
  onGrow?: () => void;
}

export default function ProfileCardView({
  profile,
  coachmark,
  preview = false,
  onPass,
  onGrow,
}: ProfileCardViewProps) {
  const passRef = useRef<HTMLButtonElement>(null);
  const growRef = useRef<HTMLButtonElement>(null);
  const { bubbleVisible, dimActive, triggerDim } = useCoachmark(!!coachmark);

  usePhoneCoachmark(coachmark?.text ?? '', bubbleVisible && !!coachmark, {
    anchorRef: coachmark?.target === 'pass' ? passRef : growRef,
    side: coachmark?.target === 'pass' ? 'left' : 'right',
  });

  return (
    <div className="sapp-screen-layout sapp-screen-layout--discover" onClick={triggerDim}>
      <header className={`sapp-app-header ${dimActive ? 'sapp-demo-region-dimmed' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sapp-logo.png" alt="SApp" />
      </header>

      <div className="sapp-screen-body sapp-screen-body--discover">
        <div className="sapp-discover-card">
          <div className={`sapp-discover-card-scroll ${dimActive ? 'sapp-demo-region-dimmed' : ''}`}>
            <div className="sapp-discover-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.imageUrl} alt={preview ? '' : profile.headline} />
              <div className="sapp-discover-card-badges">
                {profile.tags.map((tag) => (
                  <span key={tag} className={`sapp-badge sapp-badge--${tag}`}>
                    {tag === 'for-sale' ? 'For sale' : tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="sapp-discover-card-details">
              <p className="sapp-discover-distance">
                {profile.distance} away · {profile.neighborhood}
              </p>
              <h3 className="sapp-discover-headline">{profile.headline}</h3>
              <p className="sapp-discover-name">{profile.name}</p>
              <p className="sapp-discover-description">{profile.description}</p>
              <div className="sapp-discover-offerings">
                {profile.offerings.map((item) => (
                  <span key={item} className="sapp-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="sapp-discover-actions" onClick={(e) => e.stopPropagation()}>
            <div className="sapp-discover-actions-row">
              <div
                className={`sapp-action-anchor ${
                  dimActive && coachmark?.target === 'grow' ? 'sapp-action-anchor--dimmed' : ''
                }`}
              >
                <button
                  ref={passRef}
                  type="button"
                  className={`sapp-action-btn sapp-action-btn--pass ${
                    bubbleVisible && coachmark?.target === 'pass' ? 'sapp-action-btn--pulse' : ''
                  }`}
                  onClick={onPass}
                  disabled={preview || !onPass}
                  tabIndex={preview ? -1 : undefined}
                  aria-label="Pass"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div
                className={`sapp-action-anchor ${
                  dimActive && coachmark?.target === 'pass' ? 'sapp-action-anchor--dimmed' : ''
                }`}
              >
                <button
                  ref={growRef}
                  type="button"
                  className={`sapp-action-btn sapp-action-btn--grow ${
                    bubbleVisible && coachmark?.target === 'grow' ? 'sapp-action-btn--pulse' : ''
                  }`}
                  onClick={onGrow}
                  disabled={preview || !onGrow}
                  tabIndex={preview ? -1 : undefined}
                  aria-label="Interested"
                >
                  <HeartIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`sapp-bottom-nav ${dimActive ? 'sapp-demo-region-dimmed' : ''}`}
        aria-label="App navigation"
        aria-hidden={preview ? true : undefined}
      >
        <span className="sapp-nav-item active">Discover</span>
        <span className="sapp-nav-item">Garden</span>
        <span className="sapp-nav-item">Messages</span>
      </nav>
    </div>
  );
}

export function SwapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  );
}
