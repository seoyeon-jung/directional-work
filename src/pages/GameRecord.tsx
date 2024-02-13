import axios from "axios";
import React, { useEffect, useState } from "react";
import { GameRecordInfo } from "../types";
import { useNavigate } from "react-router";

export default function GameRecord() {
  const [gameRecords, setGameRecords] = useState<GameRecordInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/games")
      .then((response) => {
        setGameRecords(response.data);
      })
      .catch((error) => {
        console.error("게임 기록을 불러오는 중 오류가 발생했습니다: ", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">게임 기록</h1>
    </div>
  );
}
