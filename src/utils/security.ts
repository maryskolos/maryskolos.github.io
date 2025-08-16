export const validSectionIds = ['about', 'skills', 'timeline', 'game', 'contact'] as const;
export type ValidSectionId = typeof validSectionIds[number];

export const isValidSectionId = (id: string): id is ValidSectionId => {
  return validSectionIds.includes(id as ValidSectionId);
};

export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  // Basic HTML entity encoding for XSS prevention
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

export const sanitizeUrl = (url: string): string | null => {
  if (!url) return null;
  
  try {
    const parsed = new URL(url);
    // Only allow http/https protocols
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      // Check if domain is in allowed list for external URLs
      if (typeof window !== 'undefined' && parsed.hostname !== window.location.hostname) {
        const domain = parsed.hostname.replace(/^www\./, '');
        const allowedDomains = ['linkedin.com', 'github.com', 'stackoverflow.com', 'dev.to'];
        if (!allowedDomains.some(allowed => domain.endsWith(allowed))) {
          return null;
        }
      }
      return url;
    }
  } catch {
    return null;
  }
  return null;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
