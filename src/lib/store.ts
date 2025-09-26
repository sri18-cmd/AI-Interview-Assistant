import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Candidate, InterviewState, InterviewStore } from './types';

const initialState: InterviewState = {
  status: 'idle',
  candidate: null,
  questions: [],
  currentQuestionIndex: 0,
};

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      startInterview: (candidate) => {
        const existingState = get();
        // If starting a new interview, reset everything but use new candidate
        set({
          ...initialState,
          status: 'ongoing',
          candidate,
        });
      },
      addAnswer: (answer) => {
        set((state) => {
          if (!state.questions[state.currentQuestionIndex]) return state;

          const updatedQuestions = [...state.questions];
          updatedQuestions[state.currentQuestionIndex] = {
            ...updatedQuestions[state.currentQuestionIndex],
            answer,
          };
          
          return { questions: updatedQuestions };
        });
      },
      setQuestions: (questions) => set({ questions }),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      setStatus: (status) => set({ status }),
      resetInterview: () => {
        set(initialState);
      },
    }),
    {
      name: 'interview-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
