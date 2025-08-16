export const emailUtils = {
  openEmailClient: (email: string, subject: string, body?: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
    window.open(mailtoLink, '_blank');
  },
  
  templates: {
    general: (email: string) => ({
      email,
      subject: 'Hello from your website',
      body: 'Hi Mary,\n\nI came across your website and would like to connect...'
    })
  }
};
