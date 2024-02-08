import React from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className="text-white text-3xl font-bold p-4 flex justify-between items-center cursor-pointer hover:text-gray-600"
      onClick={() => navigate("/")}
    >
      Tic Tac Toe
    </header>
  );
}
