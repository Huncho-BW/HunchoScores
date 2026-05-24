import React from "react";
import NewsDesigneLayout from "./NewsDesigneLayout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function NewsHome() {
  const xxxKey = "b3aae086d0b548eea29ac50b20cc34de";
  const fetchHomeNews = async () => {
    const respond = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "football OR soccer OR Premier League OR La Liga OR Champions League",
        sortBy: "publishedAt",
        language: "en",
        apiKey: xxxKey,
      },
    });

    return respond.data.articles;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchHomeNews,
    staleTime: 30 * 60 * 1000,
  });

  const homeData = data || [];
  console.log("this is new data ", homeData);
  const footballKeywords = [
    "premier league",
    "la liga",
    "champions league",
    "arsenal",
    "chelsea",
    "man united",
    "real madrid",
    "barcelona",
    "liverpool",
    "man city",
    "football",
    "soccer",
  ];

  const newData = homeData.filter((a) => {
    const text = ((a.title || "") + " " + (a.description || "")).toLowerCase();

    return footballKeywords.some((k) => text.includes(k));
  });
  console.log("log out news t", newData);
  return (
    <>
      <NewsDesigneLayout homedata={newData} />
    </>
  );
}
