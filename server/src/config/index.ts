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

const env = (key: string): string => process.env[key] as string;

export const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3001;
export const dbUri = env('DB_URI');
export const jwtSecretKey = env('JWT_SECRET_KEY');
export const refreshTokenSecretKey = env('REFRESH_TOKEN_SECRET_KEY');
export const imageApiKey = env('IMAGE_API_KEY');
export const emailjsServiceId = env('EMAILJS_SERVICE_ID');
export const emailjsPublicKey = env('EMAILJS_PUBLIC_KEY');
export const emailjsPrivateKey = env('EMAILJS_PRIVATE_KEY');
export const emailjsVerificationTemplateId = env('EMAILJS_VERIFICATION_TEMPLATE_ID');
export const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:3000';
export const serverUrl = process.env.SERVER_URL ?? 'http://localhost:3001';
export const demoUserEmail = process.env.DEMO_USER_EMAIL;
export const prefix = '/api';
export const specs = '/docs';
