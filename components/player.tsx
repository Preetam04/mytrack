"use client";
import { StreamContext } from "@/context/stream-context";

import { useContext } from "react";
import YouTube from "react-youtube";

export default function Player() {
  const { space } = useContext(StreamContext);

  const opts = {
    height: "360",
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      iv_load_policy: 3,

      fs: 0,
      color: "white",
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
    },
  };
  return (
    <div>
      {" "}
      <div className="">
        {/* <iframe
          width="560"
          height="360"
          className="w-full aspect-video border-0"
          src={`https://www.youtube.com/embed/${space?.streams[0].videoId}?autoplay=1&rel=0&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1&enablejsapi=1`}
          title="YouTube video player"
          // frameborder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe> */}
        <YouTube
          opts={opts}
          videoId={space?.streams[1].videoId}
          className="w-full border-0"
        />

        <h3 className="text-xl mt-2 font-semibold ">
          {space?.streams[1].name}
        </h3>
      </div>
    </div>
  );
}
