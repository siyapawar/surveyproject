/** @format */

import React from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ThankYouScreen } from "./ThankYouScreen";
import { SurveyProvider, useSurvey } from "./SurveyContext";

function SurveyFormContent() {
	const { stage, setStage } = useSurvey();

	// Handle start button click on welcome screen
	const handleStart = () => {
		setStage("questions");
	};

	// Render different components based on the current stage
	return (
		<div className="survey-container">
			{stage === "loading" && <div className="loading">Loading...</div>}
			{stage === "welcome" && <WelcomeScreen onStart={handleStart} />}
			{stage === "questions" && <QuestionScreen />}
			{stage === "thank-you" && <ThankYouScreen />}
		</div>
	);
}

// Export the SurveyForm with the SurveyProvider wrapper
export function SurveyForm() {
	return (
		<SurveyProvider>
			<SurveyFormContent />
		</SurveyProvider>
	);
}
