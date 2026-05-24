import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";

export default function Finishmatch() {
  const Allmatches = useOutletContext();
  const allmatches = Allmatches;

  const match = Object.values(allmatches)
    .flatMap((item) => item)
    // 🔥 Filter leagues that have at least one FT game
    .filter((league) =>
      league.games?.some((game) => game.fixture.status.short === "FT"),
    )
    // 🔥 Keep only FT games inside the league
    .map((league) => ({
      ...league,
      games: league.games.filter((game) => game.fixture.status.short === "FT"),
    }));

  const getMatchTime = (game) => "FT"; // Only FT matters

  return (
    <>
      {match.map((item, index) => (
        <div key={index} className="p-[24px]">
          <div className="flex gap-[10px]">
            <img className="w-[20px] h-[20px]" src={item.logo} alt="" />
            <h1>{item.name}</h1>

            <div className="flex flex-col">
              <span>{item.round}</span>
              <span>{item.country}</span>
            </div>
          </div>

          {item.games.map((game) => (
            <NavLink
              key={game.fixture.id}
              to={`/match/summary/${game.fixture.id}`}
            >
              <div className="flex justify-between p-[24px] gap-[20px] w-full">
                <div className="flex justify-start w-[100px]">
                  <h1 className="font-semibold text-green-600">
                    {getMatchTime(game)}
                  </h1>
                </div>

                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      <img
                        className="w-[20px] h-[20px]"
                        src={game.teams.home.logo}
                        alt={game.teams.home.name}
                      />
                      <h1>{game.teams.home.name}</h1>
                    </div>
                    <div className="flex gap-1">
                      <img
                        className="w-[20px] h-[20px]"
                        src={game.teams.away.logo}
                        alt={game.teams.away.name}
                      />
                      <h1>{game.teams.away.name}</h1>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h1>{game.goals.home ?? "-"}</h1>
                    <h1>{game.goals.away ?? "-"}</h1>
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
