import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Share2, Headphones, Disc3 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Disc3 className="text-primary" size={32} />
          <h1 className="text-2xl font-bold">MyTrack</h1>
        </div>
        <div className="space-x-4">
          <Button variant="ghost">Login</Button>
          <Button>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12 py-16">
        <div>
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            Transform Your Music Experience
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create personalized music rooms, invite your friends, and enjoy
            seamless sharing for unforgettable moments.
          </p>
          <div className="flex space-x-4">
            <Button size="lg">Create a Room</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <Card className="w-[300px] h-[300px] flex items-center justify-center">
            <CardContent className="flex items-center justify-center">
              <Headphones size={200} className="text-primary" strokeWidth={1} />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">
            Discover Seamless Music Sharing
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Users size={48} className="text-primary mb-4" />
                <CardTitle>Invite Friends</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Easily invite friends to your music room and create shared
                  listening experiences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Share2 size={48} className="text-primary mb-4" />
                <CardTitle>Seamless Sharing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Share and discover music with real-time synchronization and
                  collaborative playlists.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Music size={48} className="text-primary mb-4" />
                <CardTitle>Personalized Rooms</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Create custom music rooms tailored to your mood, genre, or
                  occasion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-primary/10">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6">
            Start Your Musical Journey Today
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join MusicRoom and transform how you experience music with friends.
          </p>
          <Button size="lg">Get Started - It's Free!</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Disc3 className="text-primary" size={24} />
            <span className="font-bold">MusicRoom</span>
          </div>
          <div className="space-x-4">
            © Developed by{" "}
            <Link
              href={"https://github.com/Preetam04"}
              className="text-primary font-semibold underline "
            >
              Preetam Patil
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
