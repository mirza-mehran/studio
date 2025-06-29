
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Swords } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const modes = [
  {
    icon: User,
    title: "Single Player",
    description: "Play alone and test your knowledge.",
    href: "/play",
    image: "https://placehold.co/600x400/29ABE2/FFFFFF.png",
    hint: "single player",
  },
  {
    icon: Swords,
    title: "Player vs Player",
    description: "Challenge a friend in a real-time battle.",
    href: "/play",
    disabled: true,
    image: "https://placehold.co/600x400/F4B400/FFFFFF.png",
    hint: "competition duel",
  },
  {
    icon: Users,
    title: "Team Challenges",
    description: "Collaborate with your team to win.",
    href: "/play",
    disabled: true,
    image: "https://placehold.co/600x400/F46A4E/FFFFFF.png",
    hint: "team collaboration",
  },
];

export function GameModes() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {modes.map((mode) => (
        <Card key={mode.title} className="flex flex-col overflow-hidden">
          <CardHeader className="p-0">
            <Image
              src={mode.image}
              alt={mode.title}
              width={600}
              height={400}
              data-ai-hint={mode.hint}
            />
          </CardHeader>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex-1">
              <mode.icon className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="font-headline text-xl">{mode.title}</CardTitle>
              <CardDescription>{mode.description}</CardDescription>
            </div>
            <div className="mt-4">
               <Button asChild={!mode.disabled} disabled={mode.disabled} className="w-full">
                  {mode.disabled ? <span>Coming Soon</span> : <Link href={mode.href}>Start Playing</Link>}
               </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
