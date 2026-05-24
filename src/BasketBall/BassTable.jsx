import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useOutletContext } from "react-router-dom";

export default function BassTable() {
  const BasSum = useOutletContext();
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const newDate = new Date();
  newDate.setFullYear(newDate.getFullYear() - 4);

  const season = newDate.getFullYear();
  console.log("get season", season);

  const league = BasSum?.league?.id;

  const currentYeear = BasSum?.date
    ? new Date(BasSum?.date).getFullYear() - 2
    : "";

  console.log("get league", league, currentYeear);

  const fetchBassTable = async () => {
    const result = await axios.get(
      `https://v1.basketball.api-sports.io/standings?league=12&season=2022-2024`,
      {
        headers: {
          "x-apisports-key": xxxKey,
        },
      },
    );

    return result.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["BassTable"],
    queryFn: fetchBassTable,
    enabled: !!league,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (error) {
    console.log("error message ", error);
  }

  const bassTable = data;
  console.log("the standing ,", bassTable);

  if (!bassTable?.response?.length) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 text-lg font-semibold">
          Standings not available for this league on this plan 🚫
        </p>
      </div>
    );
  }
}
