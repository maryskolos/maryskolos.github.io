'use client';

import Link from 'next/link';
import { Box, Typography, Container, Paper, Chip } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { commonStyles, sectionInsetX } from '@/styles/commonStyles';
import { BLOG_POSTS } from '@/constants/blogPosts';
import { WritingMark } from '@/components/portfolio/NavWordmarks';

export default function BlogIndex() {
  return (
    <Box
      id="writing"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        ...sectionInsetX,
        bgcolor: oliveColors.cream,
        borderTop: `3px solid ${oliveColors.olivePale}`,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 1.5 }}>
          <WritingMark height={36} />
        </Box>
        <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
          On engineering and working
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: oliveColors.oliveMuted, lineHeight: 1.75, maxWidth: 560, mb: 4 }}
        >
          Perspectives on AI in development, plus a brief introduction to who I am and how I approach
          the work.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper
                elevation={0}
                sx={{
                  ...commonStyles.paper,
                  ...commonStyles.hover.paper,
                  p: 2.5,
                }}
              >
                {post.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.25 }}>
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ bgcolor: oliveColors.olivePale, fontSize: '0.65rem' }}
                      />
                    ))}
                  </Box>
                )}
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: oliveColors.oliveDeep, lineHeight: 1.65 }}>
                  {post.excerpt}
                </Typography>
              </Paper>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
