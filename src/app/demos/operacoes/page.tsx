"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bell, TrendingUp, Users, DollarSign, Activity, Check, type LucideIcon } from "lucide-react";

// Hook para animar números
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function para suavizar
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
}

// Componente de métrica animada
function MetricCard({ 
  label, 
  value, 
  prefix = "", 
  suffix = "", 
  trend,
  icon: Icon,
  color 
}: { 
  label: string; 
  value: number; 
  prefix?: string; 
  suffix?: string;
  trend: string;
  icon: LucideIcon;
  color: string;
}) {
  const animatedValue = useCountUp(value);
  
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
    green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
  };
  
  const style = colors[color] || colors.blue;
  
  return (
    <div className={`bg-white/[0.02] border ${style.border} rounded-xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${style.text}`} />
        </div>
        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <p className="text-white/40 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">
        {prefix}{animatedValue.toLocaleString()}{suffix}
      </p>
    </div>
  );
}

// Componente de gráfico simples (barras)
function SimpleChart() {
  const data = [
    { label: "Jan", value: 45 },
    { label: "Fev", value: 62 },
    { label: "Mar", value: 78 },
    { label: "Abr", value: 91 },
    { label: "Mai", value: 85 },
    { label: "Jun", value: 100 },
  ];
  
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-bold mb-6">Vendas por Mês</h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-gradient-to-t from-blue-500/80 to-cyan-400/80 rounded-t-lg 
                transition-all duration-1000 ease-out"
              style={{ 
                height: `${item.value}%`,
                animationDelay: `${i * 100}ms`
              }}
            />
            <span className="text-xs text-white/40">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Toast Notification
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 
      rounded-xl px-6 py-4 flex items-center gap-3 shadow-2xl animate-slide-up z-50">
      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
        <Bell className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-white/80 text-sm">{message}</p>
    </div>
  );
}

export default function DemoOperacoes() {
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("vendas");
  
  const showNotification = (message: string) => {
    setToast(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/demos" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm">Voltar à Galeria</span>
          </Link>
          <span className="text-xs font-bold tracking-wider text-sky-400 uppercase px-3 py-1 bg-sky-500/10 rounded-full">
            Demo: Operações
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Operações</h1>
            <p className="text-white/40">Visão completa do seu negócio em tempo real</p>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <MetricCard 
              label="Vendas Totais"
              value={1247}
              prefix="R$ "
              trend="+12%"
              icon={DollarSign}
              color="green"
            />
            <MetricCard 
              label="Novos Leads"
              value={3842}
              trend="+8%"
              icon={Users}
              color="blue"
            />
            <MetricCard 
              label="Taxa de Conversão"
              value={15}
              suffix="%"
              trend="+3%"
              icon={TrendingUp}
              color="purple"
            />
            <MetricCard 
              label="Ticket Médio"
              value={647}
              prefix="R$ "
              trend="+5%"
              icon={Activity}
              color="orange"
            />
          </div>

          {/* Gráfico + Ações */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SimpleChart />
            </div>
            
            {/* Painel de Ações */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => showNotification("Novo relatório gerado com sucesso!")}
                  className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg 
                    text-white/70 text-sm transition-colors flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Gerar Relatório Mensal
                </button>
                <button 
                  onClick={() => showNotification("Exportação iniciada...")}
                  className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg 
                    text-white/70 text-sm transition-colors flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  Exportar Dados
                </button>
                <button 
                  onClick={() => showNotification("Alerta configurado!")}
                  className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg 
                    text-white/70 text-sm transition-colors flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  Configurar Alertas
                </button>
                <button 
                  onClick={() => showNotification("Sincronização em andamento...")}
                  className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg 
                    text-white/70 text-sm transition-colors flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Sincronizar APIs
                </button>
              </div>
            </div>
          </div>

          {/* Tabela de Dados */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-bold">Últimas Transações</h3>
              <div className="flex gap-2">
                {["vendas", "leads", "tarefas"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors
                      ${activeTab === tab 
                        ? "bg-sky-500/20 text-sky-400" 
                        : "text-white/40 hover:text-white/60"}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-white/[0.02]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">Cliente</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">Data</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-white/40 uppercase">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { cliente: "João Silva", status: "Concluído", data: "Hoje, 14:30", valor: "R$ 997,00" },
                  { cliente: "Maria Santos", status: "Pendente", data: "Hoje, 12:15", valor: "R$ 1.497,00" },
                  { cliente: "Pedro Costa", status: "Concluído", data: "Ontem, 18:45", valor: "R$ 497,00" },
                  { cliente: "Ana Lima", status: "Processando", data: "Ontem, 16:20", valor: "R$ 2.997,00" },
                  { cliente: "Carlos Souza", status: "Concluído", data: "Ontem, 11:10", valor: "R$ 997,00" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-white/80 text-sm">{item.cliente}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                        ${item.status === "Concluído" ? "bg-green-500/10 text-green-400" : 
                          item.status === "Pendente" ? "bg-yellow-500/10 text-yellow-400" : 
                          "bg-blue-500/10 text-blue-400"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full 
                          ${item.status === "Concluído" ? "bg-green-400" : 
                            item.status === "Pendente" ? "bg-yellow-400" : "bg-blue-400"}`} />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-sm">{item.data}</td>
                    <td className="px-6 py-4 text-right text-white font-medium">{item.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="https://cal.com/qodec/demonstracao"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 
                text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Quero um Dashboard Como Este
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
