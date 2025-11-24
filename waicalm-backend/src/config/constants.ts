export const APP_CONSTANTS = {
  APP_NAME: 'WaiCalm API',
  VERSION: '1.0.0',
  API_PREFIX: '/api',
} as const;

export const STRESS_LEVELS = {
  LOW: { min: 1, max: 4, color: '#7ECDA3', label: 'Bajo' },
  MEDIUM: { min: 5, max: 7, color: '#F5A962', label: 'Medio' },
  HIGH: { min: 8, max: 10, color: '#E85D75', label: 'Alto' },
} as const;

export const ACTIVITY_TYPES = ['breathing', 'journal', 'gummies', 'rollon'] as const;

export const KIT_CODE_REGEX = /^WC-\d{4}-\d{5}$/;

