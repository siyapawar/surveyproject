import { useSurvey } from './SurveyContext';

export function WelcomeScreen() {
  const { setStage, userData } = useSurvey();

  return (
    <div className="page-container">
      <div className="content-card fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D2D2D]">
          Welcome to Acme Survey
        </h1>
        
        {userData && userData.userId && (
          <p className="text-lg text-[#666] mb-8">
            ID: {userData.userId}
          </p>
        )}
        
        <div className="my-8">
          <p className="text-xl text-[#444] mb-4">
            We value your feedback! Please take a moment to complete this brief survey 
            about our products and services.
          </p>
          <p className="text-sm text-[#666]">
            This survey should take approximately 5 minutes to complete.
          </p>
        </div>

        <button
          onClick={() => setStage('survey')}
          className="bg-[#8B7355] text-white px-8 py-3 rounded-lg text-lg font-medium
                   hover:bg-[#76624A] transition-all duration-200 hover:-translate-y-0.5
                   shadow-md hover:shadow-lg"
        >
          Start Survey
        </button>
      </div>
    </div>
  );
}