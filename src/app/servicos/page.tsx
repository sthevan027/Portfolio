import Link from 'next/link'
import PtShell from '@/components/PtShell'
import PageHeader from '@/components/PageHeader'
import TrackedCta from '@/components/TrackedCta'
import { SERVICES, PROCESS_STEPS } from '@/data/services'
import { CASES } from '@/data/cases'
import { SITE } from '@/lib/site'
import { jsonLdScript, pageMetadata, PERSON_ID, SERVICE_ID } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Serviços: sites, sistemas, apps e automação',
  description:
    'Sites, sistemas e apps sob medida para pessoas e pequenos negócios, e sistemas e automação para empresas. Orçamento por escrito, no Espírito Santo e à distância para o Brasil.',
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
        title="Sites, sistemas e automação sob medida"
        lede="Para pessoas, pequenos negócios e empresas. Cada projeto começa com uma conversa sobre o problema, e o orçamento chega por escrito. Projetos a partir de R$ 500."
      />

      <nav aria-label="Serviços" className="border-b border-line bg-white">
        <ul className="mx-auto flex max-w-site flex-wrap gap-2 px-4 py-3 sm:px-6 lg:px-8">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[15px] font-semibold text-ink hover:border-sign hover:text-sign"
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
          className={`${i % 2 === 0 ? 'bg-paper' : 'bg-white'} py-16 sm:py-24`}
        >
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
            <h2 id={`${s.id}-title`} className="max-w-3xl text-[clamp(2rem,4.4vw,3rem)] font-extrabold text-ink">
              {s.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[1.125rem] leading-relaxed text-steel">{s.intro}</p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="plate p-7 sm:p-8">
                <h3 className="text-[1.25rem] font-bold text-ink">Problemas que atendo</h3>
                <ul className="mt-4 space-y-3">
                  {s.problems.map((p) => (
                    <li key={p} className="flex gap-3 text-[1.02rem] leading-snug text-ink">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sign" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="plate p-7 sm:p-8">
                <h3 className="text-[1.25rem] font-bold text-ink">O que posso desenvolver</h3>
                <ul className="mt-4 space-y-3">
                  {s.solutions.map((p) => (
                    <li key={p} className="flex gap-3 text-[1.02rem] leading-snug text-ink">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sign" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-[1.1rem] font-bold text-ink">Exemplos no portfólio</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.cases.map((slug) => {
                  const c = CASES.find((x) => x.slug === slug)
                  return (
                    c && (
                      <li key={slug}>
                        <Link
                          href={`/projetos/${slug}`}
                          className="inline-flex min-h-[44px] items-center rounded-full bg-sign-soft px-4 text-[15px] font-semibold text-sign hover:bg-sign hover:text-white"
                        >
                          {c.projectTitle}
                        </Link>
                      </li>
                    )
                  )
                })}
              </ul>
            </div>

            <div className="mt-10">
              <p className="mb-3 font-semibold text-ink">Quer avaliar o seu caso?</p>
              <TrackedCta location={`servico_${s.id}`} message={s.whatsappMessage} />
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="process-title" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <h2 id="process-title" className="text-[clamp(2rem,4.4vw,3rem)] font-extrabold text-ink">
            Como funciona
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title} className="plate p-7">
                <span className="tabular flex h-10 w-10 items-center justify-center rounded-full bg-sign text-[15px] font-bold text-white" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[1.3rem] font-bold leading-tight text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-steel">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-[62ch] text-steel">
            Atendo pessoas e negócios no Espírito Santo, de forma presencial ou à distância, e também projetos para o Brasil e
            o exterior. Os resultados citados no site foram medidos em projetos específicos; cada cliente tem o seu processo, e
            o ganho possível só se conhece depois de entender o seu.
          </p>
        </div>
      </section>
    </PtShell>
  )
}
