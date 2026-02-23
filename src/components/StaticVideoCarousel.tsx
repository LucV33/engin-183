import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/VideoCard";

const videos = [
  { src: "/videos/creator-1.mp4", poster: "/images/thumbs/creator-1.png" },
  { src: "/videos/creator-2.mp4", poster: "/images/thumbs/creator-2.png" },
  { src: "/videos/creator-3.mp4", poster: "/images/thumbs/creator-3.png" },
  { src: "/videos/creator-4.mp4", poster: "/images/thumbs/creator-4.png" },
  { src: "/videos/creator-5.mp4", poster: "/images/thumbs/creator-5.png" },
  { src: "/videos/creator-6.mp4", poster: "/images/thumbs/creator-6.png" },
  { src: "/videos/creator-7.mp4", poster: "/images/thumbs/creator-7.png" },
  { src: "/videos/creator-10.mp4", poster: "/images/thumbs/creator-10.png" },
];

function useVisibleCount() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCount(w >= 1024 ? 4 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

const StaticVideoCarousel = () => {
  const visibleCount = useVisibleCount();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const maxIndex = videos.length - visibleCount;
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  // Clamp currentIndex when visibleCount changes
  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, Math.max(0, maxIndex)));
  }, [maxIndex]);

  const handleTogglePlay = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const cardWidth = 100 / visibleCount;

  return (
    <section className="py-10 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left arrow */}
        <Button
          variant="outline"
          size="icon"
          disabled={!canPrev}
          onClick={handlePrev}
          className="absolute -left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border-border bg-card/80 backdrop-blur-sm sm:left-0"
          aria-label="Previous video"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Right arrow */}
        <Button
          variant="outline"
          size="icon"
          disabled={!canNext}
          onClick={handleNext}
          className="absolute -right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border-border bg-card/80 backdrop-blur-sm sm:right-0"
          aria-label="Next video"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Carousel viewport */}
        <div className="overflow-hidden rounded-2xl mx-8 sm:mx-12">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * cardWidth}%)`,
            }}
          >
            {videos.map((v, i) => {
              const isVisible = i >= currentIndex && i < currentIndex + visibleCount;
              return (
                <div
                  key={v.src}
                  className="shrink-0 px-1.5 sm:px-2"
                  style={{ width: `${cardWidth}%` }}
                >
                  <VideoCard
                    src={v.src}
                    poster={v.poster}
                    isActive={activeIndex === i}
                    preload={isVisible ? "auto" : "none"}
                    onTogglePlay={() => handleTogglePlay(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticVideoCarousel;
