import fenixFarm from "../../public/images/hero-telas/hero-fenix/fazenda.png";
import fenixUpperMesh from "../../public/images/imagens-teste/fenix/malha-supeior-fenix.png";
import fenixLowerMesh from "../../public/images/imagens-teste/fenix/malha-inferior-fenix.png";
import fenixKnot from "../../public/images/imagens-teste/fenix/Nó em X - fenix.png";
import fenixKnotDetail from "../../public/images/imagens-teste/fenix/no-em-x-detalhe.png";
import fenixFenceLength from "../../public/images/imagens-teste/fenix/comprimento-fenix.png";
import fenixIndication from "../../public/images/imagens-teste/fenix/tela-indicaao-fenix.png";
import fenixIndicationBackground from "../../public/images/imagens-teste/fenix/showcase-indicacao-fenix.png";
import campeiraSky from "../../public/images/hero-telas/hero-campeira/ceu-campeira.png";
import campeiraScene from "../../public/images/hero-telas/hero-campeira/hero-campeira.png";
import campeiraBoiHero from "../../public/images/hero-telas/hero-boi/hero-campeiraBoi.webp";
import campeiraIndication from "../../public/images/imagens-teste/campeira/tela-indicaao-campeira.png";
import campeiraIndicationBackground from "../../public/images/imagens-teste/campeira/showcase-indicacao-campeira.png";
import campeiraUpperMesh from "../../public/images/imagens-teste/campeira/malha-superior.png";
import campeiraLowerMesh from "../../public/images/imagens-teste/campeira/malha-inferior.png";
import campeiraKnotBackground from "../../public/images/imagens-teste/campeira/img-campeira-no.png";
import campeiraKnotDetail from "../../public/images/imagens-teste/campeira/CAMPEIRA_NO.png";
import campeiraBoiIndication from "../../public/images/imagens-teste/boi/tela-indicacao-campeiraBoi.png";
import campeiraBoiIndicationBackground from "../../public/images/imagens-teste/boi/showcase-indicacao-campeiraBoi.png";
import campeiraBoiMesh from "../../public/images/imagens-teste/boi/malha-boi.png";
import campeiraBoiKnot from "../../public/images/imagens-teste/boi/no-X.png";
import campeiraBoiKnotBackground from "../../public/images/imagens-teste/boi/img-no-X-boi.png";

