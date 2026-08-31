'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Box, IconButton, Tooltip, Paper } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { oliveColors } from '@/constants/oliveTheme';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { getSideNavItems } from '@/constants/sideScrollNav';
import { normalizePath } from '@/constants/sappNav';

const ICONS: Record<string, ReactNode> = {
  home: <HomeOutlinedIcon fontSize="small" />,
  demos: <AppsOutlinedIcon fontSize="small" />,
  writing: <EditNoteOutlinedIcon fontSize="small" />,
  about: <PersonOutlineIcon fontSize="small" />,
  demo: <PhoneIphoneOutlinedIcon fontSize="small" />,
  'the-idea': <LightbulbOutlinedIcon fontSize="small" />,
  'system-design': <AccountTreeOutlinedIcon fontSize="small" />,
  overview: <DashboardOutlinedIcon fontSize="small" />,
  lab: <ScienceOutlinedIcon fontSize="small" />,
  why: <ForumOutlinedIcon fontSize="small" />,
  article: <ArticleOutlinedIcon fontSize="small" />,
};

const SCROLL_OFFSET = 96;

export default function SideScrollNav() {
  const pathname = usePathname();
  const path = normalizePath(pathname);
  const isFlashSaleLab = path === '/flash-sale-lab';
  const items = useMemo(() => getSideNavItems(pathname), [pathname]);
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
    setActiveId(sectionId);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const sectionIds = items.map((item) => item.id);
    setActiveId(sectionIds[0]);

    const updateActive = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET + 24;
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;

      if (nearBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(sectionIds[i]);
          return;
        }
      }

      setActiveId(sectionIds[0]);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    const hash = window.location.hash.replace(/^#/, '');
    if (hash && sectionIds.includes(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [pathname, items, scrollToSection]);

  if (items.length < 2) return null;

  const accent = isFlashSaleLab ? flashSaleColors.amber : oliveColors.oliveMoss;
  const ink = isFlashSaleLab ? flashSaleColors.text : oliveColors.oliveDeep;
  const muted = isFlashSaleLab ? flashSaleColors.textMuted : oliveColors.oliveMuted;
  const panel = isFlashSaleLab ? flashSaleColors.bgPanel : oliveColors.white;
  const border = isFlashSaleLab ? flashSaleColors.border : oliveColors.olivePale;
  const activeBg = isFlashSaleLab ? 'rgba(245, 158, 11, 0.14)' : oliveColors.olivePale;

  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: 'fixed',
        left: { md: 16, lg: 22 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1100,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 0.75,
          bgcolor: panel,
          borderRadius: 3,
          border: `1px solid ${border}`,
          backdropFilter: 'blur(10px)',
          boxShadow: isFlashSaleLab
            ? '0 8px 28px rgba(0, 0, 0, 0.35)'
            : '0 8px 28px rgba(61, 74, 50, 0.12)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <Tooltip key={item.id} title={item.label} placement="right" arrow>
                <IconButton
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  aria-current={active ? 'true' : undefined}
                  sx={{
                    width: 44,
                    height: 44,
                    color: active ? accent : muted,
                    bgcolor: active ? activeBg : 'transparent',
                    border: '1px solid',
                    borderColor: active ? accent : 'transparent',
                    borderRadius: 2,
                    transition:
                      'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                    '&:hover': {
                      bgcolor: activeBg,
                      color: ink,
                      borderColor: accent,
                      transform: 'scale(1.06)',
                    },
                  }}
                >
                  {ICONS[item.id] ?? <ArticleOutlinedIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
