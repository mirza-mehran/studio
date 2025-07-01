import { getQuestions } from '@/services/firestore';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { QuizClient } from './quiz-client';

export default async function PlayPage() {
  const questions = await getQuestions();

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
            <CardHeader>
                <CardTitle>Error</CardTitle>
                <CardDescription>Could not load quiz questions. Please ensure you have seeded the database and try again later.</CardDescription>
            </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <QuizClient questions={questions} />
    </div>
  );
}
