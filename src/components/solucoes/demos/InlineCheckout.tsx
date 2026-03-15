"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  CreditCard, Check, ChevronLeft, User, Mail, Lock, 
  Shield, Clock, Zap, ArrowRight, X, BadgeCheck 
} from "lucide-react";

interface InlineCheckoutProps {
  cor: string;
  onClose: () => void;
}

export function InlineCheckout({ cor, onClose }: InlineCheckoutProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    nome: "", 
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 3;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const reset = () => {
    setStep(1);
    setIsSuccess(false);
    setFormData({ nome: "", email: "", cardNumber: "", expiry: "", cvv: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-50 bg-[#0a0f1c] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${cor}20`, border: `1px solid ${cor}40` }}
          >
            <CreditCard className="w-4 h-4" style={{ color: cor }} />
          </div>
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Demo</span>
            <p className="text-sm font-medium text-white">Checkout</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Progress */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1">
              <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step >= s ? "100%" : "0%" }}
                  transition={{ duration: 0.4, delay: s * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: step >= s ? cor : "transparent" }}
                />
              </div>
              <p className="text-[9px] text-white/30 mt-1.5 text-center">
                {s === 1 ? "Dados" : s === 2 ? "Pagamento" : "Confirmação"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {step === 1 && (
                <>
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-white mb-1">Dados Pessoais</h4>
                    <p className="text-xs text-white/40">Preencha seus dados para continuar</p>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        placeholder="Nome completo"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={!formData.nome || !formData.email}
                    className="w-full mt-6 py-3.5 rounded-xl text-white text-sm font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: cor }}
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-white mb-1">Pagamento</h4>
                    <p className="text-xs text-white/40">Dados criptografados com SSL</p>
                  </div>

                  {/* Card Preview */}
                  <div 
                    className="p-4 rounded-2xl mb-4 relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${cor}30, ${cor}10)`,
                      border: `1px solid ${cor}40`
                    }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <CreditCard className="w-8 h-8 text-white/80" />
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        ))}
                      </div>
                    </div>
                    <div className="font-mono text-lg text-white tracking-widest mb-2">
                      {formData.cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">{formData.nome || "NOME NO CARTÃO"}</span>
                      <span className="text-white/60">{formData.expiry || "MM/AA"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors font-mono"
                    />
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors font-mono"
                      />
                      <div className="relative w-24">
                        <input
                          type="text"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors font-mono"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={prevStep}
                      className="px-4 py-3.5 rounded-xl text-white/60 text-sm border border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!formData.cardNumber || !formData.expiry}
                      className="flex-1 py-3.5 rounded-xl text-white text-sm font-medium transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2"
                      style={{ background: cor }}
                    >
                      Revisar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-white mb-1">Revisão</h4>
                    <p className="text-xs text-white/40">Confirme seus dados</p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Plano</span>
                      <span className="text-white font-medium">Profissional</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Nome</span>
                      <span className="text-white">{formData.nome}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Email</span>
                      <span className="text-white text-xs">{formData.email}</span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 font-medium">Total</span>
                      <span className="text-xl font-bold" style={{ color: cor }}>R$ 997,00</span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="flex justify-center gap-4 py-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                      <Shield className="w-3.5 h-3.5" />
                      <span>SSL Seguro</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Processo rápido</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={prevStep}
                      className="px-4 py-3.5 rounded-xl text-white/60 text-sm border border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="flex-1 py-3.5 rounded-xl text-white text-sm font-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ background: cor }}
                    >
                      {isProcessing ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Confirmar
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: `${cor}30` }}
              >
                <BadgeCheck className="w-8 h-8" style={{ color: cor }} />
              </motion.div>
              
              <h4 className="text-xl font-bold text-white mb-2">Pagamento Confirmado!</h4>
              <p className="text-xs text-white/50 mb-6">Experiência fluida, sem fricção.</p>

              {/* Success metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-lg font-bold" style={{ color: cor }}>2.3s</div>
                  <div className="text-[10px] text-white/40">Tempo total</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-lg font-bold text-emerald-400">98%</div>
                  <div className="text-[10px] text-white/40">Aprovação</div>
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full py-3 rounded-xl text-white/80 text-sm border border-white/10 hover:bg-white/5 transition-colors"
              >
                Testar Novamente
              </button>
              <button
                onClick={onClose}
                className="w-full mt-2 py-3 text-white/40 text-xs hover:text-white/60 transition-colors"
              >
                Fechar Demo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
