"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => {
  const clampedValue = Math.min(Math.min(100, Math.max(0, value)), 98); // The min 98 prevents the bar from extending all the way to the end of its parent container.
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-fem-pure-white",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="m-1 h-2 rounded-full bg-fem-purple transition-all"
        style={{ width: `${clampedValue}%` }} // Set width based on clamped value
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
