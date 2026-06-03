import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function LiveHoc() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  const obj = Object.values(allmatches);

  // ✅ FLATTEN DATA
  const match = obj.flatMap((item) => item);

  // ✅ HOCKEY LIVE STATUS
  const LIVE_STATUS = ["P1", "P2", "P3", "OT", "BT", "PT"];

  // ✅ FILTER LEAGUES WITH LIVE MATCHES
  const liveMatches = match.filter((item) =>
    item.games?.some((game) => LIVE_STATUS.includes(game.status.short)),
  );

  // ✅ EMPTY STATE
  if (!liveMatches || liveMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">No Live Hockey Matches Right Now</h1>

        <p className="text-gray-500 mt-2">
          All games are either not started or already finished.
        </p>
      </div>
    );
  }

  return (
    <>
      {liveMatches.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            {/* LEAGUE */}
            <div className="flex gap-[20px] items-center">
              <img
                className="w-[40px] h-[40px]"
                src={item?.logo || item?.league?.logo}
                alt=""
              />

              <div className="flex flex-col">
                <h1 className="h1Font">{item?.name || item?.league?.name}</h1>

                <span className="spanFont">{item?.country}</span>
              </div>
            </div>

            {/* LIVE GAMES ONLY */}
            {item.games
              ?.filter((game) => LIVE_STATUS.includes(game.status.short))
              .map((game, index) => (
                <NavLink to={`/hockey/HocMatch/summary/${game.id}`} key={index}>
                  <div className="fTBoder liveMatch flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]">
                    {/* STATUS */}
                    <div className="flex justify-between gap-[20px] items-center w-[100px]">
                      <div className="flex flex-col gap-2">
                        <h1 className="h1Font text-red-500 font-semibold">
                          {game.status.short}
                        </h1>

                        <div className="flex justify-center">
                          <div className="liveDot"></div>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="divBorder"></div>
                      </div>
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

                          <h1 className="text-center font-[600]">
                            {game?.teams?.home?.name}
                          </h1>
                        </div>

                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.away?.logo}
                            alt=""
                          />

                          <h1 className="text-center font-[600]">
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
