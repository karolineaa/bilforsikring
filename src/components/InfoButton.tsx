import React, { useState } from "react";

interface InfoButtonProps {
  text: string;
  title: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ text, title }) => {
  /* For å toggle "Vis info" på bonus */
  const [visPopup, setVisPopup] = useState(false);

  const togglePopup = () => {
    setVisPopup(!visPopup);
  };

  return (
    <button type="button" className="p-2.5 mt-4" onClick={togglePopup}>
      <svg
        className="w-7 h-7 md:w-6 md:h-6 text-gray-800 mr-1 hover:animate-pulse"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <span className="sr-only">{title}</span>
      {visPopup && (
        <div className="absolute top-full transform -translate-x-1/3 bg-neutral-100 p-4 w-72 shadow-sm rounded-sm z-10">
          <p>{text}</p>
        </div>
      )}
    </button>
  );
};

export default InfoButton;
