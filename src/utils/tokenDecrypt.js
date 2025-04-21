import CryptoJS from "crypto-js";

const SECRET_KEY = "ACME_SURVEY_SECRET"; // In production, this should be in environment variables

// Mock token decryption for development
export const decryptToken = (token) => {
  try {
    // For development testing, decode base64 token
    const decoded = JSON.parse(atob(token));
    return {
      userId: decoded.userId,
      language: decoded.language,
      surveyId: decoded.surveyId,
    };
  } catch (error) {
    console.error("Token decryption failed:", error);
    return null;
  }
};
