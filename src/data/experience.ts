export interface Experience {
  role: string;
  company: string;
  url?: string;
  startDate: string;
  endDate: string;
  stack: string[];
  highlight: string;
  details: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Company Name',
    url: 'https://example.com',
    startDate: '2025-01',
    endDate: 'present',
    stack: ['typescript', 'next.js', 'postgres'],
    highlight: 'Shipped X feature used by N users.',
    details: [
      'Owned end-to-end delivery of feature X, from spec to production rollout.',
      'Reduced p95 latency by 40% through query and cache improvements.',
    ],
  },
  {
    role: 'Backend Developer · Intern',
    company: 'Company Name',
    url: 'https://example.com',
    startDate: '2024-03',
    endDate: '2024-12',
    stack: ['node.js', 'express', 'mongodb'],
    highlight: 'Built ingestion pipeline handling N events/day.',
    details: [
      'Designed and implemented event ingestion with backpressure and retry policies.',
      'Added observability (metrics, structured logs) to detect upstream regressions early.',
    ],
  },
  {
    role: 'Research Assistant · AI',
    company: 'Universidad Nacional de San Agustín',
    url: 'https://www.unsa.edu.pe/',
    startDate: '2023-06',
    endDate: '2024-02',
    stack: ['python', 'pytorch'],
    highlight: 'Co-authored paper submitted to journal.',
    details: [
      'Ran experiments to evaluate model performance on internal datasets.',
      'Wrote and edited paper sections covering methodology and results.',
    ],
  },
  {
    role: 'Freelance · Full Stack',
    company: 'Independent',
    startDate: '2022-01',
    endDate: '2023-12',
    stack: ['react', 'node', 'postgres'],
    highlight: 'Delivered N web systems for SMB clients.',
    details: [
      'Scoped requirements directly with clients and translated them into deliverables.',
      'Shipped full systems end-to-end: auth, dashboards, deployments, handover.',
    ],
  },
];
