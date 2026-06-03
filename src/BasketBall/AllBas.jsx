import { all } from "axios";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AllBas() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  console.log("log matc da", allmatches);

  const obj = Object.values(allmatches);

  const match = obj.flatMap((item) => item);

  // LIVE MATCHES
  const isLive = (status) => {
    return ["Q1", "Q2", "Q3", "Q4", "HT", "OT", "LIVE"].includes(status);
  };

  // FINISHED MATCHES
  const isFinished = (status) => {
    return ["FT", "AOT"].includes(status);
  };

  return (
    <>
      {match?.map((item, index) => {
        console.log("this is the value og item", item);

        return (
          <div key={index} className="p-[24px]">
            <div className="flex gap-[20px] items-center">
              <img className="w-[40px] h-[40px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <h1 className="h1Font">{item.name}</h1>
                <span className="spanFont">{item.country}</span>
              </div>
            </div>

            {item.games?.map((game, index) => (
              <NavLink to={`/basket/BasMatch/summary/${game.id}`} key={index}>
                <div
                  className={`fTBoder flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]
                  
                  ${isLive(game.status.short) ? "liveMatch" : ""}
                  
                  `}
                >
                  {/* TIME + BORDER */}
                  <div className="flex justify-between gap-[20px] items-center w-[100px]">
                    <div className="flex flex-col justify-center gap-2">
                      {game.status.short === "NS" ? (
                        <h1 className="h1Font">{game.time}</h1>
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
                    <div className="flex flex-col">
                      <div className="flex gap-1">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game.teams.home.logo}
                          alt=""
                        />

                        <h1 className="text-center font-[600]">
                          {game.teams.home.name}
                        </h1>
                      </div>

                      <div className="flex gap-1">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game.teams.away.logo}
                          alt=""
                        />

                        <h1 className="text-center font-[600]">
                          {game.teams.away.name}
                        </h1>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="text-center font-[600]">
                        {[
                          game.scores.home.quarter_1,
                          game.scores.home.quarter_2,
                          game.scores.home.quarter_3,
                          game.scores.home.quarter_4,
                        ].reduce((a, b) => a + b, 0)}
                      </h1>

                      <h1 className="text-center font-[600]">
                        {[
                          game.scores.away.quarter_1,
                          game.scores.away.quarter_2,
                          game.scores.away.quarter_3,
                          game.scores.away.quarter_4,
                        ].reduce((a, b) => a + b, 0)}
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
