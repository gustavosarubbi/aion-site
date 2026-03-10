// Server utilities 

/**
 * External APIs Client (Server Actions)
 * Centralized utility to fetch assets from Unsplash, Pexels, and IconScout.
 */

const EXTERNAL_ASSETS = {
    // Common search queries for the AION aesthetic
    queries: {
        tech: "dark minimalist technology",
        background: "abstract dark tech texture",
        automation: "robotic automation workflow",
        luxury: "premium dark glass design",
    },
};

/**
 * Fetch a high-quality tech image from Unsplash
 */
export async function getUnsplashImage(query: string = "technology") {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) return null;

    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
                next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
            }
        );
        const data = await response.json();
        return data?.urls?.regular || null;
    } catch (error) {
        console.error("Error fetching Unsplash image:", error);
        return null;
    }
}

/**
 * Fetch a high-quality video or image from Pexels
 */
export async function getPexelsAsset(query: string = "abstract tech") {
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) return null;

    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
            {
                headers: {
                    Authorization: apiKey,
                },
                next: { revalidate: 3600 }
            }
        );
        const data = await response.json();
        return data?.photos?.[0]?.src?.large2x || null;
    } catch (error) {
        console.error("Error fetching Pexels asset:", error);
        return null;
    }
}

/**
 * Fetch specific assets for the Engineering Showcase component
 * Returns an object with the background URL and 4 card URLs
 */
export async function getPremiumShowcaseAssets() {
    try {
        // High-end search terms for a luxury tech aesthetic
        const [bg, card1, card2, card3, card4] = await Promise.all([
            getPexelsAsset("dark minimal technological architecture 8k"),
            getUnsplashImage("cybersecurity neural network neon"),
            getUnsplashImage("premium automotive digital interface"),
            getUnsplashImage("futuristic automated factory dark"),
            getUnsplashImage("secure cloud server hardware cyan")
        ]);

        return {
            background: bg || "/assets/showcase_bg_clean.png",
            cards: [
                {
                    image: card1 || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
                    iconId: "msoeawqm" // Verified
                },
                {
                    image: card2 || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80",
                    iconId: "unukghxb" // Verified
                },
                {
                    image: card3 || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
                    iconId: "lupuorrc" // Verified
                },
                {
                    image: card4 || "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80",
                    iconId: "xzksbhzh" // Verified
                }
            ]
        };
    } catch (error) {
        console.error("Failed to fetch showcase assets:", error);
        return {
            background: "/assets/showcase_bg_clean.png",
            cards: [
                { image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", iconId: "msoeawqm" },
                { image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80", iconId: "unukghxb" },
                { image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80", iconId: "lupuorrc" },
                { image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80", iconId: "xzksbhzh" }
            ]
        };
    }
}
