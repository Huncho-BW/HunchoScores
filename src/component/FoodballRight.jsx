import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import "react-calendar/dist/Calendar.css";
import { data, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import { TimezoneContext } from "../component/TimezoneContext";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function FoodballRight({ seletedDate, setSelectedDate }) {
  const apiDate = new Date(seletedDate).toISOString().split("T")[0];

  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const refDate = useRef(null);
  const [pickerValue, setpickervalue] = useState("");
  const { timezone, setTimezone } = useContext(TimezoneContext);
  console.log("log out timezone", timezone);

  const [allMatches, setAllMatches] = useState([]);

  const leaguePriority = [
    {
      id: 1,
      rank: 1, // world cup
    },

    {
      id: 2,
      rank: 2, // Champions League
    },
    {
      id: 4,
      rank: 3, // Europa Champions League
    },
    {
      id: 3,
      rank: 4, // Europa League
    },
    {
      id: 9,
      rank: 5, // Copar american
    },
    {
      id: 39,
      rank: 6, // Premier League
    },
    {
      id: 140,
      rank: 7, // La Liga
    },
    {
      id: 135,
      rank: 8, // Serie A
    },
    {
      id: 45,
      rank: 9, // fa cup
    },
    {
      id: 78,
      rank: 10, // Bundesliga
    },
    {
      id: 61,
      rank: 11, // Ligue 1
    },

    {
      id: 137,
      rank: 12, // Coppa Italia
    },
    {
      id: 143,
      rank: 13, // Copa del Rey
    },

    {
      id: 66,
      rank: 14, // Coupe de France
    },
    {
      id: 81,
      rank: 15, // DFB-Pokal
    },
  ];
  const fetchMatches = async (date = apiDate, signal) => {
    const respond = await axios.get(
      "https://v3.football.api-sports.io/fixtures",
      {
        params: { date: apiDate, timezone: timezone },
        headers: { "x-apisports-key": xxxKey },
        signal,
      },
    );

    return respond?.data?.response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["apiData", seletedDate, timezone],
    queryFn: fetchMatches,
    retry: 5,
    retryDelay: 500,
    staleTime: 1000 * 10 * 60,

    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  const apiData = data || [];

  const sortFixtures = apiData.sort((a, b) => {
    const aTop = leaguePriority.find((l) => l.id === a.league.id);
    const bTop = leaguePriority.find((l) => l.id === b.league.id);

    if (aTop && bTop) return aTop.rank - bTop.rank;
    if (aTop) return -1;
    if (bTop) return 1;

    return 0;
  });

  useEffect(() => {
    const matches = sortFixtures.reduce((acc, game) => {
      let league = acc.find((l) => l.id === game.league.id);

      if (!league) {
        league = {
          ...game.league,
          games: [],
        };

        acc.push(league);
      }

      league.games.push(game);

      return acc;
    }, []);

    setAllMatches(matches);
  }, [sortFixtures]);

  const goToyesterday = () => {
    const newDate = new Date(seletedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToTomorrow = () => {
    const newDate = new Date(seletedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const getDateLebal = (data) => {
    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const sameDay = (d1, d2) => {
      return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
      );
    };

    if (sameDay(data, today)) return "today";
    if (sameDay(data, yesterday)) return "yesterday";
    if (sameDay(data, tomorrow)) return "tomorrow";

    return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`;
  };

  if (error) {
    console.error("log baseball error", error);
  }

  const openPicker = () => {
    refDate.current.showPicker();
  };

  console.log("log out api date", seletedDate);
  return (
    <div className="  flex flex-col">
      <div className=" relative rightBorder  flex w-full gap-[20px] p-[24px] items-center  justify-between ">
        <div className=" flex   w-full gap-[4px]">
          <NavLink
            to="all"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            ALL
          </NavLink>
          <NavLink
            to="live"
            className="rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            LIVE
          </NavLink>
          <NavLink
            to="finish"
            className="rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            finish
          </NavLink>
        </div>

        <div className=" flex  w-full ">
          <button onClick={goToyesterday}>
            <ArrowLeftIcon />
          </button>
          <h1 className="text-[18px] font-[700]  p-2">
            {getDateLebal(seletedDate)}
          </h1>
          <button onClick={goToTomorrow}>
            <ArrowRightIcon />
          </button>
        </div>

        <div className="flex   w-full  relative  ">
          <div className="absolute inset-0 w-full ">
            <input
              value={apiDate}
              ref={refDate}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDate(new Date(value));

                console.log("selected date:", value);
              }}
              type="date"
              className=" w-full
          border
          p-3
          rounded-lg
          appearance-none custom-date "
            />
            <CalendarTodayIcon
              sx={{ fontSize: "35px" }}
              onClick={openPicker}
              className="absolute
          right-3
          top-1/2
          -translate-y-1/2
          cursor-pointer"
            />
            <h1
              className="absolute text-center ml-[10px] mr-[10px] right-3 pt-[2px] pl-[2px]  top-1/2
          -translate-y-1/2"
            >
              {new Date(apiDate).toLocaleDateString("en-us", {
                day: "numeric",
                timeZone: "UTC",
              })}
            </h1>
          </div>
        </div>
      </div>

      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
        <Outlet context={{ allMatches }} />
      </div>
    </div>
  );
}
