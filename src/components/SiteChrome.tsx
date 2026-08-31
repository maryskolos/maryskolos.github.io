'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import Navigation from '@/components/Navigation';
import SideScrollNav from '@/components/SideScrollNav';
import SiteFooter from '@/components/SiteFooter';
import { getSideNavItems } from '@/constants/sideScrollNav';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasSideNav = useMemo(() => getSideNavItems(pathname).length >= 2, [pathname]);

  return (
    <>
      <Navigation />
      <SideScrollNav />
      <Box
        component="main"
        id="main-content"
        sx={{
          // Sections read this for left inset; backgrounds/borders stay full-bleed
          '--side-nav-gutter': '0px',
          '@media (min-width: 900px)': {
            '--side-nav-gutter': hasSideNav ? '4.75rem' : '0px',
          },
        }}
      >
        {children}
      </Box>
      <SiteFooter />
    </>
  );
}
