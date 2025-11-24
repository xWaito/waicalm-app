import { IActivity, ActivityType } from '../models/Activity.model';
import mongoose from 'mongoose';

interface ActivityStats {
  total: number;
  byType: Record<ActivityType, number>;
  thisWeek: number;
  thisMonth: number;
  streak: number;
}

export class StatsService {
  /**
   * Calcula estadísticas de actividades para un usuario
   */
  static async calculateActivityStats(
    userId: mongoose.Types.ObjectId,
    activities: IActivity[]
  ): Promise<ActivityStats> {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const byType: Record<ActivityType, number> = {
      breathing: 0,
      journal: 0,
      gummies: 0,
      rollon: 0,
    };

    let thisWeek = 0;
    let thisMonth = 0;

    activities.forEach((activity) => {
      byType[activity.activityType]++;

      const completedAt = new Date(activity.completedAt);
      if (completedAt >= weekAgo) thisWeek++;
      if (completedAt >= monthAgo) thisMonth++;
    });

    const streak = this.calculateStreak(activities);

    return {
      total: activities.length,
      byType,
      thisWeek,
      thisMonth,
      streak,
    };
  }

  /**
   * Calcula la racha de días consecutivos con actividades
   */
  private static calculateStreak(activities: IActivity[]): number {
    if (activities.length === 0) return 0;

    // Ordenar por fecha descendente
    const sorted = [...activities].sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Agrupar actividades por día
    const activitiesByDay = new Map<string, boolean>();

    sorted.forEach((activity) => {
      const date = new Date(activity.completedAt);
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toISOString().split('T')[0];
      activitiesByDay.set(dateKey, true);
    });

    // Contar días consecutivos
    let currentDate = new Date(today);
    let foundGap = false;

    while (!foundGap) {
      const dateKey = currentDate.toISOString().split('T')[0];

      if (activitiesByDay.has(dateKey)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // Si es hoy y no hay actividad, no cuenta como racha rota
        if (currentDate.getTime() === today.getTime()) {
          currentDate.setDate(currentDate.getDate() - 1);
          continue;
        }
        foundGap = true;
      }

      // Límite de búsqueda: máximo 365 días
      if (streak > 365) break;
    }

    return streak;
  }
}

