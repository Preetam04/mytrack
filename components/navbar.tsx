import { Disc3, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DarkModeBtn from "./dark-mode-btn";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="px-6 py-4 border-b flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Disc3 className="text-primary" size={32} />
        <h1 className="text-2xl font-bold">MyTrack</h1>
      </div>
      <div className="space-x-4 flex items-center">
        {/* <Button variant="ghost">Login</Button> */}

        {session?.user.id ? (
          <Link href={"/u"}>
            <Button size={"icon"} variant={"outline"}>
              <User />
            </Button>
          </Link>
        ) : (
          <Link href={"/auth"}>
            <Button>Get Started</Button>
          </Link>
        )}
        <DarkModeBtn />
      </div>
    </nav>
  );
}
