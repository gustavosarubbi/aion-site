"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Engenharia", href: "#engenharia" },
    { name: "Integrações", href: "#integracoes" },
    { name: "Sistemas", href: "#sistemas" },
    { name: "FAQ", href: "#faq" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);
    const lastHeaderHeightRef = useRef(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(() => {
                const next = window.scrollY > 20;
                setIsScrolled((prev) => (prev === next ? prev : next));
                ticking = false;
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || !headerRef.current) return;

        let rafId: number | null = null;

        const updateHeaderHeight = () => {
            if (rafId !== null) return;

            rafId = window.requestAnimationFrame(() => {
                rafId = null;

                const currentHeader = headerRef.current;
                if (!currentHeader) return;

                const h = Math.ceil(currentHeader.offsetHeight || currentHeader.getBoundingClientRect().height || 88);

                if (h === lastHeaderHeightRef.current) return;

                lastHeaderHeightRef.current = h;
                document.documentElement.style.setProperty("--header-height", `${h}px`);
            });
        };

        updateHeaderHeight();

        const resizeObserver = new ResizeObserver(() => updateHeaderHeight());
        resizeObserver.observe(headerRef.current);
        window.addEventListener("resize", updateHeaderHeight, { passive: true });

        return () => {
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateHeaderHeight);
        };
    }, []);

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-1 lg:pt-5 xl:pt-6 2xl:pt-1 pb-2 transition-all duration-300 ${isScrolled ? "pb-1 sm:pb-1.5" : "pb-2 sm:pb-3"
                    }`}
            >
                <div className="w-full max-w-7xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 flex justify-center">
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full flex items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-10 2xl:px-8 py-1 sm:py-1 2xl:py-3 rounded-full transition-all duration-500 border ${isScrolled
                            ? "bg-[#020510]/80 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                            : "bg-white/[0.02] backdrop-blur-md border-white/[0.05] shadow-lg"
                            }`}
                    >
                        {/* Logo */}
                        <a href="#inicio" className="flex items-center gap-2.5 group">
                            <div className="relative">
                                <Image
                                    src="/AionLogo.png"
                                    alt="Qodec Logo"
                                    width={30}
                                    height={30}
                                    priority
                                    className="h-7 w-7 sm:h-8 sm:w-8 2xl:h-9 2xl:w-9 object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <span className="text-white font-extrabold tracking-[0.2em] text-[13px] sm:text-[14px] 2xl:text-[16px] leading-none drop-shadow-[0_0_8px_rgba(125,211,252,0.2)] font-[family-name:var(--font-montserrat)]">
                                    QODEC
                                </span>
                                <span className="text-[6.5px] font-semibold tracking-[0.25em] text-[#4169E1] uppercase leading-none pl-[1.5px] 2xl:pl-[2px] 2xl:text-[7.5px] font-[family-name:var(--font-source-code-pro)] mix-blend-screen">
                                    digital
                                </span>
                            </div>
                        </a>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-0 lg:gap-4 xl:gap-6 2xl:gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="relative group px-1.5 lg:px-4 xl:px-6 2xl:px-4 py-1 lg:py-1 xl:py-1.5 2xl:py-2 text-[9.5px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold tracking-[0.12em] lg:tracking-[0.13em] xl:tracking-[0.14em] 2xl:tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 font-[family-name:var(--font-montserrat)]"
                                >
                                    {link.name}
                                    {/* Decorative underline */}
                                    <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                </a>
                            ))}
                        </nav>

                        {/* CTA App & Mobile Toggle */}
                        <div className="flex items-center gap-1 lg:gap-4 xl:gap-6 2xl:gap-4">
                            <a
                                href="https://wa.me/message/SEULINKAQUI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden md:flex items-center justify-center h-7 lg:h-7.5 xl:h-8 2xl:h-10 px-3 lg:px-4 xl:px-5 2xl:px-6 rounded-full bg-blue-600/25 backdrop-blur-xl border border-blue-400/20 text-[9px] lg:text-[9.5px] xl:text-[10px] 2xl:text-[11px] font-bold tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em] uppercase text-white shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:bg-blue-600/35 hover:border-blue-300/40 hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all duration-300 font-[family-name:var(--font-montserrat)]"
                            >
                                Falar com Especialista
                            </a>

                            <button
                                className="md:hidden flex items-center justify-center h-11 w-11 rounded-full bg-white/[0.05] border border-white/[0.05] text-white/80 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="Abrir menu de navegação"
                            >
                                <List size={22} weight="duotone" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-[#020510]/80 flex flex-col pt-24 px-6 pb-6 overflow-y-auto"
                    >
                        <button
                            className="absolute top-6 right-6 flex items-center justify-center h-12 w-12 rounded-full bg-white/[0.05] border border-white/[0.05] text-white/80 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Fechar menu de navegação"
                        >
                            <X size={24} weight="duotone" />
                        </button>

                        <nav className="flex flex-col gap-2 mt-8">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold tracking-tight text-white py-4 border-b border-white/[0.05] font-[family-name:var(--font-montserrat)] uppercase"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-auto"
                        >
                            <a
                                href="https://wa.me/message/SEULINKAQUI"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center h-14 w-full rounded-2xl bg-blue-600/40 backdrop-blur-xl border border-blue-400/30 text-sm font-bold tracking-widest uppercase text-white shadow-[0_0_25px_rgba(37,99,235,0.3)] saturate-[1.6] font-[family-name:var(--font-montserrat)]"
                            >
                                Falar com Especialista
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
