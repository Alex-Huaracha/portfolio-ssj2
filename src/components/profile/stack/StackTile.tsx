import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface StackTileProps {
  position: string;
  name?: string;
  icon?: string;
  isHub?: boolean;
  hubLabel?: string;
  emphasized?: boolean;
}

export function StackTile({
  position,
  name,
  icon,
  isHub,
  hubLabel,
  emphasized,
}: StackTileProps) {
  if (!isHub && !name) return null;

  const transition = emphasized
    ? 'duration-1000 ease-out'
    : 'duration-200 ease-in';

  return (
    <div
      id={`stack-tile-${position}`}
      aria-hidden="true"
      className={cn(
        'group relative z-10 flex cursor-pointer flex-col items-center justify-center rounded-lg bg-card',
        emphasized
          ? 'scale-[1.105] shadow-lg'
          : 'scale-[0.9] hover:scale-[1.105] hover:shadow-lg',
        transition,
        isHub && 'stack-tile-hub',
      )}
      style={{
        width: 'var(--stack-tile-size)',
        height: 'var(--stack-tile-size)',
        gridArea: position,
        animation: isHub ? 'stack-throbe 2.5s infinite' : undefined,
        willChange: 'transform, opacity',
      }}
    >
      {isHub ? (
        <span className="font-mono text-xs font-bold tracking-tight text-card-foreground sm:text-sm">
          {hubLabel}
        </span>
      ) : (
        icon && (
          <Icon
            icon={icon}
            aria-label={name}
            style={{
              width: 'var(--stack-icon-size)',
              height: 'var(--stack-icon-size)',
              minWidth: 'var(--stack-icon-size)',
              minHeight: 'var(--stack-icon-size)',
            }}
          />
        )
      )}
      {!isHub && name && (
        <span
          className={cn(
            'overflow-hidden text-xs font-semibold text-card-foreground group-hover:max-h-6 group-hover:scale-100 group-hover:opacity-100 md:text-sm',
            emphasized
              ? 'max-h-6 scale-100 opacity-100'
              : 'max-h-0 scale-75 opacity-0',
            transition,
          )}
        >
          {name}
        </span>
      )}
    </div>
  );
}
