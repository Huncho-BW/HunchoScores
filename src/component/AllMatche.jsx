import React from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Slider from "@mui/material/Slider";

export default function Allmatches() {
  const Allmatches = useOutletContext();
  let allmatches = Allmatches;

  const obj = Object.values(allmatches);

  const match = obj.flatMap((item) => item);

  const isLive = (status) =>
    ["1H", "2H", "ET", "BT", "P", "LIVE"].includes(status);

  const getMatchTime = (game) => {
    const status = game.fixture.status.short;
    const elapsed = game.fixture.status.elapsed;

    const islive = ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"].includes(status);

    if (islive && elapsed !== null) {
      return `${elapsed}'`;
    }

    if (status === "HT") return "HT";
    if (status === "FT") return "FT";
    if (status === "PST") return "PST";

    if (status === "NS") {
      return new Date(game.fixture.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <>
      {match.map((item, index) => {
        return (
          <div key={index} className="  p-[24px]">
            <div className=" relative flex flex-col  gap-[10px] ">
              <div className="flex gap-[20px]">
                <img className="w-[40px] h-[40px]" src={item.logo} alt="" />

                <h1 className="h1Font">{item.name}</h1>
              </div>

              <div
                className="absolute top-5
               left-13 ml-[8px]  flex flex-col"
              >
                <span className="spanFont">{item.round}</span>
              </div>
            </div>

            {item.games?.map((game) => (
              <NavLink
                key={game.fixture.id}
                to={`/match/summary/${game.fixture.id}`}
              >
                <div className="fTBoder  ">
                  {isLive(game.fixture.status.short) && (
                    <div className="flex">
                      <div className="liveBoder"></div>
                    </div>
                  )}

                  <div className=" pr-[10px] pl-[10px] pt-[8px] pb-[8px] flex justify-between   gap-[20px] w-full">
                    <div className=" flex justify-between gap-[20px] items-center  w-[100px] ">
                      <div className="flex ">
                        <h1
                          className={
                            isLive(game.fixture.status.short)
                              ? `font-semibold text-left text-red-500`
                              : `text-left font-semibold`
                          }
                        >
                          {getMatchTime(game)}
                        </h1>
                      </div>

                      <div className="flex">
                        <div className="divBorder"></div>
                      </div>
                    </div>

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col ">
                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={game.teams.home.logo}
                          />
                          <h1 className="text-center font-[600]">
                            {game.teams.home.name}
                          </h1>
                        </div>

                        <div className="flex gap-1 items-center">
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

                      <div className=" flex flex-col ">
                        <h1 className="text-center font-[700]">
                          {game.goals.home ?? "-"}
                        </h1>
                        <h1 className="text-center font-[700]">
                          {game.goals.away ?? "-"}
                        </h1>
                      </div>
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
