'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Box, Typography, Container, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { oliveColors } from '@/constants/oliveTheme';
import { sectionInsetX } from '@/styles/commonStyles';
import PhoneFrame from '@/components/sapp/PhoneFrame';
import AppCarousel, { SCREENS } from '@/components/sapp/AppCarousel';
import InteractiveDemo from '@/components/sapp/InteractiveDemo';

export default function Hero() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { defaultMatches: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [demoMode, setDemoMode] = useState(false);
  const [demoSession, setDemoSession] = useState(0);
  const [portalReady, setPortalReady] = useState(false);

  const immersive = demoMode && isMobile;

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!immersive) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [immersive]);

  const exitDemo = () => {
    setDemoMode(false);
    setDemoSession((s) => s + 1);
  };

  const handleRedo = () => {
    setDemoSession((s) => s + 1);
  };

  const handleLearnAboutMe = () => {
    setDemoMode(false);
    setDemoSession((s) => s + 1);
    router.push('/#about');
  };

  const demoPhone = (
    <PhoneFrame immersive>
      <InteractiveDemo
        key={demoSession}
        onRedo={handleRedo}
        onLearnAboutMe={handleLearnAboutMe}
      />
    </PhoneFrame>
  );

  const immersiveOverlay =
    portalReady &&
    immersive &&
    createPortal(
      <div className="sapp-immersive-root" role="dialog" aria-modal="true" aria-label="SApp demo">
        <button
          type="button"
          className="sapp-immersive-close"
          onClick={exitDemo}
          aria-label="Close demo"
        >
          <CloseIcon fontSize="small" />
        </button>
        <div className="sapp-immersive-stage">{demoPhone}</div>
      </div>,
      document.body
    );

  return (
    <Box
      id="demo"
      component="section"
      aria-labelledby="sapp-heading"
      sx={{
        py: { xs: 8, md: 12 },
        ...sectionInsetX,
        bgcolor: oliveColors.cream,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gridTemplateRows: { xs: 'auto', md: 'auto auto' },
            columnGap: { xs: 4, md: 6 },
            rowGap: { xs: 2, md: 0 },
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              gridColumn: { md: 1 },
              gridRow: { md: 1 },
              alignSelf: { md: 'center' },
            }}
          >
            <Typography
              id="sapp-heading"
              variant="h2"
              component="h2"
              sx={{
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              SApp
            </Typography>
            <Box
              component="img"
              src="/sapp-logo.png"
              alt="SApp"
              sx={{
                height: { xs: 48, md: 72 },
                width: 'auto',
                mb: 2,
                display: 'block',
                mx: { xs: 'auto', md: 0 },
              }}
            />
            <Typography
              variant="h3"
              component="p"
              sx={{
                fontFamily: 'var(--font-fraunces), "Fraunces", Georgia, serif',
                fontStyle: 'italic',
                color: oliveColors.oliveMoss,
                mb: 2,
                fontWeight: 500,
              }}
            >
              Swipe. Share. Grow.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: oliveColors.oliveMuted, fontWeight: 400, maxWidth: 440 }}
            >
              Connect with local growers for clippings, surplus fruit, and trades
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              overflow: 'hidden',
              pt: { xs: 1.5, md: 4 },
              gridColumn: { md: 2 },
              gridRow: { md: 1 },
            }}
          >
            <PhoneFrame className="sapp-phone--preview">
              {demoMode && !isMobile ? (
                <InteractiveDemo
                  key={demoSession}
                  onRedo={handleRedo}
                  onLearnAboutMe={handleLearnAboutMe}
                />
              ) : (
                <AppCarousel activeIndex={activeIndex} onIndexChange={setActiveIndex} />
              )}
            </PhoneFrame>
          </Box>

          <Box
            className="sapp-phone-controls"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gridColumn: { md: 2 },
              gridRow: { md: 2 },
            }}
          >
            <div
              className="sapp-carousel-dots"
              role="group"
              aria-label="App screens"
              aria-hidden={demoMode && !isMobile}
              style={
                demoMode && !isMobile ? { visibility: 'hidden', pointerEvents: 'none' } : undefined
              }
            >
              {SCREENS.map((screen, index) => (
                <button
                  key={screen.id}
                  className={`sapp-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Screen ${index + 1} of ${SCREENS.length}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  type="button"
                  tabIndex={demoMode && !isMobile ? -1 : undefined}
                  disabled={demoMode && !isMobile}
                />
              ))}
            </div>
            {!(demoMode && isMobile) && (
              <button
                type="button"
                className={`sapp-demo-launch-btn${demoMode ? ' sapp-demo-launch-btn--secondary' : ''}`}
                onClick={() => {
                  if (demoMode) {
                    exitDemo();
                  } else {
                    setDemoMode(true);
                  }
                }}
              >
                {demoMode ? 'Back to preview' : 'Demo SApp'}
              </button>
            )}
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 4,
            color: oliveColors.oliveMuted,
            letterSpacing: '0.06em',
            fontSize: '0.7rem',
          }}
        >
          SApp concept demo
        </Typography>
      </Container>

      {immersiveOverlay}
    </Box>
  );
}
