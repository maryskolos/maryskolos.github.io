export const emailUtils = {
  templates: {
    general: (email: string) => ({
      email,
      subject: 'Hello from your website',
      body: 'Hi Mary,\n\nI came across your website and would like to connect...',
    }),
  },
};
