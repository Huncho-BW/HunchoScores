import React, { useState } from "react";
import FoodballLeft from "./FoodballLeft";
import FoodballRight from "./FoodballRight";
import { Outlet } from "react-router-dom";

export default function Football() {
  const [seletedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="genPad foodBall py-[32px] px-[32px] grid grid-cols-[300px_1fr]  gap-[20px]">
      <div className="hiddenLeftSLide">
        <FoodballLeft />
      </div>

      <div className="border  ">
        <FoodballRight
          seletedDate={seletedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
