'use client';

import { Box, Typography, Button } from '@mui/material';
import { LinkedIn, Email, Download } from '@mui/icons-material';
import { commonStyles } from '@/styles/commonStyles';
import { emailUtils } from '@/utils/email';

const CONTACT_EMAIL = 'maryskolos@gmail.com';

export default function Contact() {
  return (
    <Box sx={commonStyles.section}>
      <Typography variant="h2" component="h2" gutterBottom>
        Contact
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        Get in touch with me for opportunities, collaborations, or just to say hello!
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
          LinkedIn Profile
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Email />}
          onClick={() => {
            const template = emailUtils.templates.general(CONTACT_EMAIL);
            emailUtils.openEmailClient(template.email, template.subject, template.body);
          }}
          fullWidth
          sx={commonStyles.button.primary}
        >
          Send Email
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Download />}
          href="/resume.pdf"
          target="_blank"
          fullWidth
          sx={commonStyles.button.primary}
        >
          Download Resume
        </Button>
      </Box>
    </Box>
  );
} 