import { leaderboardData } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";
import Link from "next/link";

export function LeaderboardPreview() {
  const topPlayers = leaderboardData.slice(0, 3);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Crown className="h-6 w-6 text-accent" />
          <span>Top Players</span>
        </CardTitle>
        <CardDescription>See who is leading the charge this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPlayers.map((player) => (
            <div key={player.rank} className="flex items-center gap-4">
              <span className="text-lg font-bold text-muted-foreground">#{player.rank}</span>
              <Avatar className="h-10 w-10">
                <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="student avatar" />
                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.score.toLocaleString()} PTS</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href="/leaderboard">View Full Leaderboard</Link>
        </Button>
      </div>
    </Card>
  );
}
