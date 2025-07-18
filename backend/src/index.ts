import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { errorLogger } from './middleware/logging';
import contactRoutes from './routes/contact';
import { serverConfig, validateConfig } from './config';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Segurança
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
        },
      },
    }));

    // CORS
    this.app.use(cors({
      origin: serverConfig.corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Compressão
    this.app.use(compression());

    // Logging
    this.app.use(morgan('combined'));

    // Parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  }

  private setupRoutes(): void {
    // Health check global
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Portfolio API - Sthevan Santos',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      });
    });

    // Rotas da API
    this.app.use('/api', contactRoutes);

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        timestamp: new Date().toISOString(),
      });
    });
  }

  private setupErrorHandling(): void {
    // Error logging middleware
    this.app.use(errorLogger);

    // Global error handler
    this.app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Erro não tratado:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: serverConfig.nodeEnv === 'development' ? error.message : 'Erro interno',
        timestamp: new Date().toISOString(),
      });
    });
  }

  public start(): void {
    try {
      // Validar configuração
      validateConfig();

      // Iniciar servidor
      this.app.listen(serverConfig.port, () => {
        console.log('🚀 Servidor iniciado com sucesso!');
        console.log(`📍 URL: http://localhost:${serverConfig.port}`);
        console.log(`🌍 Ambiente: ${serverConfig.nodeEnv}`);
        console.log(`📧 Email configurado para: ${serverConfig.corsOrigin}`);
        console.log('✅ API pronta para receber requisições');
        console.log('');
        console.log('📋 Endpoints disponíveis:');
        console.log(`   GET  / - Health check`);
        console.log(`   GET  /api/health - Status da API`);
        console.log(`   POST /api/contact - Enviar email de contato`);
        console.log(`   GET  /api/email/status - Status do serviço de email`);
        console.log('');
      });
    } catch (error) {
      console.error('❌ Erro ao iniciar servidor:', error);
      process.exit(1);
    }
  }
}

// Iniciar servidor
const server = new Server();
server.start(); 