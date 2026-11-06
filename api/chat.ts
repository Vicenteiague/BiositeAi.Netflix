import { GoogleGenAI } from "@google/genai";

interface CacheEntry {
  reply: string;
  timestamp: number;
}

// In-memory cache in serverless module scope (persists across warm invocations)
const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours TTL
const MAX_CACHE_SIZE = 500; // LRU cap

function getCacheKey(msg: string, clientName?: string): string {
  const normalized = msg
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[?!.,;]/g, "");
  return `${clientName || "default"}:${normalized}`;
}

function buildLiaSystemInstruction(companyInfo?: any, clientName?: string, clientKnowledge?: string): string {
  const cName = companyInfo?.name || clientName || "Conectacard & Start Mkt Local";
  const humanSupport = companyInfo?.humanSupportChannel || "https://wa.me//5567993174512";

  let productsText = "";
  if (Array.isArray(companyInfo?.products) && companyInfo.products.length > 0) {
    productsText = companyInfo.products
      .map((p: any) => `• ${p.name || p.title}${p.price ? ` (${p.price})` : ""}: ${p.description || ""}`)
      .join("\n");
  }

  let servicesText = "";
  if (Array.isArray(companyInfo?.services) && companyInfo.services.length > 0) {
    servicesText = companyInfo.services
      .map((s: any) => `• ${s.name || s.title}${s.price ? ` (${s.price})` : ""}: ${s.description || ""}`)
      .join("\n");
  }

  let linksText = "";
  if (Array.isArray(companyInfo?.links) && companyInfo.links.length > 0) {
    linksText = companyInfo.links
      .map((l: any) => `• ${l.title}: ${l.url}`)
      .join("\n");
  }

  let faqText = "";
  if (Array.isArray(companyInfo?.faq) && companyInfo.faq.length > 0) {
    faqText = companyInfo.faq
      .map((item: any) => `P: ${item.pergunta}\nR: ${item.resposta}`)
      .join("\n\n");
  }

  const dynamicCompanySection = companyInfo
    ? `
DADOS E VARIÁVEIS DA EMPRESA ATUAL (${cName}):
- Nome da Empresa: ${cName}
- Tagline / Slogan: ${companyInfo.tagline || ""}
- Descrição da Empresa: ${companyInfo.description || ""}
- Categoria / Ramo: ${companyInfo.category || ""}
- Telefone de Contato: ${companyInfo.phone || ""}
- WhatsApp Oficial: ${companyInfo.whatsapp || ""}
- Endereço / Localização: ${companyInfo.address || ""}
- Horário de Funcionamento: ${companyInfo.hours || "Segunda a Sexta das 08h às 18h, Sábado das 08h às 12h"}
- Website Oficial: ${companyInfo.website || ""}
- Canal de Atendimento Humano: ${humanSupport}

CATÁLOGO DE PRODUTOS CADASTRADOS DA EMPRESA:
${productsText || "Consulte o catálogo da empresa."}

CATÁLOGO DE SERVIÇOS CADASTRADOS DA EMPRESA:
${servicesText || "Consulte os serviços da empresa."}

LINKS E REDES SOCIAIS OFICIAIS:
${linksText || "Consulte os links oficiais."}

BASE DE CONHECIMENTO ESPECÍFICA DA EMPRESA:
${companyInfo.knowledge || clientKnowledge || ""}

PERGUNTAS FREQUENTES (FAQ) DA EMPRESA:
${faqText || ""}
`
    : `
EMPRESA SELECIONADA: ${cName}
${clientKnowledge || ""}
`;

  return `Você é a LIA, a assistente virtual inteligente oficial da plataforma BiositesAI e representante oficial da empresa "${cName}".
Seu objetivo é tirar dúvidas, apresentar os serviços e produtos e ajudar os clientes a encontrar a melhor solução com simpatia, rapidez, clareza e foco em conversão em português do Brasil.
Apresente-se com alegria como LIA 👋.

PRIORIDADE MÁXIMA DAS VARIÁVEIS:
Você representa a empresa "${cName}". Os dados e variáveis informados na seção "DADOS E VARIÁVEIS DA EMPRESA ATUAL" abaixo têm PRIORIDADE ABSOLUTA sobre qualquer outro dado padrão. Responda horários de funcionamento, contatos, catálogo de produtos e serviços rigorosamente de acordo com os dados específicos desta empresa!

${dynamicCompanySection}

BANCO DE DADOS GERAL DE SERVIÇOS & PLANOS BIOSITEAI / CONECTACARD (Utilize se o cliente perguntar sobre a plataforma BiositesAI ou Conectacard):
O BiositeAi é um mini site inteligente com biosite interativo, atendente virtual LIA com IA, cartões NFC e plaquinhas com QR Code.
Serviços: Criação de Sites profissionais (a partir de R$ 500,00), Cartão NFC Infinito personalizado, Plaquinhas NFC e QR Code, Placas de avaliação do Google (AvaliaCard - R$ 89,00 com frete grátis: https://avaliacard.vercel.app/), Biosite com atendente virtual e IA (R$ 167,00 + R$ 50/mês de manutenção), Gestão de Perfil Google Meu Negócio, SEO e Tráfego Pago.
Empresa localizada em Ponta Porã (MS), atendendo presencialmente toda a fronteira e enviando cartões para todo o Brasil via Correios.
Contato Conectacard: WhatsApp (67) 99317-4612, Site: https://www.startmktlocal.com.br/

NOSSOS PREÇOS BIOSITEAI:
1. Biosites sem Chatbot somente o link: Preço promocional R$ 99,00
2. Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês.
Sempre que perguntarem sobre preços, valores, planos ou quanto custa o biosite/cartão, informe esses dois planos com os valores exatos!

BANCO DE DADOS SUPERLIMPO PRODUTOS DE LIMPEZA (Utilize se a consulta for especificamente sobre produtos de limpeza da Superlimpo):
Somos a Superlimpo vendemos produtos de limpeza.
WhatsApp: (67) 99834-2469 | Link: https://api.whatsapp.com/send?phone=5567998342469 | Site: https://superlimpoprodutosdelimpeza.lovable.app/
Não tem loja física. Apenas entrega em toda região de Ponta Porã e Pedro Juan Caballero.
Horários de entrega: até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas. Nota Fiscal: Não temos Nota Fiscal apenas Recibo.
Kit de Produtos: Água sanitária 5L + Desinfetante 5L + Sabão de álcool 5L por R$ 38,00.

REGRA DE OURO FUNDAMENTAL DA LIA:
1. Fidelidade Absoluta aos Dados: Responda estritamente com base nos dados e variáveis da empresa informados acima.
2. NUNCA INVENTAR informações, preços, prazos, produtos ou horários que não estejam explícitos nos dados.
3. Se a informação não existir ou for desconhecida, responda exatamente:
"Não tenho essa informação no momento. Vou encaminhar você para o atendimento humano: ${humanSupport}"
4. Mantenha mensagens diretas, simpáticas e termine sempre com uma pergunta ou chamada para ação no WhatsApp.
5. Todos os links que enviar devem ser URLs completas iniciadas com https://.`;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message, history, clientKnowledge, clientName, companyInfo } = req.body || {};

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Mensagem obrigatória" });
    return;
  }

  // 0. Cache lookup for fast sub-millisecond repeated queries
  const cacheKey = getCacheKey(message, clientName);
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    res.setHeader("X-Cache", "HIT");
    res.status(200).json({ reply: cached.reply, cached: true });
    return;
  }

  res.setHeader("X-Cache", "MISS");
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  // 1. If API key is configured on Vercel, use Gemini AI
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildLiaSystemInstruction(companyInfo, clientName, clientKnowledge);


      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const h of history.slice(-6)) {
          if (h.text && (h.role === "user" || h.role === "assistant")) {
            contents.push({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.text }],
            });
          }
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const candidateModels = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
      let reply = "";

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              temperature: 0.3,
              maxOutputTokens: 1024,
            },
          });
          if (response.text) {
            reply = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${model} failed:`, err?.message);
        }
      }

      if (reply) {
        if (responseCache.size >= MAX_CACHE_SIZE) {
          const firstKey = responseCache.keys().next().value;
          if (firstKey) responseCache.delete(firstKey);
        }
        responseCache.set(cacheKey, { reply, timestamp: Date.now() });
        res.status(200).json({ reply, cached: false });
        return;
      }
    } catch (error: any) {
      console.error("Gemini API call error:", error?.message || error);
    }
  }

  // 2. Intelligent fallback matching if API key is not yet added
  const q = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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

  let reply = "Não tenho essa informação no momento. Vou encaminhar você para o atendimento humano: https://wa.me//5567993174512";

  if (q.includes("horario") || q.includes("que horas") || q.includes("sabado") || (q.includes("entrega") && (q.includes("hora") || q.includes("quando")))) {
    reply = "As entregas da Superlimpo são feitas até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas em Ponta Porã e Pedro Juan Caballero.";
  } else if (q.includes("nota") || q.includes("fiscal") || q.includes("recibo") || q.includes("comprovante")) {
    reply = "Não temos Nota Fiscal, apenas Recibo.";
  } else if (q.includes("taxa") || q.includes("frete") || (q.includes("quanto") && q.includes("entrega"))) {
    reply = "Dependendo da distância e do pedido existe uma pequena taxa de entrega. Mas a maioria das entregas não tem custo!";
  } else if (q.includes("loja") || q.includes("fisica") || q.includes("onde comprar")) {
    reply = "Não temos loja física. Trabalhamos apenas com entregas em toda região de Ponta Porã e Pedro Juan Caballero.";
  } else if (
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
    q.includes("limpa chapas") ||
    q.includes("shampoo automotivo") ||
    q.includes("desengraxante") ||
    q.includes("ativado") ||
    q.includes("kit")
  ) {
    reply = TABELA_COMPLETA_SUPERLIMPO;
  } else if (q.includes("criacao de site") || q.includes("criar site") || (q.includes("site") && (q.includes("quanto") || q.includes("preco")) && !q.includes("superlimpo"))) {
    reply = "Criação de Sites para empresas com destaque total no meio digital!\n\nPrazo de entrega: apenas 7 dias. Valor: a partir de R$ 500,00.\n\nQuer que eu te mostre como estruturar o site ideal para a sua empresa? Me chame no WhatsApp: https://wa.me//5567993174512";
  } else if (q.includes("avaliacard")) {
    reply = "AvaliaCard: Cartão NFC e QR Code com link direto na página de avaliação 5 estrelas da sua empresa no Google!\n\nValor: apenas R$ 89,00 + Frete grátis para todo o Brasil. Conheça no site: https://avaliacard.vercel.app/\n\nQuer multiplicar as avaliações da sua empresa no Google?";
  } else if (q.includes("desconto") || q.includes("fechar hoje")) {
    reply = "No pagamento via PIX já aplicamos 5% de desconto imediato!\n\nSe você quiser fechar um pacote com mais de um item, posso chamar nosso especialista no WhatsApp para liberar uma condição especial para você: https://wa.me//5567993174512\n\nQual serviço você tem interesse em contratar?";
  } else if (q.includes("garantia")) {
    reply = "Você tem 15 dias de garantia total! Se tiver qualquer problema, resolvemos sem burocracia.\n\nPodemos iniciar o seu projeto com total segurança? Me avise no WhatsApp: https://wa.me//5567993174512";
  } else if (q.includes("alto") || q.includes("caro") || q.includes("pensar")) {
    reply = "Entendo perfeitamente! Mas vale lembrar que todos os nossos produtos são de alto desempenho para alavancagem dos Negócios Locais, o que economiza tempo e dinheiro para você.\n\nQuer que eu te mostre a opção de parcelamento em até 3x sem juros para caber no seu orçamento?";
  } else if (q.includes("como funciona") || q.includes("nfc") || q.includes("aproximac") || q.includes("cartao nfc") || q.includes("funciona o cartao")) {
    reply = "O Cartão NFC Conectacard possui chip por aproximação. Basta encostar o cartão na parte traseira de qualquer celular moderno com NFC (iPhone ou Android) e o seu biosite abre na hora com seus contatos, catálogo e redes sociais, sem precisar instalar nenhum aplicativo!\n\nQuer personalizar um para você?";
  } else if (q.includes("servico") || q.includes("o que a empresa oferece") || q.includes("o que voces fazem")) {
    reply = "A Start Mkt Local e Conectacard oferecem: Criação de Sites (a partir de R$ 500,00), Biosite com IA 24h (R$ 167,00), Cartão NFC Infinito personalizado, Plaquinhas QR Code/NFC, AvaliaCard (avaliações Google: https://avaliacard.vercel.app/), Gestão Google Meu Negócio e Tráfego Meta Ads. Além da linha Superlimpo de produtos de limpeza direto de fábrica!\n\nQual desses serviços sua empresa precisa hoje?";
  } else if (q.includes("quanto custa") || q.includes("preco") || q.includes("valor") || q.includes("tabela") || q.includes("orcamento") || q.includes("plano") || q.includes("promocao") || q.includes("quanto e")) {
    reply = "Nossos Preços:\n\n1️⃣ Biosites sem Chatbot somente o link: Preço promocional R$ 99,00\n\n2️⃣ Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês.\n\nPeça o seu pelo WhatsApp: https://wa.me/5567993174612";
  } else if (q.includes("biosite") || q.includes("biositeai") || q.includes("mini site")) {
    reply = "O BiositeAi é um mini site inteligente completo com atendente virtual LIA com inteligência artificial, cartões NFC e plaquinhas com QR Code!\n\nNossos Preços:\n1️⃣ Biosites sem Chatbot somente o link: Preço promocional R$ 99,00\n2️⃣ Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês.\n\nPeça o seu pelo WhatsApp: https://wa.me/5567993174612";
  } else if (q.includes("contato") || q.includes("whatsapp") || q.includes("telefone") || q.includes("falar") || q.includes("humano")) {
    reply = "Para Start Mkt Local e Conectacard: WhatsApp https://wa.me//5567993174512\nPara Superlimpo produtos de limpeza: WhatsApp https://api.whatsapp.com/send?phone=5567998342469\n\nQual deles você precisa falar agora?";
  }

  if (responseCache.size >= MAX_CACHE_SIZE) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) responseCache.delete(firstKey);
  }
  responseCache.set(cacheKey, { reply, timestamp: Date.now() });

  res.status(200).json({ reply, cached: false });
}
