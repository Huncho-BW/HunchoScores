import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function FinishTen() {
  const matchData = useOutletContext();

  const match = matchData?.matchData || [];

  // ✅ API-Sports baseball FINISHED statuses
  const isFinished = (status) => ["FT", "POST", "CANC", "ABD"].includes(status);

  // ✅ filter leagues that have finished games
  const finishedMatches = match.filter((item) =>
    item?.games?.some((game) => isFinished(game?.status?.short)),
  );

  // ❌ empty state
  if (!finishedMatches.length) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <h1 className="text-gray-500 text-lg">
          No finished baseball matches yet ⚾
        </h1>
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
                className="w-[40px] h-[40px]"
                src={item?.logo}
                alt=""
                onError={(e) => (e.target.src = "/fallback.png")}
              />

              <div className="flex flex-col">
                <h1 className="h1Font">{item?.name}</h1>
                <span className="spanFont">{item?.country}</span>
              </div>
            </div>

            {/* FINISHED GAMES ONLY */}
            {item?.games
              ?.filter((game) => isFinished(game?.status?.short))
              .map((game, index) => (
                <NavLink to={`/baseball/match/summary/${game.id}`} key={index}>
                  <div className="fTBoder flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]">
                    {/* STATUS */}
                    <div className="flex justify-between gap-[20px] items-center  w-[100px] ">
                      <div className="w-[100px]">
                        <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold">
                          FT
                        </span>
                      </div>
                      <div className="flex">
                        <div className="divBorder"></div>
                      </div>
                    </div>

                    {/* TEAMS + SCORE */}
                    <div className="flex w-full justify-between">
                      {/* TEAMS */}
                      <div className="flex flex-col">
                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.home?.logo || "/fallback.png"}
                            alt=""
                          />
                          <h1>{game?.teams?.home?.name}</h1>
                        </div>

                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.away?.logo || "/fallback.png"}
                            alt=""
                          />
                          <h1>{game?.teams?.away?.name}</h1>
                        </div>
                      </div>

                      {/* SCORE */}
                      <div className="flex flex-col">
                        <h1 className="font-[700]">
                          {game?.scores?.home?.total ?? "-"}
                        </h1>
                        <h1 className="font-[700]">
                          {game?.scores?.away?.total ?? "-"}
                        </h1>
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
