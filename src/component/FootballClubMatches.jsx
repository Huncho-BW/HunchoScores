import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
export default function MyClubMatches() {
  const { id, leagueId, season } = useParams();
  console.log("log the following club view ", id, leagueId, season);
  return (
    <>
      <div className=" p-[32px]">
        <div className="flex gap-[20px]">
          <div>
            <NavLink to="fixture">Fixture</NavLink>
          </div>
          <div>
            <NavLink to="resultClub">Result</NavLink>
          </div>
        </div>

        <>
          <Outlet context={{ id, leagueId, season }} />
        </>
      </div>
    </>
  );
}
