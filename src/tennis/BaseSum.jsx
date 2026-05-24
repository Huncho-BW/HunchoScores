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
      <div className="pl-[20px] pr-[20px]  mt-[20px] flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="h1Font">Team</h1>
          </div>

          <div className="flex gap-[10px]">
            {homeIni.map((_, index) => (
              <h1 className="text-center h1Font" key={index}>
                {index + 1}
              </h1>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center  ">
          <div className="">
            <div>
              <span className="spanFont">{obj[0]?.teams?.home?.name}</span>
            </div>
            <div>
              <span className="spanFont">{obj[0]?.teams?.away?.name}</span>
            </div>
          </div>

          <div className="">
            <div className="flex gap-[10px] ">
              {homeIni.map((item, index) => (
                <h1 className="text-center spanFont" key={index + 1}>
                  {item ?? "-"}
                </h1>
              ))}
            </div>

            <div className=" flex gap-[10px]">
              {awayIni.map((item, index) => (
                <h1 className="text-center spanFont" key={index + 1}>
                  {item ?? "-"}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
