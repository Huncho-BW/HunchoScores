import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function MyFeed() {
  return (
    <>
      <div className="genPad feedHadder flex gap-[20px]  px-[32px]  mt-[24px] lg:justify-between  items-center">
        <NavLink
          to="/"
          className="feedTest text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-4"
        >
          Football
        </NavLink>
        <NavLink to="/basket" className="feedTest  p-4">
          BasketBall
        </NavLink>
        <NavLink
          to="hockey"
          className="feedTest text-[18px] font-[700] bg-[#F5F5F5]  rounded-2xl p-4"
        >
          Hockey
        </NavLink>
        <NavLink
          to="/baseball"
          className="feedTest text-[18px] font-[700] bg-[#F5F5F5]  rounded-2xl p-4"
        >
          Baseball
        </NavLink>
        <NavLink
          to="/vaolleyball"
          className="feedTest text-[18px] font-[700] bg-[#F5F5F5]  rounded-2xl p-4"
        >
          Vaolleyball
        </NavLink>
      </div>
    </>
  );
}
