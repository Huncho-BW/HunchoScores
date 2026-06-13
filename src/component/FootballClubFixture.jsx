import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function ClubFixtures() {
  const { id, leagueId, season } = useParams();

  console.log("log the following club view ", id, leagueId, season);

  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

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
        <div className="mt-[24px]">
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
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg text-center">
            <div className="text-6xl mb-4">📅</div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              No Fixtures Found
            </h1>

            <p className="text-gray-500">
              There are currently no upcoming fixtures available for this team.
            </p>

            <p className="text-sm text-gray-400 mt-3">
              This can happen when the season has ended or the API free plan
              doesn't provide fixture data for the selected competition.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
