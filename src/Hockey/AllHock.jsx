import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AllHoc() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  const obj = Object.values(allmatches || {});
  const match = obj.flatMap((item) => item);

  // 🔴 LIVE MATCHES
  const isLive = (status) => {
    return ["P1", "P2", "P3", "OT", "BT", "LIVE"].includes(status);
  };

  // ✅ FINISHED MATCHES
  const isFinished = (status) => {
    return ["FT", "AOT"].includes(status);
  };

  return (
    <>
      {match?.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            {/* LEAGUE HEADER */}
            <div className="flex gap-[20px] items-center">
              <img className="w-[40px] h-[40px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <h1 className="h1Font">{item?.name}</h1>
                <span className="spanFont">{item?.country}</span>
              </div>
            </div>

            {/* GAMES */}
            {item?.games?.map((game, index) => (
              <NavLink to={`/hockey/HocMatch/summary/${game.id}`} key={index}>
                <div
                  className={`fTBoder flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]
                  
                  ${isLive(game.status.short) ? "liveMatch" : ""}
                  
                  `}
                >
                  {/* TIME + BORDER */}
                  <div className="flex justify-between gap-[20px] items-center w-[100px]">
                    <div className="flex flex-col justify-center gap-2">
                      {game.status.short === "NS" ? (
                        <h1 className="h1Font">
                          {game.time ||
                            new Date(game.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </h1>
                      ) : (
                        <h1
                          className={`h1Font ${
                            isFinished(game.status.short)
                              ? "bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold"
                              : ""
                          }`}
                        >
                          {game.status.short}
                        </h1>
                      )}

                      {/* LIVE DOT */}
                      {isLive(game.status.short) && (
                        <div className="liveDot"></div>
                      )}
                    </div>

                    <div className="flex">
                      <div className="divBorder"></div>
                    </div>
                  </div>

                  {/* TEAMS + SCORE */}
                  <div className="flex w-full justify-between">
                    {/* TEAMS */}
                    <div className="flex flex-col">
                      <div className="flex gap-1">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game?.teams?.home?.logo}
                          alt=""
                        />

                        <h1 className="text-center font-[600]">
                          {game?.teams?.home?.name}
                        </h1>
                      </div>

                      <div className="flex gap-1">
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