export interface ProductCardData {
  src: string;
  title: string;
  name: string;
  paragraph: string;
  shortDescription: string;
  description: string;
  postSpacing: string;
  animals: string[];
  indicatedFor?: SoldadaIndicatedUse[];
  to?: string;
  hoverImage?: string;
  imageClassName?: string;
  imageBoxClassName?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface CercaSlide {
  src: string;
  label: string;
  hotspot: CercaHotspot;
}

export interface CercaHotspot {
  x: number;
  y: number;
  title: string;
  description: string;
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

export interface ShowcaseReel {
  src: string;
  name: string;
}

export interface VideoCardData {
  src: string;
  category: string;
  title: string;
  description: string;
}

export interface CercaCaption {
  label: string;
  value: string;
  zoom?: { scale: number; origin: string };
  image?: string;
  options?: { label: string; value: string }[];
}

export interface CercaFeature {
  title: string;
  description: string;
  start: number;
  end: number;
  checkpoints?: number[];
  captions?: CercaCaption[];
}

export interface CercaHeroSlide {
  src: string;
  hotspot: CercaHotspot;
}

export interface CercaProntaInfo {
  slug: string;
  to: string;
  name: string;
  title: string;
  color: string;
  src: string;
  paragraph: string;
  shortDescription: string;
  paragraphs: string[];
  postSpacing: string;
  lengths: string[];
  animals: string[];
  heroSlide: CercaHeroSlide;
  hero: CercaImageHero;
  showcase?: CercaShowcaseData;
  videoCards: VideoCardData[];
  video3D: string;
  gallery: GalleryImage[];
}

export interface CercaImageHero {
  title: string;
  description: string;
  background?: string;
  sectionClassName?: string;
  textClassName?: string;
  blurTop?: string;
  layers: { src: string; alt: string; animated?: boolean; className?: string; imageClassName?: string }[];
}

export interface CercaShowcaseData {
  title: string;
  subtitle?: string;
  description: string;
  options: CercaShowcaseOption[];
}

export interface CercaShowcaseOption {
  title: string;
  description: string;
  image: string;
  background?: string;
  kind?: "indication" | "upperMesh" | "lowerMesh" | "knot" | "length";
  widthLabel?: string;
  heightLabel?: string;
  meshOutline?: { x: number; y: number; width: number; height: number };
  detailImage?: string;
  knotTarget?: { x: number; y: number };
  bandText?: string;
  lengthImageRatio?: string;
  lengthImageOffset?: number;
  hotspots?: { title: string; description: string; x?: number; y?: number; targetX?: number; targetY?: number }[];
}

// ============================================================================
// Cercas prontas
// ============================================================================

const cercasProntas: CercaProntaInfo[] = [
  {
    slug: "fenix",
    showcase: {
      title: "Fênix: resistência em cada detalhe.",
      description: "Explore a estrutura e as aplicações da tela alambrada Fênix Insul.",
      options: [
        {
          title: "Indicação",
          description: "Segurança para residências, áreas rurais, empresas e espaços esportivos.",
          image: fenixIndication.src,
          background: fenixIndicationBackground.src,
          kind: "indication",
          hotspots:
            [{
              title: "Malha superior",
              description: "Aberturas maiores na parte superior da cerca.",
              x: 36.2,
              y: 38.2,
              targetX: 42.5,
              targetY: 38.2
            },
            {
              title: "Malha inferior",
              description: "Aberturas menores para reforçar a contenção de animais de médio e pequeno porte.",
              x: 37.5,
              y: 74.4,
              targetX: 47.5,
              targetY: 74.4
            }]
        },
        {
          title: "Malha superior",
          description: "10 × 20 cm — aberturas maiores na parte superior, mantendo a visibilidade e a resistência do cercamento.",
          image: fenixUpperMesh.src,
          kind: "upperMesh",
          widthLabel: "10 cm",
          heightLabel: "20 cm",
          meshOutline:
          {
            x: 32.8,
            y: 39.3,
            width: 13.1,
            height: 31.4
          }
        },
        {
          title: "Malha inferior",
          description: "10 × 10 cm — aberturas menores na base para reforçar a contenção de animais de médio e pequeno porte.",
          image: fenixLowerMesh.src,
          kind: "lowerMesh",
          widthLabel: "10 cm",
          heightLabel: "10 cm",
          meshOutline:
          {
            x: 27.9,
            y: 33.3,
            width: 13.1,
            height: 15.1
          }
        },
        {
          title: "Nó em X",
          description: "Veja de perto a união dos fios que reforça a estrutura da cerca Fênix Insul.",
          image: fenixKnot.src,
          background: fenixKnot.src,
          kind: "knot",
          detailImage: fenixKnotDetail.src,
          knotTarget:
          {
            x: 56.1,
            y: 67.7
          }
        },
        {
          title: "Comprimento",
          description: "Disponível em rolos de 25 e 50 metros, com espaçamento entre mourões de 5 a 6 metros.",
          image: fenixFenceLength.src,
          kind: "length",
          bandText: "espaçamento entre mourões 5 - 6m",
          lengthImageRatio: `${fenixFenceLength.width} / ${fenixFenceLength.height}`,
          lengthImageOffset: 0
        },
      ],
    },
    hero: {
      title: "Fênix",
      description: "Segurança para proteger. Resistência para durar. Conheça a tela alambrada Fênix Insul, fabricada com arame de aço de alto carbono.",
      background: "https://d2c3kthzw0ta10.cloudfront.net/hero-telas/hero-fenix/ceu.png",
      sectionClassName: "aspect-video",
      textClassName: "absolute inset-x-0 top-[37%]",
      blurTop: "85%",
      layers: [
        {
          src: fenixFarm.src,
          alt: "",
          className: "z-10",
          imageClassName: "origin-bottom-left scale-y-[0.85] object-contain"
        },
        {
          src: "https://d2c3kthzw0ta10.cloudfront.net/hero-telas/hero-fenix/tela-aberta.png",
          alt: "Tela aberta da cerca Fênix",
          animated: true,
          className: "z-20",
          imageClassName: "origin-bottom-left scale-y-[0.85] object-contain"
        },
      ],
    },
    to: "/cercas-prontas/fenix",
    name: "Cerca Fenix Insul",
    title: "Cerca Pronta(rurais)",
    color: "#b2020d",
    src: "https://res.cloudinary.com/kcqitv3l/image/upload/w_800,q_auto,f_auto/v1784917804/FENX_grkczf.png",
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
    postSpacing: "5 - 6m",
    lengths: ["25m", "50m"],
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
    heroSlide: {
      src: "https://images.unsplash.com/photo-1571898223382-0aa3499f0f2a?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      hotspot: {
        x: 50,
        y: 55,
        title: "Cerca Fênix Insul",
        description:
          "Fio de alta resistência com acabamento galvanizado, ideal para grandes propriedades.",
      },
    },
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-fenix/video-1-fenix.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-fenix/video-2-fenix.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-fenix/video-3-fenix.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-fenix/video-4-fenix.mp4",
        category: "ECONOMIA",
        title: "Instalação Rápida",
        description:
          "Espaçamento maior entre mourões gera até 50% de economia.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-fenix/video-5-fenix.mp4",
        category: "PROTEÇÃO",
        title: "Malha Bimodal",
        description:
          "Fechada embaixo para contenção, aberta em cima para economia.",
      },
    ],
    video3D: "https://d2c3kthzw0ta10.cloudfront.net/videos-fenix/video-card-3d.mp4",
    gallery: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/1.jpeg",
        alt: "Cerca instalada em propriedade rural",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/2.jpeg",
        alt: "Detalhe do fio e da malha",
      },
      { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/3.jpeg", alt: "Rolo da tela" },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/4.jpeg",
        alt: "Cerca em terreno com desnível",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/5.jpeg",
        alt: "Acabamento galvanizado a fogo",
      },
      { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/6.jpeg", alt: "Nó em X da cerca" },
      { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/7.jpeg", alt: "Cerca Insul" },
      { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/8.jpeg", alt: "Cerca Insul" },
      { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/9.jpeg", alt: "Cerca Insul" },
    ],
  }, //Fenix
  {
    slug: "campeira-maxx",
    showcase: {
      title: "Cada malha,",
      subtitle: "pensada para o seu campo.",
      description: "Navegue e descubra como a estrutura da Campeira Maxx entrega resistência e proteção onde você mais precisa.",
      options: [
        {
          title: "Indicação",
          description: "Proteção para animais, pastagens e propriedades rurais.",
          image: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/maxx/img-indicado.png",
          background: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/maxx/img-terreno-indicado.png",
          kind: "indication",
          hotspots:
            [{
              title: "Malha superior",
              description: "Indicada para conter animais de grande porte."
            },
            {
              title: "Malha inferior",
              description: "Indicada para conter animais de médio e pequeno porte."
            }]
        },
        {
          title: "Malha superior",
          description: "22cm x 20cm — mais aberta para reduzir o custo de material e manter o visual limpo, sem abrir mão da resistência.",
          image: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/maxx/malha-superior.png",
          kind: "upperMesh",
          widthLabel: "22 cm",
          heightLabel: "20 cm"
        },
        {
          title: "Malha inferior",
          description: "22cm x 10cm — mais fechada para reforçar a contenção de animais e barrar invasores menores.",
          image: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/maxx/malha-inferior.png",
          kind: "lowerMesh",
          widthLabel: "22 cm",
          heightLabel: "10 cm"
        },
        {
          title: "Nó em X",
          description: "O fio de aço e o nó em X (stiff stay) se travam entre si, mantendo a tensão e a rigidez da cerca por muito mais tempo.",
          image: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/maxx/img-no-X.png",
          background: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/maxx/img-no-X.png",
          kind: "knot",
          detailImage: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/maxx/no-em-x-detalhe.png"
        },
        {
          title: "Comprimento",
          description: "Espaçamento entre mourões de 6 a 8 metros.",
          image: "https://d2c3kthzw0ta10.cloudfront.net/imagens-teste/tela-mouroes-alta-resolucao.png",
          kind: "length",
          bandText: "espaçamento entre mourões 6 - 8m"
        },
      ],
    },
    hero: {
      title: "Campeira Maxx",
      description: "Resistência para proteger. Tecnologia para durar. Conheça a cerca pronta Insul com nó em X e aço galvanizado a fogo.",
      background: "https://d2c3kthzw0ta10.cloudfront.net/hero-telas/hero-maxx/por-do-sol.png",
      sectionClassName: "aspect-video",
      textClassName: "absolute inset-x-0 top-[30%]",
      blurTop: "85%",
      layers: [
        {
          src: "https://d2c3kthzw0ta10.cloudfront.net/hero-telas/hero-maxx/paisagem.png",
          alt: "",
          imageClassName: "origin-bottom-left scale-y-[0.85] object-contain"
        },
        {
          src: "https://d2c3kthzw0ta10.cloudfront.net/hero-telas/hero-maxx/tela-aberta-maxx.png",
          alt: "Tela aberta da Campeira Maxx",
          animated: true,
          className: "z-20",
          imageClassName: "origin-bottom-left scale-y-[0.85] object-contain"
        },
      ],
    },
    to: "/cercas-prontas/campeira-maxx",
    name: "Cerca Campeira Maxx Insul",
    title: "Cerca Pronta(rurais)",
    color: "#042c53",
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos/campeira-maxx.mp4",
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
    postSpacing: "6 - 8m",
    lengths: ["50m", "100m"],
    animals: [
      "Bovino",
      "Capivara",
      "Cães",
      "Avestruz",
      "Ovinos",
      "Suínos",
      "Javaporco",
    ],
    heroSlide: {
      src: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      hotspot: {
        x: 45,
        y: 50,
        title: "Cerca Campeira Maxx Insul",
        description:
          "Reforçada para pastagens de maior porte, com maior espaçamento entre fios.",
      },
    },
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-maxx/video-maxx-1.mp4",
        category: "MATERIAL",
        title: "Fio 2,50 mm",
        description:
          "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-maxx/video-maxx-2.mp4",
        category: "ACABAMENTO",
        title: "Aço Galvanizado a Fogo",
        description:
          "Proteção contra corrosão e maior durabilidade em qualquer ambiente.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-maxx/video-maxx-3.mp4",
        category: "ESTRUTURA",
        title: "Malha Bifásica",
        description:
          "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-maxx/video-maxx-4.mp4",
        category: "ESTRUTURA",
        title: "Nó em X (stiff stay)",
        description:
          "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-maxx/video-maxx-5.mp4",
        category: "PROTEÇÃO",
        title: "Malha Bimodal",
        description:
          "Fechada embaixo para contenção, aberta em cima para economia.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-maxx/video-maxx-3d.mp4",
    gallery: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-1.jpeg",
        alt: "Cerca instalada em propriedade rural",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-2.jpeg",
        alt: "Detalhe do fio e da malha",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-3.png",
        alt: "Rolo da tela",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-4.jpeg",
        alt: "Cerca em terreno com desnível",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-5.jpg",
        alt: "Acabamento galvanizado a fogo",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-6.jpeg",
        alt: "Nó em X da cerca",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-7.png",
        alt: "Cerca Insul",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-8.jpg",
        alt: "Cerca Insul",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-9.jpeg",
        alt: "Cerca Insul",
      },
    ],
  }, //Maxx
  {
    slug: "campeira",
    showcase: {
      title: "Campeira: proteção em cada detalhe.",
      description: "Explore a estrutura e as aplicações da cerca Campeira Insul.",
      options: [
        {
          title: "Indicação",
          description: "Cerca indicada para conter animais de médio porte, como ovinos, caprinos e suínos.",
          image: campeiraIndication.src,
          background: campeiraIndicationBackground.src,
          kind: "indication",
          hotspots: [{ title: "Malha superior", description: "Aberturas maiores na parte superior da cerca.", x: 36.4, y: 44.2, targetX: 42.7, targetY: 44.2 }, { title: "Malha inferior", description: "Aberturas menores na base para reforçar a contenção de animais.", x: 60, y: 73.1, targetX: 70, targetY: 73.1 }]
        },
        {
          title: "Malha superior",
          description: "30 × 20 cm — aberturas maiores no topo, unindo resistência e visibilidade.",
          image: campeiraUpperMesh.src,
          kind: "upperMesh",
          widthLabel: "30 cm",
          heightLabel: "20 cm",
          meshOutline: { x: 43, y: 33.8, width: 24.2, height: 25.1 }
        },
        {
          title: "Malha inferior",
          description: "30 × 10 cm — aberturas menores na base para a contenção de animais de médio porte.",
          image: campeiraLowerMesh.src,
          kind: "lowerMesh",
          widthLabel: "30 cm",
          heightLabel: "10 cm",
          meshOutline: { x: 46.8, y: 40.7, width: 27.3, height: 13.6 }
        },
        { title: "Nó tradicional", description: "Conheça a união dos fios da cerca Campeira Insul, com nó tradicional e aço galvanizado a fogo.", image: campeiraKnotBackground.src, background: campeiraKnotBackground.src, kind: "knot", detailImage: campeiraKnotDetail.src, knotTarget: { x: 56.9, y: 83.7 } },
      ],
    },
    hero: {
      title: "Campeira",
      description: "Conheça a cerca Campeira Insul e os detalhes da sua estrutura para proteger o seu campo.",
      background: campeiraSky.src,
      sectionClassName: "aspect-video",
      textClassName: "absolute inset-x-0 top-[26%]",
      blurTop: "85%",
      layers:
        [{
          src: campeiraScene.src,
          alt: "Cerca Campeira Insul",
          animated: true,
          imageClassName: "origin-bottom-left scale-y-[0.85] object-contain"
        }],
    },
    to: "/cercas-prontas/campeira",
    name: "Cerca Campeira Insul",
    title: "Cerca Pronta(rurais)",
    color: "#ff711b",
    src: "https://res.cloudinary.com/kcqitv3l/image/upload/w_800,q_auto,f_auto/v1784917794/CAMPEIRA_t68olb.png",
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
    postSpacing: "6 - 8m",
    lengths: ["50m", "100m"],
    animals: ["Bovino", "Cães", "Caprino", "Suínos", "Ovinos"],
    heroSlide: {
      src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      hotspot: {
        x: 55,
        y: 60,
        title: "Cerca Campeira Insul",
        description:
          "Modelo tradicional para divisas rurais, resistente e de fácil instalação.",
      },
    },
    videoCards: [
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
        description:
          "Espaçamento maior entre mourões gera até 50% de economia.",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175007/campeira-vd-5_lyarq3.mp4",
        category: "PROTEÇÃO",
        title: "Malha Bimodal",
        description:
          "Fechada embaixo para contenção, aberta em cima para economia.",
      },
    ],
    video3D:
      "https://res.cloudinary.com/kcqitv3l/video/upload/v1785175010/video-campeira-3d_patgvc.mp4",
    gallery: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_1.jpg",
        alt: "Cerca instalada em propriedade rural",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_2.jpg",
        alt: "Detalhe do fio e da malha",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_3.jpg",
        alt: "Rolo da tela",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_4.jpg",
        alt: "Cerca em terreno com desnível",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_5.jpg",
        alt: "Acabamento galvanizado a fogo",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_6.jpg",
        alt: "Nó em X da cerca",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_7.jpg",
        alt: "Cerca Insul",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_8.jpg",
        alt: "Cerca Insul",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_9.jpg",
        alt: "Cerca Insul",
      },
    ],
  }, //Campeira
  {
    slug: "campeira-boi",
    showcase: {
      title: "Campeira Boi: resistência em cada detalhe.",
      description: "Explore a estrutura e as aplicações da cerca Campeira Boi Insul.",
      options: [
        {
          title: "Indicação",
          description: "Cerca indicada para conter animais de médio e grande porte, como bovinos e equinos.",
          image: campeiraBoiIndication.src,
          background: campeiraBoiIndicationBackground.src,
          kind: "indication",
        },
        {
          title: "Malha",
          description: "30 × 20 cm — malha desenvolvida para a contenção de bovinos e equinos.",
          image: campeiraBoiMesh.src,
          kind: "upperMesh",
          widthLabel: "30 cm",
          heightLabel: "20 cm",
          meshOutline: { x: 46.2, y: 32.8, width: 27.6, height: 25.2 },
        },
        {
          title: "Nó em X",
          description: "Os fios se travam no nó em X, mantendo a tensão e a rigidez da cerca por mais tempo.",
          image: campeiraBoiKnotBackground.src,
          background: campeiraBoiKnotBackground.src,
          detailImage: campeiraBoiKnot.src,
          kind: "knot",
          knotTarget: { x: 52.2, y: 54.9 },
        },
      ],
    },
    hero: {
      title: "Campeira Boi",
      description: "Conheça a cerca Campeira Boi Insul, desenvolvida para o cercamento de áreas rurais e a contenção de bovinos.",
      sectionClassName: "aspect-video",
      textClassName: "absolute inset-x-0 top-[26%]",
      blurTop: "85%",
      layers: [{
        src: campeiraBoiHero.src,
        alt: "Cerca Campeira Boi instalada em uma pastagem com bovinos",
        animated: true,
        imageClassName: "object-contain"
      }],
    },
    to: "/cercas-prontas/campeira-boi",
    name: "Cerca Campeira Boi Insul",
    title: "Cerca Pronta(rurais)",
    color: "#959e24",
    src: "https://res.cloudinary.com/kcqitv3l/image/upload/w_800,q_auto,f_auto/v1784917794/CAMPEIRA-BOI_qyuhzs.png",
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
    postSpacing: "6 - 8m",
    lengths: ["50m", "100m"],
    animals: ["Bovino"],
    heroSlide: {
      src: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      hotspot: {
        x: 48,
        y: 58,
        title: "Cerca Campeira Boi Insul",
        description:
          "Desenvolvida para rebanhos bovinos, com fios espaçados para máxima contenção.",
      },
    },
    videoCards: [
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
        description:
          "Espaçamento maior entre mourões gera até 50% de economia.",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785172793/campeira_boi_vd_5_gvykyf.mp4",
        category: "PROTEÇÃO",
        title: "Malha Bimodal",
        description:
          "Fechada embaixo para contenção, aberta em cima para economia.",
      },
    ],
    video3D:
      "https://res.cloudinary.com/kcqitv3l/video/upload/v1785241129/campeira-boi-3d_vst8rh.mp4",
    gallery: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-1.jpg",
        alt: "Cerca instalada em propriedade rural",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-2.jpg",
        alt: "Detalhe do fio e da malha",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-3.jpg",
        alt: "Rolo da tela",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-4.jpg",
        alt: "Cerca em terreno com desnível",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-5.jpg",
        alt: "Acabamento galvanizado a fogo",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-6.jpg",
        alt: "Nó em X da cerca",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-7.jpg",
        alt: "Cerca Insul",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-8.jpg",
        alt: "Cerca Insul",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-9.jpg",
        alt: "Cerca Insul",
      },
    ],
  }, //Boi
];

