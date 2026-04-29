export interface Experience {
  id: string;
  role: string;
  company: string;
  url?: string;
  startDate: string;
  endDate: string;
  duration: string;
  stack: string[];
  highlight: string;
  details: string[];
}

export const experiences: Experience[] = [
  {
    id: 'E.01',
    role: 'Software Developer',
    company: 'Company Name',
    url: 'https://example.com',
    startDate: '2025.01',
    endDate: 'present',
    duration: '4mo',
    stack: ['typescript', 'next.js', 'postgres'],
    highlight: 'Shipped X feature used by N users.',
    details: [
      'Owned end-to-end delivery of feature X, from spec to production rollout.',
      'Reduced p95 latency by 40% through query and cache improvements.',
    ],
  },
  {
    id: 'E.02',
    role: 'Backend Developer · Intern',
    company: 'Company Name',
    url: 'https://example.com',
    startDate: '2024.03',
    endDate: '2024.12',
    duration: '10mo',
    stack: ['node.js', 'express', 'mongodb'],
    highlight: 'Built ingestion pipeline handling N events/day.',
    details: [
      'Designed and implemented event ingestion with backpressure and retry policies.',
      'Added observability (metrics, structured logs) to detect upstream regressions early.',
    ],
  },
  {
    id: 'E.03',
    role: 'Research Assistant · AI',
    company: 'Universidad Nacional de San Agustín',
    url: 'https://www.unsa.edu.pe/',
    startDate: '2023.06',
    endDate: '2024.02',
    duration: '1y 8mo',
    stack: ['python', 'pytorch'],
    highlight: 'Co-authored paper submitted to journal.',
    details: [
      'Ran experiments to evaluate model performance on internal datasets.',
      'Wrote and edited paper sections covering methodology and results.',
    ],
  },
  {
    id: 'E.04',
    role: 'Freelance · Full Stack',
    company: 'Independent',
    startDate: '2022',
    endDate: '2023',
    duration: '1y+',
    stack: ['react', 'node', 'postgres'],
    highlight: 'Delivered N web systems for SMB clients.',
    details: [
      'Scoped requirements directly with clients and translated them into deliverables.',
      'Shipped full systems end-to-end: auth, dashboards, deployments, handover.',
    ],
  },
];
