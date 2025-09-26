"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { InterviewSession } from "@/lib/types";
import { format } from "date-fns";

type CandidateDetailsDialogProps = {
  session: InterviewSession;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CandidateDetailsDialog({ session, open, onOpenChange }: CandidateDetailsDialogProps) {
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Interview Details: {session.candidate.name}</DialogTitle>
          <DialogDescription>
            Score: {session.score} | Date: {format(new Date(session.date), 'PPp')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div>
                <h3 className="font-semibold mb-2">AI Summary</h3>
                <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md border">{session.summary}</p>
            </div>

            <div>
                <h3 className="font-semibold mb-2">Questions & Answers</h3>
                <ScrollArea className="h-72 w-full rounded-md border p-4">
                    <Accordion type="single" collapsible className="w-full">
                    {session.questionAnswers.map((qa, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 text-left">
                                <Badge className={`text-white text-xs ${getDifficultyColor(qa.difficulty)}`}>{qa.difficulty}</Badge>
                                <span>{qa.question}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-sm text-muted-foreground italic pl-8">{qa.answer || "No answer provided."}</p>
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </ScrollArea>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
