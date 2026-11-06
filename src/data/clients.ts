import { conectacardData, type BiositeData } from "./conectacard";

export const allClients: Record<string, BiositeData> = {
  // 1. Modelo Oficial BiositesAI / Teste Geral
  "biositesai": conectacardData,
  "biosite": conectacardData,
  "teste": conectacardData,
  "start-mkt-local": conectacardData,
  "demo": conectacardData,

  // 2. Modelo Pizzaria & Gastronomia
  "pizzaria": {
    slug: "pizzaria",
    banner: {
      src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
      alt: "Pizzaria Forneria Artesanal"
    },
    avatar: {
      src: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=300&q=80",
      alt: "Logo Forno di Napoli"
    },
    name: "Forno di Napoli Pizzaria",
    bio: "🍕 PIZZAS ARTESANAIS NO FORNO A LENHA COM MASSA DE FERMENTAÇÃO NATURAL! COMBOS FAMÍLIA, REFRIGERANTE GRÁTIS E ENTREGA RÁPIDA E QUENTINHA NA SUA PORTA. FAÇA SEU PEDIDO PELO WHATSAPP! 🛵💨",
    video: {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Como preparamos a autêntica pizza napolitana",
      poster: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },
    produtos: {
      title: "🍕 COMBOS EM PROMOÇÃO HOJE",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
      url: "https://wa.me/5567993174612?text=Olá!%20Quero%20fazer%20o%20pedido%20do%20Combo%20Família!"
    },
    catalogo: {
      title: "Cardápio Destaque",
      items: [
        {
          id: "p1",
          title: "Pizza Margherita Especial",
          price: "R$ 49,90",
          image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80",
          description: "Molho de tomate pelado, mussarela de búfala, manjericão fresco e azeite trufado."
        },
        {
          id: "p2",
          title: "Calabresa com Cebola Roxa",
          price: "R$ 44,90",
          image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80",
          description: "Calabresa defumada artesanal, cebola roxa caramelizada e azeitonas pretas chilenas."
        },
        {
          id: "p3",
          title: "Quatro Queijos Nobres",
          price: "R$ 54,90",
          image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=500&q=80",
          description: "Mussarela, provolone defumado, gorgonzola italiano e requeijão cremoso."
        },
        {
          id: "p4",
          title: "Pizza Doce Nutella com Morango",
          price: "R$ 39,90",
          image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=500&q=80",
          description: "Generosa camada de Nutella original com morangos frescos e raspas de chocolate belga."
        }
      ]
    },
    linksTitulo: "Fazer Pedido & Redes",
    links: [
      {
        id: "l-wa",
        title: "Pedir pelo WhatsApp",
        url: "https://wa.me/5567993174612?text=Olá,%20gostaria%20de%20ver%20o%20cardápio%20e%20fazer%20um%20pedido!",
        image: "/assets/whatsapp-refined-CgyhsBcW.jpg"
      },
      {
        id: "l-mapa",
        title: "Nossa Localização",
        url: "https://maps.google.com/?q=Ponta+Pora+MS",
        image: "/assets/location-refined-DWPeLfoT.jpg"
      },
      {
        id: "l-insta",
        title: "Instagram da Pizzaria",
        url: "https://instagram.com",
        image: "/assets/instagram-refined-BsHeVKuq.jpg"
      },
      {
        id: "l-google",
        title: "Avalie no Google (5 Estrelas)",
        url: "https://maps.google.com",
        image: "/assets/review-refined-BTSPoTYD.jpg"
      }
    ],
    atendimento: {
      saudacao: "Olá! Como posso ajudar você hoje com pedidos e cardápio da Pizzaria Forno di Napoli?",
      conhecimento: `Forno di Napoli Pizzaria em Ponta Porã MS.
Horário de atendimento: Quarta a Domingo das 18h às 23h30.
Pizzas grandes de 8 fatias a partir de R$ 44,90.
Combo Família: 1 Pizza Grande + 1 Pizza Broto Doce + 1 Coca-Cola 2L por apenas R$ 79,90.
Entrega em toda Ponta Porã e Pedro Juan Caballero com tempo médio de 35 a 45 minutos.
Formas de pagamento: Pix, Cartão de Crédito/Débito e Dinheiro.`,
      empresa: [
        {
          id: "pe1",
          pergunta: "Qual o horário de funcionamento?",
          resposta: "Abrimos de quarta a domingo das 18h00 às 23h30 para entregas e retirada no balcão!"
        },
        {
          id: "pe2",
          pergunta: "Vocês entregam em Pedro Juan Caballero?",
          resposta: "Sim! Fazemos entregas tanto em Ponta Porã quanto em Pedro Juan Caballero com entrega rápida de 35 a 45 minutos."
        },
        {
          id: "pe3",
          pergunta: "Quais as formas de pagamento?",
          resposta: "Aceitamos Pix, cartões de crédito e débito de todas as bandeiras e dinheiro."
        }
      ],
      produtos: [
        {
          id: "pp1",
          pergunta: "Tem combo com refrigerante hoje?",
          resposta: "Sim! Nosso Combo Família inclui 1 Pizza Grande Salgada + 1 Broto Doce + 1 Coca-Cola 2L por apenas R$ 79,90!"
        },
        {
          id: "pp2",
          pergunta: "A massa é fina ou grossa?",
          resposta: "Nossa massa é artesanal de fermentação lenta (48h), leve, crocante na borda e macia no centro, assada no forno a lenha."
        }
      ]
    },
    mapa: {
      title: "Forno di Napoli Pizzaria - Ponta Porã MS",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.22014073386!2d-55.7275062!3d-22.5358055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9462709e9f9c735b%3A0xc344799e030b490f!2sPonta%20Por%C3%A3%2C%20MS!5e0!3m2!1spt-BR!2sbr!4v1711200000000!5m2!1spt-BR!2sbr",
      link: "https://maps.google.com/?q=Ponta+Pora+MS"
    },
    contato: {
      local: "Av. Brasil - Centro, Ponta Porã MS",
      telefone: "67993174612",
      email: "pedidos@fornodinapoli.com.br"
    },
    footer: "Forno di Napoli Pizzaria · Conectacard NFC",
    netflix: {
      lettermark: "F",
      headline: "SABORES QUE MARCAM MOMENTOS",
      subheadline: "PIZZAS ARTESANAIS NO FORNO A LENHA",
      genres: ["GASTRONOMIA", "FORNO A LENHA", "DELIVERY EXPRESS"],
      matchPercent: 98,
      seasonText: "Cardápio 2026",
      tagline: "A AUTÊNTICA TRADIÇÃO NAPOLITANA NA SUA MESA."
    }
  },

  // 3. Modelo Farmácia & Drogaria
  "farmacia": {
    slug: "farmacia",
    banner: {
      src: "https://images.unsplash.com/photo-1586015555751-63c299908cf0?auto=format&fit=crop&w=1200&q=80",
      alt: "Drogaria Mais Saúde"
    },
    avatar: {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80",
      alt: "Logo Drogaria Mais Saúde"
    },
    name: "Drogaria Mais Saúde",
    bio: "💊 FARMÁCIA COMPLETA COM MEDICAMENTOS, DERMOCOSMÉTICOS, SUPLEMENTOS E PERFUMARIA. PLANTÃO ATÉ AS 23H COM ENTREGA EXPRESSA EM ATÉ 30 MINUTOS NA SUA CASA! ENVIE SUA RECEITA PELO WHATSAPP! 🩺📲",
    produtos: {
      title: "🩺 ENVIE SUA RECEITA MÉDICA",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
      url: "https://wa.me/5567993174612?text=Olá!%20Gostaria%20de%20enviar%20uma%20receita%20médica%20para%20cotação!"
    },
    catalogo: {
      title: "Ofertas da Semana",
      items: [
        {
          id: "f1",
          title: "Kit Vitamina C + Zinco (60 caps)",
          price: "R$ 29,90",
          image: "https://images.unsplash.com/photo-1550572017-edb20117094b?auto=format&fit=crop&w=500&q=80",
          description: "Auxilia na imunidade diária e ação antioxidante para toda a família."
        },
        {
          id: "f2",
          title: "Protetor Solar FPS 70 Facial",
          price: "R$ 49,90",
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
          description: "Toque seco anti-oleosidade, alta proteção UVA/UVB resistente à água."
        },
        {
          id: "f3",
          title: "Ômega 3 Puro Concentrado (120 caps)",
          price: "R$ 59,90",
          image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=500&q=80",
          description: "Auxilia na saúde cardiovascular, cerebral e articulações."
        },
        {
          id: "f4",
          title: "Fralda Descartável Mega Pack",
          price: "R$ 64,90",
          image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=80",
          description: "Até 12 horas de proteção sequinha dia e noite para bebês."
        }
      ]
    },
    linksTitulo: "Atendimento & Farmácia",
    links: [
      {
        id: "f-wa",
        title: "Enviar Receita no WhatsApp",
        url: "https://wa.me/5567993174612?text=Olá!%20Gostaria%20de%20saber%20o%20preço%20de%20um%20medicamento.",
        image: "/assets/whatsapp-refined-CgyhsBcW.jpg"
      },
      {
        id: "f-mapa",
        title: "Nossa Farmácia no Mapa",
        url: "https://maps.google.com/?q=Ponta+Pora+MS",
        image: "/assets/location-refined-DWPeLfoT.jpg"
      },
      {
        id: "f-insta",
        title: "Dicas de Saúde no Instagram",
        url: "https://instagram.com",
        image: "/assets/instagram-refined-BsHeVKuq.jpg"
      },
      {
        id: "f-google",
        title: "Avalie Nosso Atendimento",
        url: "https://maps.google.com",
        image: "/assets/review-refined-BTSPoTYD.jpg"
      }
    ],
    atendimento: {
      saudacao: "Olá! Como posso ajudar você hoje com medicamentos e dúvidas da Drogaria Mais Saúde?",
      conhecimento: `Drogaria Mais Saúde em Ponta Porã MS.
Horário de atendimento: Aberto todos os dias das 07h00 às 23h00 (incluindo domingos e feriados).
Serviços disponíveis: Aplicação de injetáveis, medição de pressão arterial gratuita, teste de glicemia e entrega expressa de remédios.
Entrega de medicamentos em Ponta Porã em até 30 minutos.
Trabalhamos com genéricos com até 70% de desconto.`,
      empresa: [
        {
          id: "fe1",
          pergunta: "Vocês funcionam aos domingos e feriados?",
          resposta: "Sim! Abrimos todos os dias, de domingo a domingo e feriados, das 07h00 às 23h00 ininterruptamente."
        },
        {
          id: "fe2",
          pergunta: "Como faço para cotar uma receita médica?",
          resposta: "Basta tirar uma foto da sua receita e nos enviar pelo WhatsApp! Nossa equipe de farmacêuticos responde em menos de 2 minutos com os valores e opções de genéricos."
        },
        {
          id: "fe3",
          pergunta: "Fazem entrega rápida?",
          resposta: "Sim! Nosso motoboy entrega em qualquer bairro de Ponta Porã em média em 20 a 30 minutos."
        }
      ],
      produtos: [
        {
          id: "fp1",
          pergunta: "Vocês medem pressão e fazem teste de glicemia?",
          resposta: "Sim, realizamos aferição de pressão arterial gratuita e teste de glicemia no balcão com nossos farmacêuticos."
        },
        {
          id: "fp2",
          pergunta: "Têm descontos em genéricos?",
          resposta: "Sim! Temos descontos de até 70% na linha de medicamentos genéricos e similares."
        }
      ]
    },
    mapa: {
      title: "Drogaria Mais Saúde - Ponta Porã MS",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.22014073386!2d-55.7275062!3d-22.5358055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9462709e9f9c735b%3A0xc344799e030b490f!2sPonta%20Por%C3%A3%2C%20MS!5e0!3m2!1spt-BR!2sbr!4v1711200000000!5m2!1spt-BR!2sbr",
      link: "https://maps.google.com/?q=Ponta+Pora+MS"
    },
    contato: {
      local: "Centro, Ponta Porã MS",
      telefone: "67993174612",
      email: "contato@drogariamaissaude.com.br"
    },
    footer: "Drogaria Mais Saúde · Conectacard NFC",
    netflix: {
      lettermark: "M",
      headline: "SAÚDE E BEM-ESTAR AO SEU ALCANCE",
      subheadline: "PLANTÃO FARMACÊUTICO & ENTREGA EM 30 MIN",
      genres: ["DROGARIA 24H", "MEDICAMENTOS", "ENTREGA EXPRESSA"],
      matchPercent: 97,
      seasonText: "Plantão 2026",
      tagline: "CUIDANDO DE VOCÊ E DA SUA FAMÍLIA EM TODOS OS MOMENTOS."
    }
  },

  // 4. Modelo Distribuidora / Loja Superlimpo
  "superlimpo": {
    ...conectacardData,
    slug: "superlimpo",
    name: "Superlimpo Produtos de Limpeza",
    bio: "SOMOS A SUPERLIMPO, VENDEMOS PRODUTOS DE LIMPEZA DIRETO DE FÁBRICA. ENTREGAS EM TODA REGIÃO DE PONTA PORÃ E PEDRO JUAN CABALLERO. KITS ECONÔMICOS, LINHA DONA DE CASA E LINHA EMPRESAS! 🧼✨",
    avatar: {
      src: "/assets/produtos-superlimpo-2KK8JWDt.png",
      alt: "Logo Superlimpo"
    },
    linksTitulo: "Fale com a Superlimpo",
    links: [
      {
        id: "sl-wa",
        title: "WhatsApp Superlimpo (67) 99834-2469",
        image: "/assets/whatsapp-refined-CgyhsBcW.jpg",
        url: "https://api.whatsapp.com/send?phone=5567998342469"
      },
      {
        id: "sl-site",
        title: "Nosso Site Oficial",
        image: "/assets/website-refined-BhyhUZGx.jpg",
        url: "https://superlimpoprodutosdelimpeza.lovable.app/"
      },
      {
        id: "sl-maps",
        title: "Região de Entrega Ponta Porã e PJC",
        image: "/assets/location-refined-DWPeLfoT.jpg",
        url: "https://maps.google.com/?q=Ponta+Pora+MS"
      }
    ],
    catalogo: {
      title: "Tabela de Produtos Superlimpo",
      items: [
        {
          id: "kit-3",
          title: "Kit Dona de Casa (3 galões de 5L)",
          price: "R$ 38,00",
          image: "/assets/produto-kit-W498VUC5.jpg",
          description: "Kit Econômico: Água Sanitária 5L + Desinfetante 5L + Sabão de Álcool 5L todos os 3 por R$ 38,00."
        },
        {
          id: "agua-sanitaria-5l",
          title: "Água Sanitária 5 Litros",
          price: "R$ 12,00",
          image: "/assets/produto-agua-sanitaria-aqkcM0KF.jpg",
          description: "Água Sanitária 5L com ação bactericida potente para higienização completa."
        },
        {
          id: "cloro-ativo",
          title: "Cloro Ativo 12% 5 Litros",
          price: "R$ 45,00",
          image: "/assets/produto-agua-sanitaria-aqkcM0KF.jpg",
          description: "Cloro concentrado 12% de uso profissional e doméstico para desinfecção profunda."
        },
        {
          id: "desinfetante-5l",
          title: "Desinfetante Perfumado 5 Litros",
          price: "R$ 15,00",
          image: "/assets/produto-desinfetante-DSB2befn.jpg",
          description: "Desinfetante perfumado 5L de alto rendimento com perfume duradouro."
        },
        {
          id: "sabao-alcool-5l",
          title: "Sabão de Álcool (óleo novo) 5 Litros",
          price: "R$ 15,00",
          image: "/assets/produto-sabao-alcool-DQUNx1Kp.jpg",
          description: "Feito exclusivamente com óleo novo, alto poder de limpeza e desengordurante."
        },
        {
          id: "sabao-azul",
          title: "Sabão Lava Roupas Azul 5 Litros",
          price: "R$ 35,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Lava roupas líquido concentrado para roupas brancas e coloridas."
        },
        {
          id: "amaciante-5l",
          title: "Amaciante de Roupa 5 Litros",
          price: "R$ 25,00",
          image: "/assets/produto-desinfetante-DSB2befn.jpg",
          description: "Maciez e perfume prolongado para suas roupas."
        },
        {
          id: "alvejante-sem-cloro",
          title: "Alvejante sem Cloro 5 Litros (Tipo Vanish)",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Alvejante com oxigênio ativo para remoção de manchas sem agredir tecidos."
        },
        {
          id: "lava-loucas-5l",
          title: "Lava Louças 5 Litros",
          price: "R$ 25,00",
          image: "/assets/produto-desinfetante-DSB2befn.jpg",
          description: "Detergente concentrado com alto rendimento para louças e utensílios."
        },
        {
          id: "limpa-pedras-5l",
          title: "Limpa Pedras 5 Litros",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Desincrustante ácido para calçadas, pedras e pisos rústicos."
        },
        {
          id: "limpa-porcelanato",
          title: "Limpa Porcelanato & Cerâmica 5 Litros",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Fórmula balanceada para limpeza de porcelanatos sem tirar o brilho natural."
        },
        {
          id: "linha-empresas",
          title: "Linha Empresas 5 Litros",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Opções: Limpa Chapas (R$ 30), Brilho Alumínio (R$ 30), Shampoo Automotivo (R$ 30), Desengraxante Automotivo (R$ 30) e Ativado 5L (R$ 30)."
        }
      ]
    },
    atendimento: {
      saudacao: "Olá! Como posso ajudar você hoje com os produtos Superlimpo?",
      conhecimento: `Somos a Superlimpo vendemos produtos de limpeza.
WhatsApp: (67) 99834-2469
Link WhatsApp: https://api.whatsapp.com/send?phone=5567998342469
Nosso Site: https://superlimpoprodutosdelimpeza.lovable.app/
Não tem loja física. Apenas entrega em toda região de Ponta Porã e Pedro Juan Caballero.
As entregas são feitas até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas.
Não temos Nota Fiscal apenas Recibo.
Dependendo da distância e do pedido existe uma pequena taxa de entrega. Mas a maioria das entregas não tem custo.

Tabela de produtos Superlimpo:
Linha dona de casa:
- Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00
- Água sanitária 5 litros R$ 12,00
- Cloro Ativo 12% 5 litros R$ 45,00
- Desinfetante Perfumado 5 litros R$ 15,00
- Sabão de álcool (Feito com óleo novo) 5 litros R$ 15,00
- Sabão Lava Roupas Azul R$ 35,00
- Amaciante de roupa 5 litros R$ 25,00
- Alvejante sem cloro 5 litros (Tipo Vanish) R$ 30,00
- Lava louças 5 litros R$ 25,00
- Limpa Pedras 5 litros R$ 30,00
- Limpa Porcelanato & Cerâmica 5 litros R$ 30,00

Linha empresas:
- Limpa Chapas 5 litros R$ 30,00
- Brilho alumínio 5 litros R$ 30,00
- Shampoo Automotivo 5 litros R$ 30,00
- Desengraxante Automotivo 5 litros R$ 30,00
- Ativado 5L R$ 30,00

IMPORTANTE:
NÃO INVENTAR. NÃO ALUCINAR.
SE NÃO SOUBER DIGA: "Vou passar para o atendimento humano: https://api.whatsapp.com/send?phone=5567998342469".`,
      empresa: [
        {
          id: "sl1",
          pergunta: "Tem loja física?",
          resposta: "Não temos loja física. Trabalhamos exclusivamente com entrega em domicílio e empresas em toda Ponta Porã e Pedro Juan Caballero."
        },
        {
          id: "sl2",
          pergunta: "Quais os horários de entrega?",
          resposta: "As entregas são feitas até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas."
        },
        {
          id: "sl3",
          pergunta: "Emitem nota fiscal?",
          resposta: "Não temos Nota Fiscal, apenas Recibo."
        },
        {
          id: "sl4",
          pergunta: "Cobram taxa de entrega?",
          resposta: "Dependendo da distância e do pedido existe uma pequena taxa de entrega, mas a maioria das entregas não tem custo!"
        }
      ],
      produtos: [
        {
          id: "slp1",
          pergunta: "Qual o valor do kit dona de casa?",
          resposta: "O Kit Dona de Casa vem com Água Sanitária 5L + Desinfetante 5L + Sabão de Álcool 5L (todos os 3 galões) por apenas R$ 38,00!"
        },
        {
          id: "slp2",
          pergunta: "Como pedir pelo WhatsApp?",
          resposta: "Basta clicar no link https://api.whatsapp.com/send?phone=5567998342469 ou adicionar o número (67) 99834-2469 para enviar seu pedido."
        }
      ]
    },
    contato: {
      local: "Ponta Porã MS e Pedro Juan Caballero",
      telefone: "67998342469",
      email: "superlimpoprodutos@gmail.com"
    },
    footer: "Superlimpo Produtos de Limpeza · Conectacard NFC",
    netflix: {
      lettermark: "S",
      headline: "LIMPEZA PROFISSIONAL DIRETO DE FÁBRICA",
      subheadline: "KITS ECONÔMICOS & ENTREGA EXPRESSA",
      genres: ["DIRETO DE FÁBRICA", "ALTO RENDIMENTO", "ECONOMIA REAL"],
      matchPercent: 99,
      seasonText: "Catálogo 2026",
      tagline: "SUA CASA E EMPRESA IMPECÁVEIS COM A MÁXIMA ECONOMIA."
    }
  }
};

export function getClientData(slug?: string | null): BiositeData {
  if (slug && allClients[slug]) {
    return allClients[slug];
  }
  return conectacardData;
}
