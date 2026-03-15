"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  X, Check, ChevronLeft, CreditCard, User, Mail, ArrowRight,
  ShoppingCart, Package, Shield, Lock, Truck, Percent, Sparkles,
  Zap, ChevronRight, QrCode, Receipt, Landmark, Clock, AlertCircle
} from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  solucaoNome?: string;
  corSolucao?: string;
}

const produtosCarrinho = [
  { id: 1, nome: "Plano Profissional", descricao: "Acesso completo por 12 meses", preco: 997, quantidade: 1, imagem: "/placeholder-product.jpg" },
  { id: 2, nome: "Setup Inicial", descricao: "Configuração e treinamento", preco: 497, quantidade: 1, imagem: "/placeholder-product.jpg" },
];

const upsells = [
  { id: 3, nome: "Suporte Prioritário 24/7", descricao: "Resposta em até 2h", preco: 197, icone: Zap, cor: "#f59e0b" },
  { id: 4, nome: "Consultoria Mensal", descricao: "1h de consultoria/mês", preco: 297, icone: User, cor: "#8b5cf6" },
];

const parcelas = [
  { vezes: 1, valor: 1494, juros: false },
  { vezes: 2, valor: 747, juros: false },
  { vezes: 3, valor: 498, juros: false },
  { vezes: 6, valor: 274, juros: true },
  { vezes: 12, valor: 149.4, juros: true },
];

