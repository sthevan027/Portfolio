import nodemailer from 'nodemailer';
import { ContactFormData, EmailResponse } from '../types';
import { emailConfig } from '../config';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
      },
    });
  }

  async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
    try {
      const { name, email, message } = data;

      const mailOptions = {
        from: emailConfig.from,
        to: emailConfig.to,
        subject: `Nova mensagem do portfólio - ${name}`,
        html: this.generateEmailTemplate(data),
        replyTo: email,
      };

      await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        message: 'Email enviado com sucesso!',
      };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return {
        success: false,
        message: 'Erro ao enviar email. Tente novamente.',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  private generateEmailTemplate(data: ContactFormData): string {
    const { name, email, message } = data;
    const timestamp = new Date().toLocaleString('pt-BR');

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Mensagem do Portfólio</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 8px 8px;
          }
          .field {
            margin-bottom: 15px;
          }
          .field-label {
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
          }
          .field-value {
            background: white;
            padding: 10px;
            border-radius: 4px;
            border-left: 4px solid #667eea;
          }
          .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📧 Nova Mensagem do Portfólio</h1>
          <p>Você recebeu uma nova mensagem através do seu portfólio</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">👤 Nome:</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">📧 Email:</div>
            <div class="field-value">${email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">💬 Mensagem:</div>
            <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="footer">
            <p>📅 Enviado em: ${timestamp}</p>
            <p>🔗 Origem: Portfólio Sthevan Santos</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Erro na verificação da conexão de email:', error);
      return false;
    }
  }
}

export default new EmailService(); 