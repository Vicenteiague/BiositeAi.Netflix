import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NetflixPosterCard, type NetflixCardData } from "./NetflixPosterCard";

interface NetflixRowProps {
  id?: string;
  title: string;
  subtitle?: string;
  items: NetflixCardData[];
  defaultLettermark?: string;
  showRanking?: boolean;
  onOpenDetail?: (item: NetflixCardData) => void;
}

export function NetflixRow({
  id,
  title,
  subtitle,
  items,
  defaultLettermark = "C",
  showRanking = true,
  onOpenDetail,
}: NetflixRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id={id} className="my-6 sm:my-8 px-4 sm:px-6 relative group/row">
      {/* Row Header with Netflix Red Indicator */}
      <div className="flex items-baseline justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 sm:h-5 bg-[#E50914] rounded-full inline-block" />
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white font-display tracking-tight flex items-center gap-2">
            <span>{title}</span>
          </h2>
        </div>

        {subtitle && (
          <span className="text-xs text-[#a3a3a3] font-medium hidden sm:inline">
            {subtitle}
          </span>
        )}
      </div>

      {/* Rail Container with Scroll Controls */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-0 bottom-0 z-20 w-8 sm:w-10 bg-black/70 hover:bg-[#E50914]/80 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all rounded-r focus:opacity-100 cursor-pointer backdrop-blur-xs"
          aria-label="Rolar para esquerda"
          title="Ver anteriores"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Horizontal Rail */}
        <div ref={scrollRef} className="netflix-rail px-0.5">
          {items.map((item, idx) => (
            <NetflixPosterCard
              key={item.id}
              item={{
                ...item,
                ranking: item.ranking || idx + 1,
              }}
              defaultLettermark={defaultLettermark}
              showRanking={showRanking}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-8 sm:w-10 bg-black/70 hover:bg-[#E50914]/80 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all rounded-l focus:opacity-100 cursor-pointer backdrop-blur-xs"
          aria-label="Rolar para direita"
          title="Ver próximos"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
