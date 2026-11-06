import { MapPin, ExternalLink } from "lucide-react";

interface MapSectionProps {
  embedUrl: string;
  linkUrl: string;
  title: string;
}

export function MapSection({ embedUrl, linkUrl, title }: MapSectionProps) {
  // Reliable interactive embed for Ponta Porã MS (Start Mkt Local: -22.5256989, -55.7132969)
  const defaultEmbed =
    "https://www.openstreetmap.org/export/embed.html?bbox=-55.7332969%2C-22.5356989%2C-55.6932969%2C-22.5156989&layer=mapnik&marker=-22.5256989%2C-55.7132969";
  const finalEmbed = embedUrl || defaultEmbed;

  // Universal Google Maps search link (opens Google Maps App on mobile and Google Maps Web on desktop)
  const finalLink =
    linkUrl ||
    "https://www.google.com/maps/search/?api=1&query=Start+Mkt+Local+-+Rua+Luiz+Pinto+Magalh%C3%A3es,+154+-+Santa+Isabel,+Ponta+Por%C3%A3+-+MS";

  return (
    <section id="mapa" className="my-8 px-4 sm:px-6" aria-label="Nossa localização no mapa">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-1 h-4 sm:h-5 bg-[#E50914] rounded-full inline-block" />
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white font-display tracking-tight flex items-center gap-2">
          <span>📍 Locais de Atendimento & Gravação</span>
        </h2>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden border border-[#2b2b2b] shadow-2xl bg-[#141414]">
        <iframe
          src={finalEmbed}
          title={title || "Start Mkt Local no Mapa"}
          loading="lazy"
          allowFullScreen
          className="w-full h-64 sm:h-72 border-0 block filter contrast-[1.05]"
        />
        <a
          href={finalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 bg-black/80 hover:bg-[#E50914] text-white text-xs font-bold px-3 py-1.5 rounded-md border border-white/20 shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ver tela cheia</span>
        </a>
      </div>

      <a
        href={finalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1f1f1f] hover:bg-[#E50914] text-white text-sm font-bold transition-all shadow-md group mt-3 border border-[#2e2e2e]"
      >
        <MapPin className="w-4 h-4 text-[#E50914] group-hover:text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
        <span>Abrir Localização no Google Maps</span>
      </a>
    </section>
  );
}
