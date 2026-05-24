import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import NOTAVAILABLE from "../component/NOTAVAILABLE";
import TagIcon from "@mui/icons-material/Tag";

export default function BaseTable() {
  const baseballSum = useOutletContext();
  const match = Object.values(baseballSum);
  const leagueId = match[0]?.league?.id;
  const season = match[0]?.league?.season - 2;

  console.log("BaseTable:", match, leagueId, season);

  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const fetchStandings = async () => {
    const res = await axios.get(
      `https://v1.baseball.api-sports.io/standings?league=${leagueId}&season=${season}`,
      { headers: { "x-apisports-key": xxxKey } },
    );
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["baseTable", leagueId, season],
    queryFn: fetchStandings,
    enabled: !!leagueId && !!season,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.log("Error fetching baseball table:", error);
  }

  // Extract the first league's standings

  const table = data?.response?.[0] || [];

  console.log("Baseball table data:", table);

  if (!table?.length) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 text-lg font-semibold">
          Standings not available for this league on this plan 🚫
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div>
        <h1>
          Live standings for the current season are not available due to API
          limitations. The table below shows the previous season standings.
        </h1>
      </div>

      <div className=" p-[30px] flex items-center justify-between">
        <div className="flex gap-[20px]">
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
      {table.map((sta) => {
        return (
          <div className="p-[30px] flex items-center justify-between">
            <div className="flex gap-[20px]">
              <div>
                <h1>{sta?.position}</h1>
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
            <div className="flex gap-[20px]">
              <div>
                <h1>{sta?.games?.played}</h1>
              </div>
              <div>
                <h1>{sta?.games?.win?.total}</h1>
              </div>
              <div>
                <h1>{sta?.games?.lose?.total}</h1>
              </div>
              <div>
                <h1>{sta?.games?.lose?.percentage}</h1>
              </div>
              <div>
                <h1>{sta?.games?.win?.percentage}</h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
