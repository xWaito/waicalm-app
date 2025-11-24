/**
 * Tipos para las respuestas de la API
 */

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  stressLevel?: number;
  onboardingCompleted: boolean;
  kitScanned: boolean;
  kitCode?: string;
}

