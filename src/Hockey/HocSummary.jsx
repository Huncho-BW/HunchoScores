import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

export default function HocSummary() {
  const hockeySum = useOutletContext();
  const xxxKey = "a5da1f14f44d0b283ae6a626383c0b6b";
  const fetchEvents = async () => {
    const res = await axios.get(
      "https://v1.hockey.api-sports.io/games/events",
      {
        params: { game: hockeySum?.id },
        headers: {
          "x-apisports-key": xxxKey,
        },
      },
    );
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["hockeyEvents", hockeySum?.id],
    queryFn: fetchEvents,
    enabled: !!hockeySum?.id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading events...</p>;

  const events = data?.response;

  return (
    <>
      <>
        <h1 className="text-center font-bold">Summary</h1>

        {events?.length === 0 && (
          <p className="text-center mt-4">No events yet</p>
        )}

        {events?.map((eve, i) => {
          const isHome = eve?.team?.id === hockeySum?.teams?.home?.id;
          const isAway = eve?.team?.id === hockeySum?.teams?.away?.id;

          return (
            <div key={i} className="flex items-center p-[20px]">
              {/* ⏱ TIME */}
              <div className="w-[60px] text-center">
                <h1 className="h1Font">
                  {eve?.period} <span className="spanFont">{eve?.minute}'</span>
                </h1>
              </div>

              {/* 🏠 HOME SIDE */}
              <div className="flex items-center justify-end gap-2 w-1/2">
                {isHome && (
                  <div className="flex flex-col text-right">
                    <h1 className="h1Font">{eve?.players?.[0]}</h1>
                    <span className=" spanFont text-sm text-gray-500">
                      {eve?.type} - {eve?.comment}
                    </span>
                  </div>
                )}
              </div>

              {/* ⚽ SCORE CENTER */}
              <div className="flex items-center justify-center w-[100px]">
                <h1 className="h1Font">{hockeySum?.scores?.home ?? "-"}</h1>
                <span className="mx-2 spanFont">-</span>
                <h1 className="h1Font">{hockeySum?.scores?.away ?? "-"}</h1>
              </div>

              {/* 🚀 AWAY SIDE */}
              <div className="flex items-center justify-start gap-2 w-1/2">
                {isAway && (
                  <div className="flex flex-col">
                    <h1 className="h1Font">{eve?.players?.[0]}</h1>
                    <span className="text-sm spanFont text-gray-500">
                      {eve?.type} - {eve?.comment}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </>
    </>
  );
}
