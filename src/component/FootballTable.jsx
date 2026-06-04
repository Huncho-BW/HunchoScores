import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TagIcon from "@mui/icons-material/Tag";

export default function FootballTable() {
  const { matchDetails } = useOutletContext();
  if (!matchDetails || matchDetails.length === 0) {
    return <p>loding</p>;
  }
  const matchTable = matchDetails[0];
  const leagueId = matchTable?.league?.id;
  const currentseason = matchTable?.league?.season;
  const season = currentseason - 1;
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const fetchmathTable = async () => {
    const respond = await axios.get(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
      {
        headers: { "x-apisports-key": xxxKey },
      },
    );

    return respond.data?.response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["apiTableData", season],
    queryFn: fetchmathTable,

    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (error) {
    console.log("error message ", error);
  }

  const footBallTable = data;
  console.log("the standing ,", footBallTable);

  if (!footBallTable?.length) {
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
      <div className="mt-6 space-y-4 p-[20px]">
        <p className="text-gray-500 text-sm">
          Note: This is not the latest season. Data shown is for {season}.
        </p>
      </div>

      <div className=" p-4 flex items-center justify-between">
        <div className="flex justify-between font-bold border-b pb-2">
          <div>
            <h1>
              <TagIcon />
            </h1>
          </div>
          <div>
            <h1>Teams</h1>
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div>
            <h1>P</h1>
          </div>
          <div>
            <h1>GB</h1>
          </div>
          <div>
            <h1>PTS</h1>
          </div>
          <div>
            <h1>W</h1>
          </div>
          <div>
            <h1>D</h1>
          </div>
          <div>
            <h1>L</h1>
          </div>
          <div>
            <h1>F</h1>
          </div>
          <div>
            <h1>A</h1>
          </div>
        </div>
      </div>
      {footBallTable[0].league.standings.map((item) => {
        return (
          <div>
            {item.map((sta) => (
              <div className="flex justify-between items-center border-b py-2">
                <div className="flex items-center gap-2 w-1/3">
                  <div>
                    <h1>{sta?.rank}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <img
                        className="w-[20px] h-[20px]"
                        src={sta?.team?.logo}
                        alt=""
                      />
                    </div>

                    <div>
                      <h1>{sta?.team?.name}</h1>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-4 w-2/3 text-center">
                  <div>
                    <h1>{sta?.all?.played}</h1>
                  </div>
                  <div>
                    <h1>{sta?.goalsDiff}</h1>
                  </div>
                  <div>
                    <h1>{sta?.points}</h1>
                  </div>
                  <div>
                    <h1>{sta?.all?.win}</h1>
                  </div>
                  <div>
                    <h1>{sta?.all?.draw}</h1>
                  </div>
                  <div>
                    <h1>{sta?.all?.lose}</h1>
                  </div>
                  <div>
                    <h1>{sta?.all?.goals?.for}</h1>
                  </div>
                  <div>
                    <h1>{sta?.all?.goals?.against}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}
