"use client";

import { 
  InstagramLogo,
  WhatsappLogo,
  LinkedinLogo, 
  EnvelopeSimple,
  ArrowRight,
  Circuitry,
  Code,
  Diamond
} from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const footerNavigation = {
  servicos: [
    { label: "Engenharia de Elite", href: "#engenharia" },
    { label: "Sistemas de Próxima Geração", href: "#sistemas" },
    { label: "Diagnóstico Estratégico", href: "#diagnostico" },
    { label: "Integrações", href: "#integracoes" },
  ],
  empresa: [
    { label: "Sobre", href: "#sobre" },
    { label: "Cases", href: "#cases" },
    { label: "Templates", href: "/templates" },
  ],
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a 
      href={href}
      className="group flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors duration-300"
      whileHover={{ x: 4 }}
    >
      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors duration-300" />
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
      </span>
    </motion.a>
  );
}

function NavigationColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
        <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest">
          {title}
        </h4>
      </div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ href, icon: Icon, label, color }: { 
  href: string; 
  icon: typeof InstagramLogo; 
  label: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${color} transition-all duration-300`}>
        <Icon size={20} weight="duotone" className="text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-white/40 uppercase tracking-wider">{label}</span>
        <span className="text-sm text-white/70 group-hover:text-white transition-colors">Conectar</span>
      </div>
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0f1c]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.02] via-transparent to-transparent" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Brand & Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              {/* Logo & Tagline */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <Diamond size={20} weight="duotone" className="text-cyan-400" />
                  </div>
                  <div style={montserrat} className="text-2xl font-bold tracking-tight text-white">
                    QODEC<span className="text-cyan-400">.</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                  Arquitetura de software e engenharia de sistemas para empresas que precisam escalar com precisão.
                </p>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-2 gap-3">
                <SocialButton 
                  href="mailto:contato@qodec.digital" 
                  icon={EnvelopeSimple} 
                  label="Email" 
                  color="bg-gradient-to-br from-amber-500/30 to-orange-500/30"
                />
                <SocialButton 
                  href="https://wa.me/5511999999999" 
                  icon={WhatsappLogo} 
                  label="WhatsApp" 
                  color="bg-gradient-to-br from-green-500/30 to-emerald-500/30"
                />
                <SocialButton 
                  href="https://instagram.com/qodec.digital" 
                  icon={InstagramLogo} 
                  label="Instagram" 
                  color="bg-gradient-to-br from-pink-500/30 to-purple-500/30"
                />
                <SocialButton 
                  href="https://linkedin.com/company/qodec" 
                  icon={LinkedinLogo} 
                  label="LinkedIn" 
                  color="bg-gradient-to-br from-blue-500/30 to-cyan-500/30"
                />
              </div>

              {/* CTA */}
              <motion.a
                href="#diagnostico"
                className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Circuitry size={20} weight="duotone" />
                <span>Agendar Diagnóstico Gratuito</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Navigation Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <NavigationColumn title="Serviços" links={footerNavigation.servicos} />
                <NavigationColumn title="Empresa" links={footerNavigation.empresa} />
                
                {/* Tech Stack Preview */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                    <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                      Stack
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {['Next.js', 'React', 'Node.js', 'TypeScript'].map((tech) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-white/40">
                        <Code size={14} className="text-cyan-400/60" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="flex items-center gap-4">
                <p className="text-xs text-white/30">
                  &copy; 2026 QODEC DIGITAL
                </p>
                <span className="text-white/10">|</span>
                <p className="text-xs text-white/20">
                  ENGENHARIA PARA ESCALA
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-8">
                <FooterLink href="#">Política de Privacidade</FooterLink>
                <FooterLink href="#">Termos de Uso</FooterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
