import { isValidSectionId } from './security';

export const scrollToSection = (sectionId: string) => {
  if (!isValidSectionId(sectionId)) {
    console.warn(`Invalid section ID: ${sectionId}`);
    return;
  }
  
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
