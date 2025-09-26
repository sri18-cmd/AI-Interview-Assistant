"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import type { InterviewSession } from '@/lib/types';
import CandidateDetailsDialog from './CandidateDetailsDialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type CandidateTableProps = {
  sessions: InterviewSession[];
};

export function CandidateTable({ sessions }: CandidateTableProps) {
    const [selectedSession, setSelectedSession] = useState<InterviewSession | null>(null);
    const avatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    }
  
  if (sessions.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <h3 className="text-lg font-medium text-muted-foreground">No candidate sessions found.</h3>
        <p className="text-sm text-muted-foreground">Completed interviews will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Candidate</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {avatar && <AvatarImage src={avatar.imageUrl} alt={session.candidate.name} />}
                      <AvatarFallback>{session.candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{session.candidate.name}</div>
                        <div className="text-sm text-muted-foreground">{session.candidate.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                    <Badge className={`text-white ${getScoreColor(session.score)}`}>{session.score}</Badge>
                </TableCell>
                <TableCell>
                    <p className="max-w-xs truncate text-muted-foreground">{session.summary}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{format(new Date(session.date), 'PPp')}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => setSelectedSession(session)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedSession && (
        <CandidateDetailsDialog
          session={selectedSession}
          open={!!selectedSession}
          onOpenChange={(isOpen) => !isOpen && setSelectedSession(null)}
        />
      )}
    </>
  );
}
