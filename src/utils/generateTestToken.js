// Simple mock token generator for testing
const generateToken = () => {
  const testData = {
    userId: "ACME_123",
    language: "en",
    surveyId: "SURVEY_2025_Q2"
  };
  
  // For testing purposes, we'll just base64 encode the data
  return btoa(JSON.stringify(testData));
};

const token = generateToken();
console.log(`\nTest URL: http://localhost:5173/?token=${token}\n`);

export { generateToken };