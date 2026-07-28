import ProductCard from "../components/ProductCard";

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
export interface VideoExampleMaxx {
  src: string;
  name: string;
}

export interface CercaFeature {
  title: string;
  description: string;
  start: number;
  end: number;
  // Pontos de pausa (em segundos) dentro do trecho start-end. Quando presente,
  // o vídeo para em cada checkpoint e espera o usuário clicar no botão "+"
  // para continuar até o próximo, em vez de tocar start-end de uma vez.
  checkpoints?: number[];
  // Texto exibido sobre o vídeo durante cada trecho de checkpoints[i] (mesmo
  // índice); captions[0] cobre start->checkpoints[0], captions[1] cobre
  // checkpoints[0]->checkpoints[1], e assim por diante.
  captions?: string[];
  // Texto exibido durante o trecho inteiro start-end, para features sem checkpoints.
  caption?: string;
}

export interface CercaProntaInfo {
  slug: string;
  name: string;
  color: string;
  paragraphs: string[];
  features: CercaFeature[];
  videoSrc: string;
  videoCards: VideoCardData[];
  video3D: string;
  gallery: GalleryImage[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface VideoCardData {
  src: string;
  category: string;
  title: string;
  description: string;
}

export interface ShowcaseReel {
  src: string;
  name: string;
}

const poductsCardsPages: ProductCardData[] = [
  {
    src: "https://images.unsplash.com/photo-1571898223382-0aa3499f0f2a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Fenix Insul",
    paragraph:
      "Fio 2,50 mm, Aço galvanizado a fogo, Malha bifásica, Nó em X (stiff stay)",
    description:
      "A Tela Alambrada Fênix Insul é uma solução de cercamento em tela de simples torção, fabricada com arame de aço de alto carbono, que proporciona maior resistência mecânica, durabilidade e desempenho. Desenvolvida para oferecer segurança e confiabilidade, é ideal para projetos que exigem um cercamento eficiente e de longa vida útil.\n\nSeu sistema construtivo permite uma instalação até 6 vezes mais rápida em comparação aos cercamentos convencionais, reduzindo o tempo de execução da obra e aumentando a produtividade. Além disso, sua estrutura possibilita a utilização de até 50% menos mourões, proporcionando economia de materiais sem comprometer a resistência do cercamento.\n\nA Tela Alambrada Fênix Insul é indicada para o cercamento de residências, condomínios, empresas, indústrias, escolas, quadras esportivas, chácaras, sítios, áreas públicas e demais propriedades que necessitem de uma solução prática, segura e de alto desempenho.\n\nAliando tecnologia, resistência e excelente custo-benefício, a Tela Alambrada Fênix Insul oferece ampla visibilidade, baixa necessidade de manutenção e alta durabilidade, tornando-se uma escolha inteligente para projetos que buscam rapidez na instalação, economia e qualidade em um único sistema de cercamento.",
    to: "/cercas-prontas/fenix",
  },
  {
    src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Campeira Maxx Insul",
    paragraph:
      "Fio 2,50 mm, Aço galvanizado a fogo, Malha bifásica, Nó em X (stiff stay)",
    description:
      "A cerca pronta Campeira Maxx Insul é a escolha definitiva para quem busca o máximo em resistência, durabilidade e praticidade. Este produto exclusivo da Insul se destaca por ser o único no mercado com o revolucionário nó em X (stiff stay), uma inovação que garante uma estrutura mais robusta e segura, ideal para enfrentar as condições mais exigentes no campo. A Campeira Maxx Insul é a indicação ideal para a contenção de animais de grande e médio porte, como bovinos e equinos, além de ser uma barreira extremamente eficaz contra invasores. Ela protege lavouras e propriedades rurais de ataques de javalis, javaporcos, capivaras e outros grandes animais que podem causar danos significativos. Além disso, a Campeira Maxx se adequa perfeitamente ao relevo do terreno, garantindo uma instalação eficiente e uma proteção contínua, independentemente das variações de topografia.\n\nCom sua robustez e durabilidade, a Campeira Maxx oferece a segurança necessária para manter seus animais contidos e sua terra protegida. Os arames que compõem a Campeira Maxx são de 2,50 mm de espessura, galvanizados a fogo e produzidos com a renomada qualidade Gerdau, proporcionando uma resistência superior à corrosão e uma carga de ruptura de até 700 kgf. Isso se traduz em uma cerca que mantém sua integridade e funcionalidade por muitos anos, mesmo nas condições mais adversas. Além disso, o design com nó em X assegura maior firmeza e estabilidade, garantindo que a cerca permaneça intacta mesmo sob pressões externas.\n\nA Campeira Maxx também se destaca pela sua praticidade na instalação. A cerca vem pronta para uso, o que facilita o processo de instalação e economiza tempo e mão de obra. Esta praticidade, combinada com a alta durabilidade do produto, resulta em uma solução de cercamento que exige menor manutenção ao longo do tempo, proporcionando economia a longo prazo. Outro grande diferencial da Campeira Maxx é a garantia de 5 anos que a Insul oferece, refletindo a confiança na qualidade e na durabilidade do produto. Além disso, a harmonia estética da cerca é um ponto importante, pois, além de funcional, ela se integra perfeitamente ao ambiente, conferindo uma aparência organizada e profissional à propriedade.\n\nPara varejistas e revendedores, a cerca pronta Campeira Maxx Insul representa uma oportunidade única de agregar valor ao seu mix de produtos. Sua exclusividade e diferenciais de qualidade aumentam o potencial de vendas e fortalecem a reputação da loja como fornecedora de produtos de alta qualidade e também de oferecer uma alternativa mais moderna, prática e resistente à cerca de confecção manual de arame ovalado. A alta demanda por cercas resistentes e duradouras, aliada à exclusividade da tecnologia de nó em X e toda qualidade oferecida pela cerca pronta Campeira Maxx Insul, garante um alto potencial de vendas e fidelização de clientes. Com um produto tão completo, a satisfação do cliente é garantida, reduzindo reclamações, aumentando a fidelização e seus lucros. Escolha a cerca pronta Campeira Maxx Insul e descubra como uma cerca pode fazer a diferença em sua propriedade, unindo inovação, qualidade e praticidade em um só produto.",
    to: "/cercas-prontas/campeira-maxx",
  },
  {
    src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Campeira Insul",
    paragraph:
      "Fio 2,30 mm, Aço galvanizado a fogo, Malha bifásica, Nó tradicional",
    description:
      "A cerca pronta Campeira Insul é sinônimo de tradição e excelência no mercado de cercas prontas, sendo amplamente reconhecida entre consumidores pela sua eficiência e confiabilidade. Desenvolvida para a contenção de animais de médio porte, como ovinos, caprinos e suínos, a Campeira Insul se destaca não apenas por sua popularidade, mas também pelos diferenciais de qualidade que fazem toda a diferença. A qualidade Insul é o que coloca a Campeira à frente dos demais produtos do mercado.\n\nCada cerca é fabricada com rigorosos padrões de qualidade, utilizando arames Gerdau de alta qualidade, que recebem galvanização a fogo para garantir resistência superior à corrosão. Esse processo assegura uma maior resistência e alta durabilidade, proporcionando uma cerca que mantém sua integridade e funcionalidade por muitos anos, mesmo nas condições mais adversas.\n\nAlém de sua resistência, a Campeira Insul se destaca pela praticidade na instalação. Ela já vem pronta para uso, o que facilita o trabalho no campo e reduz significativamente o tempo de instalação. Essa praticidade, aliada a um menor custo de manutenção, torna a Campeira Insul uma escolha econômica e eficiente para proprietários rurais que buscam otimizar seus investimentos sem abrir mão da qualidade. A Insul oferece uma garantia de 5 anos para a Campeira, refletindo a confiança na durabilidade e no desempenho superior do produto.\n\nOutro diferencial importante é a adaptação ao relevo do terreno, permitindo que a cerca se integre de forma contínua e eficaz, independentemente das variações topográficas. Essa característica garante uma contenção segura e estável, adaptada às necessidades específicas de cada propriedade. A harmonia estética é outro ponto de destaque da Campeira Insul. Além de funcional, a cerca confere uma aparência organizada e profissional à propriedade, valorizando o ambiente rural e demonstrando cuidado e atenção aos detalhes.\n\nPara lojistas e revendedores, incluir a cerca pronta Campeira Insul em seu mix de produtos é uma decisão estratégica que agrega valor ao portfólio. Ao oferecer um produto de alta qualidade, que é reconhecido e confiado pelos consumidores, você atrai um público exigente e fideliza clientes que buscam soluções duradouras e eficientes. Com a crescente demanda por cercas prontas, a Campeira Insul garante um alto potencial de vendas e contribui para o fortalecimento da reputação do seu estabelecimento.",
    to: "/cercas-prontas/campeira",
  },
  {
    src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cerca Pronta",
    name: "Cerca Campeira Boi Insul",
    paragraph:
      "Fio 2,50 mm, Aço galvanizado a fogo, Malha 30 cm x 20 cm, Nó em X (stiff stay)",
    description:
      "A cerca pronta Campeira Boi Insul é a solução ideal para quem precisa de segurança e durabilidade na contenção de animais de médio e grande porte. Este produto exclusivo da Insul é o único no mercado com o inovador nó em X (stiff stay), uma tecnologia que proporciona maior resistência e estabilidade, assegurando que a cerca permaneça firme e funcional mesmo sob pressão intensa. Desenvolvida para enfrentar as condições mais desafiadoras, a Campeira Boi Insul se destaca por sua carga de ruptura de 700kgf, o que a torna altamente eficaz para conter bovinos, equinos e outros animais de grande porte.\n\nSua construção robusta e materiais de alta qualidade garantem uma cerca que não apenas cumpre seu papel de contenção, mas que também resiste ao desgaste do tempo. A durabilidade é um dos pilares da Campeira Boi Insul. Fabricada pela Insul com arames Gerdau de alta qualidade, que recebem galvanização a fogo, essa cerca oferece resistência superior à corrosão e longevidade, resultando em um produto que mantém sua integridade por anos, mesmo em ambientes adversos. Além disso, a cerca é projetada para se adequar ao relevo do terreno, garantindo uma instalação eficiente e proteção contínua, independentemente das variações topográficas.\n\nA praticidade na instalação é outro ponto forte da Campeira Boi Insul. A cerca vem pronta para uso, o que reduz significativamente o tempo e o esforço necessários para a montagem. Isso, combinado com seu menor custo de manutenção, faz da Campeira Boi uma escolha econômica e eficiente para proprietários rurais que buscam otimizar seus investimentos.\n\nPara varejistas e revendedores, a inclusão da cerca pronta Campeira Boi Insul no mix de produtos representa uma excelente oportunidade de negócio. Este produto exclusivo e de alta qualidade atrai um público qualificado, composto por proprietários rurais que buscam soluções robustas e duráveis. Ao disponibilizar a Campeira Boi em sua loja, você não apenas oferece um produto diferenciado que atende às necessidades do mercado, mas também oferece uma alternativa mais moderna, prática e resistente à cerca de confecção manual de arame ovalado, além de fortalece a reputação do seu estabelecimento como um fornecedor de itens de primeira linha. A alta demanda por cercas resistentes e duradouras, aliada à exclusividade da tecnologia de nó em X e toda qualidade oferecida pela cerca pronta Campeira Boi Insul, garante um alto potencial de vendas e fidelização de clientes.\n\nA Insul oferece uma garantia de 5 anos para a Campeira Boi, refletindo nossa confiança na qualidade e na durabilidade deste produto. Além de sua funcionalidade superior, a cerca também se integra de maneira harmoniosa ao ambiente, proporcionando uma estética organizada e profissional para sua propriedade. A cerca pronta Campeira Boi Insul é, portanto, a escolha ideal para quem precisa de uma solução de cercamento confiável, resistente e duradoura, que ofereça segurança tanto para os animais quanto para a propriedade. Com a combinação única de inovação, qualidade e praticidade, a Campeira Boi Insul é um investimento seguro e eficaz para o seu negócio.",
    to: "/cercas-prontas/campeira-boi",
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
      "Cerca Campeira",
      "Cerca Campeira Boi",
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

const cercaDescriptions: Record<
  "fenix" | "campeira-maxx" | "campeira-boi" | "campeira",
  string[]
> = {
  fenix: poductsCardsPages[0].description.split("\n\n"),
  "campeira-maxx": poductsCardsPages[1].description.split("\n\n"),
  "campeira-boi": poductsCardsPages[3].description.split("\n\n"),
  campeira: poductsCardsPages[2].description.split("\n\n"),
};

const videoCardSlides: Record<
  "fenix" | "campeira-maxx" | "campeira-boi" | "campeira",
  VideoCardData[]
> = {
  fenix: [
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784679852/video-1-fenix_y0xpoj.mp4",
      category: "MATERIAL",
      title: "Aço Carbono",
      description:
        "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784679857/video-2-fenix_f8ymgo.mp4",
      category: "ESTRUTURA",
      title: "Nó em X",
      description:
        "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784679905/video-3-fenix_gylgjj.mp4",
      category: "TERRENO",
      title: "Qualquer Relevo",
      description:
        "Acompanha aclives e declives sem dificuldade na instalação.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784679873/video-4-fenix_dskpfk.mp4",
      category: "ECONOMIA",
      title: "Instalação Rápida",
      description: "Espaçamento maior entre mourões gera até 50% de economia.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784679856/video-5-fenix_vl1wye.mp4",
      category: "PROTEÇÃO",
      title: "Malha Bimodal",
      description:
        "Fechada embaixo para contenção, aberta em cima para economia.",
    },
  ],
  "campeira-maxx": [
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784830220/maxx-1_hv6jl7.mp4",
      category: "MATERIAL",
      title: "Fio 2,50 mm",
      description:
        "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784830216/maxx-2_glcxhe.mp4",
      category: "ACABAMENTO",
      title: "Aço Galvanizado a Fogo",
      description:
        "Proteção contra corrosão e maior durabilidade em qualquer ambiente.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784830212/maxx-3_dlstva.mp4",
      category: "ESTRUTURA",
      title: "Malha Bifásica",
      description:
        "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784830217/maxx-4_xbxwtz.mp4",
      category: "ESTRUTURA",
      title: "Nó em X (stiff stay)",
      description:
        "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
    },
  ],
  "campeira-boi": [
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785172768/campeira_boi_vd_1_dioiht.mp4",
      category: "MATERIAL",
      title: "Aço Carbono",
      description:
        "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785172720/campeira_boi_vd_2_jyf9hr.mp4",
      category: "ESTRUTURA",
      title: "Nó em X",
      description:
        "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785172733/campeira_boi_vd_3_jrglh9.mp4",
      category: "TERRENO",
      title: "Qualquer Relevo",
      description:
        "Acompanha aclives e declives sem dificuldade na instalação.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785172756/campeira_boi_vd_4_qukln1.mp4",
      category: "ECONOMIA",
      title: "Instalação Rápida",
      description: "Espaçamento maior entre mourões gera até 50% de economia.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785172793/campeira_boi_vd_5_gvykyf.mp4",
      category: "PROTEÇÃO",
      title: "Malha Bimodal",
      description:
        "Fechada embaixo para contenção, aberta em cima para economia.",
    },
  ],
  campeira: [
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175001/campeira_vd_1_xxfqp5.mp4",
      category: "MATERIAL",
      title: "Aço Carbono",
      description:
        "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175000/campeira-vd-2_t0cxqz.mp4",
      category: "ESTRUTURA",
      title: "Nó em X",
      description:
        "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175007/campeira-vd-3_rtxcbc.mp4",
      category: "TERRENO",
      title: "Qualquer Relevo",
      description:
        "Acompanha aclives e declives sem dificuldade na instalação.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175003/campeira-vd-4_rjy6fa.mp4",
      category: "ECONOMIA",
      title: "Instalação Rápida",
      description: "Espaçamento maior entre mourões gera até 50% de economia.",
    },
    {
      src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175007/campeira-vd-5_lyarq3.mp4",
      category: "PROTEÇÃO",
      title: "Malha Bimodal",
      description:
        "Fechada embaixo para contenção, aberta em cima para economia.",
    },
  ],
};

