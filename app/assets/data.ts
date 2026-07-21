export interface ProductCardData {
  src: string;
  title: string;
  name: string;
  paragraph: string;
  description: string;
  to?: string;
}

export interface CercaHotspot {
  x: number;
  y: number;
  title: string;
  description: string;
}

export interface CercaSlide {
  src: string;
  label: string;
  hotspot: CercaHotspot;
}

export interface RoomDetail {
  src: string;
  name: string;
  to?: string;
}

export interface ProductCategory {
  title: string;
  items: string[];
}

export interface Specification {
  title: string;
  summary: string;
  description: string;
}

export interface FenixImage {
  name: string;
  src: string;
}
export interface DescriptionText {
  paragraphs: string[];
}

export interface VideoCardSlide {
  src: string;
  category: string;
  title: string;
  description: string;
}

const poductsCardsPages: ProductCardData[] = [
  {
    src: "https://images.unsplash.com/photo-1571898223382-0aa3499f0f2a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Fenix Insul",
    paragraph:
      "Fio 2,50 mm, Aço galvanizado a fogo, Malha bifásica, Nó em X (stiff stay)",
    description:
      "A Tela Fenix Insul oferece resistência, durabilidade e excelente acabamento para cercamentos rurais. Ideal para proteger propriedades com segurança e praticidade.",
    to: "/cerca-fenix",
  },
  {
    src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Campeira Maxx Insul",
    paragraph:
      "Fio 2,50 mm, Aço galvanizado a fogo, Malha bifásica, Nó em X (stiff stay)",
    description:
      "A Campeira Maxx Insul foi desenvolvida para oferecer máxima resistência e longa vida útil, sendo ideal para cercas que exigem alta durabilidade e desempenho no campo.",
  },
  {
    src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Campeira Insul",
    paragraph:
      "Fio 2,30 mm, Aço galvanizado a fogo, Malha bifásica, Nó tradicional",
    description:
      "A Tela Campeira Insul é uma solução prática e confiável para cercamentos rurais. Proporciona segurança, fácil instalação e excelente custo-benefício para diversas aplicações.",
  },
  {
    src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Campeira Boi Insul",
    paragraph:
      "Fio 2,50 mm, Aço galvanizado a fogo, Malha 30 cm x 20 cm, Nó em X (stiff stay)",
    description:
      "Projetada para o manejo bovino, a Campeira Boi Insul garante resistência e firmeza, oferecendo um cercamento seguro para contenção e proteção do rebanho.",
  },
];

