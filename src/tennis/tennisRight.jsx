import React from "react";
import "react-calendar/dist/Calendar.css";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function TennisRight({ seletedDate, setSelectedDate }) {
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const refDate = useRef(null);
  const apiDate = new Date(seletedDate).toISOString().split("T")[0];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [matchData, setmatchData] = useState([]);

  const fetchMatches = async () => {
    const res = await axios.get("https://v1.baseball.api-sports.io/games", {
      params: {
        date: apiDate,
        timezone: userTimezone,
      },
      headers: {
        "x-apisports-key": xxxKey,
      },
    });
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allMatches", seletedDate, userTimezone],
    queryFn: fetchMatches,
    retry: 5,
    retryDelay: 500,
    staleTime: 1000 * 10 * 60,

    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  const allMatches = data?.response || [];

  console.log("log out rugby  data   match", allMatches);

  const leagues = [
    { id: 1, rank: 1 }, // MLB (USA) 🔥 biggest
    { id: 2, rank: 2 }, // NPB (Japan)
    { id: 5, rank: 3 }, // KBO (South Korea)
    { id: 29, rank: 4 }, // CPBL (Taiwan)
    { id: 3, rank: 5 }, // IL (International League - USA)
    { id: 4, rank: 6 }, // PCL (Pacific Coast League - USA)
    { id: 6, rank: 7 }, // LMB (Mexico)
    { id: 7, rank: 8 }, // LVBP (Venezuela)
    { id: 8, rank: 9 }, // LIDOM (Dominican Republic)
    { id: 9, rank: 10 }, // LBPRC (Puerto Rico)
    { id: 10, rank: 11 }, // ABL (Australia)
    { id: 11, rank: 12 }, // Cuban National Series
    { id: 12, rank: 13 }, // Italian Baseball League
    { id: 13, rank: 14 }, // Dutch Hoofdklasse
    { id: 14, rank: 15 }, // German Bundesliga
    { id: 15, rank: 16 }, // French Division 1
    { id: 16, rank: 17 }, // Chinese Baseball League
    { id: 17, rank: 18 }, // Czech Extraliga
    { id: 18, rank: 19 }, // Argentine League
    { id: 19, rank: 20 }, // Colombian League
  ];
  const sortedMatch = allMatches.sort((a, b) => {
    const atop = leagues.find((l) => l.id === a.league.id);
    const btop = leagues.find((l) => l.id === b.league.id);

    if (atop && btop) return atop.rank - btop.rank;
    if (atop) return -1;
    if (btop) return 1;
    return 0;
  });

  useEffect(() => {
    if (!data?.response) return;
    const matches = sortedMatch.reduce((acc, game) => {
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
    console.log("log out the match", matches);
    setmatchData(matches);
  }, [data]);

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
    console.log("log baseball error", error);
  }

  const openPicker = () => {
    refDate.current.showPicker();
  };

  return (
    <div className="flex flex-col">
      <div className="relative rightBorder  flex w-full gap-[20px] p-[24px] items-center  justify-between">
        <div className="flex w-full gap-[4px]">
          <NavLink
            to="allten"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            ALL
          </NavLink>
          <NavLink
            to="liveten"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            LIVE
          </NavLink>
          <NavLink
            to="finishten"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            finish
          </NavLink>
        </div>

        <div className="flex  w-full">
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

        <div className="flex flex-col  w-full    relative  ">
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
              className=" 
                border
                p-3
                rounded-lg
                appearance-none custom-date    "
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
        <Outlet context={{ matchData }} />
      </div>
    </div>
  );
}
