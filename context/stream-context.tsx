"use client";

import { Space, TStream } from "@/app/(app)/space/[spaceId]/page";
import axios from "axios";
import React, { createContext, useCallback, useState } from "react";

export const StreamContext = createContext<{
  space: Space | null;
  setSpace: React.Dispatch<React.SetStateAction<Space | null>>;
  getCurrentStream: (spaceId: string) => void;
  currentStream: TStream | null;
  changeCurrentStream: () => void;
}>({
  space: null,
  setSpace: () => {},
  getCurrentStream: () => {},
  currentStream: null,
  changeCurrentStream: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [space, setSpace] = useState<Space | null>(null);
  const [currentStream, setCurrentStream] = useState<TStream | null>(null);

  const getCurrentStream = useCallback(async (spaceId: string) => {
    try {
      const resp = await axios.get(`/api/space/current/${spaceId}`);

      // console.log(resp.data.currentStream.stream);
      setCurrentStream(resp.data.currentStream.stream);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const changeCurrentStream = async () => {
    try {
      const temp = currentStream?.id;

      const resp = await axios.patch("/api/stream/current", {
        spaceId: space?.id,
        streamId: space?.streams
          .filter((ele) => ele.id !== currentStream?.id)
          .sort((a, b) => b.upvote.length - a.upvote.length)[0].id,
      });

      const deletedStream = await axios.delete(
        `/api/stream/remove/?spaceId=${space?.id}&streamId=${currentStream?.id}`
      );

      console.log(deletedStream.data);

      setCurrentStream(resp.data?.currentStream.stream);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StreamContext.Provider
      value={{
        space,
        setSpace,
        getCurrentStream,
        currentStream,
        changeCurrentStream,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};
