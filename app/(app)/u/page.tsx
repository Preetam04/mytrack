"use client";
import RoomsCard from "@/components/rooms-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
// import {useToast} from "@/components/ui/"
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export type TSpace = {
  id: string;
  createdAt: string;
  hostId: string;
  name: string;
  isActive: boolean;
};

export default function Dashboard() {
  const session = useSession();
  const [allSpaces, setAllSpaces] = useState<TSpace[]>([]);
  const [spaceName, setSpaceName] = useState<string>("");
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();
  const getAllSpaces = useCallback(async () => {
    setAllSpaces([]);
    const response = await axios.get("/api/space");
    setAllSpaces(response.data.spaces);
  }, []);

  const createSpace = useCallback(async () => {
    if (!spaceName) {
      toast.toast({
        title: "Space name Required",
        variant: "default",
        description: "Please provide a space name",
      });
      return;
    }
    await axios.post("/api/space", {
      spaceName,
    });
    // console.log(response.data);
    setSpaceName("");
    closeBtnRef.current?.click();
    getAllSpaces();
  }, [getAllSpaces, spaceName, toast]);

  useEffect(() => {
    getAllSpaces();
  }, []);

  return (
    <div className="container">
      <div className="relative">
        <h1 className="capitalize text-2xl font-semibold text-foreground">
          Hi{" "}
          {session?.data?.user.name ||
            session?.data?.user.email.split("@")[0] ||
            ""}
        </h1>

        <p className="text-sm text-secondary-foreground/60 ">
          Create or Join a space to enjoy your experience.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute top-3 right-0">
              <Plus /> Create Space
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Space</DialogTitle>
              <DialogDescription>
                Create a new space and share the link with your friends
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="space-name" className="text-right">
                Space Name
              </Label>
              <Input
                id="space-name"
                className=""
                value={spaceName}
                onChange={(e) => {
                  setSpaceName(e.target.value);
                }}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={createSpace}>
                Create
              </Button>
              <DialogClose asChild>
                <Button type="button" ref={closeBtnRef} variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* List all the spaces */}
      <div className="mt-6">
        <div className="">
          <h3 className="text-foreground capitalize text-xl font-semibold">
            Your spaces
          </h3>
        </div>

        <div className="flex items-center flex-wrap w-full py-5 gap-4">
          {allSpaces.map((room, key: number) => (
            <RoomsCard key={key} data={room} getSpaces={getAllSpaces} />
          ))}
        </div>
      </div>
    </div>
  );
}
