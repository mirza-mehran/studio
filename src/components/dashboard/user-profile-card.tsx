
import { getLevelInfo } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/services/firestore";

export async function UserProfileCard() {
  // Hardcoded user ID for demonstration. In a real app, you'd get this from auth.
  const userId = "user3"; 
  const user = await getUserProfile(userId);

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Not Found</CardTitle>
          <CardDescription>Could not load user profile. Please check the connection and user ID.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const userPoints = user.points;
  const levelInfo = getLevelInfo(userPoints);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
          <CardDescription>
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">{levelInfo.name}</Badge>
          </CardDescription>
        </div>
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="student avatar" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress to Level {levelInfo.id + 1}</span>
            <span className="font-medium text-foreground">{userPoints} / {levelInfo.minPoints + (levelInfo.pointsToNext > 0 ? levelInfo.pointsToNext : 0)} PTS</span>
          </div>
          <Progress value={levelInfo.progress} className="h-3" />
          <p className="text-xs text-muted-foreground pt-1">
            {levelInfo.pointsToNext > 0 ? `${levelInfo.pointsToNext} points to the next level!` : "You are at the highest level!"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
