import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Get the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Create a chat session
const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Send message to chat session
    const result = await chatSession.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error while processing your request. Please try again.';
  }
}

// Landing page specific chat function
export async function landingPageChat(message: string) {
  const systemPrompt = `You are a helpful assistant for TrustScribe, a platform for collecting and displaying testimonials. 
  Keep your responses concise, friendly, and focused on helping users understand how TrustScribe can help them collect and showcase customer testimonials.`;
  
  const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;
  return generateResponse(fullPrompt);
} 