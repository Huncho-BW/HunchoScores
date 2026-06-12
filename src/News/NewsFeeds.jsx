import React from "react";
import { NavLink } from "react-router-dom";

export default function NewFeeds() {
  return (
    <>
      <div className="newFeed overflow-hidden flex gap-[20px] lg:mt-[24px] lg:justify-center lg:px-[32px] lg:items-center">
        <NavLink
          to="newsHome"
          className="text-[18px] font-[700]  bg-[#F5F5F5] feedTest rounded-2xl p-4"
        >
          HOME
        </NavLink>

        <NavLink
          to="newsFootball"
          className="text-[18px] font-[700]  bg-[#F5F5F5] feedTest rounded-2xl p-4"
        >
          Football
        </NavLink>
        <NavLink
          to="newsBasket"
          className="text-[18px] font-[700] bg-[#F5F5F5] feedTest rounded-2xl  p-4"
        >
          BasketBall
        </NavLink>
        <NavLink
          to="newsHockey"
          className="text-[18px] font-[700] bg-[#F5F5F5] feedTest  rounded-2xl p-4"
        >
          Hockey
        </NavLink>
        <NavLink
          to="newsBaseball"
          className="text-[18px] font-[700] bg-[#F5F5F5] feedTest rounded-2xl p-4"
        >
          Baseball
        </NavLink>
        <NavLink
          to="newsVaolleyball"
          className="text-[18px] font-[700] bg-[#F5F5F5] feedTest rounded-2xl p-4"
        >
          Vaolleyball
        </NavLink>
      </div>
    </>
  );
}
