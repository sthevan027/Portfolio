import Link from 'next/link'
import PtShell from '@/components/PtShell'
import PageHeader from '@/components/PageHeader'
import TrackedCta from '@/components/TrackedCta'
import { SERVICES, PROCESS_STEPS } from '@/data/services'
import { CASES } from '@/data/cases'
import { SITE } from '@/lib/site'
import { jsonLdScript, pageMetadata, PERSON_ID, SERVICE_ID } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Serviços: sistemas, automação e melhoria de sistemas',
  description:
    'Desenvolvimento de sistemas personalizados, automação de planilhas, relatórios e documentos, e manutenção e integração de sistemas web para empresas.',
  path: '/servicos',
})

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': SERVICES.map((s) => ({
    '@type': 'Service',
    '@id': `${SITE.url}/servicos#${s.id}`,
    name: s.title,
    description: s.intro,
    provider: { '@id': SERVICE_ID },
    areaServed: { '@type': 'AdministrativeArea', name: 'Espírito Santo, Brasil' },
    url: `${SITE.url}/servicos#${s.id}`,
    brand: { '@id': PERSON_ID },
  })),
}

export default function ServicosPage() {
  return (
    <PtShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(servicesJsonLd)} />
      <PageHeader
        back={{ href: '/', label: 'Voltar ao início' }}
        title="Serviços de sistemas e automação para empresas"
        lede="Três frentes de trabalho, todas partindo do processo real da sua empresa. Cada projeto começa com uma conversa sobre o problema, sem compromisso."
      />

      <nav aria-label="Serviços" className="border-b-[3px] border-ink bg-white">
        <ul className="mx-auto flex max-w-site flex-wrap gap-x-8 gap-y-1 px-3 py-2 sm:px-6 lg:px-8">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-[44px] items-center font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className={`${i % 2 === 0 ? 'bg-paper' : 'bg-white'} py-14 sm:py-20`}
        >
          <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
            <h2
              id={`${s.id}-title`}
              className="font-display text-[clamp(2.6rem,7vw,4.4rem)] font-extrabold uppercase leading-[0.9] text-ink"
            >
              {s.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[1.15rem] leading-relaxed text-steel">{s.intro}</p>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-[1.7rem] font-extrabold uppercase text-ink">Problemas que atendo</h3>
                <ul className="mt-4 space-y-3 border-t-[3px] border-ink pt-4">
                  {s.problems.map((p) => (
                    <li key={p} className="text-[1.05rem] leading-snug text-ink">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-[1.7rem] font-extrabold uppercase text-ink">O que posso desenvolver</h3>
                <ul className="mt-4 space-y-3 border-t-[3px] border-ink pt-4">
                  {s.solutions.map((p) => (
                    <li key={p} className="text-[1.05rem] leading-snug text-ink">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-[1.4rem] font-extrabold uppercase text-ink">Exemplos no portfólio</h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                {s.cases.map((slug) => {
                  const c = CASES.find((x) => x.slug === slug)
                  return (
                    c && (
                      <li key={slug}>
                        <Link
                          href={`/projetos/${slug}`}
                          className="inline-flex min-h-[44px] items-center font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
                        >
                          {c.projectTitle}
                        </Link>
                      </li>
                    )
                  )
                })}
              </ul>
            </div>

            <div className="mt-8">
              <p className="mb-3 font-semibold text-ink">Quer avaliar o seu caso?</p>
              <TrackedCta location={`servico_${s.id}`} message={s.whatsappMessage} />
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="process-title" className="bg-ink py-14 text-paper sm:py-20">
        <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
          <h2
            id="process-title"
            className="font-display text-[clamp(2.6rem,7vw,4.4rem)] font-extrabold uppercase leading-[0.9] text-sign"
          >
            Como funciona
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title} className="rounded-[10px] border-[3px] border-sign/90 p-5">
                <span className="tabular font-display text-[1.6rem] font-extrabold text-sign">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 font-display text-[1.6rem] font-extrabold uppercase leading-[0.95] text-paper">{step.title}</h3>
                <p className="mt-3 text-paper/80">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[62ch] text-paper/80">
            Atendo empresas no Espírito Santo, de forma remota ou híbrida. Os resultados citados no site foram medidos em
            projetos específicos; cada empresa tem seu processo, e o ganho possível só se conhece depois de entender o seu.
          </p>
        </div>
      </section>
    </PtShell>
  )
}
