"use client";
import { TStream } from "@/app/(app)/space/[spaceId]/page";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";
import axios from "axios";

export default function QueueItem({ data }: { data: TStream }) {
  // console.log(data);

  const vote = async () => {
    try {
      const resp = await axios.post("http://localhost:3000/api/stream/vote", {
        streamId: data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={data.id}
      className="w-full p-2 bg-secondary/25 rounded-md flex gap-4 items-center"
    >
      <div className="w-32 ">
        <Image
          src={data.thumbnail}
          alt="current-thumbnail"
          className="w-full rounded-md"
          width={540}
          height={360 / 2}
        />
      </div>
      <div className="w-full self-start">
        <p className=" text-xs w-5/6">{data.name}</p>
      </div>
      <Button onClick={vote} variant={"outline"} size={"default"}>
        {data.upvote.length}
        <ChevronUp />
      </Button>
    </div>
  );
}
