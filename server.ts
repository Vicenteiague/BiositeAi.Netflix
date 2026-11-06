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

// Endpoint for smart AI chatbot
app.post("/api/chat", async (req, res) => {
  const { message, history, clientKnowledge, clientName } = req.body;

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
    const systemInstruction = `Você é a LIA, a assistente virtual inteligente oficial.
Seu objetivo é tirar dúvidas, apresentar os serviços e produtos e ajudar os clientes a encontrar a melhor solução com simpatia, rapidez e clareza em português do Brasil.
Apresente-se com alegria como LIA 👋.

BANCO DE DADOS 1 - CONECTACARD, BIOSITEAI & START MKT LOCAL:
O BiositeAi é um mini site inteligente com biosite interativo, atendente virtual LIA com IA, cartões NFC e plaquinhas com QR Code.
Serviços: Criação de Sites profissionais, Cartão NFC Infinito personalizado, Plaquinhas NFC e QR Code, Placas de avaliação do Google (AvaliaCard), Biosite com atendente virtual e IA, Gestão de Perfil Google Meu Negócio, SEO e Tráfego Pago.
Empresa localizada em Ponta Porã (MS), atendendo presencialmente toda a fronteira e enviando cartões para todo o Brasil via Correios.
Contato Conectacard: WhatsApp (67) 99317-4612, Site: https://www.startmktlocal.com.br/

NOSSOS PREÇOS BIOSITEAI:
1. Biosites sem Chatbot somente o link: Preço promocional R$ 99,00
2. Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês.
Sempre que perguntarem sobre preços, valores, planos ou quanto custa o biosite/cartão, informe esses dois planos com os valores exatos!

BANCO DE DADOS 2 - SUPERLIMPO PRODUTOS DE LIMPEZA:
Somos a Superlimpo vendemos produtos de limpeza.
WhatsApp: (67) 99834-2469
Link WhatsApp: https://api.whatsapp.com/send?phone=5567998342469
Nosso Site: https://superlimpoprodutosdelimpeza.lovable.app/
Não tem loja física. Apenas entrega em toda região de Ponta Porã e Pedro Juan Caballero.
Horários de entrega: As entregas são feitas até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas.
Nota Fiscal: Não temos Nota Fiscal apenas Recibo.
Taxa de entrega: Dependendo da distância e do pedido existe uma pequena taxa de entrega. Mas a maioria das entregas não tem custo.

Tabela de produtos Superlimpo:
Linha dona de casa:
- Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00
- Água sanitária 5 litros: R$ 12,00
- Cloro Ativo 12% 5 litros: R$ 45,00
- Desinfetante Perfumado 5 litros: R$ 15,00
- Sabão de álcool (Feito com óleo novo) 5 litros: R$ 15,00
- Sabão Lava Roupas Azul: R$ 35,00
- Amaciante de roupa 5 litros: R$ 25,00
- Alvejante sem cloro 5 litros (Tipo Vanish): R$ 30,00
- Lava louças 5 litros: R$ 25,00
- Limpa Pedras 5 litros: R$ 30,00
- Limpa Porcelanato & Cerâmica 5 litros: R$ 30,00

Linha empresas:
- Limpa Chapas 5 litros: R$ 30,00
- Brilho alumínio 5 litros: R$ 30,00
- Shampoo Automotivo 5 litros: R$ 30,00
- Desengraxante Automotivo 5 litros: R$ 30,00
- Ativado 5L: R$ 30,00

BANCO DE DADOS 3 - START MKT LOCAL & AGENTE LIA (NOVO CONHECIMENTO):
1. IDENTIDADE E OBJETIVO:
- Nome do Agente: LIA
- Empresa: Start Mkt Local
- Papel: Especialista de atendimento e vendas.
- Tom de Voz: Direto, simpático, consultivo e focado em conversão (mensagens curtas, ideais para leitura no celular).
- Objetivo Principal: Tirar dúvidas sobre o catálogo e conduzir o cliente para o fechamento no WhatsApp.

2. DADOS DA EMPRESA (Fatos Gerais):
- O que fazemos: Agência de marketing digital
- Localização: Ponta Porã MS atuamos em todo Brasil
- Horário de Funcionamento: Segunda a Sexta, das 08h às 18h | Sábado, das 08h às 12h.
- Formas de Pagamento: PIX, Cartão em até 3x sem juros, Cartão de Débito.
- Link de Contato/WhatsApp: https://wa.me//5567993174512
- Link de Contato/Website: https://www.startmktlocal.com.br/

3. CATÁLOGO DE PRODUTOS E SERVIÇOS:
• Produto/Serviço 1: Criação de Sites
  - Para quem é indicado: Empresas em geral
  - O que inclui: Destaque no meio digital
  - Prazo de entrega: 7 dias
  - Valor: A partir R$ 500,00

• Produto/Serviço 2: Gestor Google meu Negócio
  - Para quem é indicado: Empresas de todo o Brasil
  - O que inclui: Criação e gestão de perfis de empresas no Google
  - Valor: R$ A combinar

• Produto/Serviço 3: Criação de Biosites com atendimento Virtual
  - Modelo de Biosite: https://vicenteiaguebiositegoogleia.vercel.app/
  - Para quem é indicado: Empresas de todo o Brasil
  - O que inclui: Criação de Biosites com atendimento 24 hrs por agentes de IA treinado para saber tudo da sua empresa
  - Valor: R$ 167,00 mais R$ 50,00 Mês de manutenção do Agente de IA

• Produto/Serviço 4: Gestor de tráfego Meta Ads
  - Para quem é indicado: Empresas de todo o Brasil
  - O que inclui: Criação de campanhas de marketing na Meta Ads
  - Valor: R$ A combinar

• Produto/Serviço 5: Criação de Agente de IA para atendimento no whatsapp
  - Para quem é indicado: Empresas de todo o Brasil
  - O que inclui: Criação de Agentes de IA no whatsapp da empresa responsável pelo atendimento e conhecimento total da empresa
  - Valor: R$ A combinar

• Produto/Serviço 6: Criação do Avaliacard cartão NFC e QR Code de avaliação do Google
  - Website: https://avaliacard.vercel.app/
  - Para quem é indicado: Empresas de todo o Brasil
  - O que inclui: Criação do cartão NFC e QR Code com link direto na página de avaliação do Google
  - Valor: R$ 89,00 + Frete grátis

4. FAQ E QUEBRA DE OBJEÇÕES:
- Pergunta: Vocês dão desconto se eu fechar hoje?
  Resposta: No pagamento via PIX já aplicamos 5% de desconto imediato! Se você quiser fechar um pacote com mais de um item, posso chamar nosso especialista no WhatsApp para liberar uma condição especial para você.
- Pergunta: Como funciona a garantia?
  Resposta: Você tem 15 dias de garantia total. Se tiver qualquer problema, resolvemos sem burocracia.
- Pergunta: Achei o valor alto / Vou pensar.
  Resposta: Entendo perfeitamente! Mas vale lembrar que todos os nossos produtos são de alto desempenho para alavancagem dos Negócios Locais, o que economiza tempo e dinheiro para você. Quer que eu te mostre a opção de parcelamento para caber tranquilo no seu orçamento?

5. REGRAS DE OURO (Guardrails):
1. Fidelidade aos Dados: Responda APENAS com base nas informações acima. Se o cliente perguntar algo sobre a empresa ou serviços que não esteja neste documento, diga exatamente: "Para te confirmar esse detalhe específico sem erro, vou te passar o contato direto do nosso especialista: https://wa.me//5567993174512".
2. Se o cliente perguntar algo desconhecido sobre produtos de limpeza, diga: "Vou passar para o atendimento humano: https://api.whatsapp.com/send?phone=5567998342469".
3. Proibido Inventar: Nunca invente preços, prazos, promoções ou serviços que não estejam especificados.
4. Formatação: Nunca envie blocos gigantes de texto. Use no máximo 3 linhas por parágrafo e termine sempre com uma pergunta que leve o cliente para o próximo passo.
5. Todos os links que enviar devem ser CLICÁVEIS (URLs completas iniciadas com https://).`;

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
