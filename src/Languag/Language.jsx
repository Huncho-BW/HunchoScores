import React from "react";
import MyNavbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
export default function LanguegaLayout() {
  return (
    <>
      <div>
        <MyNavbar />
      </div>

      <>
        <Outlet />
      </>
    </>
  );
}
