import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { data, useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function VoalleyBallHeadToHead() {
  const volSum = useOutletContext();

  const match = volSum;
  const homeid = match?.teams?.home?.id;
  const awayId = match?.teams?.away?.id;
  const [headTohead, setHeadTohead] = useState([]);
  const caching = useRef({});
  const xxxKey = " a5da1f14f44d0b283ae6a626383c0b6b";
  console.log("this are our ids ", homeid, awayId);

  const fetchHeadToHead = async () => {
    try {
      const key = `${homeid} - ${awayId}`;
      if (caching.current[key]) {
        setHeadTohead(caching.current[key]);
        return;
      }

      const respond = await axios.get(
        `https://v1.volleyball.api-sports.io/games/h2h?h2h=${homeid}-${awayId}`,
        {
          headers: { "x-apisports-key": xxxKey },
        },
      );

      setHeadTohead(respond.data.response);
      caching.current[key] = respond.data.response;
    } catch (err) {
      console.log("log out any error been given", err);
    }
  };

  useEffect(() => {
    if (!homeid || !awayId) return;
    fetchHeadToHead();
  }, [homeid, awayId]);

  if (!volSum || volSum.length === 0) {
    return <p>loding</p>;
  }
  console.log(" h2h result", headTohead);
  return (
    <>
      <div className="p-[32px]">
        {headTohead.map((item, index) => {
          return (
            <div key={index} className="p-[12px]">
              <div className="relative flex flex-col gap-[10px]">
                <div className="flex gap-[20px]">
                  <img
                    className="w-[40px] h-[40px]"
                    src={item.league.logo}
                    alt=""
                  />

                  <h1 className="h1Font">{item.league.name}</h1>
                </div>

                <div
                  className="absolute top-5
               left-13 ml-[8px] flex flex-col"
                >
                  <span className="spanFont">{item.league.season}</span>
                </div>
              </div>

              <NavLink key={item.league.id}>
                <div className="fTBoder">
                  <div className="pr-[10px] pl-[10px] pt-[8px] pb-[8px] flex justify-between gap-[20px] w-full">
                    <div className="flex justify-between gap-[20px] items-center w-[100px]">
                      <div className="flex flex-col gap-2 justify-center">
                        <h1
                          className="h1Font bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold`
                                : `h1Font text-left font-semibold"
                        >
                          FT
                        </h1>
                      </div>

                      <div className="flex">
                        <div className="divBorder"></div>
                      </div>
                    </div>

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col">
                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={item.teams.home.logo}
                          />

                          <h1 className="text-center spanFont">
                            {item.teams.home.name}
                          </h1>
                        </div>

                        <div className="flex gap-1 items-center">
                          <img
                            className="w-[20px] h-[20px]"
                            src={item.teams.away.logo}
                            alt=""
                          />

                          <h1 className="text-center spanFont">
                            {item.teams.away.name}
                          </h1>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <h1 className="text-center spanFont">
                          {item?.scores?.home ?? "-"}
                        </h1>

                        <h1 className="text-center spanFont">
                          {item?.scores?.away ?? "-"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}
