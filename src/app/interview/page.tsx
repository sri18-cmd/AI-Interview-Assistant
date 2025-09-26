"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviewStore } from '@/lib/store';
import { generateInterviewQuestions } from '@/lib/actions';
import InterviewQuestionCard from '@/components/interview/InterviewQuestionCard';
import InterviewSummaryCard from '@/components/interview/InterviewSummaryCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Question, QuestionAnswer } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const INTERVIEW_QUESTIONS_CONFIG = [
  { difficulty: 'Easy', count: 1, time: 20 },
  { difficulty: 'Medium', count: 1, time: 60 },
  { difficulty: 'Hard', count: 1, time: 120 },
] as const;

export default function InterviewPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { status, candidate, questions, currentQuestionIndex, setQuestions, setStatus, addAnswer, setCurrentQuestionIndex } = useInterviewStore();
  const [isLoading, setIsLoading] = useState(true);

  // Protect route and initialize questions
  useEffect(() => {
    if (!candidate || status === 'idle') {
      router.replace('/');
      return;
    }

    const fetchQuestions = async () => {
      try {
        const generatedQuestions: Question[] = [];
        for (const config of INTERVIEW_QUESTIONS_CONFIG) {
          for (let i = 0; i < config.count; i++) {
            const result = await generateInterviewQuestions({ difficulty: config.difficulty });
            generatedQuestions.push({ question: result.question, difficulty: config.difficulty });
          }
        }
        const questionsWithAnswers: QuestionAnswer[] = generatedQuestions.map(q => ({...q, answer: ''}));
        setQuestions(questionsWithAnswers);
      } catch (error) {
        console.error("Failed to generate questions:", error);
        toast({
          title: "Error",
          description: "Could not generate interview questions. Please try again.",
          variant: "destructive",
        });
        router.replace('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (questions.length === 0) {
      fetchQuestions();
    } else {
      setIsLoading(false);
    }
  }, [candidate, status, router, questions.length, setQuestions, toast]);


  const handleNextQuestion = (answer: string) => {
    addAnswer(answer);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStatus('scoring');
    }
  };

  if (isLoading || questions.length === 0) {
    return (
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-4">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const questionTime = INTERVIEW_QUESTIONS_CONFIG.find(c => c.difficulty === currentQuestion.difficulty)?.time || 60;


  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        {status === 'ongoing' && currentQuestion && (
            <InterviewQuestionCard 
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                timeLimit={questionTime}
                onTimeUp={handleNextQuestion}
            />
        )}
        {(status === 'scoring' || status === 'completed') && (
            <InterviewSummaryCard />
        )}
    </div>
  );
}
