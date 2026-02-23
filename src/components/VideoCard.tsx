import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoCardProps {
  src: string;
  poster?: string;
  onHover?: (hovering: boolean) => void;
}

// Global thumbnail cache & queue
const thumbCache = new Map<string, string>();
const thumbQueue: Array<{ src: string; resolve: (url: string) => void }> = [];
let isProcessing = false;

function processQueue() {
  if (isProcessing || thumbQueue.length === 0) return;
  isProcessing = true;
  const { src, resolve } = thumbQueue.shift()!;

  const offscreen = document.createElement("video");
  offscreen.crossOrigin = "anonymous";
  offscreen.muted = true;
  offscreen.playsInline = true;
  offscreen.preload = "auto";
  offscreen.src = src;

  const cleanup = () => {
    offscreen.removeAttribute("src");
    offscreen.load();
    offscreen.remove();
    isProcessing = false;
    processQueue(); // next in queue
  };

  const handleSeeked = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = offscreen.videoWidth || 320;
      canvas.height = offscreen.videoHeight || 568;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
        thumbCache.set(src, dataUrl);
        resolve(dataUrl);
      } else {
        resolve("");
      }
    } catch {
      resolve("");
    }
    cleanup();
  };

  offscreen.addEventListener("seeked", handleSeeked, { once: true });
  offscreen.addEventListener("loadeddata", () => {
    offscreen.currentTime = 0.5;
  }, { once: true });

  // Timeout fallback
  setTimeout(() => {
    resolve(thumbCache.get(src) || "");
    cleanup();
  }, 8000);
}

function generateThumbnail(videoSrc: string): Promise<string> {
  if (thumbCache.has(videoSrc)) return Promise.resolve(thumbCache.get(videoSrc)!);
  return new Promise((resolve) => {
    thumbQueue.push({ src: videoSrc, resolve });
    processQueue();
  });
}

const VideoCard = ({ src, poster, onHover }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [thumbUrl, setThumbUrl] = useState<string>(thumbCache.get(src) || "");

  useEffect(() => {
    if (thumbUrl) return;
    let cancelled = false;
    generateThumbnail(src).then((url) => {
      if (!cancelled && url) setThumbUrl(url);
    });
    return () => { cancelled = true; };
  }, [src, thumbUrl]);

  const handleMouseEnter = () => {
    onHover?.(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    onHover?.(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div
      className="relative shrink-0 w-[160px] sm:w-[180px] rounded-2xl overflow-hidden border border-border group cursor-pointer bg-muted"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Poster image — shown instantly while video is not playing */}
      {thumbUrl && !isPlaying && (
        <img
          src={thumbUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-[1]"
        />
      )}
      {/* Skeleton placeholder while thumbnail is loading */}
      {!thumbUrl && !isPlaying && (
        <div className="absolute inset-0 z-[1] bg-muted animate-pulse" />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="aspect-[9/16] w-full object-cover"
        playsInline
        loop
        preload="none"
      />
      {/* Play/Pause overlay */}
      <div className={`absolute inset-0 z-[2] flex items-center justify-center transition-opacity ${
        isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
      } bg-background/20`}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {isPlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
          )}
        </div>
      </div>
      {/* Volume toggle - shown when playing */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-opacity hover:bg-background/80"
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>
      )}
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-20 z-[3] bg-gradient-to-t from-background/70 to-transparent" />
    </div>
  );
};

export default VideoCard;
