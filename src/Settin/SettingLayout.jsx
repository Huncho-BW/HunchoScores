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
          <h1 className=" H1SetFont">setting</h1>
        </div>

        <div className="w-[100%] mt-[32px] max-w-[480px]">
          <div>
            <div className="mt-2">
              <h1 className="setFont">Timzone</h1>
            </div>
            <div className="mt-2 border border-[white] h-[50px] flex justify-center items-center ">
              <div className="w-[100%]">
                <TimezoneSelect
                  className="setFont"
                  value={timezone}
                  onChange={(tz) => setTimezone(tz.value)}
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="setFont">Select your timezone preference</p>
            </div>
            <div className="mt-2">
              <p className="setFont">Privacy Policy</p>
            </div>

            <div className=" relative border  mt-1 flex flex-col justify-center items-center">
              <button className="setFont " onClick={() => setDropDown(!false)}>
                management prefrence
              </button>
              {dropdown && (
                <div className="pos">
                  <ManagementPrefrence setDropDown={setDropDown} />
                </div>
              )}
            </div>

            <div className="mt-2">
              <p className="setFont">
                Make changes to your privacy preferences.
              </p>
            </div>

            <div
              onClick={handleApply}
              className=" bg-[#ff6b00] border mt-2 mb-2 flex flex-col justify-center items-center"
            >
              <button className="text-black setFont">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
