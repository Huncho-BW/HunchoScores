import React, { useContext, useState } from "react";
import ManagementPrefrence from "./ManagementPrefrence";
import TimezoneSelect from "react-timezone-select";
import { TimezoneContext } from "../component/TimezoneContext";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function SettingDesignLayout() {
  const { timezone, setTimezone } = useContext(TimezoneContext);

  const queryClient = useQueryClient();

  const [dropdown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const handleApply = () => {
    queryClient.invalidateQueries({ queryKey: ["apiData"] });

    navigate("/");
  };

  return (
    <>
      <div className=" mt-[32px] border m-[20px] flex flex-col justify-center items-center p-[10px] bg-[#ffffff]  ">
        <div className=" h-[50px]  border-b w-[100%] flex flex-col justify-center items-center">
          <h1 className="h1Font">setting</h1>
        </div>

        <div className="w-[100%] mt-[32px] max-w-[480px]">
          <div>
            <div className="mt-2">
              <h1 className="spanFont">Timzone</h1>
            </div>
            <div className="mt-2 border border-[white] h-[50px] flex justify-center items-center ">
              <div className="w-[100%]">
                <TimezoneSelect
                  value={timezone}
                  onChange={(tz) => setTimezone(tz.value)}
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="spanFont">Select your timezone preference</p>
            </div>
            <div className="mt-2">
              <p className="spanFont">Privacy Policy</p>
            </div>

            <div className=" relative border border-[white] mt-1 flex flex-col justify-center items-center">
              <button className="" onClick={() => setDropDown(!false)}>
                management prefrence
              </button>
              {dropdown && (
                <div className="fixed inset-0  z-[1000] flex  top-20 left-1/2 -translate-x-1/2 ">
                  <ManagementPrefrence setDropDown={setDropDown} />
                </div>
              )}
            </div>

            <div className="mt-2">
              <p className="spanFont">
                Make changes to your privacy preferences.
              </p>
            </div>

            <div
              onClick={handleApply}
              className=" bg-[#ff6b00] border mt-2 mb-2 flex flex-col justify-center items-center"
            >
              <button className="text-black">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
