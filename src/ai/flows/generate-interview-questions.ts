'use server';

/**
 * @fileOverview AI agent that generates interview questions for a full-stack role with escalating difficulty.
 *
 * - generateInterviewQuestions - A function that generates interview questions.
 * - GenerateInterviewQuestionsInput - The input type for the generateInterviewQuestions function.
 * - GenerateInterviewQuestionsOutput - The return type for the generateInterviewQuestions function.
 */


import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewQuestionsInputSchema = z.object({
  difficulty: z
    .enum(['Hard', 'Medium', 'Easy'])
    .describe('The difficulty level of the interview question.'),
});
export type GenerateInterviewQuestionsInput = z.infer<
  typeof GenerateInterviewQuestionsInputSchema
>;

const GenerateInterviewQuestionsOutputSchema = z.object({
  question: z.string().describe('The generated interview question.'),
});
export type GenerateInterviewQuestionsOutput = z.infer<
  typeof GenerateInterviewQuestionsOutputSchema
>;

export async function generateInterviewQuestions(
  input: GenerateInterviewQuestionsInput
): Promise<GenerateInterviewQuestionsOutput> {
  return generateInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewQuestionsPrompt',
  input: {schema: GenerateInterviewQuestionsInputSchema},
  output: {schema: GenerateInterviewQuestionsOutputSchema},
  prompt: `You are an AI assistant designed to generate interview questions for full-stack developer roles (React/Node).

  Generate a question of {{{difficulty}}} difficulty.
  - Easy: Should be a simple, short-answer question to check for basic knowledge.
  - Medium: Should be a moderate question that requires some explanation or a simple code example.
  - Hard: Should be a complex question that requires a detailed explanation, a code example, or a discussion of trade-offs.

  The question should evaluate the candidate's knowledge of React, Node.js, and general web development principles.
  Focus on practical knowledge and problem-solving skills.

  Question:`,
});

const generateInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionsFlow',
    inputSchema: GenerateInterviewQuestionsInputSchema,
    outputSchema: GenerateInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
