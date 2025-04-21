import { generateToken } from "./src/utils/generateTestToken.js";

const testData = {
  userId: "12345",
  language: "hi",
  surveyId: "survey_001",
};

const token = generateToken(testData);
const url = `http://localhost:5173/?token=${token}`;
console.log("Test URL:", url);
