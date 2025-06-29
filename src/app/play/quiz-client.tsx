'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Star, Target, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    question: "What is the capital city of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: 2,
    level: "Brave Student",
    points: 10,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    level: "Brave Student",
    points: 10,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    level: "Adventurous Hero",
    points: 15,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    level: "Adventurous Hero",
    points: 15,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    correctAnswer: 0,
    level: "Rising Knight",
    points: 20,
  },
];

export function QuizClient() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  
  const isQuizFinished = currentQuestionIndex >= questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + currentQuestion.points);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  }

  if (isQuizFinished) {
    const correctAnswers = questions.filter(q => score >= q.points).length; // simple approximation
    return (
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
          <CardDescription>You've finished the challenge. Well done!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-5xl font-bold text-primary">{score}</p>
            <p className="text-muted-foreground">Total Points</p>
          </div>
          <p className="text-lg">You got <span className='font-bold text-primary'>{Math.floor(score/10)}/{questions.length}</span> correct.</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={handleRestart}>Play Again</Button>
        </CardFooter>
      </Card>
    )
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
           <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>01:15</span>
           </div>
        </div>
        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full h-2" />
        <CardTitle className="font-headline text-2xl pt-4">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Level: {currentQuestion.level}</span>
              </div>
               <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent" />
                  <span>+{currentQuestion.points} Points</span>
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {currentQuestion.options.map((option, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="lg" 
                  className={cn("h-auto justify-start p-4 text-left relative transition-all duration-300", 
                    {
                      "ring-2 ring-primary dark:ring-offset-background": selectedAnswer === index && !isAnswered,
                      "bg-primary/10 border-primary text-primary hover:bg-primary/20": isAnswered && index === currentQuestion.correctAnswer,
                      "bg-destructive/10 border-destructive text-destructive hover:bg-destructive/20": isAnswered && selectedAnswer === index && !isCorrect
                    }
                  )}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                >
                    <span className="font-bold mr-4">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                    {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle2 className="h-5 w-5 absolute right-4 text-primary" />}
                    {isAnswered && selectedAnswer === index && !isCorrect && <XCircle className="h-5 w-5 absolute right-4 text-destructive" />}
                </Button>
              ))}
          </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isAnswered ? (
          <Button onClick={handleNext}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="ml-2" />
          </Button>
        ) : (
          <>
            <Button variant="ghost" onClick={handleNext} disabled={isAnswered}>Skip</Button>
            <Button onClick={handleSubmit} disabled={selectedAnswer === null}>Submit Answer</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
