import React, { useState } from "react";
import { BiFootball } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
export default function SummaryInfo() {
  const { matchDetails } = useOutletContext();
  if (!matchDetails) {
    return <div>loading</div>;
  }
  const match = matchDetails[0];
  const homeId = match?.teams?.home?.id;
  const awayId = match?.teams?.away?.id;
  console.log("this is match details ", match);

  return (
    <>
      {match?.events?.length === 0 && (
        <p className="text-center mt-4">No events yet</p>
      )}
      {match?.events?.length > 0 && (
        <h1 className="text-center font-bold">Summary</h1>
      )}
      {match?.events?.map((eve, index) => {
        return (
          <>
            <div
              key={eve.time.elapsed + eve.player.id}
              className="flex items-center p-[20px]"
            >
              {/* time*/}
              <div className="">
                <h1>{eve.time?.elapsed}</h1>
              </div>
              {/* HOME EVENT */}
              <div className="flex items-center justify-end gap-2 w-1/2">
                {eve.team?.id === homeId && (
                  <div className="flex flex-col text-right">
                    {eve.type === "Goal" && (
                      <div className="flex flex-col">
                        <h1>{eve.player?.name}</h1>
                        {eve.assist?.name && <h1>Assist: {eve.assist.name}</h1>}
                      </div>
                    )}

                    {eve.type === "Card" && (
                      <div className="flex gap-2">
                        <h1 className="flex ">
                          {eve.player.name} - <span>{eve.details}</span>
                        </h1>
                        <CropPortraitIcon color="action" />
                      </div>
                    )}

                    {eve.type === "Goal" && <BiFootball />}
                  </div>
                )}
              </div>

              {/* SCORE */}
              <div className="flex items-center justify-center w-[120px]">
                <h1>{match.goals?.home}</h1>
                <span className="mx-2">-</span>
                <h1>{match.goals?.away}</h1>
              </div>

              {/* AWAY EVENT */}
              <div className="flex items-center justify-start gap-2 w-1/2">
                {eve.team?.id === awayId && (
                  <>
                    {eve.type === "Goal" && <BiFootball />}
                    {eve.type === "Goal" && (
                      <div className="flex flex-col">
                        <h1>{eve.player?.name}</h1>

                        {eve.assist?.name && <h1>Assist: {eve.assist.name}</h1>}
                      </div>
                    )}
                    {eve.type === "Card" && (
                      <div className="flex gap-2">
                        <h1 className="flex ">
                          {eve.player?.name} - {eve.details}
                        </h1>
                        <CropPortraitIcon color="action" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
