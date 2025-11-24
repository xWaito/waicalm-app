import apiClient from './client';
import { AxiosError } from 'axios';

export interface ActivityStats {
  total: number;
  byType: {
    breathing: number;
    journal: number;
    gummies: number;
    rollon: number;
  };
  thisWeek: number;
  thisMonth: number;
  streak: number;
}

export interface CortisolDataPoint {
  date: string;
  value: number;
}

export interface CortisolResponse {
  success: boolean;
  data: {
    period: string;
    data: CortisolDataPoint[];
  };
}

export interface StatsResponse {
  success: boolean;
  data: ActivityStats;
}

class StatsService {
  /**
   * Obtener estadísticas de actividades
   */
  async getStats(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<StatsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const url = `/stats${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      return await apiClient.get<StatsResponse>(url);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtener datos de cortisol
   */
  async getCortisolData(period: '7d' | '30d' | '90d' = '7d'): Promise<CortisolResponse> {
    try {
      return await apiClient.get<CortisolResponse>(`/stats/cortisol?period=${period}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const response = error.response?.data as { message?: string };
      
      if (response && response.message) {
        return new Error(response.message);
      }
      
      if (error.message === 'Network Error') {
        return new Error('Error de conexión. Verifica tu internet.');
      }
    }
    
    return new Error('Ocurrió un error inesperado');
  }
}

export default new StatsService();

