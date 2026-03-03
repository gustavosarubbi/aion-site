"use client";

type AudioWindow = Window & {
    webkitAudioContext?: typeof AudioContext;
};

let audioCtx: AudioContext | null = null;

export const playSfx = (type: "hover" | "click") => {
    try {
        if (typeof window === "undefined") return;

        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || (window as AudioWindow).webkitAudioContext;
            if (!AudioContextClass) return;
            audioCtx = new AudioContextClass();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === "hover") {
            // Subtle metallic tick
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } else if (type === "click") {
            // Solid mechanical click
            osc.type = "square";
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
        }
    } catch {
        // Fail silently if browser blocks audio rendering before interaction
    }
};
