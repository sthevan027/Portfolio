import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/** Cabeçalho amarelo das páginas internas: voltar, H1 e linha de apoio. */
export default function PageHeader({
  back,
  title,
  lede,
}: {
  back: { href: string; label: string }
  title: string
  lede?: string
}) {
  return (
    <section className="bg-sign">
      <div className="mx-auto max-w-site px-3 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-14">
        <Link
          href={back.href}
          className="inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
          {back.label}
        </Link>
        <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.6rem,7vw,4.8rem)] font-extrabold uppercase leading-[0.9] text-ink">
          {title}
        </h1>
        {lede && <p className="mt-5 max-w-[62ch] text-[1.125rem] leading-relaxed text-sign-ink">{lede}</p>}
      </div>
      <div className="hazard h-7" aria-hidden />
    </section>
  )
}
