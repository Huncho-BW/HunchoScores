import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function LiveTen() {
  const matchData = useOutletContext();

  let allmatches = matchData;

  const match = allmatches?.matchData || [];

  // ✅ baseball live statuses
  const liveStatuses = ["LIVE", "IN"];

  // ✅ check if ANY live match exists
  const hasLiveMatch = match.some((item) =>
    item?.games?.some((game) => liveStatuses.includes(game?.status?.short)),
  );

  // ✅ show once if no live match
  if (!hasLiveMatch) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <h1 className="text-gray-500 text-lg">No live baseball matches ⚾</h1>
      </div>
    );
  }

  return (
    <>
      {match?.map((item, index) => {
        // ✅ filter ONLY live games
        const liveGames = item?.games?.filter((game) =>
          liveStatuses.includes(game?.status?.short),
        );

        // ❌ hide league if no live games
        if (!liveGames?.length) return null;

        return (
          <div key={index} className="p-[24px]">
            <div className="flex gap-[10px]">
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

            {liveGames.map((game, index) => {
              return (
                <NavLink to={`/baseball/match/summary/${game.id}`} key={index}>
                  <div className="flex justify-between p-[24px] gap-[20px] w-full">
                    {/* STATUS */}
                    <div className="flex justify-start w-[100px]">
                      <h1>{game?.status?.short}</h1>
                    </div>

                    <div className="flex w-full justify-between">
                      {/* TEAMS */}
                      <div className="flex flex-col">
                        <div className="flex gap-1">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.home?.logo || "/fallback.png"}
                            alt=""
                            onError={(e) => (e.target.src = "/fallback.png")}
                          />
                          <h1>{game?.teams?.home?.name}</h1>
                        </div>

                        <div className="flex gap-1">
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
              );
            })}
          </div>
        );
      })}
    </>
  );
}
