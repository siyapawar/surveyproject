import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SurveyContext = createContext();

const questions = [
  "How likely are you to recommend our company to a friend or colleague?",
  "How satisfied are you with your overall experience with our company?",
  "How easy was it to use our product/service?",
  "How well did our solution meet your needs?",
  "How responsive have we been to your questions or concerns?",
  "How would you rate the quality of our product/service?",
  "How likely are you to continue using our product/service?",
  "How well does our product/service compare to competitors?",
  "How satisfied are you with the value for money of our offering?",
  "What’s one thing we could do to improve your experience with our company?",
];

const LOCAL_STORAGE_KEY = "surveySubmissionId";

export function SurveyProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState("loading");
  const [submissionId, setSubmissionId] = useState(null);

  useEffect(() => {
    // Check localStorage for an existing submission ID
    const existingId = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (existingId) {
      setSubmissionId(existingId);
      setStage("thank-you"); // If ID exists, user has submitted before
    } else {
      // Generate a new ID for this session if none exists
      const newId = uuidv4();
      setSubmissionId(newId);
      setStage("welcome"); // Start fresh
    }
  }, []);

  // Function to reset the survey and generate a new ID
  const resetSurvey = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear old ID
    const newId = uuidv4();
    setSubmissionId(newId);
    setCurrentQuestion(0);
    setAnswers({});
    setStage("welcome");
  };

  const value = {
    questions,
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    stage,
    setStage,
    totalQuestions: questions.length,
    submissionId,
    resetSurvey,
  };

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
}
