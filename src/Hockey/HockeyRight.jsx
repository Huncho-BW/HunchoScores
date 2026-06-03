import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios, { Axios } from "axios";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function HockeyRight({ seletedDate, setSelectedDate }) {
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const refDate = useRef(null);
  const apiDate = new Date(seletedDate).toISOString().split("T")[0];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [matchData, setmatchData] = useState([]);

  const fetchMatches = async () => {
    const respond = await axios.get("https://v1.hockey.api-sports.io/games", {
      params: { date: apiDate, timezone: userTimezone },
      headers: { "x-apisports-key": xxxKey },
    });

    return respond.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allMatches", seletedDate, userTimezone],
    queryFn: fetchMatches,
    retry: 5,
    retryDelay: 500,
    staleTime: 1000 * 10 * 60,

    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  const allMatches = data?.response || [];

  const leagues = [
    { id: 57, rank: 1 }, // NHL
    { id: 58, rank: 2 }, // AHL
    { id: 59, rank: 3 }, // ECHL
    { id: 60, rank: 4 }, // KHL
    { id: 61, rank: 5 }, // SHL
    { id: 62, rank: 6 }, // Liiga
    { id: 63, rank: 7 }, // DEL
    { id: 64, rank: 8 }, // National League (Switzerland)
    { id: 65, rank: 9 }, // Czech Extraliga
    { id: 66, rank: 10 }, // ICE Hockey League

    { id: 67, rank: 11 }, // Slovak Extraliga
    { id: 68, rank: 12 }, // Danish Metal Ligaen
    { id: 69, rank: 13 }, // Norwegian GET-ligaen
    { id: 70, rank: 14 }, // French Ligue Magnus
    { id: 71, rank: 15 }, // British EIHL

    { id: 72, rank: 16 }, // Alps Hockey League
    { id: 73, rank: 17 }, // Belarus Extraleague
    { id: 74, rank: 18 }, // Asian League Ice Hockey
    { id: 75, rank: 19 }, // Poland Hokej Liga
    { id: 76, rank: 20 }, // Hungary Erste Liga

    { id: 77, rank: 21 }, // Romania Liga Nationala
    { id: 78, rank: 22 }, // Ukraine Hockey League
    { id: 79, rank: 23 }, // Latvia Optibet League
    { id: 80, rank: 24 }, // Lithuania Hockey League
    { id: 81, rank: 25 }, // Netherlands Eredivisie

    { id: 82, rank: 26 }, // Belgium Hockey League
    { id: 83, rank: 27 }, // Spain Superliga
    { id: 84, rank: 28 }, // Australia AIHL
    { id: 85, rank: 29 }, // New Zealand NZIHL
    { id: 86, rank: 30 }, // Turkey Super Lig
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
            to="allhoc"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            ALL
          </NavLink>
          <NavLink
            to="livehoc"
            className=" rightFont text-[18px] font-[700]  bg-[#F5F5F5]  rounded-2xl p-2"
          >
            LIVE
          </NavLink>
          <NavLink
            to="finishhoc"
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
