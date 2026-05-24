import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function FinishTen() {
  const matchData = useOutletContext();

  const match = matchData?.matchData || [];

  // ✅ finished statuses (baseball)
  const finishedStatuses = ["FT", "AOT", "POST"];

  // ✅ check if ANY finished match exists
  const hasFinishedMatch = match.some((item) =>
    item?.games?.some((game) => finishedStatuses.includes(game?.status?.short)),
  );

  // ✅ if no finished match at all
  if (!hasFinishedMatch) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <h1 className="text-gray-500 text-lg">No finished matches yet ⚾</h1>
      </div>
    );
  }

  return (
    <>
      {match.map((item, index) => {
        const finishedGames = item?.games?.filter((game) =>
          finishedStatuses.includes(game?.status?.short),
        );

        // ❌ hide league with no finished games
        if (!finishedGames?.length) return null;

        return (
          <div key={index} className="p-[24px]">
            {/* LEAGUE HEADER */}
            <div className="flex gap-[10px] items-center">
              <img
                className="w-[20px] h-[20px]"
                src={item?.logo || "/fallback.png"}
                alt=""
                onError={(e) => (e.target.src = "/fallback.png")}
              />

              <div className="flex flex-col">
                <span>{item?.name}</span>
                <span>{item?.country}</span>
              </div>
            </div>

            {/* FINISHED GAMES */}
            {finishedGames.map((game, index) => (
              <NavLink to={`/baseball/match/summary/${game.id}`} key={index}>
                <div className="flex justify-between p-[24px] gap-[20px] w-full">
                  {/* STATUS */}
                  <div className="flex justify-start w-[100px]">
                    <h1>{game?.status?.short}</h1>
                  </div>

                  <div className="flex w-full justify-between">
                    {/* TEAMS */}
                    <div className="flex flex-col">
                      <div className="flex gap-1 items-center">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game?.teams?.home?.logo || "/fallback.png"}
                          alt=""
                          onError={(e) => (e.target.src = "/fallback.png")}
                        />
                        <h1>{game?.teams?.home?.name}</h1>
                      </div>

                      <div className="flex gap-1 items-center">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game?.teams?.away?.logo || "/fallback.png"}
                          alt=""
                          onError={(e) => (e.target.src = "/fallback.png")}
                        />
                        <h1>{game?.teams?.away?.name}</h1>
                      </div>
                    </div>

                    {/* SCORE */}
                    <div className="flex flex-col">
                      <h1>{game?.scores?.home?.total ?? "-"}</h1>
                      <h1>{game?.scores?.away?.total ?? "-"}</h1>
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
