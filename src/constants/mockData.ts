import { UserProfile, DailyHabit, StressPoint, EducationTip, GuidedPlanDay, MockStressResult } from '../types';

export const USER_PROFILE: UserProfile = {
  id: 'usr_maria_001',
  name: 'María González',
  email: 'maria@waicalm.app',
  phone: '+52 55 1234 5678',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  streak: 5,
  stressScore: 42,
  kitActive: true,
  createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // Hace 15 días
};

export const STRESS_HISTORY: StressPoint[] = [
  { day: 'L', value: 65, date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
  { day: 'M', value: 60, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { day: 'X', value: 55, date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
  { day: 'J', value: 51, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { day: 'V', value: 48, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { day: 'S', value: 45, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { day: 'D', value: 42, date: new Date().toISOString() },
];

export const DAILY_HABITS: DailyHabit[] = [
  { id: 'h1', title: 'Gomitas CBD', icon: '💊', completed: false, time: '09:00', type: 'gummies' },
  { id: 'h2', title: 'Roll-on Lavanda', icon: '🌿', completed: false, time: '14:00', type: 'rollon' },
  { id: 'h3', title: 'Respiración 4-7-8', icon: '🫁', completed: false, time: '21:00', type: 'breathing' },
];

export const EDUCATION_TIPS: EducationTip[] = [
  {
    id: 't1',
    title: 'Ciencia del Cortisol',
    category: 'Ciencia',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    summary: 'Descubre cómo funciona la hormona del estrés y su impacto en tu bienestar',
    duration: '8 min',
    rating: 4.8,
  },
  {
    id: 't2',
    title: 'Neurociencia del CBD',
    category: 'Técnicas',
    image: 'https://images.unsplash.com/photo-1603024616705-0cb1752e8207?w=800&h=600&fit=crop',
    summary: 'Evidencia científica sobre los efectos del cannabidiol en el sistema nervioso',
    duration: '10 min',
    rating: 4.9,
  },
  {
    id: 't3',
    title: 'Higiene del Sueño',
    category: 'Mind',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop',
    summary: 'Protocolos basados en neurociencia para optimizar tu descanso',
    duration: '6 min',
    rating: 4.7,
  },
];

export const GUIDED_PLAN: GuidedPlanDay[] = [
  {
    day: 1,
    title: 'Escaneo de Kit',
    status: 'completed',
    progress: 100,
    tasks: ['Vincular kit bio-inteligente', 'Primera medición HRV', 'Configurar perfil'],
  },
  {
    day: 2,
    title: 'Construir Hábitos',
    status: 'active',
    progress: 45,
    tasks: ['Tomar gomitas CBD (9 AM)', 'Sesión respiración', 'Registro en journal'],
  },
  {
    day: 3,
    title: 'Consistencia',
    status: 'locked',
    progress: 0,
    tasks: ['Mantener racha', 'Sesión grupal', 'Revisión semanal'],
  },
];

export const MOCK_STRESS_RESULTS: MockStressResult[] = [
  { value: 32, status: 'low', message: '¡Excelente! Tu nivel de cortisol está en zona óptima' },
  { value: 48, status: 'medium', message: 'Nivel moderado. Considera una sesión de respiración' },
  { value: 67, status: 'high', message: 'Nivel elevado detectado. Te recomendamos tu roll-on' },
];








