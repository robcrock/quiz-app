"use client";

import { Button } from "@/components/ui/button";
import { QUIZ_DATA } from "@/data/data";
import { IconWrapper } from "@/components/icon-wrapper";
import { useState } from "react";

const quizes = QUIZ_DATA.quizzes.map((quiz) => quiz.title);

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
              startIcon={<IconWrapper iconName="HTML" />}
              onClick={handleNextPage}
            >
              HTML
            </Button>
            <Button startIcon={<IconWrapper iconName="CSS" />}>CSS</Button>
            <Button startIcon={<IconWrapper iconName="JS" />}>
              Javascript
            </Button>
            <Button startIcon={<IconWrapper iconName="Accessibility" />}>
              Accessibility
            </Button>
          </div>
        </section>
      )}
      {currentPage === 1 && <div>Hello Page 1</div>}
    </main>
  );
}

// const SubmitButton = () => {
//   return (
//     <div className="flex flex-col gap-4">
//       <div className="text-2xl">Button</div>
//       <Button>Button Idle</Button>
//     </div>
//   );
// };

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
