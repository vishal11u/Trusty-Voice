export const config = {
  gemini: {
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
} as const;

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_GEMINI_API_KEY: config.gemini.apiKey,
  EMAIL_USER: config.email.user,
  EMAIL_PASSWORD: config.email.password,
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}); 