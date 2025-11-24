import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  MONGODB_URI: string;
  JWT_SECRET: string;
  PORT: number;
  NODE_ENV: string;
}

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'] as const;

function validateEnv(): EnvConfig {
  const missing: string[] = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno requeridas: ${missing.join(', ')}`
    );
  }

  return {
    MONGODB_URI: process.env.MONGODB_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    PORT: parseInt(process.env.PORT || '3000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
}

export const env = validateEnv();

