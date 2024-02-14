import React from "react";
import Button from "../components/shared/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Button to="/setting">게임 시작</Button>
      <Button to="/record">기록된 게임 보기</Button>
    </div>
  );
}
