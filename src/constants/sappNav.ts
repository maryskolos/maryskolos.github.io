export const SAPP_HREF = '/sapp/';

export function normalizePath(path: string) {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
}

export function isPathActive(pathname: string, match: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(match.replace(/#.*$/, '') || '/');
  if (target === '/sapp') {
    return current === '/sapp' || current.startsWith('/sapp/');
  }
  if (target === '/blog') {
    return current === '/blog' || current.startsWith('/blog/');
  }
  return current === target;
}
