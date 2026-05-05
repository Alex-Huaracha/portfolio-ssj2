import type { Project } from '../../data/projects';
import CardBody from '../ui/card-body';
import ExpandableCard from '../ui/expandable-card';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const hasDetails = project.details.length > 0;

  const header = (
    <span className="flex items-baseline justify-between gap-3">
      <span className="text-foreground truncate">{project.name}</span>
      <span className="text-muted-foreground flex shrink-0 items-center gap-2 text-xs whitespace-nowrap tabular-nums">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.stopPropagation()}
          className="hover:underline"
        >
          repo ↗
        </a>
        {project.demoUrl && (
          <>
            <span className="text-foreground/40">|</span>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              demo ↗
            </a>
          </>
        )}
        <span className="text-foreground/40">|</span>
        <span>{project.year}</span>
      </span>
    </span>
  );

  const body = (
    <CardBody
      highlight={project.highlight}
      details={project.details}
      stack={project.stack}
    />
  );

  return <ExpandableCard header={header} body={body} disabled={!hasDetails} />;
}
