import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function ClubResult() {
  const { id, leagueId, season } = useParams();
  console.log("log the following club view ", id, leagueId, season);

  const xxxKey = "6123d7ffb1095dda31a593ac87ad1232";

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
        <div className="p-[32px]">
          <div className="flex gap-[10px]">
            <img className="w-[20px] h-[20px]" src={item.league.logo} alt="" />

            <div className="flex flex-col">
              <h1>club result</h1>
              <span>{item?.league?.name}</span>
              <span>{item?.league?.country}</span>
            </div>
          </div>

          <div className="flex justify-between   gap-[20px] w-full ">
            <div className=" flex flex-col justify-start w-[100px] ">
              <h1>{item?.fixture?.status?.short} </h1>
            </div>

            <div className="flex w-full justify-between">
              <div className="flex flex-col ">
                <div className="flex gap-1">
                  <img
                    className="w-[20px] h-[20px]"
                    src={item.teams.home.logo}
                  />
                  <h1>{item?.teams?.home?.name} </h1>
                </div>
                <div className="flex gap-1">
                  <img
                    className="w-[20px] h-[20px]"
                    src={item.teams.away.logo}
                  />
                  <h1>{item?.teams?.away?.name}</h1>
                </div>
              </div>

              <div className=" flex flex-col ">
                <h1>{item.goals.home}</h1>
                <h1>{item.goals.away}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
