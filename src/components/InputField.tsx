import React from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  placeholder?: string;
  type?: "number" | "text" | "email";
  maxLength?: number;
  name: string;
}

const styles =
  "w-full md:w-1/3 border border-spacing-1 border-black rounded-sm text-md md:text-sm h-12 md:h-8 px-2.5 focus:outline-none focus:ring-2 focus:border-transparent";

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  maxLength,
  name,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        className={`${
          name === "fornavn" || name === "etternavn" ? "md:w-full" : ""
        }  ${styles} ${
          errors[name] ? "focus:ring-red-700" : "focus:ring-neutral-300"
        }`}
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-red-700 text-md md:text-xs mt-2">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

InputField.defaultProps = {
  type: "text",
  maxLength: 100,
};

export default InputField;
