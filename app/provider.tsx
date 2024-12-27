"use client";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "@/context/stream-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ContextProvider>
    </SessionProvider>
  );
}
