"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import CorrectIcon from "../icons/CorrectIcon";
import IncorrectIcon from "../icons/IncorrectIcon";

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex flex-col gap-6", className)}
      {...props}
      ref={ref}
    />
  );
});
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName;

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  {
    icon: React.ReactNode;
    label: string;
    isCorrect: boolean;
    isIncorrect: boolean;
    isNeutral: boolean;
  } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(
  (
    { className, icon, label, isCorrect, isIncorrect, isNeutral, ...props },
    ref,
  ) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "group relative inline-flex h-24 w-full items-center justify-start gap-8 rounded-3xl border-[3px] bg-fem-pure-white p-5 text-start shadow-[0px_16px_40px_0px_#8FA0C124] focus:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          `${isNeutral && "data-[state='checked']:border-fem-purple"}`,
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div>{icon}</div>
          {isCorrect && (
            <div className="absolute right-8">
              <CorrectIcon />
            </div>
          )}
          {isIncorrect && (
            <div className="absolute right-8">
              <IncorrectIcon />
            </div>
          )}
          {isNeutral && <div className="absolute right-8">{null}</div>}
          <div className="text-[28px] font-medium">{label}</div>
        </div>
      </RadioGroupPrimitive.Item>
    );
  },
);
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { ButtonGroup, ButtonGroupItem };
