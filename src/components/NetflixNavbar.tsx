import { useState } from "react";
import {
  Volume2,
  VolumeX,
  Share2,
  QrCode,
  UserPlus,
  Check,
  Search,
} from "lucide-react";
import { downloadVCard } from "../utils/vcard";
import { playNetflixTaDum } from "../utils/audio";

interface NetflixNavbarProps {
  clientName: string;
  avatarSrc: string;
  lettermark?: string;
  onOpenQr: () => void;
  onOpenProfiles: () => void;
  onOpenAuth?: () => void;
  currentUserEmail?: string | null;
  onOpenSearch?: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NetflixNavbar({
  clientName,
  avatarSrc,
  lettermark = "C",
  onOpenQr,
  onOpenProfiles,
  onOpenAuth,
  currentUserEmail,
  activeTab,
  onTabChange,
}: NetflixNavbarProps) {
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleShare = async () => {
    if (soundEnabled) playNetflixTaDum();
    if (navigator.share) {
      try {
        await navigator.share({
          title: clientName,
          text: `Confira o Biolink estilo Netflix de ${clientName}`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogoClick = () => {
    if (soundEnabled) playNetflixTaDum();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "inicio", label: "Início" },
    { id: "links", label: "Meus Links" },
    { id: "servicos", label: "Serviços" },
    { id: "produtos", label: "Catálogo" },
    { id: "lia", label: "LIA IA" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#141414]/95 backdrop-blur-md border-b border-[#222222] transition-all">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Left: Netflix Ribbon Logo & Brand Name */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 group cursor-pointer"
            title="Conectacard Netflix Biolink - Clique para ouvir o som Ta-Dum!"
          >
            {/* Iconic Red Netflix Ribbon Letter */}
            <span className="font-netflix text-3xl font-extrabold text-[#E50914] tracking-wider group-hover:scale-105 transition-transform drop-shadow-[0_2px_8px_rgba(229,9,20,0.5)]">
              {lettermark}
            </span>
            <span className="font-netflix text-lg sm:text-xl text-[#f5f5f5] tracking-widest hidden sm:inline font-bold">
              CONECTA<span className="text-[#E50914]">FLIX</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 ml-4 text-xs font-medium text-[#a3a3a3]">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onTabChange(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  activeTab === item.id
                    ? "text-white font-bold bg-[#262626]"
                    : "hover:text-white hover:bg-[#1f1f1f]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Zone: Controls & Profile Switcher */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle (Ta-Dum) */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playNetflixTaDum();
            }}
            className="p-1.5 rounded text-[#a3a3a3] hover:text-white hover:bg-[#262626] transition-colors"
            title={soundEnabled ? "Som Netflix ativado (Ta-dum)" : "Som desativado"}
            aria-label="Alternar som do Netflix"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#E50914]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#737373]" />
            )}
          </button>

          {/* Save vCard */}
          <button
            type="button"
            onClick={downloadVCard}
            className="p-1.5 rounded text-[#a3a3a3] hover:text-white hover:bg-[#262626] transition-colors"
            title="Salvar contato na agenda telefônica"
            aria-label="Salvar contato"
          >
            <UserPlus className="w-4 h-4" />
          </button>

          {/* QR Code */}
          <button
            type="button"
            onClick={onOpenQr}
            className="p-1.5 rounded text-[#a3a3a3] hover:text-white hover:bg-[#262626] transition-colors"
            title="Exibir QR Code para compartilhar"
            aria-label="Abrir QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Share Link */}
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 rounded text-[#a3a3a3] hover:text-white hover:bg-[#262626] transition-colors"
            title="Compartilhar Biolink"
            aria-label="Compartilhar link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>

          {/* Account / Firebase Auth */}
          {onOpenAuth && (
            <button
              type="button"
              onClick={onOpenAuth}
              className={`p-1.5 rounded transition-colors ${
                currentUserEmail
                  ? "text-emerald-400 bg-emerald-950/40 border border-emerald-800/60"
                  : "text-[#a3a3a3] hover:text-white hover:bg-[#262626]"
              }`}
              title={
                currentUserEmail
                  ? `Conectado: ${currentUserEmail}`
                  : "Entrar / Gerenciar Empresa (Firebase Auth)"
              }
              aria-label="Autenticação"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          )}

          {/* Profile Switcher Avatar (Netflix style avatar with colored border) */}
          <button
            type="button"
            onClick={onOpenProfiles}
            className="flex items-center gap-1.5 pl-1.5 group cursor-pointer focus:outline-none"
            title="Quem está assistindo? Trocar de Cliente / Perfil"
            aria-label="Trocar de cliente"
          >
            <div className="relative">
              <img
                src={avatarSrc}
                alt={clientName}
                className="w-7 h-7 rounded object-cover border-2 border-[#E50914] group-hover:border-white transition-colors shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#E50914] border border-[#141414] rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
