import React from "react";
import VolleyLeft from "./VolleyLeft";
import { useState } from "react";
import VolleyRight from "./VolleyRight";

export default function Volleyball() {
  const [seletedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <div className=" foodBall py-[32px] px-[32px] grid grid-cols-[300px_1fr]  gap-[20px]">
        <div className="hiddenLeftSLide">
          <VolleyLeft />
        </div>

        <div className="border  ">
          <VolleyRight
            seletedDate={seletedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}
