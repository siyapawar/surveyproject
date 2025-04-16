import { useSurvey } from './SurveyContext';

export function ThankYouScreen() {
  const { setStage, setCurrentQuestion, setAnswers } = useSurvey();

  const handleReturnHome = () => {
    setStage('welcome');
    setCurrentQuestion(0);
    setAnswers({});
  };

  return (
    <div className="page-container">
      <div className="content-card fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D2D2D]">
          Thank You!
        </h1>
        
        <div className="h-0.5 w-24 mx-auto bg-[#8B7355] rounded-full mb-8" />
        
        <p className="text-xl text-[#444] mb-12">
          We appreciate your valuable feedback. Your responses will help us improve 
          our products and services.
        </p>

        <button
          onClick={handleReturnHome}
          className="bg-[#8B7355] text-white px-8 py-3 rounded-lg text-lg font-medium
                   hover:bg-[#76624A] transition-all duration-200 hover:-translate-y-0.5
                   shadow-md hover:shadow-lg"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}