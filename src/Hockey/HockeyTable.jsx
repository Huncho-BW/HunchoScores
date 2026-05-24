import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HockeyTable() {
  const hockeySum = useOutletContext();
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const league = hockeySum?.league?.id;
  const season = hockeySum?.league?.season - 2;

  const fetchHocTable = async () => {
    const res = await axios.get("https://v1.hockey.api-sports.io/standings", {
      params: {
        league: league,
        season: season,
      },
      headers: {
        "x-apisports-key": xxxKey,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["HocTable", league, season],
    queryFn: fetchHocTable,
    enabled: !!league && !!season,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const table = data?.response;
  console.log("log hoc table", table);

  // 🚫 NO DATA (FREE PLAN)
  if (!table?.length) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 text-lg font-semibold">
          Standings not available for this league on this plan 🚫
        </p>
      </div>
    );
  }

  // ✅ DATA EXISTS
  const standings = table[0]?.standings?.[0];

  return (
    <div className="p-4">
      <h1 className="font-bold mb-4">Standings</h1>

      {standings?.map((team, index) => (
        <div
          key={team.team.id}
          className="flex justify-between items-center p-2 border-b"
        >
          {/* POSITION */}
          <span>{team.rank}</span>

          {/* TEAM */}
          <div className="flex items-center gap-2">
            <img src={team.team.logo} className="w-[20px]" />
            <span>{team.team.name}</span>
          </div>

          {/* POINTS */}
          <span>{team.points}</span>

          {/* WINS */}
          <span>{team.wins}</span>

          {/* LOSSES */}
          <span>{team.losses}</span>
        </div>
      ))}
    </div>
  );
}
