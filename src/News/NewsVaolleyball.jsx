import React from "react";
import NewsDesigneLayout from "./NewsDesigneLayout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function NewsVaolleyball() {
  const xxxKey = "b3aae086d0b548eea29ac50b20cc34de";

  const fetchHomeNews = async () => {
    const respond = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: 'volleyball OR FIVB OR "CEV Champions League" OR SuperLega OR PlusLiga',
        language: "en",
        sortBy: "publishedAt",
        apiKey: xxxKey,
      },
    });

    return respond.data.articles;
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["volleyball-news"],
    queryFn: fetchHomeNews,
    staleTime: 30 * 60 * 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news</p>;

  return (
    <div>
      <NewsDesigneLayout homedata={data} />
    </div>
  );
}
