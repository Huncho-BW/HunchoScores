import React, { use } from "react";
import { useOutletContext } from "react-router-dom";

export default function YellowCard() {
  const {
    leagueComp,
    setLeagueComp,
    dropdown,
    setDropdown,
    league,
    getTopPlayer,
  } = useOutletContext();

  const yellowCards = getTopPlayer("yellowCards");
  console.log("top yellow cards ", yellowCards);

  return (
    <>
      <div>
        <div className="relative ">
          <button onClick={() => setDropdown((prev) => !prev)}>
            {leagueComp}
          </button>

          {dropdown && (
            <div className="absolute mt-[20px]  bg-white-600 shadow-md z-100 inset-0 overflow-hidden h-[100px] bg-gray-100 overflow-y-auto ">
              {league?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setLeagueComp(item);
                    setDropdown(false);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {item}
                </li>
              ))}
            </div>
          )}
        </div>
        <h1>Top Yellow Cards</h1>
        {yellowCards.map((item, idx) => {
          const stat = item.statistics.find(
            (s) => s.league.name === leagueComp,
          );

          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <div>
                  <h1>{idx + 1}</h1>
                </div>
                <div className="w-[40px] h-[40px]">
                  <img src={item.player.photo} alt={item.player.firstname} />
                </div>
                <div className="flex flex-col ">
                  <span>{item.player.firstname}</span>
                  <span>{stat?.team?.name}</span>
                </div>
              </div>

              <div>
                <h1>{stat?.cards?.yellow || 0}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
