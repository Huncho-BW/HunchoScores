import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AllTen() {
  const matchData = useOutletContext();

  let allmatches = matchData;

  const match = allmatches?.matchData || [];

  // ✅ LIVE STATUS
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

  // ✅ FINISHED STATUS
  const isFinished = (status) => ["FT", "POST", "CANC", "ABD"].includes(status);

  return (
    <>
      {match?.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            {/* LEAGUE */}
            <div className="flex gap-[20px] items-center">
              <img className="w-[40px] h-[40px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <h1 className="h1Font">{item.name}</h1>

                <span className="spanFont">{item.country}</span>
              </div>
            </div>

            {/* GAMES */}
            {item?.games?.map((game, index) => {
              return (
                <NavLink to={`/baseball/match/summary/${game.id}`} key={index}>
                  <div
                    className={`fTBoder flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]
                    
                ${isLive(game.status.short) ? "liveMatch" : ""}

                    ${isFinished(game?.status?.short) ? "finishMatch" : ""}
                    `}
                  >
                    {/* TIME / STATUS */}
                    <div className="flex justify-between gap-[20px] items-center w-[100px]">
                      <div className="flex flex-col justify-center gap-2">
                        {game.status.short === "NS" ? (
                          <h1 className="h1Font">{game.time}</h1>
                        ) : (
                          <h1
                            className={`h1Font ${
                              isFinished(game.status.short)
                                ? "h1Font bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold"
                                : ""
                            }`}
                          >
                            {game.status.short}
                          </h1>
                        )}

                        {isLive(game.status.short) && (
                          <div className="liveDot"></div>
                        )}
                      </div>

                      {/* BORDER */}
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
                        <h1 className="spanFont text-center">
                          {game?.scores?.home?.total ?? "-"}
                        </h1>

                        <h1 className="spanFont text-center">
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
