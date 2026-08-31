'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { PORTFOLIO_PROJECTS } from '@/constants/portfolioProjects';
import { SAPP_HREF, isPathActive, normalizePath } from '@/constants/sappNav';
import FlashSaleLogo from '@/components/flashSale/FlashSaleLogo';
import { WritingMark, AboutMeMark } from '@/components/portfolio/NavWordmarks';

const OTHER_PROJECTS = PORTFOLIO_PROJECTS.filter((p) => p.id !== 'sapp');

export default function Navigation() {
  const pathname = usePathname();
  const isFlashSaleLab = normalizePath(pathname) === '/flash-sale-lab';

  const linkSx = (isActive: boolean) => {
    if (isFlashSaleLab) {
      return {
        color: isActive ? flashSaleColors.amber : flashSaleColors.text,
        fontWeight: isActive ? 600 : 400,
        textTransform: 'none' as const,
        fontSize: '0.9rem',
        borderBottom: isActive ? `2px solid ${flashSaleColors.amber}` : '2px solid transparent',
        borderRadius: 0,
        pb: 0.5,
        px: { xs: 0.75, md: 1 },
        minWidth: 0,
        '&:hover': {
          bgcolor: 'transparent',
          color: flashSaleColors.amber,
        },
      };
    }

    return {
      color: oliveColors.oliveDeep,
      fontWeight: isActive ? 600 : 400,
      textTransform: 'none' as const,
      fontSize: '0.9rem',
      borderBottom: isActive ? `2px solid ${oliveColors.oliveMoss}` : '2px solid transparent',
      borderRadius: 0,
      pb: 0.5,
      px: { xs: 0.75, md: 1 },
      minWidth: 0,
      '&:hover': {
        bgcolor: 'transparent',
        color: oliveColors.oliveMoss,
      },
    };
  };

  const homeActive = normalizePath(pathname) === '/';
  const dividerColor = isFlashSaleLab ? flashSaleColors.border : oliveColors.olivePale;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      component="nav"
      aria-label="Main"
      sx={{
        bgcolor: isFlashSaleLab ? flashSaleColors.bgPanel : oliveColors.cream,
        borderBottom: `1px solid ${dividerColor}`,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: '100%',
          mx: 'auto',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2, md: 3 },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          py: { xs: 1, md: 0 },
        }}
      >
        <Button
          component={Link}
          href="/"
          sx={{
            ...linkSx(homeActive),
            fontSize: { xs: '1.2rem', md: '1.35rem' },
            fontFamily: 'var(--font-fraunces), "Fraunces", Georgia, serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            px: 0,
          }}
        >
          Mary Skolos
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 1.5 },
            flexWrap: 'wrap',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            flex: 1,
          }}
        >
          <Button
            component={Link}
            href={SAPP_HREF}
            aria-label="SApp"
            sx={{
              ...linkSx(isPathActive(pathname, '/sapp')),
              px: isFlashSaleLab ? 0.75 : 0.5,
              py: isFlashSaleLab ? 0.5 : 0,
              mr: { md: 0.5 },
              pr: { md: isFlashSaleLab ? 1.25 : 1 },
              borderRight: { md: `1px solid ${dividerColor}` },
              borderBottom: isFlashSaleLab
                ? `2px solid ${isPathActive(pathname, '/sapp') ? oliveColors.oliveMoss : 'transparent'}`
                : undefined,
              '&:hover': isFlashSaleLab
                ? { bgcolor: 'transparent', '& .sapp-nav-badge': { borderColor: oliveColors.oliveMoss } }
                : undefined,
            }}
          >
            <Box
              className="sapp-nav-badge"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isFlashSaleLab ? oliveColors.cream : 'transparent',
                border: isFlashSaleLab ? `1px solid ${oliveColors.olivePale}` : 'none',
                borderRadius: isFlashSaleLab ? '10px' : 0,
                px: isFlashSaleLab ? 0.75 : 0,
                py: isFlashSaleLab ? 0.375 : 0,
                boxShadow: isFlashSaleLab ? '0 1px 3px rgba(61, 74, 50, 0.12)' : 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sapp-logo.png" alt="" style={{ height: 28, width: 'auto', display: 'block' }} />
            </Box>
          </Button>

          {OTHER_PROJECTS.map((project) => {
            const active = isPathActive(pathname, project.href);
            return (
              <Button
                key={project.id}
                component={Link}
                href={project.href}
                aria-label={project.logo ? project.label : undefined}
                sx={{
                  ...linkSx(active),
                  px: project.logo ? 0.5 : undefined,
                  opacity: project.status === 'coming-soon' && !active ? 0.72 : 1,
                  '&:hover': { opacity: 1 },
                }}
              >
                {project.logo ? (
                  project.id === 'flash-sale-lab' ? (
                    <FlashSaleLogo
                      variant="full"
                      theme={isFlashSaleLab ? 'dark' : 'light'}
                      height={30}
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={project.logo} alt="" style={{ height: 28, width: 'auto', display: 'block' }} />
                  )
                ) : (
                  project.label
                )}
              </Button>
            );
          })}

          <Button
            component={Link}
            href="/blog/"
            aria-label="Writing"
            sx={{
              ...linkSx(isPathActive(pathname, '/blog')),
              px: 0.75,
              gap: 0,
            }}
          >
            <WritingMark theme={isFlashSaleLab ? 'dark' : 'light'} height={28} />
          </Button>

          <Button
            component={Link}
            href="/#about"
            aria-label="About Me"
            sx={{
              ...linkSx(isPathActive(pathname, '/#about')),
              px: 0.75,
              gap: 0,
            }}
          >
            <AboutMeMark theme={isFlashSaleLab ? 'dark' : 'light'} height={28} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
