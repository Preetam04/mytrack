import {
  Clock,
  Share2,
  SquareArrowOutUpRight,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function RoomsCard() {
  return (
    <Card className="hover:shadow-lg transition-shadow w-full max-w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex justify-between items-center">
            <span className="text-xl">Hip-hop 101</span>
          </CardTitle>

          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>18 listeners</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Created 1 hour ago</span>
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
