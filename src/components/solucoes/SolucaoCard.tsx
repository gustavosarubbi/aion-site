"use client";

import { Solucao } from "@/data/solucoes";
import { CapturaCard } from "./cards/CapturaCard";
import { CheckoutCardInline } from "./cards/CheckoutCardInline";
import { DashboardCard } from "./cards/DashboardCard";
import { AnalyticsCard } from "./cards/AnalyticsCard";

interface SolucaoCardProps {
  solucao: Solucao;
  index: number;
}

export function SolucaoCard({ solucao, index }: SolucaoCardProps) {
  // Renderiza o card específico baseado no ID da solução
  switch (solucao.id) {
    case "captura-automacao":
      return <CapturaCard solucao={solucao} index={index} />;
    
    case "checkout-experiencia":
      // Usa o card inline com experiência de checkout no próprio card
      return <CheckoutCardInline solucao={solucao} index={index} />;
    
    case "centralizacao":
      return <DashboardCard solucao={solucao} index={index} />;
    
    case "analytics":
      return <AnalyticsCard solucao={solucao} index={index} />;
    
    default:
      // Fallback para o card padrão
      return <CheckoutCardInline solucao={solucao} index={index} />;
  }
}
