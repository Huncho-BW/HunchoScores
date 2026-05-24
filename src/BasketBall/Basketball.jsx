import React, { useState } from "react";
import BasRight from "./BasketBallRight";
import BasLeft from "./BasketballLeft";

export default function BasketBall() {
  const [seletedDate, setSelectedDate] = useState(new Date());
  return (
    <div className=" foodBall py-[32px] px-[32px] grid grid-cols-[300px_1fr]  gap-[20px]">
      <div className="hiddenLeftSLide">
        <BasLeft />
      </div>

      <div className="border">
        <BasRight seletedDate={seletedDate} setSelectedDate={setSelectedDate} />
      </div>
    </div>
  );
}
