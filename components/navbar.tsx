"use client";

import { Disc3, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import DarkModeBtn from "./dark-mode-btn";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();

  const session = useSession();

  return (
    <nav className="px-6 py-4 border-b flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Disc3 className="text-primary" size={32} />
        <h1 className="text-2xl font-bold">MyTrack</h1>
      </div>
      <div className="space-x-4 flex items-center">
        {/* <Button variant="ghost">Login</Button> */}

        {session ? (
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              router.push("/u");
            }}
          >
            <User />
          </Button>
        ) : (
          <Button
            onClick={() => {
              // signIn("google");
              router.push("/auth");
            }}
          >
            Get Started
          </Button>
        )}
        <DarkModeBtn />
      </div>
    </nav>
  );
}
