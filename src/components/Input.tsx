import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../assets/animations";

type InputProps = {
  placeHolder: string;
  icon: React.ReactNode;
  value: string;
  handleOnChange: React.Dispatch<React.SetStateAction<string>>;
  type: "text" | "password" | "email" | "number";
};

const Input: React.FC<InputProps> = ({
  placeHolder,
  icon,
  value,
  handleOnChange,
  type,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

export default Input;
