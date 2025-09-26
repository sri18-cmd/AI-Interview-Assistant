'use server';
/**
 * @fileOverview This file defines a Genkit flow for scoring and summarizing a candidate's interview performance.
 *
 * - scoreAndSummarizeCandidate - A function that takes question-answer pairs and generates a score and summary.
 * - ScoreAndSummarizeCandidateInput - The input type for the scoreAndSummarizeCandidate function.
 * - ScoreAndSummarizeCandidateOutput - The return type for the scoreAndSummarizeCandidate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreAndSummarizeCandidateInputSchema = z.object({
  questionAnswers: z.array(
    z.object({
      question: z.string().describe('The interview question asked.'),
      answer: z.string().describe('The candidate\'s answer to the question.'),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('Difficulty level of the question'),
    })
  ).describe('An array of question-answer pairs from the interview.'),
});
export type ScoreAndSummarizeCandidateInput = z.infer<typeof ScoreAndSummarizeCandidateInputSchema>;

const ScoreAndSummarizeCandidateOutputSchema = z.object({
  finalScore: z.number().describe('The final score of the candidate (0-100).'),
  summary: z.string().describe('A summary of the candidate\'s performance, strengths, and weaknesses.'),
});
export type ScoreAndSummarizeCandidateOutput = z.infer<typeof ScoreAndSummarizeCandidateOutputSchema>;

export async function scoreAndSummarizeCandidate(input: ScoreAndSummarizeCandidateInput): Promise<ScoreAndSummarizeCandidateOutput> {
  return scoreAndSummarizeCandidateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreAndSummarizeCandidatePrompt',
  input: {schema: ScoreAndSummarizeCandidateInputSchema},
  output: {schema: ScoreAndSummarizeCandidateOutputSchema},
  prompt: `You are an AI assistant that reviews candidate answers to interview questions and provides a score and summary.

  Analyze the following question-answer pairs from a candidate interview:

  {{#each questionAnswers}}
  Question ({{this.difficulty}}): {{this.question}}
  Answer: {{this.answer}}
  {{/each}}

  Based on these answers, calculate a final score (out of 100) reflecting the candidate's overall performance. Take into account the difficulty of questions, and correctness, completeness, and clarity of the answers.

  Also, generate a concise summary of the candidate's performance. Highlight the candidate's strengths and weaknesses demonstrated during the interview.

  Ensure that the score reflects the overall competency demonstrated across all questions.
  `,
});

const scoreAndSummarizeCandidateFlow = ai.defineFlow(
  {
    name: 'scoreAndSummarizeCandidateFlow',
    inputSchema: ScoreAndSummarizeCandidateInputSchema,
    outputSchema: ScoreAndSummarizeCandidateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
