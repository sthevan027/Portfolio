'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Eye, Heart, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const values = [
    { icon: Target, titleKey: 'about.mission', descriptionKey: 'about.missionText' },
    { icon: Eye, titleKey: 'about.vision', descriptionKey: 'about.visionText' },
    { icon: Heart, titleKey: 'about.values', descriptionKey: 'about.valuesText' },
    { icon: Users, titleKey: 'about.impact', descriptionKey: 'about.impactText' }
  ]

  const timeline = [
    { year: '2026', titleKey: 'about.timeline2026Title', descriptionKey: 'about.timeline2026Text' },
    { year: '2025', titleKey: 'about.timeline2025Title', descriptionKey: 'about.timeline2025Text' },
    { year: '2024', titleKey: 'about.timeline2024Title', descriptionKey: 'about.timeline2024Text' },
    { year: '2023', titleKey: 'about.timeline2023Title', descriptionKey: 'about.timeline2023Text' },
    { year: '2022', titleKey: 'about.timeline2022Title', descriptionKey: 'about.timeline2022Text' },
    { year: '2021', titleKey: 'about.timeline2021Title', descriptionKey: 'about.timeline2021Text' }
  ]

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.titleKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover:glow transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t(value.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(value.descriptionKey)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-heading font-bold text-center mb-12">
            {t('about.journey')}
          </h3>

          <div className="relative">
            {/* Timeline line - hidden on mobile, visible md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-secondary"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'
                }`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} text-left`}>
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                      <h4 className="font-heading font-semibold mb-2">{t(item.titleKey)}</h4>
                      <p className="text-sm text-muted-foreground">{t(item.descriptionKey)}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot - hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold mb-4">
                {t('about.cta')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('about.ctaText')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:glow min-h-[44px] px-6 py-3"
                >
                  {t('about.ctaContact')}
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground min-h-[44px] px-6 py-3"
                >
                  {t('about.ctaProjects')}
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

