import RoomsCard from "@/components/rooms-card";
import { Button } from "@/components/ui/button";
import authOptions from "@/lib/auth-options";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container">
      <div className="relative">
        <h1 className="capitalize text-2xl font-semibold text-foreground">
          Hi {session?.user.name || session?.user.email.split("@")[0]}
        </h1>

        <p className="text-sm text-secondary-foreground/60 ">
          Create or Join a space to enjoy your experience.
        </p>

        <Button className="absolute top-3 right-0">
          <Plus /> Create Space
        </Button>
      </div>
      {/* List all the spaces */}
      <div className="mt-6">
        <div className="">
          <h3 className="text-foreground capitalize text-xl font-semibold">
            Your spaces
          </h3>
        </div>

        <div className="flex items-center flex-wrap w-full py-5 gap-4">
          {[1, 2, 3].map((ele) => (
            <RoomsCard key={ele} />
          ))}
        </div>
      </div>
    </div>
  );
}
