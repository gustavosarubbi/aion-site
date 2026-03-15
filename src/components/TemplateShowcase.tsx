"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Shield, Sparkles } from "lucide-react";
import { solucoes } from "@/data/solucoes";
import { SolucaoCard } from "./solucoes/SolucaoCard";
import { ProcessoTimelineV2 } from "./processos/ProcessoTimelineV2";

export default function TemplateShowcase() {
  return (
    <section
      id="solucoes"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#000000]"
    >
      {/* Background Effects - Premium */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Aurora gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-gradient-to-b from-cyan-500/[0.03] via-blue-500/[0.02] to-transparent blur-[150px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[900px] h-[500px] bg-gradient-to-l from-violet-500/[0.03] via-purple-500/[0.02] to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/[0.02] to-transparent blur-[100px] rounded-full" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} 
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 md:mb-24 space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-cyan-400/80 uppercase">
                Arquiteturas Validadas
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white/90">Sistemas que</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                Resolvem Problemas
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Cada solução é uma arquitetura completa projetada para operações específicas.
            <span className="text-cyan-400"> Personalizamos</span> cada detalhe para seu contexto.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center gap-8 md:gap-12 pt-4"
          >
            {[
              { value: "50+", label: "Projetos Entregues" },
              { value: "98%", label: "Satisfação" },
              { value: "14d", label: "Tempo Médio" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solucoes.map((solucao, index) => (
            <SolucaoCard key={solucao.id} solucao={solucao} index={index} />
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-32 md:mt-40"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mb-4"
            >
              Como Trabalhamos
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              Do Diagnóstico à Entrega
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 mt-4 max-w-xl mx-auto"
            >
              Processo refinado em mais de 50 projetos para garantir entregas de excelência
            </motion.p>
          </div>

          {/* Timeline */}
          <ProcessoTimelineV2 />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-32 md:mt-40 text-center"
        >
          <div className="relative inline-flex flex-col items-center gap-8 p-10 md:p-14 rounded-[48px] bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] max-w-2xl mx-auto overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-50" />
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Pronto para sua arquitetura?
              </h3>
              <p className="text-white/40 text-sm md:text-base max-w-md mx-auto">
                Analisamos seu caso em uma consultoria gratuita. Sem compromisso, sem burocracia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center pt-4">
                <Link
                  href="https://wa.me/SEUNUMERO"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 rounded-2xl text-white font-medium text-sm shadow-[0_12px_40px_rgba(6,182,212,0.3)] hover:shadow-[0_16px_50px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  Agendar Consultoria
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 text-white/30 text-xs pt-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  30 minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Sem compromisso
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
