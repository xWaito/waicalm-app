/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import Activity, { ActivityType } from '../models/Activity.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

export const createActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { activityType, duration, notes, mood } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    // Validar tipo de actividad
    const validTypes: ActivityType[] = ['breathing', 'journal', 'gummies', 'rollon'];
    if (!validTypes.includes(activityType)) {
      throw new ApiError(400, 'Tipo de actividad inválido');
    }

    // Crear actividad
    const activity = new Activity({
      userId,
      activityType,
      duration,
      notes,
      mood,
      completedAt: new Date(),
    });

    await activity.save();

    return ApiResponse.success(
      res,
      activity,
      'Actividad registrada exitosamente',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getActivities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    const { type, limit = 50, offset = 0 } = req.query;

    const query: any = { userId };

    if (type && ['breathing', 'journal', 'gummies', 'rollon'].includes(type as string)) {
      query.activityType = type;
    }

    const activities = await Activity.find(query)
      .sort({ completedAt: -1 })
      .limit(parseInt(limit as string, 10))
      .skip(parseInt(offset as string, 10));

    const total = await Activity.countDocuments(query);

    return ApiResponse.success(res, {
      activities,
      total,
      limit: parseInt(limit as string, 10),
      offset: parseInt(offset as string, 10),
    });
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    const activity = await Activity.findOne({ _id: id, userId });

    if (!activity) {
      throw new ApiError(404, 'Actividad no encontrada');
    }

    return ApiResponse.success(res, activity);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    const activity = await Activity.findOneAndDelete({ _id: id, userId });

    if (!activity) {
      throw new ApiError(404, 'Actividad no encontrada');
    }

    return ApiResponse.success(res, null, 'Actividad eliminada exitosamente');
  } catch (error) {
    next(error);
  }
};

