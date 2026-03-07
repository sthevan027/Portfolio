# 🚀 Portfolio Backend API

Backend profissional para o portfólio de Sthevan Santos, com sistema de envio de emails e validações robustas.

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Nodemailer** - Envio de emails
- **Joi** - Validação de dados
- **Helmet** - Segurança
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Proteção contra spam

## 📋 Funcionalidades

### ✅ Implementadas
- ✅ **API RESTful** com endpoints organizados
- ✅ **Sistema de email** com template HTML profissional
- ✅ **Validação robusta** de formulários
- ✅ **Rate limiting** para prevenir spam
- ✅ **Logging profissional** com emojis e detalhes
- ✅ **Segurança** com Helmet e CORS
- ✅ **Compressão** de respostas
- ✅ **Error handling** global
- ✅ **Health checks** para monitoramento
- ✅ **Sanitização** de inputs

## 🚀 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
```

3. **Editar `.env` com suas configurações:**
```env
# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=sthevan.ssantos@gmail.com

# Security
CORS_ORIGIN=http://localhost:3000
```

## 🔧 Configuração do Gmail

Para usar Gmail, você precisa:

1. **Ativar autenticação de 2 fatores**
2. **Gerar senha de app:**
   - Acesse: https://myaccount.google.com/apppasswords
   - Gere uma senha para "Mail"
   - Use essa senha no `EMAIL_PASS`

## 🏃‍♂️ Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📡 Endpoints

### Health Check
```
GET /
GET /api/health
```

### Email
```
POST /api/contact
GET /api/email/status
```

## 📧 Exemplo de Uso

### Enviar Email de Contato
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "message": "Olá! Gostaria de trabalhar com você."
  }'
```

### Resposta de Sucesso
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso! Entraremos em contato em breve.",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔒 Segurança

- **Rate Limiting**: 5 tentativas por 15 minutos
- **Validação**: Todos os inputs são validados
- **Sanitização**: Inputs são limpos automaticamente
- **CORS**: Configurado para frontend específico
- **Helmet**: Headers de segurança

## 📊 Logs

O sistema gera logs detalhados:

```
📨 POST /api/contact - 192.168.1.1 - Mozilla/5.0...
✅ POST /api/contact - 200 (150ms)
📧 EMAIL TENTATIVA_ENVIO - 2024-01-15T10:30:00.000Z
✅ Email enviado com sucesso para: sthevan.ssantos@gmail.com
```

## 🧪 Testes

```bash
npm test
```

## 📁 Estrutura

```
src/
├── config/          # Configurações
├── middleware/      # Middlewares
├── routes/          # Rotas da API
├── services/        # Serviços (email)
├── types/           # Tipos TypeScript
└── index.ts         # Servidor principal
```

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor | `3001` |
| `NODE_ENV` | Ambiente | `development` |
| `EMAIL_HOST` | Host SMTP | `smtp.gmail.com` |
| `EMAIL_PORT` | Porta SMTP | `587` |
| `EMAIL_USER` | Usuário email | - |
| `EMAIL_PASS` | Senha email | - |
| `EMAIL_FROM` | Email remetente | - |
| `EMAIL_TO` | Email destinatário | - |
| `CORS_ORIGIN` | Origem permitida | `http://localhost:3000` |

## 🚀 Deploy

### Vercel
```bash
vercel --prod
```

### Railway
```bash
railway up
```

### Heroku
```bash
heroku create
git push heroku main
```

## 📞 Suporte

Para dúvidas ou problemas, entre em contato:
- **Email**: sthevan.ssantos@gmail.com
- **WhatsApp Pessoal**: +55 (27) 98877-2784
- **WhatsApp Empresarial**: +55 (27) 998962-8554
- **LinkedIn**: [Sthevan Santos](https://linkedin.com/in/sthevan-santos)

---

**Desenvolvido com ❤️ por Sthevan Santos - CEO da Virex** 