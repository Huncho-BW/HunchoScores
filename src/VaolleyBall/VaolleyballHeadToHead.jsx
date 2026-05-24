import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { data, useOutletContext } from "react-router-dom";
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
            <div key={index}>
              <div className="flex gap-[10px]">
                <img className="w-[20px] h-[20px]" src={item.league.logo} />
                <h1>{item.league.name} </h1>

                <div className="flex  flex-col">
                  <span>{item.league.season}</span>
                  <span>{item.league.country}</span>
                </div>
              </div>

              <div className="flex justify-between  p-[24px] gap-[20px] w-full ">
                <div className=" flex justify-start w-[100px] ">
                  <h1> {item?.status?.short} </h1>
                </div>

                <div className="flex w-full justify-between">
                  <div className="flex flex-col ">
                    <div className="flex gap-1">
                      <img
                        className="w-[20px] h-[20px]"
                        src={item.teams.home.logo}
                      />
                      <h1> {item.teams.home.name}</h1>
                    </div>
                    <div className="flex gap-1">
                      <img
                        className="w-[20px] h-[20px]"
                        src={item.teams.away.logo}
                      />
                      <h1>{item.teams.away.name}</h1>
                    </div>
                  </div>

                  <div className=" flex flex-col ">
                    <h1>{item?.scores?.home}</h1>
                    <h1>{item?.scores?.away}</h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
