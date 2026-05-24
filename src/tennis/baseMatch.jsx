import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
export default function BaseMatch() {
  const id = useParams().id;

  const { baseballSum } = useOutletContext();

  return (
    <>
      <div className="pl-[20px] pr-[20px]">
        <div className="flex gap-2">
          <NavLink to="baseSum">summary</NavLink>
          <NavLink to="baseStat">Stat</NavLink>
          <NavLink to="baseLineUp">Line up</NavLink>
        </div>
      </div>

      {/* OUTLET */}
      <>
        <Outlet context={{ baseballSum }} />
      </>
    </>
  );
}
