import type { LucideIcon } from "lucide-react";
import { Sparkles, Zap, Code, Database, CreditCard, Globe, MessageSquare, Users, Shield, Clock, BarChart3, Flame, ScanEye, MousePointer } from "lucide-react";

export interface Tecnologia {
  nome: string;
  icone: LucideIcon;
}

export interface Solucao {
  id: string;
  nome: string;
  problema: string;
  arquitetura: string;
  tecnologias: Tecnologia[];
  imagemPexels: string;
  cor: string;
  gradientFrom: string;
  gradientTo: string;
  icone: LucideIcon;
  badge?: string;
}

export const solucoes: Solucao[] = [
  {
    id: "captura-automacao",
    nome: "Captura & Automação",
    problema: "Alto volume de leads sem estrutura para atendimento rápido",
    arquitetura: "IA conversacional + Workflows automáticos + Área de membros white-label",
    tecnologias: [
      { nome: "OpenAI", icone: Sparkles },
      { nome: "n8n", icone: Zap },
      { nome: "Next.js", icone: Code },
      { nome: "PostgreSQL", icone: Database },
    ],
    imagemPexels: "technology",
    cor: "#00d4ff",
    gradientFrom: "#00d4ff",
    gradientTo: "#0099cc",
    icone: Users,
  },
  {
    id: "checkout-experiencia",
    nome: "Experiência de Checkout",
    problema: "Abandono de carrinho por fricção excessiva no processo de pagamento",
    arquitetura: "Multi-step fluido + One-click upsell + Recuperação inteligente",
    tecnologias: [
      { nome: "Stripe", icone: CreditCard },
      { nome: "React", icone: Code },
      { nome: "Redis", icone: Database },
      { nome: "Next.js", icone: Globe },
    ],
    imagemPexels: "payment",
    cor: "#7c3aed",
    gradientFrom: "#7c3aed",
    gradientTo: "#5b21b6",
    icone: Zap,
    badge: "Demo Interativa",
  },
  {
    id: "centralizacao",
    nome: "Centralização Operacional",
    problema: "Dados dispersos em múltiplas ferramentas sem comunicação",
    arquitetura: "Dashboard unificado + APIs + Automação + Alertas em tempo real",
    tecnologias: [
      { nome: "Next.js", icone: Globe },
      { nome: "PostgreSQL", icone: Database },
      { nome: "WebSocket", icone: Zap },
      { nome: "n8n", icone: MessageSquare },
    ],
    imagemPexels: "dashboard",
    cor: "#10b981",
    gradientFrom: "#10b981",
    gradientTo: "#047857",
    icone: Shield,
  },
  {
    id: "analytics",
    nome: "Analytics & Tracking",
    problema: "Decisões baseadas em intuição, sem dados sobre comportamento do usuário",
    arquitetura: "Heatmaps + Gravações de sessão + Funis de conversão + A/B testing",
    tecnologias: [
      { nome: "Mixpanel", icone: BarChart3 },
      { nome: "Hotjar", icone: Flame },
      { nome: "Google Analytics", icone: ScanEye },
      { nome: "Mouseflow", icone: MousePointer },
    ],
    imagemPexels: "analytics heatmap",
    cor: "#f97316",
    gradientFrom: "#f97316",
    gradientTo: "#ea580c",
    icone: BarChart3,
  },
];

export interface EtapaProcesso {
  etapa: string;
  titulo: string;
  desc: string;
}

export const etapasProcesso: EtapaProcesso[] = [
  { etapa: "01", titulo: "Diagnóstico", desc: "Mapeamos sua operação e identificamos as dores reais" },
  { etapa: "02", titulo: "Arquitetura", desc: "Definimos a solução base e tecnologias ideais para seu caso" },
  { etapa: "03", titulo: "Personalização", desc: "Adaptamos cada detalhe da arquitetura ao seu contexto" },
  { etapa: "04", titulo: "Entrega", desc: "Deploy, testes e acompanhamento pós-implantação" },
];
