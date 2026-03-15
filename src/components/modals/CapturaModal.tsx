"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
  X, MessageSquare, Bot, User, Send, Sparkles, Zap, 
  Users, TrendingUp, ArrowRight, CheckCircle, Clock,
  Workflow, GitBranch
} from "lucide-react";

interface CapturaModalProps {
  isOpen: boolean;
  onClose: () => void;
  solucaoNome?: string;
  corSolucao?: string;
}

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

const respostasAutomaticas: Record<string, string> = {
  "preço": "Nossos planos começam em R$ 997/mês. Quer que eu envie uma proposta personalizada para seu email?",
  "valor": "Investimento a partir de R$ 997. Posso calcular o ROI estimado para sua operação?",
  "funciona": "Funciona assim: nossa IA analisa cada lead em segundos, qualifica automaticamente e encaminha apenas os hot leads para seu time. Taxa de conversão média: 35%",
  "automação": "Automatizamos 80% do atendimento inicial. Isso significa que seu time foca apenas nos leads quentes, enquanto a IA nutre os outros.",
  "demo": "Claro! Posso mostrar como funciona na prática. Veja alguns números reais:",
  "oi": "Olá! Sou a IA de atendimento da Qodec. Como posso ajudar você hoje?",
  "olá": "Oi! Estou aqui para tirar suas dúvidas sobre nossas soluções de automação. O que gostaria de saber?",
  "tempo": "Implementação em até 14 dias. Já inclui treinamento, integração e acompanhamento.",
  "integração": "Integramos com WhatsApp, Instagram, Facebook, e-mail e qualquer outro canal que você use. Tudo centralizado.",
  "suporte": "Suporte 24/7 com resposta em até 2h. E temos um time dedicado para implementação.",
};

const defaultResponse = "Interessante! Para entender melhor sua necessidade, posso agendar uma consulta gratuita de 30 minutos? Podemos ver exatamente como isso se aplica ao seu negócio.";

