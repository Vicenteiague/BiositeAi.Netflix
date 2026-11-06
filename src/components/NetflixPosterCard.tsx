import { useState } from "react";
import { Play, ArrowUpRight, Plus, Check, Info } from "lucide-react";
import { playNetflixTaDum } from "../utils/audio";

export interface NetflixCardData {
  id: string;
  title: string;
  image: string;
  url?: string | null;
  price?: string;
  badge?: string; // e.g. "NOVOS EPISÓDIOS", "EM ALTA", "JÁ DISPONÍVEL", "TOP 1"
  ranking?: number; // e.g. 1 to 10 for TOP 10 badge
  lettermark?: string; // e.g. "C", "N"
  category?: string;
  description?: string;
  isService?: boolean;
}

interface NetflixPosterCardProps {
  item: NetflixCardData;
  onOpenDetail?: (item: NetflixCardData) => void;
  defaultLettermark?: string;
  showRanking?: boolean;
}

export function NetflixPosterCard({
  item,
  onOpenDetail,
  defaultLettermark = "C",
  showRanking = true,
}: NetflixPosterCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const lettermark = item.lettermark || defaultLettermark;
  const isExternal = Boolean(item.url);

  const handleClick = (e: React.MouseEvent) => {
    playNetflixTaDum();
    if (item.url) {
      // If direct URL is present, open it
      return;
    }
    // If no direct URL, open detail drawer
    e.preventDefault();
    if (onOpenDetail) {
      onOpenDetail(item);
    }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playNetflixTaDum();
    if (onOpenDetail) {
      onOpenDetail(item);
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="netflix-rail-item group relative">
      <a
        href={item.url || "#"}
        target={item.url ? "_blank" : undefined}
        rel={item.url ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className="netflix-poster block focus:outline-none focus:ring-2 focus:ring-[#E50914] cursor-pointer"
        title={item.title}
        aria-label={`${item.title} - Abrir`}
      >
        {/* Poster Image */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95 contrast-105"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="netflix-poster-scrim" />

        {/* Top-Left: Red Monogram Initial (Signature Netflix Brand Tag) */}
        <div className="absolute top-2 left-2 z-10">
          <span className="font-netflix text-2xl font-black text-[#E50914] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
            {lettermark}
          </span>
        </div>

        {/* Top-Right: Red "TOP 10" Badge */}
        {showRanking && item.ranking && (
          <div className="absolute top-2 right-2 z-10 netflix-top10-badge">
            <span className="top">TOP</span>
            <span className="num">{item.ranking}</span>
          </div>
        )}

        {/* Center Hover Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            {isExternal ? (
              <ArrowUpRight className="w-5 h-5" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </div>
        </div>

        {/* Bottom Metadata & Title */}
        <div className="absolute bottom-2 inset-x-2 z-10 flex flex-col gap-1">
          {/* Custom Tag Badge: "NOVOS EPISÓDIOS" / "EM ALTA" / Price */}
          {item.badge ? (
            <div>
              <span className="netflix-tag-badge">{item.badge}</span>
            </div>
          ) : item.price ? (
            <div>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-[#E50914] text-white rounded-[2px] tracking-wide">
                {item.price}
              </span>
            </div>
          ) : null}

          {/* Title */}
          <h3 className="text-xs sm:text-[13px] font-bold text-white leading-tight drop-shadow-md line-clamp-2">
            {item.title}
          </h3>

          {/* Quick interactive mini buttons on hover */}
          <div className="flex items-center justify-between pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSaveToggle}
                className="p-1 rounded-full bg-black/60 hover:bg-[#E50914] text-white transition-colors"
                title={isSaved ? "Remover da lista" : "Adicionar à lista"}
              >
                {isSaved ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}
              </button>
              {onOpenDetail && (
                <button
                  type="button"
                  onClick={handleInfoClick}
                  className="p-1 rounded-full bg-black/60 hover:bg-white hover:text-black text-white transition-colors"
                  title="Ver sinopse e detalhes"
                >
                  <Info className="w-3 h-3" />
                </button>
              )}
            </div>

            {item.category && (
              <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold truncate max-w-[60px]">
                {item.category}
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
