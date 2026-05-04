import type { Experience } from '../../data/experience';
import { formatDate, formatDuration } from '../../lib/experience';
import CardBody from '../ui/card-body';
import ExpandableCard from '../ui/expandable-card';

interface Props {
  experience: Experience;
  defaultOpen?: boolean;
}

export default function ExperienceCard({
  experience: exp,
  defaultOpen = false,
}: Props) {
  const hasDetails = exp.details.length > 0;

  const header = (
    <>
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-foreground truncate">
          {exp.url ? (
            <a
              href={exp.url}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              {exp.company}
              <span className="text-muted-foreground"> ↗</span>
            </a>
          ) : (
            exp.company
          )}
        </span>
        <span className="text-muted-foreground shrink-0 text-right text-xs whitespace-nowrap tabular-nums">
          {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
          <span className="text-foreground/40 px-0.5">|</span>
          {formatDuration(exp.startDate, exp.endDate)}
        </span>
      </span>
      <span className="text-muted-foreground mt-0.5 block text-xs">
        {exp.role}
      </span>
    </>
  );

  const body = (
    <CardBody
      highlight={exp.highlight}
      details={exp.details}
      stack={exp.stack}
    />
  );

  return (
    <ExpandableCard
      header={header}
      body={body}
      defaultOpen={defaultOpen}
      disabled={!hasDetails}
    />
  );
}
