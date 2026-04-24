import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextFlipProps {
  items: readonly ReactNode[];
  className?: string;
  interval?: number;
  transition?: { duration?: number };
  variants?: Variants;
}

const defaultVariants: Variants = {
  initial: { y: -8, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 8, opacity: 0 },
};

export function TextFlip({
  items,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants = defaultVariants,
}: TextFlipProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (items.length <= 1 || shouldReduceMotion) return;

    const tick = () => {
      if (document.visibilityState !== 'visible') return;
      setIndex((prev) => (prev + 1) % items.length);
    };

    const timer = window.setInterval(tick, interval * 1000);
    return () => clearInterval(timer);
  }, [items.length, interval, shouldReduceMotion]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={index}
        className={cn('inline-block', className)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        variants={variants}
      >
        {items[index]}
      </motion.span>
    </AnimatePresence>
  );
}