const videoCard3DSlides: Record<
  "fenix" | "campeira-maxx" | "campeira-boi" | "campeira",
  string
> = {
  fenix:
    "https://res.cloudinary.com/kcqitv3l/video/upload/v1784680849/Cerca_Comum_vs._F%C3%AAnix_Por_que_os_Invasores_N%C3%A3o_Passam_por_Ela_-_Casa_das_Cercas_480p_h264_youtube_1_pgjvm3.mp4",

  "campeira-maxx":
    "https://res.cloudinary.com/kcqitv3l/video/upload/v1784831301/Instala%C3%A7%C3%A3o_Campeira_Maxx_wu8gpj.mp4",

  "campeira-boi":
    "https://res.cloudinary.com/kcqitv3l/video/upload/v1785241129/campeira-boi-3d_vst8rh.mp4",

  campeira:
    "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175010/video-campeira-3d_patgvc.mp4",
};

// TODO: colar aqui as fotos reais de cada modelo. Enquanto vazio, a página usa a
const cercaGalleryImages: Record<
  "fenix" | "campeira-maxx" | "campeira-boi" | "campeira",
  GalleryImage[]
> = {
  fenix: [
    {
      src: "/images/img_fenix_carousel/1.jpeg",
      alt: "Cerca instalada em propriedade rural",
    },
    {
      src: "/images/img_fenix_carousel/2.jpeg",
      alt: "Detalhe do fio e da malha",
    },
    { src: "/images/img_fenix_carousel/3.jpeg", alt: "Rolo da tela" },
    {
      src: "/images/img_fenix_carousel/4.jpeg",
      alt: "Cerca em terreno com desnível",
    },
    {
      src: "/images/img_fenix_carousel/5.jpeg",
      alt: "Acabamento galvanizado a fogo",
    },
    { src: "/images/img_fenix_carousel/6.jpeg", alt: "Nó em X da cerca" },
    { src: "/images/img_fenix_carousel/7.jpeg", alt: "Cerca Insul" },
    { src: "/images/img_fenix_carousel/8.jpeg", alt: "Cerca Insul" },
    { src: "/images/img_fenix_carousel/9.jpeg", alt: "Cerca Insul" },
  ],
  "campeira-maxx": [], //colocar imagens da Maxx
  "campeira-boi": [
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-1.jpg",
      alt: "Cerca instalada em propriedade rural",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-2.jpg",
      alt: "Detalhe do fio e da malha",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-3.jpg",
      alt: "Rolo da tela",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-4.jpg",
      alt: "Cerca em terreno com desnível",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-5.jpg",
      alt: "Acabamento galvanizado a fogo",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-6.jpg",
      alt: "Nó em X da cerca",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-7.jpg",
      alt: "Cerca Insul",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-8.jpg",
      alt: "Cerca Insul",
    },
    {
      src: "/images/img_campeiraBoi_carousel/campeira-img-9.jpg",
      alt: "Cerca Insul",
    },
  ],
  campeira: [
    {
      src: "/images/img_campeira_carousel/img_campeira_1.jpg",
      alt: "Cerca instalada em propriedade rural",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_2.jpg",
      alt: "Detalhe do fio e da malha",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_3.jpg",
      alt: "Rolo da tela",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_4.jpg",
      alt: "Cerca em terreno com desnível",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_5.jpg",
      alt: "Acabamento galvanizado a fogo",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_6.jpg",
      alt: "Nó em X da cerca",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_7.jpg",
      alt: "Cerca Insul",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_8.jpg",
      alt: "Cerca Insul",
    },
    {
      src: "/images/img_campeira_carousel/img_campeira_9.jpg",
      alt: "Cerca Insul",
    },
  ],
};

