"use server";

import { generateInterviewQuestions as genQuestions } from '@/ai/flows/generate-interview-questions';
import { scoreAndSummarizeCandidate as scoreCandidate } from '@/ai/flows/score-and-summarize-candidate';
import type { GenerateInterviewQuestionsInput } from '@/ai/flows/generate-interview-questions';
import type { ScoreAndSummarizeCandidateInput } from '@/ai/flows/score-and-summarize-candidate';

export const generateInterviewQuestions = async (input: GenerateInterviewQuestionsInput) => {
    return await genQuestions(input);
}

export const scoreAndSummarizeCandidate = async (input: ScoreAndSummarizeCandidateInput) => {
    return await scoreCandidate(input);
}
