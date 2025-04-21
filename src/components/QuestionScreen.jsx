import { useSurvey } from "./SurveyContext";
import { useState } from "react";

export function QuestionScreen() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    setStage,
    totalQuestions,
    userData,
  } = useSurvey();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = async () => {
    if (currentQuestion === totalQuestions - 1) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const answersArray = questions.map((q, idx) => ({
          question: q,
          answer: answers[idx],
        }));

        const submissionData = {
          userId: userData?.userId,
          surveyId: userData?.surveyId,
          answers: answersArray,
        };

        const response = await fetch(
          "https://surveyproject-jmbn.onrender.com/submit-survey",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissionData),
          }
        );
        if (!response.ok) throw new Error("Failed to submit survey");
        setStage("thank-you");
      } catch (err) {
        console.error("Submission error:", err);
        setSubmitError(
          "There was a problem submitting your survey. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      setStage("welcome");
    } else {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const isNextDisabled =
    submitting ||
    answers[currentQuestion] === undefined ||
    (currentQuestion === totalQuestions - 1 &&
      (!answers[currentQuestion] ||
        String(answers[currentQuestion]).trim() === ""));

  return (
    // Use CSS classes from App.css
    <div className="page-container">
      <div className="content-card fade-in">
        {/* Progress indicator */}
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

        {/* Question */}
        <h2 className="h2">{questions[currentQuestion]}</h2>

        {/* Render scale or textarea */}
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

        {/* Navigation Buttons */}
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
        {submitError && (
          // Apply submit-error style
          <div className="submit-error">{submitError}</div>
        )}
      </div>
    </div>
  );
}
