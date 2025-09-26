import type { InterviewSession } from "./types";

const COMPLETED_INTERVIEWS_KEY = "completedInterviews";

export const getCompletedInterviews = (): InterviewSession[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const data = window.localStorage.getItem(COMPLETED_INTERVIEWS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to retrieve completed interviews:", error);
    return [];
  }
};

export const saveCompletedInterview = (session: InterviewSession) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const existingSessions = getCompletedInterviews();
    // Avoid duplicates
    const newSessions = existingSessions.filter(s => s.candidate.id !== session.candidate.id);
    newSessions.unshift(session); // Add new session to the beginning
    window.localStorage.setItem(COMPLETED_INTERVIEWS_KEY, JSON.stringify(newSessions));
  } catch (error) {
    console.error("Failed to save completed interview:", error);
  }
};
