import { createContext, useContext, useState, useEffect } from "react";
import { decryptToken } from "../utils/tokenDecrypt";

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

export function SurveyProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState("welcome");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded = decryptToken(token);
        if (decoded) {
          setUserData(decoded);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const value = {
    questions,
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    stage,
    setStage,
    totalQuestions: questions.length,
    userData,
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
