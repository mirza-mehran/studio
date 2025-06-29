import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Palette, ShoppingBag, User } from "lucide-react";
import Image from 'next/image';

const inGameRewards = [
    { title: "New Avatars", description: "Unlock cool new avatars to customize your profile.", icon: User, image: "https://placehold.co/600x400.png", hint: "character avatar" },
    { title: "Profile Colors", description: "Get vibrant color themes for your profile page.", icon: Palette, image: "https://placehold.co/600x400.png", hint: "color palette" },
    { title: "Assist Tools", description: "Purchase tools like '50/50' or 'Retry' to help in challenges.", icon: ShoppingBag, image: "https://placehold.co/600x400.png", hint: "game powerup" },
];

const realWorldRewards = [
    { title: "Free Courses", description: "Top performers get free access to premium courses on our platform.", icon: BookOpen, image: "https://placehold.co/600x400.png", hint: "online course" },
];

export default function RewardsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            Rewards Store
          </h1>
          <p className="text-muted-foreground">
            Use your hard-earned points to unlock amazing rewards and show off your achievements.
          </p>
      </div>

      <section>
        <h2 className="font-headline text-2xl font-semibold tracking-tight mb-4">In-Game Rewards</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inGameRewards.map(reward => (
                <Card key={reward.title} className="overflow-hidden flex flex-col">
                    <CardHeader className="p-0">
                        <Image src={reward.image} alt={reward.title} width={600} height={400} data-ai-hint={reward.hint} />
                    </CardHeader>
                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex-1">
                            <reward.icon className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline text-xl">{reward.title}</CardTitle>
                            <CardDescription className="mt-1">{reward.description}</CardDescription>
                        </div>
                        <div className="mt-4">
                            <Button className="w-full">Unlock</Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-2xl font-semibold tracking-tight mb-4">Real-World Rewards</h2>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {realWorldRewards.map(reward => (
                <Card key={reward.title} className="overflow-hidden flex flex-col">
                    <CardHeader className="p-0">
                        <Image src={reward.image} alt={reward.title} width={600} height={400} data-ai-hint={reward.hint} />
                    </CardHeader>
                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex-1">
                            <reward.icon className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline text-xl">{reward.title}</CardTitle>
                             <Badge className="my-2 bg-accent text-accent-foreground">Top Performance</Badge>
                            <CardDescription className="mt-1">{reward.description}</CardDescription>
                        </div>
                        <div className="mt-4">
                            <Button className="w-full" disabled>Achieve More to Unlock</Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
