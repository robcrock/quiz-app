"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QUIZ_DATA, TQuiz } from "@/data/data";
import { IconWrapper, TIconName } from "@/components/icon-wrapper";
import { useReducer } from "react";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { cn } from "@/lib/utils";

const DEFAULT_STATE = {
  currentPage: 0,
  currentChoice: "",
  currentAnswer: "",
  selectedQuiz: "",
  selectedQuizData: {},
  currentQuestionData: {},
  currentQuestion: "",
  currentOptions: [],
  isSubmissionError: false,
  hasChoiceBeenStaged: false,
  hasAnswerBeenRevealed: false,
  score: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET_STATE":
      return DEFAULT_STATE;
    case "STAGE_CHOICE":
      return {
        ...state,
        hasChoiceBeenStaged: true,
        currentChoice: action.payload.choice,
      };
    case "SUBMIT_ANSWER":
      console.log("page", state.currentPage);
      if (state.currentPage > 9) {
        return { ...state };
      }
      if (state.hasAnswerBeenRevealed) {
        const currentQuestionData =
          state.selectedQuizData.questions[state.currentPage];
        const updatedCurrentPage = state.currentPage + 1;

        console.log("currentQuestionData", currentQuestionData);

        return {
          ...state,
          currentChoice: "",
          currentQuestion: currentQuestionData.question,
          currentAnswer: currentQuestionData.answer,
          currentOptions: currentQuestionData.options,
          currentPage: updatedCurrentPage,
          hasChoiceBeenStaged: false,
          hasAnswerBeenRevealed: false,
        };
      } else if (state.hasChoiceBeenStaged) {
        const isAnsweredCorrectly = state.currentAnswer === state.currentChoice;
        const updatedOptions = state.currentOptions.map((option) => {
          console.log("isAnsweredCorrectly", isAnsweredCorrectly);
          console.log("state.currentChoice", state.currentAnswer);
          console.log("option", option);
          if (isAnsweredCorrectly && state.currentChoice === option.option)
            return { ...option, icon: "correct", highlight: "correct" };
          if (!isAnsweredCorrectly && state.currentChoice === option.option)
            return { ...option, icon: "incorrect", highlight: "incorrect" };
          if (!isAnsweredCorrectly && state.currentAnswer === option.option)
            return { ...option, icon: "correct", highlight: "neutral" };
          return { ...option };
        });
        return {
          ...state,
          hasAnswerBeenRevealed: true,
          currentOptions: [...updatedOptions],
          score: isAnsweredCorrectly ? state.score + 1 : state.score,
        };
      } else {
        return {
          ...state,
        };
      }
    case "SET_QUIZ":
      return { ...state, selectedQuiz: action.payload.selectedQuiz };
    case "INCREMENT_PAGE":
      return { ...state, currentPage: state.currentPage + 1 };
    case "IS_SUBMISSION_ERROR":
      return { ...state, isSubmissionError: true };
    case "IS_NOT_SUBMISSION_ERROR":
      return { ...state, isSubmissionError: false };
    case "ANSWER_HAS_BEEN_REVEALED":
      return { ...state, hasAnswerBeenRevealed: true };
    case "ANSWER_HAS_NOT_BEEN_REVEALED":
      return { ...state, hasAnswerBeenRevealed: false };
    case "SET_QUIZ_DATA":
      const originalQuizData = TRANSFORMED_QUIZ_DATA.quizzes;
      const updatedQuizDataArray = originalQuizData.filter(
        (quiz) => quiz.title === state.selectedQuiz,
      );
      const updatedQuizData = updatedQuizDataArray[0];
      const updatedQuizDataQuestions = updatedQuizData.questions;
      const currentQuestionData =
        updatedQuizDataQuestions[state.currentPage - 1];

      return {
        ...state,
        currentQuestion: currentQuestionData.question,
        currentChoice: currentQuestionData.choice,
        currentAnswer: currentQuestionData.answer,
        currentOptions: currentQuestionData.options,
        selectedQuizData: updatedQuizData,
      };
    default:
      return { ...state };
  }
};

// Assuming QUIZ_DATA is imported from your data file
const TRANSFORMED_QUIZ_DATA = {
  quizzes: QUIZ_DATA.quizzes.map((quiz) => ({
    ...quiz,
    questions: quiz.questions.map((question) => ({
      ...question,
      options: question.options.map((option) => ({
        option,
        icon: "none",
        highlight: "none",
      })),
    })),
  })),
};

const question = {
  question: "",
  choice: "",
  answer: "",
  options: {
    option: "",
    result: "neutral",
  },
  isAnsweredCorrectly: false,
};

const DEFAULT_CHOICE = {
  question: "",
  choice: "",
};

const DEFAULT_QUIZ_STATE = Array.from({ length: 10 }, () => question);

