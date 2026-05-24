import React from "react";
import { useOutletContext } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { MdOutlineStadium } from "react-icons/md";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { GiWhistle } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
export default function HockeyInfo() {
  const hockeySum = useOutletContext();
  console.log("hockey sum", hockeySum);
  const newDate = hockeySum?.date
    ? new Date(hockeySum?.date).toISOString().split("T")[0]
    : "no date ";
  return (
    <>
      <div className="mt-[24px]">
        <div className=" flex justify-around gap-2">
          <div className="flex items-center gap-1">
            <span>
              <SlCalender />
            </span>
            <h1>{newDate}</h1>
          </div>

          <div className="flex items-center gap-1">
            <span>
              <MdOutlineStadium />
            </span>
            <h1>{hockeySum?.venue || "Unavailable"}</h1>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <FaCity />
            </span>
            <h1>{hockeySum?.capacity || "Unavailable"}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
