/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service';
import User from '../models/User.model';
import { ApiError } from '../utils/ApiError';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Obtener token del header
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Token de autenticación no proporcionado');
    }

    const token = authHeader.replace('Bearer ', '');

    // 2. Verificar token
    let decoded;
    try {
      decoded = TokenService.verifyAccessToken(token);
    } catch (error: any) {
      throw new ApiError(401, error.message || 'Token inválido');
    }

    // 3. Verificar que el usuario existe
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new ApiError(401, 'Usuario no encontrado');
    }

    // 4. Agregar usuario al request
    req.userId = decoded.userId;
    req.user = user;

    // 5. Actualizar lastActive
    user.lastActive = new Date();
    await user.save();

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware opcional (no lanza error si no hay token)
export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = TokenService.verifyAccessToken(token);
      const user = await User.findById(decoded.userId).select('-password');

      if (user) {
        req.userId = decoded.userId;
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // No lanzar error, simplemente continuar sin autenticación
    next();
  }
};

