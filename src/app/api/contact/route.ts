import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validação básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Simular envio de emails
    console.log('📧 Nova mensagem de contato:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 1. Email para Sthevan (notificação)
    const emailToSthevan = {
      to: 'sthevan@devloop.com.br',
      subject: `🚀 Novo contato do portfólio: ${subject}`,
      html: `
        <h2>Novo contato recebido!</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Enviado em: ${new Date().toLocaleString('pt-BR')}</small></p>
      `
    }

    // 2. Email de resposta automática para o cliente
    const autoReplyToClient = {
      to: email,
      subject: '✅ Recebemos sua mensagem! - DevLoop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6C63FF;">Olá, ${name}! 👋</h2>
          
          <p>Obrigado por entrar em contato comigo através do meu portfólio!</p>
          
          <p>Recebi sua mensagem sobre <strong>"${subject}"</strong> e vou analisar com atenção.</p>
          
          <h3 style="color: #6C63FF;">📧 O que acontece agora?</h3>
          <ul>
            <li>Vou analisar sua solicitação nos próximos 24 horas</li>
            <li>Entrarei em contato com uma proposta personalizada</li>
            <li>Podemos agendar uma conversa para alinhar os detalhes</li>
          </ul>
          
          <h3 style="color: #6C63FF;">💬 Prefere falar direto?</h3>
          <p>Se quiser uma resposta mais rápida, pode me chamar no WhatsApp:</p>
          <p style="background: #25D366; color: white; padding: 10px; border-radius: 5px; text-align: center;">
            <a href="https://wa.me/5527988772784?text=Olá! Vi sua mensagem no portfólio sobre ${encodeURIComponent(subject)}" 
               style="color: white; text-decoration: none; font-weight: bold;">
              📱 Falar no WhatsApp
            </a>
          </p>
          
          <hr style="margin: 30px 0;">
          
          <p><strong>Sthevan Santos</strong></p>
          <p>CEO da DevLoop | Frontend Developer</p>
          <p>Especialista em React, Next.js e automações</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-style: italic; color: #666;">
              "Do conceito ao código. Do código ao resultado."
            </p>
          </div>
        </div>
      `
    }

    // Log dos emails que seriam enviados
    console.log('📤 Email para Sthevan:', emailToSthevan.subject)
    console.log('📤 Resposta automática para:', email)

    // Em produção, você enviaria os emails aqui usando Resend, SendGrid, etc.
    // await resend.send(emailToSthevan)
    // await resend.send(autoReplyToClient)

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Você receberá uma confirmação por email.'
    })

  } catch (error) {
    console.error('❌ Erro ao processar contato:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente em alguns instantes.' },
      { status: 500 }
    )
  }
}

// Permitir CORS para desenvolvimento
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

