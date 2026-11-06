import { useState } from "react";
import { X, Play, MessageCircle, ExternalLink, Share2, Check, Bookmark } from "lucide-react";
import type { NetflixCardData } from "./NetflixPosterCard";

interface NetflixDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image?: string;
  description?: string;
  price?: string;
  url?: string | null;
  isService?: boolean;
  lettermark?: string;
  clientPhone?: string;
}

export function NetflixDetailModal({
  isOpen,
  onClose,
  title,
  image,
  description,
  price,
  url,
  isService,
  lettermark = "C",
  clientPhone = "67993174612",
}: NetflixDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const cleanPhone = clientPhone.replace(/\D/g, "");
  const defaultWaText = isService
    ? `Olá! Gostaria de saber mais informações sobre o serviço: ${title}.`
    : `Olá! Gostaria de pedir/saber mais sobre: ${title}.`;

  const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(defaultWaText)}`;

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback
      }
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-[#181818] rounded-xl overflow-hidden shadow-2xl border border-[#2b2b2b] text-[#f5f5f5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-[#E50914] text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header / Backdrop Image */}
        {image && (
          <div className="relative aspect-video w-full bg-black overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40" />

            {/* Red Monogram Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="font-netflix text-3xl font-black text-[#E50914] drop-shadow-md">
                {lettermark}
              </span>
              <span className="text-[10px] font-bold text-white uppercase bg-[#E50914] px-1.5 py-0.2 rounded tracking-wider">
                ORIGINAL
              </span>
            </div>

            {/* Price Badge on Top Image */}
            {price && (
              <div className="absolute bottom-3 right-3 bg-[#E50914] text-white font-extrabold text-xs px-2.5 py-1 rounded shadow-lg">
                {price}
              </div>
            )}
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6">
          {/* Metadata Bar */}
          <div className="flex items-center gap-2.5 text-xs text-[#a3a3a3] mb-2 flex-wrap">
            <span className="text-emerald-400 font-extrabold">98% Relevante</span>
            <span>·</span>
            <span>2026</span>
            <span>·</span>
            <span className="px-1.5 py-0.2 border border-[#444] rounded text-[10px] font-semibold text-white">
              HD 4K
            </span>
            <span>·</span>
            <span className="px-1.5 py-0.2 border border-[#444] rounded text-[10px] font-semibold text-white">
              Áudio Espacial
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display leading-tight">
            {title}
          </h2>

          {/* Price display if not shown on image */}
          {price && !image && (
            <p className="text-base font-extrabold text-[#E50914] mb-3">{price}</p>
          )}

          {/* Description / Synopsis */}
          {description && (
            <p className="text-xs sm:text-sm text-[#cccccc] leading-relaxed mb-6 whitespace-pre-wrap">
              {description}
            </p>
          )}

          {/* Primary Action Buttons Trio */}
          <div className="flex flex-col gap-2.5">
            {/* Primary Action Button (WhatsApp or Direct Link) */}
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-md bg-white hover:bg-white/90 text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-md"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Acessar Link Direto</span>
              </a>
            ) : (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isService ? "Solicitar Proposta no WhatsApp" : "Pedir pelo WhatsApp"}</span>
              </a>
            )}

            {/* Secondary Controls Row */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSaved((prev) => !prev)}
                className="flex-1 py-2 px-3 rounded-md bg-[#262626] hover:bg-[#333333] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Na sua Lista</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Salvar na Minha Lista</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex-1 py-2 px-3 rounded-md bg-[#262626] hover:bg-[#333333] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartilhar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
