import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function FinishVolleyball() {
  const matchData = useOutletContext();

  const match = matchData?.matchData || [];

  // ✅ finished statuses
  const finishedStatuses = ["FT"];

  // ✅ check if any finished match exists
  const hasFinishedMatch = match.some((item) =>
    item?.games?.some((game) => finishedStatuses.includes(game?.status?.short)),
  );

  // ✅ no finished match UI
  if (!hasFinishedMatch) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <h1 className="text-gray-500 text-lg">
          No finished volleyball matches 🏐
        </h1>
      </div>
    );
  }

  return (
    <>
      {match?.map((item, index) => {
        // ✅ filter only finished games
        const finishedGames = item?.games?.filter((game) =>
          finishedStatuses.includes(game?.status?.short),
        );

        // ❌ hide league if no finished games
        if (!finishedGames?.length) return null;

        return (
          <div key={index} className="p-[24px]">
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

            {finishedGames.map((game, index) => (
              <NavLink
                to={`/vaolleyball/vaolleyball/match/summary/${game.id}`}
                key={index}
              >
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
                      <h1>{game?.scores?.home ?? "-"}</h1>
                      <h1>{game?.scores?.away ?? "-"}</h1>
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
