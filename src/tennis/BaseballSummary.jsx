import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function BaseballSummary() {
  const { id } = useParams();
  console.log("my id ", id);
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const fetchSumm = async () => {
    const res = await axios.get("https://v1.baseball.api-sports.io/games", {
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
    queryKey: ["baseballSummary", id],
    queryFn: fetchSumm,
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

  const baseballSum = data.response[0];
  console.log("log baseball sum", baseballSum);
  console.log("log baseball ", data);
  return (
    <>
      <div className="pl-[20px] pr-[20px]">
        {/* 🏆 LEAGUE */}
        <div className="flex items-center gap-2">
          <div>
            <img
              className="w-[60px] h-[60px]"
              src={baseballSum?.league?.logo}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="h1Font">{baseballSum?.league?.name}</h1>
            <span className="spanFont">{baseballSum?.league?.season}</span>
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
                  src={baseballSum?.teams?.home?.logo}
                />
              </div>

              <h1 className="h1Font">{baseballSum?.teams?.home?.name}</h1>
            </NavLink>

            {/* SCORE */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="h1Font">
                  {baseballSum?.scores?.home?.total ?? "-"}
                </h1>
                <span className="mx-2 spanFont">vs</span>
                <h1 className="h1Font">
                  {" "}
                  {baseballSum?.scores?.away?.total ?? "-"}
                </h1>
              </div>

              {/* STATUS / TIME */}
              <div className="flex flex-col items-center">
                {baseballSum?.status?.short === "NS" ? (
                  <h1 className="h1Font">{baseballSum?.time}</h1>
                ) : (
                  <h1 className="h1Font">{baseballSum?.status?.short}</h1>
                )}
              </div>
            </div>

            {/* AWAY */}
            <NavLink>
              <div className="flex justify-center">
                <img
                  className="w-[40px] h-[40px]"
                  src={baseballSum?.teams?.away?.logo}
                />
              </div>

              <h1 className="h1Font">{baseballSum?.teams?.away?.name}</h1>
            </NavLink>
          </div>
        </div>

        {/* NAV */}
        <div>
          <div className="flex gap-2">
            <NavLink className="spanFont  navSubText" to="baseMatch">
              Match
            </NavLink>
            <NavLink className="spanFont  navSubText" to="baseH2H">
              H2H
            </NavLink>
            <NavLink className="spanFont  navSubText" to="baseTable">
              Table
            </NavLink>
          </div>
        </div>
      </div>

      {/* OUTLET */}
      <>
        <Outlet context={{ baseballSum }} />
      </>
    </>
  );
}