const cercasProntasReels: ShowcaseReel[] = [
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels/video-GuiRichar.mp4",
    name: "A solução em proteção perimetral",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels/campeira.mp4",
    name: "Cerca Campeira Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels/campeira-maxx.mp4",
    name: "Cerca Campeira Maxx Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels/campeira-boi.mp4",
    name: "Cerca Campeira Boi Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels/campeira-java.mp4",
    name: "Cerca Campeira Java Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels/resistencia.mp4",
    name: "A resistência das cercas",
  },
];

// ============================================================================
// Telas soldadas e hexagonais
// ============================================================================

export interface SoldadaIndicatedUse {
  name: string;
  src: string;
}

export interface SoldadaHexagonalInfo {
  slug: string;
  name: string;
  category: "Soldada" | "Hexagonal" | "Torção Simples";
  color: string;
  src: string;
  paragraph: string;
  postSpacing: string;
  heights?: string[];
  indicatedFor: SoldadaIndicatedUse[];
  shortDescription: string;
  description: string;
  gallery: GalleryImage[];
  features?: CercaFeature[];
  videoSrc?: string;
  videoCards?: VideoCardData[];
  video3D?: string;
}

const soldadasHexagonais: SoldadaHexagonalInfo[] = [
  {
    slug: "tela-brava",
    name: "Tela Brava",
    category: "Soldada",
    // TUDO abaixo (cor, imagem, textos, galeria, vídeo, features, video
    // cards) foi copiado literalmente da Fenix (cerca pronta) só pra ficar
    // com o visual idêntico ao de cercas prontas. Troque pelo material real
    // da Tela Brava quando tiver.
    color: "#1d5b34",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/brava.png",
    paragraph:
      "Fio 2,50 mm, Aço galvanizado a fogo, Revestimento de PVC, Malha 5 cm x 10 cm",
    postSpacing: "3m",
    heights: ["1,00 m", "1,50 m", "1,80 m", "2,00 m"],
    indicatedFor: [
      {
        name: "Cercamento para casas, condomínios e áresas verdes",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-casa.png",
      },
      {
        name: "Proteção UV em áreas externas de alta exposição ao sol",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-UV.png",
      },
      {
        name: "Cercamento de jardins, quintais, chácaras e casas á beira-mar",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-onda.png",
      },
    ],
    shortDescription:
      "A Tela Brava Insul oferece resistência, durabilidade e segurança para cercamentos rurais. Fabricada com arames galvanizados de alta qualidade, é ideal para a contenção de animais e divisão de propriedades.",
    description:
      "A Tela Brava Insul é a solução definitiva para cercamentos em regiões litorâneas, onde a durabilidade e resistência são cruciais para enfrentar as condições adversas de maresia e umidade. Fabricada com aço galvanizado revestido em PVC de alta resistência e proteção UV, essa tela conta com espessura de fio de 2,50 mm e oferece máxima robustez e proteção contra corrosão, mesmo sob intensa exposição ao sol e à água salgada.\n\nCom malha de 5 cm (L) x 10 cm(A), disponível em alturas de 1,00 m, 1,50 m, 1,80 m e 2,00 m, a Tela Brava Insul garante segurança e estabilidade em diversos tipos de cercamentos.A qualidade e a inovação europeia se unem à tecnologia italiana de fabricação para proporcionar um produto diferenciado, com durabilidade excepcional e acabamento impecável.\n\nA O PVC com proteção UV mantém a aparência e a integridade da tela por anos, enquanto o aço galvanizado assegura confiabilidade e resistência incomparáveis. A Tela Brava Insul, com rolos de 25 metros, atende às mais exigentes demandas do mercado, garantindo uma instalação prática e eficiente, adaptada ao perfil dos cercamentos de propriedades e outros espaços que exigem segurança contínua.\n\nPara revendedores e varejistas, a Tela Brava Insul é um item estratégico que agrega alto valor ao portfólio de produtos, alinhando-se com as demandas de clientes que buscam inovação, qualidade e performance superior. Com garantia de 5 anos e a qualidade já reconhecida dos produtos Insul, a Tela Brava oferece uma excelente oportunidade para fidelizar clientes e ampliar o alcance de mercado em regiões litorâneas, onde a resistência à corrosão é essencial.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948044/img-brava-1_jj4ehi.jpg",
        alt: "Cerca instalada em propriedade rural",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948044/img-brava-2_nrhfsv.jpg",
        alt: "Detalhe do fio e da malha",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948044/img-brava-3_z0h2in.jpg",
        alt: "Rolo da tela",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948044/img-brava-4_vjkzib.jpg",
        alt: "Cerca em terreno com desnível",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948046/img-brava-5_mwu0kz.png",
        alt: "Acabamento galvanizado a fogo",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948044/img-brava-6_ccikqo.jpg",
        alt: "Nó em X da cerca",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948044/img-brava-7_ecchcl.jpg",
        alt: "Cerca Insul",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948045/img-brava-8_ed4gxy.jpg",
        alt: "Cerca Insul",
      },
    ],
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
    ], //trocar pelas informações reais
    videoSrc: "https://d2c3kthzw0ta10.cloudfront.net/videos-brava/Brava.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-brava/video-reel-brava-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-brava/video-reel-brava-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-brava/video-reel-brava-3.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-brava/video-brava-3d.mp4",
  }, //brava
  {
    slug: "tela-titan",
    name: "Tela Titan",
    category: "Soldada",
    color: "#dc0927",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/titan.png",
    paragraph: "Fio 2,50 mm, Aço galvanizado a fogo, Malha 5 cm x 15 cm",
    postSpacing: "até 3m",
    heights: ["1,20 m", "1,50 m", "1,80 m", "2,00 m"],
    indicatedFor: [
      {
        name: "Cercamento de casas, condomínios e terrenos",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/casa-predio.png",
      },
      {
        name: "Canil para cães de pequeno e médio porte",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/cao.png",
      },
      {
        name: "Cercamento de indústrias, centros logísticos, estacionamentos e etc",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/industria.png",
      },
    ],
    shortDescription:
      "A Tela Titan Insul combina resistência e durabilidade para cercamentos seguros e eficientes. Produzida com materiais de alta qualidade, é ideal para proteger propriedades e oferecer um excelente desempenho no uso diário.",
    description:
      "A tela Titan Insul é a solução ideal para cercamentos que exigem máxima proteção e durabilidade, unindo força e praticidade para atender às necessidades mais exigentes. Fabricada com aço galvanizado de 2,50 mm de espessura e tecnologia Insul, essa tela é robusta e confiável, garantindo proteção de longa duração para propriedades rurais, industriais e residenciais. Disponível em alturas variadas — 1,20 m, 1,50 m, 1,80 m e 2,00 m — e com malha de 5 cm x 15 cm, a tela Titan é versátil, adaptando-se perfeitamente a diferentes tipos de cercamentos.\n\nCom design similar a uma grade, a tela Titan Insul oferece uma aparência discreta e moderna, que se integra com eficiência e harmonia ao ambiente, enquanto proporciona alta segurança. \n\nProduzida no Brasil com arame Gerdau e seguindo padrões rigorosos de qualidade, essa tela alia resistência e um baixo custo de instalação, sendo uma opção vantajosa para quem procura qualidade Insul a um custo-benefício imbatível. Sua estrutura robusta é ideal para cercamentos de áreas extensas, onde confiabilidade e baixa manutenção são essenciais.\n\nPara revendedores e varejistas: A tela Titan Insul é um diferencial no mix de produtos, atraindo clientes que buscam uma solução eficiente e acessível para segurança perimetral. Com a reconhecida qualidade Insul e garantia de 5 anos, a tela Titan oferece não apenas um produto durável e de alto desempenho, mas também uma oportunidade para fidelizar consumidores exigentes e ampliar o alcance de mercado com uma linha de cercamento confiável e de alta performance.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786020853/img-titan-1_pxpnfr.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786021304/img-titan-2_avyyem.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786020873/img-titan-3_ldb2xc.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786021331/img-titan-4_fa3uea.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786020872/img-titan-5_jbv2je.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786020827/img-titan-6_jh9ua6.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786021318/img-titan-7_d2lhuc.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786021340/img-titan-8_jr5txb.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786021334/img-titan-9_ajqg1s.jpg",
        alt: "Tela Titan (imagem provisória)",
      },
    ],
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "https://d2c3kthzw0ta10.cloudfront.net/videos-titan/titan.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-titan/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-titan/video-reel-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-titan/video-reel-titan-3.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-titan/video-titan-3d.mp4",
  }, //titan
  {
    slug: "tela-morada",
    name: "Tela Morada",
    category: "Soldada",
    color: "#12568f",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/morada.png",
    paragraph: "Fio 2,30 mm, Aço galvanizado a fogo, Malha 5 cm x 15 cm",
    postSpacing: "até 3m",
    heights: ["1,00 m", "1,20 m", "1,50 m", "1,80 m", "2,00 m"],
    indicatedFor: [
      {
        name: "Cercamento de casas, condomínios e terrenos",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/casa-predio.png",
      },
      {
        name: "Canil para cães de pequeno e médio porte",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/cao.png",
      },
      {
        name: "Cercamento de indústrias, centros logísticos, estacionamentos e etc",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/industria.png",
      },
    ],
    shortDescription:
      "A Tela Morada Insul é uma opção prática e econômica para cercamentos rurais. Fabricada com materiais de qualidade, oferece resistência, fácil instalação e excelente custo-benefício para diversas aplicações no campo.",
    description:
      "A tela soldada Morada Insul é a escolha perfeita para quem procura segurança, estilo e excelente custo-benefício em cercamentos residenciais. Desenvolvida em aço galvanizado Gerdau e com formato similar a grades, a tela Morada oferece proteção confiável com um design leve que harmoniza com o ambiente, proporcionando discrição e segurança na medida certa.Ideal para cercamentos residenciais, a tela Morada combina resistência e versatilidade.\n\nSeu design otimizado garante uma estrutura firme e durável, com a qualidade Insul que você confia para enfrentar as demandas de proteção do dia a dia sem comprometer a aparência do espaço. Com a tela soldada Morada, você obtém uma barreira segura que se integra perfeitamente ao seu ambiente, criando uma estética organizada e suave, ideal para residências que buscam proteção sem excessos visuais. \n\nA tela Morada também se destaca pela sua praticidade na instalação e pela baixa necessidade de manutenção. Sua estrutura robusta de aço galvanizado proporciona uma longa durabilidade e resistência à corrosão, assegurando que o cercamento permaneça íntegro e funcional por anos. Além disso, o formato em grade garante baixa interferência visual, valorizando o espaço e oferecendo uma alternativa esteticamente agradável para delimitar seu perímetro.\n\nPara revendedores e distribuidores: A tela soldada Morada Insul é um dos itens mais vendidos de nossa linha, integrando a CURVA A da linha de telas soldadas em todos nossos clientes. A tela Morada oferece um equilíbrio entre segurança e design, atendendo à demanda crescente por soluções de cercamento residencial que aliam proteção e integração com o ambiente.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786023292/img-tela-morada-1_dxdr46.jpg",
        alt: "Tela Morada (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786023284/img-tela-morada-2_bdqma9.jpg",
        alt: "Tela Morada (imagem provisória)",
      },
    ], //adicionar mais imagens sobre a tela morada
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "https://d2c3kthzw0ta10.cloudfront.net/videos-morada/morada.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-morada/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-morada/video-reel-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-morada/video-reel-3.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-morada/video-morada-3d.mp4",
  }, //morada
  {
    slug: "tela-morada-open",
    name: "Tela Morada Open",
    category: "Soldada",
    color: "#4a2369",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/morada-open.png",
    paragraph: "Fio 2,30 mm, Aço galvanizado a fogo, Malha 6,5 cm x 15 cm",
    postSpacing: "até 3m",
    heights: ["1,00 m", "1,20 m", "1,50 m", "1,80 m", "2,00 m"],
    indicatedFor: [
      {
        name: "Cercamento de casas, condomínios e terrenos",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/casa-predio.png",
      },
      {
        name: "Canil para cães de pequeno e médio porte",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/cao.png",
      },
      {
        name: "Cercamento de indústrias, centros logísticos, estacionamentos e etc",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/industria.png",
      },
    ],
    shortDescription:
      "A Tela Morada Open Insul oferece praticidade, resistência e excelente custo-benefício para cercamentos rurais. Desenvolvida com materiais de qualidade, proporciona segurança, fácil instalação e longa durabilidade em diversas aplicações.",
    description:
      "A tela soldada Morada Open Insul é a escolha inteligente para quem busca segurança, economia e integração visual com o ambiente. Com um design em formato de grade e produzida em aço galvanizado, a Morada Open oferece a combinação ideal entre proteção e discrição, criando cercamentos funcionais que se integram perfeitamente ao cenário residencial.\n\nIndicada para cercamentos em geral, a tela soldada Morada Open se destaca pelo seu excelente custo-benefício e por seu visual leve, proporcionando segurança sem comprometer a harmonia do ambiente. Com arames de alta qualidade Gerdau, essa tela é resistente à corrosão e possui garantia de 5 anos, assegurando durabilidade e confiabilidade ao longo do tempo. \n\nAlém disso, a instalação da Morada Open é simples e prática, economizando tempo e reduzindo os custos com mão de obra. Sua estrutura robusta e leveza tornam o processo rápido, proporcionando uma solução que une segurança e praticidade em um único produto.\n\nPara varejistas e distribuidores: A tela Morada Open Insul representa uma excelente oportunidade de atender à crescente demanda por cercamentos residenciais que prezam pela qualidade e acessibilidade. Um produto que agrega valor ao mix de ofertas e fideliza clientes que buscam soluções de cercamento eficientes, modernas e econômicas.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786026766/img-morada-open-1_eoo6ub.jpg",
        alt: "Tela Morada Open (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786026761/img-morada-open-2_qnrkww.jpg",
        alt: "Tela Morada Open (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786026689/img-morada-open-3_ujf2vy.jpg",
        alt: "Tela Morada Open (imagem provisória)",
      },
    ],
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-open/morada-open.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-open/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-open/video-reel-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-open/video-reel-3.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-open/video-open-3d.mp4",
  }, //morada-open
  {
    slug: "tela-morada-leve",
    name: "Tela Morada Leve",
    category: "Soldada",
    color: "#ffc50f",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/morada-leve.png",
    paragraph: "Fio 1,90 mm, Aço galvanizado a fogo, Malha 5 cm x 10 cm",
    postSpacing: "até 3m",
    heights: ["1,00 m", "1,20 m", "1,50 m", "1,80 m", "2,00 m"],
    indicatedFor: [
      {
        name: "Cercamento para casas e condomínio",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/casa-predio.png",
      },
      {
        name: "Canil para cães de pequeno e médio porte",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/cao.png",
      },
      {
        name: "Hortas e jardins",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/horta.png",
      },
    ],
    shortDescription:
      "A Tela Morada Leve Insul une leveza, praticidade e economia para cercamentos rurais. Fabricada com materiais de qualidade, oferece fácil instalação, boa resistência e excelente desempenho para diversas aplicações.",
    description:
      "A tela soldada Morada Leve Insul é a escolha perfeita para quem busca uma solução de cercamento prática, discreta e econômica. Feita em aço galvanizado, com design semelhante a grades, a Morada Leve é ideal para residências que necessitam de proteção com o mínimo de interferência visual.\n\nEsse produto da linha Morada oferece o melhor custo-benefício da categoria, mantendo a qualidade e durabilidade que você espera da Insul. Projetada para cercamentos residenciais e de uso geral, a tela Morada Leve combina eficiência e estética, proporcionando segurança ao ambiente de forma discreta e funcional. Com arames de alta qualidade Gerdau e galvanização resistente à corrosão, esta tela garante proteção duradoura e confiável, com uma garantia de 5 anos que reafirma seu excelente desempenho ao longo do tempo. \n\nA instalação da Morada Leve é prática e rápida, o que facilita o processo e reduz os custos com mão de obra, tornando-se uma alternativa vantajosa para quem busca economia sem abrir mão de qualidade. Com estrutura leve e design simples, é uma solução que otimiza tempo e investimento, garantindo uma cerca funcional, harmoniosa e de fácil manutenção.\n\nPara lojistas e distribuidores: A tela Morada Leve Insul é uma das telas mais vendidas nacionalmente, sendo assim um item indispensável para qualquer revendedor. Esse modelo conquista clientes pela combinação de qualidade, preço acessível e baixo custo de manutenção, aumentando a satisfação e a fidelização ao longo do tempo.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786033763/img-morada-leve-1_ozggqx.jpg",
        alt: "Tela Morada Leve (imagem provisória)",
      },
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1786033253/img-morada-leve-2_jabyf5.jpg",
        alt: "Tela Morada Leve (imagem provisória)",
      },
    ],
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-morada-leve/morada-leve.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-morada-leve/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-morada-leve/video-reel-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-morada-leve/video-reel-3.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-morada-leve/video-leve-3d.mp4",
  }, //morada-leve
  {
    slug: "tela-multi-uso",
    name: "Tela Multi Uso",
    category: "Soldada",
    color: "#1f3d5c",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/MultyUso.png",
    paragraph: "Fio 1,65 mm, Aço galvanizado a fogo, Malha 5 cm x 5 cm",
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Cercamento para casas e condomínio",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/casa-predio.png",
      },
      {
        name: "Canil para cães de pequeno e médio porte",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/cao.png",
      },
      {
        name: "Hortas e jardins",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-morada-open-titan/horta.png",
      },
    ],
    shortDescription:
      "A Tela Multy Uso Insul oferece versatilidade, resistência e excelente custo-benefício para diferentes tipos de cercamentos. Desenvolvida com materiais de qualidade, proporciona segurança, praticidade na instalação e durabilidade em diversas aplicações rurais e residenciais.",
    description:
      "Página de exemplo para a Tela Multi Uso. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785869060/multy_uso_upii2z.png",
        alt: "Tela Multi Uso (imagem provisória)",
      },
    ],
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc:
      "https://d2c3kthzw0ta10.cloudfront.net/video-multyuso/multyuso.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/video-multyuso/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/video-multyuso/video-reel-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/video-multyuso/video-reel-3.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/video-multyuso/video-multy-3d.mp4",
  }, //multyUso
  {
    slug: "tela-fachanet",
    name: "Tela Fachanet",
    category: "Soldada",
    color: "#002d4d",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/fachaNet.png",
    paragraph: "Fio 1,24 mm, Aço galvanizado a fogo, Malha 2,5 cm x 2,5 cm",
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Ideal para aplicação na construção civil",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-fachanet/construção.png",
      },
      {
        name: "Evita o aparecimento de fissuras",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-fachanet/fissura.png",
      },
      {
        name: "Tela para reboco, alvenaria e reforço de argamassa",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-fachanet/reboco.png",
      },
    ],
    shortDescription:
      "Conteúdo de exemplo — especificações reais desta tela ainda não foram cadastradas.",
    description:
      "Página de exemplo para a Tela Fachanet. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785870625/fachaNet_xiicnh.png",
        alt: "Tela Fachanet (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //fachaNet
  {
    slug: "tela-multymax",
    name: "Tela MultyMax",
    category: "Soldada",
    color: "#4a5568",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/MultyUso-max.png",
    paragraph: "Fio 2,50 mm, Aço galvanizado a fogo, Malha 5 cm x 5 cm",
    postSpacing: "até 3m",
    indicatedFor: [
      {
        name: "Confecção de grades e portões",
        src: "https://d2c3kthzw0ta10.cloudfront.net/multymaxx/portao.png",
      },
      {
        name: "Fechamento de quadras de Padel",
        src: "https://d2c3kthzw0ta10.cloudfront.net/multymaxx/bola.png",
      },
      {
        name: "Cercamento onde exija maior segurança",
        src: "https://d2c3kthzw0ta10.cloudfront.net/multymaxx/protec.png",
      },
    ],
    shortDescription:
      "Conteúdo de exemplo — especificações reais desta tela ainda não foram cadastradas.",
    description:
      "Página de exemplo para a Tela MultyMax. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785871153/multyMax_avjeuq.png",
        alt: "Tela MultyMax (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //multyMax
  {
    slug: "tela-fachanetmax",
    name: "Tela FachaNetMax",
    category: "Soldada",
    color: "#0f766e",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/fachaNet-max.png",
    paragraph: "Fio 2,00 mm, Aço galvanizado a fogo, Malha 2,5 cm x 2,5 cm",
    postSpacing: "até 3m",
    indicatedFor: [
      {
        name: "Ideal para aplicação na construção civil",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-fachanet/construção.png",
      },
      {
        name: "Evita o aparecimento de fissuras",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-fachanet/fissura.png",
      },
      {
        name: "Tela para reboco, alvenaria e reforço de argamassa",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-fachanet/reboco.png",
      },
    ],
    shortDescription:
      "Conteúdo de exemplo — especificações reais desta tela ainda não foram cadastradas.",
    description:
      "Página de exemplo para a Tela FachaNetMax. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785871530/fachaMax_cjaeau.png",
        alt: "Tela FachaNetMax (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //fachaNetMax
  {
    slug: "tela-brava-leve",
    name: "Tela Brava Leve",
    category: "Soldada",
    color: "#86be00",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/brava-leve.png",
    paragraph:
      "Fio 2,10 mm, Aço galvanizado a fogo, Revestimento de PVC, Malha 5 cm x 5 cm",
    postSpacing: "até 3m",
    indicatedFor: [
      {
        name: "Cercamento para casas, condomínios e áresas verdes",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-casa.png",
      },
      {
        name: "Proteção UV em áreas externas de alta exposição ao sol",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-UV.png",
      },
      {
        name: "Cercamento de jardins, quintais, chácaras e casas á beira-mar",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-onda.png",
      },
    ],
    shortDescription:
      "Conteúdo de exemplo — especificações reais desta tela ainda não foram cadastradas.",
    description:
      "Página de exemplo para a Tela Brava Leve. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785872044/brava-leve_nvbjcp.png",
        alt: "Tela Brava Leve (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //brava-leve

  //Telas hexagonais
  {
    slug: "tela-mangueirao-16",
    name: "Tela Mangueirão 16",
    category: "Hexagonal",
    color: "#b3071b",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/mangueirao-16.png",
    paragraph: 'Fio 1,65 mm, Aço galvanizado a fogo, Malha 3" - 7,6 cm',
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Cerca para propriedades rurais e residências",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/fazenda.png",
      },
      {
        name: "Tela para ovinos, suínos e animais de pequeno e médio porte",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/porco.png",
      },
      {
        name: "Fechamento provisório de obras ou áreas de contenção",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/reboco.png",
      },
    ],
    shortDescription:
      "A Mangueirão 16 Insul é uma solução robusta para quem busca um cercamento confiável no ambiente rural. Sua estrutura foi desenvolvida para suportar o uso diário, contribuindo para a contenção dos animais e oferecendo praticidade no manejo e na instalação.",
    description:
      "Página de exemplo para a Tela Mangueirão 16. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785874503/mangueir%C3%A3o-16_pzzsvl.png",
        alt: "Tela Mangueirão 16 (imagem provisória)",
      },
    ],
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc:
      "https://d2c3kthzw0ta10.cloudfront.net/mangueirao-16/mangueirao.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/mangueirao-16/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/mangueirao-16/video-reel-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/mangueirao-16/video-reel-3.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/mangueirao-16/video-reel-4.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/mangueirao-16/video-mangueirao-3d.mp4",
  }, //mangueirão-16
  {
    slug: "tela-mangueirao-18",
    name: "Tela Mangueirão 18",
    category: "Hexagonal",
    color: "#4c2a07",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/mangueirao-18.png",
    paragraph: 'Fio 1,24 mm, Aço galvanizado a fogo, Malha 3" - 7,6 cm',
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Cerca para propriedades rurais e residências",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/fazenda.png",
      },
      {
        name: "Tela para ovinos, suínos e animais de pequeno e médio porte",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/porco.png",
      },
      {
        name: "Fechamento provisório de obras ou áreas de contenção",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/reboco.png",
      },
    ],
    shortDescription:
      "A Mangueirão 18 Insul combina robustez e eficiência para aplicações que exigem um cercamento de alta resistência. Indicada para áreas de manejo e contenção animal, sua estrutura proporciona segurança e estabilidade, tornando-se uma opção confiável para o dia a dia no campo.",
    description:
      "Página de exemplo para a Tela Mangueirão 18. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785874482/mangueir%C3%A3o-18_phyphx.png",
        alt: "Tela Mangueirão 18 (imagem provisória)",
      },
    ],
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-mangueirao-18/mangueirao-18.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-mangueirao-18/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-mangueirao-18/video-18-3d.mp4",
  }, //mangueirão-18
  {
    slug: "tela-galinheiro-18",
    name: "Tela Galinheiro 18",
    category: "Hexagonal",
    color: "#ffa51b",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/galinheiro.png",
    paragraph: 'Fio 1,24 mm, Aço galvanizado a fogo, Malha 2" - 5,0 cm',
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Delimitação de áreas rurais e sítios",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-galinheiro/rural.png",
      },
      {
        name: "Ideal para galinheiros, viveiro e coelheiras",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-galinheiro/galinheiro.png",
      },
      {
        name: "Hortas e jardins",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-galinheiro/horta.png",
      },
    ],
    shortDescription:
      "A Galinheiro 18 Insul é uma opção prática para a criação e proteção de aves, oferecendo uma estrutura adequada para delimitar espaços com segurança. Sua malha proporciona boa resistência e facilita a montagem de cercamentos para galinhas e outros animais de pequeno porte.",
    description:
      "Página de exemplo para a Tela Galinheiro 18. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785875091/galinheiro_mng6xp.png",
        alt: "Tela Galinheiro 18 (imagem provisória)",
      },
    ],
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
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-galinheiro/galinheiro-18.mp4",
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-galinheiro/video-reel-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-galinheiro/video-reel-2.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-galinheiro/video-reel-3.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
    ],
    video3D:
      "https://d2c3kthzw0ta10.cloudfront.net/videos-galinheiro/video-galinheiro-3d.mp4",
  }, //galinheiro
  {
    slug: "tela-pinteiro-22",
    name: "Tela Pinteiro 22",
    category: "Hexagonal",
    color: "#199930",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/pinteiro.png",
    paragraph: 'Fio 0,71 mm, Aço galvanizado a fogo, Malha 1/2" - 2,50 cm',
    postSpacing: "até 4,5m",
    indicatedFor: [
      {
        name: "Criação de animais pequenos como pintos e codornas",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pinteiro/pinto.png",
      },
      {
        name: "Gaiola para pequenas aves",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pinteiro/gaiola.png",
      },
      {
        name: "Hortas e jardins",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-galinheiro/horta.png",
      },
    ],
    shortDescription:
      "Conteúdo de exemplo — especificações reais desta tela ainda não foram cadastradas.",
    description:
      "Página de exemplo para a Tela Pinteiro 22. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785875088/pinteiro_dbnpi6.png",
        alt: "Tela Pinteiro 22 (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //pinteiro
  {
    slug: "tela-viveiro-24",
    name: "Tela Viveiro 24",
    category: "Hexagonal",
    color: "#3697b5",
    src: "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/viveiro.png",
    paragraph: 'Fio 0,56 mm, Aço galvanizado a fogo, Malha 1/2" - 1,25 cm',
    postSpacing: "até 4,5m",
    indicatedFor: [
      {
        name: "Criação de animais pequenos como aves e pintos",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-viveiro/ave.png",
      },
      {
        name: "Gaiola para pequenas aves",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pinteiro/gaiola.png",
      },
      {
        name: "Proteção contra predadores e animais com doenças",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-viveiro/protecao.png",
      },
    ],
    shortDescription:
      "Conteúdo de exemplo — especificações reais desta tela ainda não foram cadastradas.",
    description:
      "Página de exemplo para a Tela Viveiro 24. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1785875089/viveiro_r4g5if.png",
        alt: "Tela Viveiro 24 (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //viveiro

  //Torção simples
  {
    slug: "tela-torcao-simples-galvanizada",
    name: "Torção Simples Galvanizada",
    category: "Torção Simples",
    color: "#bac3ca",
    src: "https://d2c3kthzw0ta10.cloudfront.net/tela-torcao-simples/torcao-card/galvanizado.png",
    paragraph: 'Fio 2,10 mm, Aço galvanizado a fogo, Malha em losango 3"(7,6cm)',
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Quadras, escolas, indústrias e estacionamentos",
        src: "https://d2c3kthzw0ta10.cloudfront.net/icos-torção-galvanizado/esportivo.png",
      },
      {
        name: "Divisões de pastos, plantações e jardins",
        src: "https://d2c3kthzw0ta10.cloudfront.net/icos-torção-galvanizado/jardins.png",
      },
      {
        name: "Terrenos urbanos e rurais com relevo",
        src: "https://d2c3kthzw0ta10.cloudfront.net/icos-torção-galvanizado/terreno-relevo.png",
      },
    ],
    shortDescription:
      "Tela torção simples galvanizada da Insul: resistente, versátil e ideal para cercamentos em áreas residenciais, comerciais, industriais e rurais. Produzida com arame galvanizado, oferece proteção contra corrosão, boa durabilidade e fácil instalação, garantindo segurança sem perder a visibilidade do ambiente.",
    description:
      "Página de exemplo para a Torção Simples Galvanizada. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "/images/tela-torcao-simples/torção-galvanizado.png",
        alt: "Torção Simples Galvanizada (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //torção-simples-galvanizada
  {
    slug: "tela-torcao-simples-pvc-verde",
    name: "Torção Simples PVC Verde",
    category: "Torção Simples",
    color: "#278348",
    src: "https://d2c3kthzw0ta10.cloudfront.net/tela-torcao-simples/torcao-card/pvc-verde.png",
    paragraph: 'Fio 2,80 mm, Aço galvanizado a fogo, Revestimento de PVC, Malha em losango 3"(7,6cm)',
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Cercamento em áreas verdes e litorâneas",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-onda.png",
      },
      {
        name: "Quadras e terreno com relevo",
        src: "https://d2c3kthzw0ta10.cloudfront.net/multymaxx/bola.png",
      },
      {
        name: "Cercamento de animais como suínos e aves",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/porco.png",
      },
    ],
    shortDescription:
      "Tela torção simples PVC verde da Insul: prática, resistente e com acabamento discreto para cercamentos residenciais, comerciais, industriais e rurais. Seu revestimento em PVC verde ajuda a proteger contra corrosão, aumenta a durabilidade e combina melhor com áreas externas, jardins e espaços arborizados.",
    description:
      "Página de exemplo para a Torção Simples PVC Verde. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "/images/tela-torcao-simples/torção-PVC-verde.png",
        alt: "Torção Simples PVC Verde (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //torção-simples-pvc-verde
  {
    slug: "tela-torcao-simples-pvc-azul",
    name: "Torção Simples PVC Azul",
    category: "Torção Simples",
    color: "#267bcc",
    src: "https://d2c3kthzw0ta10.cloudfront.net/tela-torcao-simples/torcao-card/pvc-azul.png",
    paragraph: 'Fio 2,80 mm, Aço galvanizado a fogo, Revestimento de PVC, Malha em losango 3"(7,6cm)',
    postSpacing: "até 4m",
    indicatedFor: [
      {
        name: "Cercamento em áreas verdes e litorâneas",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-pvc/ico-onda.png",
      },
      {
        name: "Quadras e terreno com relevo",
        src: "https://d2c3kthzw0ta10.cloudfront.net/multymaxx/bola.png",
      },
      {
        name: "Cercamento de animais como suínos e aves",
        src: "https://d2c3kthzw0ta10.cloudfront.net/ico-mangueirao/porco.png",
      },
    ],
    shortDescription:
      "Tela torção simples PVC azul da Insul: resistente, durável e com acabamento diferenciado para cercamentos residenciais, comerciais, industriais e esportivos. O revestimento em PVC azul ajuda a proteger contra corrosão, aumenta a vida útil da tela e traz um visual mais moderno e personalizado ao ambiente.",
    description:
      "Página de exemplo para a Torção Simples PVC Azul. A descrição completa, imagens e especificações técnicas reais serão adicionadas em breve.",
    gallery: [
      {
        src: "/images/tela-torcao-simples/torção-PVC-azul.png",
        alt: "Torção Simples PVC Azul (imagem provisória)",
      },
    ],
    features: [
      // {
      //   title: "",
      //   description: "",
      //   start: 0,
      //   end: 0,
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    videoSrc: "", // colar o link do vídeo aqui
    videoCards: [
      // {
      //   src: "",
      //   category: "",
      //   title: "",
      //   description: "",
      // },
    ], // trocar pelas informações reais (ver exemplo em tela-brava)
    video3D: "", // colar o link do vídeo 3D aqui
  }, //torção-simples-pvc-azul
];

