'use client';

import Link from 'next/link';
import { Box, Typography, Container, Paper, Chip } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { commonStyles, sectionInsetX } from '@/styles/commonStyles';
import { PORTFOLIO_PROJECTS } from '@/constants/portfolioProjects';
import { BLOG_POSTS } from '@/constants/blogPosts';
import FlashSaleLogo from '@/components/flashSale/FlashSaleLogo';
import { WritingMark, DemosMark } from '@/components/portfolio/NavWordmarks';

function ProjectCardTitle({ project }: { project: (typeof PORTFOLIO_PROJECTS)[number] }) {
  if (project.id === 'flash-sale-lab') {
    return <FlashSaleLogo variant="full" theme="light" height={40} />;
  }

  if (project.logo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={project.logo} alt={project.logoAlt ?? project.label} style={{ height: 40, width: 'auto' }} />
    );
  }

  return (
    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
      {project.label}
    </Typography>
  );
}

export default function PortfolioHome() {
  return (
    <Box
      id="home"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        ...sectionInsetX,
        bgcolor: oliveColors.cream,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 560, mb: { xs: 5, md: 6 } }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.35rem', md: '3.25rem' },
              letterSpacing: '-0.02em',
              mb: 1.5,
            }}
          >
            Mary Skolos
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ color: oliveColors.oliveMoss, fontWeight: 500, mb: 2 }}
          >
            Full-Stack Software Engineer
          </Typography>
          <Typography variant="body1" sx={{ color: oliveColors.oliveMuted, lineHeight: 1.8, maxWidth: 480 }}>
            Concept demos, case studies, and short writing on engineering - checkout systems,
            cloud-backed APIs, and product work for high-traffic e-commerce.
          </Typography>
        </Box>

        <Box id="demos" sx={{ mb: 2.5, scrollMarginTop: '5.5rem' }}>
          <DemosMark height={28} />
          <Typography
            variant="body2"
            sx={{ color: oliveColors.oliveMuted, lineHeight: 1.65, mt: 1, maxWidth: 480 }}
          >
            Interactive concept demos you can click through.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          {PORTFOLIO_PROJECTS.map((project) => {
            const isFlashSaleCard = project.id === 'flash-sale-lab';

            return (
            <Link
              key={project.id}
              href={project.href}
              aria-label={project.label}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper
                elevation={0}
                sx={{
                  ...commonStyles.paper,
                  ...commonStyles.hover.paper,
                  p: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
              {isFlashSaleCard ? (
                <Box
                  sx={{
                    px: 2.5,
                    py: 2,
                    background: `linear-gradient(135deg, ${flashSaleColors.bgPanel} 0%, ${flashSaleColors.bg} 100%)`,
                    borderBottom: `1px solid ${flashSaleColors.border}`,
                  }}
                >
                  <FlashSaleLogo variant="full" theme="dark" height={40} />
                </Box>
              ) : null}
              <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
              {!isFlashSaleCard && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <ProjectCardTitle project={project} />
                {project.status === 'coming-soon' && (
                  <Chip
                    label="Soon"
                    size="small"
                    sx={{ ml: 'auto', bgcolor: oliveColors.olivePale, fontSize: '0.65rem' }}
                  />
                )}
              </Box>
              )}
              {isFlashSaleCard && project.status === 'coming-soon' && (
                <Chip
                  label="Soon"
                  size="small"
                  sx={{ alignSelf: 'flex-start', bgcolor: oliveColors.olivePale, fontSize: '0.65rem' }}
                />
              )}
              {project.tagline && (
                <Typography variant="body2" sx={{ color: oliveColors.oliveMoss, fontWeight: 500 }}>
                  {project.tagline}
                </Typography>
              )}
              {project.summary && (
                <Typography variant="body2" sx={{ color: oliveColors.oliveDeep, lineHeight: 1.6 }}>
                  {project.summary}
                </Typography>
              )}
              </Box>
              </Paper>
            </Link>
            );
          })}
        </Box>

        <Box id="writing" sx={{ mt: { xs: 5, md: 6 }, mb: 2.5, scrollMarginTop: '5.5rem' }}>
          <WritingMark height={28} />
          <Typography
            variant="body2"
            sx={{ color: oliveColors.oliveMuted, lineHeight: 1.65, mt: 1, maxWidth: 480 }}
          >
            Short posts on AI in development, plus a brief introduction.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: oliveColors.oliveDeep, lineHeight: 1.6 }}>
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
