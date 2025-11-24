import apiClient from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      avatar?: string;
      onboardingCompleted?: boolean;
      kitScanned?: boolean;
    };
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

class AuthService {
  /**
   * Registrar nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      
      // Guardar token y usuario
      await this.saveSession(response.data.token, response.data.user);
      
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Iniciar sesión
   */
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      
      // Guardar token y usuario
      await this.saveSession(response.data.token, response.data.user);
      
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<any> {
    try {
      return await apiClient.get('/auth/profile');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Verificar si hay sesión activa
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return !!token;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtener token guardado
   */
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      return null;
    }
  }

  /**
   * Obtener datos del usuario guardados
   */
  async getUserData(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Guardar sesión (token y usuario)
   */
  private async saveSession(token: string, user: any): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        ['auth_token', token],
        ['user_data', JSON.stringify(user)],
      ]);
    } catch (error) {
      console.error('Error al guardar sesión:', error);
      throw new Error('No se pudo guardar la sesión');
    }
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const response = error.response?.data as ApiErrorResponse;
      
      if (response && response.message) {
        return new Error(response.message);
      }
      
      if (error.message === 'Network Error') {
        return new Error('Error de conexión. Verifica tu internet.');
      }
      
      if (error.code === 'ECONNABORTED') {
        return new Error('La petición tomó demasiado tiempo.');
      }
    }
    
    return new Error('Ocurrió un error inesperado');
  }
}

export default new AuthService();

