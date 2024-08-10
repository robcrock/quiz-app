import React from "react";

interface AccessibilityIconProps {
  className?: string;
}

const AccessibilityIcon: React.FC<AccessibilityIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-10 w-10 ${className}`} // Apply additional classNames
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        className="fill-current text-purple-500" // Default fill color
        d="M16.875 8.125a3.125 3.125 0 116.25 0 3.125 3.125 0 01-6.25 0zM20 2.5a5.625 5.625 0 00-5.475 6.915l-4.03-1.625a4 4 0 00-5.19 2.18 3.95 3.95 0 002.175 5.175l5.02 2.027v5.96l-4.532 8.525a3.98 3.98 0 007.024 3.738L20 25.975l5.01 9.42a3.978 3.978 0 007.025-3.735L27.5 23.13v-5.957l5.02-2.028a3.95 3.95 0 002.175-5.175 4 4 0 00-5.19-2.183l-4.027 1.628A5.626 5.626 0 0020 2.5zM7.618 10.922a1.5 1.5 0 011.94-.817l8.57 3.463a5 5 0 003.744 0l8.57-3.463a1.5 1.5 0 011.94.817 1.45 1.45 0 01-.8 1.905l-5.02 2.025A2.5 2.5 0 0025 17.175v5.957c0 .41.1.814.293 1.175l4.535 8.528a1.48 1.48 0 01-2.61 1.39l-5.01-9.425a2.5 2.5 0 00-4.415 0l-5.008 9.418a1.477 1.477 0 11-2.61-1.388l4.532-8.525A2.5 2.5 0 0015 23.133v-5.96a2.5 2.5 0 00-1.563-2.318l-5.02-2.03a1.45 1.45 0 01-.8-1.902z"
      ></path>
    </svg>
  );
};

export default AccessibilityIcon;
