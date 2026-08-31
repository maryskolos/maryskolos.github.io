'use client';

import { Box, Typography, Container, Paper, Chip } from '@mui/material';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { sectionInsetX } from '@/styles/commonStyles';
import {
  FSL_DESIGN_OVERVIEW,
  FSL_SCHEMA_TABLES,
  FSL_SCHEMA_LINKS,
  FSL_USER_FLOW_STORIES,
} from '@/constants/flashSaleSystemDesign';
import SchemaDiagram from '@/components/SchemaDiagram';

const paperSx = {
  bgcolor: flashSaleColors.bgPanel,
  border: `1px solid ${flashSaleColors.border}`,
  borderRadius: 2,
};

const schemaTheme = {
  panel: flashSaleColors.bgPanel,
  border: flashSaleColors.border,
  text: flashSaleColors.text,
  muted: flashSaleColors.textMuted,
  accent: flashSaleColors.amber,
  tooltipBg: flashSaleColors.bgElevated,
  mono: flashSaleColors.mono,
  sans: flashSaleColors.sans,
};

export default function FlashSaleSystemDesign() {
  return (
    <Box
      id="system-design"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        ...sectionInsetX,
        bgcolor: flashSaleColors.bgElevated,
        background: `linear-gradient(180deg, ${flashSaleColors.bgElevated} 0%, ${flashSaleColors.bg} 100%)`,
        borderTop: `3px solid ${flashSaleColors.amber}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth: 640 }}>
          <Typography
            variant="overline"
            sx={{
              color: flashSaleColors.amber,
              letterSpacing: '0.12em',
              fontWeight: 600,
              fontFamily: flashSaleColors.display,
            }}
          >
            Flash Sale Lab · Design
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 1,
              color: flashSaleColors.text,
              fontFamily: flashSaleColors.display,
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {FSL_DESIGN_OVERVIEW.title}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: flashSaleColors.textMuted, fontWeight: 500, mb: 1.5, fontFamily: flashSaleColors.sans }}
          >
            {FSL_DESIGN_OVERVIEW.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: flashSaleColors.text, lineHeight: 1.75, mb: 2, fontFamily: flashSaleColors.sans }}
          >
            {FSL_DESIGN_OVERVIEW.intro}
          </Typography>
          <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
            {FSL_DESIGN_OVERVIEW.scope.map((item) => (
              <Typography
                key={item}
                component="li"
                variant="body2"
                sx={{ color: flashSaleColors.textMuted, mb: 0.4, lineHeight: 1.55, fontFamily: flashSaleColors.sans }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Typography
          variant="h3"
          component="h3"
          sx={{ fontSize: '1.25rem', mb: 2, color: flashSaleColors.text, fontFamily: flashSaleColors.display }}
        >
          Main flows
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            mb: { xs: 5, md: 6 },
          }}
        >
          {FSL_USER_FLOW_STORIES.map((story, index) => (
            <Paper key={story.id} elevation={0} sx={{ ...paperSx, p: 2.5, height: '100%' }}>
              <Typography
                variant="overline"
                sx={{ color: flashSaleColors.amber, fontWeight: 700, fontFamily: flashSaleColors.display }}
              >
                {index + 1}
              </Typography>
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  lineHeight: 1.3,
                  color: flashSaleColors.text,
                  fontFamily: flashSaleColors.display,
                  fontSize: '1.05rem',
                }}
              >
                {story.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: flashSaleColors.textMuted, mb: 1.25, fontWeight: 500, fontFamily: flashSaleColors.sans }}
              >
                {story.actor}: {story.goal}
              </Typography>
              <Box component="ol" sx={{ pl: 2.25, m: 0, mb: 1.5 }}>
                {story.steps.map((step) => (
                  <Typography
                    key={step}
                    component="li"
                    variant="body2"
                    sx={{ color: flashSaleColors.text, mb: 0.45, lineHeight: 1.5, fontFamily: flashSaleColors.sans }}
                  >
                    {step}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {story.tables.map((table) => (
                  <Chip
                    key={table}
                    label={table}
                    size="small"
                    sx={{
                      bgcolor: flashSaleColors.bg,
                      color: flashSaleColors.textMuted,
                      fontFamily: flashSaleColors.mono,
                      fontSize: '0.68rem',
                      border: `1px solid ${flashSaleColors.border}`,
                    }}
                  />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>

        <Typography
          variant="h3"
          component="h3"
          sx={{ fontSize: '1.25rem', mb: 0.5, color: flashSaleColors.text, fontFamily: flashSaleColors.display }}
        >
          Database
        </Typography>
        <SchemaDiagram tables={FSL_SCHEMA_TABLES} links={FSL_SCHEMA_LINKS} theme={schemaTheme} />
      </Container>
    </Box>
  );
}
