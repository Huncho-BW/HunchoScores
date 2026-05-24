import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios, { Axios } from "axios";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function VolleyRight({ seletedDate, setSelectedDate }) {
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const refDate = useRef(null);
  const apiDate = new Date(seletedDate).toISOString().split("T")[0];

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [matchData, setmatchData] = useState([]);
  const fetchMatches = async () => {
    const respond = await axios.get(
      "https://v1.volleyball.api-sports.io/games",
      {
        params: { date: apiDate, timezone: userTimezone },
        headers: { "x-apisports-key": xxxKey },
      },
    );

    return respond.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allMatches", seletedDate],
    queryFn: fetchMatches,
    cacheTime: 10 * 60 * 1000,
  });

  const allMatches = data?.response || [];

  console.log("log all volley matches", allMatches);

  const leagues = [
    { id: 12, rank: 1 },
    { id: 117, rank: 2 },
    { id: 11, rank: 3 },
    { id: 116, rank: 4 },
    { id: 8, rank: 5 },
    { id: 31, rank: 6 },
    { id: 19, rank: 7 },
    { id: 27, rank: 8 },
    { id: 6, rank: 9 },
    { id: 16, rank: 10 },
    { id: 20, rank: 11 },
    { id: 7, rank: 12 },
    { id: 15, rank: 13 },
    { id: 9, rank: 14 },
    { id: 10, rank: 15 },
    { id: 17, rank: 16 },
    { id: 18, rank: 17 },
    { id: 21, rank: 18 },
    { id: 22, rank: 19 },
    { id: 23, rank: 20 },
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

  const openPicker = () => {
    refDate.current.showPicker();
  };

  return (
    <div className="flex flex-col">
      <div className="relative rightBorder  flex w-full gap-[20px] p-[24px] items-center  justify-between">
        <div className="flex w-full gap-[4px]">
          <NavLink
            to="allvolleyball"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            ALL
          </NavLink>
          <NavLink
            to="livevolleyball"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            LIVE
          </NavLink>
          <NavLink
            to="finishvolleyball"
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
              sx={{ fontSize: "30px" }}
              onClick={openPicker}
              className="absolute
                     right-3
                     top-1/2
                     -translate-y-1/2
                     cursor-pointer"
            />
            <h1
              className="absolute right-3 text-center  mr-[] top-1/2
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
