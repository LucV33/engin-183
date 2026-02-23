import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoCardProps {
  src: string;
  poster?: string;
  onHover?: (hovering: boolean) => void;
  /** When true, the video element sets preload="auto" to begin background loading */
  shouldPreload?: boolean;
}

const VideoCard = ({ src, poster, onHover, shouldPreload = false }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Track buffering progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onProgress = () => {
      if (video.buffered.length > 0 && video.duration > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        setLoadProgress(Math.min((buffered / video.duration) * 100, 100));
      }
    };

    const onCanPlay = () => {
      setIsReady(true);
      setLoadProgress(100);
    };

    video.addEventListener("progress", onProgress);
    video.addEventListener("canplaythrough", onCanPlay);

    // If already cached
    if (video.readyState >= 3) {
      setIsReady(true);
      setLoadProgress(100);
    }

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplaythrough", onCanPlay);
    };
  }, [src]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    onHover?.(true);
    const video = videoRef.current;
    if (!video) return;

    // Force preload if not already
    if (video.preload === "none") {
      video.preload = "auto";
      video.load();
    }

    if (isReady) {
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      // Wait for ready then auto-play
      const onReady = () => {
        video.currentTime = 0;
        video.muted = false;
        video.play().catch(() => {});
        setIsPlaying(true);
        video.removeEventListener("canplaythrough", onReady);
      };
      video.addEventListener("canplaythrough", onReady);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    onHover?.(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
    setIsMuted(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div
      className="relative shrink-0 w-[160px] sm:w-[180px] rounded-2xl overflow-hidden border border-border group cursor-pointer"
      style={{
        backgroundImage: poster ? `url(${poster})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Aspect ratio placeholder */}
      <div className="aspect-[9/16]" />

      {/* Video — hidden until playing */}
      <video
        ref={videoRef}
        src={src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        loop
        preload={shouldPreload ? "auto" : "none"}
      />

      {/* Loading overlay — only on hover when video isn't ready yet */}
      {isHovering && !isReady && (
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 animate-pulse">
            <Play className="h-4 w-4 text-primary ml-0.5" fill="currentColor" />
          </div>
          <div className="w-3/4 h-1 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="mt-1.5 text-[10px] text-muted-foreground font-medium">
            {Math.round(loadProgress)}%
          </span>
        </div>
      )}

      {/* Play/Pause overlay — visible when not playing, on hover when playing */}
      {!isHovering || !isPlaying ? (
        <div className="absolute inset-0 z-[3] flex items-center justify-center bg-background/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-[3] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-background/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Pause className="h-4 w-4" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Volume toggle */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-opacity hover:bg-background/80"
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-20 z-[4] bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoCard;
