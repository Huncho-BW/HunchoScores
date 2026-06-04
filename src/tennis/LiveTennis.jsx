import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function LiveTen() {
  const matchData = useOutletContext();

  let allmatches = matchData;

  const match = allmatches?.matchData || [];

  // ✅ API-SPORTS BASEBALL LIVE STATUS
  const isLive = (status) =>
    [
      "LIVE",
      "IN1",
      "IN2",
      "IN3",
      "IN4",
      "IN5",
      "IN6",
      "IN7",
      "IN8",
      "IN9",
    ].includes(status);

  // ✅ FILTER LEAGUES WITH LIVE GAMES
  const liveMatches = match.filter((item) =>
    item?.games?.some((game) => isLive(game?.status?.short)),
  );

  // ✅ EMPTY STATE
  if (!liveMatches.length) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">
          No Live Baseball Matches Right Now
        </h1>

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
              <img className="w-[40px] h-[40px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <h1 className="h1Font">{item?.name}</h1>

                <span className="spanFont">{item?.country}</span>
              </div>
            </div>

            {/* LIVE GAMES ONLY */}
            {item?.games
              ?.filter((game) => isLive(game?.status?.short))
              .map((game, index) => {
                return (
                  <NavLink
                    to={`/baseball/match/summary/${game.id}`}
                    key={index}
                  >
                    <div className="fTBoder liveMatch flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]">
                      {/* STATUS */}
                      <div className="flex justify-between gap-[20px] items-center w-[100px]">
                        <div className="flex flex-col gap-2">
                          <h1 className="h1Font text-red-500 font-semibold">
                            {game?.status?.short}
                          </h1>

                          <div className="flex justify-center">
                            <div className="liveDot"></div>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="divBorder"></div>
                        </div>
                      </div>

                      {/* TEAMS + SCORE */}
                      <div className="flex w-full justify-between">
                        {/* TEAMS */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <img
                              className="w-[20px] h-[20px]"
                              src={game?.teams?.home?.logo}
                              alt=""
                            />

                            <h1 className="text-center spanFont">
                              {game?.teams?.home?.name}
                            </h1>
                          </div>

                          <div className="flex items-center gap-1">
                            <img
                              className="w-[20px] h-[20px]"
                              src={game?.teams?.away?.logo}
                              alt=""
                            />

                            <h1 className="text-center spanFont">
                              {game?.teams?.away?.name}
                            </h1>
                          </div>
                        </div>

                        {/* SCORE */}
                        <div className="flex flex-col items-center">
                          <h1 className="text-center spanFont">
                            {game?.scores?.home?.total ?? "-"}
                          </h1>

                          <h1 className="text-center spanFont">
                            {game?.scores?.away?.total ?? "-"}
                          </h1>
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
