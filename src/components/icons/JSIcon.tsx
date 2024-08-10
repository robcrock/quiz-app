import React from "react";

interface JSIconProps {
  className?: string;
}

const JSIcon: React.FC<JSIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-10 w-10 ${className}`} // Apply additional classNames
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        className="fill-current text-blue-500" // Default fill color
        d="M21.25 18.75A3.75 3.75 0 0125 15h3.75a1.25 1.25 0 010 2.5H25a1.25 1.25 0 00-1.25 1.25V20A1.25 1.25 0 0025 21.25h1.25A3.75 3.75 0 0130 25v1.25A3.75 3.75 0 0126.25 30H22.5a1.25 1.25 0 010-2.5h3.75a1.25 1.25 0 001.25-1.25V25a1.25 1.25 0 00-1.25-1.25H25A3.75 3.75 0 0121.25 20v-1.25zM20 16.25a1.25 1.25 0 00-2.5 0v10a1.25 1.25 0 01-1.25 1.25h-2.5a1.25 1.25 0 000 2.5h2.5A3.75 3.75 0 0020 26.25v-10zm-15-5A6.25 6.25 0 0111.25 5h17.5A6.25 6.25 0 0135 11.25v17.5A6.25 6.25 0 0128.75 35h-17.5A6.25 6.25 0 015 28.75v-17.5zm6.25-3.75a3.75 3.75 0 00-3.75 3.75v17.5a3.75 3.75 0 003.75 3.75h17.5a3.75 3.75 0 003.75-3.75v-17.5a3.75 3.75 0 00-3.75-3.75h-17.5z"
      ></path>
    </svg>
  );
};

export default JSIcon;
