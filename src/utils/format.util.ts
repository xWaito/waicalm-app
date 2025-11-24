/**
 * Utilidades para formateo
 */

/**
 * Formatea un número a texto con separador de miles
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('es-ES');
}

/**
 * Formatea una duración en minutos a texto legible
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  
  return `${hours}h ${mins}min`;
}

/**
 * Formatea un nivel de estrés a texto
 */
export function formatStressLevel(level: number): string {
  if (level <= 4) return 'Bajo';
  if (level <= 7) return 'Medio';
  return 'Alto';
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

