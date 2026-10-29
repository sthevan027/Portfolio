import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problems from '@/components/Problems'
import ServicesSummary from '@/components/ServicesSummary'
import ResultsBoard from '@/components/ResultsBoard'
import CasesSection from '@/components/CasesSection'
import ForWhom from '@/components/ForWhom'
import Faq from '@/components/Faq'
import HowIWork from '@/components/HowIWork'
import Differentials from '@/components/Differentials'
import Path from '@/components/Path'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { jsonLdScript, personJsonLd, professionalServiceJsonLd } from '@/lib/seo'

export default function Home() {
  return (
    <LanguageProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(personJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd)} />
      <Navbar />
      <main id="main">
        <Hero />
        <Problems />
        <ServicesSummary />
        <ResultsBoard />
        <CasesSection />
        <ForWhom />
        <HowIWork />
        <Differentials />
        <Path />
        <Skills />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  )
}
