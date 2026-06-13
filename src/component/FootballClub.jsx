import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function FootballClub() {
  const { id, leagueId, season } = useParams();
  console.log("log the following ", id, leagueId, season);

  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  console.log("my club id ", id);

  const fetchTeam = async () => {
    const respond = await axios.get(
      `https://v3.football.api-sports.io/teams?id=${id}`,
      {
        headers: { "x-apisports-key": xxxKey },
      },
    );
    return respond.data.response;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamInfo", id],
    queryFn: fetchTeam,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const teamInfo = data?.[0];
  console.log("log team info", teamInfo);

  return (
    <>
      <div className="p-[32px]">
        <div className="flex gap-[10px] items-center ">
          <div className="w-[40px] h-[40px] ">
            <img src={teamInfo?.team?.logo} alt="" />
          </div>

          <div className="flex flex-col">
            <h1>{teamInfo?.team?.name}</h1>
            <h1>{teamInfo?.team?.country}</h1>
          </div>
        </div>

        <div className="flex gap-[20px] mt-[20px]">
          {/* 
          
          free plan did not want us to asses it 
          
          <div>
            <NavLink to="result">Result</NavLink>
          </div>
        
          if asses add the url address and it component which is  <MyClubOverview /> to the route  

          */}

          <div>
            <NavLink className="spanFont  navSubText" to="matches">
              Matches
            </NavLink>
          </div>
          <div>
            <NavLink className="spanFont  navSubText" to="playerstat">
              Player Stats
            </NavLink>
          </div>
        </div>
      </div>

      <div>
        <Outlet context={{ id, leagueId, season }} />
      </div>
    </>
  );
}
