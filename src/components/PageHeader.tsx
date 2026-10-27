import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/** Cabeçalho das páginas internas: voltar, H1 e linha de apoio. */
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
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-site px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32">
        <Link
          href={back.href}
          className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-sign hover:text-route-deep"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {back.label}
        </Link>
        <h1 className="mt-6 max-w-[22ch] text-[clamp(2.4rem,5.4vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
          {title}
        </h1>
        {lede && <p className="mt-5 max-w-[62ch] text-[1.125rem] leading-relaxed text-steel">{lede}</p>}
      </div>
    </section>
  )
}
