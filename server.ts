import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Gemini API client (automatically picks up GEMINI_API_KEY from environment)
const ai = new GoogleGenAI();

interface CacheEntry {
  reply: string;
  timestamp: number;
}

const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours TTL
const MAX_CACHE_SIZE = 500;

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

// Endpoint for smart AI chatbot
app.post("/api/chat", async (req, res) => {
  const { message, history, clientKnowledge, clientName, companyInfo } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Mensagem inválida" });
    return;
  }

  // 0. Cache lookup for fast repeated queries
  const cacheKey = getCacheKey(message, clientName);
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    res.setHeader("X-Cache", "HIT");
    res.json({ reply: cached.reply, cached: true });
    return;
  }

  res.setHeader("X-Cache", "MISS");

  try {
    const systemInstruction = buildLiaSystemInstruction(companyInfo, clientName, clientKnowledge);


    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Add recent history if available
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
        console.warn(`Model ${model} attempt failed:`, err?.message || err);
      }
    }

    if (!reply) {
      // Intelligent fast fallback
      const q = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (
        q.includes("superlimpo") ||
        q.includes("limpeza") ||
        q.includes("sabao") ||
        q.includes("desinfetante") ||
        q.includes("cloro") ||
        q.includes("amaciante") ||
        q.includes("kit")
      ) {
        reply = `Somos a Superlimpo vendemos produtos de limpeza!\n\nTabela Linha Dona de Casa:\n• Kit de Produto (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) os 3 por R$ 38,00\n• Água sanitária 5L: R$ 12,00\n• Cloro Ativo 12% 5L: R$ 45,00\n• Desinfetante Perfumado 5L: R$ 15,00\n• Sabão de álcool (óleo novo) 5L: R$ 15,00\n• Sabão Lava Roupas Azul: R$ 35,00\n• Amaciante de roupa 5L: R$ 25,00\n• Alvejante sem cloro 5L: R$ 30,00\n• Lava louças 5L: R$ 25,00\n• Limpa Pedras 5L: R$ 30,00\n• Limpa Porcelanato & Cerâmica 5L: R$ 30,00\n\nLinha Empresas:\n• Limpa Chapas 5L: R$ 30,00\n• Brilho alumínio 5L: R$ 30,00\n• Shampoo Automotivo 5L: R$ 30,00\n• Desengraxante Automotivo 5L: R$ 30,00\n• Ativado 5L: R$ 30,00\n\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469\nSite: https://superlimpoprodutosdelimpeza.lovable.app/`;
      } else if (q.includes("criacao de site") || q.includes("criar site") || (q.includes("site") && (q.includes("quanto") || q.includes("preco")) && !q.includes("superlimpo"))) {
        reply = "Criação de Sites para empresas com destaque total no meio digital!\n\nPrazo de entrega: apenas 7 dias. Valor: a partir de R$ 500,00.\n\nQuer que eu te mostre como estruturar o site ideal para a sua empresa? Me chame no WhatsApp: https://wa.me//5567993174512";
      } else if (q.includes("avaliacard")) {
        reply = "AvaliaCard: Cartão NFC e QR Code com link direto na página de avaliação 5 estrelas da sua empresa no Google!\n\nValor: apenas R$ 89,00 + Frete grátis para todo o Brasil. Conheça no site: https://avaliacard.vercel.app/\n\nQuer multiplicar as avaliações da sua empresa no Google?";
      } else if (q.includes("desconto") || q.includes("fechar hoje")) {
        reply = "No pagamento via PIX já aplicamos 5% de desconto imediato!\n\nSe você quiser fechar um pacote com mais de um item, posso chamar nosso especialista no WhatsApp para liberar uma condição especial para você: https://wa.me//5567993174512\n\nQual serviço você tem interesse em contratar?";
      } else if (q.includes("garantia")) {
        reply = "Você tem 15 dias de garantia total! Se tiver qualquer problema, resolvemos sem burocracia.\n\nPodemos iniciar o seu projeto com total tranquilidade? Me chame no WhatsApp: https://wa.me//5567993174512";
      } else if (q.includes("alto") || q.includes("caro") || q.includes("pensar")) {
        reply = "Entendo perfeitamente! Mas vale lembrar que todos os nossos produtos são de alto desempenho para alavancagem dos Negócios Locais, o que economiza tempo e dinheiro para você.\n\nQuer que eu te mostre a opção de parcelamento em até 3x sem juros para caber no seu orçamento?";
      } else if (q.includes("quanto custa") || q.includes("preco") || q.includes("valor") || q.includes("plano") || q.includes("biosite")) {
        reply = `Nossos Preços:\n\n1️⃣ Biosites sem Chatbot somente o link: Preço promocional R$ 99,00\n\n2️⃣ Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês.\n\nPeça o seu pelo WhatsApp: https://wa.me/5567993174612`;
      } else {
        reply = "Não tenho essa informação no momento. Vou encaminhar você para o atendimento humano: https://wa.me//5567993174512";
      }
    }

    if (reply) {
      if (responseCache.size >= MAX_CACHE_SIZE) {
        const firstKey = responseCache.keys().next().value;
        if (firstKey) responseCache.delete(firstKey);
      }
      responseCache.set(cacheKey, { reply, timestamp: Date.now() });
    }

    res.json({ reply, cached: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error?.message || error);
    res.json({
      reply: "Não tenho essa informação no momento. Vou encaminhar você para o atendimento humano: https://wa.me//5567993174512",
      isFallback: true,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
