import type { Dictionary } from "./pt";
import type { CercaProntaTranslation } from "../utils/localizeCerca";

const es: Dictionary = {
  nav: {
    inicio: "Inicio",
    produtos: "Productos",
    catalogo: "Catálogo",
    industria: "Industria",
    contato: "Contacto",
    lojaVirtual: "Tienda virtual",
  },
  aria: {
    abrirMenu: "Abrir menú",
    voltar: "Volver",
    fecharMenu: "Cerrar menú",
    idioma: "Seleccionar idioma",
    tema: "Seleccionar tema",
  },
  tema: {
    claro: "Claro",
    escuro: "Oscuro",
  },
  hero: {
    firme: "FIRME",
    duradouro: "DURADERO",
    subtitulo:
      "Insul es líder en la fabricación de mallas, rejas, alambrados y cercas prefabricadas, con la mayor variedad de productos del mercado.",
    cta: "Nuestros productos",
    imagemAlt: "Rollos de malla soldada Insul",
  },
  home: {
    numerosTitulo: "Nuestros números y socios",
  },
  partners: {
    area: "m² área fabril",
    telas: "m² de malla / mes",
    anos: "Años en el mercado",
    toneladas: "Ton. procesadas / mes",
  },
  products: {
    tituloLinha1: "NUESTROS",
    tituloLinha2: "PRODUCTOS",
    rooms: {
      "Cercas Prontas(rurais)": "Cercas Prefabricadas (rurales)",
      Gradil: "Reja",
      "Telas e Alambrados": "Mallas y Alambrados",
      Acessórios: "Accesorios",
      Arames: "Alambres",
    },
  },
  industry: {
    label: "Conoce nuestra historia",
    titulo: "LA INDUSTRIA",
    texto:
      "Somos especialistas en la fabricación de una amplia línea de productos derivados del alambre, como: mallas hexagonales, mallas soldadas, mallas de alambrado, cercas prefabricadas, rejas y accesorios para cercados en general - atendiendo las necesidades de los sectores rural, residencial, industrial y de la construcción.",
    timeline: [
      {
        title: "Año 2011",
        description:
          "Inicio de la fabricación de las primeras mallas de simple torsión en un galpón alquilado de 200 m²",
      },
      {
        title: "Año 2012",
        description:
          "Mudanza a un galpón de 420 m² alquilado y llegada de la primera máquina importada (Malla Hexagonal de 3”)",
      },
      {
        title: "Año 2013",
        description:
          "Adquisición de máquinas automáticas para alambrado de Maxtelas y ampliación del equipo productivo y comercial.",
      },
      {
        title: "Año 2015",
        description:
          "Mudanza a una fábrica (alquilada) más grande, con 900 m² de área productiva, e inicio de la fabricación de mallas soldadas.",
      },
      {
        title: "Año 2018",
        description:
          "Construcción y mudanza a la primera unidad propia de Insul, con 1600 m², ampliación de la línea de mallas soldadas e inicio de la fabricación de cercas prefabricadas (Cerca prefabricada Campeira).",
      },
      {
        title: "Año 2020",
        description:
          "Aumento del área productiva para la instalación de nuevas máquinas hexagonales y stock de productos terminados.",
      },
      {
        title: "Año 2021",
        description:
          "Expansión de la industria con la instalación de máquinas europeas de malla soldada e inicio de la fabricación de rejas.",
      },
      {
        title: "Año 2024",
        description:
          "Instalación de una línea de producción y pintura automática para rejas, además de la llegada de otra máquina europea para la fabricación de mallas soldadas.",
      },
    ],
  },
  textReveal: {
    paragrafos: [
      "Desde 2010, Insul Arames e Telas invierte en tecnología de punta para ofrecer productos de alta calidad y garantizar la satisfacción y confianza de nuestros clientes.",
      "Para nosotros, la calidad no es un objetivo, es una práctica diaria. Seguimos comprometidos en ser referencia en el sector y en contribuir al crecimiento sostenible de nuestros clientes y socios.",
    ],
  },
  distribution: {
    label: "Centros de distribución",
    tituloLinha1: "ENVÍOS A",
    tituloLinha2: "TODO BRASIL",
    texto:
      "Con nuestros centros de distribución en Rio Grande do Sul y en Minas Gerais, llegamos a todos los estados del país con rapidez y garantía de entrega.",
    cardLabel: "Centro de distribución",
    centers: [
      { state: "Rio Grande do Sul", city: "Cachoeira do Sul" },
      { state: "Minas Gerais", city: "Divinópolis" },
    ],
  },
  book: {
    label: "Mallas y accesorios",
    tituloLinha1: "CATÁLOGO DE",
    tituloLinha2: "PRODUCTOS",
    texto:
      "Mira nuestro catálogo de productos y conoce en detalle toda nuestra línea de productos.",
    tooltip: "Haz clic en el botón para elegir un producto",
    interessado: "¿Te interesó?",
    ctaSaibaMais: "Haz clic aquí y conoce más",
    ver: "Ver",
    pagina: "Página",
  },
  faq: {
    eyebrow: "PREGUNTAS FRECUENTES",
    titulo: "Dudas",
    subtitulo:
      "Todo lo que necesitas saber sobre nuestros productos, materiales y empresa.",
    items: [
      {
        question: "¿Qué necesito para ser revendedor Insul?",
        answer:
          "Basta con tener un CNPJ (registro de empresa) válido en el segmento de mayorista, industria o reventa de materiales de construcción, ferretería o productos agropecuarios y contactar a nuestro equipo de atención.",
      },
      {
        question: "¿Insul atiende a todo Brasil?",
        answer:
          "Sí, atendemos a todo Brasil, aunque con mayor foco en las regiones Sur y Sudeste. Para clientes de otras regiones del país, generalmente operamos con flete hasta São Paulo, donde se hace el reenvío por un transportista elegido por el cliente, o bien con retiro del material en la fábrica.",
      },
      {
        question: "¿Insul atiende a constructoras directamente?",
        answer:
          "Sí, atendemos a constructoras en todo Brasil que necesiten nuestros productos; solo hay que contactar a nuestro equipo de atención.",
      },
      {
        question: "¿Insul vende al consumidor final (persona física)?",
        answer:
          "Sí, para eso creamos nuestra tienda virtual, Casa das Cercas, con atención especial para todo tipo de consumidor final. Visita: www.casadascercas.com.br.",
      },
      {
        question: "¿Qué materia prima se utiliza?",
        answer:
          "Insul utiliza básicamente materias primas nacionales de primera calidad y tiene a Gerdau como su principal proveedor, siendo su mayor cliente de alambres galvanizados en el Sur de Brasil.",
      },
      {
        question: "¿Cuál es la garantía de los productos Insul?",
        answer:
          "Todos los productos tienen garantía de fábrica que varía entre 5, 2 o 1 año(s), siempre que se utilicen de manera correcta en un ambiente apropiado. Independientemente de ello, las mallas galvanizadas en caliente, en su mayoría, están hechas para durar más de 15 años en ambientes no costeros.",
      },
    ],
  },
  footer: {
    descricao:
      "Fabricamos mallas, cercas y rejas con calidad industrial y entrega a todo Brasil.",
    voltarTopo: "Volver arriba",
    direitos: "Todos los derechos reservados.",
    cols: {
      produtos: "PRODUCTOS",
      empresa: "EMPRESA",
      contato: "CONTACTO",
      loja: "TIENDA",
    },
    links: {
      telasSoldadas: "Mallas Soldadas",
      telasHexagonais: "Mallas Hexagonales",
      cercasProntas: "Cercas Prefabricadas",
      gradil: "Reja",
      arames: "Alambres",
      inicio: "Inicio",
      industria: "Industria",
      distribuicao: "Distribución",
      duvidas: "Dudas",
      catalogo: "Catálogo",
    },
  },
  loader: {
    garantia: "NUESTRA GARANTÍA",
    palavras: [
      "CALIDAD",
      "PROTECCIÓN",
      "RESISTENCIA",
      "DURABILIDAD",
      "SEGURIDAD",
    ],
  },
  chatbot: {
    tooltip: "Habla con Guilherme",
    abrirAria: "Conversar con Guilherme",
    fecharAria: "Cerrar conversación",
    consultor: "Consultor Insul",
    inicial:
      "¡Hola, soy Guilherme! 👋 Formo parte del equipo Insul y puedo ayudarte a resolver dudas sobre nuestras cercas, entregas y distribución. ¡Pregúntame!",
    placeholder: "Escribe tu pregunta...",
    enviarAria: "Enviar mensaje",
    pills: [
      "Malla para perreras",
      "Malla para industrias",
      "Cómo funciona la reja",
    ],
    newsletter: {
      cta: "¿Quieres recibir novedades y promociones?",
      eyebrow: "Newsletter",
      titulo: "Recibir novedades y promociones",
      texto:
        "Regístrate abajo para recibir en primicia todas las novedades y promociones",
      nome: "Nombre",
      email: "Correo electrónico",
      celular: "Celular con código de área",
      enviando: "Enviando...",
      enviar: "¡Recibir novedades!",
      sucesso: "¡Registro enviado! Pronto recibirás nuestras novedades.",
      erroGenerico: "No se pudo enviar. Inténtalo de nuevo.",
      erroConexao: "Fallo de conexión. Inténtalo de nuevo.",
      fecharAria: "Cerrar",
    },
    fallback: [
      "¡Buena pregunta! Puedo darte más detalles sobre nuestras cercas, entregas o centros de distribución. ¿Qué te gustaría saber?",
      "Todavía estoy aprendiendo a responder todo, pero nuestro equipo comercial puede ayudarte con eso directamente por los canales de contacto de Insul.",
    ],
    rules: [
      {
        keywords: [
          "flete",
          "entrega",
          "plazo",
          "envío",
          "envio",
          "llega",
          "envía",
        ],
        reply:
          "Enviamos a todo Brasil desde nuestros centros de distribución en Rio Grande do Sul (Cachoeira do Sul) y en Minas Gerais (Divinópolis). El plazo varía según el estado, pero siempre buscamos la ruta más rápida hasta ti.",
      },
      {
        keywords: ["perrera", "canil", "perro"],
        reply:
          "Para perreras, recomendamos mallas soldadas como la Tela Titan y la Tela Morada — resistentes y seguras para mantener perros de pequeño y mediano porte. ¡Echa un vistazo a la sección de mallas soldadas y hexagonales en el sitio!",
      },
      {
        keywords: ["industria", "industrial", "fábrica", "fabrica"],
        reply:
          "Para uso industrial, tenemos mallas soldadas más robustas, como la Tela Titan y la Tela Morada, ideales para el cercado de industrias, centros logísticos y estacionamientos — además de la reja y las cercas prefabricadas para áreas más grandes.",
      },
      {
        keywords: ["reja", "gradil"],
        reply:
          "La Reja (Gradil) es un panel de acero soldado modular (disponible en los modelos G4, G5 y G12), fijado con trinquetes en postes — instalación rápida y excelente resistencia. Ideal para industrias, condominios y áreas comerciales.",
      },
      {
        keywords: [
          "precio",
          "valor",
          "presupuesto",
          "cuánto cuesta",
          "cuanto cuesta",
          "costo",
        ],
        reply:
          "Los valores varían según el modelo y la cantidad. Para ver precios y hacer tu pedido, entra en nuestra tienda virtual en casadascercas.com.br o escríbenos al WhatsApp (51) 99509-8453.",
      },
      {
        keywords: [
          "cerca",
          "producto",
          "fenix",
          "fénix",
          "campeira",
          "modelo",
          "catalogo",
          "catálogo",
        ],
        reply:
          "Tenemos varias líneas de cercas, como la Fênix y la Campeira, con opciones para distintos tipos de propiedad. Echa un vistazo a la sección de productos en esta página o cuéntame qué necesitas y te recomiendo el modelo adecuado.",
      },
      {
        keywords: [
          "hola",
          "buenas",
          "buenos días",
          "buenas tardes",
          "buenas noches",
        ],
        reply:
          "¡Hola! ¿Cómo estás? Cuéntame qué te gustaría saber sobre Insul.",
      },
      {
        keywords: ["gracias", "muchas gracias"],
        reply: "¡De nada! Cualquier otra duda, solo escríbeme. 😉",
      },
    ],
  },

  gradil: {
    hero: {
      title1: "Seguridad que rodea",
      title2: "tu propiedad",
      subtitleLead: "Modelos G4, G5 y G12",
      subtitleRest:
        " — panel de acero soldado modular, instalación rápida y alta resistencia.",
      scroll: "desliza hacia abajo",
      galleryAlt: "Reja Insul instalada",
    },
    showcase: {
      title: "Reja",
      left: "La línea de rejas Insul: paneles de acero soldado modulares para cercar y proteger tu espacio.",
      modelsLead: "Modelos ",
      models: "G4, G5 y G12",
      modelsRest:
        " — del residencial ligero al industrial de alta resistencia, con instalación rápida y acabado duradero.",
      securityLead:
        "Seguridad que valoriza industrias, condominios y viviendas, sin renunciar al ",
      design: "diseño",
      words: ["Diseño", "Calidad", "Resistencia"],
    },
    cards: [
      { title: "Malla", description: "5 cm x 20 cm | 2,5 cm x 20 cm | 2,0 cm x 20 cm" },
      { title: "Alturas", description: "1,03 m | 1,53 m | 2,03 m | 2,43 m" },
      { title: "Longitud", description: "2,5 m" },
      { title: "Calibre", description: "4,0 mm | 4,8 mm" },
    ],
    reveal:
      "Desarrolladas para brindar seguridad y durabilidad, las rejas son indicadas para diferentes tipos de terreno y aplicaciones. Una solución práctica y eficiente para proteger tu propiedad, garantizando resistencia y un acabado de calidad.",
    process: {
      label: "Proceso de producción",
      title: "Proceso de producción",
      capacityLead: "Capacidad de producción por turno de ",
      capacityM2: "4.000 m²",
      capacityMid: " de Reja ",
      capacityModels: "G4, G5 o G12",
      steps: [
        { num: "01", title: "Proceso", desc: "Proceso de soldadura / doblado y almacenaje 100% automatizado" },
        { num: "02", title: "Tratamiento", desc: "Tratamiento prepintura por inmersión con fosfatizado tricatiónico" },
        { num: "03", title: "Línea de pintura", desc: "Línea de pintura Erzinger, 100% automatizada y robotizada con pistolas Wagner" },
        { num: "04", title: "Pinturas", desc: "Pinturas Poliéster Premium con garantía de brillo y resistencia por más tiempo." },
      ],
    },
    colors: {
      label: "Línea Residencial | Colores a pedido",
      title1: "Tamaños,",
      title2: "medidas y colores",
      descriptions: [
        "Materia prima: alambre galvanizado GERDAU con capa de zinc en caliente de 70 g/m²",
        "Pinturas poliéster premium de las marcas WEG o MEKAL, con garantía de brillo y resistencia por más tiempo.",
      ],
      names: { PRETO: "Negro", VERDE: "Verde", BRANCO: "Blanco", AMARELO: "Amarillo", AZUL: "Azul", CINZA: "Gris" },
    },
    products: {
      title: "Reja",
      cards: [
        {
          name: "Reja G4",
          paragraph: "Calibre 4,0 mm, malla 5 cm x 20 cm, acero soldado, galvanizado + pintura",
          shortDescription:
            "Panel de acero soldado modular para cercado residencial y comercial ligero. Instalación rápida, buena visibilidad y acabado duradero.",
          description:
            "La Reja G4 Insul es un panel de acero soldado modular, ideal para viviendas, condominios y áreas comerciales. Une ligereza, diseño y seguridad, con instalación rápida y bajo mantenimiento.",
          indicated: ["Viviendas", "Condominios"],
        },
        {
          name: "Reja G5",
          paragraph: "Calibre 4,8 mm, malla 5 cm x 20 cm, acero soldado, galvanizado + pintura",
          shortDescription:
            "Panel intermedio con mayor calibre, indicado para condominios, empresas y áreas que exigen más robustez sin renunciar al diseño.",
          description:
            "La Reja G5 Insul aumenta la resistencia con alambre de mayor calibre, manteniendo el sistema modular de instalación rápida. Perfecta para condominios, empresas y espacios que piden más seguridad.",
          indicated: ["Condominios", "Industrias"],
        },
        {
          name: "Reja G12",
          paragraph: "Calibre 4,8 mm, malla 2,5 cm x 20 cm, acero soldado reforzado, alta resistencia",
          shortDescription:
            "Panel de alta resistencia con malla más cerrada, desarrollado para uso industrial y áreas que exigen lo máximo en seguridad y durabilidad.",
          description:
            "La Reja G12 Insul es la solución más robusta de la línea, con malla cerrada y estructura reforzada. Indicada para industrias, centros logísticos y perímetros que exigen alta seguridad.",
          indicated: ["Industrias", "Portones y perímetros"],
        },
      ],
    },
    pipes: {
      label: "Línea Residencial",
      title1: "Tubos",
      title2: "y accesorios",
      text: "Materia prima: alambre galvanizado Gerdau con capa de zinc en caliente de 70 g/m²",
      dragHint: "Arrastra para montar",
      imgAlt: "Poste con tapa, fijador, tornillo y tapón",
      cards: [
        { title: "Tapa", desc: "Acabado superior que protege el interior del poste." },
        { title: "Fijador", desc: "Sujeta el panel al poste con firmeza y practicidad." },
        { title: "Tornillo", desc: "Hexagonal con sellado para una fijación segura." },
        { title: "Tapón", desc: "Finaliza el conjunto ocultando el tornillo." },
      ],
      features: [
        ["Espesor de la chapa", "Tubos de hasta 2,08 m: 125 mm.", "Tubos desde 2,48 m: 145 mm."],
        ["Postes rectangulares", "metálicos 4x6 cm."],
        ["Accesorios con", "protección anti-UV."],
        ["Poste galvanizado en", "caliente con capa de", "zinc media de 275 g/m."],
        ["Fosfatizado", "microcristalino tricatiónico"],
        ["Pintura electrostática", "poliéster Thermo-plastic."],
      ],
    },
    coating: {
      label: "Línea Residencial",
      title: "Recubrimiento del alambre",
      subtitle:
        "Materia prima: alambre galvanizado Gerdau con capa de zinc en caliente de 70 g/m²",
      prev: "Capa anterior",
      next: "Capa siguiente",
      layers: ["Pintura electrostática", "Fosfato tricatiónico", "Galvanizado en caliente", "Acero Gerdau"],
    },
    guarantee: {
      title1: "Calidad comprobada",
      title2: "¡con 5 años de garantía!",
      note: "*en ambientes no costeros",
      side: "Pinturas Poliéster Premium de las mejores marcas, con garantía de brillo y resistencia por más tiempo.",
    },
    other: {
      title: "Otros productos",
      products: [
        { name: "Fênix", title: "Cerca lista" },
        { name: "Tela Mangueirão 16", title: "Malla Hexagonal" },
        { name: "Tela Morada", title: "Malla Soldada" },
      ],
    },
  },

  searchShowcase: {
    query: "¿Se puede cercar mi propiedad rápido?",
    suggestions: [
      "Conoce Insul. La empresa que fabrica mallas y cercas para el campo",
      "Insul entrega cercas prefabricadas para cualquier propiedad.",
    ],
    mostSearched: "Más buscado",
  },

  productCard: {
    likedFence: "¿Te gustó esta malla?",
    seeDetails: "Ver detalles",
    postSpacingLabel: "Espaciado entre postes",
    indicatedFor: "Recomendado para",
  },

  videoCardCarousel: {
    headingLead: "Mira algunos videos sobre la",
    unmuteAria: "Activar sonido",
    muteAria: "Silenciar",
  },

  similarProducts: {
    heading: "Productos similares",
  },

  animalChart: {
    capacityHeading: "capacidad de contención por animal",
    collidingWithFence: "chocando con la cerca",
    escapingFence: "intentando escapar por el cercado",
  },

  animalNames: {
    Bovino: "Bovino",
    Bovinos: "Bovinos",
    Caprino: "Caprino",
    Caprinos: "Caprinos",
    Ovinos: "Ovinos",
    "Suínos": "Porcinos",
    Javaporco: "Jabalí",
    Aves: "Aves",
    "Cães e silvestres": "Perros y silvestres",
    "Cães": "Perros",
    Capivara: "Carpincho",
    Avestruz: "Avestruz",
    Galinha: "Gallina",
    Ganso: "Ganso",
  },

  cercasProntasPage: {
    cardPostTitle: "Conoce más sobre las cercas prefabricadas",
    cardPostDescriptionLead: "Especificaciones y detalles: ",
    cardPostDescriptionRest:
      "sigue de cerca cómo se comporta cada cerca prefabricada Insul en el campo.",
  },

  cercasProntas: {
    fenix: {
      title: "Cerca Prefabricada (rural)",
      paragraph:
        "Alambre 2,50 mm, Acero galvanizado en caliente, Malla bifásica, Nudo en X (stiff stay)",
      shortDescription:
        "Malla de simple torsión en acero de alto carbono, con instalación hasta 6 veces más rápida y hasta un 50% menos de postes. Seguridad y durabilidad para cualquier propiedad.",
      paragraphs: [
        "La Malla Alambrada Fénix Insul es una solución de cercado en malla de simple torsión, fabricada con alambre de acero de alto carbono, que proporciona mayor resistencia mecánica, durabilidad y desempeño. Desarrollada para ofrecer seguridad y confiabilidad, es ideal para proyectos que exigen un cercado eficiente y de larga vida útil.",
        "Su sistema constructivo permite una instalación hasta 6 veces más rápida en comparación con los cercados convencionales, reduciendo el tiempo de ejecución de la obra y aumentando la productividad. Además, su estructura permite utilizar hasta un 50% menos de postes, generando ahorro de materiales sin comprometer la resistencia del cercado.",
        "La Malla Alambrada Fénix Insul está indicada para el cercado de viviendas, condominios, empresas, industrias, escuelas, canchas deportivas, chacras, fincas, áreas públicas y demás propiedades que necesiten una solución práctica, segura y de alto desempeño.",
        "Combinando tecnología, resistencia y una excelente relación costo-beneficio, la Malla Alambrada Fénix Insul ofrece amplia visibilidad, baja necesidad de mantenimiento y alta durabilidad, convirtiéndose en una elección inteligente para proyectos que buscan rapidez de instalación, ahorro y calidad en un único sistema de cercado.",
      ],
      animals: [
        "Bovinos",
        "Carpinchos",
        "Perros",
        "Caprinos",
        "Avestruces",
        "Ovinos",
        "Cerdos",
        "Jabalíes",
        "Gallinas",
        "Gansos",
      ],
      hotspot: {
        title: "Cerca Fênix Insul",
        description:
          "Alambre de alta resistencia con acabado galvanizado, ideal para grandes propiedades.",
      },
      features: [
        {
          title: "Alambre 2,50 mm",
          description:
            "Alambre de gran espesor, hecho para soportar tracción e impacto en cercados exigentes.",
        },
        {
          title: "Instalación",
          description:
            "Malla tensada entre los postes, lista para instalarse en cualquier relieve de terreno.",
        },
        {
          title: "Malla bifásica",
          description:
            "Aberturas más pequeñas en la base y más grandes en la parte superior, combinando contención eficiente y visibilidad.",
        },
        {
          title: "Nudo en X (stiff stay)",
          description:
            "Traba los alambres en X, manteniendo la tensión y la rigidez de la estructura por más tiempo.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Acero al Carbono",
          description:
            "El único alambrado de Brasil con alambres de 650 kgf de carga de ruptura.",
        },
        {
          category: "ESTRUCTURA",
          title: "Nudo en X",
          description:
            "Nudo forjado que no deja rebabas y garantiza seguridad contra impactos.",
        },
        {
          category: "TERRENO",
          title: "Cualquier Relieve",
          description:
            "Se adapta a subidas y bajadas sin dificultad en la instalación.",
        },
        {
          category: "AHORRO",
          title: "Instalación Rápida",
          description:
            "El mayor espaciado entre postes genera hasta un 50% de ahorro.",
        },
        {
          category: "PROTECCIÓN",
          title: "Malla Bimodal",
          description:
            "Cerrada en la parte inferior para contención, abierta en la parte superior para ahorro.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada en una propiedad rural" },
        { alt: "Detalle del alambre y la malla" },
        { alt: "Rollo de la malla" },
        { alt: "Cerca en terreno con desnivel" },
        { alt: "Acabado galvanizado en caliente" },
        { alt: "Nudo en X de la cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
    "campeira-maxx": {
      title: "Cerca Prefabricada (rural)",
      paragraph:
        "Alambre 2,50 mm, Acero galvanizado en caliente, Malla bifásica, Nudo en X (stiff stay)",
      shortDescription:
        "Nudo en X exclusivo de Insul, hecho para contener bovinos y equinos y proteger los cultivos contra animales grandes. Ruptura de hasta 700 kgf y 5 años de garantía.",
      paragraphs: [
        "La cerca prefabricada Campeira Maxx Insul es la elección definitiva para quienes buscan el máximo en resistencia, durabilidad y practicidad. Este producto exclusivo de Insul se destaca por ser el único del mercado con el revolucionario nudo en X (stiff stay), una innovación que garantiza una estructura más robusta y segura, ideal para enfrentar las condiciones más exigentes del campo. La Campeira Maxx Insul es la indicación ideal para la contención de animales de gran y mediano porte, como bovinos y equinos, además de ser una barrera extremadamente eficaz contra invasores. Protege cultivos y propiedades rurales de ataques de jabalíes, jabalíes-cerdo, carpinchos y otros animales grandes que pueden causar daños significativos. Además, la Campeira Maxx se adapta perfectamente al relieve del terreno, garantizando una instalación eficiente y una protección continua, independientemente de las variaciones topográficas.",
        "Con su robustez y durabilidad, la Campeira Maxx ofrece la seguridad necesaria para mantener a sus animales contenidos y su tierra protegida. Los alambres que componen la Campeira Maxx tienen 2,50 mm de espesor, están galvanizados en caliente y se producen con la reconocida calidad Gerdau, brindando una resistencia superior a la corrosión y una carga de ruptura de hasta 700 kgf. Esto se traduce en una cerca que mantiene su integridad y funcionalidad durante muchos años, incluso en las condiciones más adversas. Además, el diseño con nudo en X garantiza mayor firmeza y estabilidad, asegurando que la cerca permanezca intacta incluso bajo presiones externas.",
        "La Campeira Maxx también se destaca por su practicidad de instalación. La cerca viene lista para usar, lo que facilita el proceso de instalación y ahorra tiempo y mano de obra. Esta practicidad, combinada con la alta durabilidad del producto, resulta en una solución de cercado que exige menor mantenimiento a lo largo del tiempo, generando ahorro a largo plazo. Otro gran diferencial de la Campeira Maxx es la garantía de 5 años que ofrece Insul, reflejando la confianza en la calidad y durabilidad del producto. Además, la armonía estética de la cerca es un punto importante, pues, además de funcional, se integra perfectamente al entorno, otorgando una apariencia organizada y profesional a la propiedad.",
        "Para minoristas y revendedores, la cerca prefabricada Campeira Maxx Insul representa una oportunidad única de agregar valor a su mix de productos. Su exclusividad y sus diferenciales de calidad aumentan el potencial de ventas y fortalecen la reputación de la tienda como proveedora de productos de alta calidad, además de ofrecer una alternativa más moderna, práctica y resistente a la cerca de confección manual de alambre ovalado. La alta demanda de cercas resistentes y duraderas, sumada a la exclusividad de la tecnología de nudo en X y toda la calidad ofrecida por la cerca prefabricada Campeira Maxx Insul, garantiza un alto potencial de ventas y fidelización de clientes. Con un producto tan completo, la satisfacción del cliente está garantizada, reduciendo reclamos y aumentando la fidelización y las ganancias. Elija la cerca prefabricada Campeira Maxx Insul y descubra cómo una cerca puede marcar la diferencia en su propiedad, uniendo innovación, calidad y practicidad en un solo producto.",
      ],
      animals: ["Bovinos", "Carpinchos", "Perros", "Avestruces", "Ovinos", "Cerdos", "Jabalíes"],
      hotspot: {
        title: "Cerca Campeira Maxx Insul",
        description:
          "Reforzada para pasturas de mayor porte, con mayor espaciado entre alambres.",
      },
      features: [
        {
          title: "Instalación",
          description:
            "Malla tensada entre los postes, lista para instalarse en cualquier relieve de terreno.",
          captions: [
            {
              label: "Instalación",
              value:
                "Malla lista y tensada entre los postes — sale de fábrica lista para instalar, sin necesidad de armar alambre por alambre.",
            },
            {
              label: "Longitud",
              value:
                "De 5x5 hasta 8x8 metros entre postes, ahorrando hasta un 50% en material.",
            },
            {
              label: "Nudo en X",
              value:
                "El alambre de acero y el nudo en X (stiff stay) se traban entre sí, manteniendo la tensión y la rigidez de la cerca por mucho más tiempo.",
            },
          ],
        },
        {
          title: "Malla superior | inferior",
          description:
            "Malla de 22 cm x 20 cm con acabado en acero galvanizado en caliente.",
          captions: [
            {
              label: "Malla",
              value: "",
              options: [
                {
                  label: "Malla superior",
                  value:
                    "22 cm x 20 cm — más abierta para reducir el costo de material y mantener un aspecto limpio, sin renunciar a la resistencia.",
                },
                {
                  label: "Malla inferior",
                  value:
                    "22 cm x 10 cm — más cerrada para reforzar la contención de animales y bloquear invasores más pequeños.",
                },
              ],
            },
            {
              label: "Malla superior",
              value:
                "22 cm x 20 cm — más abierta para reducir el costo de material y mantener un aspecto limpio, sin renunciar a la resistencia.",
            },
            {
              label: "Malla inferior",
              value:
                "22 cm x 10 cm — más cerrada para reforzar la contención de animales y bloquear invasores más pequeños.",
            },
          ],
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Alambre 2,50 mm",
          description:
            "Alambre de gran espesor, hecho para soportar tracción e impacto en cercados exigentes.",
        },
        {
          category: "ACABADO",
          title: "Acero Galvanizado en Caliente",
          description:
            "Protección contra la corrosión y mayor durabilidad en cualquier ambiente.",
        },
        {
          category: "ESTRUCTURA",
          title: "Malla Bifásica",
          description:
            "Aberturas más pequeñas en la base y más grandes en la parte superior, combinando contención eficiente y visibilidad.",
        },
        {
          category: "ESTRUCTURA",
          title: "Nudo en X (stiff stay)",
          description:
            "Traba los alambres en X, manteniendo la tensión y la rigidez de la estructura por más tiempo.",
        },
        {
          category: "PROTECCIÓN",
          title: "Malla Bimodal",
          description:
            "Cerrada en la parte inferior para contención, abierta en la parte superior para ahorro.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada en una propiedad rural" },
        { alt: "Detalle del alambre y la malla" },
        { alt: "Rollo de la malla" },
        { alt: "Cerca en terreno con desnivel" },
        { alt: "Acabado galvanizado en caliente" },
        { alt: "Nudo en X de la cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
    campeira: {
      title: "Cerca Prefabricada (rural)",
      paragraph:
        "Alambre 2,30 mm, Acero galvanizado en caliente, Malla bifásica, Nudo tradicional",
      shortDescription:
        "Modelo tradicional y consagrado de Insul, ideal para la contención de ovinos, caprinos y cerdos. Alambre galvanizado en caliente con 5 años de garantía.",
      paragraphs: [
        "La cerca prefabricada Campeira Insul es sinónimo de tradición y excelencia en el mercado de cercas prefabricadas, siendo ampliamente reconocida entre los consumidores por su eficiencia y confiabilidad. Desarrollada para la contención de animales de mediano porte, como ovinos, caprinos y cerdos, la Campeira Insul se destaca no solo por su popularidad, sino también por los diferenciales de calidad que marcan la diferencia. La calidad Insul es lo que coloca a la Campeira por delante de los demás productos del mercado.",
        "Cada cerca se fabrica con estrictos estándares de calidad, utilizando alambres Gerdau de alta calidad, que reciben galvanizado en caliente para garantizar una resistencia superior a la corrosión. Este proceso asegura mayor resistencia y alta durabilidad, proporcionando una cerca que mantiene su integridad y funcionalidad durante muchos años, incluso en las condiciones más adversas.",
        "Además de su resistencia, la Campeira Insul se destaca por su practicidad de instalación. Ya viene lista para usar, lo que facilita el trabajo en el campo y reduce significativamente el tiempo de instalación. Esta practicidad, sumada a un menor costo de mantenimiento, convierte a la Campeira Insul en una elección económica y eficiente para propietarios rurales que buscan optimizar sus inversiones sin renunciar a la calidad. Insul ofrece una garantía de 5 años para la Campeira, reflejando la confianza en la durabilidad y el desempeño superior del producto.",
        "Otro diferencial importante es la adaptación al relieve del terreno, que permite que la cerca se integre de forma continua y eficaz, independientemente de las variaciones topográficas. Esta característica garantiza una contención segura y estable, adaptada a las necesidades específicas de cada propiedad. La armonía estética es otro punto destacado de la Campeira Insul. Además de funcional, la cerca le da una apariencia organizada y profesional a la propiedad, valorizando el entorno rural y demostrando cuidado y atención al detalle.",
        "Para comerciantes y revendedores, incluir la cerca prefabricada Campeira Insul en su mix de productos es una decisión estratégica que agrega valor al portafolio. Al ofrecer un producto de alta calidad, reconocido y confiable para los consumidores, usted atrae a un público exigente y fideliza a clientes que buscan soluciones duraderas y eficientes. Con la creciente demanda de cercas prefabricadas, la Campeira Insul garantiza un alto potencial de ventas y contribuye a fortalecer la reputación de su establecimiento.",
      ],
      animals: ["Bovinos", "Perros", "Caprinos", "Cerdos", "Ovinos"],
      hotspot: {
        title: "Cerca Campeira Insul",
        description:
          "Modelo tradicional para linderos rurales, resistente y de fácil instalación.",
      },
      features: [
        {
          title: "Alambre 2,50 mm",
          description:
            "Alambre de gran espesor, hecho para soportar tracción e impacto en cercados exigentes.",
        },
        {
          title: "Instalación",
          description:
            "Malla tensada entre los postes, lista para instalarse en cualquier relieve de terreno.",
        },
        {
          title: "Malla bifásica",
          description:
            "Aberturas más pequeñas en la base y más grandes en la parte superior, combinando contención eficiente y visibilidad.",
        },
        {
          title: "Nudo en X (stiff stay)",
          description:
            "Traba los alambres en X, manteniendo la tensión y la rigidez de la estructura por más tiempo.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Acero al Carbono",
          description:
            "El único alambrado de Brasil con alambres de 650 kgf de carga de ruptura.",
        },
        {
          category: "ESTRUCTURA",
          title: "Nudo en X",
          description:
            "Nudo forjado que no deja rebabas y garantiza seguridad contra impactos.",
        },
        {
          category: "TERRENO",
          title: "Cualquier Relieve",
          description:
            "Se adapta a subidas y bajadas sin dificultad en la instalación.",
        },
        {
          category: "AHORRO",
          title: "Instalación Rápida",
          description:
            "El mayor espaciado entre postes genera hasta un 50% de ahorro.",
        },
        {
          category: "PROTECCIÓN",
          title: "Malla Bimodal",
          description:
            "Cerrada en la parte inferior para contención, abierta en la parte superior para ahorro.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada en una propiedad rural" },
        { alt: "Detalle del alambre y la malla" },
        { alt: "Rollo de la malla" },
        { alt: "Cerca en terreno con desnivel" },
        { alt: "Acabado galvanizado en caliente" },
        { alt: "Nudo en X de la cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
    "campeira-boi": {
      title: "Cerca Prefabricada (rural)",
      paragraph:
        "Alambre 2,50 mm, Acero galvanizado en caliente, Malla 30 cm x 20 cm, Nudo en X (stiff stay)",
      shortDescription:
        "Nudo en X exclusivo y malla de 30x20 cm para la contención de bovinos y animales de gran porte, con ruptura de hasta 700 kgf incluso en terrenos irregulares.",
      paragraphs: [
        "La cerca prefabricada Campeira Boi Insul es la solución ideal para quienes necesitan seguridad y durabilidad en la contención de animales de mediano y gran porte. Este producto exclusivo de Insul es el único del mercado con el innovador nudo en X (stiff stay), una tecnología que proporciona mayor resistencia y estabilidad, asegurando que la cerca permanezca firme y funcional incluso bajo presión intensa. Desarrollada para enfrentar las condiciones más desafiantes, la Campeira Boi Insul se destaca por su carga de ruptura de 700 kgf, lo que la hace altamente eficaz para contener bovinos, equinos y otros animales de gran porte.",
        "Su construcción robusta y sus materiales de alta calidad garantizan una cerca que no solo cumple su función de contención, sino que también resiste el desgaste del tiempo. La durabilidad es uno de los pilares de la Campeira Boi Insul. Fabricada por Insul con alambres Gerdau de alta calidad, que reciben galvanizado en caliente, esta cerca ofrece resistencia superior a la corrosión y longevidad, resultando en un producto que mantiene su integridad durante años, incluso en ambientes adversos. Además, la cerca está diseñada para adaptarse al relieve del terreno, garantizando una instalación eficiente y una protección continua, independientemente de las variaciones topográficas.",
        "La practicidad de instalación es otro punto fuerte de la Campeira Boi Insul. La cerca viene lista para usar, lo que reduce significativamente el tiempo y el esfuerzo necesarios para el montaje. Esto, combinado con su menor costo de mantenimiento, convierte a la Campeira Boi en una elección económica y eficiente para propietarios rurales que buscan optimizar sus inversiones.",
        "Para minoristas y revendedores, incluir la cerca prefabricada Campeira Boi Insul en el mix de productos representa una excelente oportunidad de negocio. Este producto exclusivo y de alta calidad atrae a un público calificado, compuesto por propietarios rurales que buscan soluciones robustas y duraderas. Al ofrecer la Campeira Boi en su tienda, no solo brinda un producto diferenciado que atiende las necesidades del mercado, sino que también ofrece una alternativa más moderna, práctica y resistente a la cerca de confección manual de alambre ovalado, además de fortalecer la reputación de su establecimiento como proveedor de artículos de primera línea. La alta demanda de cercas resistentes y duraderas, sumada a la exclusividad de la tecnología de nudo en X y toda la calidad ofrecida por la cerca prefabricada Campeira Boi Insul, garantiza un alto potencial de ventas y fidelización de clientes.",
        "Insul ofrece una garantía de 5 años para la Campeira Boi, reflejando nuestra confianza en la calidad y la durabilidad de este producto. Además de su funcionalidad superior, la cerca también se integra de manera armoniosa al entorno, proporcionando una estética organizada y profesional para su propiedad. La cerca prefabricada Campeira Boi Insul es, por lo tanto, la elección ideal para quienes necesitan una solución de cercado confiable, resistente y duradera, que ofrezca seguridad tanto para los animales como para la propiedad. Con la combinación única de innovación, calidad y practicidad, la Campeira Boi Insul es una inversión segura y eficaz para su negocio.",
      ],
      animals: ["Bovinos"],
      hotspot: {
        title: "Cerca Campeira Boi Insul",
        description:
          "Desarrollada para rebaños bovinos, con alambres espaciados para máxima contención.",
      },
      features: [
        {
          title: "Alambre 2,50 mm",
          description:
            "Alambre de gran espesor, hecho para soportar tracción e impacto en cercados exigentes.",
        },
        {
          title: "Instalación",
          description:
            "Malla tensada entre los postes, lista para instalarse en cualquier relieve de terreno.",
        },
        {
          title: "Malla bifásica",
          description:
            "Aberturas más pequeñas en la base y más grandes en la parte superior, combinando contención eficiente y visibilidad.",
        },
        {
          title: "Nudo en X (stiff stay)",
          description:
            "Traba los alambres en X, manteniendo la tensión y la rigidez de la estructura por más tiempo.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Acero al Carbono",
          description:
            "El único alambrado de Brasil con alambres de 650 kgf de carga de ruptura.",
        },
        {
          category: "ESTRUCTURA",
          title: "Nudo en X",
          description:
            "Nudo forjado que no deja rebabas y garantiza seguridad contra impactos.",
        },
        {
          category: "TERRENO",
          title: "Cualquier Relieve",
          description:
            "Se adapta a subidas y bajadas sin dificultad en la instalación.",
        },
        {
          category: "AHORRO",
          title: "Instalación Rápida",
          description:
            "El mayor espaciado entre postes genera hasta un 50% de ahorro.",
        },
        {
          category: "PROTECCIÓN",
          title: "Malla Bimodal",
          description:
            "Cerrada en la parte inferior para contención, abierta en la parte superior para ahorro.",
        },
      ],
      gallery: [
        { alt: "Cerca instalada en una propiedad rural" },
        { alt: "Detalle del alambre y la malla" },
        { alt: "Rollo de la malla" },
        { alt: "Cerca en terreno con desnivel" },
        { alt: "Acabado galvanizado en caliente" },
        { alt: "Nudo en X de la cerca" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
        { alt: "Cerca Insul" },
      ],
    },
  } as Record<string, CercaProntaTranslation>,
};

export default es;
