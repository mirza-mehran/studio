
'use client';

import { getMotivationalMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motivationalMessages } from "@/lib/messages";
import { Lightbulb, RefreshCw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export function MotivationalTipCard() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');

  const fetchMessage = () => {
    startTransition(async () => {
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      const randomPlayerId = `user_${Math.floor(Math.random() * 10000)}`;
      const msg = await getMotivationalMessage(randomIndex, randomPlayerId);
      setMessage(msg);
    });
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Lightbulb className="h-6 w-6 text-accent" />
          <span>Motivational Tip</span>
        </CardTitle>
        <CardDescription>A little boost to keep you going!</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isPending && !message ? (
            <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
            </div>
        ) : (
            <p className="text-lg italic text-foreground">"{message}"</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={fetchMessage} disabled={isPending} variant="ghost" size="sm" className="w-full gap-2">
          <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
          <span>New Tip</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
