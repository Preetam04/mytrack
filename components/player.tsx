"use client";
import { StreamContext } from "@/context/stream-context";

import { useContext, useEffect } from "react";
import YouTube from "react-youtube";
import { Options } from "youtube-player/dist/types";

export default function Player() {
  const { space, getCurrentStream, currentStream } = useContext(StreamContext);

  const opts: Options = {
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

  useEffect(() => {
    if (space) {
      getCurrentStream(space?.id);
    }
  }, []);

  return (
    <div>
      {/* {currentStream && (
      )} */}
      <div className="">
        <YouTube
          opts={opts}
          videoId={currentStream?.videoId ?? ""}
          className="w-full border-0"
        />

        <h3 className="text-xl mt-2 font-semibold ">
          {currentStream?.name ?? ""}
        </h3>
      </div>
    </div>
  );
}
