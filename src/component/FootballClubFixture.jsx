import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function ClubFixtures() {
  const { id, leagueId, season } = useParams();

  console.log("log the following club view ", id, leagueId, season);

  const xxxKey = "6123d7ffb1095dda31a593ac87ad1232";

  const fetchFix = async () => {
    const res = await axios.get("https://v3.football.api-sports.io/fixtures", {
      params: {
        team: id,
        season: season,
        status: "NS",
      },
      headers: {
        "x-apisports-key": xxxKey,
      },
    });
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamFic", id],
    queryFn: fetchFix,
    enabled: !!id,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const hasFixtures = data?.response?.length > 0;

  return (
    <>
      {hasFixtures ? (
        <div className="p-[32px]">
          {/* Your fixture HTML structure */}
          {data.response.map((match) => (
            <div
              key={match.fixture.id}
              className="flex justify-between gap-[20px]"
            >
              <div>
                <h1>{new Date(match.fixture.date).toLocaleDateString()}</h1>
                <h1>{match.fixture.status.short}</h1>
              </div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <div className="flex gap-1 items-center">
                    <img
                      src={match.teams.home.logo}
                      className="w-[20px] h-[20px]"
                    />
                    <h1>{match.teams.home.name}</h1>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src={match.teams.away.logo}
                      className="w-[20px] h-[20px]"
                    />
                    <h1>{match.teams.away.name}</h1>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1>{match.scores.home.total}</h1>
                  <h1>{match.scores.away.total}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No fixtures available for this team on free plan.</p>
      )}
    </>
  );
}