const soldadasHexagonaisCardsPages: ProductCardData[] = soldadasHexagonais.map(
  (item) => ({
    src: item.src,
    title:
      item.category === "Soldada"
        ? "Tela Soldada"
        : item.category === "Hexagonal"
          ? "Tela Hexagonal"
          : "Tela Torção Simples",
    name: item.name,
    paragraph: item.paragraph,
    shortDescription: item.shortDescription,
    description: item.description,
    postSpacing: item.postSpacing,
    animals: [],
    indicatedFor: item.indicatedFor,
    to: `/soldadas-hexagonais/${item.slug}`,
  }),
);

// ============================================================================
// Arames galvanizados e PVC
// ============================================================================

const arameIndicatedFor = [
  {
    name: "Quadras, escolas, indústrias e estacionamentos",
    src: "/images/icos-torção-galvanizado/esportivo.png",
  },
  {
    name: "Divisões de pastos, plantações e jardins",
    src: "/images/icos-torção-galvanizado/jardins.png",
  },
  {
    name: "Terrenos urbanos e rurais com relevo",
    src: "/images/icos-torção-galvanizado/terreno-relevo.png",
  },
];

export const arameCards: ProductCardData[] = [
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/arames/imgs-arames-products/arame-BWG-10.png",
    title: "Arame Galvanizado",
    name: "BWG 10",
    paragraph: "Fio 10, Galvanizado a fogo, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "Encorpado e resistente, indicado para cercamentos e fixações que exigem maior firmeza, com proteção contra corrosão.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 10. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  }, //BWG10
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/arames/imgs-arames-products/arame-BWG-12.png",
    title: "Arame Galvanizado",
    name: "BWG 12",
    paragraph: "Fio 12, Galvanizado a fogo, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "Combina resistência e versatilidade para cercas, amarrações e aplicações gerais, com acabamento galvanizado.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 12. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  },//BWG12
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/arames/imgs-arames-products/arame-BWG-14.png",
    title: "Arame Galvanizado",
    name: "BWG 14",
    paragraph: "Fio 14, Galvanizado a fogo, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "Prático e versátil, oferece equilíbrio entre firmeza e facilidade de manuseio para amarrações e fixações.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 14. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  },//BWG14
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/arames/imgs-arames-products/arame-BWG-16.png",
    title: "Arame Galvanizado",
    name: "BWG 16",
    paragraph: "Fio 16, Galvanizado a fogo, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "Fino e fácil de manusear, indicado para amarrações leves e pequenos trabalhos, com proteção galvanizada.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 16. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  },//BWG16
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/arames/imgs-arames-products/arame-BWG-18.png",
    title: "Arame Galvanizado",
    name: "BWG 18",
    paragraph: "Fio 18, Galvanizado a fogo, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "De espessura fina, facilita trabalhos delicados, artesanato e amarrações leves, com acabamento que ajuda a proteger contra corrosão.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 18. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  },//BWG18
];

