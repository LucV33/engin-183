import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoCardProps {
  src: string;
  poster?: string;
  onHover?: (hovering: boolean) => void;
}

const VideoCard = ({ src, poster, onHover }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Track buffering progress & seek to thumbnail frame
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

    const onLoadedData = () => {
      // Seek to 0.5s to get a visible thumbnail
      if (video.currentTime === 0) {
        video.currentTime = 0.5;
      }
    };

    video.addEventListener("progress", onProgress);
    video.addEventListener("canplaythrough", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);

    // If already ready (cached)
    if (video.readyState >= 3) {
      setIsReady(true);
      setLoadProgress(100);
    }
    if (video.readyState >= 2 && video.currentTime === 0) {
      video.currentTime = 0.5;
    }

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplaythrough", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, [src]);

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
      videoRef.current.currentTime = 0.5;
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
      <video
        ref={videoRef}
        src={src + "#t=0.5"}
        poster={poster}
        className="aspect-[9/16] w-full object-cover"
        muted
        playsInline
        loop
        preload="auto"
      />

      {/* Loading overlay with progress — shown until video frame is visible */}
      {!isReady && (
        <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center bg-muted">
          {/* Pulsing icon */}
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 animate-pulse">
            <Play className="h-4 w-4 text-primary ml-0.5" fill="currentColor" />
          </div>
          {/* Progress bar */}
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
