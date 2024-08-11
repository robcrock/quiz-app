"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QUIZ_DATA } from "@/data/data";
import { IconWrapper } from "@/components/icon-wrapper";
import { useState } from "react";

const quizes = QUIZ_DATA.quizzes.map((quiz) => quiz.title);
const htmlQuestions = QUIZ_DATA.quizzes.filter(
  (quiz) => quiz.title === "HTML",
)[0];

console.log("htmlQuestions", htmlQuestions.questions);

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <main className="m-auto flex min-h-screen w-full max-w-[1160px] flex-col items-center justify-center">
      {currentPage === 0 && (
        <section className="flex w-full justify-between">
          <section className="flex flex-col gap-12">
            <section className="flex flex-col gap-0 text-[64px] leading-none text-fem-dark-navy">
              <div className="font-light">Welcome to the</div>
              <div className="font-medium">Frontend Quiz!</div>
            </section>
            <div className="text-xl italic">Pick a subject to get started.</div>
          </section>
          <div className="flex w-[564px] flex-col gap-6">
            <Button
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName="HTML" />}
              onClick={handleNextPage}
            >
              HTML
            </Button>
            <Button
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName="CSS" />}
            >
              CSS
            </Button>
            <Button
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName="JS" />}
            >
              Javascript
            </Button>
            <Button
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName="Accessibility" />}
            >
              Accessibility
            </Button>
          </div>
        </section>
      )}
      {currentPage === 1 && (
        <section className="flex w-full max-w-[1160px] flex-col gap-8">
          <section className="flex w-full justify-between">
            <section className="flex w-[465px] flex-col justify-between">
              <section className="flex flex-col gap-6">
                <div className="text-xl italic text-fem-grey-navy">
                  Question 1 of 10
                </div>
                <div className="text-4xl font-medium text-fem-dark-navy">
                  {htmlQuestions.questions[0].question}
                </div>
              </section>
              <Progress value={100} />
            </section>
            <div className="flex w-[564px] flex-col gap-6">
              <Button
                variant="option"
                size="option"
                startIcon={<IconWrapper iconName="HTML" />}
                onClick={handleNextPage}
              >
                HTML
              </Button>
              <Button
                variant="option"
                size="option"
                startIcon={<IconWrapper iconName="CSS" />}
              >
                CSS
              </Button>
              <Button
                variant="option"
                size="option"
                startIcon={<IconWrapper iconName="JS" />}
              >
                Javascript
              </Button>
              <Button
                variant="option"
                size="option"
                startIcon={<IconWrapper iconName="Accessibility" />}
              >
                Accessibility
              </Button>
            </div>
          </section>
          <div className="flex justify-end">
            <Button variant="default" className="w-[564px]">
              Submit Answer
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}

// const LocalButtonGroup = () => {
//   return (
//     <div className="flex w-[564px] flex-col gap-4">
//       <div className="text-2xl">Radio Group</div>
//       <ButtonGroup defaultValue="option1">
//         {quizes.map((quiz) => {
//           return (
//             <ButtonGroupItem
//               key={quiz}
//               icon={<MyTrash />}
//               label={quiz}
//               value={quiz}
//             />
//           );
//         })}
//       </ButtonGroup>
//     </div>
//   );
// };
