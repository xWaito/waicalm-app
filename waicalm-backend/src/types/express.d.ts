/**
 * Extensión de tipos para Express Request
 * Agrega las propiedades userId y user al objeto Request
 * 
 * Estas propiedades son agregadas por el middleware de autenticación (auth.middleware.ts)
 */
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: {
        _id: any;
        name: string;
        email: string;
        phone: string;
        avatar?: string;
        stressLevel?: number;
        onboardingCompleted: boolean;
        kitScanned: boolean;
        kitCode?: string;
        createdAt?: Date;
        updatedAt?: Date;
        lastActive?: Date;
      };
    }
  }
}

// Export vacío para convertir este archivo en un módulo
// Esto permite el merge global de tipos mientras mantiene el archivo como módulo
export { };

