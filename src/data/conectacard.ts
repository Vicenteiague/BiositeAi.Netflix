export interface BiositeLink {
  id: string;
  title: string;
  image: string;
  url: string | null;
}

export interface CatalogoItem {
  id: string;
  title: string;
  image: string;
  price?: string;
  description?: string;
}

export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface BiositeData {
  slug: string;
  name: string;
  bio: string;
  banner: {
    src: string;
    alt: string;
  };
  avatar: {
    src: string;
    alt: string;
  };
  video?: {
    title: string;
    poster: string;
    url: string;
  };
  produtos: {
    title: string;
    image: string;
    url: string;
  };
  catalogo: {
    title: string;
    items: CatalogoItem[];
  };
  linksTitulo: string;
  links: BiositeLink[];
  servicos?: {
    title: string;
    text: string;
    items: BiositeLink[];
  };
  mapa: {
    title: string;
    link: string;
    embed: string;
  };
  contato: {
    local: string;
    telefone: string;
    email: string;
  };
  footer: string;
  atendimento: {
    saudacao: string;
    conhecimento: string;
    empresa: FaqItem[];
    produtos: FaqItem[];
  };
  netflix?: {
    lettermark?: string; // e.g. "C" or "N"
    headline?: string;
    subheadline?: string;
    genres?: string[];
    matchPercent?: number;
    seasonText?: string;
    tagline?: string;
  };
  seo?: {
    title: string;
    description: string;
  };
}

