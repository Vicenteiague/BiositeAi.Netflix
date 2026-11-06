import { useState } from "react";
import { Plus, Check, Play, Info, Sparkles } from "lucide-react";
import { playNetflixTaDum } from "../utils/audio";

interface NetflixHeroProps {
  bannerSrc: string;
  avatarSrc: string;
  name: string;
  bio: string;
  lettermark?: string;
  headline?: string;
  subheadline?: string;
  genres?: string[];
  matchPercent?: number;
  tagline?: string;
  onOpenInfo: () => void;
  onPlayVideo?: () => void;
  onScrollToLinks: () => void;
}

export function NetflixHero({
  bannerSrc,
  avatarSrc,
  name,
  bio,
  lettermark = "C",
  headline,
  subheadline,
  genres = ["TECNOLOGIA NFC", "MARKETING LOCAL", "AUTOMAÇÃO IA"],
  matchPercent = 99,
  tagline = "ESTRATÉGIA HOJE, LIBERDADE AMANHÃ.",
  onOpenInfo,
  onPlayVideo,
  onScrollToLinks,
}: NetflixHeroProps) {
  const [inMyList, setInMyList] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const displayHeadline = headline || name.toUpperCase();
  const displaySubheadline = subheadline || (bio.length > 80 ? bio.slice(0, 80) + "..." : bio);

  const handleToggleList = () => {
    playNetflixTaDum();
    setInMyList((prev) => !prev);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const handleMeusLinks = () => {
    playNetflixTaDum();
    onScrollToLinks();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#141414] select-none" aria-label="Destaque Principal Netflix">
      {/* 1. Cinematic Background Poster with High Contrast Vignette */}
      <div className="relative w-full h-[460px] sm:h-[520px]">
        <img
          src={bannerSrc}
          alt={name}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.1]"
        />

        {/* Gradient Scrims: Dark gradient from top, sides, and bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/50" />

        {/* Corner Top Bar Overlays: Netflix lettermark & avatar */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="font-netflix text-4xl sm:text-5xl font-black text-[#E50914] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tracking-tight">
            {lettermark}
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E50914]">
              ORIGINAL
            </span>
            <span className="text-[11px] font-semibold text-white/90 tracking-wide uppercase">
              BIOLINK SÉRIE
            </span>
          </div>
        </div>

        {/* Top Right Profile Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="relative group">
            <img
              src={avatarSrc}
              alt={name}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover border-2 border-[#E50914] shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#E50914] text-white text-[9px] font-bold rounded uppercase">
              PRO
            </span>
          </div>
        </div>

        {/* 2. Billboard Text & Captions (Positioned at bottom of hero) */}
        <div className="absolute bottom-4 inset-x-0 px-4 sm:px-8 text-center flex flex-col items-center">
          {/* Match & Season Indicator */}
          <div className="flex items-center justify-center gap-2.5 text-xs mb-2">
            <span className="text-emerald-400 font-extrabold tracking-wide">
              {matchPercent}% Relevante
            </span>
            <span className="text-white/40">·</span>
            <span className="text-white/80 font-medium">2026</span>
            <span className="text-white/40">·</span>
            <span className="px-1.5 py-0.5 border border-white/40 rounded text-[10px] font-bold text-white/90">
              4K ULTRA HD
            </span>
            <span className="text-white/40">·</span>
            <span className="px-1.5 py-0.5 bg-[#E50914] text-white rounded text-[10px] font-bold">
              TOP 1
            </span>
          </div>

          {/* Bold Netflix Hero Title */}
          <h1 className="font-netflix text-3xl sm:text-5xl md:text-6xl text-white tracking-wider leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-xl mx-auto uppercase">
            {displayHeadline}
          </h1>

          {/* Subtitle / Author Name */}
          <p className="text-xs sm:text-sm font-semibold text-[#f5f5f5]/90 tracking-widest uppercase mt-1 mb-2 drop-shadow-md">
            {displaySubheadline}
          </p>

          {/* Genre / Value Proposition Tags */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-[11px] font-medium text-white/75 uppercase tracking-wider mb-5">
            {genres.map((genre, idx) => (
              <span key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-[#E50914] font-black">•</span>}
                <span>{genre}</span>
              </span>
            ))}
          </div>

          {/* 3. The Iconic Netflix Trio Action Controls */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 w-full max-w-xs sm:max-w-sm mb-3">
            {/* Left: + Minha lista */}
            <button
              type="button"
              onClick={handleToggleList}
              className="flex flex-col items-center gap-1 group text-white/90 hover:text-white transition-transform active:scale-95 cursor-pointer"
              title="Adicionar / Remover da Minha Lista"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-black/40 border border-white/20 group-hover:border-white transition-colors">
                {inMyList ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Plus className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                )}
              </div>
              <span className="text-[11px] font-medium text-white/80 whitespace-nowrap">
                {inMyList ? "Na lista" : "Minha lista"}
              </span>
            </button>

            {/* Center: Prominent White Button "▶ Meus links" */}
            <button
              type="button"
              onClick={handleMeusLinks}
              className="flex-1 py-2.5 px-6 rounded-md bg-white hover:bg-white/90 text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 cursor-pointer group"
              title="Acessar todos os links e contatos rápidos"
            >
              <Play className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
              <span className="font-netflix tracking-wider text-base sm:text-lg">
                MEUS LINKS
              </span>
            </button>

            {/* Right: ⓘ Saiba mais */}
            <button
              type="button"
              onClick={() => {
                playNetflixTaDum();
                onOpenInfo();
              }}
              className="flex flex-col items-center gap-1 group text-white/90 hover:text-white transition-transform active:scale-95 cursor-pointer"
              title="Ver detalhes completos do perfil"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-black/40 border border-white/20 group-hover:border-white transition-colors">
                <Info className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-medium text-white/80 whitespace-nowrap">
                Saiba mais
              </span>
            </button>
          </div>

          {/* Bottom Tagline / Subtitle */}
          {tagline && (
            <p className="text-[10px] sm:text-xs text-white/50 tracking-[0.2em] font-semibold uppercase mt-2">
              {tagline}
            </p>
          )}
        </div>
      </div>

      {/* Floating Toast notification when added to Minha Lista */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#E50914] text-white text-xs font-bold rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {inMyList
              ? "Adicionado à sua lista do Netflix Conectacard!"
              : "Removido da sua lista."}
          </span>
        </div>
      )}
    </section>
  );
}
