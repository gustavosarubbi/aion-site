"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, Star, Shield, CreditCard, Gift } from "lucide-react";

export default function DemoVendas() {
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(900);
  const [showUpsell, setShowUpsell] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", cartao: "" });
  const [selectedPlan, setSelectedPlan] = useState("pro");

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUpsell(true);
  };

  const planos = [
    { id: "basic", nome: "Básico", preco: "497", recursos: ["Página de vendas", "Checkout simples"] },
    { id: "pro", nome: "Profissional", preco: "997", recursos: ["Tudo do Básico", "Upsell automático", "Split de pagamento"], popular: true },
    { id: "enterprise", nome: "Enterprise", preco: "1.997", recursos: ["Tudo do Pro", "Dashboard admin", "API completa"] },
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
          <span className="text-xs font-bold tracking-wider text-blue-400 uppercase px-3 py-1 bg-blue-500/10 rounded-full">
            Demo: Converter Vendas
          </span>
        </div>
      </nav>

      {/* Timer de Escassez */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-red-500/20 to-orange-500/20 
        border-y border-red-500/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-center gap-4">
          <Clock className="w-5 h-5 text-red-400 animate-pulse" />
          <span className="text-white/80 text-sm">
            Oferta expira em: <span className="text-red-400 font-bold text-lg">{formatTime(timer)}</span>
          </span>
          <span className="hidden md:inline text-white/40 text-xs">| Garantia de 7 dias</span>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              <span>Sistema de Vendas High-Ticket</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Funil Completo de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Alta Conversão
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Estrutura otimizada para converter visitantes em clientes. Com upsell, downsell e recuperação de carrinho.
            </p>
          </div>

          {/* Seleção de Plano */}
          {!showUpsell && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {planos.map((plano) => (
                  <div
                    key={plano.id}
                    onClick={() => setSelectedPlan(plano.id)}
                    className={`relative bg-white/[0.02] border rounded-2xl p-6 cursor-pointer transition-all
                      ${selectedPlan === plano.id 
                        ? "border-blue-500/50 bg-blue-500/5" 
                        : "border-white/10 hover:border-white/20"}`}
                  >
                    {plano.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 
                        text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                        Mais Popular
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">{plano.nome}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-white/40 text-sm">R$</span>
                      <span className="text-4xl font-bold text-white">{plano.preco}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plano.recursos.map((rec, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                          <Check className="w-4 h-4 text-blue-400" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                    <div className={`w-full py-3 rounded-xl text-center font-bold text-sm transition-colors
                      ${selectedPlan === plano.id 
                        ? "bg-blue-500 text-white" 
                        : "bg-white/5 text-white/60"}`}>
                      {selectedPlan === plano.id ? "Selecionado" : "Selecionar"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <div className="max-w-xl mx-auto bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Dados do Pagamento</h3>
                  <div className="flex items-center gap-2 text-white/40">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">SSL Seguro</span>
                  </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2">Nome completo</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white 
                        placeholder-white/30 focus:outline-none focus:border-blue-500/50"
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2">E-mail</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white 
                        placeholder-white/30 focus:outline-none focus:border-blue-500/50"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2">
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Dados do cartão (simulado)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.cartao}
                      onChange={(e) => setFormData({ ...formData, cartao: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white 
                        placeholder-white/30 focus:outline-none focus:border-blue-500/50"
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <Gift className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-white/70">
                      Você economizou <span className="text-blue-400 font-bold">R$ 500</span> com esta oferta
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 
                      rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Completar Compra
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Upsell Modal */}
          {showUpsell && (
            <div className="max-w-xl mx-auto bg-gradient-to-br from-blue-500/20 to-cyan-500/20 
              border border-blue-500/30 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-blue-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">
                Oferta Especial!
              </h2>
              
              <p className="text-white/60 mb-6">
                Adicione o <strong className="text-white">Template de E-mail Marketing</strong> por apenas
                <span className="text-2xl font-bold text-blue-400 block mt-2">R$ 97</span>
                <span className="text-white/40 text-sm line-through">R$ 297</span>
              </p>

              <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-white/80 font-medium mb-2">Inclui:</p>
                <ul className="text-sm text-white/50 space-y-1">
                  <li>• 15 templates de e-mail prontos</li>
                  <li>• Sequência de nutrição automática</li>
                  <li>• E-mails de carrinho abandonado</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 
                    rounded-xl hover:opacity-90 transition-opacity"
                >
                  Sim, quero adicionar!
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-transparent text-white/40 text-sm py-3 hover:text-white transition-colors"
                >
                  Não, obrigado
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Compra Realizada!</h2>
              <p className="text-white/60 mb-8">
                Você receberá os acessos no e-mail {formData.email}
              </p>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft size={18} />
                Voltar às demonstrações
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
