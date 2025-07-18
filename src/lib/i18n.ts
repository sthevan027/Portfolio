export const translations = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      experience: 'Experiência',
      contact: 'Contato'
    },
    hero: {
      greeting: 'Olá, eu sou',
      title: 'CEO da DevLoop | Engenheiro de Software Full Stack',
      description: 'Transformo ideias em soluções digitais inovadoras. Especialista em desenvolvimento full stack, automação e criação de produtos que geram impacto real no mercado.',
      whatsapp: 'Falar no WhatsApp',
      projects: 'Ver Projetos',
      cv: 'Download CV'
    },
    about: {
      title: 'Sobre Mim',
      description: 'Sou um desenvolvedor apaixonado por criar soluções que fazem a diferença. Com experiência em desenvolvimento full stack e liderança de projetos, busco sempre entregar excelência técnica aliada a resultados de negócio.',
      mission: 'Missão',
      missionText: 'Transformar ideias em soluções digitais que geram impacto real no mercado e na vida das pessoas.',
      vision: 'Visão',
      visionText: 'Ser referência em desenvolvimento de software e inovação tecnológica no cenário internacional.',
      values: 'Valores',
      valuesText: 'Excelência técnica, inovação constante, transparência e foco no resultado do cliente.',
      impact: 'Impacto',
      impactText: 'Mais de 50 projetos entregues, ajudando empresas a crescer através da tecnologia.',
      journey: 'Minha Jornada',
      cta: 'Vamos Conversar?',
      ctaText: 'Estou sempre aberto a novos desafios e oportunidades de colaboração. Vamos transformar sua ideia em realidade!'
    },
    skills: {
      title: 'Stack & Skills',
      description: 'Tecnologias e ferramentas que domino para criar soluções completas e inovadoras. Sempre em constante aprendizado e evolução.',
      tools: 'Ferramentas Favoritas',
      soft: 'Soft Skills'
    },
    projects: {
      title: 'Meus Projetos',
      description: 'Uma seleção dos meus trabalhos mais recentes, demonstrando expertise em desenvolvimento full stack, automação e criação de soluções inovadoras.',
      featured: 'Projetos em Destaque',
      all: 'Todos',
      fullstack: 'Full Stack',
      frontend: 'Frontend',
      backend: 'Backend',
      automation: 'Automação'
    },
    contact: {
      title: 'Vamos Conversar?',
      description: 'Estou sempre aberto a novos projetos, oportunidades de colaboração e conversas interessantes. Entre em contato e vamos transformar sua ideia em realidade!',
      form: 'Envie uma Mensagem',
      name: 'Nome',
      email: 'Email',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Mensagem Enviada!',
      successText: 'Obrigado pelo contato! Responderei em breve.',
      info: 'Informações de Contato',
      quick: 'Contato Rápido',
      social: 'Redes Sociais',
      available: 'Disponível para novos projetos',
      response: 'Respondo geralmente em até 24 horas'
    },
    footer: {
      tagline: 'Do conceito ao código. Do código ao resultado.',
      description: 'Transformando ideias em soluções digitais inovadoras que geram impacto real no mercado.',
      navigation: 'Navegação',
      contact: 'Contato',
      copyright: 'Sthevan Santos. Feito com',
      coffee: 'e muito café ☕',
      backToTop: 'Voltar ao topo',
      quote: '"A tecnologia é melhor quando aproxima as pessoas."',
      author: '- Matt Mullenweg'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Hello, I am',
      title: 'CEO of DevLoop | Full Stack Software Engineer',
      description: 'I transform ideas into innovative digital solutions. Specialist in full stack development, automation and creating products that generate real market impact.',
      whatsapp: 'WhatsApp Chat',
      projects: 'View Projects',
      cv: 'Download CV'
    },
    about: {
      title: 'About Me',
      description: 'I am a developer passionate about creating solutions that make a difference. With experience in full stack development and project leadership, I always seek to deliver technical excellence combined with business results.',
      mission: 'Mission',
      missionText: 'Transform ideas into digital solutions that generate real impact in the market and in people\'s lives.',
      vision: 'Vision',
      visionText: 'Be a reference in software development and technological innovation on the international scene.',
      values: 'Values',
      valuesText: 'Technical excellence, constant innovation, transparency and focus on client results.',
      impact: 'Impact',
      impactText: 'More than 50 projects delivered, helping companies grow through technology.',
      journey: 'My Journey',
      cta: 'Let\'s Talk?',
      ctaText: 'I am always open to new challenges and collaboration opportunities. Let\'s turn your idea into reality!'
    },
    skills: {
      title: 'Stack & Skills',
      description: 'Technologies and tools I master to create complete and innovative solutions. Always in constant learning and evolution.',
      tools: 'Favorite Tools',
      soft: 'Soft Skills'
    },
    projects: {
      title: 'My Projects',
      description: 'A selection of my most recent work, demonstrating expertise in full stack development, automation and creating innovative solutions.',
      featured: 'Featured Projects',
      all: 'All',
      fullstack: 'Full Stack',
      frontend: 'Frontend',
      backend: 'Backend',
      automation: 'Automation'
    },
    contact: {
      title: 'Let\'s Talk?',
      description: 'I am always open to new projects, collaboration opportunities and interesting conversations. Get in touch and let\'s turn your idea into reality!',
      form: 'Send a Message',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message Sent!',
      successText: 'Thank you for contacting! I will respond soon.',
      info: 'Contact Information',
      quick: 'Quick Contact',
      social: 'Social Media',
      available: 'Available for new projects',
      response: 'I usually respond within 24 hours'
    },
    footer: {
      tagline: 'From concept to code. From code to results.',
      description: 'Transforming ideas into innovative digital solutions that generate real market impact.',
      navigation: 'Navigation',
      contact: 'Contact',
      copyright: 'Sthevan Santos. Made with',
      coffee: 'and lots of coffee ☕',
      backToTop: 'Back to top',
      quote: '"Technology is best when it brings people together."',
      author: '- Matt Mullenweg'
    }
  }
}

export type Language = 'pt' | 'en'
export type TranslationKey = keyof typeof translations.pt

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

