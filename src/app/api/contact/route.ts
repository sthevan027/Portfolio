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

    // Aqui você pode integrar com um serviço de email como Resend, SendGrid, etc.
    // Por enquanto, vamos simular o envio
    
    console.log('Nova mensagem de contato:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Em produção, você enviaria emails aqui:
    // 1. Email para Sthevan com os dados do cliente
    // 2. Email de confirmação para o cliente

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Responderei em breve.'
    })

  } catch (error) {
    console.error('Erro ao processar contato:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
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

