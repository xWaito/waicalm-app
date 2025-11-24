import apiClient from './client';
import { AxiosError } from 'axios';

export type ActivityType = 'breathing' | 'journal' | 'gummies' | 'rollon';

export interface CreateActivityData {
  activityType: ActivityType;
  duration?: number;
  notes?: string;
  mood?: number;
}

export interface Activity {
  _id: string;
  userId: string;
  activityType: ActivityType;
  duration?: number;
  notes?: string;
  mood?: number;
  completedAt: string;
  createdAt: string;
}

export interface ActivitiesResponse {
  success: boolean;
  data: {
    activities: Activity[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ActivityResponse {
  success: boolean;
  data: Activity;
}

class ActivityService {
  /**
   * Crear una nueva actividad
   */
  async createActivity(data: CreateActivityData): Promise<ActivityResponse> {
    try {
      return await apiClient.post<ActivityResponse>('/activities', data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtener actividades del usuario
   */
  async getActivities(params?: {
    type?: ActivityType;
    limit?: number;
    offset?: number;
  }): Promise<ActivitiesResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.type) queryParams.append('type', params.type);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());

      const url = `/activities${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      return await apiClient.get<ActivitiesResponse>(url);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtener una actividad por ID
   */
  async getActivityById(id: string): Promise<ActivityResponse> {
    try {
      return await apiClient.get<ActivityResponse>(`/activities/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Eliminar una actividad
   */
  async deleteActivity(id: string): Promise<void> {
    try {
      await apiClient.delete(`/activities/${id}`);
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

export default new ActivityService();

