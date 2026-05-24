import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";

export default function FootBallPlayerStats() {
  const id = useOutletContext();
  console.log("play id", id);
  const int = id?.id;
  console.log("int", int);
  const ses = id?.season;
  const [leagueComp, setLeagueComp] = useState();
  const [dropdown, setDropdown] = useState(false);

  const xxxKey = "6123d7ffb1095dda31a593ac87ad1232";
  const fetchSquad = async () => {
    const res = await axios.get(
      `https://v3.football.api-sports.io/players?team=${int}&season=${2024}`,
      {
        headers: { "x-apisports-key": xxxKey },
      },
    );

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allSquad", int],
    queryFn: fetchSquad,
    enabled: !!int,
  });

  const allSquad = data?.response || [];
  console.log("all squad ", allSquad);

  const squad = allSquad.length > 0;
  const league = [
    ...new Set(
      allSquad.flatMap((player) =>
        player.statistics.map((stat) => stat.league.name),
      ),
    ).values(),
  ];

  console.log("let log our league", league);

  const filterPlayers = allSquad.filter((players) => {
    return players.statistics.some((stat) => stat.league.name === leagueComp);
  });
  console.log("all filter stat", filterPlayers);
  const getTopPlayer = (type) => {
    const sortedPlayers = [...filterPlayers]
      .sort((a, b) => {
        const statA = a.statistics.find((s) => s.league.name === leagueComp);

        const statB = b.statistics.find((s) => s.league.name === leagueComp);

        const getAllStat = (stat) => {
          switch (type) {
            case "goals":
              return stat?.goals?.total || 0;
            case "assists":
              return stat?.goals?.assists || 0;
            case "yellowCard":
              return stat?.cards?.yellow || 0;
            case "redCard":
              return stat?.cards?.red || 0;
            default:
              return 0;
          }
        };

        return getAllStat(statB) - getAllStat(statA);
      })
      .slice(0, 5);

    return sortedPlayers;
  };

  useEffect(() => {
    if (league.length > 0 && !leagueComp) {
      setLeagueComp(league[0]);
    }
  }, [league]);

  if (isLoading) return <p className="animate-pulse">Loading...</p>;

  if (isError) {
    console.error("React Query fetch error:", error); // <-- log the actual error
    return <p>Something went wrong: {error?.message}</p>;
  }

  const statTypes = [
    { key: "goals", label: "Top Goals" },
    { key: "assists", label: "Top Assists" },
    { key: "yellowCard", label: "Top Yellow Cards" },
    { key: "redCard", label: "Top Red Cards" },
  ];

  return (
    <>
      <div className="p-[32px]">
        <div className="flex gap-2">
          <div>
            <NavLink to="playerStatsAll">All</NavLink>
          </div>
          <div className="flex gap-2">
            <NavLink to="topScore">Top Score</NavLink>
            <div>
              <NavLink to="topAssit">Top Assit</NavLink>
            </div>
            <div>
              <NavLink to="yellowCard">Yellow Card</NavLink>
            </div>
            <div>
              <NavLink to="redCard">Red Card</NavLink>
            </div>
          </div>
        </div>

        <div>
          <Outlet
            context={{
              id,
              leagueComp,
              setLeagueComp,
              dropdown,
              setDropdown,
              league,
              getTopPlayer,
              statTypes,
            }}
          />
        </div>
      </div>
    </>
  );
}
