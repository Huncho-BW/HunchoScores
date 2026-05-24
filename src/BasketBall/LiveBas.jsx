import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function LiveBas() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  const obj = Object.values(allmatches);

  const match = obj
    .flatMap((item) => item)
    .map((item) => ({
      ...item,
      games: item.games?.filter(
        (game) => !["NS", "FT"].includes(game.status.short),
      ),
    }))
    .filter((item) => item.games && item.games.length > 0);

  // 👇 EMPTY STATE UI
  if (!match || match.length === 0) {
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
      {match?.map((item, index) => {
        return (
          <div key={index} className="p-[24px]">
            <div className="flex gap-[10px]">
              <img className="w-[20px] h-[20px]" src={item?.logo} alt="" />

              <div className="flex flex-col">
                <span>{item.name}</span>
                <span>{item.country}</span>
              </div>
            </div>

            {item.games?.map((game, index) => (
              <NavLink to={`/basket/BasMatch/summary/${game.id}`} key={index}>
                <div className="flex justify-between p-[24px] gap-[20px] w-full">
                  <div className="w-[100px]">
                    <h1>{game.status.short}</h1>
                  </div>

                  <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                      <div className="flex gap-1">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game.teams.home.logo}
                        />
                        <h1>{game.teams.home.name}</h1>
                      </div>

                      <div className="flex gap-1">
                        <img
                          className="w-[20px] h-[20px]"
                          src={game.teams.away.logo}
                        />
                        <h1>{game.teams.away.name}</h1>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1>
                        {[
                          game.scores.home.quarter_1,
                          game.scores.home.quarter_2,
                          game.scores.home.quarter_3,
                          game.scores.home.quarter_4,
                        ].reduce((a, b) => a + b, 0)}
                      </h1>

                      <h1>
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
