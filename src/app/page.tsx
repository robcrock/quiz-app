"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TRANSFORMED_QUIZ_DATA } from "@/data/data";
import { IconWrapper, TIconName } from "@/components/icon-wrapper";
import { useReducer } from "react";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { cn } from "@/lib/utils";
import { QuizSelectionPage } from "@/components/pages/quiz-selection-page";
import { QuizCompletedPage } from "@/components/pages/quiz-completed-page";

// Define the State type
type TOption = {
  option: string;
  icon?: string;
  highlight?: string;
};

type TQuestionData = {
  question: string;
  answer: string;
  options: TOption[];
};

type TSelectedQuizData = {
  icon: string;
  questions: TQuestionData[];
};

export type TState = {
  currentPage: number;
  hasChoiceBeenStaged: boolean;
  currentChoice: string;
  currentQuestion: string;
  currentAnswer: string;
  currentOptions: TOption[];
  hasAnswerBeenRevealed: boolean;
  score: number;
  selectedQuiz: TIconName | "";
  selectedQuizData: TSelectedQuizData;
  isSubmissionError: boolean;
};

// Define the Action type
export type TAction =
  | { type: "RESET_STATE" }
  | { type: "SET_CHOICE"; payload: { choice: string } }
  | { type: "SUBMIT_ANSWER" }
  | { type: "SET_QUIZ"; payload: { selectedQuiz: TIconName } }
  | { type: "SET_CURRENT_DATA" }
  | { type: "INCREMENT_PAGE" }
  | { type: "IS_SUBMISSION_ERROR" }
  | { type: "IS_NOT_SUBMISSION_ERROR" }
  | { type: "CHOICE_HAS_BEEN_STAGED" }
  | { type: "CHOICE_HAS_NOT_BEEN_STAGED" }
  | { type: "ANSWER_HAS_BEEN_REVEALED" }
  | { type: "ANSWER_HAS_NOT_BEEN_REVEALED" }
  | { type: "SET_QUIZ_DATA" };

console.log("TRANSFORMED_QUIZ_DATA", TRANSFORMED_QUIZ_DATA);
// Define the initial state
const DEFAULT_STATE: TState = {
  currentPage: 0,
  hasChoiceBeenStaged: false,
  currentChoice: "",
  currentQuestion: "",
  currentAnswer: "",
  currentOptions: [],
  hasAnswerBeenRevealed: false,
  score: 0,
  selectedQuiz: "",
  selectedQuizData: {
    icon: "",
    questions: [],
  },
  isSubmissionError: false,
};

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "SET_QUIZ":
      return { ...state, selectedQuiz: action.payload.selectedQuiz };
    case "SET_QUIZ_DATA":
      const selectedQuizData = TRANSFORMED_QUIZ_DATA.quizzes.filter(
        (quiz) => quiz.title === state.selectedQuiz,
      )[0];
      return {
        ...state,
        selectedQuizData,
      };
    case "RESET_STATE":
      return DEFAULT_STATE;
    case "CHOICE_HAS_BEEN_STAGED":
      return { ...state, hasChoiceBeenStaged: true };
    case "CHOICE_HAS_NOT_BEEN_STAGED":
      return { ...state, hasChoiceBeenStaged: false };
    case "SET_CHOICE":
      return { ...state, currentChoice: action.payload.choice };
    case "SET_CURRENT_DATA":
      const currentQuestionData =
        state.selectedQuizData.questions[state.currentPage];

      return {
        ...state,
        currentChoice: "",
        currentQuestion: currentQuestionData.question,
        currentAnswer: currentQuestionData.answer,
        currentOptions: currentQuestionData.options,
      };
    case "SUBMIT_ANSWER":
      const isAnsweredCorrectly = state.currentAnswer === state.currentChoice;
      const updatedOptions = state.currentOptions.map((option) => {
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
        currentOptions: [...updatedOptions],
        score: isAnsweredCorrectly ? state.score + 1 : state.score,
      };
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
    default:
      return { ...state };
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  console.log("state", state);

  const handleQuizSelection = (value: TIconName) => {
    dispatch({ type: "SET_QUIZ", payload: { selectedQuiz: value } });
    dispatch({ type: "SET_QUIZ_DATA" });
    dispatch({ type: "INCREMENT_PAGE" });
    dispatch({ type: "SET_CURRENT_DATA" });
  };

  const handleMakeChoice = (choice: string) => {
    dispatch({ type: "CHOICE_HAS_BEEN_STAGED" });
    dispatch({ type: "IS_NOT_SUBMISSION_ERROR" });
    dispatch({ type: "SET_CHOICE", payload: { choice } });
  };

  const handleChooseAnswer = () => {
    if (state.currentPage >= 9) {
      dispatch({ type: "INCREMENT_PAGE" });
      return;
    }
    if (!state.hasChoiceBeenStaged) {
      dispatch({ type: "IS_SUBMISSION_ERROR" });
      return;
    }

    if (!state.isSubmissionError) {
      if (state.currentPage >= 1 && state.currentPage <= 9) {
        console.log("CURRENT PAGE", state.currentPage);
        if (state.hasAnswerBeenRevealed) {
          // Update the data to the next question
          dispatch({ type: "INCREMENT_PAGE" });
          dispatch({ type: "SET_CURRENT_DATA" });

          // Reset the flags for the next question
          dispatch({ type: "CHOICE_HAS_NOT_BEEN_STAGED" });
          dispatch({ type: "ANSWER_HAS_NOT_BEEN_REVEALED" });
          dispatch({ type: "IS_NOT_SUBMISSION_ERROR" });
        } else {
          // Reveal the answer
          dispatch({ type: "SUBMIT_ANSWER" });
          dispatch({ type: "ANSWER_HAS_BEEN_REVEALED" });
        }
      }
    }
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
                        onClick={() => handleMakeChoice(option)}
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
                onClick={() => handleChooseAnswer()}
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
        <QuizCompletedPage state={state} dispatch={dispatch} />
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

const QuestionPageHeader = ({ title }: { title: TIconName }) => {
  return (
    <header className="mb-14 flex items-center justify-start">
      <div className="flex items-center gap-6 text-[28px] font-medium">
        <IconWrapper iconName={title} /> <span>{title}</span>
      </div>
    </header>
  );
};
