import React from "react";
import { useOutletContext } from "react-router-dom";

export default function PlayerStatAll() {
  const {
    leagueComp,
    setLeagueComp,
    dropdown,
    setDropdown,
    league,
    getTopPlayer,
    statTypes,
  } = useOutletContext();

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
        {statTypes.map((type, index) => (
          <>
            <div key={index}>{type.label}</div>

            {getTopPlayer(type.key).map((item, idx) => {
              const stat = item.statistics.find(
                (s) => s.league.name === leagueComp,
              );

              const value =
                type.key === "goals"
                  ? stat?.goals?.total || 0
                  : type.key === "assists"
                    ? stat?.goals?.assists || 0
                    : type.key === "yellowCard"
                      ? stat?.cards?.yellow || 0
                      : stat?.cards?.red || 0;
              return (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[10px]">
                    <div>
                      <h1>{idx + 1}</h1>
                    </div>
                    <div className="w-[40px] h-[40px]">
                      <img
                        src={item.player.photo}
                        alt={item.player.firstname}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <span>{item.player.firstname}</span>
                      <span>{stat?.team?.name}</span>
                    </div>
                  </div>

                  <div>
                    <h1>{value}</h1>
                  </div>
                </div>
              );
            })}
          </>
        ))}
      </div>

      <div>
        <h1>this team player is not avaliable </h1>
      </div>
    </>
  );
}
