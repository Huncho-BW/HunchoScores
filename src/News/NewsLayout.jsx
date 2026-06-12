import React from "react";
import MyNavbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import NewFeeds from "./NewsFeeds";
export default function NewsLayout() {
  return (
    <div>
      <div>
        <MyNavbar />
      </div>

      <div className="flex flex-col lg:gap-[20px] lg:mt-[24px] justify-center lg:px-[32px] newDesing lg:items-center     md:items-center  md:px-[25px]  md:mt-[12px] overflow-hidden">
        <NewFeeds />
        <Outlet />
      </div>
    </div>
  );
}
