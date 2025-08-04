import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("container mx-auto px-4", className)}
      {...props}
    />
  )
);

Container.displayName = 'Container';
export { Container };