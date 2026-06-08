import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { data } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function FoodballLeft() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const newDateSeason = new Date().getFullYear();
  const season = newDateSeason - 2;
  console.log("log out season", season);
  const majorLeagueId = {
    championsLeague: 2,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = async () => {
    const res = axios.get(
      `https://v3.football.api-sports.io/teams?search=${debouncedSearchTerm}`,
      {
        headers: {
          "x-apisports-key ": xxxKey,
        },
      },
    );

    return res;
  };

  const handleDefaultTeams = async () => {
    const res = axios.get(
      `https://v3.football.api-sports.io/teams?league=${majorLeagueId.championsLeague}&season=${season}`,
      {
        headers: {
          "x-apisports-key ": xxxKey,
        },
      },
    );
    return res;
  };

  const {
    data: searchTeamData,
    isLoading: searchTeamIsloading,
    isError: searchTeamsIsError,
    error: searchTeamError,
  } = useQuery({
    queryKey: ["searchTeams"],
    queryFn: handleSearch,
    enabled: !!debouncedSearchTerm,
  });

  const {
    data: defaultTeaamData,
    isLoading: defaultTeamsisloading,
    isError: defaultIsError,
    error: defauiltError,
  } = useQuery({
    queryKey: ["defaultTeams"],
    queryFn: handleDefaultTeams,
  });

  const toShowTeam =
    debouncedSearchTerm.length >= 3 && searchTeamData?.data?.response.length > 0
      ? searchTeamData?.data?.response || []
      : defaultTeaamData?.data?.response.slice(0, 15) || [];

  if (defauiltError) {
    console.log("this is the default error", defauiltError);
  }

  if (defaultIsError) {
    console.log("Error is true ", defaultIsError);
  }

  if (searchTeamsIsError) {
    console.log("this is the return error", searchTeamsIsError);
  }

  if (searchTeamError) {
    console.log("log error for search", searchTeamError);
  }
  if (defaultTeamsisloading) return <p>loading</p>;
  if (searchTeamIsloading) return <p>loading</p>;

  console.log("log out search data ", searchTeamData);

  console.log("log out the data", toShowTeam);

  return (
    <>
      <div className="border border   border rounded-lg ">
        <div className="border-b  px-[20px] py-[11px] flex items-center  ">
          <span className="">
            <CiSearch size={30} />
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full  py-[4px] px-[8px] outline-none"
            placeholder="Search "
          />
        </div>
        <div className="px-[20px] py-[11px] mt-[10px]">
          <div className="flex  justify-between">
            <div>
              <h1>Teams</h1>
            </div>
            <div>
              <FaArrowRight />
            </div>
          </div>
          {toShowTeam?.map((item, index) => (
            <NavLink
              to={`/team/${item?.team?.id}/${item?.league?.name}/${item?.league?.season}`}
              key={index}
              className="flex gap-[20px] border fTBoder mt-4 p-2  rounded-lg fTBoder "
            >
              <img
                className="w-[50px] h-[50px]"
                src={item?.team?.logo}
                alt=""
              />
              <div className=" flex flex-col">
                <span>{item?.team?.name}</span>
                <span>{item?.team?.country}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
