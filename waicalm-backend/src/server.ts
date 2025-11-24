/**
 * WaiCalm Backend Server
 * Servidor Express con MongoDB, JWT y estructura completa
 */

/// <reference path="./types/express.d.ts" />
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { APP_CONSTANTS } from './config/constants';
import { connectDatabase, disconnectDatabase } from './config/database';
import { env } from './config/env';
import { errorMiddleware } from './middleware/error.middleware';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';
import { logger } from './utils/logger';

// Routes
import activityRoutes from './routes/activity.routes';
import authRoutes from './routes/auth.routes';
import statsRoutes from './routes/stats.routes';
import userRoutes from './routes/user.routes';

// Inicializar aplicación Express
const app: Express = express();

// ============================================
// CONFIGURACIÓN DE CORS
// ============================================
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // En desarrollo, permitir todas las conexiones
    if (env.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }
    
    // En producción, definir orígenes permitidos
    const allowedOrigins = [
      'https://waicalm.com',
      'https://www.waicalm.com',
      'http://localhost:3000',
      'http://192.168.128.12:3000',
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// ============================================
// MIDDLEWARE GLOBAL
// ============================================

// Parser de JSON (con límite de tamaño)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging de requests en desarrollo
if (env.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.debug(`${req.method} ${req.path} - IP: ${req.ip}`);
    next();
  });
}

// Rate limiting
app.use(rateLimitMiddleware);

// ============================================
// RUTAS
// ============================================

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    message: `${APP_CONSTANTS.APP_NAME} v${APP_CONSTANTS.VERSION}`,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `Bienvenido a ${APP_CONSTANTS.APP_NAME} API`,
    version: APP_CONSTANTS.VERSION,
    documentation: `${req.protocol}://${req.get('host')}/health`,
  });
});

// API Routes
app.use(`${APP_CONSTANTS.API_PREFIX}/auth`, authRoutes);
app.use(`${APP_CONSTANTS.API_PREFIX}/user`, userRoutes);
app.use(`${APP_CONSTANTS.API_PREFIX}/activities`, activityRoutes);
app.use(`${APP_CONSTANTS.API_PREFIX}/stats`, statsRoutes);

// ============================================
// MANEJO DE ERRORES
// ============================================

// Error handling middleware (debe ir después de las rutas)
app.use(errorMiddleware);

// 404 handler (debe ir al final, después de errorMiddleware)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path,
    method: req.method,
  });
});

// ============================================
// INICIALIZACIÓN DEL SERVIDOR
// ============================================

let server: ReturnType<typeof app.listen> | null = null;

/**
 * Inicia el servidor Express
 */
async function startServer(): Promise<void> {
  try {
    // Conectar a MongoDB
    logger.info('Conectando a MongoDB Atlas...');
    await connectDatabase();

    // Iniciar servidor Express
    server = app.listen(env.PORT, '0.0.0.0', () => {
      logger.success(`Servidor corriendo en http://localhost:${env.PORT}`);
      logger.info(`API disponible en http://localhost:${env.PORT}${APP_CONSTANTS.API_PREFIX}`);
      logger.info(`Servidor accesible desde red local: http://192.168.128.12:${env.PORT}`);
      logger.info(`Ambiente: ${env.NODE_ENV}`);
      logger.info(`Health check: http://localhost:${env.PORT}/health`);
    });

    // Manejo de errores del servidor
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`Puerto ${env.PORT} ya está en uso`);
      } else {
        logger.error('Error en el servidor', error);
      }
      process.exit(1);
    });

  } catch (error) {
    logger.error('Error al iniciar el servidor', error);
    process.exit(1);
  }
}

/**
 * Cierra el servidor de forma segura
 */
async function gracefulShutdown(): Promise<void> {
  logger.info('Cerrando servidor de forma segura...');
  
  if (server) {
    server.close(async () => {
      logger.info('Servidor HTTP cerrado');
      
      try {
        await disconnectDatabase();
        logger.info('Conexión a MongoDB cerrada');
        process.exit(0);
      } catch (error) {
        logger.error('Error al cerrar MongoDB', error);
        process.exit(1);
      }
    });

    // Forzar cierre después de 10 segundos
    setTimeout(() => {
      logger.error('Forzando cierre del servidor');
      process.exit(1);
    }, 10000);
  } else {
    await disconnectDatabase();
    process.exit(0);
  }
}

// ============================================
// MANEJO DE SEÑALES DEL SISTEMA
// ============================================

// Manejo de SIGTERM (señal de terminación)
process.on('SIGTERM', () => {
  logger.warn('SIGTERM recibido');
  gracefulShutdown();
});

// Manejo de SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  logger.warn('SIGINT recibido (Ctrl+C)');
  gracefulShutdown();
});

// Manejo de errores no capturados
process.on('uncaughtException', (error: Error) => {
  logger.error('Excepción no capturada', error);
  gracefulShutdown();
});

// Manejo de promesas rechazadas
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logger.error('Promesa rechazada no manejada', { reason, promise });
  gracefulShutdown();
});

// ============================================
// INICIAR SERVIDOR
// ============================================

// Iniciar servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  startServer().catch((error) => {
    logger.error('Error fatal al iniciar', error);
    process.exit(1);
  });
}

export default app;
export { gracefulShutdown, startServer };

