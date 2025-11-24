import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

async function connectWithRetry(retries = MAX_RETRIES): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      // Opciones para MongoDB Atlas
      serverSelectionTimeoutMS: 5000, // Timeout para conexión inicial
      socketTimeoutMS: 45000, // Timeout para operaciones
      maxPoolSize: 10, // Mantener hasta 10 conexiones
    });

    logger.success('Conectado a MongoDB Atlas');

    mongoose.connection.on('error', (err) => {
      logger.error('Error de MongoDB', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB desconectado');
    });
  } catch (error: any) {
    logger.error(`Error conectando a MongoDB (intento ${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`, error);

    if (retries > 0) {
      logger.info(`Reintentando en ${RETRY_DELAY / 1000} segundos...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return connectWithRetry(retries - 1);
    }

    throw error;
  }
}

export async function connectDatabase(): Promise<void> {
  await connectWithRetry();
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info('MongoDB desconectado');
}

