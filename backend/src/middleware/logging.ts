import { Request, Response, NextFunction } from 'express';
import { LogData } from '../types';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, url, ip, headers } = req;

  // Log da requisição
  const logData: LogData = {
    level: 'info',
    message: `${method} ${url}`,
    timestamp: new Date().toISOString(),
    ip: ip || req.connection.remoteAddress || 'unknown',
    userAgent: headers['user-agent'] || 'unknown',
  };

  console.log(`📨 ${logData.message} - ${logData.ip} - ${logData.userAgent}`);

  // Interceptar o final da resposta
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusEmoji = status >= 200 && status < 300 ? '✅' : status >= 400 ? '❌' : '⚠️';
    
    console.log(`${statusEmoji} ${method} ${url} - ${status} (${duration}ms)`);
  });

  next();
};

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  const logData: LogData = {
    level: 'error',
    message: error.message,
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
  };

  console.error(`🚨 ERRO: ${logData.message}`);
  console.error(`📍 ${req.method} ${req.url}`);
  console.error(`👤 IP: ${logData.ip}`);
  console.error(`📱 User-Agent: ${logData.userAgent}`);
  console.error(`⏰ ${logData.timestamp}`);
  
  if (error.stack) {
    console.error('📚 Stack Trace:', error.stack);
  }

  next(error);
};

export const emailLogger = (action: string, data: any): void => {
  const logData: LogData = {
    level: 'info',
    message: `📧 EMAIL ${action}`,
    timestamp: new Date().toISOString(),
  };

  console.log(`${logData.message} - ${logData.timestamp}`);
  
  if (data.success) {
    console.log(`✅ Email enviado com sucesso para: ${data.to || 'N/A'}`);
  } else {
    console.log(`❌ Erro ao enviar email: ${data.error || 'Erro desconhecido'}`);
  }
}; 