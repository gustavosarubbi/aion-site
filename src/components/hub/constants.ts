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
    title: "Sincronização Realtime", 
    desc: "Fluxos de dados instantâneos em todo o ecossistema.", 
    icon: "M13 10V3L4 14h7v7l9-11h-7z", 
    color: "text-cyan-400", 
    bg: "from-cyan-500/10 to-transparent" 
  },
  { 
    title: "Arquitetura Segura", 
    desc: "Criptografia de ponta a ponta e redundância total.", 
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", 
    color: "text-blue-400", 
    bg: "from-blue-500/10 to-transparent" 
  },
  { 
    title: "Setup Ultra Rápido", 
    desc: "Integrações prontas para rodar em menos de 48 horas.", 
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", 
    color: "text-green-400", 
    bg: "from-green-500/10 to-transparent" 
  },
  { 
    title: "Escalabilidade Elite", 
    desc: "Infraestrutura preparada para volumes massivos.", 
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", 
    color: "text-purple-400", 
    bg: "from-purple-500/10 to-transparent" 
  },
];

export const montserrat = { fontFamily: "var(--font-montserrat)" } as const;
