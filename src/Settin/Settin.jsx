import React from "react";
import MyNavbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import SettingDesignLayout from "./SettingLayout";
export default function SettinLayout() {
  return (
    <div className="">
      <div>
        <MyNavbar />
      </div>

      <div className="  ">
        <SettingDesignLayout />
        <Outlet />
      </div>
    </div>
  );
}
