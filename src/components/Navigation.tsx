'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { oliveColors } from '@/constants/oliveTheme';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { PORTFOLIO_PROJECTS } from '@/constants/portfolioProjects';
import { SAPP_HREF, isPathActive, normalizePath } from '@/constants/sappNav';
import FlashSaleLogo from '@/components/flashSale/FlashSaleLogo';
import { WritingMark, AboutMeMark } from '@/components/portfolio/NavWordmarks';

const OTHER_PROJECTS = PORTFOLIO_PROJECTS.filter((p) => p.id !== 'sapp');

export default function Navigation() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuOpen, setMenuOpen] = useState(false);
  const isFlashSaleLab = normalizePath(pathname) === '/flash-sale-lab';

  const closeMenu = () => setMenuOpen(false);

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
  const drawerBg = isFlashSaleLab ? flashSaleColors.bgPanel : oliveColors.cream;
  const drawerInk = isFlashSaleLab ? flashSaleColors.text : oliveColors.oliveDeep;
  const drawerMuted = isFlashSaleLab ? flashSaleColors.textMuted : oliveColors.oliveMoss;
  const drawerActive = isFlashSaleLab ? flashSaleColors.amber : oliveColors.oliveMoss;

  const drawerItemSx = (active: boolean) => ({
    py: 1.5,
    px: 2,
    borderRadius: 1,
    mb: 0.5,
    color: active ? drawerActive : drawerInk,
    bgcolor: active
      ? isFlashSaleLab
        ? 'rgba(245, 166, 35, 0.12)'
        : 'rgba(90, 106, 63, 0.12)'
      : 'transparent',
    '&:hover': {
      bgcolor: isFlashSaleLab ? 'rgba(245, 166, 35, 0.08)' : 'rgba(90, 106, 63, 0.08)',
    },
  });

  const desktopLinks = (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 1.5,
        justifyContent: 'flex-end',
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
          mr: 0.5,
          pr: isFlashSaleLab ? 1.25 : 1,
          borderRight: `1px solid ${dividerColor}`,
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
                <FlashSaleLogo variant="full" theme={isFlashSaleLab ? 'dark' : 'light'} height={30} />
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
        sx={{ ...linkSx(isPathActive(pathname, '/blog')), px: 0.75, gap: 0 }}
      >
        <WritingMark theme={isFlashSaleLab ? 'dark' : 'light'} height={28} />
      </Button>

      <Button
        component={Link}
        href="/#about"
        aria-label="About Me"
        sx={{ ...linkSx(isPathActive(pathname, '/#about')), px: 0.75, gap: 0 }}
      >
        <AboutMeMark theme={isFlashSaleLab ? 'dark' : 'light'} height={28} />
      </Button>
    </Box>
  );

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
          gap: 1,
          px: { xs: 1.5, md: 3 },
          minHeight: { xs: 52, md: 64 },
        }}
      >
        <Button
          component={Link}
          href="/"
          onClick={closeMenu}
          sx={{
            ...linkSx(homeActive),
            fontSize: { xs: '1.05rem', md: '1.35rem' },
            fontFamily: 'var(--font-fraunces), "Fraunces", Georgia, serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            px: 0,
            borderBottom: '2px solid transparent',
          }}
        >
          Mary Skolos
        </Button>

        {desktopLinks}

        <IconButton
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMenuOpen((open) => !open)}
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
            color: drawerInk,
            ml: 'auto',
          }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      <Drawer
        id="mobile-nav-drawer"
        anchor="right"
        open={isMobile && menuOpen}
        onClose={closeMenu}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 'min(100vw - 3rem, 300px)',
            bgcolor: drawerBg,
            borderLeft: `1px solid ${dividerColor}`,
            pt: 1,
            px: 1.5,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton aria-label="Close menu" onClick={closeMenu} sx={{ color: drawerInk }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List disablePadding component="nav" aria-label="Site sections">
          <ListItemButton
            component={Link}
            href={SAPP_HREF}
            onClick={closeMenu}
            selected={isPathActive(pathname, '/sapp')}
            aria-label="SApp"
            sx={drawerItemSx(isPathActive(pathname, '/sapp'))}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sapp-logo.png" alt="" style={{ height: 26, width: 'auto' }} />
          </ListItemButton>

          {OTHER_PROJECTS.map((project) => {
            const active = isPathActive(pathname, project.href);
            return (
              <ListItemButton
                key={project.id}
                component={Link}
                href={project.href}
                onClick={closeMenu}
                selected={active}
                sx={drawerItemSx(active)}
              >
                {project.id === 'flash-sale-lab' ? (
                  <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
                    <FlashSaleLogo
                      variant="full"
                      theme={isFlashSaleLab ? 'dark' : 'light'}
                      height={26}
                    />
                  </Box>
                ) : (
                  <ListItemText
                    primary={project.label}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }}
                  />
                )}
              </ListItemButton>
            );
          })}

          <Divider sx={{ my: 1.5, borderColor: dividerColor }} />

          <ListItemButton
            component={Link}
            href="/blog/"
            onClick={closeMenu}
            selected={isPathActive(pathname, '/blog')}
            sx={drawerItemSx(isPathActive(pathname, '/blog'))}
          >
            <WritingMark theme={isFlashSaleLab ? 'dark' : 'light'} height={26} />
          </ListItemButton>

          <ListItemButton
            component={Link}
            href="/#about"
            onClick={closeMenu}
            selected={isPathActive(pathname, '/#about')}
            sx={drawerItemSx(isPathActive(pathname, '/#about'))}
          >
            <AboutMeMark theme={isFlashSaleLab ? 'dark' : 'light'} height={26} />
          </ListItemButton>
        </List>

        <Box sx={{ mt: 'auto', p: 2, pt: 3 }}>
          <Box
            component={Link}
            href="/"
            onClick={closeMenu}
            sx={{
              color: drawerMuted,
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              '&:hover': { color: drawerActive },
            }}
          >
            Home
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
