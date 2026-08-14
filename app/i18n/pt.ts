import type { CercaProntaTranslation } from "../utils/localizeCerca";

const pt = {
  nav: {
    inicio: "Início",
    produtos: "Produtos",
    catalogo: "Catálogo",
    industria: "Indústria",
    contato: "Contato",
    lojaVirtual: "Loja virtual",
  },
  aria: {
    abrirMenu: "Abrir menu",
    voltar: "Voltar",
    fecharMenu: "Fechar menu",
    idioma: "Selecionar idioma",
  },
  hero: {
    firme: "FIRME",
    duradouro: "DURADOURO",
    subtitulo:
      "A Insul é líder na fabricação de telas, gradis, alambrados e cercas prontas com maior mix de produtos do mercado.",
    cta: "Nossos produtos",
    imagemAlt: "Rolos de tela soldada Insul",
  },
  home: {
    numerosTitulo: "Nossos números e parceiros",
  },
  partners: {
    area: "m² área fabril",
    telas: "m² de telas / mês",
    anos: "Anos de mercado",
    toneladas: "Ton. processadas / mês",
  },
  products: {
    tituloLinha1: "NOSSOS",
    tituloLinha2: "PRODUTOS",
    rooms: {
      "Cercas Prontas(rurais)": "Cercas Prontas(rurais)",
      Gradil: "Gradil",
      "Telas e Alambrados": "Telas e Alambrados",
      Acessórios: "Acessórios",
      Arames: "Arames",
    } as Record<string, string>,
  },
  industry: {
    label: "Conheça nossa história",
    titulo: "A INDÚSTRIA",
    texto:
      "Somos especializados na fabricação de uma ampla linha de produtos derivados do arame, como: telas hexagonais, telas soldadas, telas alambrado, cercas prontas, gradis e acessórios para cercamentos em geral - atendendo às necessidades dos setores rural, residencial, industrial e de construção civil.",
    timeline: [
      {
        title: "Ano 2011",
        description:
          "Início de fabricação das primeiras telas de simples torção em pavilhão alugado de 200 m²",
      },
      {
        title: "Ano 2012",
        description:
          "Mudança para pavilhão de 420 m² alugado e chegada da primeira máquina importada (Tela Hexagonal de 3”)",
      },
      {
        title: "Ano 2013",
        description:
          "Aquisição de máquinas automáticas para alambrado da Maxtelas e expansão da equipe produtiva e comercial.",
      },
      {
        title: "Ano 2015",
        description:
          "Mudança para fábrica (alugada), maior, com 900 m² de área produtiva e início da fabricação de telas soldadas.",
      },
      {
        title: "Ano 2018",
        description:
          "Construção e mudança para primeira unidade própria, com 1600 m², da Insul e expansão da linha de telas soldadas e início da fabricação de cercas prontas (Cerca pronta Campeira).",
      },
      {
        title: "Ano 2020",
        description:
          "Aumento da área produtiva para instalação de novas máquinas hexagonais e estoque de produtos acabados.",
      },
      {
        title: "Ano 2021",
        description:
          "Expansão da indústria com a instalação de máquinas europeias de tela soldada e início da fabricação de gradis.",
      },
      {
        title: "Ano 2024",
        description:
          "Instalação de linha de produção e pintura automática para gradis, além da chegada de mais uma máquina europeia para fabricação de telas soldadas.",
      },
    ],
  },
  textReveal: {
    paragrafos: [
      "Desde 2010, a Insul Arames e Telas investe em tecnologia de ponta para oferecer produtos de alta qualidade e garantir a satisfação e confiança de nossos clientes.",
      "Para nós, qualidade não é um objetivo, é uma prática diária. Seguimos comprometidos em ser referência no setor e em contribuir para o crescimento sustentável de nossos clientes e parceiros.",
    ],
  },
  distribution: {
    label: "Centros de distribuição",
    tituloLinha1: "ENVIOS PARA",
    tituloLinha2: "TODO BRASIL",
    texto:
      "Com nossos centros de distribuição no Rio Grande do Sul e em Minas Gerais, alcançamos todos os estados do país com rapidez e garantia de entrega.",
    cardLabel: "Centro de distribuição",
    centers: [
      { state: "Rio Grande do Sul", city: "Cachoeira do Sul" },
      { state: "Minas Gerais", city: "Divinópolis" },
    ],
  },
  book: {
    label: "Telas e acessórios",
    tituloLinha1: "CATÁLOGO DE",
    tituloLinha2: "PRODUTOS",
    texto:
      "Veja nosso catálogo de produtos e\nconheça em detalhes toda a nossa\nlinha de produtos.",
    tooltip: "Clique no botão para escolher um produto",
    interessado: "Ficou interessado?",
    ctaSaibaMais: "Clique aqui e saiba mais",
    ver: "Ver",
    pagina: "Página",
  },
  faq: {
    eyebrow: "PERGUNTAS FREQUENTES",
    titulo: "Dúvidas",
    subtitulo:
      "Tudo o que você precisa saber sobre nossos produtos, matéria e empresa.",
    items: [
      {
        question: "O que preciso para ser revendedor Insul?",
        answer:
          "Basta você possuir um CNPJ válido no segmento de atacado, indústria ou revenda de materiais de construção, ferragens ou produtos agropecuários e fazer contato com nosso time de atendimento.",
      },
      {
        question: "A Insul atende em todo Brasil?",
        answer:
          "Sim, atendemos todo o Brasil, porém, com maior foco na Região Sul e Sudeste. Para clientes de outras regiões do país, geralmente operamos com frete até SP, onde acontece o redespacho por uma transportadora da escolha do cliente, ou ainda com coleta de material na fábrica.",
      },
      {
        question: "A Insul atende construtoras diretamente?",
        answer:
          "Sim, atendemos construtoras em todo o Brasil que precisarem de nossos produtos, basta entrar em contato com nosso time de atendimento.",
      },
      {
        question: "A Insul vende para consumidor final (CPF)?",
        answer:
          "Sim, para isso criamos nossa loja virtual, a Casa das Cercas, com atendimento especial para todo tipo de consumidor final. Acesse: www.casadascercas.com.br.",
      },
      {
        question: "Qual matéria-prima é utilizada?",
        answer:
          "A Insul utiliza basicamente matérias-primas nacionais de primeira qualidade e têm a Gerdau como sua principal fornecedora, sendo o seu maior cliente de arames galvanizados no Sul do Brasil.",
      },
      {
        question: "Qual a garantia dos produtos Insul?",
        answer:
          "Todos produtos tem garantia de fábrica e elas variam em 5, 2 ou 1 ano(s), desde que utilizados de maneira correta em ambiente apropriado. Independente disso, as telas galvanizadas a fogo, em sua maioria, são produzidas para durar mais de 15 anos em ambientes não litorâneos.",
      },
    ],
  },
  footer: {
    descricao:
      "Fabricamos telas, cercas e gradis com qualidade industrial e entrega para todo o Brasil.",
    voltarTopo: "Voltar ao topo",
    direitos: "Todos os direitos reservados.",
    cols: {
      produtos: "PRODUTOS",
      empresa: "EMPRESA",
      contato: "CONTATO",
      loja: "LOJA",
    },
    links: {
      telasSoldadas: "Telas Soldadas",
      telasHexagonais: "Telas Hexagonais",
      cercasProntas: "Cercas Prontas",
      gradil: "Gradil",
      arames: "Arames",
      inicio: "Início",
      industria: "Indústria",
      distribuicao: "Distribuição",
      duvidas: "Dúvidas",
      catalogo: "Catálogo",
    },
  },
  loader: {
    garantia: "NOSSA GARANTIA",
    palavras: [
      "QUALIDADE",
      "PROTEÇÃO",
      "RESISTÊNCIA",
      "DURABILIDADE",
      "SEGURANÇA",
    ],
  },
  chatbot: {
    tooltip: "Fale com o Guilherme",
    abrirAria: "Conversar com o Guilherme",
    fecharAria: "Fechar conversa",
    consultor: "Consultor Insul",
    inicial:
      "Oi, eu sou o Guilherme! 👋 Faço parte do time Insul e posso te ajudar a tirar dúvidas sobre nossas cercas, entregas e distribuição. Pergunta aí!",
    placeholder: "Escreva sua pergunta...",
    enviarAria: "Enviar mensagem",
    pills: [
      "Tela para canil",
      "Tela para indústrias",
      "Como funciona o gradil",
    ],
    newsletter: {
      cta: "Quer receber novidades e promoções?",
      eyebrow: "Newsletter",
      titulo: "Receber novidades e promoções",
      texto:
        "Cadastre abaixo para receber em primeira mão todas as novidades e promoções",
      nome: "Nome",
      email: "E-mail",
      celular: "Celular com DDD",
      enviando: "Enviando...",
      enviar: "Receber novidades!",
      sucesso: "Cadastro enviado! Em breve você recebe nossas novidades.",
      erroGenerico: "Não foi possível enviar. Tente novamente.",
      erroConexao: "Falha de conexão. Tente novamente.",
      fecharAria: "Fechar",
    },
    fallback: [
      "Boa pergunta! Posso te passar mais detalhes sobre nossas cercas, entregas ou centros de distribuição. O que você quer saber?",
      "Ainda estou aprendendo a responder tudo, mas nosso time comercial consegue te ajudar com isso direto pelo contato da Insul.",
    ],
    rules: [
      {
        keywords: ["frete", "entrega", "prazo", "envio", "envia", "chega"],
        reply:
          "Enviamos para todo o Brasil a partir dos nossos centros de distribuição no Rio Grande do Sul (Cachoeira do Sul) e em Minas Gerais (Divinópolis). O prazo varia conforme o estado, mas a gente sempre busca a rota mais rápida até você.",
      },
      {
        keywords: [
          "cerca",
          "produto",
          "fenix",
          "fênix",
          "campeira",
          "modelo",
          "catalogo",
          "catálogo",
        ],
        reply:
          "Temos várias linhas de cercas, como a Fênix e a Campeira, com opções para diferentes tipos de propriedade. Dá uma olhada na seção de produtos aqui na página ou me conta o que você precisa que eu te indico o modelo certo.",
      },
      {
        keywords: [
          "preço",
          "preco",
          "valor",
          "orçamento",
          "orcamento",
          "quanto custa",
        ],
        reply:
          "Os valores variam conforme o modelo e a quantidade. Para um orçamento certinho, fala com nosso time comercial pelo WhatsApp ou pelo formulário de contato — assim conseguimos calcular direitinho pra sua região.",
      },
      {
        keywords: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"],
        reply:
          "Olá! Tudo bem? Me conta o que você gostaria de saber sobre a Insul.",
      },
      {
        keywords: ["obrigado", "obrigada", "valeu", "thanks"],
        reply: "Por nada! Qualquer outra dúvida, é só chamar. 😉",
      },
      {
        keywords: ["canil"],
        reply:
          "Pra canil, indicamos telas soldadas como a Tela Titan e a Tela Morada — resistentes e seguras pra manter cães de pequeno e médio porte. Dá uma olhada na seção de telas soldadas e hexagonais aqui no site!",
      },
      {
        keywords: ["indústria", "industria", "industrial"],
        reply:
          "Pra uso industrial, temos telas soldadas mais robustas, como a Tela Titan e a Tela Morada, ideais pra cercamento de indústrias, centros logísticos e estacionamentos — além do gradil e das cercas prontas pra áreas maiores.",
      },
      {
        keywords: ["gradil"],
        reply:
          "O Gradil é um painel de aço soldado modular (temos nos modelos G4, G5 e G12), fixado com catracas em postes — instalação rápida e ótima resistência. Ideal pra indústrias, condomínios e áreas comerciais.",
      },
    ],
  },

  gradil: {
    hero: {
      title1: "Segurança que cerca",
      title2: "sua propriedade",
      subtitleLead: "Modelos G4, G5 e G12",
      subtitleRest:
        " — painel de aço soldado modular, instalação rápida e alta resistência.",
      scroll: "role para baixo",
      galleryAlt: "Gradil Insul instalado",
    },
    showcase: {
      title: "Gradil",
      left: "A linha de gradis Insul: painéis de aço soldado modulares para cercar e proteger o seu espaço.",
      modelsLead: "Modelos ",
      models: "G4, G5 e G12",
      modelsRest:
        " — do residencial leve ao industrial de alta resistência, com instalação rápida e acabamento durável.",
      securityLead:
        "Segurança que valoriza indústrias, condomínios e residências, sem abrir mão do ",
      design: "design",
      words: ["Design", "Qualidade", "Resistência"],
    },
    cards: [
      { title: "Malha", description: "5 cm x 20 cm | 2,5 cm x 20 cm | 2,0 cm x 20 cm" },
      { title: "Alturas", description: "1,03 m | 1,53 m | 2,03 m | 2,43 m" },
      { title: "Comprimento", description: "2,5 m" },
      { title: "Bitola", description: "4,0 mm | 4,8 mm" },
    ],
    reveal:
      "Desenvolvidos para proporcionar segurança e durabilidade, os gradis são indicados para diferentes tipos de terrenos e aplicações. Uma solução prática e eficiente para proteger sua propriedade, garantindo resistência e um acabamento de qualidade.",
    process: {
      label: "Processo de produção",
      title: "Processo de produção",
      capacityLead: "Capacidade de produção por turno de ",
      capacityM2: "4.000 m²",
      capacityMid: " de Gradil ",
      capacityModels: "G4, G5 ou G12",
      steps: [
        { num: "01", title: "Processo", desc: "Processo de Solda / Dobra e Armazenagem 100% automatizado" },
        { num: "02", title: "Tratamento", desc: "Tratamento pré-pintura por imersão com fosfatização tricatiônica" },
        { num: "03", title: "Linha de pintura", desc: "Linha de pintura Erzinger, 100% automatizada e robotizada com pistolas Wagner" },
        { num: "04", title: "Tintas", desc: "Tintas Poliéster Premium com garantia de brilho e resistência por mais tempo." },
      ],
    },
    colors: {
      label: "Linha Residencial | Cores sob demanda",
      title1: "Tamanhos",
      title2: "medidas e cores",
      descriptions: [
        "Matéria prima arame galvanizado da GERDAU com camada de zindo à fogo de 70 g/m2",
        "Tintas poliéster premium das marcas WEG ou MEKAL com garantia de brilho e resistência por mais tempo.",
      ],
      names: { PRETO: "Preto", VERDE: "Verde", BRANCO: "Branco", AMARELO: "Amarelo", AZUL: "Azul", CINZA: "Cinza" },
    },
    products: {
      title: "Gradil",
      cards: [
        {
          name: "Gradil G4",
          paragraph: "Bitola 4,0 mm, Malha 5 cm x 20 cm, Aço soldado, Galvanizado + pintura",
          shortDescription:
            "Painel de aço soldado modular para cercamento residencial e comercial leve. Instalação rápida, boa visibilidade e acabamento durável.",
          description:
            "O Gradil G4 Insul é um painel de aço soldado modular, ideal para residências, condomínios e áreas comerciais. Une leveza, design e segurança, com instalação rápida e baixa manutenção.",
          indicated: ["Residências", "Condomínios"],
        },
        {
          name: "Gradil G5",
          paragraph: "Bitola 4,8 mm, Malha 5 cm x 20 cm, Aço soldado, Galvanizado + pintura",
          shortDescription:
            "Painel intermediário com maior bitola, indicado para condomínios, empresas e áreas que exigem mais robustez sem abrir mão do design.",
          description:
            "O Gradil G5 Insul aumenta a resistência com arame de maior bitola, mantendo o sistema modular de instalação rápida. Perfeito para condomínios, empresas e espaços que pedem mais segurança.",
          indicated: ["Condomínios", "Indústrias"],
        },
        {
          name: "Gradil G12",
          paragraph: "Bitola 4,8 mm, Malha 2,5 cm x 20 cm, Aço soldado reforçado, Alta resistência",
          shortDescription:
            "Painel de alta resistência com malha mais fechada, desenvolvido para uso industrial e áreas que exigem o máximo em segurança e durabilidade.",
          description:
            "O Gradil G12 Insul é a solução mais robusta da linha, com malha fechada e estrutura reforçada. Indicado para indústrias, centros logísticos e perímetros que exigem alta segurança.",
          indicated: ["Indústrias", "Portões e perímetros"],
        },
      ],
    },
    pipes: {
      label: "Linha Residencial",
      title1: "Tubos",
      title2: "e acessórios",
      text: "Matéria prima arame galvanizado da Gerdau com camada de zindo à fogo de 70 g/m2",
      imgAlt: "Poste com tampa, fixador, parafuso e tampinha",
      cards: [
        { title: "Tampa", desc: "Acabamento superior que protege o interior do poste." },
        { title: "Fixador", desc: "Prende a tela ao poste com firmeza e praticidade." },
        { title: "Parafuso", desc: "Sextavado com vedação para uma fixação segura." },
        { title: "Acabamento", desc: "Finaliza o conjunto ocultando o parafuso." },
      ],
      features: [
        ["Espessura da chapa", "Tubos de até 2,08m: 125mm.", "Tubos a partir de 2,48m: 145mm."],
        ["Poste retangulares", "metálicos 4x6cm."],
        ["Acessórios com", "proteção anti-UV."],
        ["Poste galvanizado a", "quente com camada de", "zinco média de 275g/m."],
        ["Fosfatização", "microcristalina tricatiônica"],
        ["Pintura eletrostática", "Thermo-plastic poliéster."],
      ],
    },
    coating: {
      label: "Linha Residencial",
      title: "Revestimento do arame",
      subtitle:
        "Matéria prima arame galvanizado da Gerdau com camada de zindo à fogo de 70 g/m2",
      prev: "Camada anterior",
      next: "Próxima camada",
      layers: ["Pintura eletrostática", "Fosfato tricatiônico", "Galvanização a fogo", "Aço Gerdau"],
    },
    guarantee: {
      title1: "Qualidade comprovada",
      title2: "com 5 anos de garantia!",
      note: "*em ambientes não litorâneos",
      side: "Tintas Poliéster Premium das marcas com garantia de brilho e resistência por mais tempo.",
    },
    other: {
      title: "Outros produtos",
      productTitle: "Cerca pronta",
      products: [{ name: "Fênix" }, { name: "Campeira" }, { name: "Campeira Boi" }],
    },
  },

  searchShowcase: {
    query: "Cercar sua propriedade ficou mais fácil",
    suggestions: [
      "Conheça a Insul. Proteção, qualidade e praticidade em um só lugar",
      "Soluções resistentes para proteger sua propriedade",
      "Cercas prontas para uma instalação rápida e prática",
    ],
    mostSearched: "Mais procurado",
  },

  productCard: {
    likedFence: "Gostou da tela?",
    seeDetails: "Veja os detalhes",
    postSpacingLabel: "Espaçamento entre mourões",
    indicatedFor: "Indicado para",
  },

  videoCardCarousel: {
    headingLead: "Veja alguns vídeos sobre a",
    unmuteAria: "Ativar som",
    muteAria: "Silenciar",
  },

  similarProducts: {
    heading: "Produtos similares",
  },

  animalChart: {
    capacityHeading: "capacidade de conter cada animal",
    collidingWithFence: "colidindo com a tela",
    escapingFence: "tentando escapar pelo cercamento",
  },

  animalNames: {
    Bovino: "Bovino",
    Bovinos: "Bovinos",
    Caprino: "Caprino",
    Caprinos: "Caprinos",
    Ovinos: "Ovinos",
    "Suínos": "Suínos",
    Javaporco: "Javaporco",
    Aves: "Aves",
    "Cães e silvestres": "Cães e silvestres",
    "Cães": "Cães",
    Capivara: "Capivara",
    Avestruz: "Avestruz",
    Galinha: "Galinha",
    Ganso: "Ganso",
  } as Record<string, string>,

  cercasProntasPage: {
    cardPostTitle: "Veja sobre as cercas prontas",
    cardPostDescriptionLead: "Especificações e detalhes: ",
    cardPostDescriptionRest:
      "acompanhe de perto como cada cerca pronta Insul se comporta no campo.",
  },

  cercasProntas: {
    fenix: {
      title: "Cerca Pronta(rurais)",
      paragraph:
        "Fio 2,50 mm, Aço galvanizado a fogo, Malha bifásica, Nó em X (stiff stay)",
      shortDescription:
        "Tela de simples torção em aço de alto carbono, com instalação até 6x mais rápida e até 50% menos mourões. Segurança e durabilidade para qualquer propriedade.",
      paragraphs: [
        "A Tela Alambrada Fênix Insul é uma solução de cercamento em tela de simples torção, fabricada com arame de aço de alto carbono, que proporciona maior resistência mecânica, durabilidade e desempenho. Desenvolvida para oferecer segurança e confiabilidade, é ideal para projetos que exigem um cercamento eficiente e de longa vida útil.",
        "Seu sistema construtivo permite uma instalação até 6 vezes mais rápida em comparação aos cercamentos convencionais, reduzindo o tempo de execução da obra e aumentando a produtividade. Além disso, sua estrutura possibilita a utilização de até 50% menos mourões, proporcionando economia de materiais sem comprometer a resistência do cercamento.",
        "A Tela Alambrada Fênix Insul é indicada para o cercamento de residências, condomínios, empresas, indústrias, escolas, quadras esportivas, chácaras, sítios, áreas públicas e demais propriedades que necessitem de uma solução prática, segura e de alto desempenho.",
        "Aliando tecnologia, resistência e excelente custo-benefício, a Tela Alambrada Fênix Insul oferece ampla visibilidade, baixa necessidade de manutenção e alta durabilidade, tornando-se uma escolha inteligente para projetos que buscam rapidez na instalação, economia e qualidade em um único sistema de cercamento.",
      ],
      animals: [
        "Bovino",
        "Capivara",
        "Cães",
        "Caprino",
        "Avestruz",
        "Ovinos",
        "Suínos",
        "Javaporco",
        "Galinha",
        "Ganso",
      ],
      hotspot: {
        title: "Cerca Fênix Insul",
        description:
          "Fio de alta resistência com acabamento galvanizado, ideal para grandes propriedades.",
      },
      features: [
        {
          title: "Fio 2,50 mm",
          description:
            "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
        },
        {
          title: "Instalação",
          description:
            "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
        },
        {
          title: "Malha bifásica",
          description:
            "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
        },
        {
          title: "Nó em X (stiff stay)",
          description:
            "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Aço Carbono",
          description:
            "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
        },
        {
          category: "ESTRUTURA",
          title: "Nó em X",
          description:
            "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
        },
        {
          category: "TERRENO",
          title: "Qualquer Relevo",
          description:
            "Acompanha aclives e declives sem dificuldade na instalação.",
        },
        {
          category: "ECONOMIA",
          title: "Instalação Rápida",
          description:
            "Espaçamento maior entre mourões gera até 50% de economia.",
        },
        {
          category: "PROTEÇÃO",
          title: "Malha Bimodal",
          description:
            "Fechada embaixo para contenção, aberta em cima para economia.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada em propriedade rural" },
        { alt: "Detalhe do fio e da malha" },
        { alt: "Rolo da tela" },
        { alt: "Cerca em terreno com desnível" },
        { alt: "Acabamento galvanizado a fogo" },
        { alt: "Nó em X da cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
    "campeira-maxx": {
      title: "Cerca Pronta(rurais)",
      paragraph:
        "Fio 2,50 mm, Aço galvanizado a fogo, Malha bifásica, Nó em X (stiff stay)",
      shortDescription:
        "Nó em X exclusivo da Insul, feito para conter bovinos e equinos e proteger a lavoura contra grandes animais. Ruptura de até 700 kgf e 5 anos de garantia.",
      paragraphs: [
        "A cerca pronta Campeira Maxx Insul é a escolha definitiva para quem busca o máximo em resistência, durabilidade e praticidade. Este produto exclusivo da Insul se destaca por ser o único no mercado com o revolucionário nó em X (stiff stay), uma inovação que garante uma estrutura mais robusta e segura, ideal para enfrentar as condições mais exigentes no campo. A Campeira Maxx Insul é a indicação ideal para a contenção de animais de grande e médio porte, como bovinos e equinos, além de ser uma barreira extremamente eficaz contra invasores. Ela protege lavouras e propriedades rurais de ataques de javalis, javaporcos, capivaras e outros grandes animais que podem causar danos significativos. Além disso, a Campeira Maxx se adequa perfeitamente ao relevo do terreno, garantindo uma instalação eficiente e uma proteção contínua, independentemente das variações de topografia.",
        "Com sua robustez e durabilidade, a Campeira Maxx oferece a segurança necessária para manter seus animais contidos e sua terra protegida. Os arames que compõem a Campeira Maxx são de 2,50 mm de espessura, galvanizados a fogo e produzidos com a renomada qualidade Gerdau, proporcionando uma resistência superior à corrosão e uma carga de ruptura de até 700 kgf. Isso se traduz em uma cerca que mantém sua integridade e funcionalidade por muitos anos, mesmo nas condições mais adversas. Além disso, o design com nó em X assegura maior firmeza e estabilidade, garantindo que a cerca permaneça intacta mesmo sob pressões externas.",
        "A Campeira Maxx também se destaca pela sua praticidade na instalação. A cerca vem pronta para uso, o que facilita o processo de instalação e economiza tempo e mão de obra. Esta praticidade, combinada com a alta durabilidade do produto, resulta em uma solução de cercamento que exige menor manutenção ao longo do tempo, proporcionando economia a longo prazo. Outro grande diferencial da Campeira Maxx é a garantia de 5 anos que a Insul oferece, refletindo a confiança na qualidade e na durabilidade do produto. Além disso, a harmonia estética da cerca é um ponto importante, pois, além de funcional, ela se integra perfeitamente ao ambiente, conferindo uma aparência organizada e profissional à propriedade.",
        "Para varejistas e revendedores, a cerca pronta Campeira Maxx Insul representa uma oportunidade única de agregar valor ao seu mix de produtos. Sua exclusividade e diferenciais de qualidade aumentam o potencial de vendas e fortalecem a reputação da loja como fornecedora de produtos de alta qualidade e também de oferecer uma alternativa mais moderna, prática e resistente à cerca de confecção manual de arame ovalado. A alta demanda por cercas resistentes e duradouras, aliada à exclusividade da tecnologia de nó em X e toda qualidade oferecida pela cerca pronta Campeira Maxx Insul, garante um alto potencial de vendas e fidelização de clientes. Com um produto tão completo, a satisfação do cliente é garantida, reduzindo reclamações, aumentando a fidelização e seus lucros. Escolha a cerca pronta Campeira Maxx Insul e descubra como uma cerca pode fazer a diferença em sua propriedade, unindo inovação, qualidade e praticidade em um só produto.",
      ],
      animals: [
        "Bovino",
        "Capivara",
        "Cães",
        "Avestruz",
        "Ovinos",
        "Suínos",
        "Javaporco",
      ],
      hotspot: {
        title: "Cerca Campeira Maxx Insul",
        description:
          "Reforçada para pastagens de maior porte, com maior espaçamento entre fios.",
      },
      features: [
        {
          title: "Instalação",
          description:
            "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
          captions: [
            {
              label: "Instalação",
              value:
                "Tela pronta e esticada entre os mourões — sai de fábrica pronta para instalar, sem montar arame por arame.",
            },
            {
              label: "Comprimento",
              value:
                "5x5 até 8x8 metros entre mourões, economizando até 50% em material.",
            },
            {
              label: "Nó em X",
              value:
                "O fio de aço e o nó em X (stiff stay) se travam entre si, mantendo a tensão e a rigidez da cerca por muito mais tempo.",
            },
          ],
        },
        {
          title: "Malha superior | inferior",
          description:
            "Malha de 22cm x 20cm com acabamento em aço galvanizado a fogo.",
          captions: [
            {
              label: "Malha",
              value: "",
              options: [
                {
                  label: "Malha superior",
                  value:
                    "22cm x 20cm — mais aberta para reduzir o custo de material e manter o visual limpo, sem abrir mão da resistência.",
                },
                {
                  label: "Malha inferior",
                  value:
                    "22cm x 10cm — mais fechada para reforçar a contenção de animais e barrar invasores menores.",
                },
              ],
            },
            {
              label: "Malha superior",
              value:
                "22cm x 20cm — mais aberta para reduzir o custo de material e manter o visual limpo, sem abrir mão da resistência.",
            },
            {
              label: "Malha inferior",
              value:
                "22cm x 10cm — mais fechada para reforçar a contenção de animais e barrar invasores menores.",
            },
          ],
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Fio 2,50 mm",
          description:
            "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
        },
        {
          category: "ACABAMENTO",
          title: "Aço Galvanizado a Fogo",
          description:
            "Proteção contra corrosão e maior durabilidade em qualquer ambiente.",
        },
        {
          category: "ESTRUTURA",
          title: "Malha Bifásica",
          description:
            "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
        },
        {
          category: "ESTRUTURA",
          title: "Nó em X (stiff stay)",
          description:
            "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        },
        {
          category: "PROTEÇÃO",
          title: "Malha Bimodal",
          description:
            "Fechada embaixo para contenção, aberta em cima para economia.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada em propriedade rural" },
        { alt: "Detalhe do fio e da malha" },
        { alt: "Rolo da tela" },
        { alt: "Cerca em terreno com desnível" },
        { alt: "Acabamento galvanizado a fogo" },
        { alt: "Nó em X da cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
    campeira: {
      title: "Cerca Pronta(rurais)",
      paragraph:
        "Fio 2,30 mm, Aço galvanizado a fogo, Malha bifásica, Nó tradicional",
      shortDescription:
        "Modelo tradicional e consagrado da Insul, ideal para contenção de ovinos, caprinos e suínos. Fio galvanizado a fogo com 5 anos de garantia.",
      paragraphs: [
        "A cerca pronta Campeira Insul é sinônimo de tradição e excelência no mercado de cercas prontas, sendo amplamente reconhecida entre consumidores pela sua eficiência e confiabilidade. Desenvolvida para a contenção de animais de médio porte, como ovinos, caprinos e suínos, a Campeira Insul se destaca não apenas por sua popularidade, mas também pelos diferenciais de qualidade que fazem toda a diferença. A qualidade Insul é o que coloca a Campeira à frente dos demais produtos do mercado.",
        "Cada cerca é fabricada com rigorosos padrões de qualidade, utilizando arames Gerdau de alta qualidade, que recebem galvanização a fogo para garantir resistência superior à corrosão. Esse processo assegura uma maior resistência e alta durabilidade, proporcionando uma cerca que mantém sua integridade e funcionalidade por muitos anos, mesmo nas condições mais adversas.",
        "Além de sua resistência, a Campeira Insul se destaca pela praticidade na instalação. Ela já vem pronta para uso, o que facilita o trabalho no campo e reduz significativamente o tempo de instalação. Essa praticidade, aliada a um menor custo de manutenção, torna a Campeira Insul uma escolha econômica e eficiente para proprietários rurais que buscam otimizar seus investimentos sem abrir mão da qualidade. A Insul oferece uma garantia de 5 anos para a Campeira, refletindo a confiança na durabilidade e no desempenho superior do produto.",
        "Outro diferencial importante é a adaptação ao relevo do terreno, permitindo que a cerca se integre de forma contínua e eficaz, independentemente das variações topográficas. Essa característica garante uma contenção segura e estável, adaptada às necessidades específicas de cada propriedade. A harmonia estética é outro ponto de destaque da Campeira Insul. Além de funcional, a cerca confere uma aparência organizada e profissional à propriedade, valorizando o ambiente rural e demonstrando cuidado e atenção aos detalhes.",
        "Para lojistas e revendedores, incluir a cerca pronta Campeira Insul em seu mix de produtos é uma decisão estratégica que agrega valor ao portfólio. Ao oferecer um produto de alta qualidade, que é reconhecido e confiado pelos consumidores, você atrai um público exigente e fideliza clientes que buscam soluções duradouras e eficientes. Com a crescente demanda por cercas prontas, a Campeira Insul garante um alto potencial de vendas e contribui para o fortalecimento da reputação do seu estabelecimento.",
      ],
      animals: ["Bovino", "Cães", "Caprino", "Suínos", "Ovinos"],
      hotspot: {
        title: "Cerca Campeira Insul",
        description:
          "Modelo tradicional para divisas rurais, resistente e de fácil instalação.",
      },
      features: [
        {
          title: "Fio 2,50 mm",
          description:
            "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
        },
        {
          title: "Instalação",
          description:
            "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
        },
        {
          title: "Malha bifásica",
          description:
            "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
        },
        {
          title: "Nó em X (stiff stay)",
          description:
            "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Aço Carbono",
          description:
            "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
        },
        {
          category: "ESTRUTURA",
          title: "Nó em X",
          description:
            "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
        },
        {
          category: "TERRENO",
          title: "Qualquer Relevo",
          description:
            "Acompanha aclives e declives sem dificuldade na instalação.",
        },
        {
          category: "ECONOMIA",
          title: "Instalação Rápida",
          description:
            "Espaçamento maior entre mourões gera até 50% de economia.",
        },
        {
          category: "PROTEÇÃO",
          title: "Malha Bimodal",
          description:
            "Fechada embaixo para contenção, aberta em cima para economia.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada em propriedade rural" },
        { alt: "Detalhe do fio e da malha" },
        { alt: "Rolo da tela" },
        { alt: "Cerca em terreno com desnível" },
        { alt: "Acabamento galvanizado a fogo" },
        { alt: "Nó em X da cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
    "campeira-boi": {
      title: "Cerca Pronta(rurais)",
      paragraph:
        "Fio 2,50 mm, Aço galvanizado a fogo, Malha 30 cm x 20 cm, Nó em X (stiff stay)",
      shortDescription:
        "Nó em X exclusivo e malha 30x20cm para contenção de bovinos e animais de grande porte, com ruptura de até 700 kgf mesmo em terrenos irregulares.",
      paragraphs: [
        "A cerca pronta Campeira Boi Insul é a solução ideal para quem precisa de segurança e durabilidade na contenção de animais de médio e grande porte. Este produto exclusivo da Insul é o único no mercado com o inovador nó em X (stiff stay), uma tecnologia que proporciona maior resistência e estabilidade, assegurando que a cerca permaneça firme e funcional mesmo sob pressão intensa. Desenvolvida para enfrentar as condições mais desafiadoras, a Campeira Boi Insul se destaca por sua carga de ruptura de 700kgf, o que a torna altamente eficaz para conter bovinos, equinos e outros animais de grande porte.",
        "Sua construção robusta e materiais de alta qualidade garantem uma cerca que não apenas cumpre seu papel de contenção, mas que também resiste ao desgaste do tempo. A durabilidade é um dos pilares da Campeira Boi Insul. Fabricada pela Insul com arames Gerdau de alta qualidade, que recebem galvanização a fogo, essa cerca oferece resistência superior à corrosão e longevidade, resultando em um produto que mantém sua integridade por anos, mesmo em ambientes adversos. Além disso, a cerca é projetada para se adequar ao relevo do terreno, garantindo uma instalação eficiente e proteção contínua, independentemente das variações topográficas.",
        "A praticidade na instalação é outro ponto forte da Campeira Boi Insul. A cerca vem pronta para uso, o que reduz significativamente o tempo e o esforço necessários para a montagem. Isso, combinado com seu menor custo de manutenção, faz da Campeira Boi uma escolha econômica e eficiente para proprietários rurais que buscam otimizar seus investimentos.",
        "Para varejistas e revendedores, a inclusão da cerca pronta Campeira Boi Insul no mix de produtos representa uma excelente oportunidade de negócio. Este produto exclusivo e de alta qualidade atrai um público qualificado, composto por proprietários rurais que buscam soluções robustas e duráveis. Ao disponibilizar a Campeira Boi em sua loja, você não apenas oferece um produto diferenciado que atende às necessidades do mercado, mas também oferece uma alternativa mais moderna, prática e resistente à cerca de confecção manual de arame ovalado, além de fortalece a reputação do seu estabelecimento como um fornecedor de itens de primeira linha. A alta demanda por cercas resistentes e duradouras, aliada à exclusividade da tecnologia de nó em X e toda qualidade oferecida pela cerca pronta Campeira Boi Insul, garante um alto potencial de vendas e fidelização de clientes.",
        "A Insul oferece uma garantia de 5 anos para a Campeira Boi, refletindo nossa confiança na qualidade e na durabilidade deste produto. Além de sua funcionalidade superior, a cerca também se integra de maneira harmoniosa ao ambiente, proporcionando uma estética organizada e profissional para sua propriedade. A cerca pronta Campeira Boi Insul é, portanto, a escolha ideal para quem precisa de uma solução de cercamento confiável, resistente e duradoura, que ofereça segurança tanto para os animais quanto para a propriedade. Com a combinação única de inovação, qualidade e praticidade, a Campeira Boi Insul é um investimento seguro e eficaz para o seu negócio.",
      ],
      animals: ["Bovino"],
      hotspot: {
        title: "Cerca Campeira Boi Insul",
        description:
          "Desenvolvida para rebanhos bovinos, com fios espaçados para máxima contenção.",
      },
      features: [
        {
          title: "Fio 2,50 mm",
          description:
            "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
        },
        {
          title: "Instalação",
          description:
            "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
        },
        {
          title: "Malha bifásica",
          description:
            "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
        },
        {
          title: "Nó em X (stiff stay)",
          description:
            "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Aço Carbono",
          description:
            "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
        },
        {
          category: "ESTRUTURA",
          title: "Nó em X",
          description:
            "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
        },
        {
          category: "TERRENO",
          title: "Qualquer Relevo",
          description:
            "Acompanha aclives e declives sem dificuldade na instalação.",
        },
        {
          category: "ECONOMIA",
          title: "Instalação Rápida",
          description:
            "Espaçamento maior entre mourões gera até 50% de economia.",
        },
        {
          category: "PROTEÇÃO",
          title: "Malha Bimodal",
          description:
            "Fechada embaixo para contenção, aberta em cima para economia.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada em propriedade rural" },
        { alt: "Detalhe do fio e da malha" },
        { alt: "Rolo da tela" },
        { alt: "Cerca em terreno com desnível" },
        { alt: "Acabamento galvanizado a fogo" },
        { alt: "Nó em X da cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
  } as Record<string, CercaProntaTranslation>,
};

export default pt;
export type Dictionary = typeof pt;
