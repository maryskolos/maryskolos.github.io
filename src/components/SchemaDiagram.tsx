'use client';

import { Box, Typography, Paper, Tooltip, Chip } from '@mui/material';
import type { SchemaTable } from '@/constants/sappSystemDesign';

export type SchemaTheme = {
  panel: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  tooltipBg: string;
  mono: string;
  sans: string;
};

type SchemaLink = { from: string; to: string };

interface SchemaDiagramProps {
  tables: SchemaTable[];
  links?: readonly SchemaLink[];
  theme: SchemaTheme;
}

function ColumnTooltipBody({ table, theme }: { table: SchemaTable; theme: SchemaTheme }) {
  return (
    <Box sx={{ p: 0.5, maxWidth: 320 }}>
      <Typography sx={{ fontWeight: 700, mb: 0.75, fontSize: '0.8rem', color: theme.accent, fontFamily: theme.mono }}>
        {table.name}
      </Typography>
      <Typography sx={{ fontSize: '0.72rem', color: theme.muted, mb: 1, lineHeight: 1.4, fontFamily: theme.sans }}>
        {table.description}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
        {table.columns.map((col) => (
          <Box
            key={col.name}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 1,
              alignItems: 'baseline',
              borderTop: `1px solid ${theme.border}`,
              pt: 0.4,
            }}
          >
            <Typography sx={{ fontFamily: theme.mono, fontSize: '0.7rem', color: theme.text }}>
              {col.name}
              {col.notes ? (
                <Box component="span" sx={{ color: theme.muted, fontFamily: theme.sans, ml: 0.75 }}>
                  · {col.notes}
                </Box>
              ) : null}
            </Typography>
            <Typography sx={{ fontFamily: theme.mono, fontSize: '0.65rem', color: theme.muted, textAlign: 'right' }}>
              {col.type}
            </Typography>
            {col.constraints.length > 0 && (
              <Typography
                sx={{
                  gridColumn: '1 / -1',
                  fontSize: '0.62rem',
                  color: theme.muted,
                  fontFamily: theme.sans,
                  lineHeight: 1.3,
                }}
              >
                {col.constraints.join(' · ')}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function SchemaDiagram({ tables, links = [], theme }: SchemaDiagramProps) {
  const inbound = new Map<string, string[]>();
  for (const link of links) {
    const list = inbound.get(link.from) ?? [];
    list.push(link.to);
    inbound.set(link.from, list);
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ color: theme.muted, mb: 2, maxWidth: 560, lineHeight: 1.65, fontFamily: theme.sans }}>
        Hover a table for columns and constraints. Arrows in the chips show what each table references.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 1.5,
        }}
      >
        {tables.map((table) => {
          const refs = inbound.get(table.name) ?? [];
          return (
            <Tooltip
              key={table.name}
              arrow
              placement="top"
              enterDelay={200}
              leaveDelay={80}
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: theme.tooltipBg,
                    border: `1px solid ${theme.border}`,
                    boxShadow: '0 12px 32px rgba(0,0,0,0.28)',
                    maxWidth: 360,
                    p: 1.25,
                  },
                },
                arrow: { sx: { color: theme.tooltipBg } },
              }}
              title={<ColumnTooltipBody table={table} theme={theme} />}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: theme.panel,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 2,
                  cursor: 'help',
                  transition: 'border-color 0.15s ease, transform 0.15s ease',
                  '&:hover': {
                    borderColor: theme.accent,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.mono,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: theme.accent,
                    mb: 0.75,
                  }}
                >
                  {table.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.muted, lineHeight: 1.45, mb: 1.25, fontFamily: theme.sans, fontSize: '0.8rem' }}
                >
                  {table.description}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: theme.mono,
                    fontSize: '0.68rem',
                    color: theme.text,
                    mb: refs.length ? 1 : 0,
                    opacity: 0.85,
                  }}
                >
                  {table.columns.length} columns
                </Typography>
                {refs.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {refs.map((ref) => (
                      <Chip
                        key={ref}
                        size="small"
                        label={`→ ${ref}`}
                        sx={{
                          height: 22,
                          fontSize: '0.65rem',
                          fontFamily: theme.mono,
                          bgcolor: 'transparent',
                          border: `1px solid ${theme.border}`,
                          color: theme.muted,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Paper>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
