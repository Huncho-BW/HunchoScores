import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
export default function MyNavbar() {
  const [dropDwon, setDropDwon] = useState(false);

  return (
    <div className="py-[16px] gap-[20px]  px-[32px] flex items-center border ">
      <div className="flex items-center gap-[10px]">
        <div
          onClick={() => {
            setDropDwon(!dropDwon);
          }}
          className="hiddenmenu border rounded-full py-[5px] px-[5px]"
        >
          <span>
            <MenuIcon />
          </span>
        </div>

        <h1 className="fontstyle text-[32px]  font-[700]"> HunchoScores </h1>
      </div>

      <div className="hiddenHeader flex justify-start gap-[20px] w-full ">
        <NavLink to="/" className="text-[24px] font-[400]">
          Scores
        </NavLink>
        <NavLink to="/news" className="text-[24px] font-[400]">
          News
        </NavLink>
        <NavLink to="/fav" className="text-[24px] font-[400]">
          Favourites
        </NavLink>
      </div>

      <div className="flex gap-[20px] justify-end justify-items-end w-full">
        <NavLink to="/liv" className="text-[24px] font-[400]">
          <InfoIcon />
        </NavLink>
        <NavLink to="/lan" className="text-[24px] font-[400]">
          <LanguageIcon />
        </NavLink>
        <NavLink to="/set" className="text-[24px] font-[400]">
          <SettingsIcon className="fontstyle" />
        </NavLink>
      </div>
    </div>
  );
}