export function CapturaModal({ isOpen, onClose, solucaoNome = "Captura & Automação", corSolucao = "#00d4ff" }: CapturaModalProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "fluxo" | "metricas">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setMessages([
      { id: 1, type: "bot", text: "Olá! Sou a IA de atendimento da Qodec. Como posso ajudar você hoje?", timestamp: new Date() }
    ]);
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadsCapturados, setLeadsCapturados] = useState(127);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setMessages([
        { id: 1, type: "bot", text: "Olá! Sou a IA de atendimento da Qodec. Como posso ajudar você hoje?", timestamp: new Date() }
      ]);
      setInputValue("");
      setActiveTab("chat");
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(respostasAutomaticas)) {
      if (lowerMsg.includes(key)) return response;
    }
    return defaultResponse;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMsg.text);
      const botMsg: Message = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      
      if (messages.length === 1) {
        setLeadsCapturados(prev => prev + 1);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="relative w-full max-w-4xl bg-[#0a0f1c] rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${corSolucao}20`, border: `1px solid ${corSolucao}40` }}
              >
                <Bot className="w-5 h-5" style={{ color: corSolucao }} />
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Demo IA</span>
                <p className="text-sm text-white font-medium">{solucaoNome}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {[
              { id: "chat", label: "Chat Demo", icon: MessageSquare },
              { id: "fluxo", label: "Fluxo de Automação", icon: Workflow },
              { id: "metricas", label: "Métricas", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: corSolucao }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {activeTab === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <Users className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                      <div className="text-2xl font-bold text-white">{leadsCapturados}</div>
                      <div className="text-xs text-white/40">Leads Capturados</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <CheckCircle className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
                      <div className="text-2xl font-bold text-white">34%</div>
                      <div className="text-xs text-white/40">Taxa de Conversão</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <Clock className="w-5 h-5 mx-auto mb-2 text-violet-400" />
                      <div className="text-2xl font-bold text-white">&lt;2s</div>
                      <div className="text-xs text-white/40">Tempo Resposta</div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-[300px] overflow-y-auto space-y-3">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                            msg.type === "user" 
                              ? "bg-cyan-500/20 text-white border border-cyan-500/30 rounded-br-md" 
                              : "bg-white/5 text-white/90 border border-white/10 rounded-bl-md"
                          }`}
                        >
                          {msg.type === "bot" && (
                            <div className="flex items-center gap-1.5 mb-1">
                              <Bot className="w-3.5 h-3.5" style={{ color: corSolucao }} />
                              <span className="text-[10px] uppercase tracking-wider" style={{ color: corSolucao }}>IA</span>
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <span className="text-[10px] text-white/30 mt-1 block">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-bl-md">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Bot className="w-3.5 h-3.5" style={{ color: corSolucao }} />
                            <span className="text-[10px] uppercase tracking-wider" style={{ color: corSolucao }}>IA</span>
                          </div>
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-white/40"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua mensagem..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300 disabled:opacity-40 flex items-center gap-2"
                      style={{ background: corSolucao }}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Preço", "Como funciona?", "Demo", "Integração"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInputValue(suggestion);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "fluxo" && (
                <motion.div
                  key="fluxo"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Fluxo de Automação</h3>
                    <p className="text-sm text-white/40">Veja como a IA processa cada interação</p>
                  </div>

                  <div className="relative">
                    {[
                      { step: 1, title: "Lead Chega", desc: "Mensagem recebida", icon: MessageSquare, color: "#06b6d4" },
                      { step: 2, title: "IA Analisa", desc: "Processamento em &lt;2s", icon: Sparkles, color: "#8b5cf6" },
                      { step: 3, title: "Resposta", desc: "Mensagem personalizada", icon: Bot, color: "#10b981" },
                      { step: 4, title: "Qualificação", desc: "Lead scoring automático", icon: CheckCircle, color: "#f59e0b" },
                      { step: 5, title: "Encaminhamento", desc: "Para equipe humana", icon: Users, color: "#ef4444" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 mb-4"
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                        >
                          <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{item.title}</span>
                            <span 
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{ background: `${item.color}20`, color: item.color }}
                            >
                              Step {item.step}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                        {index < 4 && (
                          <div className="hidden md:block">
                            <ArrowRight className="w-4 h-4 text-white/20" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-white font-medium mb-1">Economia de Tempo</p>
                        <p className="text-xs text-white/50">
                          Com automação, seu time economiza 6h/dia em atendimento inicial, 
                          focando apenas nos leads qualificados.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "metricas" && (
                <motion.div
                  key="metricas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Métricas em Tempo Real</h3>
                    <p className="text-sm text-white/40">Resultados de clientes reais</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Resposta", value: "&lt;2s", desc: "Tempo médio", color: "#06b6d4" },
                      { label: "Automação", value: "80%", desc: "Do atendimento", color: "#8b5cf6" },
                      { label: "Satisfação", value: "98%", desc: "NPS dos clientes", color: "#10b981" },
                      { label: "ROI", value: "340%", desc: "Retorno médio", color: "#f59e0b" },
                    ].map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center"
                      >
                        <div 
                          className="text-3xl font-bold mb-1"
                          style={{ color: metric.color }}
                        >
                          {metric.value}
                        </div>
                        <div className="text-sm text-white font-medium mb-1">{metric.label}</div>
                        <div className="text-xs text-white/40">{metric.desc}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-white font-medium">Leads Capturados</span>
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +127% este mês
                      </span>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {[40, 55, 45, 70, 85, 60, 90, 75, 95, 110, 127].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/40 to-cyan-400/60"
                          initial={{ height: 0 }}
                          animate={{ height: `${(h / 127) * 100}%` }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-white/30 mt-2">
                      {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov"].map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/40">IA Online</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-sm font-medium text-white/80 border border-white/10 hover:bg-white/5 transition-colors"
              >
                Fechar Demo
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
