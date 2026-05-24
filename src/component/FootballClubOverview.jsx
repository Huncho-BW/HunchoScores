import axios from "axios";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function MyClubOverview() {
  const { id, leagueId, season } = useOutletContext();
  const xxxKey = "6123d7ffb1095dda31a593ac87ad1232";

  const today = new Date();

  const from = today.toISOString().split("T")[0];

  const future = new Date(today);
  future.setDate(future.getDate() + 30);

  const to = future.toISOString().split("T")[0];
  const fetchMatch = async () => {
    const res = await axios.get("https://v3.football.api-sports.io/fixtures", {
      params: {
        team: id,
        season: season,
        from: from,
        to: to,
      },
      headers: {
        "x-apisports-key": xxxKey,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamMatch", id],
    queryFn: fetchMatch,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const teamMatch = data;
  console.log("log team info", teamMatch);

  return (
    <>
      <div className="p-[32px]">
        <div>
          <h1>Next match</h1>
        </div>

        <div className="h-[134px] w-[100%]  mt-[24px] ">
          <div className="flex items-center justify-around ">
            <div>
              <img className="w-[40px] h-[40px]" src="" />
              <h1> home Team name </h1>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <h1>set time </h1>

                <h1>set date </h1>
              </div>
            </div>
            <div>
              <img className="w-[40px] h-[40px]" src="" />
              <h1>away team name</h1>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h1>Form</h1>
          </div>

          <div className="flex justify-between   gap-[20px] w-full ">
            <div className=" flex justify-start w-[100px] ">
              <h1>TIme status </h1>
            </div>

            <div className="flex w-full justify-between">
              <div className="flex flex-col ">
                <div className="flex gap-1">
                  <img className="w-[20px] h-[20px]" src="" />
                  <h1>Home Team Name </h1>
                </div>
                <div className="flex gap-1">
                  <img className="w-[20px] h-[20px]" src="" alt="" />
                  <h1>Away Team Name</h1>
                </div>
              </div>

              <div className=" flex flex-col ">
                <h1>home score</h1>
                <h1>away score</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
