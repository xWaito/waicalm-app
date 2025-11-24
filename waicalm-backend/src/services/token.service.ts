import jwt from 'jsonwebtoken';
import { IUser } from '../models/User.model';
import { env } from '../config/env';

interface TokenPayload {
  userId: string;
  email: string;
}

export class TokenService {
  private static readonly ACCESS_TOKEN_SECRET = env.JWT_SECRET;
  private static readonly ACCESS_TOKEN_EXPIRY = '30d';
  private static readonly REFRESH_TOKEN_EXPIRY = '90d';

  /**
   * Genera un token de acceso JWT
   */
  static generateAccessToken(user: IUser): string {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
    };

    return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
      issuer: 'waicalm-api',
      audience: 'waicalm-mobile',
    });
  }

  /**
   * Verifica y decodifica un token JWT
   */
  static verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.ACCESS_TOKEN_SECRET, {
        issuer: 'waicalm-api',
        audience: 'waicalm-mobile',
      }) as TokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expirado');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Token inválido');
      }
      throw error;
    }
  }

  /**
   * Decodifica un token sin verificar (para debugging)
   */
  static decodeToken(token: string): TokenPayload | null {
    return jwt.decode(token) as TokenPayload | null;
  }
}

