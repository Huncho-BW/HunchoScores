import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function ClubResult() {
  const { id, leagueId, season } = useParams();
  console.log("log the following club view ", id, leagueId, season);

  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const fetchFixtures = async () => {
    const respond = await axios.get(
      "https://v3.football.api-sports.io/fixtures",
      {
        params: {
          team: id,
          season: 2024,
        },

        headers: {
          "x-apisports-key": xxxKey,
        },
      },
    );
    return respond.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamRes", id],
    queryFn: fetchFixtures,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const teamRes = data?.response;
  console.log("log team res", teamRes);
  return (
    <>
      {teamRes?.map((item) => (
        <div className="p-[24px]">
          <div className="relative flex flex-col gap-[10px]">
            <div className="flex gap-[20px]">
              <img
                className="w-[40px] h-[40px]"
                src={item.league.logo}
                alt=""
              />

              <h1 className="h1Font">{item.league.name}</h1>
            </div>

            <div
              className="absolute top-5
               left-13 ml-[8px] flex flex-col"
            >
              <span className="spanFont">{item.league.round}</span>
            </div>
          </div>

          <div className="fTBoder">
            <div className="pr-[10px] pl-[10px] pt-[8px] pb-[8px] flex justify-between gap-[20px] w-full">
              <div className="flex justify-between gap-[20px] items-center w-[100px]">
                <div className="flex flex-col gap-2 justify-center">
                  <h1
                    className=" h1Font bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold`
                                : `h1Font text-left font-semibold"
                  >
                    FT
                  </h1>
                </div>

                <div className="flex">
                  <div className="divBorder"></div>
                </div>
              </div>

              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <div className="flex gap-1 items-center">
                    <img
                      className="w-[20px] h-[20px]"
                      src={item.teams.home.logo}
                    />

                    <h1 className="text-center spanFont">
                      {item.teams.home.name}
                    </h1>
                  </div>

                  <div className="flex gap-1 items-center">
                    <img
                      className="w-[20px] h-[20px]"
                      src={item.teams.away.logo}
                      alt=""
                    />

                    <h1 className="text-center spanFont">
                      {item.teams.away.name}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-center spanFont">
                    {item.goals.home ?? "-"}
                  </h1>

                  <h1 className="text-center spanFont">
                    {item.goals.away ?? "-"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
