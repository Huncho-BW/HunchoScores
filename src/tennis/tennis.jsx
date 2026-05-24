import React from "react";

import { Outlet } from "react-router-dom";
import TennisLeft from "./tennisLeft";
import TennisRight from "./tennisRight";
import { useState } from "react";

export default function Tennis() {
  const [seletedDate, setSelectedDate] = useState(new Date());
  return (
    <div className=" foodBall py-[32px] px-[32px] grid grid-cols-[300px_1fr]  gap-[20px]">
      <div className="hiddenLeftSLide">
        <TennisLeft />
      </div>

      <div className="border">
        <TennisRight
          seletedDate={seletedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
