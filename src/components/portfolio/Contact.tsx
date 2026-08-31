'use client';

import { Box, Typography, Button } from '@mui/material';
import { LinkedIn, Email, Download } from '@mui/icons-material';
import { commonStyles } from '@/styles/commonStyles';
import { emailUtils } from '@/utils/email';

const CONTACT_EMAIL = 'maryskolos@gmail.com';

export default function Contact() {
  const mailTemplate = emailUtils.templates.general(CONTACT_EMAIL);
  const mailtoHref = `mailto:${mailTemplate.email}?subject=${encodeURIComponent(mailTemplate.subject)}&body=${encodeURIComponent(mailTemplate.body)}`;

  return (
    <Box>
      <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
        Get in Touch
      </Typography>

      <Box sx={commonStyles.grid.threeColumn}>
        <Button
          variant="contained"
          startIcon={<LinkedIn />}
          href="https://www.linkedin.com/in/mary-skolos-698387128/"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={commonStyles.button.primary}
        >
          LinkedIn
        </Button>

        <Button
          variant="contained"
          component="a"
          startIcon={<Email />}
          href={mailtoHref}
          fullWidth
          sx={commonStyles.button.primary}
        >
          Email
        </Button>

        <Button
          variant="contained"
          startIcon={<Download />}
          href="/resume.pdf"
          download="_Mary_Skolos.pdf"
          fullWidth
          sx={commonStyles.button.primary}
        >
          Download Resume
        </Button>
      </Box>
    </Box>
  );
}
