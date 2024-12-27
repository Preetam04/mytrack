"use client";

import { Space } from "@/app/(app)/space/[spaceId]/page";
import React, { createContext, useState } from "react";

export const StreamContext = createContext<{
  space: Space | null;
  setSpace: React.Dispatch<React.SetStateAction<Space | null>>;
}>({
  space: null,
  setSpace: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [space, setSpace] = useState<Space | null>(null);
  return (
    <StreamContext.Provider value={{ space, setSpace }}>
      {children}
    </StreamContext.Provider>
  );
};
