"use client";

import React from "react";

// Explicitly declare for this file to ensure Turbopack picks it up
declare namespace JSX {
    interface IntrinsicElements {
        "lord-icon": any;
    }
}

interface LordIconProps {
    src: string;
    trigger?: "hover" | "click" | "loop" | "loop-on-hover" | "morph" | "boomerang";
    colors?: string; // Example: "primary:#ffffff,secondary:#08a88a"
    size?: number;
    delay?: number;
    stroke?: string;
}

/**
 * LordIcon Component
 * Requires the LordIcon script to be loaded in the layout.
 */
const LordIcon: React.FC<LordIconProps> = ({
    src,
    trigger = "hover",
    colors = "primary:#06b6d4,secondary:#ffffff", // Default cyan/white for AION
    size = 64,
    delay = 0,
    stroke = "bold",
}) => {
    return (
        // @ts-ignore - custom element
        <lord-icon
            src={src}
            trigger={trigger}
            colors={colors}
            delay={delay}
            stroke={stroke}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default LordIcon;
