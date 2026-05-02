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
    stack: ['React', 'Hono.js', 'MySQL', 'Firebase', 'Google Cloud Platform'],
    highlight:
      'Leading the migration of legacy systems to modern architecture, ensuring business continuity while modernizing the technology stack.',
    details: [
      'Developing cash management modules: expense tracking, income processing, settlements, travel allowances, and manifests for heavy cargo transportation.',
      'Architecting full-stack solutions with React and Hono.js to optimize financial and logistics workflows across multiple business units.',
      'Implementing cloud-based infrastructure on Firebase and Google Cloud Platform to enhance scalability and reliability.',
      'Managing MySQL databases handling complex transactional data for transportation operations across Latin America.',
    ],
  },
  {
    role: 'Software Developer ',
    company: 'Freelance',
    startDate: '2025-07',
    endDate: '2025-11',
    stack: [
      'Node.js',
      'Docker',
      'Redis',
      'PostgreSQL',
      'Prisma',
      'Microservices',
    ],
    highlight:
      'Architected and developed a scalable microservices e-commerce platform using Node.js and Docker.',
    details: [
      'Orchestrated isolated services (Auth, Product, Order) through a unified API Gateway pattern.',
      'Implemented asynchronous communication and background jobs using Redis and Bull Queues for high-performance notification handling.',
      'Secured endpoints with JWT (access/refresh tokens) and Role-Based Access Control (RBAC).',
      'Containerized the entire ecosystem with Docker Compose for consistent deployment environments.',
    ],
  },
  {
    role: 'Independent ML Researcher',
    company: 'UNSA',
    url: 'https://www.unsa.edu.pe/',
    startDate: '2025-05',
    endDate: 'present',
    stack: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'GNN', 'Pandas'],
    highlight:
      "Researching deep learning methods for anomaly detection on large-scale urban GPS data, within UNSA's SMARQ initiative.",
    details: [
      'Exploring sequence and graph-based architectures (LSTM, GNN, hybrid models) for spatiotemporal anomaly detection.',
      'Building reproducible data pipelines in Python to preprocess and analyze 30M+ GPS records across multiple units.',
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
      'Engineered the backend for a Requirements Engineering Automation Platform, streamlining the software specification lifecycle from elicitation to delivery.',
    details: [
      'Architected a type-safe REST API using Node.js, Express, and TypeScript.',
      'Designed multi-tenant database schemas with Prisma ORM and PostgreSQL to manage Organizations, Projects, and Artifacts.',
      'Implemented Role-Based Access Control (RBAC) and JWT authentication for Stakeholders and Admins.',
      'Developed an automated reporting engine using PDFKit and ExcelJS to generate dynamic specification documents.',
    ],
  },
];
