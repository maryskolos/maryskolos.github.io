'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Container } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { sectionInsetX } from '@/styles/commonStyles';
import PhoneFrame from '@/components/sapp/PhoneFrame';
import AppCarousel, { SCREENS } from '@/components/sapp/AppCarousel';
import InteractiveDemo from '@/components/sapp/InteractiveDemo';

export default function Hero() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [demoMode, setDemoMode] = useState(false);
  const [demoSession, setDemoSession] = useState(0);

  const handleRedo = () => {
    setDemoSession((s) => s + 1);
  };

  const handleLearnAboutMe = () => {
    setDemoMode(false);
    setDemoSession((s) => s + 1);
    router.push('/#about');
  };

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
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sapp-logo.png"
              alt="SApp"
              style={{ height: 72, width: 'auto', marginBottom: 16 }}
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

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'visible', py: 4 }}>
            <PhoneFrame>
              {demoMode ? (
                <InteractiveDemo
                  key={demoSession}
                  onRedo={handleRedo}
                  onLearnAboutMe={handleLearnAboutMe}
                />
              ) : (
                <AppCarousel activeIndex={activeIndex} onIndexChange={setActiveIndex} />
              )}
            </PhoneFrame>

            {!demoMode ? (
              <>
                <div className="sapp-carousel-dots" role="group" aria-label="App screens">
                  {SCREENS.map((screen, index) => (
                    <button
                      key={screen.id}
                      className={`sapp-dot ${index === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Screen ${index + 1} of ${SCREENS.length}`}
                      aria-current={index === activeIndex ? 'true' : undefined}
                      type="button"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="sapp-demo-launch-btn"
                  onClick={() => setDemoMode(true)}
                >
                  Demo SApp
                </button>
              </>
            ) : (
              <button
                type="button"
                className="sapp-demo-launch-btn sapp-demo-launch-btn--secondary"
                onClick={() => {
                  setDemoMode(false);
                  setDemoSession((s) => s + 1);
                }}
              >
                Back to preview
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
    </Box>
  );
}
