import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Swords } from "lucide-react";
import Link from "next/link";

const modes = [
  {
    icon: User,
    title: "Single Player",
    description: "Play alone and test your knowledge.",
    href: "/play",
  },
  {
    icon: Swords,
    title: "Player vs Player",
    description: "Challenge a friend in a real-time battle.",
    href: "/play",
    disabled: true
  },
  {
    icon: Users,
    title: "Team Challenges",
    description: "Collaborate with your team to win.",
    href: "/play",
    disabled: true
  },
];

export function GameModes() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {modes.map((mode) => (
        <Card key={mode.title} className="flex flex-col">
          <CardHeader className="flex-1">
            <mode.icon className="h-8 w-8 mb-2 text-primary" />
            <CardTitle className="font-headline text-xl">{mode.title}</CardTitle>
            <CardDescription>{mode.description}</CardDescription>
          </CardHeader>
          <div className="p-4 pt-0">
             <Button asChild={!mode.disabled} disabled={mode.disabled} className="w-full">
                {mode.disabled ? <span>Coming Soon</span> : <Link href={mode.href}>Start Playing</Link>}
             </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
