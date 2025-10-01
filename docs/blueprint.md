# **App Name**: AI Interview Assistant
#intial idea , but all details are there in read me file , once check read me file for clarification
## Core Features:

- Resume Parsing: Upload a resume (PDF or DOCX), extract Name, Email, and Phone number.
- Missing Field Prompts: If any required fields (Name, Email, Phone) are missing after parsing, the chatbot will prompt the candidate to provide them before starting the interview.
- Dynamic Question Generation: The AI dynamically generates questions for a full-stack (React/Node) role. The questions are generated one at a time with escalating difficulty: Easy, Medium, and Hard.
- Timed Interviews: Questions are timed: Easy (20s), Medium (60s), Hard (120s). The system automatically submits the answer when time runs out and advances to the next question.
- AI Scoring and Summarization: After all questions are answered, the AI calculates a final score and creates a short summary of the candidate's performance as a helpful tool.
- Interviewer Dashboard: Dashboard showing a list of candidates with their final score and summary. Allows the interviewer to view detailed question/answer history and AI scores for each candidate, including search and sort functionality.
- Persistence and Restore: Saves all timers, answers, and progress locally using state management with persistence (e.g., redux-persist). Restores the state on reopening and shows a 'Welcome Back' modal for unfinished sessions.

## Style Guidelines:

- Primary color: Vivid blue (#4285F4), suggesting trust and professionalism, for the progress bars, highlights, and key interactive elements. It's energetic but still corporate.
- Background color: Very light blue (#F0F4FF), provides a clean, unobtrusive backdrop for content, ensuring readability and focus on the assessment process.
- Accent color: Orange (#FFA000), emphasizing calls to action.
- Body and headline font: 'Inter', a grotesque sans-serif known for its clean lines and legibility, ensuring comfortable reading across devices.
- Use a consistent style of line icons throughout the application. Icons should be simple, modern, and related to assessment or profile details.
- Employ a clean, tabbed layout for Interviewee and Interviewer views. Utilize clear containers and spacing to prioritize content and enhance the user experience.
- Use subtle animations for transitions and feedback (e.g., timer countdowns, score updates). Keep animations brief and purposeful, adding polish without distracting from the core task.
