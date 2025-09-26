export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type InterviewStatus = 'idle' | 'ongoing' | 'scoring' | 'completed';

export type Question = {
  question: string;
  difficulty: Difficulty;
};

export type QuestionAnswer = Question & {
  answer: string;
};

export type Candidate = {
  id: string; // email can be the id
  name: string;
  email: string;
  phone: string;
};

export type InterviewSession = {
  candidate: Candidate;
  questionAnswers: QuestionAnswer[];
  score: number;
  summary: string;
  date: string;
};

// Zustand Store Types
export interface InterviewState {
  status: InterviewStatus;
  candidate: Candidate | null;
  questions: QuestionAnswer[];
  currentQuestionIndex: number;
}

export interface InterviewActions {
  startInterview: (candidate: Candidate) => void;
  addAnswer: (answer: string) => void;
  setQuestions: (questions: QuestionAnswer[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setStatus: (status: InterviewStatus) => void;
  resetInterview: () => void;
}

export type InterviewStore = InterviewState & InterviewActions;
