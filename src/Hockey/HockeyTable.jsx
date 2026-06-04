import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useOutletContext } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";

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
  const standings = table[0];
  console.log("log hoc standing ", standings);

  return (
    <div className="p-4">
      <div className="  flex items-center justify-between">
        <div className="flex justify-between font-bold border-b pb-2">
          <div className="w-1/3">
            <h1>
              <TagIcon />
            </h1>
          </div>
          <div>
            <h1>Teams</h1>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-2 w-2/3 text-center">
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

      {standings?.map((sta, index) => (
        <div className="flex justify-between items-center border-b py-2">
          <div className="flex items-center gap-2 w-1/3">
            <div>
              <h1>{sta?.position}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <img className="w-6 h-6" src={sta?.team?.logo} alt="" />
              </div>

              <div>
                <h1>{sta?.team?.name}</h1>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-4 w-2/3 text-center">
            <div>
              <h1>{sta?.games?.played}</h1>
            </div>
            <div>
              <h1>{sta?.games?.lose_overtime?.total}</h1>
            </div>
            <div>
              <h1>{sta?.points}</h1>
            </div>
            <div>
              <h1>{sta?.games?.win?.total}</h1>
            </div>
            <div>
              <h1>{sta?.games?.win_overtime?.total}</h1>
            </div>
            <div>
              <h1>{sta?.games?.lose?.total}</h1>
            </div>
            <div>
              <h1>{sta?.goals?.for}</h1>
            </div>
            <div>
              <h1>{sta?.goals?.against}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
