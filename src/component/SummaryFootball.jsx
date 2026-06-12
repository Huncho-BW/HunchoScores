import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";
export default function MatchFootballSummary() {
  const { id } = useParams();
  console.log("my id ", id);
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const [matchDetails, setMatchDetails] = useState([]);

  const fetchMatches = async () => {
    try {
      const respond = await axios.get(
        `https://v3.football.api-sports.io/fixtures?id=${id}`,
        {
          headers: { "x-apisports-key": xxxKey },
        },
      );
      setMatchDetails(respond.data.response);
    } catch (err) {
      console.error("console.log any error found ", err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [id]);

  const getTimeMatch = (item) => {
    const status = item.fixture.status.short;
    const elapsed = item.fixture.status.short;

    const islive = ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"].includes(status);

    if (islive && elapsed !== null) {
      return `${elapsed}`;
    }

    if (status === "HT") return "HT";
    if (status === "FT") return "FT";
    if (status === "PST") return "PSt";
    if (status === "NS") {
      return new Date(item.fixture.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <>
      {matchDetails.map((item) => {
        console.log("this is the id summary fetch", item);

        return (
          <>
            <div className="flex gap-2 pl-[20px] pr-[20px]">
              <div className="flex items-center">
                <img className="w-[40px] h-[40px]" src={item.league?.logo} />
              </div>
              <div className="flex flex-col ">
                <h1 className="h1Font">{item.league?.name}</h1>
                <span className="spanFont">{item.league.round}</span>
              </div>
            </div>

            <div className="h-[134px] w-[100%]  mt-[24px] ">
              <div className="flex items-center justify-around ">
                <NavLink
                  to={`/team/${item?.teams?.home?.id}/${item?.league?.name}/${item?.league?.season}`}
                >
                  <div className="flex justify-center">
                    <img
                      className="w-[40px] h-[40px]"
                      src={item?.teams?.home?.logo}
                    />
                  </div>
                  <h1 className="h1Font">{item.teams.home.name}</h1>
                </NavLink>

                <div className="flex flex-col items-center">
                  <div className="flex gap-2 items-center ">
                    <h1>{item.goals.home}</h1>
                    <span className="mx-2">vs</span>
                    <h1>{item.goals.away}</h1>
                  </div>
                  <div className="flex items-center ">
                    <h1>{getTimeMatch(item)}</h1>
                  </div>
                </div>
                {/* AWAY */}
                <NavLink
                  to={`/team/${item?.teams?.away?.id}/${item?.league?.name}/${item?.league?.season}`}
                >
                  <div className="flex justify-center ">
                    <img
                      className="w-[40px] h-[40px]"
                      src={item.teams?.away.logo}
                    />
                  </div>

                  <h1 className="h1Font">{item.teams.away.name}</h1>
                </NavLink>
              </div>
            </div>

            <div>
              <div className="flex justify-around gap-1 ">
                <NavLink className="spanFont navSubText" to="info">
                  Info
                </NavLink>
                <NavLink className="spanFont navSubText" to={`summary`}>
                  summary
                </NavLink>
                <NavLink className="spanFont navSubText" to="stats">
                  Stats
                </NavLink>
                <NavLink className="spanFont" to="lineUp navSubText">
                  Line -up
                </NavLink>
                <NavLink className="spanFont  " to="table">
                  Table
                </NavLink>
                <NavLink className="spanFont navSubText" to="h2h">
                  H 2 H
                </NavLink>
              </div>
            </div>
          </>
        );
      })}

      <>
        <Outlet context={{ matchDetails }} />
      </>
    </>
  );
}
