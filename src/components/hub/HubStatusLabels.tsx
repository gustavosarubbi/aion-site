"use client";

import { motion } from "framer-motion";

export function HubStatusLabels({ shouldAnimate = true }: { shouldAnimate?: boolean }) {
  const binaryStream = "011010010111";

  return (
    <>
      {/* Top Left - Sync Status */}
      <motion.div
        className="absolute left-[5%] md:left-[-12%] top-[12%] hidden md:flex flex-col items-start gap-2 z-20"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2.5 pl-2 border-l-2 border-cyan-400/60 py-1 bg-gradient-to-r from-cyan-500/5 to-transparent pr-4 rounded-r-lg">
          <div className="w-7 h-7 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-cyan-400 tracking-widest uppercase">Sync.Active</span>
              <motion.span
                animate={{ opacity: shouldAnimate ? [0.3, 1, 0.3] : 1 }}
                transition={shouldAnimate ? { duration: 1.5, repeat: Infinity } : { duration: 0 }}
                className="text-[6px] font-mono text-cyan-500/60"
              >
                {binaryStream}
              </motion.span>
            </div>
            <span className="text-[7px] text-slate-500 font-mono tracking-tighter">NODE_ID: 0x4F7_A1</span>
          </div>
        </div>
      </motion.div>

      {/* Top Right - Stability Status */}
      <motion.div
        className="absolute right-[5%] md:right-[-12%] top-[12%] hidden md:flex flex-col items-end gap-2 z-20"
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2.5 pr-2 border-r-2 border-green-400/60 py-1 bg-gradient-to-l from-green-500/5 to-transparent pl-4 rounded-l-lg flex-row-reverse">
          <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-400/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 flex-row-reverse">
              <span className="text-[9px] font-black text-green-400 tracking-widest uppercase text-right">Core_Stability</span>
              <motion.div
                animate={{ scaleX: shouldAnimate ? [0.8, 1.2, 0.8] : 1 }}
                transition={shouldAnimate ? { duration: 2, repeat: Infinity } : { duration: 0 }}
                className="w-8 h-1 bg-green-500/20 rounded-full overflow-hidden"
              >
                <div className="w-full h-full bg-green-400/40" />
              </motion.div>
            </div>
            <span className="text-[7px] text-slate-500 font-mono text-right">UPTIME_99.998%</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left - Network Status (NEW) */}
      <motion.div
        className="absolute left-[5%] md:left-[-12%] bottom-[12%] hidden md:flex flex-col items-start gap-2 z-20"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2.5 pl-2 border-l-2 border-purple-400/60 py-1 bg-gradient-to-r from-purple-500/5 to-transparent pr-4 rounded-r-lg">
          <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/30 shadow-[0_0_10px_rgba(167,139,250,0.2)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-purple-400 tracking-widest uppercase">Api_Flow</span>
            <div className="flex items-center gap-1">
              <span className="text-[7px] text-slate-500 font-mono">REQ/s:</span>
              <motion.span
                animate={{ color: shouldAnimate ? ["#a78bfa", "#fff", "#a78bfa"] : "#a78bfa" }}
                transition={shouldAnimate ? { duration: 0.5, repeat: Infinity } : { duration: 0 }}
                className="text-[7px] text-purple-300 font-mono font-bold"
              >
                1.4k
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Right - Security Status */}
      <motion.div
        className="absolute right-[5%] md:right-[-12%] bottom-[12%] hidden md:flex flex-col items-end gap-2 z-20"
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2.5 pr-2 border-r-2 border-blue-400/60 py-1 bg-gradient-to-l from-blue-500/5 to-transparent pl-4 rounded-l-lg flex-row-reverse">
          <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-400/30 shadow-[0_0_10px_rgba(96,165,250,0.2)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-blue-400 tracking-widest uppercase text-right">Secure_Vault</span>
            <span className="text-[7px] text-slate-500 font-mono text-right font-bold">AES_256_GCM</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