const videoMaxxExample: VideoExampleMaxx[] = [
  {
    src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1784826166/campeira_maxx_alzelf.mov",
    name: "Video-maxx-example",
  },
];

const cercasProntasInfo: CercaProntaInfo[] = [
  {
    slug: "fenix",
    name: "FENIX",
    color: "#b2020d",
    paragraphs: cercaDescriptions.fenix,
    features: [
      {
        title: "Fio 2,50 mm",
        description:
          "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
        start: 63.5,
        end: 68,
      },
      {
        title: "Instalação",
        description:
          "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
        start: 36.3,
        end: 43.8,
      },
      {
        title: "Malha bifásica",
        description:
          "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
        start: 57,
        end: 61.5,
      },
      {
        title: "Nó em X (stiff stay)",
        description:
          "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        start: 61.5,
        end: 64,
      },
    ],
    videoSrc: videoMaxxExample[0].src,
    videoCards: videoCardSlides.fenix,
    video3D: videoCard3DSlides.fenix,
    gallery: cercaGalleryImages.fenix,
  },
  {
    slug: "campeira-maxx",
    name: "CAMPEIRA MAXX",
    color: "#0a325a",
    paragraphs: cercaDescriptions["campeira-maxx"],
    features: [
      {
        title: "Instalação",
        description:
          "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
        start: 1,
        end: 21,
        checkpoints: [5, 9, 16, 21],
        captions: [
          "Tela pronta e esticada entre os mourões — sai de fábrica pronta para instalar, sem montar arame por arame.",
          "Arames de aço permitem espaçamento de 5x5 até 8x8 metros entre mourões, economizando até 50% em material.",
          "Ideal para conter bovinos e equinos de grande porte, e barra a entrada de javalis, javaporcos e capivaras.",
          "Se adapta a qualquer relevo — aclives, declives e terrenos irregulares — protegendo a propriedade rural inteira.",
        ],
      },
      {
        title: "Malha superior",
        description:
          "Malha de 25cm x 20cm com acabamento em aço galvanizado a fogo.",
        start: 21,
        end: 34,
        caption:
          "Malha superior mais aberta: reduz o custo de material e mantém o visual limpo, sem abrir mão da resistência.",
      },
      {
        title: "Malha inferior",
        description:
          "Malha de 25cm x 10cm, mais fechada para contenção de animais.",
        start: 35,
        end: 37,
      },
      {
        title: "Nó em X (stiff stay)",
        description:
          "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        start: 38,
        end: 44,
      },
    ],
    videoSrc: videoMaxxExample[0].src,
    videoCards: videoCardSlides["campeira-maxx"],
    video3D: videoCard3DSlides["campeira-maxx"],
    gallery: cercaGalleryImages["campeira-maxx"],
  },
  {
    slug: "campeira-boi",
    name: "CAMPEIRA BOI",
    color: "#959e24",
    paragraphs: cercaDescriptions["campeira-boi"],
    features: [
      {
        title: "Fio 2,50 mm",
        description:
          "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
        start: 63.5,
        end: 68,
      },
      {
        title: "Instalação",
        description:
          "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
        start: 36.3,
        end: 43.8,
      },
      {
        title: "Malha bifásica",
        description:
          "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
        start: 57,
        end: 61.5,
      },
      {
        title: "Nó em X (stiff stay)",
        description:
          "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        start: 61.5,
        end: 64,
      },
    ],
    videoSrc:
      "https://res.cloudinary.com/kcqitv3l/video/upload/v1784730616/Campeira_Boi_cohowf.mp4",
    videoCards: videoCardSlides["campeira-boi"],
    video3D: videoCard3DSlides["campeira-boi"],
    gallery: cercaGalleryImages["campeira-boi"],
  },
  {
    slug: "campeira",
    name: "CAMPEIRA",
    color: "#ff711b",
    paragraphs: cercaDescriptions.campeira,
    features: [
      {
        title: "Fio 2,50 mm",
        description:
          "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
        start: 63.5,
        end: 68,
      },
      {
        title: "Instalação",
        description:
          "Tela esticada entre os mourões, pronta para ser instalada em qualquer relevo de terreno.",
        start: 36.3,
        end: 43.8,
      },
      {
        title: "Malha bifásica",
        description:
          "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
        start: 57,
        end: 61.5,
      },
      {
        title: "Nó em X (stiff stay)",
        description:
          "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
        start: 61.5,
        end: 64,
      },
    ],

    videoSrc:
      "https://res.cloudinary.com/kcqitv3l/video/upload/v1784730448/Campeira_prw8et.mp4",
    videoCards: videoCardSlides.campeira,
    video3D: videoCard3DSlides.campeira,
    gallery: cercaGalleryImages.campeira,
  },
];

const cercasGalleryImages: GalleryImage[] = cercaGalleryImages.fenix;

const cercasVideoCards: VideoCardData[] = videoCardSlides.fenix;

const videoShowcaseMain =
  "https://res.cloudinary.com/kcqitv3l/video/upload/v1785179127/insul_at5bs6.mp4";

const videoShowcaseReels: ShowcaseReel[] = [
  {
    src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785179124/video_1_jdmtln.mp4",
    name: "reel-1",
  },
  {
    src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785179126/video_2_vtigrr.mp4",
    name: "reel-2",
  },
  {
    src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785179133/video_3_pteuoi.mp4",
    name: "reel-3",
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
  cercaDescriptions,
  videoCardSlides,
  videoCard3DSlides,
  videoMaxxExample,
  cercasProntasInfo,
  cercaGalleryImages,
  cercasGalleryImages,
  cercasVideoCards,
  videoShowcaseMain,
  videoShowcaseReels,
};
