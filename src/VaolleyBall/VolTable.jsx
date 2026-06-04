import React from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NOTAVAILABLE from "../component/NOTAVAILABLE";

export default function VolTable() {
  const volSum = useOutletContext();
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  if (!volSum) return <div>Loading context...</div>;

  const leagueId = volSum?.league?.id;
  const season = volSum?.league?.season - 2; // outdated season

  const fetchStandings = async () => {
    const res = await axios.get(
      `https://v1.volleyball.api-sports.io/standings?league=${leagueId}&season=${season}`,
      { headers: { "x-apisports-key": xxxKey } },
    );
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["volTable", leagueId, season],
    queryFn: fetchStandings,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.log("Error fetching volleyball table:", error);
    return <div>Error occurred while fetching data.</div>;
  }

  const volleyTable = data?.response[0] || [];
  console.log("log out volleyBall  table", volleyTable);

  return (
    <>
      {volleyTable?.length > 0 ? (
        <div className="mt-6 space-y-4 p-[20px]">
          {/* Note at top */}
          <p className="text-gray-500 text-sm">
            Note: This is not the latest season. Data shown is for {season}.
          </p>

          {/* Header */}
          <div className="flex justify-between font-bold border-b pb-2">
            <div className="w-1/3">Team</div>
            <div className="grid grid-cols-5 gap-4 w-2/3 text-center">
              <div>MP</div>
              <div>W</div>
              <div>L</div>
              <div>S</div>
              <div>PTS</div>
            </div>
          </div>

          {/* Rows */}
          {volleyTable?.map((team) => (
            <div
              key={team.team.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center gap-2 w-1/3">
                <span>{team.position}</span>
                <img
                  src={team?.team?.logo}
                  alt={team?.team?.name}
                  className="w-6 h-6"
                />
                <span>{team?.team?.name}</span>
              </div>

              <div className="grid grid-cols-5 gap-4 w-2/3 text-center">
                <span>{team?.games?.played ?? "-"}</span>
                <span>{team?.games?.win?.total ?? "-"}</span>
                <span>{team?.games?.lose?.total ?? "-"}</span>
                <span>
                  {team?.goals?.for ?? "-"} / {team?.goals?.against ?? "-"}
                </span>
                <span>{team?.points ?? "-"}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NOTAVAILABLE />
      )}
    </>
  );
}
