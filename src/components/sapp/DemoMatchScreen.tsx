'use client';

import { useRef } from 'react';
import { SwapIcon } from './ProfileCardView';
import { useCoachmark } from './useCoachmark';
import { usePhoneCoachmark } from './PhoneCoachmark';

const APPLE_IMAGE = '/images/profiles/tree-3.png';
const HERB_IMAGE = '/images/profiles/tree-1.png';

interface DemoMatchScreenProps {
  userName: string;
  onMessageNow: () => void;
}

export default function DemoMatchScreen({ userName, onMessageNow }: DemoMatchScreenProps) {
  const messageRef = useRef<HTMLButtonElement>(null);
  const { bubbleVisible, dimActive, triggerDim } = useCoachmark(true);
  const displayName = userName.trim() || 'You';

  usePhoneCoachmark('Tap Message now!', bubbleVisible, {
    anchorRef: messageRef,
    side: 'top',
  });

  return (
    <div className="sapp-screen-layout sapp-demo-match-layout" onClick={triggerDim}>
      <div className="sapp-demo-match-panel">
        <div className={dimActive ? 'sapp-demo-region-dimmed' : ''}>
          <h2 className="sapp-demo-match-title">It&apos;s a match!</h2>
          <p className="sapp-demo-match-subtitle">You can swap plants nearby</p>

          <div className="sapp-demo-match-row">
            <div className="sapp-demo-match-person">
              <div className="sapp-demo-match-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={APPLE_IMAGE} alt={displayName} />
              </div>
              <span className="sapp-demo-match-name">{displayName}</span>
            </div>

            <div className="sapp-demo-match-swap" aria-hidden="true">
              <SwapIcon />
            </div>

            <div className="sapp-demo-match-person">
              <div className="sapp-demo-match-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HERB_IMAGE} alt="Pat" />
              </div>
              <span className="sapp-demo-match-name">Pat</span>
            </div>
          </div>

          <p className="sapp-demo-match-trade">Basil bundles ↔ apple cuttings</p>

          <div className="sapp-demo-match-links">
            <button type="button" className="sapp-demo-match-link" disabled tabIndex={-1}>
              View profile
            </button>
          </div>
        </div>

        <div className="sapp-demo-match-cta-wrap" onClick={(e) => e.stopPropagation()}>
          <button
            ref={messageRef}
            type="button"
            className={`sapp-demo-message-btn ${bubbleVisible ? 'sapp-action-btn--pulse' : ''}`}
            onClick={onMessageNow}
          >
            Message now
          </button>
        </div>
      </div>
    </div>
  );
}
