"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QUIZ_DATA } from "@/data/data";
import { IconWrapper } from "@/components/icon-wrapper";
import { useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import HTMLIcon from "@/components/icons/HTMLIcon";
import { cn } from "@/lib/utils";

// const quizes = QUIZ_DATA.quizzes.map((quiz) => quiz.title);
// const htmlQuestions = QUIZ_DATA.quizzes.filter(
//   (quiz) => quiz.title === "HTML",
// )[0];

// console.log("htmlQuestions", htmlQuestions.questions);

export default function Home() {
  const [quizSelection, setQuizSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const handleQuizSelection = (value: string) => {
    const selectedQuizData = QUIZ_DATA.quizzes.filter((quiz) => {
      return quiz.title === value;
    })[0];
    setQuizSelection(selectedQuizData);
    setCurrentPage((prev) => prev + 1);
  };

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
              onClick={() => handleQuizSelection("HTML")}
            >
              HTML
            </Button>
            <Button
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName="CSS" />}
              onClick={() => handleQuizSelection("CSS")}
            >
              CSS
            </Button>
            <Button
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName="JS" />}
              onClick={() => handleQuizSelection("JavaScript")}
            >
              Javascript
            </Button>
            <Button
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName="Accessibility" />}
              onClick={() => handleQuizSelection("Accessibility")}
            >
              Accessibility
            </Button>
          </div>
        </section>
      )}
      {currentPage !== 0 && (
        <section className="flex w-full max-w-[1160px] flex-col gap-8">
          <section className="flex w-full justify-between">
            <section className="flex w-[465px] flex-col justify-between">
              <section className="flex flex-col gap-6">
                <div className="text-xl italic text-fem-grey-navy">
                  {`Question ${currentPage} of 10`}
                </div>
                <div className="text-4xl font-medium text-fem-dark-navy">
                  {quizSelection.questions[currentPage - 1].question}
                </div>
              </section>
              <Progress value={currentPage * 10} />
            </section>
            <div className="flex w-[564px] flex-col gap-6">
              <ButtonGroup defaultValue="option1">
                {quizSelection.questions[currentPage - 1].options.map(
                  (option, index) => {
                    return (
                      <ButtonGroupItem
                        key={option}
                        icon={<OptionIcon index={index} />}
                        label={option}
                        value={option}
                      />
                    );
                  },
                )}
              </ButtonGroup>
            </div>
          </section>
          <div className="flex justify-end">
            <Button
              variant="default"
              className="w-[564px]"
              onClick={handleNextPage}
            >
              Submit Answer
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}

const OptionIcon = ({ index }: { index: number }) => {
  const letterArray = ["A", "B", "C", "D"];

  return (
    <div
      className={
        "flex h-14 w-14 items-center justify-center rounded-lg bg-fem-light-grey text-[28px] font-medium text-fem-grey-navy"
      }
    >
      {letterArray[index]}
    </div>
  );
};
