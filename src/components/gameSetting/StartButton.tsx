import React from "react";
import Button from "../shared/Button";

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>게임 시작하기</Button>;
};

export default StartButton;
