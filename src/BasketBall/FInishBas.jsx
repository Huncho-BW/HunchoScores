import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function FinishBas() {
  const matchData = useOutletContext();
  let allmatches = matchData;

  const obj = Object.values(allmatches);

  const match = obj
    .flatMap((item) => item)
    .map((item) => ({
      ...item,
      games: item.games?.filter(
        (game) => ["FT", "AET", "PEN"].includes(game.status.short), // 👈 FINISHED ONLY
      ),
    }))
    .filter((item) => item.games && item.games.length > 0);

  // 👇 EMPTY STATE
  if (!match || match.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-[40px] text-center">
        <h1 className="text-xl font-bold">No Finished Matches Yet</h1>
        <p className="text-gray-500 mt-2">
          Matches will appear here when games end.
        </p>
      </div>
    );
  }

  return (
    <>
      {match.map((item, index) => (
        <div key={index} className="p-[24px]">
          {/* League info */}
          <div className="flex gap-[10px]">
            <img className="w-[20px] h-[20px]" src={item?.logo} alt="" />
            <div className="flex flex-col">
              <span>{item.name}</span>
              <span>{item.country}</span>
            </div>
          </div>

          {/* Games */}
          {item.games.map((game, index) => (
            <NavLink to={`/basket/BasMatch/summary/${game.id}`} key={index}>
              <div className="flex justify-between p-[24px] gap-[20px] w-full">
                {/* STATUS */}
                <div className="w-[100px]">
                  <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold">
                    FT
                  </span>
                </div>

                {/* TEAMS */}
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

                  {/* SCORE */}
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
      ))}
    </>
  );
}
