import { TRANSFORMED_QUIZ_DATA } from "@/data/data";
import { IconWrapper, TIconName } from "../icon-wrapper";
import { Button } from "../ui/button";

type TQuizSelectPageProps = {
  handleQuizSelection: (name: TIconName) => void;
};

export const QuizSelectionPage = ({
  handleQuizSelection,
}: TQuizSelectPageProps) => {
  const quizzes = TRANSFORMED_QUIZ_DATA.quizzes.map((quiz) => quiz.title);
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
        {quizzes.map((quiz) => {
          return (
            <Button
              key={quiz}
              variant="option"
              size="option"
              startIcon={<IconWrapper iconName={quiz} />}
              onClick={() => handleQuizSelection(quiz)}
            >
              {quiz}
            </Button>
          );
        })}
      </div>
    </section>
  );
};
