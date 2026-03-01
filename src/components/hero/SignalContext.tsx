"use client";

import { createContext, useContext, useCallback, useRef } from "react";

export type SignalBus = {
    pulseAll: () => void;
    onPulse: (cb: () => void) => () => void;
};

const SignalContext = createContext<SignalBus | null>(null);

export function SignalProvider({ children }: { children: React.ReactNode }) {
    const listenersRef = useRef<Set<() => void>>(new Set());
    const pulseAll = useCallback(() => { listenersRef.current.forEach(cb => cb()); }, []);
    const onPulse = useCallback((cb: () => void) => {
        listenersRef.current.add(cb);
        return () => listenersRef.current.delete(cb);
    }, []);
    return <SignalContext.Provider value={{ pulseAll, onPulse }}>{children}</SignalContext.Provider>;
}

export function useSignal() {
    const context = useContext(SignalContext);
    if (!context) throw new Error("useSignal must be used within a SignalProvider");
    return context;
}
