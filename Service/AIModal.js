import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Ensure this is correctly set
const genAI = new GoogleGenerativeAI(apiKey);

// Initialize the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Make sure the model name is correct
});

// Configuration for AI generation
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
//   for json format
};

// Start a chat session with the AI model
export const AIChatSession = model.startChat({
  generationConfig,
  history: [], 
});


export default AIChatSession; 