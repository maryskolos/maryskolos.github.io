'use client';

import { Box, Typography, Paper, Chip } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { commonStyles, sectionInsetX } from '@/styles/commonStyles';
import Contact from './Contact';
import { AboutMeMark } from '@/components/portfolio/NavWordmarks';

const highlights = [
  {
    title: 'E-commerce & checkout',
    detail: 'End-to-end order flows, timed checkout, order success, and payment gateway integrations including Braintree and Authorize.Net.',
  },
  {
    title: 'Security & access control',
    detail: 'Roles-and-permissions reworks, OWASP practices, and secure coding standards.',
  },
  {
    title: 'Cloud & data',
    detail: 'AWS infrastructure, RDS/database management, and performance tuning at scale.',
  },
  {
    title: 'Shipping & compliance',
    detail: 'International tax, shipping code platforms, order tracking, and fulfillment tooling.',
  },
];

const skills = [
  'PHP / Laravel',
  'React / TypeScript',
  'AWS / RDS',
  'MySQL',
  'REST APIs',
  'Payment Gateways',
  'Authorize.Net / Braintree',
  'ShipEngine',
  'Roles & Permissions',
  'Search Optimization',
  'Elasticsearch / Redis',
  'Git / GitHub',
  'Jira / Agile',
  'TDD',
  'OWASP Security',
  'Mentorship',
];

const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Card Kingdom',
    period: '2022 – Present',
    bullets: [
      'Led the payment gateway migration from Braintree to Authorize.Net - owning planning, integration, cutover, and post-launch stability across checkout and order processing.',
      'Rewrote checkout and order-success flows with timed checkout, PayPal support, and cart logic that reduced abandonment and inventory race conditions.',
      'Integrated international tax and shipping platforms (ShipEngine) for accurate order tracking and fulfillment on a high-traffic e-commerce site.',
      'Led roles-and-permissions reworks to strengthen security and access control across internal and customer-facing systems.',
      'Optimized search and database performance through query refactoring, indexing, and Elasticsearch - supporting peak traffic without degrading UX.',
      'Managed AWS/RDS infrastructure and delivered REST APIs plus PowerBI Embedded reporting for stakeholder visibility.',
      'Shipped iteratively in an Agile workflow using GitHub, Jira, code review, and test-driven development.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Lumiio Inc.',
    period: '2020 – 2022',
    bullets: [
      'Led TALL stack (Laravel, Livewire, Alpine.js) development for health data applications deployed on AWS via Laravel Forge.',
      'Owned database and cloud operations - RDS management, deployment pipelines, and reliability improvements for production workloads.',
      'Instituted OWASP security practices and led company-wide secure coding training; mentored junior developers on quality and delivery.',
    ],
  },
  {
    role: 'Junior Developer (Internships)',
    company: 'Shawn Veltman & Associates',
    period: '2017 & 2018',
    bullets: [
      'Built and maintained Laravel-based CRM and sales tracking systems with TDD and automated testing workflows.',
      'Partnered directly with clients to scope features, integrate third-party services, and improve system performance.',
    ],
  },
];

export default function AboutDeveloper() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        ...sectionInsetX,
        bgcolor: oliveColors.olivePale,
        background: `linear-gradient(180deg, ${oliveColors.olivePale}33 0%, ${oliveColors.cream} 100%)`,
      }}
    >
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ mb: 1.5 }}>
          <AboutMeMark height={36} />
        </Box>
        <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
          Experience & background
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2.5, color: oliveColors.oliveMoss }}>
          Resume, skills, and production work
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, maxWidth: 720, lineHeight: 1.8 }}>
          Seattle-based senior engineer building production systems for high-traffic e-commerce and SaaS.
          I specialize in checkout and payment flows, cloud-backed APIs, database performance, and
          security-minded access control - shipping reliable features through Agile teams on GitHub and
          Jira.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            mb: 5,
          }}
        >
          {highlights.map((item) => (
            <Paper
              key={item.title}
              elevation={0}
              sx={{
                ...commonStyles.paper,
                p: 2.5,
                bgcolor: oliveColors.white,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: oliveColors.oliveMoss, mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: oliveColors.oliveDeep, lineHeight: 1.6 }}>
                {item.detail}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: oliveColors.oliveDeep }}>
          Skills & tools
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 5 }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                bgcolor: oliveColors.white,
                color: oliveColors.oliveDeep,
                border: `1px solid ${oliveColors.oliveMuted}`,
                fontWeight: 500,
              }}
            />
          ))}
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: oliveColors.oliveDeep }}>
          Experience
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
          {experience.map((job) => (
            <Paper
              key={job.company}
              sx={{ ...commonStyles.paper, ...commonStyles.hover.paper }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {job.role}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: oliveColors.oliveMoss, mb: 1.25 }}>
                {job.company} · {job.period}
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                {job.bullets.map((bullet, index) => (
                  <Typography
                    key={`${job.company}-${index}`}
                    component="li"
                    variant="body2"
                    sx={{ mb: 0.75, color: oliveColors.oliveDeep, lineHeight: 1.65 }}
                  >
                    {bullet}
                  </Typography>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>

        <Contact />
      </Box>
    </Box>
  );
}
