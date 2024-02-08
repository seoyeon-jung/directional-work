import React from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={() => navigate("/setting")}
      >
        게임 시작
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={() => navigate("/record")}
      >
        기록된 게임 보기
      </button>
    </div>
  );
}
