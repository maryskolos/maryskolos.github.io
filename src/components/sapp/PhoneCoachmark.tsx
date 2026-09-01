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
  immersive: boolean;
}

const PhoneCoachmarkContext = createContext<PhoneCoachmarkContextValue | null>(null);

function resolveSide(side: PhoneCoachmarkSide, immersive: boolean): PhoneCoachmarkSide {
  if (!immersive) return side;
  if (side === 'left' || side === 'right') return 'bottom';
  return side;
}

export function PhoneCoachmarkProvider({
  children,
  frameRef,
  immersive = false,
}: {
  children: ReactNode;
  frameRef: RefObject<HTMLDivElement | null>;
  immersive?: boolean;
}) {
  const [coachmark, setCoachmark] = useState<PhoneCoachmarkState | null>(null);

  const value = useMemo(
    () => ({
      coachmark,
      setCoachmark,
      frameRef,
      immersive,
    }),
    [coachmark, frameRef, immersive]
  );

  return (
    <PhoneCoachmarkContext.Provider value={value}>{children}</PhoneCoachmarkContext.Provider>
  );
}

function useAnchoredCoachmarkStyle(
  anchorEl: HTMLElement | null,
  side: PhoneCoachmarkSide,
  frameRef: RefObject<HTMLDivElement | null>,
  immersive: boolean
) {
  const [style, setStyle] = useState<CSSProperties | null>(null);
  const effectiveSide = resolveSide(side, immersive);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!anchorEl || !frame) {
      setStyle(null);
      return;
    }

    const update = () => {
      const frameRect = frame.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();
      const frameW = frameRect.width;
      const frameH = frameRect.height;
      const centerY = anchorRect.top + anchorRect.height / 2 - frameRect.top;
      const centerX = anchorRect.left + anchorRect.width / 2 - frameRect.left;
      const anchorLeft = anchorRect.left - frameRect.left;
      const anchorRight = anchorRect.right - frameRect.left;
      const anchorTop = anchorRect.top - frameRect.top;
      const anchorBottom = anchorRect.bottom - frameRect.top;
      const gap = immersive ? 6 : 8;
      const pad = immersive ? 10 : 0;
      const maxW = immersive ? 150 : effectiveSide === 'top' || effectiveSide === 'bottom' ? 168 : 132;

      let next: CSSProperties;

      switch (effectiveSide) {
        case 'left':
          next = {
            top: centerY,
            left: anchorLeft - gap,
            transform: 'translate(-100%, -50%)',
            width: 'max-content',
            maxWidth: maxW,
          };
          break;
        case 'right':
          next = {
            top: centerY,
            left: anchorRight + gap,
            transform: 'translate(0, -50%)',
            width: 'max-content',
            maxWidth: maxW,
          };
          break;
        case 'top':
          next = {
            top: anchorTop - gap,
            left: centerX,
            transform: 'translate(-50%, -100%)',
            width: 'max-content',
            maxWidth: maxW,
          };
          break;
        case 'bottom':
        default:
          next = {
            top: anchorBottom + gap,
            left: centerX,
            transform: 'translate(-50%, 0)',
            width: 'max-content',
            maxWidth: maxW,
          };
          break;
      }

      if (immersive) {
        const halfMax = maxW / 2;
        const estH = 56;
        let left = typeof next.left === 'number' ? next.left : centerX;
        let top = typeof next.top === 'number' ? next.top : 0;

        if (effectiveSide === 'top' || effectiveSide === 'bottom') {
          left = Math.min(Math.max(left, halfMax + pad), frameW - halfMax - pad);
          if (effectiveSide === 'bottom') {
            top = Math.min(top, frameH - estH - pad);
            top = Math.max(top, pad);
          } else {
            top = Math.max(top, estH + pad);
            top = Math.min(top, frameH - pad);
          }
        } else {
          top = Math.min(Math.max(top, pad + 20), frameH - pad - 20);
        }

        next = { ...next, left, top };
      }

      setStyle(next);
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
  }, [anchorEl, effectiveSide, frameRef, immersive]);

  return { style, effectiveSide };
}

export function PhoneCoachmarkLayer() {
  const context = useContext(PhoneCoachmarkContext);
  const coachmark = context?.coachmark;
  const immersive = context?.immersive ?? false;
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

  const { style: anchoredStyle, effectiveSide } = useAnchoredCoachmarkStyle(
    anchorEl,
    coachmark?.side ?? 'left',
    context?.frameRef ?? { current: null },
    immersive
  );

  if (!coachmark) return null;

  const { text, placement, anchorRef } = coachmark;
  const isAnchored = !!anchorRef && !!anchorEl && !!anchoredStyle;

  return (
    <div className="sapp-phone-coachmark-layer" aria-live="polite">
      <div
        className={
          isAnchored
            ? `sapp-phone-coachmark sapp-phone-coachmark--anchored sapp-phone-coachmark--side-${effectiveSide}${
                immersive ? ' sapp-phone-coachmark--immersive' : ''
              }`
            : `sapp-phone-coachmark sapp-phone-coachmark--${placement}${
                immersive ? ' sapp-phone-coachmark--immersive' : ''
              }`
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
