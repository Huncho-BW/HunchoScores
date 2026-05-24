import React from "react";
import { useOutletContext } from "react-router-dom";

export default function VolSummary() {
  const volSum = useOutletContext();
  console.log("log volleyball sum in info", volSum);
  return (
    <>
      <div className="flex  justify-between items-center mt-[24px] pl-[20px] pr-[20px] pt-[10px] pb-[10px] mb-[20px] ">
        <div className="">
          <div>
            <h1 className="h1Font">Team</h1>
          </div>

          <div>
            <h1 className="spanFont">{volSum?.teams?.home?.name}</h1>
          </div>
          <div>
            <h1 className="spanFont">{volSum?.teams?.away?.name}</h1>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-5 gap-4">
            <h1 className="h1Font text-center">1</h1>
            <h1 className="h1Font text-center">2</h1>
            <h1 className="h1Font text-center">3</h1>
            <h1 className="h1Font text-center">4</h1>
            <h1 className="h1Font text-center">5</h1>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <h1 className="text-center">
              {volSum?.periods?.first?.home ?? "-"}
            </h1>
            <h1>{volSum?.periods?.second?.home ?? "-"}</h1>
            <h1 className="text-center">
              {volSum?.periods?.third?.home ?? "-"}
            </h1>

            <h1 className="text-center">
              {volSum?.periods?.fourth?.home ?? "-"}
            </h1>
            <h1 className="text-center">
              {volSum?.periods?.fifth?.home ?? "-"}
            </h1>
          </div>
          <div className=" grid grid-cols-5 gap-4">
            <h1 className="text-center">
              {volSum?.periods?.first?.away ?? "-"}
            </h1>
            <h1 className="text-center">
              {volSum?.periods?.second?.away ?? "-"}
            </h1>
            <h1 className="text-center">
              {volSum?.periods?.third?.away ?? "-"}
            </h1>
            <h1 className="text-center">
              {volSum?.periods?.fourth?.away ?? "-"}
            </h1>
            <h1 className="text-center">
              {volSum?.periods?.fifth?.away ?? "-"}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
