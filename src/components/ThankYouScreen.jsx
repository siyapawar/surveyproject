import { useSurvey } from "./SurveyContext";

export function ThankYouScreen() {
  // Get resetSurvey function from context
  const { resetSurvey } = useSurvey();

  // No need for handleReturnHome anymore, use resetSurvey directly

  return (
    <div className="page-container">
      <div className="content-card fade-in">
        <h1 className="h1">Thank You!</h1>
        <div className="divider" />
        <p className="text-xl" style={{ marginBottom: "1.5rem" }}>
          {" "}
          {/* Reduced margin */}
          We appreciate your valuable feedback. Your responses have been
          recorded.
        </p>
        <p className="text-sm text-brown-600" style={{ marginBottom: "3rem" }}>
          If you made a mistake or want to change your answers, you can submit
          the survey again.
        </p>

        {/* Button to reset the survey */}
        <button
          onClick={resetSurvey} // Call resetSurvey on click
          className="button button-secondary" // Use secondary style
        >
          Submit Again
        </button>
      </div>
    </div>
  );
}
