import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function LiveMatches() {
  const Allmatches = useOutletContext();

  const obj = Object.values(Allmatches || {});
  const match = obj.flatMap((item) => item);

  // 🔴 LIVE STATUS CHECK
  const isLive = (status) =>
    ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"].includes(status);

  // ⏱️ MATCH TIME
  const getMatchTime = (game) => {
    const status = game.fixture.status.short;
    const elapsed = game.fixture.status.elapsed;

    if (isLive(status) && elapsed !== null) {
      return `${elapsed}'`;
    }

    if (status === "HT") return "HT";
    if (status === "FT") return "FT";

    return new Date(game.fixture.date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ FILTER ONLY LIVE GAMES
  const liveMatches = match
    .map((item) => ({
      ...item,
      games: item.games?.filter((game) => isLive(game.fixture.status.short)),
    }))
    .filter((item) => item.games.length > 0);

  if (liveMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">No Live Matches Right Now</h1>
        <p className="text-gray-500 mt-2">
          All games are either not started or already finished.
        </p>
      </div>
    );
  }

  return (
    <>
      {liveMatches.map((item, index) => (
        <div key={index} className="p-[24px]">
          {/* LEAGUE HEADER */}
          <div className="relative flex flex-col gap-[10px]">
            <div className="flex gap-[20px]">
              <img className="w-[40px] h-[40px]" src={item.logo} alt="" />

              <h1 className="h1Font">{item.name}</h1>
            </div>

            <div className="absolute top-5 left-13 ml-[8px] flex flex-col">
              <span className="spanFont">{item.round}</span>
            </div>
          </div>

          {/* LIVE GAMES ONLY */}
          {item.games?.map((game) => (
            <NavLink
              key={game.fixture.id}
              to={`/match/summary/${game.fixture.id}`}
            >
              <div className="fTBoder liveMatch">
                <div className="pr-[10px] pl-[10px] pt-[8px] pb-[8px] flex justify-between gap-[20px] w-full">
                  {/* TIME */}
                  <div className="flex justify-between gap-[20px] items-center w-[100px]">
                    <div className="flex flex-col gap-2 justify-center">
                      <h1 className="h1Font font-semibold text-left text-red-500">
                        {getMatchTime(game)}
                      </h1>

                      {/* LIVE DOT */}
                      <div className="flex">
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
                          src={game.teams.home.logo}
                          alt=""
                        />

                        <h1 className="text-center spanFont">
                          {game.teams.home.name}
                        </h1>
                      </div>

                      <div className="flex gap-1 items-center">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game.teams.away.logo}
                          alt=""
                        />

                        <h1 className="text-center spanFont">
                          {game.teams.away.name}
                        </h1>
                      </div>
                    </div>

                    {/* SCORE */}
                    <div className="flex flex-col">
                      <h1 className="text-center spanFont">
                        {game.goals.home ?? "-"}
                      </h1>

                      <h1 className="text-center spanFont">
                        {game.goals.away ?? "-"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      ))}
    </>
  );
}
