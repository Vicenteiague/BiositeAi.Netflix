import { useState, useRef, useEffect, ReactNode } from "react";
import { MessageCircle, CornerDownLeft, RotateCcw, ExternalLink } from "lucide-react";
import type { BiositeData } from "../data/conectacard";
import { saveMessageToFirestore } from "../services/db";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

interface ChatAssistantProps {
  data: BiositeData;
}

/**
 * Parses plain text containing URLs or Markdown links and renders them as clickable <a> tags.
 */
function renderFormattedText(text: string, isUser: boolean): ReactNode[] {
  // Regex to match markdown links [label](url) or standalone URLs (http:// or https://)
  const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      elements.push(text.substring(lastIndex, matchIndex));
    }

    if (match[1]) {
      // Markdown link: [Label](url)
      const label = match[2];
      const url = match[3];
      elements.push(
        <a
          key={`md-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isUser
              ? "underline font-bold text-black hover:opacity-80 inline-flex items-center gap-0.5 break-all"
              : "text-[#38bdf8] hover:text-[#7dd3fc] font-semibold underline underline-offset-2 inline-flex items-center gap-1 break-all transition-colors cursor-pointer"
          }
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 inline shrink-0 opacity-80" />
        </a>
      );
    } else if (match[4]) {
      // Standalone URL: https://...
      const url = match[4];
      const isWhatsApp = url.includes("whatsapp.com") || url.includes("wa.me");
      elements.push(
        <a
          key={`url-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isUser
              ? "underline font-bold text-black hover:opacity-80 inline-flex items-center gap-0.5 break-all"
              : isWhatsApp
              ? "text-[#22c55e] hover:text-[#4ade80] font-semibold underline underline-offset-2 inline-flex items-center gap-1 break-all transition-colors cursor-pointer"
              : "text-[#38bdf8] hover:text-[#7dd3fc] font-semibold underline underline-offset-2 inline-flex items-center gap-1 break-all transition-colors cursor-pointer"
          }
        >
          <span>{url}</span>
          <ExternalLink className="w-3 h-3 inline shrink-0 opacity-80" />
        </a>
      );
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
}

