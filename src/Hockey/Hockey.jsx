import React from "react";
import HockeyLeft from "./HockeyLeft";
import HockeyRight from "./HockeyRight";
import { useState } from "react";
export default function Hockey() {
  const [seletedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="foodBall py-[32px] px-[32px] grid grid-cols-[300px_1fr]  gap-[20px]">
      <div className="hiddenLeftSLide">
        <HockeyLeft />
      </div>

      <div className="border">
        <HockeyRight
          seletedDate={seletedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
