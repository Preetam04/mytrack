"use client";

import { Disc3 } from "lucide-react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="px-6 py-4 border-b flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Disc3 className="text-primary" size={32} />
        <h1 className="text-2xl font-bold">MyTrack</h1>
      </div>
      <div className="space-x-4">
        {/* <Button variant="ghost">Login</Button> */}
        <Button
          onClick={() => {
            signIn("google");
          }}
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
}