export function ChatAssistant({ data }: ChatAssistantProps) {
  const liaAvatar = "/assets/lia-avatar.png";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-lia",
      role: "assistant",
      text: "Olá! Eu sou a LIA, assistente virtual inteligente da Conectacard. Estou aqui para tirar suas dúvidas, apresentar nossos serviços e ajudar você a encontrar a melhor solução. Pode perguntar!",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const clientCache = useRef<Map<string, string>>(new Map());

  const sugestoes = [
    "Quais são os serviços?",
    "Quanto custa?",
    "Criação de Sites",
    "Biosite com IA",
    "AvaliaCard",
    "Qual o site da Superlimpo?",
    "Produtos Superlimpo",
    "Como funciona o cartão NFC?",
  ];

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const TABELA_COMPLETA_SUPERLIMPO = `Somos a Superlimpo vendemos produtos de limpeza!

📍 Não temos loja física. Apenas entrega em toda região de Ponta Porã e Pedro Juan Caballero.
⏰ Horários de entrega: até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas.
📄 Não temos Nota Fiscal, apenas Recibo.
🚚 A maioria das entregas não tem custo (pequena taxa dependendo da distância e pedido).

📋 TABELA DE PRODUTOS SUPERLIMPO:

Linha Dona de Casa:
• Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00
• Água sanitária 5 litros: R$ 12,00
• Cloro Ativo 12% 5 litros: R$ 45,00
• Desinfetante Perfumado 5 litros: R$ 15,00
• Sabão de álcool (Feito com óleo novo) 5 litros: R$ 15,00
• Sabão Lava Roupas Azul: R$ 35,00
• Amaciante de roupa 5 litros: R$ 25,00
• Alvejante sem cloro 5 litros (Tipo Vanish): R$ 30,00
• Lava louças 5 litros: R$ 25,00
• Limpa Pedras 5 litros: R$ 30,00
• Limpa Porcelanato & Cerâmica 5 litros: R$ 30,00

Linha Empresas:
• Limpa Chapas 5 litros: R$ 30,00
• Brilho alumínio 5 litros: R$ 30,00
• Shampoo Automotivo 5 litros: R$ 30,00
• Desengraxante Automotivo 5 litros: R$ 30,00
• Ativado 5L: R$ 30,00

📲 Peça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469
🌐 Nosso Site: https://superlimpoprodutosdelimpeza.lovable.app/`;

  const TABELA_PRECOS_BIOSITEAI = `Nossos Preços:

1️⃣ Biosites sem Chatbot somente o link: Preço promocional R$ 99,00

2️⃣ Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês.

Peça o seu pelo WhatsApp: https://wa.me/5567993174612`;

  const findSmartResponse = (query: string): string => {
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 1. Superlimpo: Horários de entrega
    if (q.includes("horario") || q.includes("que horas") || q.includes("sabado") || (q.includes("entrega") && (q.includes("hora") || q.includes("quando") || q.includes("tempo")))) {
      return "As entregas da Superlimpo são feitas até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas em toda Ponta Porã e Pedro Juan Caballero.";
    }

    // 2. Superlimpo: Nota Fiscal / Recibo
    if (q.includes("nota") || q.includes("fiscal") || q.includes("recibo") || q.includes("comprovante")) {
      return "Não temos Nota Fiscal, apenas Recibo.";
    }

    // 3. Superlimpo: Taxa de entrega / Frete
    if (q.includes("taxa") || q.includes("frete") || (q.includes("quanto") && q.includes("entrega"))) {
      return "Dependendo da distância e do pedido existe uma pequena taxa de entrega. Mas a maioria das entregas não tem custo!";
    }

    // 4. Superlimpo: Loja física
    if (q.includes("loja") || q.includes("fisica") || q.includes("onde fica a loja") || q.includes("tem loja")) {
      return "Não temos loja física. Trabalhamos exclusivamente com entregas em toda a região de Ponta Porã e Pedro Juan Caballero!";
    }

    // 5. Sites oficiais
    if (q.includes("site") || q.includes("link do site") || q.includes("pagina") || q.includes("catalogo online")) {
      if (q.includes("superlimpo") || q.includes("limpeza") || q.includes("produto")) {
        return "O site oficial da Superlimpo é: https://superlimpoprodutosdelimpeza.lovable.app/\n\nLá você confere nosso catálogo completo de produtos direto de fábrica e pode pedir com entrega rápida em Ponta Porã e Pedro Juan Caballero!";
      }
      return "Nosso site oficial da Start Mkt Local / Conectacard é: https://www.startmktlocal.com.br/\nE o site da Superlimpo é: https://superlimpoprodutosdelimpeza.lovable.app/";
    }

    // 6. Superlimpo: Tabela completa de produtos e preços (quando pergunta por produtos de limpeza, superlimpo, tabela, kit, sabao, etc.)
    const isSuperlimpoQuery =
      q.includes("superlimpo") ||
      q.includes("limpeza") ||
      q.includes("sabao") ||
      q.includes("desinfetante") ||
      q.includes("cloro") ||
      q.includes("amaciante") ||
      q.includes("alvejante") ||
      q.includes("detergente") ||
      q.includes("lava loucas") ||
      q.includes("limpa pedras") ||
      q.includes("porcelanato") ||
      q.includes("limpa chapas") ||
      q.includes("brilho aluminio") ||
      q.includes("shampoo automotivo") ||
      q.includes("desengraxante") ||
      q.includes("ativado") ||
      (q.includes("kit") && !q.includes("nfc"));

    if (isSuperlimpoQuery) {
      // Itens específicos rápidos
      if (q.includes("kit") && (q.includes("quanto") || q.includes("preco") || q.includes("valor") || q.includes("como e"))) {
        return "Nosso Kit Econômico Dona de Casa vem com 3 galões de 5 litros (Água Sanitária 5L, Desinfetante 5L e Sabão de Álcool 5L) todos os 3 por apenas R$ 38,00!\n\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469";
      }
      if (q.includes("cloro") && (q.includes("quanto") || q.includes("preco") || q.includes("valor"))) {
        return "Cloro Ativo 12% 5 litros: R$ 45,00 (e Água Sanitária 5 litros: R$ 12,00).\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469";
      }
      if (q.includes("amaciante") && (q.includes("quanto") || q.includes("preco") || q.includes("valor"))) {
        return "Amaciante de roupa 5 litros: R$ 25,00.\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469";
      }
      if (q.includes("sabao lava roupas") || q.includes("sabao azul") || (q.includes("azul") && q.includes("sabao"))) {
        return "Sabão Lava Roupas Azul: R$ 35,00 (5 litros).\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469";
      }
      if (q.includes("sabao de alcool") || q.includes("oleo novo")) {
        return "Sabão de álcool (Feito com óleo novo) 5 litros: R$ 15,00.\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469";
      }
      if (q.includes("desinfetante") && (q.includes("quanto") || q.includes("preco") || q.includes("valor"))) {
        return "Desinfetante Perfumado 5 litros: R$ 15,00.\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469";
      }
      // Sempre retorna a TABELA COMPLETA para qualquer pergunta geral de produtos, preços ou catálogo da Superlimpo!
      return TABELA_COMPLETA_SUPERLIMPO;
    }

    // --- START MKT LOCAL & LIA: SERVIÇOS E CATÁLOGO ESPECÍFICOS ---

    // A. Criação de Sites
    if (q.includes("criacao de site") || q.includes("criar site") || q.includes("fazer site") || (q.includes("site") && (q.includes("empresa") || q.includes("quanto") || q.includes("desenvolv") || q.includes("preco") || q.includes("valor")) && !q.includes("superlimpo") && !q.includes("link do site") && !q.includes("qual o site"))) {
      return "Criação de Sites para empresas em geral com destaque total no meio digital!\n\nPrazo de entrega: apenas 7 dias. Valor: a partir de R$ 500,00.\n\nQuer que eu te mostre como estruturar o site ideal para a sua empresa? Me chame no WhatsApp: https://wa.me//5567993174512";
    }

    // B. Biosites com atendimento Virtual (IA 24h)
    if (
      (q.includes("biosite") && (q.includes("virtual") || q.includes("ia") || q.includes("inteligente") || q.includes("atendimento") || q.includes("167"))) ||
      (q.includes("atendimento virtual") && !q.includes("superlimpo"))
    ) {
      return "Criação de Biosites com atendimento 24h por agentes de IA treinados para saber tudo da sua empresa!\n\nValor: R$ 167,00 + R$ 50,00/mês de manutenção do Agente de IA. Modelo de demonstração: https://vicenteiaguebiositegoogleia.vercel.app/\n\nQuer ter um biosite inteligente atendendo seus clientes 24 horas por dia?";
    }

    // C. Avaliacard (Cartão NFC / QR Code de Avaliação Google)
    if (q.includes("avaliacard") || q.includes("avaliacao do google") || q.includes("avaliacoes no google") || (q.includes("avaliacao") && q.includes("google"))) {
      return "AvaliaCard: Cartão NFC e QR Code com link direto na página de avaliação 5 estrelas da sua empresa no Google!\n\nValor: apenas R$ 89,00 + Frete grátis para todo o Brasil. Conheça no site: https://avaliacard.vercel.app/\n\nQuer multiplicar a confiança e as avaliações do seu negócio no Google?";
    }

    // D. Gestor Google Meu Negócio
    if (q.includes("google meu negocio") || q.includes("perfil de empresa no google") || q.includes("perfil do google") || (q.includes("gestor") && q.includes("google"))) {
      return "Gestor Google Meu Negócio: criação e gestão profissional do perfil da sua empresa no Google para atrair clientes locais em todo o Brasil!\n\nValor: R$ A combinar.\n\nPodemos fazer um diagnóstico gratuito do seu perfil hoje? Fale comigo: https://wa.me//5567993174512";
    }

    // E. Gestor de Tráfego Meta Ads
    if (q.includes("meta ads") || q.includes("trafego") || q.includes("anuncio no instagram") || q.includes("anuncios no facebook") || q.includes("campanhas")) {
      return "Gestor de Tráfego Meta Ads: criação e otimização de campanhas de marketing de alta conversão no Instagram e Facebook para empresas de todo o Brasil!\n\nValor: R$ A combinar.\n\nQuer atrair um fluxo constante de clientes prontos para comprar no seu WhatsApp? Chame aqui: https://wa.me//5567993174512";
    }

    // F. Criação de Agente de IA para WhatsApp
    if ((q.includes("agente") && q.includes("ia")) || q.includes("ia no whatsapp") || q.includes("ia para whatsapp") || q.includes("robo de whatsapp") || q.includes("bot whatsapp")) {
      return "Criação de Agente de IA para atendimento no WhatsApp da sua empresa: atendimento 24h com conhecimento total do catálogo e sem filas!\n\nValor: R$ A combinar.\n\nQuer ver uma demonstração prática de como a IA pode vender por você no WhatsApp? Me envie uma mensagem: https://wa.me//5567993174512";
    }

    // --- QUEBRA DE OBJEÇÕES E FAQ GERAIS ---

    // G. Desconto se fechar hoje / PIX
    if (q.includes("desconto") || q.includes("fechar hoje") || (q.includes("pix") && (q.includes("desconto") || q.includes("a vista")))) {
      return "No pagamento via PIX já aplicamos 5% de desconto imediato!\n\nSe você quiser fechar um pacote com mais de um item, posso chamar nosso especialista no WhatsApp para liberar uma condição especial para você: https://wa.me//5567993174512\n\nQual serviço você tem interesse em contratar?";
    }

    // H. Garantia
    if (q.includes("garantia")) {
      return "Você tem 15 dias de garantia total! Se tiver qualquer problema, resolvemos sem nenhuma burocracia.\n\nPodemos iniciar o seu projeto com total segurança? Me avise por aqui ou no WhatsApp: https://wa.me//5567993174512";
    }

    // I. Objeção: Achei o valor alto / Vou pensar / Caro
    if (q.includes("alto") || q.includes("caro") || q.includes("vou pensar") || q.includes("pensar") || q.includes("depois vejo")) {
      return "Entendo perfeitamente! Mas vale lembrar que todos os nossos produtos são de alto desempenho para alavancagem dos Negócios Locais, o que economiza tempo e dinheiro para você.\n\nQuer que eu te mostre a opção de parcelamento em até 3x sem juros para caber tranquilo no seu orçamento?";
    }

    // J. Formas de pagamento
    if (q.includes("forma de pagamento") || q.includes("formas de pagamento") || q.includes("pagar") || q.includes("parcela") || q.includes("cartao") || q.includes("pix")) {
      return "Nossas formas de pagamento são bem flexíveis:\n\n• PIX (com 5% de desconto imediato!)\n• Cartão de Crédito em até 3x sem juros\n• Cartão de Débito\n\nQual opção fica mais confortável para o seu momento?";
    }

    // K. Horário de funcionamento Start Mkt Local
    if (q.includes("horario de funcionamento") || q.includes("que horas abre") || q.includes("expediente") || (q.includes("horario") && (q.includes("atendimento") || q.includes("start")))) {
      return "Nosso horário de funcionamento na Start Mkt Local é de Segunda a Sexta, das 08h às 18h | Sábado, das 08h às 12h.\n\nComo posso ajudar você agora? Se preferir, fale direto no WhatsApp: https://wa.me//5567993174512";
    }

    // L. Quem somos / Start Mkt Local
    if (q.includes("start mkt") || q.includes("start marketing") || (q.includes("quem e") && q.includes("start"))) {
      return "A Start Mkt Local é uma agência de marketing digital sediada em Ponta Porã (MS), atuando em todo o Brasil. Desenvolvemos sites, biosites com IA, cartões NFC, gestão de tráfego e perfis no Google!\n\nWebsite: https://www.startmktlocal.com.br/\nWhatsApp: https://wa.me//5567993174512\n\nQual área a sua empresa deseja impulsionar hoje?";
    }

    // 7. Conectacard / BiositeAi: Preços, Valores, Planos, Orçamento
    if (
      q.includes("quanto custa") ||
      q.includes("preco") ||
      q.includes("valor") ||
      q.includes("tabela") ||
      q.includes("orcamento") ||
      q.includes("plano") ||
      q.includes("custo") ||
      q.includes("promocao") ||
      q.includes("quanto e") ||
      q.includes("tabela de preco")
    ) {
      return TABELA_PRECOS_BIOSITEAI;
    }

    // 8. O que é o BiositeAi / Conectacard
    if (q.includes("biosite") || q.includes("biositeai") || q.includes("mini site") || q.includes("linktree") || q.includes("o que e biosite")) {
      return `O BiositeAi é um mini site inteligente completo com biosite interativo, atendente virtual LIA com inteligência artificial, cartões NFC e plaquinhas com QR Code!\n\n${TABELA_PRECOS_BIOSITEAI}`;
    }

    // 9. Serviços oferecidos
    if (q.includes("servico") || q.includes("quais sao os servicos") || q.includes("o que a empresa oferece") || q.includes("o que voces fazem")) {
      return "A Start Mkt Local e a Conectacard oferecem soluções completas para alavancar seu negócio:\n\n• Cartões NFC Infinitos e Plaquinhas QR Code\n• Criação de Sites profissionais (a partir de R$ 500,00)\n• Biosite com atendimento Virtual de IA 24h (R$ 167,00)\n• Gestor Google Meu Negócio e Tráfego Meta Ads\n• AvaliaCard para avaliações 5 estrelas no Google (R$ 89,00)\n• Linha Superlimpo de produtos de limpeza direto de fábrica!\n\nQual dessas soluções mais te interessa?";
    }

    // 10. Como funciona o Cartão NFC
    if (q.includes("como funciona") || q.includes("nfc") || q.includes("aproximac") || q.includes("funciona o cartao") || q.includes("como usa")) {
      return "O Cartão NFC Conectacard possui tecnologia por aproximação. Basta encostar o cartão na parte traseira de qualquer celular moderno com NFC (iPhone ou Android) e o seu biosite abre na hora com seus contatos, catálogo e redes sociais, sem precisar instalar nenhum aplicativo!\n\nQuer personalizar um cartão com a sua marca?";
    }

    // 11. Contatos / WhatsApp
    if (q.includes("falar com alguem") || q.includes("humano") || q.includes("atendente") || q.includes("whatsapp") || q.includes("contato") || q.includes("telefone")) {
      return "Com certeza! Nossos canais de atendimento direto:\n\n💳 Start Mkt Local & Conectacard: WhatsApp https://wa.me//5567993174512\n\n🧼 Superlimpo Produtos de Limpeza: WhatsApp https://api.whatsapp.com/send?phone=5567998342469\n\nEm qual desses assuntos posso te direcionar agora?";
    }

    // 12. Entregas e frete gerais
    if (q.includes("entrega") || q.includes("frete") || q.includes("onde entrega") || q.includes("fronteira") || q.includes("correios") || q.includes("envio")) {
      return "• Produtos de limpeza Superlimpo: entregas até às 16h (sábados às 7h e 15:30h) em Ponta Porã e Pedro Juan Caballero.\n• Cartões NFC, Plaquinhas e AvaliaCard: envio para todo o Brasil via Correios com código de rastreamento!\n\nQual o seu CEP ou cidade para verificarmos?";
    }

    // 13. Endereço e localização
    if (q.includes("onde") || q.includes("endereco") || q.includes("localizacao") || q.includes("cidade") || q.includes("fica") || q.includes("mapa")) {
      return "Estamos localizados em Ponta Porã, MS (Start Mkt Local - Rua Luiz Pinto Magalhães, 154 - Santa Isabel). Atendemos presencialmente toda a região de fronteira e o Brasil inteiro de forma digital!\n\nVeja no Google Maps: https://www.google.com/maps/search/?api=1&query=Start+Mkt+Local+-+Rua+Luiz+Pinto+Magalh%C3%A3es,+154+-+Santa+Isabel,+Ponta+Por%C3%A3+-+MS\n\nQuer agendar uma conversa ou consultoria?";
    }

    // 14. Personalização de cartões
    if (q.includes("personaliz") || q.includes("logo") || q.includes("arte") || q.includes("minha marca") || q.includes("impressao")) {
      return "Sim! Nossos cartões e plaquinhas são 100% personalizados com o logotipo, cores e identidade visual da sua marca com acabamento premium de alta durabilidade.\n\nFale conosco pelo WhatsApp para enviar sua logo: https://wa.me//5567993174512\n\nVocê já tem a arte pronta ou precisa de ajuda?";
    }

    // 15. Regra de Ouro (Guardrails do BiositesAI):
    // Se a informação não existir no banco de dados da empresa, responder exatamente conforme exigido:
    const cleanPhone = (data.contato?.telefone || "67993174512").replace(/\D/g, "");
    if (isSuperlimpoQuery) {
      return "Não tenho essa informação no momento. Vou encaminhar você para o atendimento humano: https://api.whatsapp.com/send?phone=5567998342469";
    }

    return `Não tenho essa informação no momento. Vou encaminhar você para o atendimento humano: https://wa.me/55${cleanPhone}`;
  };

  // Unique session conversation ID for logging to Firestore
  const sessionIdRef = useRef<string>("sess-" + Date.now());

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    // Asynchronously log user message to Firestore
    saveMessageToFirestore(data.slug, sessionIdRef.current, "user", query);

    const norm = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const normKey = norm.replace(/[?!.,;]/g, "");

    // 1. Instant client-side cache check (0ms network latency for repeated questions)
    if (clientCache.current.has(normKey)) {
      const cachedReply = clientCache.current.get(normKey)!;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: "a-" + Date.now(), role: "assistant", text: cachedReply },
        ]);
        saveMessageToFirestore(data.slug, sessionIdRef.current, "assistant", cachedReply);
        setIsTyping(false);
      }, 180);
      return;
    }

    // 2. Fast-path: Greetings
    const greetings = ["oi", "ola", "bom dia", "boa tarde", "boa noite", "opa", "e ai", "tudo bem", "ola tudo bem"];
    if (greetings.includes(norm)) {
      setTimeout(() => {
        const greetingReply = `Olá! Eu sou a LIA 👋 Como posso ajudar você hoje com os dados e catálogo da ${data.name}? Fique à vontade para perguntar!`;
        clientCache.current.set(normKey, greetingReply);
        setMessages((prev) => [
          ...prev,
          {
            id: "a-" + Date.now(),
            role: "assistant",
            text: greetingReply,
          },
        ]);
        saveMessageToFirestore(data.slug, sessionIdRef.current, "assistant", greetingReply);
        setIsTyping(false);
      }, 200);
      return;
    }

    // 3. Fast-path: Direct smart match from database (Instant and 100% accurate, no waiting, no timeouts)
    const directSmartResponse = findSmartResponse(query);
    const isHumanFallback = directSmartResponse.startsWith("Não tenho essa informação no momento");

    // If we have a verified database match (not fallback), answer immediately without making the user wait!
    if (!isHumanFallback) {
      setTimeout(() => {
        clientCache.current.set(normKey, directSmartResponse);
        setMessages((prev) => [
          ...prev,
          { id: "a-" + Date.now(), role: "assistant", text: directSmartResponse },
        ]);
        saveMessageToFirestore(data.slug, sessionIdRef.current, "assistant", directSmartResponse);
        setIsTyping(false);
      }, 260);
      return;
    }

    // 4. Try calling server AI endpoint with all dynamic company variables
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const cleanPhone = (data.contato?.telefone || "67993174512").replace(/\D/g, "");
      const isSuperlimpo = data.slug === "superlimpo" || data.name?.toLowerCase().includes("superlimpo");
      const humanSupportChannel = isSuperlimpo
        ? "https://api.whatsapp.com/send?phone=5567998342469"
        : `https://wa.me/55${cleanPhone}`;

      const companyInfo = {
        name: data.name,
        slug: data.slug,
        tagline: data.netflix?.headline || data.netflix?.tagline || "",
        description: data.bio || "",
        category: data.netflix?.genres?.join(", ") || "",
        phone: data.contato?.telefone || "",
        whatsapp: isSuperlimpo ? "5567998342469" : `55${cleanPhone}`,
        email: data.contato?.email || "",
        address: data.contato?.local || data.mapa?.title || "",
        website: data.produtos?.url || "https://www.startmktlocal.com.br/",
        mapsUrl: data.mapa?.link || "",
        hours: isSuperlimpo
          ? "Entregas até às 16h | Sábados às 07h e às 15:30h"
          : "Segunda a Sexta das 08h às 18h | Sábado das 08h às 12h",
        products: (data.catalogo?.items || []).map((p) => ({
          name: p.title,
          price: p.price || "",
          description: p.description || "",
        })),
        services: (data.servicos?.items || []).map((s) => ({
          name: s.title,
          url: s.url || "",
          description: s.title,
        })),
        links: (data.links || []).map((l) => ({
          title: l.title,
          url: l.url || "",
        })),
        knowledge: data.atendimento?.conhecimento || "",
        faq: [
          ...(data.atendimento?.empresa || []),
          ...(data.atendimento?.produtos || []),
        ],
        humanSupportChannel,
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          clientName: data.name,
          companyInfo,
          clientKnowledge: `Assistente: LIA.\n${data.atendimento?.conhecimento || ""}\n\nPerguntas Frequentes:\n${[
            ...(data.atendimento?.empresa || []),
            ...(data.atendimento?.produtos || []),
          ]
            .map((i) => `P: ${i.pergunta}\nR: ${i.resposta}`)
            .join("\n")}`,
          history: messages,
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.reply && !json.isFallback) {
          clientCache.current.set(normKey, json.reply);
          setMessages((prev) => [
            ...prev,
            { id: "a-" + Date.now(), role: "assistant", text: json.reply },
          ]);
          saveMessageToFirestore(data.slug, sessionIdRef.current, "assistant", json.reply);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Abort or network failure -> seamlessly falls through to local matching
    }

    // 5. Final fallback to local intelligent matching
    setTimeout(() => {
      const responseText = directSmartResponse;
      clientCache.current.set(normKey, responseText);
      setMessages((prev) => [
        ...prev,
        { id: "a-" + Date.now(), role: "assistant", text: responseText },
      ]);
      saveMessageToFirestore(data.slug, sessionIdRef.current, "assistant", responseText);
      setIsTyping(false);
    }, 250);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "init-lia-" + Date.now(),
        role: "assistant",
        text: "Olá! Eu sou a LIA, assistente virtual inteligente da Conectacard. Estou aqui para tirar suas dúvidas, apresentar nossos serviços e ajudar você a encontrar a melhor solução. Pode perguntar!",
      },
    ]);
  };

  return (
    <section id="lia" className="my-8 px-4 sm:px-6" aria-label="Atendimento com LIA">
      {/* 1. LIA Model Card (Netflix Original Style) */}
      <div className="bg-[#181818] text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#2e2e2e] mb-3 text-left relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Netflix Original Ribbon Tag */}
        <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold text-[#E50914] uppercase tracking-widest">
          <span className="font-netflix text-lg leading-none">N</span>
          <span>SÉRIE ORIGINAL CONECTAFLIX</span>
          <span className="text-white/40">·</span>
          <span className="text-emerald-400 font-extrabold">99% RELEVANTE</span>
        </div>

        {/* Header: Avatar + Title + Online Badge */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <img
              src={liaAvatar}
              alt="LIA - Assistente virtual inteligente"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-[#E50914] shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-[#E50914] text-white text-[8px] font-black rounded uppercase">
              IA
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-display">
                <span>Olá! Eu sou a LIA</span>
                <span className="text-base">👋</span>
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#a3a3a3] mt-0.5">
              Assistente virtual com inteligência artificial
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#cccccc] leading-relaxed mt-3.5 font-normal">
          Estou aqui para tirar suas dúvidas, apresentar nossos serviços e ajudar você a encontrar a melhor solução. Pode perguntar!
        </p>

        {/* Suggestion Chips Box */}
        <div className="mt-3.5 bg-[#121212] border border-[#2b2b2b] rounded-xl p-3">
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-2">
            Sugestões de perguntas rápidas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sugestoes.map((sugestao, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isTyping}
                onClick={() => handleSend(sugestao)}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#1f1f1f] hover:bg-[#E50914] hover:text-white text-[#d4d4d4] border border-[#333333] hover:border-[#E50914] transition-all shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {sugestao}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Chat Transcript Area */}
      <div className="flex items-center justify-between px-1 mb-1.5">
        <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Conversa ao vivo com LIA</span>
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-[#a3a3a3] hover:text-white inline-flex items-center gap-1 px-2 py-0.5 rounded transition-colors cursor-pointer"
          title="Reiniciar conversa"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar</span>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="cliente-chat-transcript bg-[#0f0f0f] rounded-xl p-3.5 border border-[#262626] max-h-72 overflow-y-auto space-y-2.5 shadow-inner"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start gap-2"}`}
          >
            {msg.role === "assistant" && (
              <img
                src={liaAvatar}
                alt="LIA"
                className="w-6 h-6 rounded-md object-cover shrink-0 border border-[#E50914] mt-0.5 shadow-xs"
              />
            )}
            {msg.role === "user" ? (
              <div className="cliente-chat-question bg-[#E50914] text-white font-semibold text-xs sm:text-sm py-2 px-3.5 rounded-2xl rounded-tr-xs max-w-[85%] shadow-md">
                <div className="whitespace-pre-wrap">{renderFormattedText(msg.text, true)}</div>
              </div>
            ) : (
              <div className="bg-[#1c1c1c] border border-[#2e2e2e] p-3 rounded-2xl rounded-tl-xs text-[#e5e5e5] text-xs sm:text-sm leading-relaxed max-w-[85%] shadow-sm">
                <div className="whitespace-pre-wrap">{renderFormattedText(msg.text, false)}</div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#a3a3a3] bg-[#1a1a1a] px-3 py-1.5 rounded-xl border border-[#333] w-fit">
            <img
              src={liaAvatar}
              alt="LIA"
              className="w-4 h-4 rounded-md object-cover shrink-0"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
            <span className="italic">LIA está digitando...</span>
          </div>
        )}
      </div>

      {/* 3. Text Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative my-2.5"
      >
        <div className="flex items-center bg-[#181818] border border-[#333333] focus-within:border-[#E50914] focus-within:ring-1 focus-within:ring-[#E50914] rounded-xl p-1.5 transition-all">
          <textarea
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Pergunte qualquer coisa para a LIA…"
            aria-label="Sua pergunta para a LIA"
            className="w-full bg-transparent border-0 resize-none outline-none text-xs sm:text-sm text-white placeholder-[#737373] min-h-[38px] max-h-24 py-1.5 px-2.5"
            rows={1}
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="size-8 rounded-lg bg-[#E50914] hover:bg-[#b81d24] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white shrink-0 transition-all shadow-sm ml-1 active:scale-95 cursor-pointer"
            title="Enviar para LIA"
            aria-label="Enviar mensagem"
          >
            <CornerDownLeft className="size-4" />
          </button>
        </div>
      </form>

      {/* 4. WhatsApp Handoff Button */}
      <a
        href={`https://wa.me/55${data.contato.telefone}?text=Olá!%20Estava%20conversando%20com%20a%20LIA%20no%20Netflix%20Conectacard%20e%20gostaria%20de%20atendimento%20humano.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full shadow-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01] active:scale-98"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Falar no WhatsApp com Atendente Humano</span>
      </a>
    </section>
  );
}
