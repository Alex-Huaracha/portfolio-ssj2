import { useState, type KeyboardEvent } from 'react';
import type { Experience } from '../../data/experience';
import { formatDate, formatDuration } from '../../lib/experience';

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience: exp }: Props) {
  const [open, setOpen] = useState(false);
  const hasDetails = exp.details.length > 0;

  const toggle = () => hasDetails && setOpen((v) => !v);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!hasDetails) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="font-mono text-sm">
      <div
        role={hasDetails ? 'button' : undefined}
        tabIndex={hasDetails ? 0 : undefined}
        onClick={toggle}
        onKeyDown={onKey}
        aria-expanded={hasDetails ? open : undefined}
        className={`flex w-full items-start gap-3 px-2 py-3 text-left transition-colors ${
          hasDetails ? 'hover:bg-foreground/2.5 cursor-pointer' : ''
        }`}
      >
        <span className="min-w-0 flex-1">
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
            <span className="text-muted-foreground shrink-0 text-right text-xs tabular-nums whitespace-nowrap">
              {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              <span className="text-foreground/40 px-0.5">|</span>
              {formatDuration(exp.startDate, exp.endDate)}
            </span>
          </span>
          <span className="text-muted-foreground mt-0.5 block text-xs">
            {exp.role}
          </span>
        </span>

        <span className="text-foreground/60 mt-0.5 w-5 shrink-0 text-center text-xs">
          {hasDetails ? `[${open ? '−' : '+'}]` : ''}
        </span>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="text-muted-foreground space-y-2 px-2 pb-4 text-xs">
            <p>
              <span className="text-foreground/40">› </span>
              {exp.highlight}
            </p>

            {hasDetails && (
              <ul className="flex flex-col gap-2">
                {exp.details.map((d, i) => (
                  <li key={i}>
                    <span className="text-foreground/40">› </span>
                    {d}
                  </li>
                ))}
              </ul>
            )}

            <p className="text-muted-foreground/80">
              <span className="text-foreground/40">// </span>
              {exp.stack.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
