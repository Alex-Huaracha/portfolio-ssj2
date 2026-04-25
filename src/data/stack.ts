import { profile } from './profile';

export const stackGrid = {
  cols: 6,
  rows: 6,
  hub: 'C3',
  hubLabel: profile.initials,
  pixelsPerSecond: 80,
} as const;

export interface StackTile {
  name: string;
  icon: string;
}

export const stackTiles: StackTile[] = [
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Python', icon: 'logos:python' },
  { name: 'Java', icon: 'logos:java' },
  { name: 'PHP', icon: 'logos:php' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Next.js', icon: 'logos:nextjs-icon' },
  { name: 'Nest.js', icon: 'logos:nestjs' },
  { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  { name: 'Spring Boot', icon: 'logos:spring-icon' },
  { name: 'Bun', icon: 'logos:bun' },
  { name: 'Django', icon: 'logos:django-icon' },
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'PostgreSQL', icon: 'logos:postgresql' },
  { name: 'MySQL', icon: 'logos:mysql-icon' },
  { name: 'Redis', icon: 'logos:redis' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon' },
  { name: 'Docker', icon: 'logos:docker-icon' },
  { name: 'Kafka', icon: 'logos:kafka-icon' },
  { name: 'GCP', icon: 'logos:google-cloud' },
];

export const stackDesktopTiles: StackTile[] = [
  { name: 'Git', icon: 'logos:git-icon' },
  { name: 'Jest', icon: 'logos:jest' },
  { name: 'GraphQL', icon: 'logos:graphql' },
  { name: 'Kubernetes', icon: 'logos:kubernetes' },
];
