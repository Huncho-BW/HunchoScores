import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function LiveVolleyball() {
  const matchData = useOutletContext();

  const allmatches = matchData;
  const obj = Object.values(allmatches || {});

  const match = obj
    .flatMap((item) => item)
    .map((item) => ({
      ...item,
      games: item.games?.filter(
        (game) => !["NS", "FT"].includes(game.status.short),
      ),
    }))
    .filter((item) => item.games && item.games.length > 0);

  // 👇 EMPTY STATE
  if (!match || match.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">No Live Volleyball Matches 🏐</h1>
        <p className="text-gray-500 mt-2">
          All games are either not started or finished.
        </p>
      </div>
    );
  }

  return (
    <>
      {match?.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            {/* LEAGUE HEADER (same as LiveBas) */}
            <div className="flex gap-[20px] items-center">
              <img className="w-[40px] h-[40px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <h1 className="h1Font">{item?.name}</h1>
                <span className="spanFont">{item?.country}</span>
              </div>
            </div>

            {/* GAMES */}
            {item.games?.map((game, index) => (
              <NavLink
                to={`/vaolleyball/vaolleyball/match/summary/${game.id}`}
                key={index}
              >
                <div className="fTBoder liveMatch flex justify-between gap-[20px] w-full pr-[10px] pl-[10px] pt-[8px] pb-[8px]">
                  {/* STATUS + TIME (same style as LiveBas) */}
                  <div className="flex justify-between gap-[20px] items-center w-[100px]">
                    <div className="flex flex-col gap-2">
                      {game.status.short === "NS" ? (
                        <h1 className="h1Font">{game.time}</h1>
                      ) : (
                        <h1 className="h1Font">{game.status.short}</h1>
                      )}

                      {/* LIVE DOT */}
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
