"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail, User, Sparkles, Zap, Target, Shield } from "lucide-react";

export default function DemoAutoridade() {
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const beneficios = [
    { icon: Target, titulo: "Captura Otimizada", desc: "Formulários com 40% mais conversão" },
    { icon: Zap, titulo: "Automação Total", desc: "Nutrição automática de leads" },
    { icon: Shield, titulo: "SEO Integrado", desc: "Ranqueamento orgânico garantido" },
    { icon: Sparkles, titulo: "Design Premium", desc: "Interface que transmite autoridade" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/demos" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm">Voltar à Galeria</span>
          </Link>
          <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase px-3 py-1 bg-cyan-500/10 rounded-full">
            Demo: Gerar Leads
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium">
                <Sparkles size={16} />
                <span>Sistema de Captura Inteligente</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Multiplique seus{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  leads qualificados
                </span>{" "}
                em 30 dias
              </h1>
              
              <p className="text-white/50 text-lg leading-relaxed">
                Arquitetura testada e otimizada para capturar leads de alta qualidade. 
                Sem depender de anúncios pagos.
              </p>

              <ul className="space-y-3">
                {["Taxa de captura: 12-18%", "Integração com CRM", "Automação de follow-up"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <Check size={18} className="text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulário */}
            <div className="relative">
              {!submitted ? (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-2">Baixe o Guia Gratuito</h3>
                  <p className="text-white/40 text-sm mb-6">
                    Descubra como capturar 3x mais leads em 30 dias
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-2">Nome completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 
                            text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="Seu nome"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-2">E-mail profissional</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 
                            text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 
                        rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Quero Receber o Guia
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-white/30 text-xs text-center mt-4">
                    Seus dados estão seguros. Nunca enviamos spam.
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 
                  rounded-2xl p-8 text-center backdrop-blur-sm">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Obrigado!</h3>
                  <p className="text-white/60 mb-6">
                    O guia foi enviado para {formData.email}
                  </p>
                  <div className="bg-white/5 rounded-xl p-4 text-left">
                    <p className="text-sm text-white/80 font-medium mb-2">Próximos passos:</p>
                    <ul className="text-sm text-white/50 space-y-1">
                      <li>• Verifique sua caixa de entrada</li>
                      <li>• Assista ao vídeo de boas-vindas</li>
                      <li>• Agende sua consultoria gratuita</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white mb-12">
            Por que este sistema funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-6 
                  hover:border-cyan-500/30 transition-colors">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.titulo}</h3>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para implementar?
          </h2>
          <p className="text-white/50 mb-8">
            Este é apenas um exemplo. Podemos construir algo exclusivo para seu negócio.
          </p>
          <Link
            href="https://cal.com/qodec/demonstracao"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 
              text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Agendar Demonstração
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
