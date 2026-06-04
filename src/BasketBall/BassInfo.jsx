import React from "react";
import { useOutletContext } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { MdOutlineStadium } from "react-icons/md";
import { MdOutlineReduceCapacity } from "react-icons/md";
export default function BassInfo() {
  const BasSum = useOutletContext();
  const newDate = BasSum?.date
    ? new Date(BasSum?.date).toISOString().split("T")[0]
    : "no date ";
  console.log("bass sum", BasSum);
  return (
    <>
      <div className="flex  justify-between items-center mt-[24px] pl-[20px] pr-[20px] pt-[10px] pb-[10px] mb-[20px] ">
        {/* header */}
        <div className="">
          <div>
            <h1 className="h1Font">Team</h1>
          </div>

          <div className="">
            <div>
              <h1 className="spanFont">{BasSum?.teams?.home?.name}</h1>
            </div>
            <div>
              <h1 className="spanFont"> {BasSum?.teams?.away?.name}</h1>
            </div>
          </div>
        </div>

        <div className=" ">
          <div className="grid grid-cols-5 gap-4">
            <h1 className="h1Font text-center">1</h1>
            <h1 className="h1Font text-center">2</h1>
            <h1 className="h1Font text-center">3</h1>
            <h1 className="h1Font text-center">4</h1>
            <h1 className="h1Font text-center">5</h1>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <h1 className="spanFont text-center">
              {BasSum?.scores?.home?.quarter_1 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.home?.quarter_2 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.home?.quarter_3 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.home?.quarter_4 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.home?.over_time ?? "-"}
            </h1>
          </div>

          <div className=" grid grid-cols-5 gap-4">
            <h1 className="spanFont text-center">
              {BasSum?.scores?.away?.quarter_1 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.away?.quarter_2 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.away?.quarter_3 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.away?.quarter_4 ?? "-"}
            </h1>
            <h1 className="spanFont text-center">
              {BasSum?.scores?.away?.over_time ?? "-"}
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-[20px] py-[20px]">
        <h1 className="h1Font">MATCH INFO</h1>
        <div className=" infoboder flex flex-wrap  items-center justify-around">
          <div className="flex gap-2 items-center">
            <h1 className="whitespace-nowrap spanFont">
              <SlCalender />
            </h1>
            <h1 className="whitespace-nowrap spanFont">{newDate}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="whitespace-nowrap spanFont">
              <MdOutlineStadium />
            </h1>
            <h1>{BasSum.venue}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="whitespace-nowrap spanFont">
              <MdOutlineReduceCapacity />
            </h1>
            <h1>num capacity</h1>
          </div>
        </div>
      </div>
    </>
  );
}
