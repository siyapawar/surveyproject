import { useSurvey } from "./SurveyContext";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

// Define the localStorage key constant, matching SurveyContext
const LOCAL_STORAGE_KEY = "surveySubmissionId";

export function QuestionScreen() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    setStage,
    totalQuestions,
    // Remove userData
    submissionId, // Get submissionId from context
  } = useSurvey();
  // ... existing state (submitting, submitError) ...
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ... existing handleAnswer ...
  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = async () => {
    if (currentQuestion === totalQuestions - 1) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        // ... existing answersArray mapping ...
        const answersArray = questions.map((q, idx) => ({
          question: q,
          answer: answers[idx],
        }));

        const submissionData = {
          // Use submissionId instead of user_id/survey_id/language
          submission_id: submissionId, // Rename field to submission_id
          answers: answersArray,
          // Add language if you have another way to determine it, otherwise remove
          // language: 'en',
        };

        // Submit to Supabase
        const { error } = await supabase
          .from("survey_responses")
          // Use upsert to replace if submission_id already exists
          .upsert([submissionData], { onConflict: "submission_id" });

        if (error) throw error;

        // Save submission ID to localStorage on successful submission
        localStorage.setItem(LOCAL_STORAGE_KEY, submissionId);

        setStage("thank-you");
      } catch (err) {
        // ... existing error handling ...
        console.error("Submission error:", err);
        setSubmitError(
          `There was a problem submitting your survey: ${err.message}. Please try again.`
        );
      } finally {
        setSubmitting(false);
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // ... existing handleBack ...
  const handleBack = () => {
    if (currentQuestion === 0) {
      setStage("welcome"); // Go back to welcome if on first question
    } else {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // ... existing isNextDisabled ...
  const isNextDisabled =
    submitting ||
    answers[currentQuestion] === undefined ||
    (currentQuestion === totalQuestions - 1 &&
      (!answers[currentQuestion] ||
        String(answers[currentQuestion]).trim() === ""));

  // ... existing return JSX ...
  return (
    <div className="page-container">
      <div className="content-card fade-in">
        {/* ... progress indicator ... */}
        <div className="progress-container">
          <div className="progress-info">
            <div>
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fg"
              style={{
                width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* ... question ... */}
        <h2 className="h2">{questions[currentQuestion]}</h2>

        {/* ... scale or textarea ... */}
        {currentQuestion !== totalQuestions - 1 ? (
          <div style={{ marginBottom: "3rem" }}>
            {" "}
            {/* ~mb-12 */}
            <div className="scale-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  // Apply scale-button styles, add 'selected' class conditionally
                  className={`scale-button ${
                    answers[currentQuestion] === value ? "selected" : ""
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="scale-labels">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
          </div>
        ) : (
          <div className="textarea-container">
            <textarea
              className="textarea"
              placeholder="Share your thoughts..."
              value={answers[currentQuestion] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              maxLength={1000}
            />
            <div className="char-counter">
              {(answers[currentQuestion] || "").length}/1000
            </div>
          </div>
        )}

        {/* ... navigation buttons ... */}
        <div className="nav-buttons">
          <button
            onClick={handleBack}
            // Apply button and button-secondary styles
            className="button button-secondary"
            disabled={submitting}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            // Apply button and button-primary styles
            className="button button-primary"
          >
            {submitting
              ? "Submitting..."
              : currentQuestion === totalQuestions - 1
              ? "Finish Survey"
              : "Next"}
          </button>
        </div>
        {/* ... submit error ... */}
        {submitError && (
          // Apply submit-error style
          <div className="submit-error">{submitError}</div>
        )}
      </div>
    </div>
  );
}
