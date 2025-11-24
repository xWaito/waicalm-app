/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { TokenService } from '../services/token.service';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      throw new ApiError(400, 'Este email ya está registrado');
    }

    // Crear nuevo usuario
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
    });

    await user.save();

    // Generar token
    const token = TokenService.generateAccessToken(user);

    // Respuesta
    return ApiResponse.success(
      res,
      {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          onboardingCompleted: user.onboardingCompleted,
          kitScanned: user.kitScanned,
        },
      },
      'Usuario registrado exitosamente',
      201
    );
  } catch (error: any) {
    if (error.code === 11000) {
      // Error de duplicado de MongoDB
      return next(new ApiError(400, 'Este email ya está registrado'));
    }
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario con password
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    if (!user) {
      throw new ApiError(401, 'Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Credenciales inválidas');
    }

    // Generar token
    const token = TokenService.generateAccessToken(user);

    // Actualizar lastActive
    user.lastActive = new Date();
    await user.save();

    // Respuesta
    return ApiResponse.success(
      res,
      {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          onboardingCompleted: user.onboardingCompleted,
          kitScanned: user.kitScanned,
        },
      },
      'Inicio de sesión exitoso'
    );
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    return ApiResponse.success(res, {
      id: req.user._id.toString(),
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      avatar: req.user.avatar,
      stressLevel: req.user.stressLevel,
      onboardingCompleted: req.user.onboardingCompleted,
      kitScanned: req.user.kitScanned,
    });
  } catch (error) {
    next(error);
  }
};

