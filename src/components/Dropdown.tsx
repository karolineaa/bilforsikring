import React from "react";
import { useFormContext } from "react-hook-form";

interface DropdownProps {
  name: string;
}

const styles =
  "w-full md:w-1/3 texd-md md:text-sm border border-spacing-1 border-black rounded-sm h-12 md:h-8 px-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent";

const Dropdown: React.FC<DropdownProps> = ({ name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <select className={styles} defaultValue={1} {...register(name)}>
        <option value={0.8}>75 prosent 5 år</option>
        <option value={0.8}>75 prosent 4 år</option>
        <option value={0.8}>75 prosent 3 år</option>
        <option value={0.8}>75 prosent 2 år</option>
        <option value={0.8}>75 prosent 1 år</option>
        <option value={0.8}>75 prosent</option>
        <option value={0.9}>70 prosent 4 år</option>
        <option value={0.9}>70 prosent 3 år</option>
        <option value={0.9}>70 prosent 2 år</option>
        <option value={0.9}>70 prosent 1 år</option>
        <option value={0.9}>70 prosent</option>
        <option value={1}>60 prosent</option>
        <option value={1.1}>50 prosent</option>
        <option value={1.2}>40 prosent</option>
        <option value={1.3}>30 prosent</option>
        <option value={1.4}>20 prosent</option>
        <option value={1.5}>10 prosent</option>
        <option value={1.6}>0 prosent</option>
        <option value={1.7}>-10 prosent</option>
        <option value={1.8}>-20 prosent</option>
        <option value={1.9}>-30 prosent</option>
        <option value={2}>-40 prosent</option>
        <option value={2.1}>-50 prosent</option>
      </select>
      {errors[name] && (
        <p className="text-red-700 text-md md:text-xs mt-2">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
