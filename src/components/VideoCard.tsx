import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  poster: string;
  name: string;
  onPlay: () => void;
}

export function VideoCard({ title, poster, name, onPlay }: VideoCardProps) {
  return (
    <button
      type="button"
      className="video-card group"
      onClick={onPlay}
      aria-label={`Reproduzir vídeo: ${title}`}
    >
      <img src={poster} alt={`Vídeo de ${name}`} loading="lazy" />
      <span className="video-shade" />

      {/* Play button with hover animation */}
      <div className="play-control group-hover:scale-110 transition-transform duration-300">
        <Play className="fill-current text-white w-6 h-6 ml-0.5" />
      </div>

      <div className="video-caption">
        <span>VÍDEO DEMONSTRATIVO</span>
        <strong>{title} – Toque para assistir</strong>
      </div>
    </button>
  );
}
