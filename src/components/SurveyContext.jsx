import { createContext, useContext, useState, useEffect } from 'react';
import { decryptToken } from '../utils/tokenDecrypt';

const SurveyContext = createContext();

const questions = [
  "How satisfied are you with the overall quality of our products?",
  "How likely are you to recommend our services to colleagues?",
  "How would you rate the value for money of our offerings?",
  "How satisfied are you with our customer support response time?",
  "How well do our products integrate with your existing workflows?",
  "How would you rate the reliability of our services?",
  "How satisfied are you with our product documentation?",
  "How likely are you to purchase from us again?",
  "How would you rate our company's innovation in the industry?",
  "How satisfied are you with your overall experience with Acme Inc.?"
];

export function SurveyProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState('welcome');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      try {
        const decoded = decryptToken(token);
        if (decoded) {
          setUserData(decoded);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
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
    userData
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}