"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import HTMLIcon from "@/../public/images/icon-html.svg";
import { Trash } from "lucide-react";
import { QUIZ_DATA } from "@/data/data";

const MyTrash = () => {
  return <Trash className="h-14 w-14 rounded-lg bg-slate-200 p-2" />;
};

const quizes = QUIZ_DATA.quizzes.map((quiz) => quiz.title);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Interactive Elements</h2>
        <div className="flex flex-col">
          <div>Button</div>
          <Button>Button Idle</Button>
        </div>
        <div className="flex w-[564px] flex-col">
          <div>Radio Group</div>
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
