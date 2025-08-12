'use client';

import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { LinkedIn, Email, Download } from '@mui/icons-material';

export default function Contact() {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Contact
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        Get in touch with me for opportunities, collaborations, or just to say hello!
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        <Button
          variant="contained"
          startIcon={<LinkedIn />}
          href="https://www.linkedin.com/in/mary-skolos-698387128/"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={{
            bgcolor: '#6d809f',
            color: '#ffffff',
            py: 2,
            '&:hover': {
              bgcolor: '#9ca0b9',
            }
          }}
        >
          LinkedIn Profile
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Email />}
          onClick={() => {
            // Try to open default email client
            const mailtoLink = 'mailto:maryskolos@gmail.com?subject=Hello from your website';
            window.open(mailtoLink, '_blank');
          }}
          fullWidth
          sx={{
            bgcolor: '#6d809f',
            color: '#ffffff',
            py: 2,
            '&:hover': {
              bgcolor: '#9ca0b9',
            }
          }}
        >
          Send Email
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Download />}
          href="/resume.pdf"
          target="_blank"
          fullWidth
          sx={{
            bgcolor: '#6d809f',
            color: '#ffffff',
            py: 2,
            '&:hover': {
              bgcolor: '#9ca0b9',
            }
          }}
        >
          Download Resume
        </Button>
      </Box>
    </Box>
  );
} 