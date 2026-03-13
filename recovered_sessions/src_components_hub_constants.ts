import { Integration, Feature } from "./types";

export const integrations: Integration[] = [
  {
    name: "Stripe",
    desc: "Pagamentos globais",
    icon: "/integrations/stripe.svg",
    accent: "#635BFF",
  },
  {
    name: "n8n",
    desc: "Automação de fluxos",
    icon: "/integrations/n8n.svg",
    accent: "#EA4B71",
  },
  {
    name: "WhatsApp API",
    desc: "Atendimento 24/7",
    icon: "/integrations/whatsapp.svg",
    accent: "#25D366",
  },
  {
    name: "OpenAI",
    desc: "Modelos de linguagem",
    icon: "/integrations/openai.svg",
    accent: "#10A37F",
  },
  {
    name: "AWS",
    desc: "Infraestrutura Cloud",
    icon: "/integrations/aws.svg",
    accent: "#FF9900",
  },
  {
    name: "Meta",
    desc: "Redes & Canais",
    icon: "/integrations/meta.svg",
    accent: "#0081FB",
  },
];

export const features: Feature[] = [
  {
    title: "Checkout que abandona clientes",
    desc: "→ Pagamento fluido que converte em 1 clique",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-transparent"
  },
  {
    title: "Clientes perdidos em planilhas",
    desc: "→ CRM integrado com histórico completo",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    color: "text-blue-400",
    bg: "from-blue-500/20 to-transparent"
  },
  {
    title: "Visitantes que não viram leads",
    desc: "→ Landing pages otimizadas para capturar",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-transparent"
  },
  {
    title: "Vendas perdidas no WhatsApp",
    desc: "→ Atendimento automatizado 24/7",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    color: "text-green-400",
    bg: "from-green-500/20 to-transparent"
  },
  {
    title: "10 abas diferentes para ver dados",
    desc: "→ Dashboard unificado em tempo real",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    color: "text-purple-400",
    bg: "from-purple-500/20 to-transparent"
  }
];

export const montserrat = { fontFamily: "var(--font-montserrat)" } as const;