export default function Home() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  console.log("state", state);

  const handleQuizSelection = (value: string) => {
    dispatch({
      type: "SET_QUIZ",
      payload: { selectedQuiz: value },
    });
    dispatch({
      type: "INCREMENT_PAGE",
    });
    dispatch({
      type: "SET_QUIZ_DATA",
    });
  };

  const handleMakeChoice = (question: string, choice: string) => {
    dispatch({
      type: "STAGE_CHOICE",
      payload: {
        question,
        choice,
      },
    });

    dispatch({ type: "IS_NOT_SUBMISSION_ERROR" });
  };

  const handleChooseAnswer = (question: string, choice: string) => {
    dispatch({ type: "SUBMIT_ANSWER" });
    // dispatch({ type: "IS_NOT_SUBMISSION_ERROR" });
    // dispatch({ type: "ANSWER_HAS_BEEN_REVEALED" });
  };

  return (
    <main className="m-auto flex min-h-screen w-full max-w-[1160px] flex-col items-center justify-center">
      {state.currentPage === 0 && (
        <QuizSelectionPage handleQuizSelection={handleQuizSelection} />
      )}
      {state.currentPage !== 0 && state.currentPage !== 10 && (
        <section className="flex w-full max-w-[1160px] flex-col gap-8">
          <QuestionPageHeader title={state.selectedQuiz} />
          <section className="flex w-full justify-between">
            <section className="flex w-[465px] flex-col justify-between">
              <section className="flex flex-col gap-6">
                <div className="text-xl italic text-fem-grey-navy">
                  {`Question ${state.currentPage} of 10`}
                </div>
                <div className="text-4xl font-medium text-fem-dark-navy">
                  {state.currentQuestion}
                </div>
              </section>
              <Progress value={state.currentPage * 10} />
            </section>
            <div className="flex w-[564px] flex-col gap-6">
              <ButtonGroup defaultValue="option1">
                {state.currentOptions.map(
                  ({ option, icon, highlight }, index) => {
                    let borderColor = "";
                    if (state.hasAnswerBeenRevealed) {
                      if (highlight === "correct") {
                        borderColor = "border-[3px] border-green";
                      } else if (highlight === "incorrect") {
                        borderColor = "border-[3px] border-red";
                      } else if (state.currentChoice === option) {
                        borderColor = "border-[3px] border-fem-purple";
                      } else {
                        borderColor = "border-[3px] border-none";
                      }
                    }

                    let bgColor = "";
                    if (state.hasAnswerBeenRevealed) {
                      if (highlight === "correct") {
                        bgColor = "bg-green";
                      } else if (highlight === "incorrect") {
                        bgColor = "bg-red";
                      } else if (state.currentChoice === option) {
                        bgColor = "bg-fem-purple";
                      } else {
                        bgColor = "bg-none";
                      }
                    }

                    let hoverColor = "";
                    if (state.hasAnswerBeenRevealed) {
                      if (highlight === "correct") {
                        hoverColor =
                          "group-hover:bg-fem-green group-hover:text-fem-pure-white";
                      } else if (highlight === "incorrect") {
                        hoverColor =
                          "group-hover:bg-fem-red group-hover:text-fem-pure-white";
                      } else if (state.currentChoice === option) {
                        hoverColor =
                          "group-hover:bg-fem-purple group-hover:text-fem-pure-white";
                      } else if (state.currentChoice === "") {
                        hoverColor =
                          "group-hover:bg-fem-soft-purple group-hover:text-fem-purple";
                      } else {
                        hoverColor =
                          "group-hover:bg-fem-light-grey group-hover:text-fem-grey-navy";
                      }
                    }

                    return (
                      <ButtonGroupItem
                        className={borderColor}
                        key={option}
                        icon={
                          <OptionIcon
                            className={cn(bgColor, hoverColor)}
                            index={index}
                          />
                        }
                        label={option}
                        isCorrect={icon === "correct"}
                        isIncorrect={icon === "incorrect"}
                        isNeutral={icon === "none"}
                        value={option}
                        onClick={() =>
                          handleMakeChoice(state.currentQuestion, option)
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
                  handleChooseAnswer(state.currentQuestion, state.currentChoice)
                }
              >
                {state.hasAnswerBeenRevealed
                  ? "Next Question"
                  : "Submit Answer"}
              </Button>
              {state.isSubmissionError && (
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
      {state.currentPage === 10 && (
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
                <IconWrapper iconName={state.selectedQuiz} />{" "}
                <span>{state.selectedQuiz}</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-[144px] font-medium leading-none">
                  {state.score}
                </div>
                <div className="text-[24px] text-fem-grey-navy">out of 10</div>
              </div>
            </div>
            <Button
              variant="default"
              className="w-[564px]"
              onClick={() => dispatch({ type: "RESET_STATE" })}
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
  className?: string;
}) => {
  const letterArray = ["A", "B", "C", "D"];

  return (
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-lg bg-fem-light-grey text-[28px] font-medium text-fem-grey-navy",
        `${className !== "" ? className : "group-data-[state='checked']:bg-fem-purple"}`,
        `${className !== "" ? className : "group-hover:bg-fem-soft-purple group-hover:text-fem-purple"}`,
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
    <header className="mb-14 flex items-center justify-start">
      <div className="flex items-center gap-6 text-[28px] font-medium">
        <IconWrapper iconName={title} /> <span>{title}</span>
      </div>
    </header>
  );
};
