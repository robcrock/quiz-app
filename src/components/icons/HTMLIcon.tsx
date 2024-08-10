import React from "react";

interface HTMLIconProps {
  className?: string;
}

const HTMLIcon: React.FC<HTMLIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-10 w-10 ${className}`} // Apply additional classNames
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        className="fill-current text-orange-500" // Default fill color
        d="M24.508 7.607a1.25 1.25 0 01.634 1.65l-10 22.5a1.25 1.25 0 11-2.284-1.015l10-22.5a1.251 1.251 0 011.65-.635zM10.832 13.44a1.249 1.249 0 01.1 1.765L6.674 20l4.263 4.795a1.25 1.25 0 11-1.87 1.66l-5-5.625a1.25 1.25 0 010-1.66l5-5.625a1.25 1.25 0 011.764-.105zm18.337 0a1.25 1.25 0 011.765.105l5 5.625a1.25 1.25 0 010 1.66l-5 5.625a1.25 1.25 0 11-1.87-1.66L33.327 20l-4.262-4.795a1.25 1.25 0 01.105-1.765z"
      ></path>
    </svg>
  );
};

export default HTMLIcon;
