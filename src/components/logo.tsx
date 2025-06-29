import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <GraduationCap className="h-8 w-8 text-accent" />
      <h1 className="font-headline text-2xl font-bold text-primary-foreground">
        QuestLearn
      </h1>
    </div>
  );
}
