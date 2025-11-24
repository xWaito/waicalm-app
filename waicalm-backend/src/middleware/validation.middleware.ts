import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone, password } = req.body;

  if (!name || name.trim().length < 2) {
    throw new ApiError(400, 'El nombre debe tener al menos 2 caracteres');
  }

  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    throw new ApiError(400, 'Proporciona un email válido');
  }

  if (!phone || phone.trim().length < 8) {
    throw new ApiError(400, 'Proporciona un número de teléfono válido');
  }

  if (!password || password.length < 6) {
    throw new ApiError(400, 'La contraseña debe tener al menos 6 caracteres');
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email y contraseña son requeridos');
  }

  next();
};

