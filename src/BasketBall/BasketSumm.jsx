import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function BasketSumm() {
  const { id } = useParams();
  console.log("my id ", id);
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";

  const fetchSumm = async () => {
    const res = await axios.get("https://v1.basketball.api-sports.io/games", {
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
    queryKey: ["BasSumm", id],
    queryFn: fetchSumm,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const BasSum = data.response[0];
  console.log("log bas sum", BasSum);
  return (
    <div className="pl-[20px] pr-[20px]">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col">
          <img className="w-[60px] h-[60px]" src={BasSum?.league?.logo} />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="h1Font">{BasSum?.league?.name}</h1>
          <h1 className="spanFont">{BasSum?.week}</h1>
          <h1 className="spanFont">{BasSum?.league?.season}</h1>
        </div>
      </div>

      <div className="h-[134px] w-[100%]  mt-[24px] ">
        <div className="flex items-center justify-around ">
          <NavLink>
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-[40px] h-[40px]"
                src={BasSum?.teams?.home?.logo}
              />
            </div>
            <h1 className="h1Font">{BasSum?.teams?.home?.name}</h1>
          </NavLink>
          <div className="flex flex-col items-center ">
            <div className="flex gap-2">
              <h1 className="h1Font">
                {[
                  BasSum.scores.home.quarter_1,
                  BasSum.scores.home.quarter_2,
                  BasSum.scores.home.quarter_3,
                  BasSum.scores.home.quarter_4,
                ].reduce((a, b) => a + b, 0)}
              </h1>
              <span className="mx-2 spanFont">vs</span>
              <h1 className="h1Font">
                {[
                  BasSum.scores.away.quarter_1,
                  BasSum.scores.away.quarter_2,
                  BasSum.scores.away.quarter_3,
                  BasSum.scores.away.quarter_4,
                ].reduce((a, b) => a + b, 0)}
              </h1>
            </div>
            <div className="flex flex-col items-center">
              {BasSum?.status?.short === "NS" ? (
                <h1 className="h1Font">
                  {new Date(BasSum?.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h1>
              ) : (
                <h1 className="h1Font">{BasSum?.status?.timer}</h1>
              )}
            </div>
          </div>
          <NavLink>
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-[40px] h-[40px]"
                src={BasSum?.teams?.away?.logo}
              />
            </div>

            <h1 className="h1Font">{BasSum?.teams?.away?.name}</h1>
          </NavLink>
        </div>
      </div>

      <div>
        <div className="flex  gap-2 ">
          <NavLink className="spanFont  navSubText" to="Bassinfo">
            Info
          </NavLink>

          <NavLink className="spanFont  navSubText" to="BassTable">
            Table
          </NavLink>
        </div>
      </div>
      <>
        <Outlet context={BasSum} />
      </>
    </div>
  );
}
