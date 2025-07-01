
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLeaderboard } from "@/services/firestore";
import { Trophy } from "lucide-react";

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboard();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
        Leaderboard
      </h1>
      <p className="text-muted-foreground">
        See how you stack up against other learners. Keep learning to climb the ranks!
      </p>
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="term">Term</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Weekly Rankings</CardTitle>
                    <CardDescription>Top performers from this week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Rank</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                                <TableHead className="w-[120px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboardData.map((player, index) => (
                                <TableRow key={player.rank} className={index < 3 ? 'bg-accent/10' : ''}>
                                    <TableCell className="font-bold text-lg">
                                        <div className="flex items-center gap-2">
                                            {index < 3 && <Trophy className="h-5 w-5 text-accent" />}
                                            <span>{player.rank}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="student avatar" />
                                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{player.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{player.level}</TableCell>
                                    <TableCell className="text-right font-mono">{player.score.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">Challenge</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        {/* Other tabs can be added here with their own content */}
      </Tabs>
    </div>
  );
}
