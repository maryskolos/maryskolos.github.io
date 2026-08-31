'use client';

import Link from 'next/link';
import { Box, Typography, Container, Chip, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { oliveColors } from '@/constants/oliveTheme';
import { sectionInsetX } from '@/styles/commonStyles';
import { type BlogPost } from '@/constants/blogPosts';
import { WritingMark } from '@/components/portfolio/NavWordmarks';

interface BlogPostArticleProps {
  post: BlogPost;
}

export default function BlogPostArticle({ post }: BlogPostArticleProps) {
  return (
    <Box
      id="article"
      component="article"
      sx={{
        py: { xs: 8, md: 10 },
        ...sectionInsetX,
        bgcolor: oliveColors.cream,
        borderTop: `3px solid ${oliveColors.olivePale}`,
      }}
    >
      <Container maxWidth="md">
        <Button
          component={Link}
          href="/blog/"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 2,
            color: oliveColors.oliveMoss,
            textTransform: 'none',
            fontWeight: 500,
            px: 0,
            '&:hover': { bgcolor: 'transparent', color: oliveColors.oliveDeep },
          }}
        >
          All writing
        </Button>

        <Box sx={{ mb: 2.5 }}>
          <WritingMark height={30} />
        </Box>

        {post.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ bgcolor: oliveColors.olivePale, color: oliveColors.oliveDeep, fontSize: '0.7rem' }}
              />
            ))}
          </Box>
        )}

        <Typography variant="h2" component="h1" sx={{ mb: 3, maxWidth: 640 }}>
          {post.title}
        </Typography>

        <Box sx={{ maxWidth: 640 }}>
          {post.sections.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ mb: section.heading ? 3 : 2.5 }}>
              {section.heading && (
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ color: oliveColors.oliveDeep, fontWeight: 600, mb: 1.5 }}
                >
                  {section.heading}
                </Typography>
              )}
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <Typography
                  key={paragraphIndex}
                  variant="body1"
                  sx={{
                    color: oliveColors.oliveDeep,
                    lineHeight: 1.8,
                    mb: paragraphIndex < section.paragraphs.length - 1 ? 2 : 0,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
