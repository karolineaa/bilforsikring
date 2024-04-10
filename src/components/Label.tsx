import React from "react";

interface LabelProps {
  value: string;
}

export const Label: React.FC<LabelProps> = ({ value }) => {
  return <label className="text-xl md:text-md mt-6 mb-1">{value}</label>;
};

export default Label;
