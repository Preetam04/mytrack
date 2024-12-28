"use client";
import React, { useContext } from "react";
import AddStream from "./add-stream";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import QueueItem from "./queue-item";
import { Space } from "@/app/(app)/space/[spaceId]/page";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { StreamContext } from "@/context/stream-context";

function Queue() {
  // console.log(data);
  const { space, currentStream } = useContext(StreamContext);

  return (
    <div className="w-full max-w-[500px] h-full ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Queue</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <AddStream />
          <ScrollArea className="h-[32rem]  rounded-md ">
            <div className="space-y-2 pr-2">
              {space?.streams
                .filter((ele) => ele.id !== currentStream?.id)
                .sort((a, b) => b.upvote.length - a.upvote.length)
                .map((ele) => (
                  <QueueItem data={ele} key={ele.id} />
                ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default Queue;
