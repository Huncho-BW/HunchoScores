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
      <div className="p-[12px] md:p-[20px]  lg:-[32px]">
        <h1 className="h1Font ">Sarting XI</h1>

        <div className="grid grid-cols-2  flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            {homeStartingXI?.map((start) => (
              <h1 className="spanFont text-left">{start?.player?.name}</h1>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {awayStartingXI?.map((awyStart) => (
              <h1 className="spanFont text-left">{awyStart?.player?.name}</h1>
            ))}
          </div>
        </div>

        <h1 className="mt-3 mb-3 h1Font ">Substitute players</h1>

        <div className="grid grid-cols-2 flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            {homeSub?.map((sub) => (
              <h1 className="spanFont text-left">{sub?.player?.name}</h1>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {awaySub?.map((awySub) => (
              <h1 className="spanFont text-left">{awySub?.player?.name}</h1>
            ))}
          </div>
        </div>

        <h1 className="mt-3 mb-3 h1Font ">Coaches</h1>
        <div className="grid grid-cols-2 flex items-center  gap-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="spanFont text-left">{homeCoach}</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="spanFont text-left">{awayCoach}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
