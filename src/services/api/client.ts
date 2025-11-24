import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// IMPORTANTE: Cambiar esta URL por tu IP local o servidor
const getBaseURL = () => {
  if (__DEV__) {
    // Desarrollo: Usa tu IP local
    return Platform.select({
      ios: 'http://localhost:3000/api',
      android: 'http://10.0.2.2:3000/api', // Emulador Android
      default: 'http://192.168.128.12:3000/api', // IP local del servidor
    });
  }
  // Producción: URL del servidor deployado
  return 'https://api.waicalm.com/api';
};

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshQueue: Array<(token: string) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: getBaseURL(),
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Agregar token a todas las requests
        const token = await AsyncStorage.getItem('auth_token');
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Logging en desarrollo
        if (__DEV__) {
          console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Logging en desarrollo
        if (__DEV__) {
          console.log('✅ Response:', response.config.url, response.status);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Manejo de errores específicos
        if (error.response) {
          const { status } = error.response;

          // Token expirado o inválido
          if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Limpiar storage y redirigir a login
            await AsyncStorage.multiRemove(['auth_token', 'user_data']);
            
            // Aquí podrías emitir un evento para redirigir al login
            // EventEmitter.emit('SESSION_EXPIRED');
            
            return Promise.reject(error);
          }

          // Rate limiting
          if (status === 429) {
            console.warn('⚠️ Demasiadas peticiones, intenta más tarde');
          }

          // Server error
          if (status >= 500) {
            console.error('❌ Error del servidor:', status);
          }
        } else if (error.request) {
          // No hay respuesta (problema de red)
          console.error('❌ Error de red: Sin respuesta del servidor');
        } else {
          // Error en la configuración
          console.error('❌ Error de configuración:', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  // Métodos públicos
  getInstance(): AxiosInstance {
    return this.client;
  }

  async get<T>(url: string, config = {}) {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config = {}) {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config = {}) {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config = {}) {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export default new ApiClient();

