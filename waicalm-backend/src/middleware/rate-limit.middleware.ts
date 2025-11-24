import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

// Rate limiting simple en memoria (para producción usar Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const MAX_REQUESTS = 100;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

export const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    throw new ApiError(
      429,
      'Demasiadas peticiones. Por favor intenta más tarde.'
    );
  }

  record.count++;
  next();
};

