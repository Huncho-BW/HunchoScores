import React, { useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { Languages } from "./LanguageJson";
export default function Lang({ setDropDown }) {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <div className="flex flex-col   managementSize  p-[20px]    border  bg-[#222222] ">
      <div className="flex gap-[20px] items-center  ">
        <div className="flex gap-[10px] justify-center items-center w-[100%]">
          <h1 className="text-white text-center"> Select Langugage</h1>
        </div>
        <div
          onClick={() => setDropDown(false)}
          className="flex justify-end w-[100%]"
        >
          <CancelIcon />
        </div>
      </div>

      <div className="flex flex-col">
        {Languages?.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
              setDropDown(false);
            }}
            className="group text-white py-[10px] text-left"
          >
            <span>{lang.name}</span>

            <div
              className={`h-[2px] bg-white transition-all duration-300 ${
                language === lang.code ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
