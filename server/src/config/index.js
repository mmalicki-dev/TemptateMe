export { default as swaggerConfig } from './swagger.config.js';
import { config } from 'dotenv';
config();

const REQUIRED_ENV_VARS = [
  'DB_URI',
  'JWT_SECRET_KEY',
  'REFRESH_TOKEN_SECRET_KEY',
  'IMAGE_API_KEY',
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
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  BUCKET_NAME,
  EMAIL_API_KEY,
  USED_EMAIL,
  IMAGE_API_KEY,
  CLIENT_URL,
} = process.env;

export const port = PORT || 3001;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUri = DB_URI;
export const awsAccessKey = AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = AWS_SECRET_ACCESS_KEY;
export const awsRegion = AWS_REGION;
export const bucketName = BUCKET_NAME;
export const prefix = '/api';
export const specs = '/docs';
export const emailApiKey = EMAIL_API_KEY;
export const usedEmail = USED_EMAIL;
export const imageApiKey = IMAGE_API_KEY;
export const clientUrl = CLIENT_URL ?? "http://localhost:3000";
