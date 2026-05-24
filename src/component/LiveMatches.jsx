import React, { useEffect, useState } from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function LiveMatches() {
  const Allmatches = useOutletContext();
  let allmatches = Allmatches;

  const [refresh, setRefresh] = useState(0);

  const obj = Object.values(allmatches);
  const match = obj.flatMap((item) => item);

  // 🔴 Check if match is live
  const isLive = (status) =>
    ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"].includes(status);

  // ⏱️ Get match time
  const getMatchTime = (game) => {
    const status = game.fixture.status.short;
    const elapsed = game.fixture.status.elapsed;

    if (isLive(status) && elapsed !== null) {
      return `${elapsed}'`;
    }

    if (status === "HT") return "HT";
    if (status === "FT") return "FT";

    return new Date(game.fixture.date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {match
        // ❌ Hide leagues without live matches
        .filter((item) =>
          item.games?.some((game) => isLive(game.fixture.status.short)),
        )
        .map((item, index) => {
          return (
            <div key={index} className="p-[24px]">
              <div className="flex gap-[10px]">
                <img className="w-[20px] h-[20px]" src={item.logo} alt="" />
                <h1>{item.name}</h1>

                <div className="flex flex-col">
                  <span>{item.round}</span>
                  <span>{item.country}</span>
                </div>
              </div>

              {item.games
                // ✅ Show ONLY live matches
                ?.filter((game) => isLive(game.fixture.status.short))
                .map((game) => (
                  <NavLink
                    key={game.fixture.id}
                    to={`/match/summary/${game.fixture.id}`}
                  >
                    <div className="flex justify-between p-[24px] gap-[20px] w-full ">
                      <div className="flex justify-start w-[100px]">
                        <h1 className="font-semibold text-red-500">
                          🔴 {getMatchTime(game)}
                        </h1>
                      </div>

                      <div className="flex w-full justify-between">
                        <div className="flex flex-col ">
                          <div className="flex gap-1">
                            <img
                              className="w-[20px] h-[20px]"
                              src={game.teams.home.logo}
                              alt=""
                            />
                            <h1>{game.teams.home.name}</h1>
                          </div>
                          <div className="flex gap-1">
                            <img
                              className="w-[20px] h-[20px]"
                              src={game.teams.away.logo}
                              alt=""
                            />
                            <h1>{game.teams.away.name}</h1>
                          </div>
                        </div>

                        <div className="flex flex-col ">
                          <h1>{game.goals.home ?? "-"}</h1>
                          <h1>{game.goals.away ?? "-"}</h1>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          );
        })}
    </>
  );
}
