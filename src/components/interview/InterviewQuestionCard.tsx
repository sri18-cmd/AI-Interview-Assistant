"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { Question } from '@/lib/types';
import { Send, Timer } from 'lucide-react';
import { Badge } from '../ui/badge';

type InterviewQuestionCardProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  timeLimit: number; // in seconds
  onTimeUp: (answer: string) => void;
};

export default function InterviewQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  timeLimit,
  onTimeUp,
}: InterviewQuestionCardProps) {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const answerRef = useRef(answer);
  answerRef.current = answer;

  useEffect(() => {
    setTimeLeft(timeLimit);
    setAnswer('');
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp(answerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question, timeLimit, onTimeUp]);

  const handleSubmit = () => {
    onTimeUp(answer);
  };

  const progress = (timeLeft / timeLimit) * 100;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  return (
    <Card className="w-full max-w-3xl shadow-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-2xl font-headline">Question {questionNumber}/{totalQuestions}</CardTitle>
                <CardDescription className="mt-1">Read the question carefully and provide your answer below.</CardDescription>
            </div>
            <Badge className={`text-white ${getDifficultyColor(question.difficulty)}`}>{question.difficulty}</Badge>
        </div>
        <div className="flex items-center gap-2 pt-4">
            <Timer className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">{timeLeft}s remaining</span>
        </div>
        <Progress value={progress} className="w-full h-2 [&>div]:bg-primary mt-1" />
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium mb-4 leading-relaxed">{question.question}</p>
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[200px] text-base"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full sm:w-auto ml-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            <Send className="mr-2 h-4 w-4"/>
            Submit & Next Question
        </Button>
      </CardFooter>
    </Card>
  );
}
