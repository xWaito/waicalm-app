/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import Activity from '../models/Activity.model';
import { StatsService } from '../services/stats.service';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import mongoose from 'mongoose';

export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    const { startDate, endDate } = req.query;

    const query: any = { userId: new mongoose.Types.ObjectId(userId) };

    if (startDate || endDate) {
      query.completedAt = {};
      if (startDate) {
        query.completedAt.$gte = new Date(startDate as string);
      }
      if (endDate) {
        query.completedAt.$lte = new Date(endDate as string);
      }
    }

    const activities = await Activity.find(query).sort({ completedAt: -1 });

    const stats = await StatsService.calculateActivityStats(
      new mongoose.Types.ObjectId(userId),
      activities
    );

    return ApiResponse.success(res, stats);
  } catch (error) {
    next(error);
  }
};

export const getCortisolData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new ApiError(401, 'Usuario no autenticado');
    }

    const { period = '7d' } = req.query;

    // Calcular fecha de inicio según el periodo
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Agrupar actividades por día
    const activities = await Activity.find({
      userId: new mongoose.Types.ObjectId(userId),
      completedAt: { $gte: startDate },
    }).sort({ completedAt: 1 });

    // Simular datos de cortisol (en producción vendría de un dispositivo real)
    const cortisolData = generateMockCortisolData(startDate, now, activities);

    return ApiResponse.success(res, {
      period,
      data: cortisolData,
    });
  } catch (error) {
    next(error);
  }
};

// Función helper para generar datos mock de cortisol
function generateMockCortisolData(
  startDate: Date,
  endDate: Date,
  activities: any[]
): Array<{ date: string; value: number }> {
  const data: Array<{ date: string; value: number }> = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const dayActivities = activities.filter(
      (a) => a.completedAt.toISOString().split('T')[0] === dateKey
    );

    // Calcular nivel de cortisol basado en actividades
    // Más actividades = menor cortisol (mejor)
    let baseValue = 5.0; // Valor base en μg/dL

    if (dayActivities.length > 0) {
      baseValue -= dayActivities.length * 0.3;
    }

    // Añadir variación aleatoria
    const variation = (Math.random() - 0.5) * 1.0;
    const value = Math.max(2.0, Math.min(8.0, baseValue + variation));

    data.push({
      date: dateKey,
      value: parseFloat(value.toFixed(2)),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}

