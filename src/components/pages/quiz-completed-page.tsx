import { IconWrapper } from "../icon-wrapper";
import { Button } from "../ui/button";
import { TState, TAction } from "@/app/page";
import { Dispatch } from "react";

type TQuizCompletedPageProps = {
  state: TState;
  dispatch: Dispatch<TAction>;
};

export const QuizCompletedPage = ({
  state,
  dispatch,
}: TQuizCompletedPageProps) => {
  return (
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
  );
};
