import { ElementType } from "react";
import { cn } from "@/lib/utils";
import CSSIcon from "@/components/icons/CSSIcon";
import HTMLIcon from "@/components/icons/HTMLIcon";
import JSIcon from "@/components/icons/JSIcon";
import AccessibilityIcon from "@/components/icons/AccessibilityIcon";

export type TIconName = "CSS" | "HTML" | "Javascript" | "Accessibility";

const iconMap: Record<TIconName, ElementType> = {
  CSS: CSSIcon,
  HTML: HTMLIcon,
  Javascript: JSIcon,
  Accessibility: AccessibilityIcon,
};

const bgMap = {
  HTML: "bg-fem-soft-orange",
  CSS: "bg-fem-soft-green",
  Javascript: "bg-fem-soft-blue",
  Accessibility: "bg-fem-soft-purple",
};

const textMap = {
  HTML: "text-fem-orange",
  CSS: "text-fem-green",
  Javascript: "text-fem-blue",
  Accessibility: "text-fem-purple",
};

export const IconWrapper = ({ iconName }: { iconName: TIconName }) => {
  const Icon = iconMap[iconName];

  const bg = bgMap[iconName];
  const text = textMap[iconName];
  return (
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-lg",
        bg,
      )}
    >
      <Icon className={cn(text)} />
    </div>
  );
};
