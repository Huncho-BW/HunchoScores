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

  const hasStats = league.length > 0;

  if (!hasStats) {
    return (
      <div className="flex items-center justify-center h-[250px]">
        <p className="text-gray-500 text-lg font-medium">
          Player stats not available
        </p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="relative ">
          <button onClick={() => setDropdown((prev) => !prev)}>
            {leagueComp}
          </button>

          {dropdown && (
            <div className="relative w-[280px] mb-6">
              <button
                onClick={() => setDropdown((prev) => !prev)}
                className="
      w-full
      flex
      items-center
      justify-between
      px-4
      py-3
      bg-white
      border
      border-gray-300
      rounded-xl
      shadow-sm
      hover:border-blue-500
      transition-all
      duration-200
    "
              >
                <span className="truncate">
                  {leagueComp || "Select Competition"}
                </span>

                <span
                  className={`transition-transform duration-200 ${
                    dropdown ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {dropdown && (
                <div
                  className="
        absolute
        top-full
        mt-2
        w-full
        bg-white
        rounded-xl
        shadow-lg
        border
        border-gray-200
        max-h-[250px]
        overflow-y-auto
        z-50
      "
                >
                  {league?.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setLeagueComp(item);
                        setDropdown(false);
                      }}
                      className="
            px-4
            py-3
            cursor-pointer
            hover:bg-blue-50
            transition-colors
            border-b
            border-gray-100
            last:border-none
          "
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
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
