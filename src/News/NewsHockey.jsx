import React from "react";
import NewsDesigneLayout from "./NewsDesigneLayout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function NewsHockey() {
  const xxxKey = "b3aae086d0b548eea29ac50b20cc34de";
  const fetchHomeNews = async () => {
    const respond = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "NHL OR AHL OR ECHL OR KHL",
        language: "en",
        sortBy: "publishedAt",
        apiKey: xxxKey,
      },
    });

    return respond.data.articles;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articlesHockey"],
    queryFn: fetchHomeNews,
    staleTime: 30 * 60 * 1000,
  });

  const newData = data || [];

  console.log("log out news t", newData);

  return (
    <>
      <div>
        <NewsDesigneLayout homedata={newData} />
      </div>
    </>
  );
}