export const conectacardData: BiositeData = {
  slug: "start-mkt-local",
  name: "Conectacard Cartão NFC",
  bio: "Conectacard – Seu Cartão NFC Infinito. Conecte-se com estilo, tecnologia e praticidade. Com o cartão Conectacard NFC infinito você compartilha seus contatos, localização, redes sociais e muito mais com um simples toque. Cartões NFC personalizados, biolinks para Instagram e WhatsApp, além de plaquinhas com QR Code | NFC. Para destacar sua presença em qualquer lugar. Modernize sua forma de conectar. Peça seu Conectacard cartão NFC infinito agora! 💳",
  banner: {
    src: "/assets/banner-conectacard-BVojeopm.jpg",
    alt: "Mãos segurando o cartão NFC Conectacard e um celular"
  },
  avatar: {
    src: "/assets/logo-conectacard-Bp31Uc4f.jpg",
    alt: "Logo ConectaCard"
  },
  video: {
    title: "Conectacard",
    poster: "/assets/video-refined-BgPRCMsH.jpg",
    url: "https://youtube.com/shorts/IJHT-lXmDaU"
  },
  produtos: {
    title: "Nossos Produtos",
    image: "/assets/produtos-superlimpo-2KK8JWDt.png",
    url: "https://superlimpoprodutosdelimpeza.lovable.app/"
  },
  catalogo: {
    title: "Produtos",
    items: [
      {
        id: "tabela-de-precos",
        title: "Tabela de Preço",
        image: "/assets/produto-tabela-precos-FOBjNveZ.jpg",
        description: "Confira a tabela completa de produtos de limpeza e preços especiais direto de fábrica."
      },
      {
        id: "desinfetante",
        title: "Desinfetante",
        image: "/assets/produto-desinfetante-DSB2befn.jpg",
        price: "R$ 15,00",
        description: "Desinfetante perfumado 5 litros de alto rendimento com aromas duradouros."
      },
      {
        id: "agua-sanitaria",
        title: "Água Sanitária",
        image: "/assets/produto-agua-sanitaria-aqkcM0KF.jpg",
        price: "R$ 12,00",
        description: "Água Sanitária 5 litros com ação bactericida potente para higienização completa."
      },
      {
        id: "kit-de-produtos",
        title: "Kit de Produtos",
        image: "/assets/produto-kit-W498VUC5.jpg",
        price: "R$ 38,00",
        description: "Kit Econômico: Água Sanitária 5L + Desinfetante 5L + Sabão de Álcool 5L por apenas R$ 38,00."
      },
      {
        id: "desincrust",
        title: "Desincrust",
        image: "/assets/produto-desincrust-FLyMIkA4.jpg",
        price: "R$ 30,00",
        description: "Desincrustante profissional 5 litros para remoção pesada de sujidades e resíduos."
      },
      {
        id: "sabao-de-alcool",
        title: "Sabão de Álcool",
        image: "/assets/produto-sabao-alcool-DQUNx1Kp.jpg",
        price: "R$ 15,00",
        description: "Sabão de Álcool 5 litros formulado com óleo novo, excelente poder de desengorduramento."
      }
    ]
  },
  linksTitulo: "Nossos links",
  links: [
    {
      id: "whatsapp",
      title: "WhatsApp",
      image: "/assets/whatsapp-refined-CgyhsBcW.jpg",
      url: "https://wa.me/5567993174612"
    },
    {
      id: "location",
      title: "Nossa Localização",
      image: "/assets/location-refined-DWPeLfoT.jpg",
      url: "https://maps.app.goo.gl/H2ryHrEQQBdfYkTw5"
    },
    {
      id: "google",
      title: "Nosso Perfil no Google",
      image: "/assets/google-refined-DXn0GVJk.jpg",
      url: "https://g.co/kgs/e9wwCVY"
    },
    {
      id: "review",
      title: "Avalie nossa empresa no Google",
      image: "/assets/review-refined-BTSPoTYD.jpg",
      url: "https://g.page/r/CRV6qIFyKdSEEBM/review"
    },
    {
      id: "instagram",
      title: "Instagram",
      image: "/assets/instagram-refined-BsHeVKuq.jpg",
      url: "https://instagram.com/conectacardpp"
    },
    {
      id: "website",
      title: "Nosso Site Start Mkt Local",
      image: "/assets/website-refined-BhyhUZGx.jpg",
      url: "https://www.startmktlocal.com.br/"
    }
  ],
  servicos: {
    title: "Nossos Serviços",
    text: "Otimização para Motores de Busca - SEO & Tráfego Pago em Ponta Porã MS. Somos uma Agência de Marketing Digital Especializada em SEO (Search Engine Optimization), Google meu negócio e Tráfego Pago. Atuamos em Ponta Porã MS.",
    items: [
      {
        id: "criacao-de-sites",
        title: "Criação de Sites",
        image: "/assets/servico-criacao-de-sites-wmrW9X2R.png",
        url: null
      },
      {
        id: "perfil-google",
        title: "Criação de Perfil de empresas no Google",
        image: "/assets/servico-perfil-google-C8tRfPuC.png",
        url: null
      },
      {
        id: "trafego-pago",
        title: "Tráfego Pago",
        image: "/assets/servico-trafego-pago-BLSSSAAg.png",
        url: null
      },
      {
        id: "avaliacard",
        title: "AvaliaCard cartão NFC de avaliações do Google",
        image: "/assets/servico-avaliacard-r6XzNPQD.png",
        url: "https://avaliacard.vercel.app/"
      }
    ]
  },
  mapa: {
    title: "Start Mkt Local no Google Maps",
    link: "https://www.google.com/maps/search/?api=1&query=Start+Mkt+Local+-+Rua+Luiz+Pinto+Magalh%C3%A3es,+154+-+Santa+Isabel,+Ponta+Por%C3%A3+-+MS",
    embed: "https://www.openstreetmap.org/export/embed.html?bbox=-55.7332969%2C-22.5356989%2C-55.6932969%2C-22.5156989&layer=mapnik&marker=-22.5256989%2C-55.7132969"
  },
  contato: {
    local: "Start Mkt Local Ponta Porã MS",
    telefone: "67993174612",
    email: "startmktlocal@gmail.com"
  },
  footer: "Conectacard Cartão NFC",
  atendimento: {
    saudacao: "Olá! Qual é a sua dúvida?",
    conhecimento: `BANCO DE DADOS 1 - CONECTACARD, BIOSITEAI & START MKT LOCAL:
O BiositeAi é um mini site inteligente com biosite interativo, atendente virtual LIA com IA, cartões NFC e plaquinhas com QR Code.
Fazemos criação de Sites profissionais, plaquinhas NFC e QR Code, placas de avaliação do Google (AvaliaCard), biosite com atendente virtual e inteligência artificial. Tenha todos os seus links e redes sociais em um só lugar. Não são aqueles chats de aperte 1 ou 2, são respostas reais. Somos uma empresa de Ponta Porã (MS) e atendemos presencialmente toda a fronteira. E atendimento a todo Brasil via Correios com código de rastreamento.
Contato Conectacard: WhatsApp (67) 99317-4612, E-mail: startmktlocal@gmail.com, Site: https://www.startmktlocal.com.br/

NOSSOS PREÇOS BIOSITEAI:
1. Biosites sem Chatbot somente o link: Preço promocional R$ 99,00
2. Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês.

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

REGRA OBRIGATÓRIA DA IA:
NÃO INVENTAR. NÃO ALUCINAR.
SE NÃO SOUBER com certeza a resposta, diga exatamente: "Vou passar para o atendimento humano: https://api.whatsapp.com/send?phone=5567998342469".

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

5. REGRAS DE OURO:
- Todos os links enviados DEVEM ser clicáveis.
- Fidelidade aos Dados: Responda APENAS com base nas informações. Se o cliente perguntar algo que não está neste documento, diga: "Para te confirmar esse detalhe específico sem erro, vou te passar o contato direto do nosso especialista: https://wa.me//5567993174512".
- Proibido inventar preços, prazos ou serviços.
- Formatação: Nunca envie blocos gigantes de texto. Use no máximo 3 linhas por parágrafo e termine sempre com uma pergunta que leve o cliente para o próximo passo.`,
    empresa: [
      {
        id: "sobre",
        pergunta: "O que a empresa oferece?",
        resposta: "A Conectacard oferece cartões NFC personalizados, biolinks para Instagram e WhatsApp e plaquinhas com QR Code e NFC. A Start Mkt Local também oferece criação de sites, perfil de empresas no Google, SEO e tráfego pago."
      },
      {
        id: "local",
        pergunta: "Onde vocês estão?",
        resposta: "Start Mkt Local, em Ponta Porã, MS. Você encontra nossa localização no mapa abaixo e pode nos visitar ou agendar uma consultoria presencial na região de fronteira!"
      },
      {
        id: "contato",
        pergunta: "Como entro em contato?",
        resposta: "WhatsApp: (67) 99317-4612. E-mail: startmktlocal@gmail.com. Atendemos de segunda a sábado com suporte ágil para tirar todas as dúvidas."
      },
      {
        id: "precos-biosite",
        pergunta: "Quanto custa o Biosite?",
        resposta: "Nossos Preços:\n1. Biosites sem Chatbot somente o link: Preço promocional R$ 99,00\n2. Biosites com Chatbot e atendente Virtual + Plaquinha NFC ou Cartão NFC: R$ 147,00 + manutenção do Chatbot Atendente virtual IA a partir de R$ 49,90 Mês."
      },
      {
        id: "start-horario",
        pergunta: "Qual o horário de funcionamento da Start Mkt Local?",
        resposta: "Segunda a Sexta, das 08h às 18h | Sábado, das 08h às 12h."
      },
      {
        id: "start-pagamento",
        pergunta: "Quais as formas de pagamento aceitas?",
        resposta: "Aceitamos PIX (com 5% de desconto imediato!), Cartão de Crédito em até 3x sem juros e Cartão de Débito."
      },
      {
        id: "start-garantia",
        pergunta: "Como funciona a garantia dos serviços?",
        resposta: "Você tem 15 dias de garantia total! Se tiver qualquer problema, resolvemos sem burocracia."
      }
    ],
    produtos: [
      {
        id: "nfc",
        pergunta: "Como funciona o cartão NFC?",
        resposta: "Com um simples toque do cartão em qualquer celular moderno compatível com NFC (iPhone ou Android), seus contatos, localização, redes sociais e catálogo abrem instantaneamente na tela, sem precisar digitar nada ou baixar aplicativos!"
      },
      {
        id: "personalizado",
        pergunta: "O cartão é personalizado?",
        resposta: "Sim! A Conectacard oferece cartões NFC 100% personalizados com a identidade visual da sua marca, logotipo, cores, além de biolinks e plaquinhas com QR Code e NFC para balcões e mesas. Fale conosco pelo WhatsApp para combinar os detalhes da sua arte."
      },
      {
        id: "criacao-sites",
        pergunta: "Quanto custa a Criação de Sites?",
        resposta: "Criação de Sites para empresas com destaque digital completo a partir de R$ 500,00, entregue em apenas 7 dias! Quer que eu te passe mais detalhes no WhatsApp: https://wa.me//5567993174512 ?"
      },
      {
        id: "biosite-ia",
        pergunta: "Quanto custa o Biosite com atendimento Virtual?",
        resposta: "Criação de Biosites com atendimento 24h por agentes de IA treinados: R$ 167,00 + R$ 50,00/mês de manutenção. Veja o modelo: https://vicenteiaguebiositegoogleia.vercel.app/ - Deseja personalizar o seu hoje?"
      },
      {
        id: "avaliacard-preco",
        pergunta: "Quanto custa o Avaliacard?",
        resposta: "Avaliacard (cartão NFC e QR Code para avaliação no Google): R$ 89,00 + Frete grátis! Conheça: https://avaliacard.vercel.app/ - Quer receber o seu?"
      },
      {
        id: "gestor-google",
        pergunta: "Como funciona o Gestor Google Meu Negócio?",
        resposta: "Criação e gestão completa de perfis de empresas no Google com valor a combinar. Vamos agendar para avaliar sua empresa no WhatsApp: https://wa.me//5567993174512 ?"
      },
      {
        id: "trafego-meta",
        pergunta: "Como funciona o Gestor de Tráfego Meta Ads?",
        resposta: "Criação e otimização de campanhas de anúncios na Meta Ads (Instagram e Facebook) com valor a combinar. Deseja atrair mais clientes para seu negócio?"
      },
      {
        id: "agente-whatsapp",
        pergunta: "Como funciona o Agente de IA para WhatsApp?",
        resposta: "Criamos um Agente de IA oficial no WhatsApp da sua empresa, responsável por atender clientes 24h com conhecimento total do seu catálogo. Valor a combinar. Quer ver uma demonstração?"
      },
      {
        id: "produtos",
        pergunta: "Quais produtos de limpeza aparecem no cartão?",
        resposta: "A seção da Superlimpo apresenta Desinfetante, Água Sanitária, Kit de Produtos (com 3 galões de 5L), Desincrust e Sabão de Álcool. O botão azul 'Nossos Produtos' abre o catálogo completo da fábrica com entregas em Ponta Porã e Pedro Juan Caballero."
      },
      {
        id: "orcamento",
        pergunta: "Quanto custam os produtos Superlimpo?",
        resposta: "Tabela de Produtos Superlimpo:\n\nLinha Dona de Casa:\n• Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00\n• Água sanitária 5 litros: R$ 12,00\n• Cloro Ativo 12% 5 litros: R$ 45,00\n• Desinfetante Perfumado 5 litros: R$ 15,00\n• Sabão de álcool (Feito com óleo novo) 5 litros: R$ 15,00\n• Sabão Lava Roupas Azul: R$ 35,00\n• Amaciante de roupa 5 litros: R$ 25,00\n• Alvejante sem cloro 5 litros (Tipo Vanish): R$ 30,00\n• Lava louças 5 litros: R$ 25,00\n• Limpa Pedras 5 litros: R$ 30,00\n• Limpa Porcelanato & Cerâmica 5 litros: R$ 30,00\n\nLinha Empresas:\n• Limpa Chapas 5 litros: R$ 30,00\n• Brilho alumínio 5 litros: R$ 30,00\n• Shampoo Automotivo 5 litros: R$ 30,00\n• Desengraxante Automotivo 5 litros: R$ 30,00\n• Ativado 5L: R$ 30,00\n\nPeça pelo WhatsApp: https://api.whatsapp.com/send?phone=5567998342469\nSite: https://superlimpoprodutosdelimpeza.lovable.app/"
      },
      {
        id: "horario-entrega",
        pergunta: "Quais os horários de entrega da Superlimpo?",
        resposta: "As entregas são feitas até às 16 horas. Aos sábados somente às 7:00 horas e às 15:30 horas em toda Ponta Porã e Pedro Juan Caballero."
      },
      {
        id: "nota-fiscal",
        pergunta: "Vocês emitem Nota Fiscal?",
        resposta: "Não temos Nota Fiscal, apenas Recibo."
      },
      {
        id: "taxa-entrega",
        pergunta: "Tem taxa de entrega dos produtos de limpeza?",
        resposta: "Dependendo da distância e do pedido existe uma pequena taxa de entrega, mas a maioria das entregas não tem custo!"
      },
      {
        id: "zap-superlimpo",
        pergunta: "Qual o WhatsApp da Superlimpo?",
        resposta: "O WhatsApp da Superlimpo é (67) 99834-2469. Link direto: https://api.whatsapp.com/send?phone=5567998342469"
      }
    ]
  },
  netflix: {
    lettermark: "C",
    headline: "TRANSFORMO SEU NEGÓCIO NO DIGITAL",
    subheadline: "COM CONECTACARD NFC & START MKT LOCAL",
    genres: ["TECNOLOGIA NFC", "MARKETING LOCAL", "AUTOMAÇÃO IA"],
    matchPercent: 99,
    seasonText: "Temporada 2026",
    tagline: "ESTRATÉGIA HOJE, LIBERDADE AMANHÃ."
  },
  seo: {
    title: "Conectacard Cartão NFC | Cartão de visitas inteligente",
    description: "Cartão NFC infinito Conectacard: compartilhe contatos, localização e redes sociais com um toque. Biolinks e plaquinhas QR Code | NFC."
  }
};
