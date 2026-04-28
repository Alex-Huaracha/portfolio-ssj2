export interface StackCategory {
  name: string;
  items: string[];
}

export const stackCategories: StackCategory[] = [
  {
    name: 'Languages',
    items: ['TypeScript', 'Python', 'Java'],
  },
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Nest.js', 'Spring Boot', 'Django', 'GraphQL'],
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'Redis', 'MongoDB'],
  },
  {
    name: 'DevOps',
    items: ['Docker', 'GCP', 'AWS'],
  },
  {
    name: 'Messaging',
    items: ['Kafka', 'Google Cloud Pub/Sub'],
  },
];
