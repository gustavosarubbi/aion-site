"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Rocket, ChartBar, LayoutDashboard } from "lucide-react";

const demos = [
  {
    id: "autoridade",
    titulo: "Arquitetura de Autoridade",
    objetivo: "Gerar Leads",
    desc: "Landing page de alta conversão com formulário funcional, seção de benefícios e fluxo completo de captura.",
    icon: ChartBar,
    cor: "cyan",
    recursos: ["Formulário de Captura", "Modal de Confirmação", "Seção de Benefícios"],
  },
  {
    id: "vendas",
    titulo: "Motor de Vendas",
    objetivo: "Converter Vendas",
    desc: "Funil completo com timer de escassez, checkout em múltiplos passos e upsell integrado.",
    icon: Rocket,
    cor: "blue",
    recursos: ["Timer de Escassez", "Checkout Multi-step", "Upsell Automático"],
  },
  {
    id: "operacoes",
    titulo: "Dashboard de Operações",
    objetivo: "Operações",
    desc: "Central de comando com métricas animadas, gráficos em tempo real e gestão de tarefas.",
    icon: LayoutDashboard,
    cor: "sky",
    recursos: ["Métricas Animadas", "Gráficos Interativos", "Notificações Toast"],
  },
];

const cores = {
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    glow: "hover:shadow-cyan-500/20",
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    glow: "hover:shadow-blue-500/20",
  },
  sky: {
    text: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    glow: "hover:shadow-sky-500/20",
  },
};

export default function DemosPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Voltar</span>
          </Link>
          <span className="text-sm font-bold tracking-wider text-white/40 uppercase">Qodec</span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Veja o que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Construímos
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Demos interativas de sistemas reais. Clique em qualquer uma para explorar 
            as funcionalidades e ver como podemos transformar sua operação.
          </p>
        </div>
      </section>

      {/* Grid de Demos */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demos.map((demo) => {
              const estilo = cores[demo.cor as keyof typeof cores];
              const Icon = demo.icon;
              
              return (
                <Link
                  key={demo.id}
                  href={`/demos/${demo.id}`}
                  className={`group relative bg-white/[0.02] border ${estilo.border} rounded-2xl p-8 
                    transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 
                    hover:shadow-2xl ${estilo.glow}`}
                >
                  {/* Badge de Objetivo */}
                  <span className={`inline-block text-[10px] font-bold tracking-wider uppercase 
                    ${estilo.text} ${estilo.bg} px-3 py-1 rounded-full mb-6`}>
                    {demo.objetivo}
                  </span>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${estilo.bg} border ${estilo.border} 
                    flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${estilo.text}`} />
                  </div>

                  {/* Conteúdo */}
                  <h2 className="text-xl font-bold text-white mb-3">
                    {demo.titulo}
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {demo.desc}
                  </p>

                  {/* Recursos */}
                  <ul className="space-y-2 mb-8">
                    {demo.recursos.map((recurso, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                        <div className={`w-1.5 h-1.5 rounded-full ${estilo.text.replace('text-', 'bg-')}`} />
                        {recurso}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-sm font-medium ${estilo.text} 
                    group-hover:gap-3 transition-all`}>
                    <span>Explorar Demo</span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 border-t border-white/5 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Quer uma solução sob medida?
          </h2>
          <p className="text-white/40 mb-8">
            Estas são apenas demonstrações. Podemos construir algo exclusivo para seu negócio.
          </p>
          <Link
            href="https://cal.com/qodec/demonstracao"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 
              rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Agendar Demonstração
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
