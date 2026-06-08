import react from "react";
import { useOutletContext } from "react-router-dom";
export default function BaseballSum() {
  const baseballSum = useOutletContext();
  console.log("this is my baseball summary", baseballSum);

  const obj = Object.values(baseballSum);
  console.log("this is the value of obj", obj);

  const homeIni = Object.values(obj[0]?.scores?.home?.innings || {});
  console.log("this is the value of homeIni", homeIni);

  const awayIni = Object.values(obj[0]?.scores?.away?.innings || {});
  console.log("this is the value of awayIni", awayIni);

  return (
    <>
      <div className="flex  justify-between items-center mt-[24px] pl-[20px] pr-[20px] pt-[10px] pb-[10px] mb-[20px] ">
        <div className=" ">
          <div>
            <h1 className="h1Font">Team</h1>
          </div>

          <div className="">
            <div>
              <span className="spanFont">{obj[0]?.teams?.home?.name}</span>
            </div>
            <div>
              <span className="spanFont">{obj[0]?.teams?.away?.name}</span>
            </div>
          </div>
        </div>

        <div className="  ">
          <div className="grid grid-cols-10 gap-4">
            {homeIni.map((_, index) => (
              <div key={index}>
                <h1 className="text-center spanFont">{index + 1}</h1>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-10 gap-4">
            {homeIni.map((item, index) => (
              <div key={index}>
                <h1 className="text-center spanFont">{item ?? "-"}</h1>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-10 gap-4">
            {awayIni.map((item, index) => (
              <div key={index}>
                <h1 className="text-center spanFont">{item ?? "-"}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
