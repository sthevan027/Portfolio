import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ValidationError } from '../types';

export const contactFormSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres',
      'any.required': 'Nome é obrigatório',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email deve ser válido',
      'any.required': 'Email é obrigatório',
    }),
  message: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Mensagem deve ter pelo menos 10 caracteres',
      'string.max': 'Mensagem deve ter no máximo 1000 caracteres',
      'any.required': 'Mensagem é obrigatória',
    }),
});

export const validateContactForm = (req: Request, res: Response, next: NextFunction): void => {
  const { error, value } = contactFormSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const validationErrors: ValidationError[] = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));

    res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: validationErrors,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  req.body = value;
  next();
};

export const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
  // Sanitizar inputs básicos
  if (req.body.name) {
    req.body.name = req.body.name.trim().replace(/\s+/g, ' ');
  }
  
  if (req.body.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  
  if (req.body.message) {
    req.body.message = req.body.message.trim();
  }

  next();
}; 