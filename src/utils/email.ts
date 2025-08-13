// Email utility functions
export const emailUtils = {
  /**
   * Opens the default email client with pre-filled content
   * @param email - Recipient email address
   * @param subject - Email subject line
   * @param body - Email body content (optional)
   */
  openEmailClient: (email: string, subject: string, body?: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
    window.open(mailtoLink, '_blank');
  },
  
  /**
   * Predefined email templates
   */
  templates: {
    general: (email: string) => ({
      email,
      subject: 'Hello from your website',
      body: 'Hi Mary,\n\nI came across your website and would like to connect...'
    }),
    
    reference: (email: string) => ({
      email,
      subject: 'Reference Request',
      body: 'Hi Mary,\n\nI would like to request a professional reference...'
    }),
    
    opportunity: (email: string) => ({
      email,
      subject: 'Professional Opportunity',
      body: 'Hi Mary,\n\nI have a professional opportunity I\'d like to discuss...'
    })
  }
};
