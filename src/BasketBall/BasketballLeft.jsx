import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function BasLeft() {
  const [searchTeam, setSearchTeam] = useState("");
  const [debounceSearch, setDebounceSearch] = useState(searchTeam);
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const newDateSeason = new Date().getFullYear();
  const season = newDateSeason - 2;
  const majorLeagueId = {
    NBA: 3,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchTeam);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTeam]);

  const handleSearch = async () => {
    const res = axios.get(
      `https://v1.baseball.api-sports.io/teams?search=${debounceSearch}`,
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
      `https://v1.baseball.api-sports.io/teams?league=${majorLeagueId.NBA}&season=${season}`,
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
    enabled: !!debounceSearch,
  });

  const {
    data: defaultTeamData,
    isLoading: defaultTeamsisloading,
    isError: defaultIsError,
    error: defauiltError,
  } = useQuery({
    queryKey: ["defaultTeams"],
    queryFn: handleDefaultTeams,
  });

  const toShowTeam =
    debounceSearch.length >= 3 && searchTeamData?.data?.response.length > 0
      ? searchTeamData?.data?.response || []
      : defaultTeamData?.data?.response.slice(0, 15) || [];

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
  console.log("log out the  default data ", defaultTeamData);

  console.log("log out the data", toShowTeam);

  return (
    <>
      <div className="border border  border rounded-lg ">
        <div className="border-b  px-[20px] py-[11px] flex items-center ">
          <span className="">
            <CiSearch size={30} />
          </span>
          <input
            type="search"
            name=""
            value={searchTeam}
            onChange={(e) => setSearchTeam(e.target.value)}
            className="w-full  py-[4px] px-[8px] outline-none"
            placeholder="Search "
          />
        </div>

        <div className="px-[20px] py-[11px] mt-[10px]">
          <div className="flex  justify-between">
            <div>
              <h1>Compitition</h1>
            </div>
            <div>
              <FaArrowRight />
            </div>
          </div>
          {toShowTeam?.map((item, index) => (
            <div className="flex gap-[10px] border  rounded-lg ">
              <img className="w-[50px] h-[50px]" src={item?.logo} alt="" />
              <div className=" flex flex-col">
                <span>{item?.name}</span>
                <span>{item?.country?.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-[20px] py-[11px] mt-[10px]">
          <div className="flex  justify-between">
            <div>
              <h1>Region</h1>
            </div>
            <div>
              <FaArrowRight />
            </div>
          </div>
          <div className="flex gap-[10px] border  rounded-lg ">
            <h1>Region logo</h1>
            <span>England</span>
          </div>
        </div>
      </div>
    </>
  );
}
