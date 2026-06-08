import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function FootballStats() {
  const { matchDetails } = useOutletContext();

  const match = matchDetails?.[0];
  console.log("print match", match);
  const fixtureId = match?.fixture?.id;
  console.log("stats fixture id ", fixtureId);
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const fetchStats = async () => {
    const respond = await axios.get(
      `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`,
      {
        headers: { "x-apisports-key": xxxKey },
      },
    );

    return respond.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allStat", fixtureId],
    queryFn: fetchStats,
    staleTime: 1000 * 10 * 60,
  });

  const stats = data?.response || [];
  console.log("stats data", stats);

  if (stats.length === 0)
    return <p className="text-center mt-4">Stats is not Avaliable</p>;

  const homeId = match?.teams?.home?.id;
  const awayId = match?.teams?.away?.id;

  const homeStat = stats.find((t) => t.team?.id === homeId);
  const awayStat = stats.find((t) => t.team?.id === awayId);

  if (isLoading) return <p className="animate-pulse">Loading...</p>;

  if (isError) {
    console.error("React Query fetch error:", error); // <-- log the actual error
    return <p>Something went wrong: {error?.message}</p>;
  }
  return (
    <>
      <h1 className="text-center font-bold">Stat</h1>
      {match?.events?.length === 0 && (
        <div>
          <p className="text-center mt-4 text-gray-500 text-lg font-semibold">
            No events available{" "}
          </p>
        </div>
      )}
      {homeStat?.statistics.map((item, index) => {
        const awayStats = awayStat.statistics[index];
        return (
          <div key={index} className="p-[30px]">
            <div className="flex gap-[10px] items-center justify-between">
              <div>
                <h1>{item?.value}</h1>
              </div>

              <div>
                <h1>{item?.type}</h1>
              </div>

              <div>
                <h1>{awayStats?.value}</h1>
              </div>
            </div>

            <div className="flex  gap-[20px]">
              <div className="border h-[20px] w-full  ">
                <div className="h-full w-[20%]  ml-auto bg-green-500"></div>
              </div>
              <div className="border h-[20px] w-full ">
                <div className="h-full w-[20%] bg-green-500"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
