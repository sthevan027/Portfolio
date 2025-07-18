import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { ContactFormData, ApiResponse } from '../types';
import { validateContactForm, sanitizeInput } from '../middleware/validation';
import { requestLogger, emailLogger } from '../middleware/logging';
import emailService from '../services/emailService';
import { rateLimitConfig } from '../config';

const router = Router();

// Rate limiting para prevenir spam
const contactRateLimit = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.maxRequests,
  message: {
    success: false,
    message: 'Muitas tentativas. Tente novamente em 15 minutos.',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rota de health check
router.get('/health', (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

// Rota para enviar email de contato
router.post('/contact', 
  requestLogger,
  contactRateLimit,
  sanitizeInput,
  validateContactForm,
  async (req: Request, res: Response) => {
    try {
      const contactData: ContactFormData = req.body;
      
      // Log da tentativa de envio
      emailLogger('TENTATIVA_ENVIO', { 
        from: contactData.email, 
        to: 'sthevan@devloop.com.br' 
      });

      // Enviar email
      const emailResult = await emailService.sendContactEmail(contactData);
      
      if (emailResult.success) {
        // Log de sucesso
        emailLogger('SUCESSO', emailResult);
        
        const response: ApiResponse = {
          success: true,
          message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
          timestamp: new Date().toISOString(),
        };
        
        res.status(200).json(response);
      } else {
        // Log de erro
        emailLogger('ERRO', emailResult);
        
        const response: ApiResponse = {
          success: false,
          message: 'Erro ao enviar mensagem. Tente novamente.',
          error: emailResult.error,
          timestamp: new Date().toISOString(),
        };
        
        res.status(500).json(response);
      }
    } catch (error) {
      console.error('Erro interno do servidor:', error);
      
      const response: ApiResponse = {
        success: false,
        message: 'Erro interno do servidor. Tente novamente.',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      };
      
      res.status(500).json(response);
    }
  }
);

// Rota para verificar status do email
router.get('/email/status', async (req: Request, res: Response) => {
  try {
    const isConnected = await emailService.verifyConnection();
    
    const response: ApiResponse = {
      success: isConnected,
      message: isConnected ? 'Serviço de email funcionando' : 'Serviço de email indisponível',
      timestamp: new Date().toISOString(),
    };
    
    res.status(isConnected ? 200 : 503).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Erro ao verificar serviço de email',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(response);
  }
});

export default router; 