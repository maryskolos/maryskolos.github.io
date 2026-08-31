'use client';

import { useRef, useEffect } from 'react';

interface ChatMessage {
  from: 'pat' | 'you';
  text: string;
}

interface DemoChatScreenProps {
  messages: ChatMessage[];
  visibleCount: number;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export default function DemoChatScreen({ messages, visibleCount }: DemoChatScreenProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount]);

  return (
    <div className="sapp-screen-layout">
      <div className="sapp-demo-chat-layout">
        <header className="sapp-demo-chat-header">
          <span className="sapp-demo-chat-back" aria-hidden="true">‹</span>
          <div>
            <strong>Pat</strong>
            <span>Green Lake · 0.7 mi</span>
          </div>
        </header>

        <div className="sapp-demo-chat-messages" ref={scrollRef}>
          {messages.slice(0, visibleCount).map((msg, i) => (
            <div key={i} className={`sapp-demo-bubble sapp-demo-bubble--${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="sapp-demo-chat-composer">
          <div className="sapp-demo-chat-input-row">
            <div className="sapp-demo-chat-input">Message Pat…</div>
            <button type="button" className="sapp-demo-chat-send" aria-label="Send" disabled tabIndex={-1}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.4 20.4l17.45-7.19c.81-.33.81-1.49 0-1.82L3.4 4.2c-.77-.31-1.53.45-1.25 1.22l2.02 6.01 6.01 2.02-6.01 2.02-2.02 6.01c-.28.77.48 1.53 1.25 1.22z" />
              </svg>
            </button>
          </div>

          <div className="sapp-demo-keyboard" aria-hidden="true">
            {KEYBOARD_ROWS.map((row) => (
              <div key={row.join('')} className="sapp-demo-keyboard-row">
                {row.map((key) => (
                  <span key={key} className="sapp-demo-key">
                    {key}
                  </span>
                ))}
              </div>
            ))}
            <div className="sapp-demo-keyboard-row sapp-demo-keyboard-row--bottom">
              <span className="sapp-demo-key sapp-demo-key--wide">space</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="sapp-bottom-nav" aria-label="App navigation">
        <span className="sapp-nav-item">Discover</span>
        <span className="sapp-nav-item">Garden</span>
        <span className="sapp-nav-item active">Messages</span>
      </nav>
    </div>
  );
}
