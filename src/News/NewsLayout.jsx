import React from "react";
import MyNavbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import NewFeeds from "./NewsFeeds";
export default function NewsLayout() {
  return (
    <>
      <div>
        <MyNavbar />
      </div>

      <div className="flex flex-col gap-[20px] mt-[24px] justify-center px-[32px] items-center">
        <NewFeeds />
        <Outlet />
      </div>
    </>
  );
}
