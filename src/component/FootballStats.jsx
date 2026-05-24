import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
export default function FootballStats() {
  const { matchDetails } = useOutletContext();
  const [stats, setStats] = useState([]);

  const match = matchDetails?.[0];
  console.log("print match", match);
  const fixtureId = match?.fixture?.id;
  console.log("stats fixture id ", fixtureId);
  const xxxKey = "29dbc60ae1b563ce7c360fe4b20f8bb8";
  const fetchStats = async () => {
    try {
      const respond = await axios.get(
        `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`,
        {
          headers: { "x-apisports-key": xxxKey },
        },
      );

      setStats(respond.data.response);
      console.log("the result of our stat", respond.data.response);
    } catch (err) {
      console.log("any errror ", err);
    }
  };

  useEffect(() => {
    if (!fixtureId) return;
    fetchStats();
  }, [fixtureId]);
  if (!matchDetails || matchDetails.length === 0) return <p>loading</p>;

  console.log("let see if we got our id right", match);
  const homeId = match?.teams?.home?.id;
  const awayId = match?.teams?.away?.id;

  const homeStat = stats.find((t) => t.team?.id === homeId);
  const awayStat = stats.find((t) => t.team?.id === awayId);
  return (
    <>
      <h1 className="text-center font-bold">Stat</h1>
      {match?.events?.length === 0 && (
        <p className="text-center mt-4">No events yet</p>
      )}
      {homeStat?.statistics.map((item, index) => {
        const awayStats = awayStat.statistics[index];
        return (
          <div key={index} className="p-[30px]">
            <div className="flex gap-[10px] items-center justify-between">
              <div>
                <h1>{item?.value}</h1>
              </div>

              <div>
                <h1>{item?.type}</h1>
              </div>

              <div>
                <h1>{awayStats?.value}</h1>
              </div>
            </div>

            <div className="flex  gap-[20px]">
              <div className="border h-[20px] w-full  ">
                <div className="h-full w-[20%]  ml-auto bg-green-500"></div>
              </div>
              <div className="border h-[20px] w-full ">
                <div className="h-full w-[20%] bg-green-500"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
