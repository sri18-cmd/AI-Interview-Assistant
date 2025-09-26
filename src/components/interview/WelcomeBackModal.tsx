"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useInterviewStore } from "@/lib/store";

type WelcomeBackModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  candidateName: string;
};

export function WelcomeBackModal({ open, onOpenChange, onContinue, candidateName }: WelcomeBackModalProps) {
  const { resetInterview } = useInterviewStore();

  const handleStartNew = () => {
    resetInterview();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome back, {candidateName}!</AlertDialogTitle>
          <AlertDialogDescription>
            It looks like you have an interview in progress. Would you like to continue where you left off or start a new one?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleStartNew}>Start New</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue} className="bg-accent hover:bg-accent/90">Continue Interview</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
