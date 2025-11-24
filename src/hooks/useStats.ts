import { useState, useEffect } from 'react';
import statsService from '../services/api/stats.api';
import { ActivityStats, CortisolDataPoint } from '../services/api/stats.api';

export const useStats = () => {
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [cortisolData, setCortisolData] = useState<CortisolDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadStats = async (startDate?: string, endDate?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await statsService.getStats({ startDate, endDate });
      setStats(response.data);
    } catch (err: any) {
      setError(err);
      console.error('Error cargando estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCortisolData = async (period: '7d' | '30d' | '90d' = '7d') => {
    setLoading(true);
    setError(null);
    try {
      const response = await statsService.getCortisolData(period);
      setCortisolData(response.data.data);
    } catch (err: any) {
      setError(err);
      console.error('Error cargando datos de cortisol:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadCortisolData();
  }, []);

  return {
    stats,
    cortisolData,
    loading,
    error,
    loadStats,
    loadCortisolData,
  };
};





