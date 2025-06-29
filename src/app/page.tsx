import { GameModes } from "@/components/dashboard/game-modes";
import { LeaderboardPreview } from "@/components/dashboard/leaderboard-preview";
import { MotivationalTipCard } from "@/components/dashboard/motivational-tip-card";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
        Welcome back, Player!
      </h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <UserProfileCard />
          <GameModes />
        </div>
        <div className="space-y-6">
          <Suspense fallback={<div className="h-48 w-full animate-pulse rounded-lg bg-card" />}>
            <MotivationalTipCard />
          </Suspense>
          <LeaderboardPreview />
        </div>
      </div>
    </div>
  );
}