export const arameCardsPvc: ProductCardData[] = [
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-arames-pvc/arame-pvc-12.png",
    title: "Arame em PVC",
    name: "BWG 12",
    paragraph: "Fio 12, Aço galvanizado a fogo, Revestimento em PVC verde, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "Resistente e versátil, indicado para cercamentos e fixações, com revestimento em PVC que oferece proteção adicional contra corrosão.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 12 revestido em PVC verde. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  },//BWG12
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-arames-pvc/arame-pvc-14.png",
    title: "Arame em PVC",
    name: "BWG 14",
    paragraph: "Fio 14, Aço galvanizado a fogo, Revestimento em PVC verde, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "Equilibra firmeza e facilidade de manuseio para amarrações e cercamentos, com a proteção e o acabamento do PVC.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 14 revestido em PVC verde. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  },//BWG14
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-arames-pvc/arame-pvc-16.png",
    title: "Arame em PVC",
    name: "BWG 16",
    paragraph: "Fio 16, Aço galvanizado a fogo, Revestimento em PVC verde, Rolo de 25 kg",
    postSpacing: "até 4m",
    animals: [],
    indicatedFor: arameIndicatedFor,
    shortDescription:
      "Fino e fácil de manusear, indicado para amarrações leves e pequenos trabalhos, com revestimento em PVC para maior proteção.",
    description:
      "Página de exemplo para o Arame Galvanizado BWG 16 revestido em PVC verde. A descrição completa e as especificações técnicas reais serão adicionadas em breve.",
  },//BWG16
];