export function CheckoutModal({ isOpen, onClose, solucaoNome = "Profissional", corSolucao = "#7c3aed" }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    nome: "", 
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix" | "boleto">("cartao");
  const [parcelaSelecionada, setParcelaSelecionada] = useState(1);
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [desconto, setDesconto] = useState(0);
  const [upsellSelecionado, setUpsellSelecionado] = useState<number[]>([]);
  const [cardRotation, setCardRotation] = useState(0);
  const totalSteps = 4;

  const subtotal = produtosCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const valorUpsells = upsellSelecionado.reduce((acc, id) => {
    const up = upsells.find(u => u.id === id);
    return acc + (up?.preco || 0);
  }, 0);
  const total = subtotal + valorUpsells - desconto;
  const parcelaValor = parcelas.find(p => p.vezes === parcelaSelecionada)?.valor || total;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setStep(1);
      setIsSuccess(false);
      setFormData({ nome: "", email: "", telefone: "", cep: "", endereco: "", numero: "", cardNumber: "", cardName: "", expiry: "", cvv: "" });
      setMetodoPagamento("cartao");
      setParcelaSelecionada(1);
      setCupom("");
      setCupomAplicado(false);
      setDesconto(0);
      setUpsellSelecionado([]);
      setCardRotation(0);
    }
  }, [isOpen]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const aplicarCupom = () => {
    if (cupom.toLowerCase() === "primeira10") {
      setDesconto(subtotal * 0.1);
      setCupomAplicado(true);
    }
  };

  const toggleUpsell = (id: number) => {
    setUpsellSelecionado(prev => 
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const updateCardRotation = (field: string, value: string) => {
    if (field === "cardNumber") {
      setCardRotation(value ? 5 : 0);
    } else if (field === "cvv") {
      setCardRotation(value ? 180 : 0);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="relative w-full max-w-5xl bg-[#0a0f1c] rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Left Side - Order Summary */}
          <div className="hidden md:flex md:w-1/3 bg-white/[0.02] border-r border-white/5 flex-col">
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${corSolucao}20`, border: `1px solid ${corSolucao}40` }}
                >
                  <ShoppingCart className="w-5 h-5" style={{ color: corSolucao }} />
                </div>
                <div>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Resumo</span>
                  <p className="text-sm text-white font-medium">Seu Pedido</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Products */}
              {produtosCarrinho.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-white/20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{item.nome}</h4>
                    <p className="text-xs text-white/40">{item.descricao}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-white/60">Qtd: {item.quantidade}</span>
                      <span className="text-sm font-medium text-white">R$ {item.preco.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsells Selecionados */}
              {upsellSelecionado.length > 0 && (
                <>
                  <div className="h-px bg-white/10" />
                  <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Adicionais</p>
                  {upsells.filter(u => upsellSelecionado.includes(u.id)).map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.cor}20` }}>
                        <item.icone className="w-4 h-4" style={{ color: item.cor }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">{item.nome}</h4>
                        <p className="text-xs text-emerald-400">+ R$ {item.preco}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Coupon */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/40 mb-2">Cupom de desconto</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                    placeholder="PRIMEIRA10"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 uppercase"
                  />
                  <button
                    onClick={aplicarCupom}
                    disabled={!cupom || cupomAplicado}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white disabled:opacity-40 transition-colors"
                    style={{ background: corSolucao }}
                  >
                    Aplicar
                  </button>
                </div>
                {cupomAplicado && (
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Cupom aplicado! -10% de desconto
                  </p>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toLocaleString()}</span>
                </div>
                {desconto > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto</span>
                    <span>- R$ {desconto.toLocaleString()}</span>
                  </div>
                )}
                {valorUpsells > 0 && (
                  <div className="flex justify-between text-white/60">
                    <span>Adicionais</span>
                    <span>R$ {valorUpsells.toLocaleString()}</span>
                  </div>
                )}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between items-baseline">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-2xl font-bold text-white">R$ {total.toLocaleString()}</span>
                </div>
                {metodoPagamento === "cartao" && parcelaSelecionada > 1 && (
                  <p className="text-xs text-white/40 text-right">
                    ou {parcelaSelecionada}x de R$ {parcelaValor.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Checkout Flow */}
          <div className="flex-1 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="md:hidden flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${corSolucao}20`, border: `1px solid ${corSolucao}40` }}
                >
                  <ShoppingCart className="w-5 h-5" style={{ color: corSolucao }} />
                </div>
                <div>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Demo Checkout</span>
                  <p className="text-sm text-white font-medium">{solucaoNome}</p>
                </div>
              </div>
              <div className="hidden md:block" />
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-6 pt-6">
              <div className="flex items-center gap-3">
                {["Carrinho", "Dados", "Pagamento", "Confirmação"].map((label, i) => {
                  const stepNumber = i + 1;
                  const isActive = step >= stepNumber;
                  const isCurrent = step === stepNumber;
                  
                  return (
                    <div key={i} className="flex-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                          style={{
                            background: isActive ? corSolucao : "rgba(255,255,255,0.1)",
                            color: isActive ? "white" : "rgba(255,255,255,0.4)"
                          }}
                        >
                          {isActive && step > stepNumber ? <Check className="w-3.5 h-3.5" /> : stepNumber}
                        </div>
                        <span className={`text-xs ${isCurrent ? "text-white" : "text-white/40"} hidden sm:inline`}>
                          {label}
                        </span>
                      </div>
                      {i < 3 && (
                        <div className="h-0.5 ml-3 mt-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: step > stepNumber ? "100%" : "0%" }}
                            className="h-full rounded-full"
                            style={{ background: corSolucao }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 1: Carrinho (Mobile Only) */}
                    {step === 1 && (
                      <div className="md:hidden space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4">Seu Carrinho</h3>
                        {produtosCarrinho.map((item) => (
                          <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                              <Package className="w-5 h-5 text-white/20" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white">{item.nome}</h4>
                              <p className="text-xs text-white/40">{item.descricao}</p>
                              <p className="text-sm font-medium text-white mt-1">R$ {item.preco.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}

                        {/* Upsells */}
                        <div className="mt-6">
                          <p className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            Complete seu pedido
                          </p>
                          <div className="space-y-3">
                            {upsells.map((upsell) => (
                              <motion.div
                                key={upsell.id}
                                onClick={() => toggleUpsell(upsell.id)}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                  upsellSelecionado.includes(upsell.id)
                                    ? "border-emerald-500/50 bg-emerald-500/10"
                                    : "border-white/10 bg-white/5 hover:border-white/20"
                                }`}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: `${upsell.cor}20` }}
                                  >
                                    <upsell.icone className="w-4 h-4" style={{ color: upsell.cor }} />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-white">{upsell.nome}</h4>
                                    <p className="text-xs text-white/40">{upsell.descricao}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-white">R$ {upsell.preco}</p>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                                      upsellSelecionado.includes(upsell.id)
                                        ? "border-emerald-500 bg-emerald-500"
                                        : "border-white/20"
                                    }`}>
                                      {upsellSelecionado.includes(upsell.id) && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Coupon Mobile */}
                        <div className="pt-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={cupom}
                              onChange={(e) => setCupom(e.target.value)}
                              placeholder="Cupom"
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                            />
                            <button
                              onClick={aplicarCupom}
                              disabled={!cupom || cupomAplicado}
                              className="px-4 py-2 rounded-xl text-sm font-medium text-white disabled:opacity-40"
                              style={{ background: corSolucao }}
                            >
                              Aplicar
                            </button>
                          </div>
                        </div>

                        {/* Mobile Total */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Total</span>
                            <span className="text-xl font-bold text-white">R$ {total.toLocaleString()}</span>
                          </div>
                        </div>

                        <button
                          onClick={nextStep}
                          className="w-full py-4 rounded-2xl text-white text-sm font-medium flex items-center justify-center gap-2"
                          style={{ background: `linear-gradient(135deg, ${corSolucao}, ${corSolucao}80)` }}
                        >
                          Continuar
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Dados Pessoais */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">Dados Pessoais</h3>
                          <p className="text-sm text-white/40">Preencha seus dados para entrega</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Nome Completo</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="text"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                placeholder="João Silva"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                              />
                            </div>
                          </div>
                          <div className="col-span-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="joao@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Telefone</label>
                            <input
                              type="tel"
                              value={formData.telefone}
                              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                              placeholder="(11) 99999-9999"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">CEP</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={formData.cep}
                                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                                placeholder="00000-000"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                              />
                              {formData.cep.length >= 8 && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                  <Check className="w-4 h-4 text-emerald-400" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Endereço</label>
                            <input
                              type="text"
                              value={formData.endereco}
                              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                              placeholder="Rua, número, complemento"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Security Badges */}
                        <div className="flex items-center justify-center gap-4 pt-4">
                          <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                            <Lock className="w-3.5 h-3.5" />
                            <span>SSL Seguro</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Dados criptografados</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                            <Truck className="w-3.5 h-3.5" />
                            <span>Entrega garantida</span>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={prevStep}
                            className="px-4 py-4 rounded-2xl text-white/60 text-sm border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-1"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Voltar
                          </button>
                          <button
                            onClick={nextStep}
                            disabled={!formData.nome || !formData.email}
                            className="flex-1 py-4 rounded-2xl text-white text-sm font-medium transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2"
                            style={{ background: `linear-gradient(135deg, ${corSolucao}, ${corSolucao}80)` }}
                          >
                            Continuar para Pagamento
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Pagamento */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">Pagamento</h3>
                          <p className="text-sm text-white/40">Escolha como quer pagar</p>
                        </div>

                        {/* Payment Methods */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "cartao", label: "Cartão", icon: CreditCard },
                            { id: "pix", label: "PIX", icon: QrCode },
                            { id: "boleto", label: "Boleto", icon: Receipt },
                          ].map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setMetodoPagamento(method.id as typeof metodoPagamento)}
                              className={`p-3 rounded-xl border text-center transition-all ${
                                metodoPagamento === method.id
                                  ? "border-white/30 bg-white/10"
                                  : "border-white/10 bg-white/5 hover:border-white/20"
                              }`}
                            >
                              <method.icon 
                                className="w-5 h-5 mx-auto mb-1" 
                                style={{ color: metodoPagamento === method.id ? corSolucao : "rgba(255,255,255,0.5)" }}
                              />
                              <span className={`text-xs ${metodoPagamento === method.id ? "text-white" : "text-white/50"}`}>
                                {method.label}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Card Payment */}
                        {metodoPagamento === "cartao" && (
                          <div className="space-y-4">
                            {/* 3D Card */}
                            <div className="perspective-1000">
                              <motion.div
                                className="relative w-full aspect-[1.58] rounded-2xl overflow-hidden cursor-pointer"
                                style={{
                                  transformStyle: "preserve-3d",
                                  background: `linear-gradient(135deg, ${corSolucao}40, ${corSolucao}20)`,
                                }}
                                animate={{ rotateY: cardRotation }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              >
                                {/* Front */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between" style={{ backfaceVisibility: "hidden" }}>
                                  <div className="flex justify-between items-start">
                                    <div className="flex gap-1">
                                      {[1, 2].map((i) => (
                                        <div key={i} className="w-10 h-8 rounded bg-white/20" />
                                      ))}
                                    </div>
                                    <CreditCard className="w-8 h-8 text-white/80" />
                                  </div>
                                  <div>
                                    <div className="font-mono text-lg text-white tracking-widest mb-4">
                                      {formData.cardNumber || "•••• •••• •••• ••••"}
                                    </div>
                                    <div className="flex justify-between items-end">
                                      <div>
                                        <div className="text-[10px] text-white/50 uppercase">Titular</div>
                                        <div className="text-sm text-white/80 uppercase">{formData.cardName || "NOME NO CARTÃO"}</div>
                                      </div>
                                      <div>
                                        <div className="text-[10px] text-white/50 uppercase">Validade</div>
                                        <div className="text-sm text-white/80">{formData.expiry || "MM/AA"}</div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Shine effect */}
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                  />
                                </div>

                                {/* Back */}
                                <div 
                                  className="absolute inset-0 p-6 flex flex-col justify-center" 
                                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                >
                                  <div className="h-10 bg-black/50 mb-4" />
                                  <div className="flex items-center justify-end gap-2">
                                    <span className="text-[10px] text-white/50">CVV</span>
                                    <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center">
                                      <span className="text-sm text-white/80 font-mono">{formData.cvv || "•••"}</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>

                            {/* Card Form */}
                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Número do Cartão</label>
                                <input
                                  type="text"
                                  value={formData.cardNumber}
                                  onChange={(e) => {
                                    setFormData({ ...formData, cardNumber: e.target.value });
                                    updateCardRotation("cardNumber", e.target.value);
                                  }}
                                  onFocus={() => setCardRotation(0)}
                                  placeholder="0000 0000 0000 0000"
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors font-mono tracking-wider"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Nome no Cartão</label>
                                <input
                                  type="text"
                                  value={formData.cardName}
                                  onChange={(e) => {
                                    setFormData({ ...formData, cardName: e.target.value });
                                    updateCardRotation("cardName", e.target.value);
                                  }}
                                  onFocus={() => setCardRotation(0)}
                                  placeholder="NOME COMO ESTÁ NO CARTÃO"
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors uppercase"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Validade</label>
                                  <input
                                    type="text"
                                    value={formData.expiry}
                                    onChange={(e) => {
                                      setFormData({ ...formData, expiry: e.target.value });
                                      updateCardRotation("expiry", e.target.value);
                                    }}
                                    onFocus={() => setCardRotation(0)}
                                    placeholder="MM/AA"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">CVV</label>
                                  <input
                                    type="text"
                                    value={formData.cvv}
                                    onChange={(e) => {
                                      setFormData({ ...formData, cvv: e.target.value });
                                      updateCardRotation("cvv", e.target.value);
                                    }}
                                    onFocus={() => setCardRotation(180)}
                                    onBlur={() => setCardRotation(formData.cardNumber ? 5 : 0)}
                                    placeholder="123"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors font-mono"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Installments */}
                            <div>
                              <label className="text-[10px] text-white/40 uppercase tracking-wider mb-2 block">Parcelamento</label>
                              <div className="grid grid-cols-2 gap-2">
                                {parcelas.map((p) => (
                                  <button
                                    key={p.vezes}
                                    onClick={() => setParcelaSelecionada(p.vezes)}
                                    className={`p-3 rounded-xl border text-left transition-all ${
                                      parcelaSelecionada === p.vezes
                                        ? "border-white/30 bg-white/10"
                                        : "border-white/10 hover:border-white/20"
                                    }`}
                                  >
                                    <div className="text-sm text-white font-medium">
                                      {p.vezes}x de R$ {p.valor.toLocaleString()}
                                    </div>
                                    <div className={`text-[10px] ${p.juros ? "text-yellow-400" : "text-emerald-400"}`}>
                                      {p.juros ? "Com juros" : "Sem juros"}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PIX Payment */}
                        {metodoPagamento === "pix" && (
                          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-white p-2">
                              <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <QrCode className="w-12 h-12 text-white" />
                              </div>
                            </div>
                            <h4 className="text-white font-medium mb-2">Pagamento via PIX</h4>
                            <p className="text-sm text-white/60 mb-4">Escaneie o QR code ou copie o código PIX</p>
                            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                              <code className="text-xs text-white/40 font-mono">00020126580014br.gov.bcb...</code>
                              <button className="text-emerald-400 text-xs font-medium hover:text-emerald-300">Copiar</button>
                            </div>
                            <p className="text-xs text-emerald-400 mt-3 flex items-center justify-center gap-1">
                              <Zap className="w-3 h-3" />
                              Aprovação instantânea
                            </p>
                          </div>
                        )}

                        {/* Boleto Payment */}
                        {metodoPagamento === "boleto" && (
                          <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                              <Receipt className="w-8 h-8 text-yellow-400" />
                            </div>
                            <h4 className="text-white font-medium mb-2">Pagamento via Boleto</h4>
                            <p className="text-sm text-white/60 mb-4">O boleto será gerado após confirmar</p>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                              <div className="flex items-center justify-center gap-2 text-yellow-400">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Vencimento em 3 dias úteis</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={prevStep}
                            className="px-4 py-4 rounded-2xl text-white/60 text-sm border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-1"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Voltar
                          </button>
                          <button
                            onClick={nextStep}
                            className="flex-1 py-4 rounded-2xl text-white text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            style={{ background: `linear-gradient(135deg, ${corSolucao}, ${corSolucao}80)` }}
                          >
                            {metodoPagamento === "cartao" ? "Pagar" : "Gerar"} R$ {total.toLocaleString()}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Confirmação */}
                    {step === 4 && (
                      <div className="space-y-6 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                          style={{ background: `${corSolucao}20` }}
                        >
                          <Check className="w-10 h-10" style={{ color: corSolucao }} />
                        </motion.div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Pagamento Confirmado!</h3>
                          <p className="text-white/60">Seu pedido foi processado com sucesso</p>
                        </div>

                        {/* Order Details */}
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Número do pedido</span>
                              <span className="text-white font-mono">#84729</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Método</span>
                              <span className="text-white capitalize">{metodoPagamento === "cartao" ? `Cartão (${parcelaSelecionada}x)` : metodoPagamento}</span>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div className="flex justify-between items-center">
                              <span className="text-white font-medium">Total pago</span>
                              <span className="text-xl font-bold text-white">R$ {total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Upsells after purchase */}
                        <div className="space-y-3">
                          <p className="text-sm text-white/60">Aproveite e complete seu pacote:</p>
                          {upsells.filter(u => !upsellSelecionado.includes(u.id)).map((upsell) => (
                            <motion.div
                              key={upsell.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleUpsell(upsell.id)}
                              className="p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:border-white/20 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                                  style={{ background: `${upsell.cor}20` }}
                                >
                                  <upsell.icone className="w-5 h-5" style={{ color: upsell.cor }} />
                                </div>
                                <div className="flex-1 text-left">
                                  <h4 className="text-sm font-medium text-white">{upsell.nome}</h4>
                                  <p className="text-xs text-white/40">{upsell.descricao}</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-bold text-white">+ R$ {upsell.preco}</span>
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ml-auto ${
                                    upsellSelecionado.includes(upsell.id)
                                      ? "border-emerald-500 bg-emerald-500"
                                      : "border-white/20"
                                  }`}>
                                    {upsellSelecionado.includes(upsell.id) && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <button
                          onClick={onClose}
                          className="w-full py-4 rounded-2xl text-white text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors"
                        >
                          Fechar Demo
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full py-12"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full border-4 border-white/10 border-t-white mb-6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <h3 className="text-lg font-semibold text-white mb-2">Processando pagamento...</h3>
                    <p className="text-sm text-white/40">Não feche esta janela</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
