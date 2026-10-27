import PtShell from '@/components/PtShell'
import PageHeader from '@/components/PageHeader'
import { SITE } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Política de privacidade',
  description: 'Como este site trata os dados enviados pelo formulário de contato e as medições de uso opcionais.',
  path: '/privacidade',
  noindex: true,
})

export default function PrivacidadePage() {
  const h2 = 'text-[1.4rem] font-bold text-ink'
  const p = 'mt-2 max-w-[66ch] text-[1.05rem] leading-relaxed text-steel'
  return (
    <PtShell>
      <PageHeader back={{ href: '/', label: 'Voltar ao início' }} title="Política de privacidade" />
      <div className="mx-auto max-w-site space-y-6 px-4 py-14 sm:px-6 lg:px-8">
        <section className="plate p-7 sm:p-8">
          <h2 className={h2}>Quem responde pelos dados</h2>
          <p className={p}>
            Sthevan das Virgens dos Santos ({SITE.name}), contato:{' '}
            <a className="font-semibold text-sign underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        </section>
        <section className="plate p-7 sm:p-8">
          <h2 className={h2}>Formulário de contato</h2>
          <p className={p}>
            Os dados do formulário (nome, empresa, e-mail ou WhatsApp, tipo de necessidade e descrição) são enviados por
            e-mail para mim, por meio do serviço Resend, e usados apenas para responder ao seu contato e preparar uma
            proposta. Não são vendidos nem usados para outra finalidade. Para apagar sua mensagem, escreva para o e-mail acima.
          </p>
        </section>
        <section className="plate p-7 sm:p-8">
          <h2 className={h2}>WhatsApp e e-mail</h2>
          <p className={p}>
            Os botões de WhatsApp abrem o aplicativo ou o site do WhatsApp com uma mensagem inicial; a conversa passa a
            seguir as regras do WhatsApp. O mesmo vale para o e-mail.
          </p>
        </section>
        <section className="plate p-7 sm:p-8">
          <h2 className={h2}>Medição de uso (opcional)</h2>
          <p className={p}>
            Se estiver ativado, o site usa o Google Analytics para contar visitas, cliques no WhatsApp e envios do
            formulário. Isso só acontece depois que você aceita no aviso de cookies; se recusar, nada é carregado. A sua
            escolha fica salva apenas no seu navegador.
          </p>
        </section>
        <section className="plate p-7 sm:p-8">
          <h2 className={h2}>Seus direitos</h2>
          <p className={p}>
            Conforme a LGPD, você pode pedir acesso, correção ou exclusão dos seus dados pelo e-mail acima.
          </p>
        </section>
      </div>
    </PtShell>
  )
}
