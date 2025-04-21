import { useSurvey } from "./SurveyContext";

export function ThankYouScreen() {
  const { setStage, setCurrentQuestion, setAnswers } = useSurvey();

  const handleReturnHome = () => {
    setStage("welcome");
    setCurrentQuestion(0);
    setAnswers({});
  };

  return (
    // Use CSS classes from App.css
    <div className="page-container">
      <div className="content-card fade-in">
        {/* Apply h1 styling */}
        <h1 className="h1">Thank You!</h1>

        {/* Apply divider style */}
        <div className="divider" />

        {/* Apply text-xl styling */}
        <p className="text-xl" style={{ marginBottom: "3rem" }}>
          {" "}
          {/* ~mb-12 */}
          We appreciate your valuable feedback. Your responses will help us
          improve our products and services.
        </p>

        <button
          onClick={handleReturnHome}
          // Apply button and button-primary styles
          className="button button-primary"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
