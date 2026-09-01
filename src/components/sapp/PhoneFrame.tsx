'use client';

import { ReactNode, useRef } from 'react';
import { PhoneCoachmarkLayer, PhoneCoachmarkProvider } from './PhoneCoachmark';
import '@/styles/sapp.css';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  /** Mobile fullscreen demo: in-frame coachmarks + immersive sizing */
  immersive?: boolean;
}

export default function PhoneFrame({
  children,
  className = '',
  immersive = false,
}: PhoneFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const phoneClass = ['sapp-phone', immersive ? 'sapp-phone--immersive' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <PhoneCoachmarkProvider frameRef={frameRef} immersive={immersive}>
      <div className={phoneClass} aria-label="SApp interactive demo">
        <div
          className={`sapp-phone-frame${immersive ? ' sapp-phone-frame--immersive' : ''}`}
          ref={frameRef}
        >
          <div className="sapp-phone-notch" aria-hidden="true" />
          <PhoneCoachmarkLayer />
          <div className={`sapp-phone-screen${immersive ? ' sapp-phone-screen--immersive' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </PhoneCoachmarkProvider>
  );
}
