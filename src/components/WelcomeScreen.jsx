import { useSurvey } from "./SurveyContext";

export function WelcomeScreen() {
  const { setStage, userData } = useSurvey();

  return (
    <div className="page-container">
      {/* Use theme colors and fonts */}
      <div className="content-card fade-in">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brown-900">
          Welcome to Acme Survey
        </h1>

        {userData && userData.userId && (
          <p className="text-lg text-brown-700 mb-8">ID: {userData.userId}</p>
        )}

        <div className="my-8">
          <p className="text-xl text-brown-800 mb-4">
            We value your feedback! Please take a moment to complete this brief
            survey about our products and services.
          </p>
          <p className="text-sm text-brown-600">
            This survey should take approximately 5 minutes to complete.
          </p>
        </div>

        <button
          onClick={() => setStage("survey")}
          // Apply button, button-primary, and button-start styles
          className="button button-primary button-start"
        >
          Start Survey
        </button>
      </div>
    </div>
  );
}
