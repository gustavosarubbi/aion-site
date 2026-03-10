import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

async function syncImage(url: string, filename: string): Promise<string> {
    const dirPath = path.join(process.cwd(), "public", "assets", "showcase");
    const filePath = path.join(dirPath, filename);
    const publicPath = `/assets/showcase/${filename}`;

    try {
        // Check if file exists
        await fs.access(filePath);
        return `${publicPath}?v=${Date.now()}`; // Add cache buster for dev
    } catch {
        // Download and save
        try {
            // Ensure directory exists
            await fs.mkdir(dirPath, { recursive: true });

            const res = await fetch(url);
            if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);

            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            await fs.writeFile(filePath, buffer);

            return publicPath;
        } catch (error) {
            console.error(`[Showcase Sync] Failed to download ${filename}:`, error);
            return url; // Fallback to remote URL
        }
    }
}

export async function GET() {
    try {
        const pexelsKey = process.env.PEXELS_API_KEY;
        const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

        let bgUrl = "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
        let c1Url = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80";
        let c2Url = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80";
        let c3Url = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80";
        let c4Url = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80";

        // 1. Fetch logic (only if keys exist and we want to refresh/init)
        if (pexelsKey) {
            try {
                const res = await fetch(`https://api.pexels.com/v1/search?query=379cfd+vibrant+blue+abstract+dark+tech&color=blue&per_page=1`, {
                    headers: { Authorization: pexelsKey },
                    next: { revalidate: 3600 }
                });
                const data = await res.json();
                if (data?.photos?.[0]?.src?.large2x) bgUrl = data.photos[0].src.large2x;
            } catch (e) { }
        }

        if (unsplashKey) {
            const queries = [
                "data analytic diagnostic software blue",
                "premium digital experience interface blue",
                "ai neural processing unit circuit blue",
                "enterprise cloud server network blue"
            ];

            const fetchUnsplash = async (q: string) => {
                try {
                    const res = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(q)}&color=blue&orientation=landscape`, {
                        headers: { Authorization: `Client-ID ${unsplashKey}` },
                        next: { revalidate: 3600 }
                    });
                    const data = await res.json();
                    return data?.urls?.regular || null;
                } catch (e) { return null; }
            };

            const [u1, u2, u3, u4] = await Promise.all(queries.map(fetchUnsplash));
            if (u1) c1Url = u1;
            if (u2) c2Url = u2;
            if (u3) c3Url = u3;
            if (u4) c4Url = u4;
        }

        // 2. Sync to local filesystem
        const [bg, card1, card2, card3, card4] = await Promise.all([
            syncImage(bgUrl, "showcase_bg.jpg"),
            syncImage(c1Url, "card_1.jpg"),
            syncImage(c2Url, "card_2.jpg"),
            syncImage(c3Url, "card_3.jpg"),
            syncImage(c4Url, "card_4.jpg"),
        ]);

        return NextResponse.json({
            background: bg,
            cards: [card1, card2, card3, card4]
        });
    } catch (error) {
        console.error("[Showcase API Error]:", error);
        return NextResponse.json({ background: "/assets/showcase_bg_clean.png", cards: [] }, { status: 500 });
    }
}
