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
    company: 'Hagemsa',
    url: 'https://pe.linkedin.com/company/transportes-hagemsa-sac',
    startDate: '2026-01',
    endDate: 'present',
    stack: [
      'Java',
      'Spring Boot',
      'PHP',
      'Laravel',
      'Hono.js',
      'React',
      'Flutter',
      'PostgreSQL',
      'MySQL',
    ],
    highlight:
      'Developer at a heavy-cargo logistics operator, building backend services across vehicle-maintenance mobile apps and financial systems.',
    details: [
      'Designed a centralized Java/Spring Boot backend for vehicle maintenance work orders, consumed by two Flutter apps — a technician app for per-activity time tracking (start/pause/stop) and a supervisor app with assignment flow and real-time productivity dashboards (pause-reason breakdown, productive time per 8h shift); used daily by 100+ field operators.',
      'Built and shipped a tire lifecycle management system as sole developer (Laravel + React/Vite + Flutter), covering inventory states (available, retreading, scrap) and field operations (repairs, rotations, swaps); generates PDF audit reports with auto-embedded digital signatures; used daily by 17 people.',
      'Hardened an existing cash management system (Hono.js + React + MySQL) with Vitest/Testcontainers integration tests, dynamic reports, and real-time updates over WebSockets.',
    ],
  },
  {
    role: 'ML Researcher',
    company: 'UNSA',
    url: 'https://www.unsa.edu.pe/',
    startDate: '2025-05',
    endDate: 'present',
    stack: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'Deep Learning',
      'GNN',
      'Pandas',
    ],
    highlight:
      "Researching deep learning methods for anomaly detection on 30M+ urban GPS records, within UNSA's SMARQ initiative.",
    details: [
      'Exploring sequence and graph-based architectures (LSTM, GNN, hybrid models) for spatiotemporal anomaly detection.',
      'Targeting a peer-reviewed publication based on the resulting framework.',
    ],
  },
  {
    role: 'Backend Development Intern',
    company: 'UNSA',
    url: 'https://www.unsa.edu.pe/',
    startDate: '2024-08',
    endDate: '2025-07',
    stack: ['TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    highlight:
      'Engineered the backend for a multi-tenant Requirements Engineering platform that decomposes each requirement through elicitation, inference, and specification — each level producing its own document output.',
    details: [
      'Modeled the recursive domain hierarchy: Organizations → Projects → Requirements → Elicitations → Inferences → Specifications.',
      'Implemented Role-Based Access Control across Stakeholder and Admin roles, with JWT-backed sessions.',
      'Developed an automated reporting engine using PDFKit and ExcelJS to generate dynamic specification documents.',
    ],
  },
];
