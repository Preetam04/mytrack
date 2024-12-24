import { TSpace } from "@/app/(app)/u/page";
import { Clock, Share2, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRef } from "react";
import axios from "axios";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
    }
  }

  return "just now";
}

export default function RoomsCard({
  data,
  getSpaces,
}: {
  data: TSpace;
  getSpaces: () => void;
}) {
  const deleteCloseRef = useRef<HTMLButtonElement>(null);
  const deleteSpace = async () => {
    await axios.delete(`/api/space/?spaceId=${data.id}`);
    // console.log(response.data);
    // deleteCloseRef.current?.click();
    getSpaces();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow w-full max-w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex justify-between items-center capitalize">
            <span className="text-xl">{data.name}</span>
          </CardTitle>

          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Space {data.name}</DialogTitle>
                  <DialogDescription>
                    Are your sure you want to delete {data.name}?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose className="gap-4 flex items-center">
                    <Button ref={deleteCloseRef} variant={"secondary"}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant={"destructive"}
                      onClick={deleteSpace}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Created {timeAgo(data.createdAt)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-3">
              <Label>Active</Label>
              <Switch />
            </div>
            <Button size={"default"} className="">
              Join
              <SquareArrowOutUpRight />{" "}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
