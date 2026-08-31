'use client';

import { Box, Typography, Container, Paper, Chip } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { commonStyles, sectionInsetX } from '@/styles/commonStyles';
import {
  SAPP_DESIGN_OVERVIEW,
  SAPP_SCHEMA_TABLES,
  SAPP_SCHEMA_LINKS,
  SAPP_USER_FLOW_STORIES,
} from '@/constants/sappSystemDesign';
import SchemaDiagram from '@/components/SchemaDiagram';

const schemaTheme = {
  panel: oliveColors.white,
  border: oliveColors.olivePale,
  text: oliveColors.oliveDeep,
  muted: oliveColors.oliveMuted,
  accent: oliveColors.oliveMoss,
  tooltipBg: oliveColors.white,
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  sans: 'var(--font-figtree), Figtree, system-ui, sans-serif',
};

export default function SappSystemDesign() {
  return (
    <Box
      id="system-design"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        ...sectionInsetX,
        bgcolor: oliveColors.olivePale,
        background: `linear-gradient(180deg, ${oliveColors.olivePale}55 0%, ${oliveColors.cream} 100%)`,
        borderTop: `3px solid ${oliveColors.oliveMuted}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth: 640 }}>
          <Typography variant="overline" sx={{ color: oliveColors.oliveMuted, letterSpacing: '0.12em', fontWeight: 600 }}>
            SApp · Design
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 1,
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {SAPP_DESIGN_OVERVIEW.title}
          </Typography>
          <Typography variant="h6" component="p" sx={{ color: oliveColors.oliveMoss, fontWeight: 500, mb: 1.5 }}>
            {SAPP_DESIGN_OVERVIEW.subtitle}
          </Typography>
          <Typography variant="body1" sx={{ color: oliveColors.oliveDeep, lineHeight: 1.75, mb: 2 }}>
            {SAPP_DESIGN_OVERVIEW.intro}
          </Typography>
          <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
            {SAPP_DESIGN_OVERVIEW.scope.map((item) => (
              <Typography key={item} component="li" variant="body2" sx={{ color: oliveColors.oliveDeep, mb: 0.4, lineHeight: 1.55 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Typography variant="h3" component="h3" sx={{ fontSize: '1.25rem', mb: 2 }}>
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
          {SAPP_USER_FLOW_STORIES.map((story, index) => (
            <Paper key={story.id} elevation={0} sx={{ ...commonStyles.paper, p: 2.5, height: '100%' }}>
              <Typography variant="overline" sx={{ color: oliveColors.oliveMuted, fontWeight: 700 }}>
                {index + 1}
              </Typography>
              <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3, fontSize: '1.05rem' }}>
                {story.title}
              </Typography>
              <Typography variant="body2" sx={{ color: oliveColors.oliveMoss, mb: 1.25, fontWeight: 500 }}>
                {story.actor}: {story.goal}
              </Typography>
              <Box component="ol" sx={{ pl: 2.25, m: 0, mb: 1.5 }}>
                {story.steps.map((step) => (
                  <Typography key={step} component="li" variant="body2" sx={{ color: oliveColors.oliveDeep, mb: 0.45, lineHeight: 1.5 }}>
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
                      bgcolor: oliveColors.olivePale,
                      color: oliveColors.oliveDeep,
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.68rem',
                    }}
                  />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>

        <Typography variant="h3" component="h3" sx={{ fontSize: '1.25rem', mb: 0.5 }}>
          Database
        </Typography>
        <SchemaDiagram tables={SAPP_SCHEMA_TABLES} links={SAPP_SCHEMA_LINKS} theme={schemaTheme} />
      </Container>
    </Box>
  );
}
