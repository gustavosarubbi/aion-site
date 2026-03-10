import * as React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lord-icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                trigger?: string;
                colors?: string;
                delay?: string | number;
                stroke?: string | number;
                state?: string;
            };
        }
    }
}
