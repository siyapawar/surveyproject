import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { decryptToken } from "./utils/tokenDecrypt";
import { SurveyProvider, useSurvey } from "./components/SurveyContext";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { ThankYouScreen } from "./components/ThankYouScreen";
import "./App.css";

function SurveyContent() {
  const { stage } = useSurvey();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStage, setDisplayStage] = useState(stage);

  useEffect(() => {
    if (stage !== displayStage) {
      setIsTransitioning(true);
      // Start fade out
      setTimeout(() => {
        setDisplayStage(stage);
        // Start fade in
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    }
  }, [stage, displayStage]);

  const contentClass = `transition-opacity duration-300 ease-in-out ${
    isTransitioning ? "opacity-0" : "opacity-100"
  }`;

  const renderContent = () => {
    switch (displayStage) {
      case "welcome":
        return <WelcomeScreen />;
      case "survey":
        return <QuestionScreen />;
      case "thank-you":
        return <ThankYouScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return <div className={contentClass}>{renderContent()}</div>;
}

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const { token } = queryString.parse(location.search);

    if (!token) {
      console.error("No token provided");
      return;
    }

    try {
      const decryptedData = decryptToken(token);

      if (!decryptedData) {
        console.error(t("invalidToken"));
        return;
      }

      const { language } = decryptedData;

      if (language && ["en", "hi", "mr"].includes(language)) {
        i18n.changeLanguage(language);
      }
    } catch (err) {
      console.error(t("error"));
      console.error("Error processing token:", err);
    }
  }, [location.search, t, i18n]);

  return (
    <SurveyProvider>
      <SurveyContent />
    </SurveyProvider>
  );
}

export default App;
