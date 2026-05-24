import React from "react";
import MyNavbar from "./Navbar";
import MyFeed from "./Feed";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div>
        <MyNavbar />
        <MyFeed />
      </div>

      <>
        <Outlet />
      </>
    </>
  );
}
