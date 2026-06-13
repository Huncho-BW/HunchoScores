import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function VaolleyballSummary() {
  const { id } = useParams();
  console.log("my id ", id);
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const fetchSumm = async () => {
    const res = await axios.get("https://v1.volleyball.api-sports.io/games", {
      params: {
        id: id,
      },
      headers: {
        "x-apisports-key": xxxKey,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["volSumm", id],
    queryFn: fetchSumm,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const volSum = data.response[0];
  console.log("log volleyball sum", volSum);
  return (
    <>
      <div className="pl-[20px] pr-[20px]">
        {/* 🏆 LEAGUE */}
        <div className="flex gap-2  items-center">
          <div>
            <img className="w-[60px] h-[60px]" src={volSum?.league?.logo} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="h1Font">{volSum?.league?.name}</h1>
            <h1 className="spanFont">{volSum?.league?.season}</h1>
          </div>
        </div>

        {/* 🏒 MATCH */}
        <div className="h-[134px] w-[100%] mt-[24px]">
          <div className="flex items-center justify-around">
            {/* HOME */}
            <NavLink>
              <div className="flex justify-center">
                <img
                  className="w-[40px] h-[40px]"
                  src={volSum?.teams?.home?.logo}
                />
              </div>

              <h1 className="h1Font">{volSum?.teams?.home?.name}</h1>
            </NavLink>

            {/* SCORE */}
            <div>
              <div className="flex  items-center">
                <h1 className="h1Font">{volSum?.scores?.home ?? "-"}</h1>
                <span className="mx-2">vs</span>
                <h1 className="h1Font">{volSum?.scores?.away ?? "-"}</h1>
              </div>

              {/* STATUS / TIME */}
              <div className="flex flex-col items-center ">
                {volSum?.status?.short === "NS" ? (
                  <h1 className="h1Font">{volSum?.time}</h1>
                ) : (
                  <h1 className="h1Font">{volSum?.status?.short}</h1>
                )}
              </div>
            </div>

            {/* AWAY */}
            <NavLink>
              <div className="flex justify-center">
                <img
                  className="w-[40px] h-[40px]"
                  src={volSum?.teams?.away?.logo}
                />
              </div>

              <h1 className="h1Font">{volSum?.teams?.away?.name}</h1>
            </NavLink>
          </div>
        </div>

        {/* NAV */}
        <div>
          <div className="flex gap-2">
            <NavLink className="spanFont  navSubText" to="volInfo">
              Info
            </NavLink>
            <NavLink className="spanFont  navSubText" to="volSummary">
              Summary
            </NavLink>
            <NavLink className="spanFont  navSubText" to="volHeadToHead">
              Head to Head
            </NavLink>
            <NavLink className="" to="volTable">
              Table
            </NavLink>
          </div>
        </div>
      </div>

      <>
        <Outlet context={volSum} />
      </>
    </>
  );
}
