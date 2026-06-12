import React from "react";
import { useOutletContext } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { MdOutlineStadium } from "react-icons/md";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { GiWhistle } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
export default function FootballInfo() {
  const { matchDetails } = useOutletContext();
  if (!matchDetails || matchDetails.length === 0) {
    return <p>loading</p>;
  }
  const match = matchDetails[0];
  const newDate = match?.fixture?.date
    ? new Date(match?.fixture?.date).toISOString().split("T")[0]
    : "no date ";

  return (
    <div className="mt-[24px] pl-[20px] pr-[20px] pt-[10px] pb-[10px] mb-[20px]">
      <h1 className="spanFont ">match info</h1>
      <div className="infoboder flex flex-wrap  justify-around items-center gap-2">
        <div className="flex items-center gap-1">
          <span>
            <SlCalender />
          </span>
          <h1 className="whitespace-nowrap spanFont  spanFont">{newDate}</h1>
        </div>

        <div className="flex items-center gap-1">
          <span>
            <GiWhistle />
          </span>
          <h1 className="whitespace-nowrap spanFont">
            {match.fixture.referee || "Unavailable"}
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <span>
            <MdOutlineStadium />
          </span>
          <h1 className="whitespace-nowrap spanFont">
            {match.fixture.venue.name || "Unavailable"}
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <span>
            <FaCity />
          </span>
          <h1 className="whitespace-nowrap spanFont">
            {match.fixture.venue.city || "Unavailable"}
          </h1>
        </div>
      </div>
    </div>
  );
}
