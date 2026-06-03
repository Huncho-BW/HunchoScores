import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
export default function MyNavbar() {
  const [dropDwon, setDropDwon] = useState(false);

  return (
    <div className=" px-[32px]  py-[16px] gap-[20px] flex items-center border w-full width-[100%] ">
      <div className="relative  flex items-center gap-[10px]">
        <div className="hiddenmenu border rounded-full py-[5px] px-[5px]">
          <span
            className={`cursor-pointer icon ${
              dropDwon ? "rotate-open" : "rotate-close"
            }`}
            onClick={() => setDropDwon((prev) => !prev)}
          >
            {dropDwon ? <CloseIcon /> : <MenuIcon />}
          </span>
        </div>

        <h1 className="fontstyle text-[32px]  font-[700]"> HunchoScores </h1>
      </div>

      <div
        className={`${
          dropDwon ? `dropdwon ` : `hiddenHeader  `
        } flex justify-start gap-[20px] w-full`}
      >
        <NavLink to="/" className=" navText text-[24px] font-[400]">
          Scores
        </NavLink>
        <NavLink to="/news" className=" navText text-[24px] font-[400]">
          News
        </NavLink>
        <NavLink to="/fav" className="navText text-[24px] font-[400]">
          Favourites
        </NavLink>
      </div>

      <div className="flex gap-[20px] justify-end justify-items-end w-full">
        <NavLink to="/liv" className="text-[24px] font-[400]">
          <InfoIcon className="icon-size" />
        </NavLink>
        <NavLink to="/lan" className="text-[24px] font-[400]">
          <LanguageIcon className="icon-size" />
        </NavLink>
        <NavLink to="/set" className="text-[24px] font-[400]">
          <SettingsIcon className="icon-size" />
        </NavLink>
      </div>
    </div>
  );
}
