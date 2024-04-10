import React from "react";

interface ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  value: string;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, value }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-8 font-bold rounded-full text-lg md:text-sm px-8 md:px-4 md:ml-2 h-14 md:h-8 cursor-pointer ${
        type === "submit"
          ? "bg-black text-white mr-3"
          : "border border-spacing-1 border-black text-black ml-3"
      }`}
    >
      {value}
    </button>
  );
};

export default Button;