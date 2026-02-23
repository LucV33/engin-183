import { useState, useEffect } from "react";

/**
 * Staggered video preloader — returns a Set of video src URLs that should
 * have preload="auto". Loads from center outward with 400ms delays.
 */
export function useVideoPreloader(videos: { src: string }[]) {
  const [preloadSet, setPreloadSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (videos.length === 0) return;

    // Build priority order: center first, expand outward
    const mid = Math.floor(videos.length / 2);
    const order: number[] = [mid];
    for (let offset = 1; offset < videos.length; offset++) {
      if (mid - offset >= 0) order.push(mid - offset);
      if (mid + offset < videos.length) order.push(mid + offset);
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    order.forEach((idx, i) => {
      const t = setTimeout(() => {
        setPreloadSet((prev) => {
          const next = new Set(prev);
          next.add(videos[idx].src);
          return next;
        });
      }, i * 400);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [videos]);

  return preloadSet;
}
