'use client';

import { useRef, useState } from 'react';
import { useCoachmark } from '../useCoachmark';
import { usePhoneCoachmark } from '../PhoneCoachmark';

const APPLE_IMAGE = '/images/profiles/tree-3.png';
const PROFILE_DESCRIPTION =
  'Just finished pruning my backyard apple tree - sharing healthy cuttings and scion wood from the trim.';
const PROFILE_TAGS = ['free', 'trade', 'cuttings'];

type BuildPhase = 'images' | 'description' | 'tags' | 'done';

interface DemoProfileBuildScreenProps {
  userName: string;
  onContinue: () => void;
}

function shouldDimSection(dimActive: boolean, current: BuildPhase, section: BuildPhase) {
  if (!dimActive) return false;
  if (current === 'done') return true;
  return current !== section;
}

export function DemoProfileBuildScreen({ userName, onContinue }: DemoProfileBuildScreenProps) {
  const [phase, setPhase] = useState<BuildPhase>('images');
  const [imagesFilled, setImagesFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);
  const [tagsFilled, setTagsFilled] = useState(false);
  const uploadRef = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLButtonElement>(null);
  const tagsRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const { bubbleVisible, dimActive, triggerDim } = useCoachmark(true, phase);

  const bubbleText =
    phase === 'images'
      ? 'Tap to upload photos'
      : phase === 'description'
        ? 'Tap to add description'
        : phase === 'tags'
          ? 'Tap to add tags'
          : phase === 'done'
            ? 'Profile ready - start swiping!'
            : '';

  const anchorRef =
    phase === 'images'
      ? uploadRef
      : phase === 'description'
        ? descriptionRef
        : phase === 'tags'
          ? tagsRef
          : ctaRef;

  usePhoneCoachmark(bubbleText, bubbleVisible && !!bubbleText, {
    anchorRef,
    side: phase === 'done' ? 'top' : 'left',
  });

  const handleUpload = () => {
    setImagesFilled(true);
    setPhase('description');
  };

  const handleDescription = () => {
    setDescriptionFilled(true);
    setPhase('tags');
  };

  const handleTags = () => {
    setTagsFilled(true);
    setPhase('done');
  };

  const canContinue = imagesFilled && descriptionFilled && tagsFilled;

  return (
    <div className="sapp-screen-layout" onClick={triggerDim}>
      <div className="sapp-screen-body sapp-demo-setup sapp-demo-profile-build">
        <div className={dimActive ? 'sapp-demo-region-dimmed' : ''}>
          <h2 className="sapp-demo-setup-title">Build your profile</h2>
          <p className="sapp-demo-setup-sub">
            {userName ? `${userName}'s` : 'Your'} apple tree pruner listing
          </p>
        </div>

        <div
          className={`sapp-demo-profile-section ${
            shouldDimSection(dimActive, phase, 'images') ? 'sapp-demo-region-dimmed' : ''
          }`}
          onClick={(e) => phase === 'images' && e.stopPropagation()}
        >
          <label className="sapp-demo-field-label">Profile photos</label>
          {imagesFilled ? (
            <div className="sapp-demo-photo-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={APPLE_IMAGE} alt="Your apple tree" />
            </div>
          ) : (
            <button
              ref={uploadRef}
              type="button"
              className={`sapp-demo-upload-btn ${
                bubbleVisible && phase === 'images' ? 'sapp-action-btn--pulse' : ''
              }`}
              onClick={handleUpload}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 16V4m0 0l4 4m-4-4L8 8M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upload profile images
            </button>
          )}
        </div>

        <div
          className={`sapp-demo-profile-section ${
            shouldDimSection(dimActive, phase, 'description') ? 'sapp-demo-region-dimmed' : ''
          }`}
          onClick={(e) => phase === 'description' && e.stopPropagation()}
        >
          <label className="sapp-demo-field-label">Description</label>
          {descriptionFilled ? (
            <p className="sapp-demo-field-filled">{PROFILE_DESCRIPTION}</p>
          ) : (
            <button
              ref={descriptionRef}
              type="button"
              className={`sapp-demo-autofill-btn ${
                bubbleVisible && phase === 'description' ? 'sapp-action-btn--pulse' : ''
              }`}
              onClick={handleDescription}
              disabled={!imagesFilled}
            >
              Add description
            </button>
          )}
        </div>

        <div
          className={`sapp-demo-profile-section ${
            shouldDimSection(dimActive, phase, 'tags') ? 'sapp-demo-region-dimmed' : ''
          }`}
          onClick={(e) => phase === 'tags' && e.stopPropagation()}
        >
          <label className="sapp-demo-field-label">Tags</label>
          {tagsFilled ? (
            <div className="sapp-demo-tags-filled">
              {PROFILE_TAGS.map((tag) => (
                <span key={tag} className="sapp-chip">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <button
              ref={tagsRef}
              type="button"
              className={`sapp-demo-autofill-btn ${
                bubbleVisible && phase === 'tags' ? 'sapp-action-btn--pulse' : ''
              }`}
              onClick={handleTags}
              disabled={!descriptionFilled}
            >
              Add tags
            </button>
          )}
        </div>
      </div>

      <div className="sapp-demo-setup-footer" onClick={(e) => phase === 'done' && e.stopPropagation()}>
        {canContinue ? (
          <button
            ref={ctaRef}
            type="button"
            className={`sapp-onboarding-cta ${bubbleVisible && phase === 'done' ? 'sapp-action-btn--pulse' : ''}`}
            onClick={onContinue}
          >
            Start swiping
          </button>
        ) : (
          <button ref={ctaRef} type="button" className="sapp-onboarding-cta" disabled>
            Start swiping
          </button>
        )}
      </div>
    </div>
  );
}
