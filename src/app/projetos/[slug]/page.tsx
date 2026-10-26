import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PtShell from '@/components/PtShell'
import PageHeader from '@/components/PageHeader'
import TrackedCta from '@/components/TrackedCta'
import { CASES, getCase } from '@/data/cases'
import { projects } from '@/data/projects'
import { SITE } from '@/lib/site'
import { jsonLdScript, pageMetadata } from '@/lib/seo'

// demonstrações não têm página própria: linkam para o site de demonstração
export function generateStaticParams() {
  return CASES.filter((c) => c.kind !== 'demonstracao').map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCase(params.slug)
  if (!c) return {}
  return pageMetadata({
    title: `Estudo de caso: ${c.projectTitle}`,
    description: c.summary,
    path: `/projetos/${c.slug}`,
  })
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = getCase(params.slug)
  const project = projects.find((p) => p.title === c?.projectTitle)
  if (!c || !project) notFound()

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Projetos', item: `${SITE.url}/projetos` },
      { '@type': 'ListItem', position: 3, name: c.projectTitle, item: `${SITE.url}/projetos/${c.slug}` },
    ],
  }

  const block = 'font-display text-[1.9rem] font-extrabold uppercase leading-[0.95] text-ink'

  return (
    <PtShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <PageHeader
        back={{ href: '/projetos', label: 'Todos os projetos' }}
        title={c.projectTitle}
        lede={`${c.tagline}. ${c.summary}`}
      />

      <article className="mx-auto max-w-site px-3 py-12 sm:px-6 lg:px-8 lg:py-16">
        {project.previewImage && (
          <div className="frame relative mb-12 aspect-video w-full overflow-hidden bg-ink lg:aspect-[21/8]">
            <Image
              src={project.previewImage}
              alt={`Tela do projeto ${c.projectTitle}`}
              fill
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <section aria-labelledby="problema">
              <h2 id="problema" className={block}>Problema original</h2>
              <p className="mt-3 max-w-[64ch] text-[1.1rem] leading-relaxed text-steel">{c.problem}</p>
            </section>
            <section aria-labelledby="solucao">
              <h2 id="solucao" className={block}>Solução desenvolvida</h2>
              <p className="mt-3 max-w-[64ch] text-[1.1rem] leading-relaxed text-steel">{c.solution}</p>
            </section>
            <section aria-labelledby="como-funciona">
              <h2 id="como-funciona" className={block}>Como funciona</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[1.1rem] leading-relaxed text-steel marker:text-ink">
                {c.how.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="aplicacoes">
              <h2 id="aplicacoes" className={block}>Onde a mesma ideia pode ser aplicada</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[1.1rem] leading-relaxed text-steel marker:text-ink">
                {c.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <section aria-labelledby="resultado" className="plate plate-paper plate-screws px-6 pb-9 pt-11">
              <h2 id="resultado" className="font-display text-[1.5rem] font-extrabold uppercase text-ink">Resultado</h2>
              {c.result ? (
                <>
                  <p className="mt-3 rounded-[6px] bg-sign px-3 py-2 font-display text-[1.5rem] font-extrabold uppercase leading-tight text-white ring-2 ring-inset ring-ink">
                    {c.result}
                  </p>
                  <p className="mt-3 text-[15px] leading-snug text-steel">{c.resultNote}</p>
                </>
              ) : (
                <p className="mt-3 text-[15px] leading-snug text-steel">Sem ganho medido para este projeto.</p>
              )}
            </section>
            <section aria-labelledby="tecnologias" className="plate plate-paper plate-screws px-6 pb-9 pt-11">
              <h2 id="tecnologias" className="font-display text-[1.5rem] font-extrabold uppercase text-ink">Tecnologias</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="rounded-[4px] border-2 border-ink/80 px-2 py-0.5 text-[14px] font-semibold text-ink">
                    {t}
                  </li>
                ))}
              </ul>
              {project.github && (
                <p className="mt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
                  >
                    Ver código no GitHub
                  </a>
                </p>
              )}
            </section>
            <p className="text-[14px] leading-snug text-steel">{c.dataNote}</p>
          </aside>
        </div>

        <section aria-labelledby="cta" className="mt-14 border-t-[3px] border-ink pt-10">
          <h2 id="cta" className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-[0.95] text-ink">
            Tem um problema parecido na sua empresa?
          </h2>
          <p className="mt-3 max-w-[60ch] text-[1.1rem] text-steel">
            Conte como o processo funciona hoje. Conversamos sobre o que dá para resolver, sem compromisso.
          </p>
          <div className="mt-6">
            <TrackedCta
              location={`caso_${c.slug}`}
              message={`Olá, Sthevan! Li o caso ${c.projectTitle} e tenho um problema parecido na minha empresa.`}
            />
          </div>
          <p className="mt-8">
            <Link
              href="/servicos"
              className="inline-flex min-h-[44px] items-center font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
            >
              Ver todos os serviços
            </Link>
          </p>
        </section>
      </article>
    </PtShell>
  )
}
