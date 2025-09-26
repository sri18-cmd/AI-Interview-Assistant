"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviewStore } from '@/lib/store';
import { CandidateForm } from '@/components/interview/CandidateForm';
import { WelcomeBackModal } from '@/components/interview/WelcomeBackModal';
import type { Candidate, InterviewStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();
  const { status, startInterview, candidate } = useInterviewStore();
  const [isClient, setIsClient] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && status === 'ongoing' && candidate) {
      setShowWelcomeBack(true);
    }
  }, [isClient, status, candidate]);

  const handleStart = (candidateData: Candidate) => {
    startInterview(candidateData);
    router.push('/interview');
  };
  
  const handleContinue = () => {
    router.push('/interview');
  }

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">AI Interview Assistant</CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete your details to begin the automated interview process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CandidateForm onStart={handleStart} />
        </CardContent>
      </Card>
      {candidate && <WelcomeBackModal open={showWelcomeBack} onOpenChange={setShowWelcomeBack} onContinue={handleContinue} candidateName={candidate.name} />}
    </div>
  );
}
