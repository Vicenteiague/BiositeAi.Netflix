import { useState } from "react";
import { X, MessageCircle, ExternalLink, QrCode, Globe, Copy, Check } from "lucide-react";
import type { CatalogoItem } from "../data/conectacard";
import firebaseConfig from "../../firebase-applet-config.json";

// 1. Video Modal
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  if (!isOpen) return null;

  // Extract YouTube ID
  let embedUrl = videoUrl;
  try {
    const url = new URL(videoUrl);
    const host = url.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = url.pathname.slice(1);
    } else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      id = url.searchParams.get("v") || url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1] || null;
    }
    if (id) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    }
  } catch {
    // Keep as is
  }

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content relative max-w-[420px] aspect-[9/16] max-h-[85vh] bg-black p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="media-close"
          aria-label="Fechar vídeo"
        >
          <X className="w-5 h-5" />
        </button>

        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 rounded-xl"
        />
      </div>
    </div>
  );
}

// 2. Info / Alert Modal
interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  isService?: boolean;
}

export function InfoModal({ isOpen, onClose, title, description, isService }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content max-w-md p-6 bg-[#1f1f1f] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a3a3a3] hover:text-white"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold mb-3 text-[#f5f5f5] font-serif">{title}</h3>
        <p className="text-sm text-[#a3a3a3] leading-relaxed mb-6">{description}</p>

        <div className="flex flex-col gap-2.5">
          {isService && (
            <a
              href={`https://wa.me/5567993174612?text=${encodeURIComponent(
                `Olá! Gostaria de saber mais informações sobre o serviço de ${title}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-md bg-[#bef226] text-[#121212] font-semibold text-sm hover:opacity-90 inline-flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp sobre este serviço</span>
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-md bg-[#2b2b2b] text-[#f5f5f5] text-sm font-medium hover:bg-[#383838] transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Product Preview Modal
interface ProductModalProps {
  product: CatalogoItem | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const waOrderText = `Olá, vim pelo cartão NFC da Conectacard e gostaria de pedir o produto: ${product.title}!`;

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content max-w-sm p-5 bg-[#1e1e1e] border border-[#333]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-[#a3a3a3] hover:text-white"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-square w-full rounded-lg overflow-hidden mb-4 bg-black/40 border border-[#2b2b2b]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-[#f5f5f5]">{product.title}</h3>
          {product.price && (
            <span className="text-sm font-extrabold text-[#bef226] bg-[#bef226]/10 px-2 py-0.5 rounded">
              {product.price}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-xs text-[#a3a3a3] leading-relaxed mb-5">
            {product.description}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/5567998342469?text=${encodeURIComponent(waOrderText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-md bg-[#bef226] text-[#121212] font-bold text-xs uppercase tracking-wider hover:opacity-90 inline-flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fazer Pedido no WhatsApp</span>
          </a>

          <a
            href="https://superlimpoprodutosdelimpeza.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-4 rounded-md bg-[#2a2a2a] text-[#ddd] font-medium text-xs hover:bg-[#353535] inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Ver Loja Superlimpo Completa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// 4. QR Code Modal
interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function QrModal({ isOpen, onClose, title }: QrModalProps) {
  const [copied, setCopied] = useState(false);
  const projectId = firebaseConfig?.projectId || "confident-pen-391521";
  const firebaseWebApp = `https://${projectId}.web.app`;
  const firebaseAppCom = `https://${projectId}.firebaseapp.com`;
  const currentAppUrl = typeof window !== "undefined" ? window.location.href : firebaseWebApp;

  const [selectedUrlType, setSelectedUrlType] = useState<"current" | "webapp" | "firebaseapp">("webapp");

  if (!isOpen) return null;

  const activeUrl =
    selectedUrlType === "webapp"
      ? firebaseWebApp
      : selectedUrlType === "firebaseapp"
      ? firebaseAppCom
      : currentAppUrl;

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    activeUrl
  )}`;

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content max-w-sm p-6 bg-[#181818] border border-[#2e2e2e] text-center rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-[#a3a3a3] hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2 text-[#E50914]">
          <QrCode className="w-5 h-5" />
          <h3 className="text-base font-bold text-[#f5f5f5]">Compartilhar Biolink</h3>
        </div>

        <p className="text-xs text-[#a3a3a3] mb-3">
          Escolha o link do seu projeto para gerar o QR Code ou copiar:
        </p>

        {/* URL Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-black/50 border border-white/10 rounded-lg mb-4 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setSelectedUrlType("webapp")}
            className={`py-1.5 px-1 rounded transition-colors truncate ${
              selectedUrlType === "webapp"
                ? "bg-[#E50914] text-white font-bold shadow"
                : "text-[#888] hover:text-white"
            }`}
            title={firebaseWebApp}
          >
            .web.app
          </button>
          <button
            type="button"
            onClick={() => setSelectedUrlType("firebaseapp")}
            className={`py-1.5 px-1 rounded transition-colors truncate ${
              selectedUrlType === "firebaseapp"
                ? "bg-[#E50914] text-white font-bold shadow"
                : "text-[#888] hover:text-white"
            }`}
            title={firebaseAppCom}
          >
            .firebaseapp
          </button>
          <button
            type="button"
            onClick={() => setSelectedUrlType("current")}
            className={`py-1.5 px-1 rounded transition-colors truncate ${
              selectedUrlType === "current"
                ? "bg-[#E50914] text-white font-bold shadow"
                : "text-[#888] hover:text-white"
            }`}
            title="Link atual do navegador"
          >
            App Atual
          </button>
        </div>

        {/* Selected URL badge */}
        <div className="bg-black/40 border border-white/5 rounded-md px-2.5 py-1.5 mb-3 flex items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-1.5 min-w-0 text-[11px] text-[#ccc]">
            <Globe className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
            <span className="truncate font-mono">{activeUrl}</span>
          </div>
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#E50914] hover:underline flex items-center gap-0.5 shrink-0"
            title="Abrir em nova guia"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white p-3 rounded-xl inline-block shadow-xl mx-auto mb-4">
          <img
            src={qrApiUrl}
            alt={`QR Code para ${title}`}
            className="w-44 h-44 block mx-auto"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(activeUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="w-full py-2.5 px-3 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Link Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Link ({selectedUrlType === "webapp" ? ".web.app" : selectedUrlType === "firebaseapp" ? ".firebaseapp.com" : "App"})</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg bg-[#252525] text-[#bbb] hover:text-white text-xs font-medium hover:bg-[#303030] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

