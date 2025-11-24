import { useState, useEffect } from 'react';
import activityService from '../services/api/activity.api';
import { Activity, ActivityType } from '../services/api/activity.api';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadActivities = async (type?: ActivityType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await activityService.getActivities({ type, limit: 100 });
      setActivities(response.data.activities);
    } catch (err: any) {
      setError(err);
      console.error('Error cargando actividades:', err);
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (data: {
    activityType: ActivityType;
    duration?: number;
    notes?: string;
    mood?: number;
  }) => {
    try {
      const response = await activityService.createActivity(data);
      setActivities((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      await activityService.deleteActivity(id);
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  const refreshActivities = async () => {
    await loadActivities();
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    createActivity,
    deleteActivity,
    refreshActivities,
    loadActivities,
  };
};





