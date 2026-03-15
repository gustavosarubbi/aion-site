"use client";

import { useState, useEffect } from "react";

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

export function usePexelsImage(query: string, perPage: number = 5) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY || process.env.PEXELS_API_KEY;
        
        if (!apiKey) {
          throw new Error("Pexels API key not found");
        }

        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PexelsResponse = await response.json();
        
        if (data.photos && data.photos.length > 0) {
          // Seleciona uma imagem aleatória dos resultados
          const randomIndex = Math.floor(Math.random() * data.photos.length);
          setImageUrl(data.photos[randomIndex].src.large2x);
        } else {
          throw new Error("No images found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        // Fallback para uma imagem de placeholder
        setImageUrl(`https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80`);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchImage();
    }
  }, [query, perPage]);

  return { imageUrl, loading, error };
}
