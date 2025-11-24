/**
 * Sistema de Colores WaiCalm - Tema Dual (Light/Dark)
 * 
 * LIGHT THEME (Calm Mode) - Por Defecto
 * DARK THEME (Focus Mode) - Opcional
 */

export const lightColors = {
  // Backgrounds
  bgPrimary: '#F5F3F0',       // Crema suave
  bgSecondary: '#FFFFFF',     // Blanco puro
  bgCard: '#FFFFFF',          // Cards blancos
  bgAccent: '#E8F5F1',        // Verde muy claro

  // Text Colors
  textPrimary: '#2C3E50',     // Azul oscuro suave
  textSecondary: '#7A8A99',   // Gris medio
  textTertiary: '#B5BFCA',    // Gris claro

  // Accent Colors
  accentPrimary: '#5BA4CF',   // Azul turquesa
  accentSecondary: '#7ECDA3', // Verde menta
  accentTertiary: '#FF8C61',  // Coral naranja
  botanicalGreen: '#8FBC8F',  // Verde botánico
  botanicalBrown: '#C4A57B',  // Marrón suave

  // Shadows
  shadowSoft: 'rgba(0,0,0,0.08)',
  shadowCard: 'rgba(0,0,0,0.10)',

  // Base
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const darkColors = {
  // Backgrounds
  bgPrimary: '#1A1F2E',       // Azul oscuro profundo
  bgSecondary: '#252B3A',     // Azul oscuro medio
  bgCard: '#2D3548',          // Cards oscuros
  bgAccent: '#1E3A3A',        // Verde oscuro

  // Text Colors
  textPrimary: '#FFFFFF',     // Blanco
  textSecondary: '#B8C5D6',   // Gris claro
  textTertiary: '#7A8A99',    // Gris medio

  // Accent Colors (iguales en ambos temas)
  accentPrimary: '#5BA4CF',   // Azul turquesa
  accentSecondary: '#7ECDA3', // Verde menta
  accentTertiary: '#FF8C61',  // Coral naranja
  botanicalGreen: '#8FBC8F',  // Verde botánico
  botanicalBrown: '#C4A57B',  // Marrón suave

  // Shadows
  shadowSoft: 'rgba(0,0,0,0.3)',
  shadowCard: 'rgba(0,0,0,0.4)',

  // Base
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Colores compartidos (estado, estrés, etc.)
export const sharedColors = {
  // Status Colors
  stressLow: '#7ECDA3',       // Verde
  stressMedium: '#F5A962',    // Naranja
  stressHigh: '#E85D75',      // Rojo

  // Success/Error/Warning
  success: '#7ECDA3',
  error: '#E85D75',
  warning: '#F5A962',
  info: '#5BA4CF',
};

// Exportar colores por defecto (light)
export const colors = lightColors;

export default colors;
