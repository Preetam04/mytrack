import Navbar from "@/components/navbar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center  py-10 px-10 w-full">
        {children}
      </div>
    </div>
  );
}
