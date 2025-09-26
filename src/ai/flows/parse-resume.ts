'use server';

/**
 * @fileOverview AI agent that parses a resume and extracts candidate information.
 *
 * - parseResume - A function that parses resume content.
 * - ParseResumeInput - The input type for the parseResume function.
 * - ParseResumeOutput - The return type for the parseResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The text content of a candidate\'s resume.'),
});
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

const ParseResumeOutputSchema = z.object({
  name: z.string().describe("The candidate's full name."),
  email: z.string().describe("The candidate's email address."),
  phone: z.string().describe("The candidate's phone number."),
});
export type ParseResumeOutput = z.infer<typeof ParseResumeOutputSchema>;

export async function parseResume(
  input: ParseResumeInput
): Promise<ParseResumeOutput> {
  return parseResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseResumePrompt',
  input: {schema: ParseResumeInputSchema},
  output: {schema: ParseResumeOutputSchema},
  prompt: `You are an AI assistant designed to parse resumes.

  Extract the candidate's full name, email address, and phone number from the following resume content:

  {{{resumeContent}}}

  Provide the extracted information in the specified format.`,
});

const parseResumeFlow = ai.defineFlow(
  {
    name: 'parseResumeFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParseResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