// TODO: trocar pelas fotos reais de cada modelo e ajustar as descrições dos hotspots
const cercasProntasCarousel: CercaSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1571898223382-0aa3499f0f2a?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
    label: "Cerca Fenix Insul",
    hotspot: {
      x: 50,
      y: 55,
      title: "Cerca Fênix Insul",
      description:
        "Fio de alta resistência com acabamento galvanizado, ideal para grandes propriedades.",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
    label: "Cerca Campeira Maxx Insul",
    hotspot: {
      x: 45,
      y: 50,
      title: "Cerca Campeira Maxx Insul",
      description:
        "Reforçada para pastagens de maior porte, com maior espaçamento entre fios.",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
    label: "Cerca Campeira Insul",
    hotspot: {
      x: 55,
      y: 60,
      title: "Cerca Campeira Insul",
      description:
        "Modelo tradicional para divisas rurais, resistente e de fácil instalação.",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
    label: "Cerca Campeira Boi Insul",
    hotspot: {
      x: 48,
      y: 58,
      title: "Cerca Campeira Boi Insul",
      description:
        "Desenvolvida para rebanhos bovinos, com fios espaçados para máxima contenção.",
    },
  },
];

const roomDetails: RoomDetail[] = [
  {
    src: "https://i.postimg.cc/mkF4GvBv/DSC-4281.jpg",
    name: "Cercas Prontas",
    to: "/cercas-prontas",
  },
  {
    src: "https://i.postimg.cc/zfBXcPHq/gradil.jpg",
    name: "Gradil",
  },
  {
    src: "https://i.postimg.cc/Dz9kPCrV/soldada.jpgD",
    name: "Telas e Alambrados",
  },
  {
    src: "https://i.postimg.cc/6pPDBH1B/catracas.jpgD",
    name: "Acessórios",
  },
  {
    src: "https://i.postimg.cc/MZt3WPnx/arame.jpg",
    name: "Arames",
  },
];

const heroImage = "/images/telas_img.png";

const productCategories: ProductCategory[] = [
  {
    title: "Soldada",
    items: [
      "Tela Morada",
      "Tela Morada Leve",
      "Tela Morada Open",
      "Tela Brava",
      "Tela Multi Uso",
      "Tela Titan",
      "Tela Fachanet",
    ],
  },
  {
    title: "Hexagonal",
    items: [
      "Tela Mangueirão 16",
      "Tela Mangueirão 18",
      "Tela Galinheiro 18",
      "Tela Viveiro 24",
      "Tela Pinteiro 22",
    ],
  },
  {
    title: "Torção Simples",
    items: ["Simples Torção", "Simples Torção PVC"],
  },
  {
    title: "Cercas Prontas",
    items: [
      "Cerca Fenix",
      "Cerca Campeira Maxx",
      "Cerca Campeira Boi",
      "Cerca Campeira",
    ],
  },
  {
    title: "Gradil",
    items: ["Gradil G4", "Gradil G5", "Gradil G12"],
  },
  {
    title: "Acessórios",
    items: [
      "Catraca T7",
      "Catraca Micro",
      "Catraca Caixa",
      "Poste T",
      "Batedor de poste T",
      "Tubo para Gradil",
      "Fixador para Gradil",
      "Tampa para Gradil",
      "Parabolt para fixador",
    ],
  },
  {
    title: "Arames",
    items: [
      "Arame 10",
      "Arame 12",
      "Arame 14",
      "Arame 16",
      "Arame 18",
      "Arame 12 + PVC",
      "Arame 14 + PVC",
      "Arame 16 + PVC",
      "Arame Cerca Elétrica",
    ],
  },
];

const specifications: Specification[] = [
  {
    title: "Aço alto carbono",
    summary: "Resistência de ruptura inigualável no mercado.",
    description:
      "Única alambrado no Brasil a possuir arames de 650kgf de carga de ruptura.",
  },
  {
    title: "Nó em X(Stiff Stay): A força da união",
    summary: "Nó forjado que blinda a cerca contra impactos.",
    description:
      "Tecnologia exclusiva de nó forjado que não deixa rebardas e confere segurança mecânica contra impactos como nenhuma outra.",
  },
  {
    title: "Adaptação a qualquer terreno",
    summary: "Acompanha aclives e declives sem dificuldade.",
    description:
      "A Fenix acompanha perfeitamente o terreno em aclives e declives sem dificuldades na instalação.",
  },
  {
    title: "Maior economia e instalação ultrarápida",
    summary: "Até 50% de economia com instalação mais rápida.",
    description:
      "Seus arames de aço permitem espaçamento maior entre mourões de 5-5 até 8-8m, gerando até 50% de economia frente a outras telas.",
  },
  {
    title: "Malha bimodal: inteligente e segura",
    summary: "Fechada embaixo, aberta em cima: proteção com economia.",
    description:
      "Proteção estratégica: malha fechada nos primeiros 60cm para contenção de animais e invasores. Restante a trama se abre para reduzir custos e manter o visual harmônico.",
  },
  {
    title: "Tecnologia neozelandesa, força brasileira",
    summary: "Exclusividade da Insul na América do Sul.",
    description:
      "Exclusividade da Insul na América do Sul, a Fenix traz tecnologia de ponta para cercamentos urbanos e Rurais. Imbatível na comparação contra qualquer outro modelo de alambrado.",
  },
];

const imgFenix: FenixImage[] = [
  {
    name: "image-1",
    src: "#",
  },
  {
    name: "image-2",
    src: "#",
  },
  {
    name: "image-3",
    src: "#",
  },
  {
    name: "image-4",
    src: "#",
  },
];

const textDescription: DescriptionText[] = [
  {
    paragraphs: [
      "A Tela Alambrada Fênix Insul é uma solução de cercamento em tela de simples torção, fabricada com arame de aço de alto carbono, que proporciona maior resistência mecânica, durabilidade e desempenho. Desenvolvida para oferecer segurança e confiabilidade, é ideal para projetos que exigem um cercamento eficiente e de longa vida útil.",
      "Seu sistema construtivo permite uma instalação até 6 vezes mais rápida em comparação aos cercamentos convencionais, reduzindo o tempo de execução da obra e aumentando a produtividade. Além disso, sua estrutura possibilita a utilização de até 50% menos mourões, proporcionando economia de materiais sem comprometer a resistência do cercamento.",
      "A Tela Alambrada Fênix Insul é indicada para o cercamento de residências, condomínios, empresas, indústrias, escolas, quadras esportivas, chácaras, sítios, áreas públicas e demais propriedades que necessitem de uma solução prática, segura e de alto desempenho.",
      "Aliando tecnologia, resistência e excelente custo-benefício, a Tela Alambrada Fênix Insul oferece ampla visibilidade, baixa necessidade de manutenção e alta durabilidade, tornando-se uma escolha inteligente para projetos que buscam rapidez na instalação, economia e qualidade em um único sistema de cercamento.",
    ],
  },
];

const fenixVideoCards: VideoCardSlide[] = [
  {
    src: "/videos/video-1-fenix.mp4",
    category: "MATERIAL",
    title: "Aço Carbono",
    description:
      "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
  },
  {
    src: "/videos/video-2-fenix.mp4",
    category: "ESTRUTURA",
    title: "Nó em X",
    description:
      "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
  },
  {
    src: "/videos/video-3-fenix.mp4",
    category: "TERRENO",
    title: "Qualquer Relevo",
    description:
      "Acompanha aclives e declives sem dificuldade na instalação.",
  },
  {
    src: "/videos/video-4-fenix.mp4",
    category: "ECONOMIA",
    title: "Instalação Rápida",
    description:
      "Espaçamento maior entre mourões gera até 50% de economia.",
  },
  {
    src: "/videos/video-5-fenix.mp4",
    category: "PROTEÇÃO",
    title: "Malha Bimodal",
    description:
      "Fechada embaixo para contenção, aberta em cima para economia.",
  },
];

export {
  poductsCardsPages,
  cercasProntasCarousel,
  roomDetails,
  heroImage,
  productCategories,
  specifications,
  imgFenix,
  textDescription,
  fenixVideoCards,
};
