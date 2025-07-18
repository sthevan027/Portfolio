export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
  timestamp: string;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
}

export interface ServerConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  logLevel: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface LogData {
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
} 