'use client';

import { ReactNode, useRef } from 'react';
import { PhoneCoachmarkLayer, PhoneCoachmarkProvider } from './PhoneCoachmark';
import '@/styles/sapp.css';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <PhoneCoachmarkProvider frameRef={frameRef}>
      <div className={`sapp-phone ${className}`} aria-label="SApp interactive demo">
        <div className="sapp-phone-frame" ref={frameRef}>
          <div className="sapp-phone-notch" aria-hidden="true" />
          <PhoneCoachmarkLayer />
          <div className="sapp-phone-screen">{children}</div>
        </div>
      </div>
    </PhoneCoachmarkProvider>
  );
}
