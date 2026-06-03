import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function FinishVolleyball() {
  const matchData = useOutletContext();
  const match = matchData?.matchData || [];

  // ✅ FINISHED STATUS (API-Sports volleyball)
  const isFinished = (status) => ["FT", "FINISHED"].includes(status);

  const finishedMatches = match.filter((item) =>
    item?.games?.some((game) => isFinished(game?.status?.short)),
  );

  if (!finishedMatches.length) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">No Finished Matches Yet 🏐</h1>
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
            <div className="flex gap-[20px] items-center">
              <img className="w-[40px] h-[40px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <h1 className="h1Font">{item?.name}</h1>
                <span className="spanFont">{item?.country}</span>
              </div>
            </div>

            {/* FINISHED GAMES */}
            {item?.games
              ?.filter((game) => isFinished(game?.status?.short))
              .map((game, index) => (
                <NavLink
                  to={`/vaolleyball/vaolleyball/match/summary/${game.id}`}
                  key={index}
                >
                  <div className="fTBoder flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]">
                    {/* STATUS (styled like basketball FT badge) */}
                    <div className="flex justify-between gap-[20px] items-center w-[100px]">
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
                            src={game?.teams?.home?.logo}
                            alt=""
                          />
                          <h1 className="font-[600]">
                            {game?.teams?.home?.name}
                          </h1>
                        </div>

                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.away?.logo}
                            alt=""
                          />
                          <h1 className="font-[600]">
                            {game?.teams?.away?.name}
                          </h1>
                        </div>
                      </div>

                      {/* SCORE */}
                      <div className="flex flex-col">
                        <h1 className="text-center font-[600]">
                          {game?.scores?.home ?? "-"}
                        </h1>

                        <h1 className="text-center font-[600]">
                          {game?.scores?.away ?? "-"}
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
