import React from "react";
import { ButtonProps } from "../../types";
import { useNavigate } from "react-router";

const Button: React.FC<ButtonProps> = ({ onClick, to, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
