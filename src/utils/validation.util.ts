/**
 * Utilidades para validación
 */

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

/**
 * Valida un teléfono
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

/**
 * Valida un código de kit (WC-XXXX-XXXXX)
 */
export function isValidKitCode(code: string): boolean {
  const kitCodeRegex = /^WC-\d{4}-\d{5}$/;
  return kitCodeRegex.test(code);
}

/**
 * Valida una contraseña (mínimo 6 caracteres)
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

