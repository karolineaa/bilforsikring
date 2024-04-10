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
      className={`mt-8 font-bold rounded-full text-lg md:text-sm px-8 md:px-4 md:ml-2 h-14 md:h-8 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${
        type === "submit"
          ? "bg-black text-white mr-3 hover:bg-gray-800"
          : "border border-spacing-1 border-black text-black ml-3 hover:bg-neutral-100"
      }`}
    >
      {value}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};

export default Button;
