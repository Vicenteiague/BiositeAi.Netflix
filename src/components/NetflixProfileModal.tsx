import { X, Check } from "lucide-react";
import { allClients } from "../data/clients";
import { playNetflixTaDum } from "../utils/audio";

interface NetflixProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlug: string;
  onSelectClient: (slug: string) => void;
}

export function NetflixProfileModal({
  isOpen,
  onClose,
  currentSlug,
  onSelectClient,
}: NetflixProfileModalProps) {
  if (!isOpen) return null;

  const demoProfiles = [
    {
      slug: "start-mkt-local",
      name: "Conectacard NFC",
      subtitle: "Marketing & Soluções Digitais",
      avatar: "/assets/logo-conectacard-Bp31Uc4f.jpg",
      color: "#E50914",
    },
    {
      slug: "superlimpo",
      name: "Superlimpo Fábrica",
      subtitle: "Produtos de Limpeza & Kits",
      avatar: "/assets/produtos-superlimpo-2KK8JWDt.png",
      color: "#0284c7",
    },
    {
      slug: "pizzaria",
      name: "Forno di Napoli",
      subtitle: "Pizzaria Artesanal no Forno a Lenha",
      avatar:
        "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=300&q=80",
      color: "#d97706",
    },
    {
      slug: "farmacia",
      name: "Drogaria Mais Saúde",
      subtitle: "Plantão 24h & Medicamentos",
      avatar:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80",
      color: "#059669",
    },
  ];

  const handleSelect = (slug: string) => {
    playNetflixTaDum();
    onSelectClient(slug);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-[#141414] rounded-2xl p-6 sm:p-8 text-center border border-[#2b2b2b] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a3a3a3] hover:text-white"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Netflix Title */}
        <h2 className="font-netflix text-2xl sm:text-3xl text-white tracking-wider mb-1">
          QUEM ESTÁ ASSISTINDO?
        </h2>
        <p className="text-xs text-[#a3a3a3] mb-6">
          Selecione o perfil da empresa para carregar seu catálogo e biosite exclusivo:
        </p>

        {/* Profiles Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
          {demoProfiles.map((p) => {
            const isCurrent = currentSlug === p.slug;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => handleSelect(p.slug)}
                className="flex flex-col items-center group cursor-pointer text-center focus:outline-none"
              >
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 group-hover:scale-105 shadow-md ${
                    isCurrent
                      ? "border-[#E50914] ring-4 ring-[#E50914]/30"
                      : "border-transparent group-hover:border-white"
                  }`}
                  style={{ backgroundColor: p.color }}
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  {isCurrent && (
                    <div className="absolute top-1 right-1 bg-[#E50914] text-white p-0.5 rounded-full shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <span
                  className={`text-xs sm:text-sm font-semibold mt-2 transition-colors ${
                    isCurrent
                      ? "text-white font-bold"
                      : "text-[#a3a3a3] group-hover:text-white"
                  }`}
                >
                  {p.name}
                </span>
                <span className="text-[10px] text-[#737373] line-clamp-1">
                  {p.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Manage Button */}
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-6 rounded border border-[#444] hover:border-white text-xs font-semibold text-[#a3a3a3] hover:text-white uppercase tracking-wider transition-colors"
        >
          Continuar Navegando
        </button>
      </div>
    </div>
  );
}
