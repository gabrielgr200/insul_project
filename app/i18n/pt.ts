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
};

export default pt;
export type Dictionary = typeof pt;