const soldadasHexagonaisCarouselSlugs = [
  "tela-brava",
  "tela-titan",
  "tela-morada-leve",
  "tela-multymax",
  "tela-mangueirao-16",
  "tela-galinheiro-22",
];
const soldadasHexagonaisCarousel: SoldadaHexagonalInfo[] =
  soldadasHexagonaisCarouselSlugs
    .map((slug) => soldadasHexagonais.find((s) => s.slug === slug))
    .filter((s): s is SoldadaHexagonalInfo => Boolean(s));

const soldadasHexagonaisReels: ShowcaseReel[] = [
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels-SH/video-reel-brava.mp4",
    name: "Tela Brava",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels-SH/video-reel-leve.mp4",
    name: "Tela Morada Leve",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels-SH/video-reel-soldada.mp4",
    name: "Telas Soldadas",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels-SH/video-reel-TMs.mp4",
    name: "Telas Moradas e Titan",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels-SH/mangueirao-18.mp4",
    name: "Tela Mangueirão 18",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-reels-SH/video-reel-hexagonal.mp4",
    name: "Telas Hexagonais",
  },
];

// ============================================================================
// Conteudo diferente
// ============================================================================

const roomDetails: RoomDetail[] = [
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-products/cercas-prontas.jpg",
    name: "Cercas Prontas(rurais)",
    to: "/cercas-prontas",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-products/gradil.jpg",
    name: "Gradil",
    to: "/gradil",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-products/telas.jpg",
    name: "Telas e Alambrados",
    to: "/soldadas-hexagonais",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-products/acessorios.jpg",
    name: "Acessórios",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-products/arames.jpg",
    name: "Arames",
    to: "/arames",
  },
];

