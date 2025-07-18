'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '#home', label: 'Início' },
    { href: '#about', label: 'Sobre' },
    { href: '#projects', label: 'Projetos' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contato' }
  ]

  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-heading font-bold gradient-text">
              DevLoop
            </h3>
            <p className="text-muted-foreground max-w-md">
              Do conceito ao código. Do código ao resultado.
            </p>
            <p className="text-sm text-muted-foreground">
              Transformando ideias em soluções digitais inovadoras que geram impacto real no mercado.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-heading font-semibold">Navegação</h4>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-heading font-semibold">Contato</h4>
            <div className="space-y-2">
              <a
                href="mailto:sthevan@devloop.com.br"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                sthevan@devloop.com.br
              </a>
              <a
                href="https://wa.me/5527988772784"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                +55 (27) 98877-2784
              </a>
            </div>
            
            <div className="flex space-x-4 pt-2">
              <a
                href="https://linkedin.com/in/sthevan-santos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/sthevan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gray-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com/sthevan.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} Sthevan Santos. Feito com</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>e muito café ☕</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="flex items-center space-x-2"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Voltar ao topo</span>
          </Button>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8 pt-8 border-t border-border"
        >
          <blockquote className="text-lg font-medium gradient-text italic">
            &ldquo;A tecnologia é melhor quando aproxima as pessoas.&rdquo;
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2 block">
            - Matt Mullenweg
          </cite>
        </motion.div>
      </div>
    </footer>
  )
}

