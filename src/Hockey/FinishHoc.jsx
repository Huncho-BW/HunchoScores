import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function FinishHoc() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  const obj = Object.values(allmatches);

  const match = obj.flatMap((item) => item);

  // 👇 FILTER FINISHED ONLY
  const finishedMatches = match
    ?.map((item) => ({
      ...item,
      games: item.games?.filter((game) =>
        ["FT", "AET", "PEN"].includes(game.status.short),
      ),
    }))
    .filter((item) => item.games && item.games.length > 0);

  // 👇 EMPTY UI
  if (!finishedMatches || finishedMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">No Finished Hockey Matches 🏁</h1>
        <p className="text-gray-500 mt-2">
          Matches will appear here when games end.
        </p>
      </div>
    );
  }

  return (
    <>
      {finishedMatches.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            {/* LEAGUE */}
            <div className="flex gap-[10px] items-center">
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

            {/* GAMES */}
            {item.games?.map((game, index) => {
              const homeScore = game?.scores?.home ?? "-";
              const awayScore = game?.scores?.away ?? "-";

              return (
                <NavLink to={`/hockey/HocMatch/summary/${game.id}`} key={index}>
                  <div className="flex justify-between p-[24px] gap-[20px] w-full">
                    {/* STATUS */}
                    <div className="w-[100px]">
                      <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold">
                        FT
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
                      <div className="flex flex-col font-bold">
                        <h1>{homeScore}</h1>
                        <h1>{awayScore}</h1>
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
