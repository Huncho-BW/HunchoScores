import React, { Children } from "react";
import MyNavbar from "./component/Navbar";
import Layout from "./component/Layout";
import Allmatches from "./component/AllMatche";
import LiveMatches from "./component/LiveMatches";
import Finishmatch from "./component/FinishMatches";
import Football from "./component/Football";
import BasketBall from "./BasketBall/Basketball";
import AllBas from "./BasketBall/AllBas";
import FinishBas from "./BasketBall/FInishBas";
import LiveBass from "./BasketBall/LiveBas";
import Hockey from "./Hockey/Hockey";
import AllHoc from "./Hockey/AllHock";
import LiveHoc from "./Hockey/LiveHock";
import FinishHoc from "./Hockey/FinishHoc";
import Tennis from "./tennis/tennis";
import AllTen from "./tennis/AllTennis";
import LiveTen from "./tennis/LiveTennis";
import FinishTen from "./tennis/FinishTennis";
import MatchFootballSummary from "./component/SummaryFootball";
import SummaryInfo from "./component/SummaryInfo";
import FootballH2H from "./component/FootBallH2h";
import FootballIineUp from "./component/FootBallLineUp";
import FootballInfo from "./component/FootballInfo";
import FootballStats from "./component/FootballStats";
import FootballTable from "./component/FootballTable";
import FootballClub from "./component/FootballClub";
import MyClubOverview from "./component/FootballClubOverview";
import MyClubMatches from "./component/FootballClubMatches";
import FootBallPlayerStats from "./component/FootballPlayerSat";
import ClubFixtures from "./component/FootballClubFixture";
import ClubResult from "./component/FootballClubResult";
import RedCard from "./component/RedCard";
import PlayerStatAll from "./component/PlayerStatsAll";
import Topscore from "./component/TopScore";
import TopAssit from "./component/TopAssist";
import YellowCard from "./component/YellowCard";
import BasketSumm from "./BasketBall/BasketSumm";

import BassInfo from "./BasketBall/BassInfo";

import BassTable from "./BasketBall/BassTable";
import HockeyInfo from "./Hockey/HockeyInfo";

import HockeySumm from "./Hockey/HockeySumm";

import HockeyTable from "./Hockey/HockeyTable";
import HocSummary from "./Hockey/HocSummary";

import BaseballSummary from "./tennis/BaseballSummary";
import BaseMatch from "./tennis/baseMatch";

import BaseLineup from "./tennis/baseLineup";

import BaseTable from "./tennis/BaseTable";

import BaseStats from "./tennis/BaseStats";
import BaseballSum from "./tennis/BaseSum";

import Volleyball from "./VaolleyBall/Volleyball";
import AllVolleyball from "./VaolleyBall/AllVolleyball";
import LiveVolleyball from "./VaolleyBall/LiveVolleyball";
import FinishVolleyball from "./VaolleyBall/FinishVolleyball";

import VolInfo from "./VaolleyBall/VolInfo";
import VolTable from "./VaolleyBall/VolTable";
import VolSummary from "./VaolleyBall/Volsumm";

import VaolleyballSummary from "./VaolleyBall/VaolleyballSummary";

import BaseH2H from "./tennis/BaseH2h";

import { Navigate } from "react-router-dom";
import NewsLayout from "./News/NewsLayout";
import FavLayout from "./Favourites/Fav";
import SettinLayout from "./Settin/Settin";
import LanguegaLayout from "./Languag/Language";
import NewsBaseball from "./News/NewsBaseball";

import NewsBasketball from "./News/NewsBasket";

import NewsFootball from "./News/NewsFootball";

import NewsHockey from "./News/NewsHockey";

import NewsHome from "./News/NewsHome";

