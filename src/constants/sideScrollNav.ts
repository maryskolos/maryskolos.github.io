export type SideNavItem = {
  id: string;
  label: string;
};

/** Section anchors for the left sticky scroll menu, keyed by normalized path */
export const SIDE_NAV_BY_PATH: Record<string, SideNavItem[]> = {
  '/': [
    { id: 'home', label: 'Home' },
    { id: 'demos', label: 'Demos' },
    { id: 'writing', label: 'Writing' },
    { id: 'about', label: 'About Me' },
  ],
  '/sapp': [
    { id: 'demo', label: 'Demo' },
    { id: 'the-idea', label: 'The Idea' },
    { id: 'system-design', label: 'System Design' },
  ],
  '/flash-sale-lab': [
    { id: 'overview', label: 'Overview' },
    { id: 'lab', label: 'Lab' },
    { id: 'why', label: 'Why' },
    { id: 'system-design', label: 'System Design' },
  ],
  '/blog': [
    { id: 'writing', label: 'Writing' },
  ],
};

export function getSideNavItems(pathname: string): SideNavItem[] {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (SIDE_NAV_BY_PATH[path]) return SIDE_NAV_BY_PATH[path];
  if (path.startsWith('/blog/')) {
    return [{ id: 'article', label: 'Article' }];
  }
  return [];
}
