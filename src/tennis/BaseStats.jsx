import React from "react";
import { useOutletContext } from "react-router-dom";
export default function BaseStats() {
  const baseballSum = useOutletContext();
  console.log("this is my baseball summary", baseballSum);

  const match = Object.values(baseballSum);
  console.log("this is the value of obj", match);
  if (!match[0]) return <div>No match data available.</div>;
  const stats = [
    { label: "Runs (R)", key: "total" },
    { label: "Hits (H)", key: "hits" },
    { label: "Errors (E)", key: "errors" },
  ];
  return (
    <>
      <div className="mt-4 mt-[24px] pl-[20px] pr-[20px] pt-[10px] pb-[10px] mb-[20px] ">
        <h2>Match Stats</h2>

        <div className="grid grid-cols-3 gap-4">
          <h1>Stat</h1>
          <h1>Home</h1>
          <h1>Away</h1>
        </div>

        {stats.map((stat) => {
          console.log("this is the value of stat");
          return (
            <div key={stat.key} className="grid grid-cols-3 gap-4">
              <h1>{stat.label}</h1>
              <h1>{match[0]?.scores?.home?.[stat.key] ?? "-"}</h1>
              <h1>{match[0]?.scores?.away?.[stat.key] ?? "-"}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}
