/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, avatar, stressLevel } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    const updateData: any = {};

    if (name) updateData.name = name.trim();
    if (phone) updateData.phone = phone.trim();
    if (avatar !== undefined) updateData.avatar = avatar;
    if (stressLevel !== undefined) {
      if (stressLevel < 1 || stressLevel > 10) {
        throw new ApiError(400, 'El nivel de estrés debe estar entre 1 y 10');
      }
      updateData.stressLevel = stressLevel;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new ApiError(404, 'Usuario no encontrado');
    }

    return ApiResponse.success(res, user, 'Perfil actualizado exitosamente');
  } catch (error) {
    next(error);
  }
};

export const updateKitCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kitCode } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    // Validar formato del código
    if (!/^WC-\d{4}-\d{5}$/.test(kitCode)) {
      throw new ApiError(400, 'Formato de código de kit inválido');
    }

    // Verificar que el código no esté en uso
    const existingUser = await User.findOne({ kitCode });

    if (existingUser && existingUser._id.toString() !== userId) {
      throw new ApiError(400, 'Este código de kit ya está en uso');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          kitCode,
          kitScanned: true,
        },
      },
      { new: true }
    ).select('-password');

    if (!user) {
      throw new ApiError(404, 'Usuario no encontrado');
    }

    return ApiResponse.success(
      res,
      user,
      'Código de kit actualizado exitosamente'
    );
  } catch (error) {
    next(error);
  }
};

