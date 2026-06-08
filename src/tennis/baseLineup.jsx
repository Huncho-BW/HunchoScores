import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function BaseLineup() {
  const baseballSum = useOutletContext();

  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const fixture = baseballSum?.baseballSum?.id;
  console.log("log baseball fixture", fixture, baseballSum);
  const fetchMatches = async (signal) => {
    const respond = await axios.get(
      `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixture}`,
      {
        headers: { "x-apisports-key": xxxKey },
        signal,
      },
    );

    return respond?.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["apiData"],
    queryFn: fetchMatches,
    retry: 5,
    retryDelay: 500,
    staleTime: 1000 * 10 * 60,

    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  const lineUpdata = data?.responses || [];
  console.log("baseBall line up", lineUpdata);

  const homeStartingXI = lineUpdata[0]?.startXI || [];
  const awayStartingXI = lineUpdata[1]?.startXI || [];

  const homeSub = lineUpdata[0]?.substitutes || [];
  const awaySub = lineUpdata[1]?.substitutes || [];

  const homeCoach = lineUpdata[0]?.coach?.name || [];
  const awayCoach = lineUpdata[1]?.coach?.name || [];

  console.log(
    "line up data",
    homeStartingXI,
    awayStartingXI,
    homeSub,
    awaySub,
    homeCoach,
    awayCoach,
  );

  if (lineUpdata.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 text-lg font-semibold">
          Standings not available for this league on this plan 🚫
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[24px] pl-[20px] pr-[20px] pt-[10px] pb-[10px] mb-[20px]">
        <h1>Sarting XI</h1>

        <div className="grid grid-cols-2  flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            {homeStartingXI?.map((start) => (
              <h1>{start?.player?.name}</h1>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {awayStartingXI?.map((awyStart) => (
              <h1>{awyStart?.player?.name}</h1>
            ))}
          </div>
        </div>

        <h1>Substitute players</h1>

        <div className="grid grid-cols-2 flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            {homeSub?.map((sub) => (
              <h1>{sub?.player?.name}</h1>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {awaySub?.map((awySub) => (
              <h1>{awySub?.player?.name}</h1>
            ))}
          </div>
        </div>

        <h1>Coaches</h1>
        <div className="grid grid-cols-2 flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            <h1>{homeCoach}</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1>{awayCoach}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
