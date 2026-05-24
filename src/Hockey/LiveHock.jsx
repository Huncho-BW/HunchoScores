import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function LiveHoc() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  const obj = Object.values(allmatches);

  const match = obj.flatMap((item) => item);

  // 👇 FILTER LIVE ONLY
  const liveMatches = match
    ?.map((item) => ({
      ...item,
      games: item.games?.filter(
        (game) => !["NS", "FT", "AET", "PEN"].includes(game.status.short),
      ),
    }))
    .filter((item) => item.games && item.games.length > 0);

  // 👇 EMPTY UI (IMPORTANT)
  if (!liveMatches || liveMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">No Live Hockey Matches 🔴</h1>
        <p className="text-gray-500 mt-2">
          All games are currently not active.
        </p>
      </div>
    );
  }

  return (
    <>
      {liveMatches.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            <div className="flex gap-[10px] items-center">
              {/* FIX: safe logo fallback */}
              <img
                className="w-[20px] h-[20px]"
                src={item?.logo || item?.league?.logo}
                alt=""
              />

              <div className="flex flex-col">
                <span>{item?.name || item?.league?.name}</span>
                <span>{item?.country}</span>
              </div>
            </div>

            {item.games?.map((game, index) => {
              return (
                <NavLink to={`/hockey/HocMatch/summary/${game.id}`} key={index}>
                  <div className="flex justify-between p-[24px] gap-[20px] w-full">
                    {/* STATUS */}
                    <div className="flex justify-start w-[100px]">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                        LIVE
                      </span>
                    </div>

                    {/* TEAMS */}
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col">
                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.home?.logo}
                            alt=""
                          />
                          <h1>{game?.teams?.home?.name}</h1>
                        </div>

                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.away?.logo}
                            alt=""
                          />
                          <h1>{game?.teams?.away?.name}</h1>
                        </div>
                      </div>

                      {/* SCORE */}
                      <div className="flex flex-col">
                        <h1>{game?.scores?.home ?? "-"}</h1>
                        <h1>{game?.scores?.away ?? "-"}</h1>
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
