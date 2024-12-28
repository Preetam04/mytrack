"use client";

import AddStream from "@/components/add-stream";
import Player from "@/components/player";
import Queue from "@/components/queue";
import QueueItem from "@/components/queue-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StreamContext } from "@/context/stream-context";
import axios from "axios";
import { ChevronUp, Disc3 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export type TUpvote = {
  id: string;
  userId: string;
  streamId: string;
};

export type TStream = {
  id: string;
  name: string;
  videoId: string;
  thumbnail: string;
  addedBy: string;
  spaceId: string;
  createdAt: string;
  played: boolean;
  upvote: TUpvote[];
};

// Host type
export type THost = {
  id: string;
  email: string;
  name: string;
  password: string | null;
  provider: string;
};

// Main Space type
export type Space = {
  id: string;
  name: string;
  createdAt: string;
  hostId: string;
  isActive: boolean;
  streams: TStream[];
  host: THost;
};

export default function Space() {
  const { spaceId } = useParams();
  const [loading, setLoading] = useState(true);
  // const [spaceData, setSpaceData] = useState<Space | null>(null);

  const { space, setSpace, changeCurrentStream } = useContext(StreamContext);

  const getData = async () => {
    try {
      const resp = await axios.get(`/api/space/?spaceId=${spaceId}`);

      setSpace(resp.data.spaces);
    } catch (e) {
      console.log(e);
    }
  };

  const getSpaceData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`/api/space/?spaceId=${spaceId}`);

      setSpace({
        ...resp.data.spaces,
        streams: resp.data.spaces.streams?.sort(
          (a: TStream, b: TStream) => b.upvote.length - a.upvote.length
        ),
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // console.log(spaceData);

  useEffect(() => {
    getSpaceData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getData();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  if (loading)
    return (
      <div className="">
        <Disc3 className="text-primary animate-spin" size={52} />
      </div>
    );

  // const spaceData? = {
  //   id: "c28de232-52df-47a2-afa5-66c23d64ce7c",
  //   name: "Shakti Kshama",
  //   createdAt: "2024-12-25T05:55:23.666Z",
  //   hostId: "6dd2d8fb-cf07-4f0a-8e03-995ba04c9664",
  //   isActive: true,
  //   streams: [
  //     {
  //       id: "0ad8d310-a3af-4feb-b608-4a3444e11884",
  //       name: "Shakti Aur Kshama",
  //       videoId: "oLzLSQZRZj4",
  //       thumbnail: "https://i.ytimg.com/vi/oLzLSQZRZj4/maxresdefault.jpg",
  //       addedBy: "db046d4a-658b-42a4-a03f-3816023b6c45",
  //       spaceId: "c28de232-52df-47a2-afa5-66c23d64ce7c",
  //       createdAt: "2024-12-25T07:18:36.291Z",
  //       played: false,
  //     },
  //     {
  //       id: "e8ba1d0a-6421-4491-aae0-25b133548eeb",
  //       name: "Seedhe Maut - Pankh feat. Bawari Basanti (Prod. by Sez On The Beat)",
  //       videoId: "x_pgqDX9eSc",
  //       thumbnail: "https://i.ytimg.com/vi/x_pgqDX9eSc/maxresdefault.jpg",
  //       addedBy: "db046d4a-658b-42a4-a03f-3816023b6c45",
  //       spaceId: "c28de232-52df-47a2-afa5-66c23d64ce7c",
  //       createdAt: "2024-12-25T07:20:36.349Z",
  //       played: false,
  //     },
  //     {
  //       id: "165f693d-890e-49a6-9925-e2402187991e",
  //       name: "Seedhe Maut - 11K",
  //       videoId: "VEQ-XJWiQMM",
  //       thumbnail: "https://i.ytimg.com/vi/VEQ-XJWiQMM/maxresdefault.jpg",
  //       addedBy: "db046d4a-658b-42a4-a03f-3816023b6c45",
  //       spaceId: "c28de232-52df-47a2-afa5-66c23d64ce7c",
  //       createdAt: "2024-12-25T07:21:13.484Z",
  //       played: false,
  //     },
  //     {
  //       id: "b98e176c-3725-42da-b029-af3a47876b20",
  //       name: "Seedhe Maut - Khush Nahi || Shakti || dl91",
  //       videoId: "iTqPXtJ6FQs",
  //       thumbnail: "https://i.ytimg.com/vi/iTqPXtJ6FQs/maxresdefault.jpg",
  //       addedBy: "db046d4a-658b-42a4-a03f-3816023b6c45",
  //       spaceId: "c28de232-52df-47a2-afa5-66c23d64ce7c",
  //       createdAt: "2024-12-25T07:21:40.657Z",
  //       played: false,
  //     },
  //   ],
  //   host: {
  //     id: "6dd2d8fb-cf07-4f0a-8e03-995ba04c9664",
  //     email: "testtpreetam34@gmail.com",
  //     name: "Preetam",
  //     password: null,
  //     provider: "Google",
  //   },
  // };

  return (
    <div className="w-full ">
      <div className="w-full">
        <h1 className="text-3xl capitalize font-semibold">{space?.name}</h1>
        <p className="text-sm opacity-65">
          Host:{" "}
          <span>{space?.host.name || space?.host.email.split("@")[0]}</span>
        </p>
      </div>
      <div className="w-full flex items-start gap-4  mt-4">
        <Queue />
        {/* player */}
        <div className="w-full max-w-2xl aspect-video ">
          <Card className="">
            <CardHeader className="relative">
              <CardTitle className="text-2xl">Currently Playing</CardTitle>
              <Button
                className="absolute right-6 top-4"
                onClick={changeCurrentStream}
              >
                Next Song
              </Button>
            </CardHeader>
            <CardContent>
              <Player />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
      </Card> */}
    </div>
  );
}

export const dynamic = "auto";
