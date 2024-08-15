"use client";

import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QUIZ_DATA, TQuiz, TQuizzes } from "@/data/data";
import { IconWrapper, TIconName } from "@/components/icon-wrapper";
import { useEffect, useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import SunLightIcon from "@/components/icons/SunLightIcon";
import MoonLightIcon from "@/components/icons/MoonLightIcon";
import SunDarkIcon from "@/components/icons/SunDarkIcon";
import MoonDarkIcon from "@/components/icons/MoonDarkIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { cn } from "@/lib/utils";

const question = {
  question: "",
  choice: "",
  answer: "",
  isAnsweredCorrectly: false,
};

const DEFAULT_CHOICE = {
  question: "",
  choice: "",
};

const DEFAULT_QUIZ_STATE = Array.from({ length: 10 }, () => question);

const calculateScore = (state: any[]): number => {
  return state.reduce((acc, curr) => {
    const point = curr.isAnsweredCorrectly ? 1 : 0;
    return acc + point;
  }, 0);
};

export default function Home() {
  const [activeQuizData, setActiveQuizData] = useState(QUIZ_DATA.quizzes[0]);
  const [currentChoice, setCurrentChoice] = useState(DEFAULT_CHOICE);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const [hasAnswerBeenRevealed, setHasAnsweredBeenReleaved] = useState(false);
  const [quizState, setQuizState] = useState(DEFAULT_QUIZ_STATE);

  const isOptionChosen =
    Object.values(currentChoice).filter((option) => option !== "").length !== 0;
  // useEffect(() => {
  //   setIsSubmissionError(!isOptionChosen ? true : false);
  // }, [currentChoice]);

  // console.log("currentPage", currentPage);
  // console.log("quizSelection", quizSelection);
  // console.log("quizState", quizState);
  // console.log("currentChoice", currentChoice);
  // console.log("isSubmissionError", isSubmissionError);
  // console.log("isEmpty", Object.keys(currentChoice).length === 0);

  const handleQuizSelection = (value: string) => {
    const selectedQuizData = QUIZ_DATA.quizzes.filter((quiz) => {
      return quiz.title === value;
    })[0];

    setActiveQuizData(selectedQuizData);

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

  const handleMakeChoice = (question: string, choice: string) => {
    setCurrentChoice({
      question,
      choice,
    });
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
    setIsSubmissionError(false);
  };

  const handleChooseAnswer = (question: string, choice: string) => {
    // Is an option chosen?
    if (!isOptionChosen) {
      console.log("No option chosen");
      setIsSubmissionError(true);
      return;
    }

    // Has an option been chosen and the answer has not been revealed
    if (isOptionChosen && !hasAnswerBeenRevealed) {
      console.log("Option chosen, but answer not revealed");
      setIsSubmissionError(false);
      setHasAnsweredBeenReleaved(true);
      setCurrentPage(currentPage);
      return;
    }

    if (isOptionChosen && hasAnswerBeenRevealed) {
      console.log("Option chosen and answer revealed");
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

      // Reset the state
      setIsSubmissionError(false);
      setCurrentChoice(DEFAULT_CHOICE);
      setHasAnsweredBeenReleaved(false);
    }
  };

  return (
    <main className="m-auto flex min-h-screen w-full max-w-[1160px] flex-col items-center justify-center">
      {currentPage === 0 && (
        <QuizSelectionPage handleQuizSelection={handleQuizSelection} />
      )}
      {currentPage !== 0 && currentPage !== 10 && (
        <section className="flex w-full max-w-[1160px] flex-col gap-8">
          <QuestionPageHeader title={activeQuizData?.title} />
          <section className="flex w-full justify-between">
            <section className="flex w-[465px] flex-col justify-between">
              <section className="flex flex-col gap-6">
                <div className="text-xl italic text-fem-grey-navy">
                  {`Question ${currentPage} of 10`}
                </div>
                <div className="text-4xl font-medium text-fem-dark-navy">
                  {activeQuizData.questions[currentPage - 1].question}
                </div>
              </section>
              <Progress value={currentPage * 10} />
            </section>
            <div className="flex w-[564px] flex-col gap-6">
              <ButtonGroup defaultValue="option1">
                {activeQuizData.questions[currentPage - 1].options.map(
                  (option, index) => {
                    const currentQuestion =
                      activeQuizData.questions[currentPage - 1].question;

                    const curQuestion = quizState.filter(
                      (q) => q.question === currentQuestion,
                    )[0];
                    console.log(
                      "isAnsweredCorrectly",
                      curQuestion.isAnsweredCorrectly,
                    );

                    // style correctly answered option
                    let borderColor = "";
                    if (curQuestion.isAnsweredCorrectly) {
                      if (option === curQuestion.choice)
                        borderColor = "border-[3px] border-green";
                    } else if (!curQuestion.isAnsweredCorrectly) {
                      if (option === curQuestion.choice)
                        borderColor = "border-[3px] border-red";
                    }

                    let bgColor = "";
                    if (curQuestion.isAnsweredCorrectly) {
                      if (option === curQuestion.choice) bgColor = "bg-green";
                    } else if (!curQuestion.isAnsweredCorrectly) {
                      if (option === curQuestion.choice) bgColor = "bg-red";
                    }

                    // answered correctly and choice === answer
                    // - highlight choice
                    const correctAnswer = curQuestion.answer === option;

                    // answered incorrectly and choice !== answer
                    // - highlight choice
                    const incorrectChoice =
                      !correctAnswer && curQuestion.choice === option;

                    // answered and neither choice nor answer
                    const neutralOutcome = !correctAnswer && !incorrectChoice;

                    const isOptionCorrect =
                      curQuestion.isAnsweredCorrectly &&
                      option === curQuestion.choice;

                    return (
                      <ButtonGroupItem
                        className={borderColor}
                        key={option}
                        icon={<OptionIcon className={bgColor} index={index} />}
                        label={option}
                        isCorrect={correctAnswer}
                        isIncorrect={incorrectChoice}
                        isNeutral={neutralOutcome}
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
            <div className="flex flex-col items-center gap-8">
              <Button
                variant="default"
                className="w-[564px]"
                onClick={() =>
                  handleChooseAnswer(
                    currentChoice.question,
                    currentChoice.choice,
                  )
                }
              >
                {isOptionChosen ? "Next Question" : "Submit Answer"}
              </Button>
              {isSubmissionError && (
                <div className="flex items-center gap-2">
                  <ErrorIcon />
                  <span className="text-2xl text-[#EE5454]">
                    Please select an answer
                  </span>
                </div>
              )}
            </div>
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
                <IconWrapper iconName={activeQuizData?.title} />{" "}
                <span>{activeQuizData?.title}</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-[144px] font-medium leading-none">
                  {calculateScore(quizState)}
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

const OptionIcon = ({
  index,
  className,
}: {
  index: number;
  className: string;
}) => {
  const letterArray = ["A", "B", "C", "D"];

  return (
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-lg bg-fem-light-grey text-[28px] font-medium text-fem-grey-navy",
        "group-hover:bg-fem-soft-purple group-hover:text-fem-purple",
        `${className !== "" ? className : "group-data-[state='checked']:bg-fem-purple"}`,
        "group-data-[state='checked']:text-fem-pure-white",
        className,
      )}
    >
      {letterArray[index]}
    </div>
  );
};

type TQuizSelectPageProps = {
  handleQuizSelection: (name: TIconName) => void;
};

const QuizSelectionPage = ({ handleQuizSelection }: TQuizSelectPageProps) => {
  return (
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
          startIcon={<IconWrapper iconName="JavaScript" />}
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
  );
};

const QuestionPageHeader = ({ title }: Pick<TQuiz, "title">) => {
  return (
    <header className="mb-14 flex items-center justify-between">
      <div className="flex items-center gap-6 text-[28px] font-medium">
        <IconWrapper iconName={title} /> <span>{title}</span>
      </div>
      <div className="flex items-center gap-1">
        <SunDarkIcon />
        <Switch />
        <MoonDarkIcon />
      </div>
    </header>
  );
};
