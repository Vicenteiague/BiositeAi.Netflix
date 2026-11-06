import { Play, Sparkles } from "lucide-react";
import { playNetflixTaDum } from "../utils/audio";

interface NetflixVideoTeaserProps {
  title: string;
  poster: string;
  clientName: string;
  lettermark?: string;
  onPlay: () => void;
}

export function NetflixVideoTeaser({
  title,
  poster,
  clientName,
  lettermark = "C",
  onPlay,
}: NetflixVideoTeaserProps) {
  const handlePlayClick = () => {
    playNetflixTaDum();
    onPlay();
  };

  return (
    <section className="my-8 px-4 sm:px-6" aria-label="Vídeo Demonstrativo Netflix">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-1 h-4 sm:h-5 bg-[#E50914] rounded-full inline-block" />
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white font-display tracking-tight flex items-center gap-2">
          <span>🎬 Episódio Especial | Vídeo Demonstrativo</span>
        </h2>
      </div>

      <div
        onClick={handlePlayClick}
        className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#1f1f1f] border border-[#2b2b2b] shadow-2xl cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
      >
        {/* Poster Image */}
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Top-Left: Original Ribbon */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
          <span className="font-netflix text-2xl sm:text-3xl font-black text-[#E50914] leading-none drop-shadow-md">
            {lettermark}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded border border-white/20">
            PRODUÇÃO OFICIAL
          </span>
        </div>

        {/* Center: Big Pulsing Play Control */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.7)] group-hover:scale-115 group-hover:bg-white group-hover:text-black transition-all duration-300">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
          </div>
        </div>

        {/* Bottom Details */}
        <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-5 z-10">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/70 mb-1">
            <span className="text-emerald-400 font-bold">Novo</span>
            <span>·</span>
            <span>4K Ultra HD</span>
            <span>·</span>
            <span className="border border-white/30 px-1 rounded text-[9px]">Livre</span>
          </div>

          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight drop-shadow-md">
            {title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
            Toque para reproduzir a apresentação oficial de {clientName}
          </p>
        </div>
      </div>
    </section>
  );
}
