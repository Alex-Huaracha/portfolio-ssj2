export interface Project {
  name: string;
  year: string;
  highlight: string;
  repoUrl: string;
  demoUrl?: string;
  stack: string[];
  details: string[];
}

export const projects: Project[] = [
  {
    name: 'nestjs-microservices-shop',
    year: '2026',
    repoUrl: 'https://github.com/Alex-Huaracha/nestjs-microservices-shop',
    highlight:
      'Learning-grade NestJS + Kafka prototype exploring saga choreography, idempotency, and database-per-service on an e-commerce domain — built to face the real problems of event-driven systems, not to ship a product.',
    stack: ['NestJS', 'Kafka', 'Prisma', 'PostgreSQL', 'Docker'],
    details: [
      'Saga choreography with compensation: products-service consumes payment.failed and automatically releases stock reservations — failures roll the system back, not just log an error.',
      'Three-layer idempotency: @@unique(orderId, productId) on stock reservations, @unique(orderId) on payments, and status guards in orders that reject out-of-order transitions.',
      'True database-per-service across 4 independent Postgres instances — no cross-service foreign keys or HTTP calls; flat ID references, each service stores only what it cares about.',
    ],
  },
  {
    name: 'nestjs-auth-lab',
    year: '2026',
    repoUrl: 'https://github.com/Alex-Huaracha/nestjs-auth-lab',
    highlight:
      'A standalone proof-of-concept for secure multi-tenant APIs in NestJS — exploring guard composition, fine-grained RBAC, and tenant isolation before applying them in production. Backed by 29 end-to-end tests.',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Docker'],
    details: [
      'Multi-tenancy via AsyncLocalStorage + Prisma Extension: AuthGuard extracts tenantId from the JWT into CLS context; a Prisma Extension auto-filters every query by tenant — isolation enforced at the data layer, not by hand-written WHERE clauses.',
      "Permission-based RBAC with a decoupled guard pipeline (ThrottlerGuard → AuthGuard → PermissionsGuard): endpoints declare fine-grained permissions via @RequirePermission('users:delete') instead of broad roles, so custom roles can be defined dynamically without redeploys.",
      'Refresh token rotation with reuse detection: each refresh consumes its token; using a previously-used one revokes the entire token family for that user.',
    ],
  },
  {
    name: 'gym-pulse',
    year: '2025',
    repoUrl: 'https://github.com/Alex-Huaracha/gym-pulse',
    highlight:
      'Gym management system (members, plans, memberships, check-ins). Personal project in progress, no auth yet; focus on domain modeling and schema consistency.',
    stack: ['Spring Boot', 'Java', 'PostgreSQL', 'React', 'Vite', 'Tailwind'],
    details: [
      'Check-ins as immutable events with `isValid` persisted at registration time, instead of recomputing access status on read. Preserves historical audit (knowing whether an access was valid when it happened, even if the membership expires later) at the cost of not being able to correct the past if the business rule changes.',
      'Flyway as the single source of truth for the schema, with Hibernate in `ddl-auto=validate`: the app refuses to start if JPA entities drift from the migrated DB. Deliberate choice against `update`/`create-drop` to force every schema change through a versioned, reviewable migration.',
      'Separation between `MembershipPlan` (catalog: price, duration) and `Membership` (instance: dates, payment, member), with `endDate` derived from `startDate + plan.durationDays` at creation. Lets plan pricing/duration change without affecting already-issued memberships.',
    ],
  },
];
