'use client';

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

export type PhoneCoachmarkPlacement =
  | 'top'
  | 'left-row'
  | 'left-list'
  | 'pass-action'
  | 'grow-action'
  | 'bottom'
  | 'profile-upload'
  | 'profile-description'
  | 'profile-tags';

export type PhoneCoachmarkSide = 'left' | 'right' | 'top' | 'bottom';

export interface PhoneCoachmarkState {
  text: string;
  placement: PhoneCoachmarkPlacement;
  anchorRef?: RefObject<HTMLElement | null>;
  side: PhoneCoachmarkSide;
}

export interface PhoneCoachmarkOptions {
  placement?: PhoneCoachmarkPlacement;
  anchorRef?: RefObject<HTMLElement | null>;
  side?: PhoneCoachmarkSide;
}

interface PhoneCoachmarkContextValue {
  setCoachmark: (state: PhoneCoachmarkState | null) => void;
  coachmark: PhoneCoachmarkState | null;
  frameRef: RefObject<HTMLDivElement | null>;
}

const PhoneCoachmarkContext = createContext<PhoneCoachmarkContextValue | null>(null);

export function PhoneCoachmarkProvider({
  children,
  frameRef,
}: {
  children: ReactNode;
  frameRef: RefObject<HTMLDivElement | null>;
}) {
  const [coachmark, setCoachmark] = useState<PhoneCoachmarkState | null>(null);

  const value = useMemo(
    () => ({
      coachmark,
      setCoachmark,
      frameRef,
    }),
    [coachmark, frameRef]
  );

  return (
    <PhoneCoachmarkContext.Provider value={value}>{children}</PhoneCoachmarkContext.Provider>
  );
}

function useAnchoredCoachmarkStyle(
  anchorEl: HTMLElement | null,
  side: PhoneCoachmarkSide,
  frameRef: RefObject<HTMLDivElement | null>
) {
  const [style, setStyle] = useState<CSSProperties | null>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!anchorEl || !frame) {
      setStyle(null);
      return;
    }

    const update = () => {
      const frameRect = frame.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();
      const centerY = anchorRect.top + anchorRect.height / 2 - frameRect.top;
      const centerX = anchorRect.left + anchorRect.width / 2 - frameRect.left;
      const anchorLeft = anchorRect.left - frameRect.left;
      const anchorRight = anchorRect.right - frameRect.left;
      const anchorTop = anchorRect.top - frameRect.top;
      const anchorBottom = anchorRect.bottom - frameRect.top;
      const gap = 8;

      switch (side) {
        case 'left':
          setStyle({
            top: centerY,
            left: anchorLeft - gap,
            transform: 'translate(-100%, -50%)',
            width: 'max-content',
            maxWidth: 132,
          });
          break;
        case 'right':
          setStyle({
            top: centerY,
            left: anchorRight + gap,
            transform: 'translate(0, -50%)',
            width: 'max-content',
            maxWidth: 132,
          });
          break;
        case 'top':
          setStyle({
            top: anchorTop - gap,
            left: centerX,
            transform: 'translate(-50%, -100%)',
            width: 'max-content',
            maxWidth: 168,
          });
          break;
        case 'bottom':
          setStyle({
            top: anchorBottom + gap,
            left: centerX,
            transform: 'translate(-50%, 0)',
            width: 'max-content',
            maxWidth: 168,
          });
          break;
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(anchorEl);
    ro.observe(frame);
    window.addEventListener('resize', update);

    const scrollParent = anchorEl.closest(
      '.sapp-demo-setup-scroll, .sapp-screen-body, .sapp-discover-card-scroll'
    );
    scrollParent?.addEventListener('scroll', update, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      scrollParent?.removeEventListener('scroll', update);
    };
  }, [anchorEl, side, frameRef]);

  return style;
}

export function PhoneCoachmarkLayer() {
  const context = useContext(PhoneCoachmarkContext);
  const coachmark = context?.coachmark;
  const [anchorTick, setAnchorTick] = useState(0);
  const anchorEl = coachmark?.anchorRef?.current ?? null;

  useLayoutEffect(() => {
    if (!coachmark?.anchorRef || anchorEl) return;
    const raf = requestAnimationFrame(() => setAnchorTick((t) => t + 1));
    const timer = window.setTimeout(() => setAnchorTick((t) => t + 1), 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [coachmark, anchorEl, anchorTick]);

  const anchoredStyle = useAnchoredCoachmarkStyle(
    anchorEl,
    coachmark?.side ?? 'left',
    context?.frameRef ?? { current: null }
  );

  if (!coachmark) return null;

  const { text, placement, anchorRef, side } = coachmark;
  const isAnchored = !!anchorRef && !!anchorEl && !!anchoredStyle;

  return (
    <div className="sapp-phone-coachmark-layer" aria-live="polite">
      <div
        className={
          isAnchored
            ? `sapp-phone-coachmark sapp-phone-coachmark--anchored sapp-phone-coachmark--side-${side}`
            : `sapp-phone-coachmark sapp-phone-coachmark--${placement}`
        }
        style={isAnchored ? anchoredStyle ?? undefined : undefined}
      >
        <div className="sapp-speech-bubble sapp-speech-bubble--phone" role="status">
          {text}
        </div>
      </div>
    </div>
  );
}

export function usePhoneCoachmark(
  text: string,
  visible: boolean,
  placementOrOptions?: PhoneCoachmarkPlacement | PhoneCoachmarkOptions
) {
  const context = useContext(PhoneCoachmarkContext);
  const options: PhoneCoachmarkOptions =
    typeof placementOrOptions === 'string'
      ? { placement: placementOrOptions }
      : placementOrOptions ?? {};
  const { placement = 'top', anchorRef, side = 'left' } = options;

  useEffect(() => {
    if (!context) return;

    const publish = () => {
      if (visible && text) {
        context.setCoachmark({
          text,
          placement,
          anchorRef,
          side,
        });
      } else {
        context.setCoachmark(null);
      }
    };

    publish();
    const raf = requestAnimationFrame(publish);
    const timer = window.setTimeout(publish, 100);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      context.setCoachmark(null);
    };
  }, [context, visible, text, placement, side, anchorRef]);
}

export function usePhoneCoachmarkOptional() {
  return useContext(PhoneCoachmarkContext);
}
