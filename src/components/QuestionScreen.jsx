import { useSurvey } from './SurveyContext';
import { useState } from 'react';

export function QuestionScreen() {
  const { 
    questions, 
    currentQuestion, 
    setCurrentQuestion, 
    answers, 
    setAnswers, 
    setStage,
    totalQuestions, 
    userData
  } = useSurvey();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = async () => {
    if (currentQuestion === totalQuestions - 1) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('https://surveyproject-jmbn.onrender.com/api/survey', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: userData,
            answers
          })
        });
        if (!response.ok) throw new Error('Failed to submit survey');
        setStage('thank-you');
      } catch (err) {
        setSubmitError('There was a problem submitting your survey. Please try again.');
      } finally {
        setSubmitting(false);
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      setStage('welcome');
    } else {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="page-container">
      <div className="content-card fade-in">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center text-sm text-[#666] mb-2">
            <div className="font-medium">Question {currentQuestion + 1} of 10</div>
          </div>
          <div className="w-full bg-[#F0EBE6] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#8B7355] h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="question-text mb-12">
          {questions[currentQuestion]}
        </h2>

        {/* Render scale for all but last question, textarea for last */}
        {currentQuestion !== totalQuestions - 1 ? (
          <div className="w-full max-w-6xl mx-auto px-4 mb-12">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center 
                             text-4xl font-semibold transition-all duration-300 ease-in-out
                             transform hover:scale-110 hover:shadow-lg aspect-square
                             ${answers[currentQuestion] === value 
                               ? 'bg-[#8B7355] text-white shadow-xl scale-105' 
                               : 'bg-[#F5F5F5] hover:bg-[#E8E8E8] text-[#444] hover:text-[#222]'}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto mb-12">
            <textarea
              className="w-full min-h-[120px] p-4 border border-[#E0E0E0] rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] transition"
              placeholder="Type your comments here..."
              value={answers[currentQuestion] || ''}
              onChange={e => handleAnswer(e.target.value)}
              maxLength={1000}
            />
            <div className="text-right text-xs text-gray-400 mt-1">{(answers[currentQuestion] || '').length}/1000</div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button
            onClick={handleBack}
            className="bg-[#F5F5F5] text-[#444] px-6 py-2.5 rounded-lg font-medium
                     hover:bg-[#E8E8E8] transition-all duration-200"
            disabled={submitting}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={submitting || (currentQuestion !== totalQuestions - 1
              ? answers[currentQuestion] === undefined
              : !answers[currentQuestion] || answers[currentQuestion].trim() === '')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200
              ${(currentQuestion !== totalQuestions - 1
                ? answers[currentQuestion] === undefined
                : !answers[currentQuestion] || answers[currentQuestion].trim() === '' || submitting)
                ? 'bg-[#E0E0E0] text-[#999] cursor-not-allowed'
                : 'bg-[#8B7355] text-white hover:bg-[#76624A]'}`}
          >
            {submitting ? 'Submitting...' : (currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next')}
          </button>
        </div>
        {submitError && (
          <div className="text-red-500 text-center mt-4">{submitError}</div>
        )}
      </div>
    </div>
  );
}