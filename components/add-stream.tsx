"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { youtubePattern } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import authOptions from "@/lib/auth-options";
import { useParams } from "next/navigation";

function AddStream() {
  const [link, setLink] = useState<string>("");
  const params = useParams();

  const toast = useToast();
  const session = useSession();

  const onButtonClick = async () => {
    if (!link) {
      return;
    }

    if (!youtubePattern.test(link)) {
      toast.toast({
        title: "Please give a valid youtube link",
      });
    }

    if (!session.data?.user) {
      toast.toast({
        title: "You must be logged in to add a stream",
        variant: "destructive",
      });
    }

    try {
      const resp = await axios.post("/api/stream/add", {
        link: link,
        addedBy: session.data?.user.id,
        spaceId: params.spaceId,
      });

      console.log(resp.data);
      setLink("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
        placeholder="Enter the youtube link for the song"
      />
      <Button onClick={onButtonClick}>Add</Button>
    </div>
  );
}

export default AddStream;
