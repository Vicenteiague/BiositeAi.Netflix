import { useState, useEffect } from "react";
import { NetflixNavbar } from "./components/NetflixNavbar";
import { NetflixHero } from "./components/NetflixHero";
import { NetflixRow } from "./components/NetflixRow";
import { NetflixVideoTeaser } from "./components/NetflixVideoTeaser";
import { NetflixBottomNav } from "./components/NetflixBottomNav";
import { NetflixProfileModal } from "./components/NetflixProfileModal";
import { NetflixDetailModal } from "./components/NetflixDetailModal";
import { AuthModal } from "./components/AuthModal";
import { ChatAssistant } from "./components/ChatAssistant";
import { MapSection } from "./components/MapSection";
import { Footer } from "./components/Footer";
import { VideoModal, QrModal } from "./components/Modals";
import type { NetflixCardData } from "./components/NetflixPosterCard";
import type { BiositeData } from "./data/conectacard";
import { getClientData, allClients } from "./data/clients";
import { getCompanyBySlug, seedInitialCompaniesIfEmpty } from "./services/db";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { currentUser, openAuthModal } = useAuth();
  const urlParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const initialClient =
    urlParams?.get("c") || urlParams?.get("cliente") || "start-mkt-local";
  const [currentSlug, setCurrentSlug] = useState(initialClient);
  const [activeTab, setActiveTab] = useState("inicio");
  const [data, setData] = useState<BiositeData>(getClientData(initialClient));

  // Auto-seed initial multiempresa Firestore collections once on boot
  useEffect(() => {
    seedInitialCompaniesIfEmpty();
  }, []);

  // Fetch company data from Firestore on slug change, with local fallback
  useEffect(() => {
    let isCurrent = true;
    getCompanyBySlug(currentSlug).then((loadedData) => {
      if (isCurrent) {
        setData(loadedData);
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [currentSlug]);

  const lettermark = data.netflix?.lettermark || "C";

  // Modals state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    title: string;
    image?: string;
    description?: string;
    price?: string;
    url?: string | null;
    isService?: boolean;
  }>({
    isOpen: false,
    title: "",
  });

  const handleOpenDetail = (card: NetflixCardData) => {
    setDetailModal({
      isOpen: true,
      title: card.title,
      image: card.image,
      description:
        card.description ||
        `Confira todos os detalhes e solicite informações de ${card.title} diretamente pelo nosso canal oficial.`,
      price: card.price,
      url: card.url,
      isService: card.isService,
    });
  };

  const handleHeroSaibaMais = () => {
    setDetailModal({
      isOpen: true,
      title: data.name,
      image: data.banner.src,
      description: data.bio,
      url: null,
      isService: false,
    });
  };

  const handleScrollToLinks = () => {
    setActiveTab("links");
    const el = document.getElementById("links");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectClient = (slug: string) => {
    setCurrentSlug(slug);
    try {
      window.history.pushState({}, "", `?c=${slug}`);
    } catch {
      // Safe fallback in sandboxed frame
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Convert Links to Netflix Card format
  const linksCards: NetflixCardData[] = data.links.map((link, idx) => {
    let badge = "EM ALTA";
    const t = link.title.toLowerCase();
    if (t.includes("whatsapp")) badge = "CONTATO DIRETO";
    else if (t.includes("localização") || t.includes("mapa")) badge = "MAPA GOOGLE";
    else if (t.includes("review") || t.includes("avalie")) badge = "5 ESTRELAS";
    else if (t.includes("instagram")) badge = "REDE OFICIAL";
    else if (t.includes("perfil")) badge = "VERIFICADO";
    else if (t.includes("site")) badge = "WEBSITE";

    return {
      id: link.id,
      title: link.title,
      image: link.image,
      url: link.url,
      ranking: idx + 1,
      badge,
      lettermark,
      category: "Link Direto",
    };
  });

  // Convert Services to Netflix Card format
  const servicesCards: NetflixCardData[] = (data.servicos?.items || []).map(
    (servico, idx) => {
      let badge = "JÁ DISPONÍVEL";
      if (idx === 0) badge = "NOVOS EPISÓDIOS";
      else if (idx === 1) badge = "EM ALTA";
      else if (idx === 2) badge = "POPULAR";
      else if (idx === 3) badge = "EXCLUSIVO";

      let description = `Serviço profissional de ${servico.title} desenvolvido pela equipe ${data.name}.`;
      if (servico.id === "criacao-de-sites") {
        description =
          "Criação de Sites para empresas em geral com destaque total no meio digital! Prazo de entrega: apenas 7 dias. Valor a partir de R$ 500,00.";
      } else if (servico.id === "perfil-google") {
        description =
          "Criação e gestão profissional do perfil da sua empresa no Google (Google Meu Negócio) para atrair clientes locais em todo o Brasil.";
      } else if (servico.id === "trafego-pago") {
        description =
          "Gestão de Tráfego Meta Ads: campanhas de alta conversão no Instagram e Facebook para atrair clientes qualificados diretamente para o WhatsApp.";
      } else if (servico.id === "avaliacard") {
        description =
          "AvaliaCard: Cartão NFC e QR Code com link direto na página de avaliação 5 estrelas do Google. Multiplique a reputação do seu negócio!";
      }

      return {
        id: servico.id,
        title: servico.title,
        image: servico.image,
        url: servico.url,
        ranking: idx + 1,
        badge,
        lettermark,
        category: "Serviço",
        isService: true,
        description,
      };
    }
  );

  // Convert Catalog Items to Netflix Card format
  const catalogCards: NetflixCardData[] = (data.catalogo?.items || []).map(
    (item, idx) => {
      let badge = undefined;
      if (idx === 0) badge = "O MAIS PEDIDO";
      else if (idx === 3) badge = "COMBO FAMÍLIA";
      else if (idx === 4) badge = "ALTO RENDIMENTO";

      return {
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        ranking: idx + 1,
        badge,
        lettermark,
        category: "Produto",
        description:
          item.description ||
          `Produto de alta qualidade ${item.title}. Peça pelo WhatsApp com entrega rápida!`,
      };
    }
  );

  return (
    <div className="min-h-screen bg-[#141414] text-[#f5f5f5] selection:bg-[#E50914] selection:text-white pb-24 md:pb-12">
      {/* 1. Netflix Top Navigation Bar */}
      <NetflixNavbar
        clientName={data.name}
        avatarSrc={data.avatar.src}
        lettermark={lettermark}
        onOpenQr={() => setIsQrOpen(true)}
        onOpenProfiles={() => setIsProfileModalOpen(true)}
        onOpenAuth={openAuthModal}
        currentUserEmail={currentUser?.email || null}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      <main className="max-w-4xl mx-auto">
        {/* 2. Cinematic Hero Billboard */}
        <div id="inicio">
          <NetflixHero
            bannerSrc={data.banner.src}
            avatarSrc={data.avatar.src}
            name={data.name}
            bio={data.bio}
            lettermark={lettermark}
            headline={data.netflix?.headline}
            subheadline={data.netflix?.subheadline}
            genres={data.netflix?.genres}
            matchPercent={data.netflix?.matchPercent}
            tagline={data.netflix?.tagline}
            onOpenInfo={handleHeroSaibaMais}
            onPlayVideo={() => setIsVideoOpen(true)}
            onScrollToLinks={handleScrollToLinks}
          />
        </div>

        {/* 3. Row 1: "🔥 Em Alta na Conectacard | Meus Links" */}
        <NetflixRow
          id="links"
          title={`🔥 Em Alta em ${data.name.split(" ")[0]} | Meus Links`}
          subtitle="Os canais mais acessados da semana"
          items={linksCards}
          defaultLettermark={lettermark}
          showRanking={true}
          onOpenDetail={handleOpenDetail}
        />

        {/* 4. Row 2: "🎬 Vídeo em Destaque | Demonstração Oficial" */}
        {data.video && (
          <NetflixVideoTeaser
            title={data.video.title}
            poster={data.video.poster}
            clientName={data.name}
            lettermark={lettermark}
            onPlay={() => setIsVideoOpen(true)}
          />
        )}

        {/* 5. Row 3: "⭐ Top 10 em Serviços & Soluções" (if client has services) */}
        {servicesCards.length > 0 && (
          <NetflixRow
            id="servicos"
            title="⭐ Top 10 em Serviços & Soluções Digitais"
            subtitle="Séries de soluções para empresas"
            items={servicesCards}
            defaultLettermark={lettermark}
            showRanking={true}
            onOpenDetail={handleOpenDetail}
          />
        )}

        {/* 6. Row 4: "🛒 Originais da Marca | Catálogo de Produtos" */}
        {catalogCards.length > 0 && (
          <NetflixRow
            id="produtos"
            title={`🛒 ${data.catalogo?.title || "Catálogo de Produtos em Destaque"}`}
            subtitle="Tabela de produtos direto da fábrica"
            items={catalogCards}
            defaultLettermark={lettermark}
            showRanking={true}
            onOpenDetail={handleOpenDetail}
          />
        )}

        {/* 7. Row 5: "🤖 Assistente LIA (Original Conectacard)" */}
        <ChatAssistant data={data} />

        {/* 8. Row 6: "📍 Locais de Atendimento & Gravação (Mapa)" */}
        {data.mapa && (
          <MapSection
            embedUrl={data.mapa.embed}
            linkUrl={data.mapa.link}
            title={data.mapa.title}
          />
        )}

        {/* 9. Netflix Profiles Quick Switcher at page bottom */}
        <div className="mt-8 pt-6 border-t border-[#262626] px-4 text-center">
          <p className="text-xs text-[#888888] mb-3 uppercase tracking-wider font-semibold">
            Demonstração de Perfis Netflix:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.keys(allClients).map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => handleSelectClient(slug)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all font-medium cursor-pointer ${
                  currentSlug === slug
                    ? "bg-[#E50914] text-white font-bold shadow-[0_0_12px_rgba(229,9,20,0.5)] scale-105"
                    : "bg-[#1f1f1f] text-[#a3a3a3] hover:text-white hover:bg-[#2a2a2a] border border-[#333]"
                }`}
              >
                {allClients[slug].name}
              </button>
            ))}
          </div>
        </div>

        {/* 10. Footer */}
        <Footer
          footerText={data.footer}
          local={data.contato.local}
          telefone={data.contato.telefone}
          email={data.contato.email}
        />
      </main>

      {/* 11. Mobile Bottom Navigation Bar */}
      <NetflixBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Modals */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={data.video?.title || ""}
        videoUrl={data.video?.url || ""}
      />

      <NetflixDetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal((prev) => ({ ...prev, isOpen: false }))}
        title={detailModal.title}
        image={detailModal.image}
        description={detailModal.description}
        price={detailModal.price}
        url={detailModal.url}
        isService={detailModal.isService}
        lettermark={lettermark}
        clientPhone={data.contato.telefone}
      />

      <NetflixProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentSlug={currentSlug}
        onSelectClient={handleSelectClient}
      />

      <QrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title={data.name}
      />

      {/* Firebase Authentication Modal */}
      <AuthModal />
    </div>
  );
}
