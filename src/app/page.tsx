"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Trash } from "lucide-react";
import { QUIZ_DATA } from "@/data/data";

import { ElementType } from "react";
import { cn } from "@/lib/utils";
import CSSIcon from "@/components/icons/CSSIcon";
import HTMLIcon from "@/components/icons/HTMLIcon";
import JSIcon from "@/components/icons/JSIcon";
import AccessibilityIcon from "@/components/icons/AccessibilityIcon";

const MyTrash = () => {
  return <Trash className="h-14 w-14 rounded-lg bg-slate-200 p-2" />;
};

const quizes = QUIZ_DATA.quizzes.map((quiz) => quiz.title);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-8">
        <h2>Interactive Elements</h2>
        <IconButton />
        <SubmitButton />
        <LocalButtonGroup />
      </div>
      <div>
        {/* <!-- Quiz menu start --> */}
        Welcome to the Frontend Quiz! Pick a subject to get started. HTML CSS
        JavaScript Accessibility
        {/* <!-- Quiz menu end --> */}
        {/* <!-- Quiz question start --> */}
        {/* Question <!-- number --> of 10 */}A B C D Submit answer
        {/* <!-- Quiz question end --> */}
        {/* <!-- Quiz completed start --> */}
        Quiz completed You scored...
        {/* <!-- score --> out of 10 */}
        {/* <!-- Quiz completed end --> */}
      </div>
    </main>
  );
}

type TIconName = "CSS" | "HTML" | "JS" | "Accessibility";

const iconMap: Record<TIconName, ElementType> = {
  CSS: CSSIcon,
  HTML: HTMLIcon,
  JS: JSIcon,
  Accessibility: AccessibilityIcon,
};

const bgMap = {
  HTML: "bg-fem-soft-orange",
  CSS: "bg-fem-soft-green",
  JS: "bg-fem-soft-blue",
  Accessibility: "bg-fem-soft-purple",
};

const textMap = {
  HTML: "text-fem-orange",
  CSS: "text-fem-green",
  JS: "text-fem-blue",
  Accessibility: "text-fem-purple",
};

const IconWrapper = ({ iconName }: { iconName: TIconName }) => {
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

const IconButton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl">Button</div>
      <Button
        startIcon={<IconWrapper iconName="HTML" />}
        className="bg-fem-pure-white"
      >
        HTML
      </Button>
      <Button
        startIcon={<IconWrapper iconName="CSS" />}
        className="bg-fem-pure-white"
      >
        CSS
      </Button>
      <Button
        startIcon={<IconWrapper iconName="JS" />}
        className="bg-fem-pure-white"
      >
        Javascript
      </Button>
      <Button
        startIcon={<IconWrapper iconName="Accessibility" />}
        className="bg-fem-pure-white"
      >
        Accessibility
      </Button>
    </div>
  );
};

const SubmitButton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl">Button</div>
      <Button>Button Idle</Button>
    </div>
  );
};

const LocalButtonGroup = () => {
  return (
    <div className="flex w-[564px] flex-col gap-4">
      <div className="text-2xl">Radio Group</div>
      <ButtonGroup defaultValue="option1">
        {quizes.map((quiz) => {
          return (
            <ButtonGroupItem
              key={quiz}
              icon={<MyTrash />}
              label={quiz}
              value={quiz}
            />
          );
        })}
      </ButtonGroup>
    </div>
  );
};
