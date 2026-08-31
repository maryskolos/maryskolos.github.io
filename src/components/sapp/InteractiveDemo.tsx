'use client';

import { useState, useEffect, useMemo } from 'react';
import { mockProfiles } from '@/constants/mockProfiles';
import ProfileCardView from './ProfileCardView';
import DemoMatchScreen from './DemoMatchScreen';
import DemoChatScreen from './demo/DemoChatScreen';
import { DemoGrowingScreen } from './demo/DemoGrowingScreen';
import { DemoInterestsScreen } from './demo/DemoInterestsScreen';
import { DemoProfileBuildScreen } from './demo/DemoProfileBuildScreen';

const TOMATO_PROFILE = mockProfiles[1];
const HERB_PROFILE = mockProfiles[0];

type DemoStep =
  | 'name-entry'
  | 'growing'
  | 'interests'
  | 'profile-build'
  | 'swipe-tomato'
  | 'swipe-herbs'
  | 'match'
  | 'chat';

interface ChatMessage {
  from: 'pat' | 'you';
  text: string;
}

interface InteractiveDemoProps {
  onRedo: () => void;
  onLearnAboutMe: () => void;
}

export default function InteractiveDemo({ onRedo, onLearnAboutMe }: InteractiveDemoProps) {
  const [step, setStep] = useState<DemoStep>('name-entry');
  const [userName, setUserName] = useState('');
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showThanksOverlay, setShowThanksOverlay] = useState(false);
  const [cardExiting, setCardExiting] = useState<'left' | 'right' | null>(null);

  const chatMessages = useMemo<ChatMessage[]>(
    () => [
      { from: 'pat', text: `Hey ${userName || 'there'}! Loved your apple pruning post.` },
      { from: 'you', text: 'Thanks! Your herb garden looks amazing.' },
      { from: 'pat', text: 'Want to swap some basil for a few cuttings?' },
      { from: 'you', text: 'Saturday morning work for you?' },
      { from: 'pat', text: 'Perfect - see you then!' },
    ],
    [userName]
  );

  useEffect(() => {
    if (step !== 'chat') return;

    setVisibleMessages(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    chatMessages.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleMessages(i + 1);
        }, 800 + i * 1400)
      );
    });

    timers.push(
      setTimeout(() => {
        setShowThanksOverlay(true);
      }, 800 + chatMessages.length * 1400 + 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [step, chatMessages]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) setStep('growing');
  };

  const handlePass = () => {
    setCardExiting('left');
    setTimeout(() => {
      setCardExiting(null);
      setStep('swipe-herbs');
    }, 400);
  };

  const handleGrow = () => {
    setCardExiting('right');
    setTimeout(() => {
      setCardExiting(null);
      setStep('match');
    }, 400);
  };

  return (
    <div className="sapp-carousel-root sapp-demo-root">
      <div className="sapp-carousel-viewport">
        {step === 'name-entry' && (
          <div className="sapp-screen active">
            <div className="sapp-screen-layout">
              <div className="sapp-screen-body sapp-demo-name">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sapp-logo.png" alt="SApp" className="sapp-onboarding-logo" />
                <h2 className="sapp-onboarding-title">Welcome to SApp</h2>
                <p className="sapp-demo-role">Let&apos;s set up your gardener profile</p>
                <form onSubmit={handleNameSubmit} className="sapp-demo-form">
                  <label htmlFor="demo-name" className="sapp-demo-label">
                    Your first name
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Mary"
                    className="sapp-demo-input"
                    maxLength={20}
                  />
                  <button type="submit" className="sapp-onboarding-cta" disabled={!userName.trim()}>
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {step === 'growing' && (
          <div className="sapp-screen active">
            <DemoGrowingScreen onContinue={() => setStep('interests')} />
          </div>
        )}

        {step === 'interests' && (
          <div className="sapp-screen active">
            <DemoInterestsScreen onContinue={() => setStep('profile-build')} />
          </div>
        )}

        {step === 'profile-build' && (
          <div className="sapp-screen active">
            <DemoProfileBuildScreen
              userName={userName}
              onContinue={() => setStep('swipe-tomato')}
            />
          </div>
        )}

        {step === 'swipe-tomato' && (
          <div className={`sapp-screen active ${cardExiting === 'left' ? 'sapp-demo-exit-left' : ''}`}>
            <ProfileCardView
              profile={TOMATO_PROFILE}
              coachmark={{
                text: 'Not buying today - tap Pass',
                target: 'pass',
              }}
              onPass={handlePass}
            />
          </div>
        )}

        {step === 'swipe-herbs' && (
          <div className={`sapp-screen active ${cardExiting === 'right' ? 'sapp-demo-exit-right' : ''}`}>
            <ProfileCardView
              profile={HERB_PROFILE}
              coachmark={{
                text: 'Great trade match - tap the heart!',
                target: 'grow',
              }}
              onGrow={handleGrow}
            />
          </div>
        )}

        {step === 'match' && (
          <div className="sapp-screen active">
            <DemoMatchScreen userName={userName} onMessageNow={() => setStep('chat')} />
          </div>
        )}

        {step === 'chat' && (
          <div className="sapp-screen active">
            <div className="sapp-demo-chat-stage">
              <div
                className={`sapp-demo-chat-backdrop ${
                  showThanksOverlay ? 'sapp-demo-chat-backdrop--dimmed' : ''
                }`}
              >
                <DemoChatScreen messages={chatMessages} visibleCount={visibleMessages} />
              </div>

              {showThanksOverlay && (
                <div className="sapp-demo-thanks-overlay" role="dialog" aria-modal="true" aria-label="Demo complete">
                  <div className="sapp-demo-thanks-overlay-content">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/sapp-logo.png" alt="SApp" className="sapp-onboarding-logo" />
                    <h2 className="sapp-demo-thanks-title">Thanks for trying my demo!</h2>
                    <p className="sapp-demo-thanks-body">
                      That&apos;s the full SApp flow - build your profile, swipe, match, and coordinate a local plant trade.
                    </p>
                    <div className="sapp-demo-thanks-actions">
                      <button type="button" className="sapp-onboarding-cta" onClick={onRedo}>
                        Redo demo
                      </button>
                      <button
                        type="button"
                        className="sapp-onboarding-cta sapp-onboarding-cta--secondary"
                        onClick={onLearnAboutMe}
                      >
                        Learn about me
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
