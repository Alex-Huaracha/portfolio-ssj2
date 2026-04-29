import { useState } from 'react';
import type { Experience } from '../../data/experience';

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience: exp }: Props) {
  const [open, setOpen] = useState(false);
  const hasDetails = exp.details.length > 0;
  const initial = exp.company.charAt(0).toUpperCase();

  return (
    <li className="relative px-4 py-3 font-mono text-sm">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-muted-foreground/25"
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="10 5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-muted-foreground/25"
      >
        <span className="absolute -top-2 left-0 h-2 w-px bg-current" />
        <span className="absolute top-0 -left-2 h-px w-2 bg-current" />
        <span className="absolute -top-2 right-0 h-2 w-px bg-current" />
        <span className="absolute top-0 -right-2 h-px w-2 bg-current" />
        <span className="absolute -bottom-2 left-0 h-2 w-px bg-current" />
        <span className="absolute bottom-0 -left-2 h-px w-2 bg-current" />
        <span className="absolute -bottom-2 right-0 h-2 w-px bg-current" />
        <span className="absolute bottom-0 -right-2 h-px w-2 bg-current" />
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className={`absolute right-3 bottom-3 flex size-20 items-center justify-center border border-foreground/40 font-mono text-4xl text-foreground transition-opacity duration-500 ${
            open ? 'opacity-10' : 'opacity-0'
          }`}
        >
          {initial}
        </span>
      </span>

      <div className="relative">
        <button
          type="button"
          onClick={() => hasDetails && setOpen((v) => !v)}
          aria-expanded={open}
          disabled={!hasDetails}
          className="flex w-full items-baseline justify-between gap-3 text-left"
        >
          <span className="text-foreground font-medium">{exp.role}</span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="text-muted-foreground text-xs tabular-nums">
              {exp.duration}
            </span>
            {hasDetails && (
              <span className="text-foreground/60 w-[1.25rem] text-center text-xs">
                [{open ? '−' : '+'}]
              </span>
            )}
          </span>
        </button>

        <p className="text-muted-foreground mt-0.5 text-xs">
          {exp.url ? (
            <a
              href={exp.url}
              target="_blank"
              rel="noopener"
              className="hover:text-foreground hover:underline"
            >
              {exp.company} ↗
            </a>
          ) : (
            <span>{exp.company}</span>
          )}
          <span className="px-1">·</span>
          <span className="tabular-nums">
            {exp.startDate} → {exp.endDate}
          </span>
        </p>

        <p className="text-muted-foreground mt-2 text-xs">
          <span className="text-foreground/40">// </span>
          {exp.stack.join(', ')}
        </p>

        <div className="my-2 h-px bg-border" />

        <p className="text-muted-foreground text-xs">
          <span className="text-foreground/40">› </span>
          {exp.highlight}
        </p>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="text-muted-foreground mt-2 flex flex-col gap-2 text-xs">
              {exp.details.map((d, i) => (
                <li key={i}>
                  <span className="text-foreground/40">› </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
