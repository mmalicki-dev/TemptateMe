export { default as swaggerConfig } from './swagger.config.js';
import { config } from 'dotenv';
config();

const REQUIRED_ENV_VARS = [
  'DB_URI',
  'JWT_SECRET_KEY',
  'REFRESH_TOKEN_SECRET_KEY',
  'IMAGE_API_KEY',
  'EMAILJS_SERVICE_ID',
  'EMAILJS_PUBLIC_KEY',
  'EMAILJS_PRIVATE_KEY',
  'EMAILJS_VERIFICATION_TEMPLATE_ID',
];

const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`[config] Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const {
  DB_URI,
  PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  IMAGE_API_KEY,
  CLIENT_URL,
  SERVER_URL,
  EMAILJS_SERVICE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY,
  EMAILJS_VERIFICATION_TEMPLATE_ID,
} = process.env;

export const port = PORT || 3001;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUri = DB_URI;
export const prefix = '/api';
export const specs = '/docs';
export const imageApiKey = IMAGE_API_KEY;
export const clientUrl = CLIENT_URL ?? 'http://localhost:3000';
export const serverUrl = SERVER_URL ?? 'http://localhost:3001';
export const emailjsServiceId = EMAILJS_SERVICE_ID;
export const emailjsPublicKey = EMAILJS_PUBLIC_KEY;
export const emailjsPrivateKey = EMAILJS_PRIVATE_KEY;
export const emailjsVerificationTemplateId = EMAILJS_VERIFICATION_TEMPLATE_ID;