const gradilGallery: GalleryImage[] = Array.from({ length: 9 }, (_, i) => ({
  src: `https://d2c3kthzw0ta10.cloudfront.net/img_gradil/img-gradil-${i + 1}.jpg`,
  alt: `Gradil Insul instalado ${i + 1}`,
}));

export interface Gradil3DShowcaseItem {
  title: string;
  description: string;
  videoSrc: string;
}

export interface GradilModelInfo {
  slug: string;
  name: string;
  color: string;
  src: string;
  tagline: string;
  paragraph: string;
  postSpacing: string;
  indicatedFor: SoldadaIndicatedUse[];
  shortDescription: string;
  description: string;
  videoSrc?: string;
  features?: CercaFeature[];
  videoCards?: VideoCardData[];
  showcase3D?: Gradil3DShowcaseItem[];
  gallery: GalleryImage[];
}

// ============================================================================
// Gradil
// ============================================================================

const gradilModels: GradilModelInfo[] = [
  {
    slug: "g4",
    name: "Gradil G4",
    color: "#091f32",
    src: "https://d2c3kthzw0ta10.cloudfront.net/Gradil_Cores/INSUL_00_GRADIL_VERDE_placas.webp",
    tagline:
      "Uma solução prática, acessível e inteligente para fechamentos que necessitem de maior segurança e estética.",
    paragraph:
      "Bitola 4,0 mm, Malha 5 cm x 20 cm, Aço soldado, Galvanizado + pintura",
    postSpacing: "2,5 m",
    indicatedFor: [
      {
        name: "Residências",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/casa.png",
      },
      {
        name: "Terrenos",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/terreno.png",
      },
      {
        name: "Indústrias",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/industria.png",
      },
      {
        name: "Canil",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/cao-medio-pequeno.png",
      },
    ],
    shortDescription:
      "Painel de aço soldado modular para cercamento residencial e comercial leve. Instalação rápida, boa visibilidade e acabamento durável.",
    description:
      "O Gradil G4 Insul é um sistema de cercamento metálico composto por painéis de aço galvanizado, com acabamento em pintura eletrostática, desenvolvido para oferecer segurança, resistência mecânica e excelente durabilidade em ambientes internos e externos. Sua estrutura proporciona um cercamento seguro sem comprometer a visibilidade do ambiente, além de apresentar um acabamento moderno e de baixa necessidade de manutenção, tornando-se uma solução prática e eficiente para diversos tipos de empreendimentos.\n\nO Gradil G4 é indicado para o fechamento e a proteção de áreas residenciais, condomínios, indústrias, empresas, centros comerciais, escolas, estacionamentos, praças, parques, áreas públicas e demais locais que necessitem de delimitação e controle de acesso. Além de sua elevada resistência à corrosão e às intempéries, o sistema permite instalação rápida e pode ser adaptado a diferentes configurações de terreno, atendendo tanto a projetos de segurança quanto a soluções que valorizam a estética e a integração com o ambiente.\n\nO sistema modular do Gradil G4 é composto por painéis pré-fabricados que se fixam a mourões metálicos por meio de fixadores específicos, dispensando soldas ou processos complexos no local da obra. Essa praticidade reduz significativamente o tempo de instalação e a necessidade de mão de obra especializada, sem abrir mão do acabamento uniforme e da rigidez estrutural que caracterizam a linha Gradil Insul.\n\nPara revendedores e varejistas, o Gradil G4 representa uma porta de entrada estratégica na linha de gradis Insul, unindo preço competitivo, alta demanda em projetos residenciais e comerciais e a confiança da marca Insul. Com padrão de qualidade reconhecido no mercado, o produto amplia o mix de soluções de cercamento oferecidas e fortalece a fidelização de clientes que buscam segurança aliada à estética.",
    videoSrc: "ttps://d2c3kthzw0ta10.cloudfront.net/campeira-maxx.mp4", // colar o link do vídeo de instalação/malha sobre o Gradil G4
    features: [
      {
        title: "Instalação",
        description:
          "Painéis modulares fixados a mourões metálicos com fixadores específicos, sem soldas nem processos complexos na obra.",
        start: 0,
        end: 5, // ajustar quando o vídeo real for adicionado
      },
      {
        title: "Malha superior e inferior",
        description:
          "Malha soldada de 5 cm x 20 cm em aço galvanizado com pintura eletrostática, unindo resistência mecânica e acabamento uniforme.",
        start: 5,
        end: 10, // ajustar quando o vídeo real for adicionado
      },
    ],
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-3.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-reel-g4.mp4",
        category: "ECONOMIA",
        title: "Instalação Rápida",
        description:
          "Espaçamento maior entre mourões gera até 50% de economia.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-5.mp4",
        category: "PROTEÇÃO",
        title: "Malha Bimodal",
        description:
          "Fechada embaixo para contenção, aberta em cima para economia.",
      },
    ],
    showcase3D: [
      {
        title: "Veja o vídeo do Gradil G4 em detalhes",
        description:
          "Gire, pause e explore de perto o acabamento da malha soldada e da pintura eletrostática que garantem durabilidade e um visual moderno ao Gradil G4.",
        videoSrc:
          "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-3d-g4-1.mp4",
      },
      {
        title: "Manual de como instalar o Gradil",
        description:
          "Confira o sistema de fixação aos mourões metálicos, pensado para reduzir o tempo de instalação sem abrir mão da rigidez estrutural do painel.",
        videoSrc:
          "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-3d-g4-2.mp4",
      },
    ],
    gallery: gradilGallery,
  },
  {
    slug: "g5",
    name: "Gradil G5",
    color: "#646464",
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-outromodelo-gradil/img-gradil-G5.png",
    tagline:
      "Gradil G5 combina resistência, estética e praticidade, atendendo às mais variadas necessidades.",
    paragraph:
      "Bitola 4,8 mm, Malha 5 cm x 20 cm, Aço soldado, Galvanizado + pintura",
    postSpacing: "2,5 m",
    indicatedFor: [
      {
        name: "Residências",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/casa.png",
      },
      {
        name: "Terrenos",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/terreno.png",
      },
      {
        name: "Indústrias",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/industria.png",
      },
      {
        name: "Canil",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/cao-medio-pequeno.png",
      },
    ],
    shortDescription:
      "Painel intermediário com maior bitola, indicado para condomínios, empresas e áreas que exigem mais robustez sem abrir mão do design.",
    description:
      "O Gradil G5 Insul é um sistema de cercamento metálico composto por painéis de aço galvanizado, com acabamento em pintura eletrostática, desenvolvido para oferecer segurança, resistência mecânica e excelente durabilidade em ambientes internos e externos. Com bitola de 4,8 mm, superior à do Gradil G4, sua estrutura proporciona um cercamento ainda mais robusto sem comprometer a visibilidade do ambiente, além de apresentar um acabamento moderno e de baixa necessidade de manutenção, tornando-se uma solução prática e eficiente para diversos tipos de empreendimentos.\n\nO Gradil G5 é indicado para o fechamento e a proteção de condomínios, indústrias, empresas, centros comerciais, escolas, estacionamentos, praças, parques, áreas públicas e demais locais que necessitem de delimitação e controle de acesso com um reforço adicional de segurança. Além de sua elevada resistência à corrosão e às intempéries, o sistema permite instalação rápida e pode ser adaptado a diferentes configurações de terreno, atendendo tanto a projetos de segurança quanto a soluções que valorizam a estética e a integração com o ambiente.\n\nO sistema modular do Gradil G5 é composto por painéis pré-fabricados que se fixam a mourões metálicos por meio de fixadores específicos, dispensando soldas ou processos complexos no local da obra. Essa praticidade reduz significativamente o tempo de instalação e a necessidade de mão de obra especializada, sem abrir mão do acabamento uniforme e da rigidez estrutural que caracterizam a linha Gradil Insul.\n\nPara revendedores e varejistas, o Gradil G5 representa uma opção intermediária estratégica na linha de gradis Insul, unindo maior resistência, alta demanda em projetos comerciais e industriais e a confiança da marca Insul. Com padrão de qualidade reconhecido no mercado, o produto amplia o mix de soluções de cercamento oferecidas e fortalece a fidelização de clientes que buscam segurança reforçada aliada à estética.",
    videoSrc: "ttps://d2c3kthzw0ta10.cloudfront.net/campeira-maxx.mp4", // colar o link do vídeo de instalação/malha sobre o Gradil G5
    features: [
      {
        title: "Instalação",
        description:
          "Painéis modulares fixados a mourões metálicos com fixadores específicos, sem soldas nem processos complexos na obra.",
        start: 0,
        end: 5, // ajustar quando o vídeo real for adicionado
      },
      {
        title: "Malha superior e inferior",
        description:
          "Malha soldada de 5 cm x 20 cm em aço galvanizado bitola 4,8 mm com pintura eletrostática, unindo resistência mecânica reforçada e acabamento uniforme.",
        start: 5,
        end: 10, // ajustar quando o vídeo real for adicionado
      },
    ],
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-3.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-reel-g4.mp4",
        category: "ECONOMIA",
        title: "Instalação Rápida",
        description:
          "Espaçamento maior entre mourões gera até 50% de economia.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-5.mp4",
        category: "PROTEÇÃO",
        title: "Malha Bimodal",
        description:
          "Fechada embaixo para contenção, aberta em cima para economia.",
      },
    ],
    showcase3D: [
      {
        title: "Veja o vídeo do Gradil G5 em detalhes",
        description:
          "Gire, pause e explore de perto o acabamento da malha soldada e da pintura eletrostática que garantem durabilidade e um visual moderno ao Gradil G5.",
        videoSrc:
          "https://d2c3kthzw0ta10.cloudfront.net/videos-g5/video-3d-g5.mp4",
      },
      {
        title: "Manual de como instalar o Gradil",
        description:
          "Confira o sistema de fixação aos mourões metálicos, pensado para reduzir o tempo de instalação sem abrir mão da rigidez estrutural do painel.",
        videoSrc:
          "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-3d-g4-2.mp4",
      },
    ],
    gallery: gradilGallery,
  },
  {
    slug: "g12",
    name: "Gradil G12",
    color: "#4b460b",
    src: "https://d2c3kthzw0ta10.cloudfront.net/img-outromodelo-gradil/img-gradil-G12.png",
    tagline:
      "Garante segurança dos processos, das pessoas e das máquinas e é muito prático de instalar.",
    paragraph:
      "Bitola 4,8 mm, Malha 2,5 cm x 20 cm, Aço soldado reforçado, Alta resistência",
    postSpacing: "2,5 m",
    indicatedFor: [
      {
        name: "Indústrias",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/industria.png",
      },
      {
        name: "Máquinas",
        src: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/maquina.png",
      },
    ],
    shortDescription:
      "Painel de alta resistência com malha mais fechada, desenvolvido para uso industrial e áreas que exigem o máximo em segurança e durabilidade.",
    description:
      "O Gradil G12 Insul é a solução mais robusta da linha, com painéis de aço soldado reforçado e acabamento em pintura eletrostática, desenvolvido para oferecer o máximo em segurança, resistência mecânica e durabilidade em ambientes industriais e de alta exigência. Sua malha mais fechada, de 2,5 cm x 20 cm, dificulta a escalada e a passagem de objetos, proporcionando um cercamento robusto sem abrir mão do acabamento moderno e de baixa necessidade de manutenção.\n\nO Gradil G12 é indicado para o fechamento e a proteção de indústrias, centros logísticos, portões e perímetros, subestações, áreas de processos críticos e demais locais que exigem controle de acesso rigoroso. Além de sua elevada resistência à corrosão e às intempéries, o sistema permite instalação rápida e pode ser adaptado a diferentes configurações de terreno, atendendo projetos que priorizam segurança máxima sem abrir mão da estética.\n\nO sistema modular do Gradil G12 é composto por painéis pré-fabricados que se fixam a mourões metálicos por meio de fixadores específicos, dispensando soldas ou processos complexos no local da obra. Essa praticidade reduz significativamente o tempo de instalação e a necessidade de mão de obra especializada, sem abrir mão do acabamento uniforme e da rigidez estrutural que caracterizam a linha Gradil Insul.\n\nPara revendedores e varejistas, o Gradil G12 representa a opção premium da linha de gradis Insul, unindo resistência máxima, alta demanda em projetos industriais e a confiança da marca Insul. Com padrão de qualidade reconhecido no mercado, o produto amplia o mix de soluções de cercamento oferecidas e fortalece a fidelização de clientes que buscam a máxima segurança aliada à estética.",
    videoSrc: "ttps://d2c3kthzw0ta10.cloudfront.net/campeira-maxx.mp4", // colar o link do vídeo de instalação/malha sobre o Gradil G12
    features: [
      {
        title: "Instalação",
        description:
          "Painéis modulares fixados a mourões metálicos com fixadores específicos, sem soldas nem processos complexos na obra.",
        start: 0,
        end: 5, // ajustar quando o vídeo real for adicionado
      },
      {
        title: "Malha superior e inferior",
        description:
          "Malha soldada de 2,5 cm x 20 cm em aço reforçado com pintura eletrostática, unindo alta resistência mecânica e acabamento uniforme.",
        start: 5,
        end: 10, // ajustar quando o vídeo real for adicionado
      },
    ],
    videoCards: [
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-1.mp4",
        category: "MATERIAL",
        title: "Aço Carbono",
        description:
          "Única alambrado no Brasil com arames de 650kgf de carga de ruptura.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-2.mp4",
        category: "ESTRUTURA",
        title: "Nó em X",
        description:
          "Nó forjado que não deixa rebarbas e garante segurança contra impactos.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-3.mp4",
        category: "TERRENO",
        title: "Qualquer Relevo",
        description:
          "Acompanha aclives e declives sem dificuldade na instalação.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-reel-g4.mp4",
        category: "ECONOMIA",
        title: "Instalação Rápida",
        description:
          "Espaçamento maior entre mourões gera até 50% de economia.",
      },
      {
        src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gradil-para/video-gradil-5.mp4",
        category: "PROTEÇÃO",
        title: "Malha Bimodal",
        description:
          "Fechada embaixo para contenção, aberta em cima para economia.",
      },
    ],
    showcase3D: [
      {
        title: "Veja o vídeo do Gradil G12 em detalhes",
        description:
          "Gire, pause e explore de perto o acabamento da malha soldada e da pintura eletrostática que garantem durabilidade e um visual moderno ao Gradil G12.",
        videoSrc:
          "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-3d-g4-1.mp4",
      },
      {
        title: "Manual de como instalar o Gradil",
        description:
          "Confira o sistema de fixação aos mourões metálicos, pensado para reduzir o tempo de instalação sem abrir mão da rigidez estrutural do painel.",
        videoSrc:
          "https://d2c3kthzw0ta10.cloudfront.net/videos-g4/video-3d-g4-2.mp4",
      },
    ],
    gallery: gradilGallery,
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

const videoShowcaseMain =
  "https://d2c3kthzw0ta10.cloudfront.net/videos-home/insul.mp4";

const videoShowcaseReels: ShowcaseReel[] = [
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-home/video_1.mp4",
    name: "reel-1",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-home/video_2.mp4",
    name: "reel-2",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-home/video_3.mp4",
    name: "reel-3",
  },
];

export {
  cercasProntas,
  cercasProntasReels,
  soldadasHexagonais,
  soldadasHexagonaisCardsPages,
  soldadasHexagonaisCarousel,
  soldadasHexagonaisReels,
  roomDetails,
  gradilGallery,
  gradilModels,
  heroImage,
  productCategories,
  videoShowcaseMain,
  videoShowcaseReels,
};



