import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';

export const errorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Si es un error de API (controlado)
  if (err instanceof ApiError) {
    logger.warn(`Error controlado: ${err.message} - ${req.method} ${req.path}`);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && {
        path: req.path,
        method: req.method,
      }),
    });
  }

  // Error no controlado
  logger.error(`Error no controlado: ${req.method} ${req.path}`, err);

  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    }),
  });
};

