# Reposicionamento comercial: o que mudou e o que depende de você

## Pendências suas (nada disso foi feito por mim)

1. **Formulário de contato (obrigatório).** A rota `/api/contact` antiga só simulava o envio e sempre mostrava "enviado".
   Agora ela envia de verdade pelo [Resend](https://resend.com) (plano gratuito). Sem as variáveis abaixo a rota
   responde 503 e o site mostra erro com atalho para WhatsApp/e-mail, sem falsa confirmação.
   - Crie uma conta no Resend com o e-mail `sthevan.ssantos@gmail.com` e gere uma API key.
   - Na Vercel (Settings → Environment Variables), defina `RESEND_API_KEY`.
   - Opcional: `CONTACT_TO_EMAIL` (padrão: e-mail do site) e `CONTACT_FROM_EMAIL`. Sem domínio verificado, o remetente
     padrão `onboarding@resend.dev` só entrega para o e-mail dono da conta, que é o seu caso.
   - Faça um envio de teste em produção.
2. **Search Console.** Adicione a propriedade `https://sthevandev.vercel.app`; defina `NEXT_PUBLIC_GSC_VERIFICATION`
   com o código da meta tag (ou verifique por outro método), envie `/sitemap.xml` e peça a inspeção da home.
3. **Google Analytics (opcional).** Crie uma propriedade GA4 e defina `NEXT_PUBLIC_GA_ID` (`G-XXXXXXXXXX`). O banner de
   consentimento só aparece se o ID existir, e o script só carrega após "Aceitar". Eventos enviados: `whatsapp_click`,
   `quote_click`, `email_click`, `form_submit`, `form_error`, `service_view`. Marque `form_submit` e `whatsapp_click`
   como eventos-chave (conversões) no GA4.
4. **Revisar os textos dos estudos de caso** (`src/data/cases.ts`) e dos serviços (`src/data/services.ts`). Foram
   escritos a partir das descrições do portfólio; ajuste o que não corresponder ao que aconteceu. Só dois números
   medidos são usados (relatórios 1→3/dia e ART 5 dias→meio dia).
5. **Confirmar fatos:** atendimento "no Espírito Santo, remoto ou híbrido" (página de serviços e schema); cidades de
   atuação (Serra/Vitória só devem entrar no texto se forem verdade); o `ProfessionalService` em JSON-LD (nome da
   Virex, sem endereço, preço ou avaliação); o texto de `/privacidade` (revisão jurídica recomendada); e o número de
   WhatsApp (o PRODUCT.md cita dúvida sobre um número empresarial diferente).
6. **Imagem de compartilhamento.** `public/og-perfil.png` ainda mostra a arte antiga; vale gerar uma nova com o novo
   posicionamento (1200×630).

## Hospedagem

O site está na Vercel, no plano Hobby (suposição: confirme no painel). Pelos termos da Vercel, o Hobby é para uso
pessoal e não comercial; um site que capta clientes pode não estar coberto. Nada foi alterado ou contratado. Opções:

| Opção | Custo (verificar valores atuais) | Observações |
| --- | --- | --- |
| Vercel Pro | pago, por usuário/mês | Zero mudança no projeto; uso comercial permitido. Mais simples. |
| Cloudflare Pages | plano gratuito (fontes secundárias indicam uso comercial permitido) | Next.js exige adaptador; as rotas e a API precisam de ajuste e teste. |
| Netlify | plano gratuito com créditos | Funciona com Next.js; confira os termos e limites antes. |

Confirme preços e termos nas páginas oficiais antes de decidir; eu não consegui consultá-las neste ambiente.
O domínio continua sendo `sthevandev.vercel.app`; domínio próprio melhoraria a marca e o SEO, mas fica para depois.

## Publicação e indexação

1. Revise o PR, configure as variáveis de ambiente e faça o merge para publicar.
2. Teste o formulário, os botões de WhatsApp e as páginas `/servicos` e `/projetos/*` em produção.
3. No Search Console: verifique a propriedade, envie o sitemap e solicite indexação da home e de `/servicos`.
4. Acompanhe "Páginas" e "Desempenho" por algumas semanas antes de tirar conclusões; indexação e posição não são
   garantidas nem imediatas.

## Palavras-chave (hipóteses, sem dados de volume)

| Intenção | Termos | Onde aparecem |
| --- | --- | --- |
| Contratar sistema | desenvolvimento de sistemas para empresas, software personalizado, sistema de gestão personalizado | home (H1, descrição), `/servicos#sistemas-personalizados` |
| Contratar automação | automação de processos, automação de relatórios, automação de planilhas | `/servicos#automacao-de-processos`, casos |
| Manutenção/integração | manutenção de sistemas web, integração de sistemas | `/servicos#modernizacao-e-melhoria` |
| Local | desenvolvedor no Espírito Santo | descrição e página de serviços; sem páginas por cidade |

Rotas não criadas de propósito: `/servicos/<serviço>` separadas e `/contato` (o conteúdo de cada serviço cabe em uma
página única com âncoras, e o formulário fica na home), para não gerar páginas rasas.
