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

  const block = 'text-[1.6rem] font-bold leading-tight text-ink'

  return (
    <PtShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <PageHeader
        back={{ href: '/projetos', label: 'Todos os projetos' }}
        title={c.projectTitle}
        lede={`${c.tagline}. ${c.summary}`}
      />

      <article className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {project.previewImage && (
          <div className="plate relative mb-12 aspect-video w-full overflow-hidden lg:aspect-[21/8]">
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
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[1.1rem] leading-relaxed text-steel marker:text-sign">
                {c.how.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="aplicacoes">
              <h2 id="aplicacoes" className={block}>Onde a mesma ideia pode ser aplicada</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[1.1rem] leading-relaxed text-steel marker:text-sign">
                {c.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <section aria-labelledby="resultado" className="plate p-7">
              <h2 id="resultado" className="text-[1.25rem] font-bold text-ink">Resultado</h2>
              {c.result ? (
                <>
                  <p className="mt-3 rounded-xl bg-sign-soft px-4 py-3 text-[1.2rem] font-bold leading-snug text-ink">
                    {c.result}
                  </p>
                  <p className="mt-3 text-[15px] leading-snug text-steel">{c.resultNote}</p>
                </>
              ) : (
                <p className="mt-3 text-[15px] leading-snug text-steel">Sem ganho medido para este projeto.</p>
              )}
            </section>
            <section aria-labelledby="tecnologias" className="plate p-7">
              <h2 id="tecnologias" className="text-[1.25rem] font-bold text-ink">Tecnologias</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="rounded-full bg-paper px-3 py-1 text-[14px] font-medium text-ink">
                    {t}
                  </li>
                ))}
              </ul>
              {project.github && (
                <p className="mt-5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-[16px] font-semibold text-sign hover:text-route-deep"
                  >
                    Ver código no GitHub
                  </a>
                </p>
              )}
            </section>
            <p className="text-[14px] leading-snug text-steel">{c.dataNote}</p>
          </aside>
        </div>

        <section aria-labelledby="cta" className="plate mt-14 p-8 sm:p-10">
          <h2 id="cta" className="text-[clamp(1.8rem,3.6vw,2.4rem)] font-extrabold leading-tight text-ink">
            Tem um problema parecido?
          </h2>
          <p className="mt-3 max-w-[60ch] text-[1.1rem] leading-relaxed text-steel">
            Conte como as coisas funcionam hoje. Conversamos sobre o que dá para resolver, sem compromisso.
          </p>
          <div className="mt-6">
            <TrackedCta
              location={`caso_${c.slug}`}
              message={`Olá, Sthevan! Li o caso ${c.projectTitle} e tenho um problema parecido.`}
            />
          </div>
          <p className="mt-8">
            <Link href="/servicos" className="inline-flex min-h-[44px] items-center text-[16px] font-semibold text-sign hover:text-route-deep">
              Ver todos os serviços
            </Link>
          </p>
        </section>
      </article>
    </PtShell>
  )
}
