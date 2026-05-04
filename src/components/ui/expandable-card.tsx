import { useState, type KeyboardEvent, type ReactNode } from 'react';

interface Props {
  header: ReactNode;
  body: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
}

export default function ExpandableCard({
  header,
  body,
  defaultOpen = false,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => !disabled && setOpen((v) => !v);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="font-mono text-sm">
      <div
        role={!disabled ? 'button' : undefined}
        tabIndex={!disabled ? 0 : undefined}
        onClick={toggle}
        onKeyDown={onKey}
        aria-expanded={!disabled ? open : undefined}
        className={`flex w-full items-start gap-3 px-2 py-3 text-left transition-colors ${
          !disabled ? 'hover:bg-foreground/2.5 cursor-pointer' : ''
        }`}
      >
        <span className="min-w-0 flex-1">{header}</span>
        <span className="text-foreground/60 mt-0.5 w-5 shrink-0 text-center text-xs">
          {!disabled ? `[${open ? '−' : '+'}]` : ''}
        </span>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">{body}</div>
      </div>
    </div>
  );
}
