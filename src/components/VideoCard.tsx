import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoCardProps {
  src: string;
  poster?: string;
}

const VideoCard = ({ src, poster }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const handleMouseEnter = () => {
    if (!userPaused && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !userPaused) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setUserPaused(true);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setUserPaused(false);
    }
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
        muted
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
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent" />
    </div>
  );
};

export default VideoCard;
