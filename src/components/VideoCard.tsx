import { useRef, useState, useEffect } from "react";
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

  // Seek to 0.5s on metadata load to force a visible thumbnail frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const seekToThumb = () => {
      if (video.currentTime === 0) video.currentTime = 0.5;
    };
    video.addEventListener("loadeddata", seekToThumb);
    // If already loaded (cached), seek immediately
    if (video.readyState >= 2) seekToThumb();
    return () => video.removeEventListener("loadeddata", seekToThumb);
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
      className="relative shrink-0 w-[160px] sm:w-[180px] rounded-2xl overflow-hidden border border-border group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="aspect-[9/16] w-full object-cover"
        playsInline
        loop
        preload="metadata"
      />
      {/* Play/Pause overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
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
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent" />
    </div>
  );
};

export default VideoCard;
