"use client";

import { useState, useEffect, useMemo } from 'react';
import type { InterviewSession } from '@/lib/types';
import { getCompletedInterviews } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { CandidateTable } from './CandidateTable';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortKey = 'date' | 'score' | 'name';
type SortDirection = 'asc' | 'desc';

export default function DashboardClient() {
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSessions(getCompletedInterviews());
  }, []);

  const sortedAndFilteredSessions = useMemo(() => {
    let filtered = sessions.filter(session =>
      session.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'name') {
        comparison = a.candidate.name.localeCompare(b.candidate.name);
      } else if (sortKey === 'score') {
        comparison = a.score - b.score;
      } else { // date
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [sessions, searchTerm, sortKey, sortDirection]);

  const handleSortChange = (value: string) => {
      const [key, dir] = value.split('-') as [SortKey, SortDirection];
      setSortKey(key);
      setSortDirection(dir);
  }

  if (!isClient) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select onValueChange={handleSortChange} defaultValue={`${sortKey}-${sortDirection}`}>
            <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="score-desc">Score: High to Low</SelectItem>
                <SelectItem value="score-asc">Score: Low to High</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <CandidateTable sessions={sortedAndFilteredSessions} />
    </div>
  );
}
