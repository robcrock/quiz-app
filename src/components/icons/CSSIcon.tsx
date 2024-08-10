import React from "react";

interface CSSIconProps {
  className?: string;
}

const CSSIcon: React.FC<CSSIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-10 w-10 ${className}`} // Apply additional classNames
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        className="fill-current" // Default fill color
        d="M10 2.505a1.25 1.25 0 00-1.25 1.25V21.25a5 5 0 005 5H15v6.25a4.999 4.999 0 009.615 1.913c.25-.607.38-1.257.38-1.913v-6.25h1.255a5 5 0 005-5V3.755A1.25 1.25 0 0030 2.505H10zM28.75 17.5h-17.5V5.005h7.5V8.76a1.25 1.25 0 002.5 0V5.005h2.5v6.24a1.25 1.25 0 002.5 0v-6.24h2.5V17.5zm-17.5 3.75V20h17.5v1.25a2.5 2.5 0 01-2.5 2.5h-2.505a1.25 1.25 0 00-1.25 1.25v7.5a2.497 2.497 0 11-4.995 0V25a1.25 1.25 0 00-1.25-1.25h-2.5a2.5 2.5 0 01-2.5-2.5z"
      ></path>
    </svg>
  );
};

export default CSSIcon;
