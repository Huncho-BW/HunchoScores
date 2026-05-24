import React from "react";

export default function NewsDesigneLayout({ homedata }) {
  return (
    <div className="flex-col justify-center grid grid-cols-2 grid-rows-2 gap-[20px]">
      {homedata?.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className="border w-[330px] h-[390px] flex flex-col gap-[20px]"
        >
          <img
            className=" object-cover w-[330px] h-[280px]"
            src={item.urlToImage}
            loading="lazy"
            alt=""
          />

          <h1>{item.title}</h1>
        </a>
      ))}
    </div>
  );
}
