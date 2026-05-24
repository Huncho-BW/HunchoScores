import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AllHoc() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  const obj = Object.values(allmatches);

  const match = obj.flatMap((item) => item);
  console.log("log hockey match", match);
  return (
    <>
      {match?.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            <div className="flex gap-[10px] items-center">
              <img className="w-[40px] h-[40px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <h1 className="h1Font">{item?.name}</h1>
                <span className="spanFont">{item?.country}</span>
              </div>
            </div>

            {item?.games?.map((game, index) => {
              console.log("this is my hockey match", game);
              return (
                <NavLink to={`/hockey/HocMatch/summary/${game.id}`} key={index}>
                  <div className="fTBoder flex justify-between gap-[20px]   pr-[10px] pl-[10px] pt-[8px] pb-[8px] w-full">
                    {/* TIME / STATUS */}
                    <div className="flex justify-between gap-[20px] items-center  w-[100px]">
                      <div>
                        {game?.status?.short === "NS" ? (
                          <h1>
                            {game?.time ||
                              new Date(game.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                          </h1>
                        ) : (
                          <h1>{game?.status?.short}</h1>
                        )}
                      </div>
                      <div className="flex">
                        <div className="divBorder"></div>
                      </div>
                    </div>

                    <div className="flex w-full justify-between">
                      {/* TEAMS */}
                      <div className="flex flex-col">
                        <div className="flex gap-1">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.home?.logo}
                          />
                          <h1 className="text-center font-[700]">
                            {game?.teams?.home?.name}
                          </h1>
                        </div>

                        <div className="flex gap-1">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game?.teams?.away?.logo}
                          />
                          <h1 className="text-center font-[700]">
                            {game?.teams?.away?.name}
                          </h1>
                        </div>
                      </div>

                      {/* SCORE */}
                      <div className="flex flex-col">
                        <h1 className="text-center font-[700]">
                          {game?.scores?.home ?? "-"}
                        </h1>
                        <h1 className="text-center font-[700]">
                          {game?.scores?.away ?? "-"}
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
