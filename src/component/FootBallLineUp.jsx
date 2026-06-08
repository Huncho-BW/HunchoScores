import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";

export default function FootballIineUp() {
  const { matchDetails } = useOutletContext();

  const lineUpdata = matchDetails[0]?.lineups;

  if (lineUpdata?.length === 0)
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-center mt-4 text-gray-500 text-lg font-semibold">
          Line Up is not Avaliable
        </p>
      </div>
    );

  const homeStartingXI = lineUpdata[0]?.startXI || [];
  const awayStartingXI = lineUpdata[1]?.startXI || [];

  const homeSub = lineUpdata[0]?.substitutes || [];
  const awaySub = lineUpdata[1]?.substitutes || [];

  const homeCoach = lineUpdata[0]?.coach?.name || [];
  const awayCoach = lineUpdata[1]?.coach?.name || [];

  console.log(
    "line up data",
    homeStartingXI,
    awayStartingXI,
    homeSub,
    awaySub,
    homeCoach,
    awayCoach,
  );

  return (
    <>
      <div>
        <h1>Sarting XI</h1>

        <div className="grid grid-cols-2  flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            {homeStartingXI?.map((start) => (
              <h1>{start?.player?.name}</h1>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {awayStartingXI?.map((awyStart) => (
              <h1>{awyStart?.player?.name}</h1>
            ))}
          </div>
        </div>

        <h1>Substitute players</h1>

        <div className="grid grid-cols-2 flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            {homeSub?.map((sub) => (
              <h1>{sub?.player?.name}</h1>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {awaySub?.map((awySub) => (
              <h1>{awySub?.player?.name}</h1>
            ))}
          </div>
        </div>

        <h1>Coaches</h1>
        <div className="grid grid-cols-2 flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            <h1>{homeCoach}</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1>{awayCoach}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
