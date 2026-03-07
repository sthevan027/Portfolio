'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp, Sparkles } from 'lucide-react'
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
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-heading font-bold virex-brand">
                Virex
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-medium text-white">
                Do conceito ao código. Do código ao resultado.
              </p>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Transformando ideias em soluções digitais inovadoras que geram impacto real no mercado. 
                Especialistas em React, Next.js e automações que revolucionam negócios.
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-heading font-semibold text-white">Navegação</h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 w-fit hover:translate-x-1 transform"
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
            <h4 className="text-lg font-heading font-semibold text-white">Contato</h4>
            <div className="space-y-3">
              <a
                href="mailto:sthevan@virex.com.br"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                sthevan@virex.com.br
              </a>
              <a
                href="https://wa.me/5527988772784"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                +55 (27) 98877-2784
              </a>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <a
                href="https://linkedin.com/in/sthevan-santos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/sthevan027"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gray-300 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com/sthevan.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors duration-200"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© {currentYear} Virex. Feito com</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>por Sthevan Santos</span>
            </div>
            
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Voltar ao topo
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