import NewsVaolleyball from "./News/NewsVaolleyball";
import LiveScore from "./LiveScore/Livesocere";
import VoalleyBallHeadToHead from "./VaolleyBall/VaolleyballHeadToHead";
const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",

        element: <Football />,

        children: [
          { index: true, element: <Allmatches /> },
          { path: "all", element: <Allmatches /> },
          { path: "live", element: <LiveMatches /> },
          { path: "finish", element: <Finishmatch /> },

          {
            path: "/match/summary/:id",
            element: <MatchFootballSummary />,
            children: [
              { index: true, element: <SummaryInfo /> },

              { path: "summary", element: <SummaryInfo /> },
              { path: "info", element: <FootballInfo /> },
              { path: "stats", element: <FootballStats /> },
              {
                path: "lineUp",
                element: <FootballIineUp />,
              },
              { path: "table", element: <FootballTable /> },
              { path: "h2h", element: <FootballH2H /> },
            ],
          },

          {
            path: "/team/:id/:leagueId/:season",
            element: <FootballClub />,
            children: [
              { index: true, element: <Navigate to="matches" /> },

              {
                path: "matches",
                element: <MyClubMatches />,
                children: [
                  { index: true, element: <ClubResult /> },

                  { path: "fixture", element: <ClubFixtures /> },

                  {
                    path: "resultClub",
                    element: <ClubResult />,
                    children: [{ index: true, element: <ClubResult /> }],
                  },
                ],
              },

              {
                path: "playerstat",
                element: <FootBallPlayerStats />,
                children: [
                  { index: true, element: <PlayerStatAll /> },
                  { path: "playerStatsAll", element: <PlayerStatAll /> },
                  { path: "topScore", element: <Topscore /> },
                  { path: "topAssit", element: <TopAssit /> },
                  { path: "yellowCard", element: <YellowCard /> },
                  { path: "redCard", element: <RedCard /> },
                ],
              },
            ],
          },

          //playerroute
        ],
      },

      {
        path: "basket",
        element: <BasketBall />,
        children: [
          { index: true, element: <AllBas /> },
          { path: "allbas", element: <AllBas /> },
          { path: "liveBas", element: <LiveBass /> },

          { path: "finishBas", element: <FinishBas /> },

          {
            path: "/basket/BasMatch/summary/:id",
            element: <BasketSumm />,
            children: [
              { index: true, element: <BassInfo /> },
              { path: "Bassinfo", element: <BassInfo /> },
              { path: "BassTable", element: <BassTable /> },
            ],
          },
        ],
      },

      {
        path: "/hockey",
        element: <Hockey />,
        children: [
          { index: true, element: <AllHoc /> },
          { path: "allhoc", element: <AllHoc /> },
          { path: "livehoc", element: <LiveHoc /> },

          { path: "finishhoc", element: <FinishHoc /> },

          {
            path: "/hockey/HocMatch/summary/:id",
            element: <HockeySumm />,
            children: [
              { index: true, element: <HockeyInfo /> },
              { path: "Hocinfo", element: <HockeyInfo /> },
              { path: "HocTable", element: <HockeyTable /> },
              { path: "HocSummary", element: <HocSummary /> },
            ],
          },
        ],
      },

      {
        path: "/baseball",
        element: <Tennis />,
        children: [
          { index: true, element: <AllTen /> },
          { path: "allten", element: <AllTen /> },
          { path: "liveten", element: <LiveTen /> },

          { path: "finishten", element: <FinishTen /> },

          {
            path: "/baseball/match/summary/:id",
            element: <BaseballSummary />,
            children: [
              {
                index: true,
                element: <BaseMatch />,
              },
              {
                path: "baseMatch",
                element: <BaseMatch />,
                children: [
                  { index: true, element: <BaseballSum /> },
                  { path: "baseSum", element: <BaseballSum /> },
                  { path: "baseStat", element: <BaseStats /> },
                  { path: "baseLineUp", element: <BaseLineup /> },
                ],
              },
              { path: "baseH2H", element: <BaseH2H /> },
              { path: "baseTable", element: <BaseTable /> },
            ],
          },
        ],
      },

      {
        path: "/vaolleyball",
        element: <Volleyball />,
        children: [
          { index: true, element: <AllVolleyball /> },
          { path: "allvolleyball", element: <AllVolleyball /> },
          { path: "livevolleyball", element: <LiveVolleyball /> },

          { path: "finishvolleyball", element: <FinishVolleyball /> },

          {
            path: "/vaolleyball/vaolleyball/match/summary/:id",
            element: <VaolleyballSummary />,
            children: [
              { index: true, element: <VolInfo /> },
              {
                path: "volInfo",
                element: <VolInfo />,
              },
              {
                path: "volSummary",
                element: <VolSummary />,
              },
              { path: "volHeadToHead", element: <VoalleyBallHeadToHead /> },
              {
                path: "volTable",
                element: <VolTable />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/news",
    element: <NewsLayout />,
    children: [
      { index: true, element: <NewsHome /> },
      { path: "newsHome", element: <NewsHome /> },
      {
        path: "newsFootball",
        element: <NewsFootball />,
      },
      {
        path: "newsBasket",
        element: <NewsBasketball />,
      },
      {
        path: "newsHockey",
        element: <NewsHockey />,
      },
      {
        path: "newsBaseball",
        element: <NewsBaseball />,
      },
      {
        path: "newsVaolleyball",
        element: <NewsVaolleyball />,
      },
    ],
  },

  {
    path: "/fav",
    element: <FavLayout />,
  },

  { path: "/liv", element: <LiveScore /> },

  { path: "/lan", element: <LanguegaLayout /> },

  { path: "/set", element: <SettinLayout /> },
];

export default routeConfig;
