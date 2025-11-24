// src/utils/logger.ts
export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${level} [${this.context}]: ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage('INFO', message));
  }

  error(message: string, error?: any): void {
    console.error(this.formatMessage('ERROR', message));
    if (error) {
      console.error(error);
    }
  }

  warn(message: string): void {
    console.warn(this.formatMessage('WARN', message));
  }

  debug(message: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage('DEBUG', message));
    }
  }

  success(message: string): void {
    console.log(`✅ ${this.formatMessage('SUCCESS', message)}`);
  }
}

// Logger por defecto
export const logger = new Logger('APP');