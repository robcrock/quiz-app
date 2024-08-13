"use client";

import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QUIZ_DATA } from "@/data/data";
import { IconWrapper } from "@/components/icon-wrapper";
import { useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import SunLightIcon from "@/components/icons/SunLightIcon";
import MoonLightIcon from "@/components/icons/MoonLightIcon";
import SunDarkIcon from "@/components/icons/SunDarkIcon";
import MoonDarkIcon from "@/components/icons/MoonDarkIcon";

const question = {
  question: "",
  choice: "",
  answer: "",
  isAnsweredCorrectly: false,
};

const DEFAULT_QUIZ_STATE = Array.from({ length: 10 }, () => question);

export default function Home() {
  const [quizSelection, setQuizSelection] = useState({});
  const [currentChoice, setCurrentChoice] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [quizState, setQuizState] = useState(DEFAULT_QUIZ_STATE);
  const currentScore = quizState.reduce((acc, curr) => {
    const point = curr.isAnsweredCorrectly ? 1 : 0;
    return acc + point;
  }, 0);

  // console.log("currentPage", currentPage);
  console.log("quizSelection", quizSelection);
  console.log("quizState", quizState);
  // console.log("currentChoice", currentChoice);

  const handleQuizSelection = (value: string) => {
    const selectedQuizData = QUIZ_DATA.quizzes.filter((quiz) => {
      return quiz.title === value;
    })[0];

    setQuizSelection(selectedQuizData);

    const newQuizState = selectedQuizData.questions.map((quizQuestion) => {
      return {
        ...question,
        question: quizQuestion.question,
        answer: quizQuestion.answer,
      };
    });
    setQuizState(newQuizState);

    setCurrentPage((prev) => prev + 1);
  };

  const handleMakeChoice = (
    question: Record<string, string>,
    choice: string,
  ) => {
    setCurrentChoice({
      question,
      choice,
    });
  };

  // const handleNextPage = () => {
  //   setCurrentPage((prev) => prev + 1);
  // };

  const handleChooseAnswer = (question: string, choice: string) => {
    console.log("question", question);
    console.log("choice", choice);
    setQuizState((prevState) => {
      const updatedState = prevState.map((state) => {
        if (state.question === question) {
          return {
            ...state,
            question,
            choice,
            isAnsweredCorrectly: state.answer === choice,
          };
        } else {
          return { ...state };
        }
      });
      console.log("updatedState", updatedState);
      return updatedState;
    });

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
      {currentPage !== 0 && currentPage !== 10 && (
        <section className="flex w-full max-w-[1160px] flex-col gap-8">
          <header className="mb-14 flex items-center justify-between">
            <div className="flex items-center gap-6 text-[28px] font-medium">
              <IconWrapper
                iconName={
                  quizSelection?.title === "Javascript"
                    ? "JS"
                    : quizSelection?.title
                }
              />{" "}
              <span>{quizSelection?.title}</span>
            </div>
            <div className="flex items-center gap-1">
              <SunDarkIcon />
              <Switch />
              <MoonDarkIcon />
            </div>
          </header>
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
                    const currentQuestion =
                      quizSelection.questions[currentPage - 1].question;
                    return (
                      <ButtonGroupItem
                        key={option}
                        icon={<OptionIcon index={index} />}
                        label={option}
                        value={option}
                        onClick={() =>
                          handleMakeChoice(currentQuestion, option)
                        }
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
              onClick={() =>
                handleChooseAnswer(currentChoice.question, currentChoice.choice)
              }
            >
              Submit Answer
            </Button>
          </div>
        </section>
      )}
      {currentPage === 10 && (
        <section className="flex w-full justify-between">
          <section className="flex flex-col gap-12">
            <section className="flex flex-col gap-0 text-[64px] leading-none text-fem-dark-navy">
              <div className="font-light">Quiz completed</div>
              <div className="font-medium">You scored...</div>
            </section>
          </section>
          <div className="flex w-[564px] flex-col gap-6">
            <div className="flex w-full flex-col items-center gap-10 rounded-3xl bg-fem-pure-white p-12 text-fem-dark-navy shadow-[0px_16px_40px_0px_#8FA0C124]">
              <div className="flex items-center gap-6 text-[28px] font-medium">
                <IconWrapper
                  iconName={
                    quizSelection?.title === "Javascript"
                      ? "JS"
                      : quizSelection?.title
                  }
                />{" "}
                <span>{quizSelection?.title}</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-[144px] font-medium leading-none">
                  {currentScore}
                </div>
                <div className="text-[24px] text-fem-grey-navy">out of 10</div>
              </div>
            </div>
            <Button
              variant="default"
              className="w-[564px]"
              onClick={() => setCurrentPage(0)}
            >
              Play Again
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
