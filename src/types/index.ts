export * from './api.types';
export * from './navigation.types';

// Perfil de usuario con gamificación
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string; // URL Unsplash
  streak: number; // Racha de días (para fuego 🔥)
  stressScore: number; // 0-100 (42 = óptimo)
  kitActive: boolean;
  createdAt: string;
}

// Hábito diario con estado
export interface DailyHabit {
  id: string;
  title: string;
  icon: string; // Emoji
  completed: boolean;
  time: string; // HH:mm
  type: 'breathing' | 'journal' | 'gummies' | 'rollon';
}

// Punto de histórico de estrés
export interface StressPoint {
  day: string; // Etiqueta (L, M, X, J, V, S, D)
  value: number; // 0-100
  date: string; // ISO date
}

// Entrada de diario
export interface JournalEntry {
  id: string;
  date: string; // ISO
  mood: '😢' | '😟' | '😐' | '🙂' | '😄';
  tags: string[]; // ["Trabajo", "Familia", etc]
  content: string;
  createdAt: string;
}

// Tip educativo
export interface EducationTip {
  id: string;
  title: string;
  category: 'Ciencia' | 'Técnicas' | 'Mind';
  image: string; // URL Unsplash
  summary: string;
  duration: string; // "8 min"
  rating: number; // 4.5-4.9
}

// Día del plan guiado
export interface GuidedPlanDay {
  day: number;
  title: string;
  status: 'completed' | 'active' | 'locked';
  progress: number; // 0-100
  tasks: string[];
}

// Array de resultados mock para simulación HRV
export interface MockStressResult {
  value: number;
  status: 'low' | 'medium' | 'high';
  message: string;
}
