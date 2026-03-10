import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pexelsKey = process.env.PEXELS_API_KEY;
        const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

        let bg = "/assets/showcase_bg_clean.png";
        let card1 = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80";
        let card2 = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80";
        let card3 = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80";
        let card4 = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80";

        // Fetch Pexels (Specific blue #3188ff aesthetic)
        if (pexelsKey) {
            try {
                const res = await fetch(`https://api.pexels.com/v1/search?query=dark+minimalist+3188ff+blue+technological+texture&per_page=1`, {
                    headers: { Authorization: pexelsKey },
                    next: { revalidate: 3600 }
                });
                const data = await res.json();
                if (data?.photos?.[0]?.src?.large2x) bg = data.photos[0].src.large2x;
            } catch (e) { }
        }

        // Fetch Unsplash (Premium tech aesthetic with #3188ff influence)
        if (unsplashKey) {
            const queries = [
                "industrial technical diagnostic blue 3188ff",
                "modern luxury minimalist website blue 3188ff",
                "neural network artificial intelligence blue 3188ff",
                "robust cloud infrastructure blue 3188ff"
            ];

            const fetchUnsplash = async (q: string) => {
                try {
                    const res = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(q)}&orientation=landscape`, {
                        headers: { Authorization: `Client-ID ${unsplashKey}` },
                        next: { revalidate: 3600 }
                    });
                    const data = await res.json();
                    return data?.urls?.regular || null;
                } catch (e) { return null; }
            };

            const [c1, c2, c3, c4] = await Promise.all(queries.map(fetchUnsplash));
            if (c1) card1 = c1;
            if (c2) card2 = c2;
            if (c3) card3 = c3;
            if (c4) card4 = c4;
        }

        return NextResponse.json({
            background: bg,
            cards: [card1, card2, card3, card4]
        });
    } catch (error) {
        return NextResponse.json({ background: "/assets/showcase_bg_clean.png", cards: [] }, { status: 500 });
    }
}
