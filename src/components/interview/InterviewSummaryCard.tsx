"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInterviewStore } from "@/lib/store";
import { saveCompletedInterview } from "@/lib/data";
import { scoreAndSummarizeCandidate } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Home } from "lucide-react";
import type { ScoreAndSummarizeCandidateOutput } from "@/ai/flows/score-and-summarize-candidate";

export default function InterviewSummaryCard() {
  const router = useRouter();
  const { status, candidate, questions, setStatus, resetInterview } = useInterviewStore();
  const [result, setResult] = useState<ScoreAndSummarizeCandidateOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'scoring' && candidate && questions.length > 0) {
      const processInterview = async () => {
        try {
          const scoreResult = await scoreAndSummarizeCandidate({
            questionAnswers: questions,
            resumeContent: candidate.resumeContent,
          });
          setResult(scoreResult);
          
          const sessionData = {
            candidate,
            questionAnswers: questions,
            score: scoreResult.finalScore,
            summary: scoreResult.summary,
            introduction: scoreResult.introduction,
            date: new Date().toISOString(),
          };
          saveCompletedInterview(sessionData);

          setStatus('completed');
        } catch (e) {
          console.error("Failed to score interview:", e);
          setError("Sorry, we couldn't analyze your results. Please try again later.");
          setStatus('completed');
        }
      };
      processInterview();
    }
  }, [status, candidate, questions, setStatus]);

  const handleGoHome = () => {
    resetInterview();
    router.push('/');
  };

  if (status === 'scoring') {
    return (
      <Card className="w-full max-w-2xl text-center shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Analyzing Your Answers</CardTitle>
          <CardDescription>Our AI is calculating your score and generating a summary...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Please wait a moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-3xl font-headline">Interview Complete!</CardTitle>
        <CardDescription>Thank you, {candidate?.name}. Here is your performance summary.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-destructive text-center">{error}</p>}
        {result && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative h-32 w-32">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                            className="stroke-current text-gray-200"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                        ></circle>
                        <circle
                            className="stroke-current text-primary"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.finalScore/100)}`}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                        ></circle>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary">{result.finalScore}</span>
                </div>
                <p className="text-lg font-medium text-muted-foreground">Overall Score</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 font-headline">AI Introduction</h3>
              <p className="text-muted-foreground bg-secondary/50 p-4 rounded-lg border italic">{result.introduction}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 font-headline">Performance Summary</h3>
              <p className="text-muted-foreground bg-secondary/50 p-4 rounded-lg border">{result.summary}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGoHome} className="w-full sm:w-auto mx-auto" variant="outline">
          <Home className="mr-2 h-4 w-4"/>
          Return to Home
        </Button>
      </CardFooter>
    </Card>
  );
}
