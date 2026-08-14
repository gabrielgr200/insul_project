import type { Dictionary } from "./pt";
import type { CercaProntaTranslation } from "../utils/localizeCerca";

const en: Dictionary = {
  nav: {
    inicio: "Home",
    produtos: "Products",
    catalogo: "Catalog",
    industria: "Industry",
    contato: "Contact",
    lojaVirtual: "Online store",
  },
  aria: {
    abrirMenu: "Open menu",
    voltar: "Back",
    fecharMenu: "Close menu",
    idioma: "Select language",
  },
  hero: {
    firme: "STRONG",
    duradouro: "DURABLE",
    subtitulo:
      "Insul is a leader in manufacturing meshes, railings, fencing and ready-made fences, offering the widest product mix on the market.",
    cta: "Our products",
    imagemAlt: "Rolls of Insul welded mesh",
  },
  home: {
    numerosTitulo: "Our numbers and partners",
  },
  partners: {
    area: "m² factory area",
    telas: "m² of mesh / month",
    anos: "Years in the market",
    toneladas: "Tons processed / month",
  },
  products: {
    tituloLinha1: "OUR",
    tituloLinha2: "PRODUCTS",
    rooms: {
      "Cercas Prontas(rurais)": "Ready-made Fences (rural)",
      Gradil: "Railing",
      "Telas e Alambrados": "Meshes and Fencing",
      Acessórios: "Accessories",
      Arames: "Wires",
    },
  },
  industry: {
    label: "Discover our history",
    titulo: "THE INDUSTRY",
    texto:
      "We specialize in manufacturing a wide line of wire-based products, such as: hexagonal meshes, welded meshes, chain-link fencing, ready-made fences, railings and accessories for fencing in general - meeting the needs of the rural, residential, industrial and construction sectors.",
    timeline: [
      {
        title: "Year 2011",
        description:
          "Started manufacturing the first single-twist meshes in a rented 200 m² warehouse",
      },
      {
        title: "Year 2012",
        description:
          "Moved to a rented 420 m² warehouse and received the first imported machine (3” Hexagonal Mesh)",
      },
      {
        title: "Year 2013",
        description:
          "Acquisition of automatic chain-link fencing machines from Maxtelas and expansion of the production and sales team.",
      },
      {
        title: "Year 2015",
        description:
          "Moved to a larger (rented) factory, with 900 m² of production area, and started manufacturing welded meshes.",
      },
      {
        title: "Year 2018",
        description:
          "Built and moved to Insul's first own facility, with 1600 m², expanded the welded mesh line and started manufacturing ready-made fences (Campeira ready-made fence).",
      },
      {
        title: "Year 2020",
        description:
          "Increased production area to install new hexagonal machines and stock of finished products.",
      },
      {
        title: "Year 2021",
        description:
          "Industry expansion with the installation of European welded-mesh machines and the start of railing manufacturing.",
      },
      {
        title: "Year 2024",
        description:
          "Installation of an automatic production and painting line for railings, plus the arrival of another European machine for manufacturing welded meshes.",
      },
    ],
  },
  textReveal: {
    paragrafos: [
      "Since 2010, Insul Arames e Telas has invested in cutting-edge technology to offer high-quality products and ensure the satisfaction and trust of our customers.",
      "For us, quality is not a goal, it is a daily practice. We remain committed to being a benchmark in the sector and to contributing to the sustainable growth of our customers and partners.",
    ],
  },
  distribution: {
    label: "Distribution centers",
    tituloLinha1: "SHIPPING TO",
    tituloLinha2: "ALL OF BRAZIL",
    texto:
      "With our distribution centers in Rio Grande do Sul and Minas Gerais, we reach every state in the country quickly and with guaranteed delivery.",
    cardLabel: "Distribution center",
    centers: [
      { state: "Rio Grande do Sul", city: "Cachoeira do Sul" },
      { state: "Minas Gerais", city: "Divinópolis" },
    ],
  },
  book: {
    label: "Meshes and accessories",
    tituloLinha1: "PRODUCT",
    tituloLinha2: "CATALOG",
    texto:
      "See our product catalog and learn in detail about our entire product line.",
    tooltip: "Click the button to choose a product",
    interessado: "Interested?",
    ctaSaibaMais: "Click here to learn more",
    ver: "View",
    pagina: "Page",
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    titulo: "FAQ",
    subtitulo:
      "Everything you need to know about our products, materials and company.",
    items: [
      {
        question: "What do I need to become an Insul reseller?",
        answer:
          "You just need a valid CNPJ (company registration) in the wholesale, industry or resale of construction materials, hardware or agricultural products segment, and to contact our service team.",
      },
      {
        question: "Does Insul serve all of Brazil?",
        answer:
          "Yes, we serve all of Brazil, though with a greater focus on the South and Southeast regions. For customers in other regions of the country, we generally ship to São Paulo, where the goods are re-dispatched by a carrier of the customer's choice, or the material can be picked up at the factory.",
      },
      {
        question: "Does Insul serve construction companies directly?",
        answer:
          "Yes, we serve construction companies throughout Brazil that need our products; just contact our service team.",
      },
      {
        question: "Does Insul sell to end consumers (individuals)?",
        answer:
          "Yes, for that we created our online store, Casa das Cercas, with special service for every type of end consumer. Visit: www.casadascercas.com.br.",
      },
      {
        question: "What raw material is used?",
        answer:
          "Insul basically uses top-quality domestic raw materials and has Gerdau as its main supplier, being its largest customer of galvanized wire in the South of Brazil.",
      },
      {
        question: "What is the warranty on Insul products?",
        answer:
          "All products have a factory warranty ranging from 5, 2 or 1 year(s), provided they are used correctly in a suitable environment. Regardless of this, hot-dip galvanized meshes are, for the most part, made to last more than 15 years in non-coastal environments.",
      },
    ],
  },
  footer: {
    descricao:
      "We manufacture meshes, fences and railings with industrial quality and delivery throughout Brazil.",
    voltarTopo: "Back to top",
    direitos: "All rights reserved.",
    cols: {
      produtos: "PRODUCTS",
      empresa: "COMPANY",
      contato: "CONTACT",
      loja: "STORE",
    },
    links: {
      telasSoldadas: "Welded Meshes",
      telasHexagonais: "Hexagonal Meshes",
      cercasProntas: "Ready-made Fences",
      gradil: "Railing",
      arames: "Wires",
      inicio: "Home",
      industria: "Industry",
      distribuicao: "Distribution",
      duvidas: "FAQ",
      catalogo: "Catalog",
    },
  },
  loader: {
    garantia: "OUR GUARANTEE",
    palavras: ["QUALITY", "PROTECTION", "STRENGTH", "DURABILITY", "SECURITY"],
  },
  chatbot: {
    tooltip: "Chat with Guilherme",
    abrirAria: "Chat with Guilherme",
    fecharAria: "Close chat",
    consultor: "Insul Consultant",
    inicial:
      "Hi, I'm Guilherme! 👋 I'm part of the Insul team and I can help you with questions about our fences, deliveries and distribution. Ask away!",
    placeholder: "Write your question...",
    enviarAria: "Send message",
    pills: [
      "Mesh for kennels",
      "Mesh for industry",
      "How the railing works",
    ],
    newsletter: {
      cta: "Want to receive news and promotions?",
      eyebrow: "Newsletter",
      titulo: "Receive news and promotions",
      texto:
        "Sign up below to be the first to receive all news and promotions",
      nome: "Name",
      email: "Email",
      celular: "Phone with area code",
      enviando: "Sending...",
      enviar: "Get updates!",
      sucesso: "Registration sent! You'll receive our news soon.",
      erroGenerico: "Could not send. Please try again.",
      erroConexao: "Connection failed. Please try again.",
      fecharAria: "Close",
    },
    fallback: [
      "Good question! I can give you more details about our fences, deliveries or distribution centers. What would you like to know?",
      "I'm still learning to answer everything, but our sales team can help you with that directly through Insul's contact channels.",
    ],
    rules: [
      {
        keywords: [
          "shipping",
          "delivery",
          "deadline",
          "deliver",
          "arrive",
          "freight",
        ],
        reply:
          "We ship throughout Brazil from our distribution centers in Rio Grande do Sul (Cachoeira do Sul) and Minas Gerais (Divinópolis). Delivery time varies by state, but we always look for the fastest route to you.",
      },
      {
        keywords: [
          "fence",
          "product",
          "fenix",
          "phoenix",
          "campeira",
          "model",
          "catalog",
          "catalogue",
        ],
        reply:
          "We have several fence lines, such as the Fênix and the Campeira, with options for different types of property. Take a look at the products section on this page or tell me what you need and I'll recommend the right model.",
      },
      {
        keywords: ["price", "cost", "value", "quote", "how much"],
        reply:
          "Prices vary depending on the model and quantity. For an accurate quote, talk to our sales team via WhatsApp or the contact form — that way we can calculate exactly for your region.",
      },
      {
        keywords: [
          "hi",
          "hello",
          "hey",
          "good morning",
          "good afternoon",
          "good evening",
        ],
        reply: "Hello! How are you? Tell me what you'd like to know about Insul.",
      },
      {
        keywords: ["thanks", "thank you", "thx"],
        reply: "You're welcome! If you have any other questions, just ask. 😉",
      },
      {
        keywords: ["kennel", "dog"],
        reply:
          "For kennels, we recommend welded meshes like the Tela Titan and Tela Morada — strong and safe to keep small and medium dogs. Take a look at the welded and hexagonal meshes section on the site!",
      },
      {
        keywords: ["industry", "industrial", "factory"],
        reply:
          "For industrial use, we have sturdier welded meshes, like the Tela Titan and Tela Morada, ideal for fencing industries, logistics centers and parking lots — plus railings and ready-made fences for larger areas.",
      },
      {
        keywords: ["railing", "gradil"],
        reply:
          "The Railing (Gradil) is a modular welded steel panel (available in G4, G5 and G12 models), fixed with ratchets on posts — quick installation and great strength. Ideal for industries, condominiums and commercial areas.",
      },
    ],
  },

  gradil: {
    hero: {
      title1: "Security that surrounds",
      title2: "your property",
      subtitleLead: "G4, G5 and G12 models",
      subtitleRest:
        " — modular welded steel panel, quick installation and high strength.",
      scroll: "scroll down",
      galleryAlt: "Insul fence panel installed",
    },
    showcase: {
      title: "Fence panel",
      left: "The Insul fence panel line: modular welded steel panels to enclose and protect your space.",
      modelsLead: "Models ",
      models: "G4, G5 and G12",
      modelsRest:
        " — from light residential to high-strength industrial, with quick installation and a durable finish.",
      securityLead:
        "Security that adds value to industries, condominiums and homes, without compromising on ",
      design: "design",
      words: ["Design", "Quality", "Strength"],
    },
    cards: [
      { title: "Mesh", description: "5 cm x 20 cm | 2.5 cm x 20 cm | 2.0 cm x 20 cm" },
      { title: "Heights", description: "1.03 m | 1.53 m | 2.03 m | 2.43 m" },
      { title: "Length", description: "2.5 m" },
      { title: "Wire gauge", description: "4.0 mm | 4.8 mm" },
    ],
    reveal:
      "Designed to provide safety and durability, the fence panels are suited to different types of terrain and applications. A practical and efficient solution to protect your property, ensuring strength and a quality finish.",
    process: {
      label: "Production process",
      title: "Production process",
      capacityLead: "Production capacity per shift of ",
      capacityM2: "4,000 m²",
      capacityMid: " of fence panels ",
      capacityModels: "G4, G5 or G12",
      steps: [
        { num: "01", title: "Process", desc: "Welding / bending and storage process, 100% automated" },
        { num: "02", title: "Treatment", desc: "Pre-paint immersion treatment with tri-cationic phosphating" },
        { num: "03", title: "Paint line", desc: "Erzinger paint line, fully automated and robotized with Wagner guns" },
        { num: "04", title: "Paints", desc: "Premium Polyester paints with a longer-lasting gloss and resistance warranty." },
      ],
    },
    colors: {
      label: "Residential Line | Colors on demand",
      title1: "Sizes,",
      title2: "measures and colors",
      descriptions: [
        "Raw material: GERDAU galvanized wire with a 70 g/m² hot-dip zinc layer",
        "Premium polyester paints from WEG or MEKAL, with a longer-lasting gloss and resistance warranty.",
      ],
      names: { PRETO: "Black", VERDE: "Green", BRANCO: "White", AMARELO: "Yellow", AZUL: "Blue", CINZA: "Gray" },
    },
    products: {
      title: "Fence panel",
      cards: [
        {
          name: "G4 Panel",
          paragraph: "4.0 mm gauge, 5 cm x 20 cm mesh, welded steel, galvanized + painted",
          shortDescription:
            "Modular welded steel panel for light residential and commercial fencing. Quick installation, good visibility and a durable finish.",
          description:
            "The Insul G4 Panel is a modular welded steel panel, ideal for homes, condominiums and commercial areas. It combines lightness, design and safety, with quick installation and low maintenance.",
          indicated: ["Homes", "Condominiums"],
        },
        {
          name: "G5 Panel",
          paragraph: "4.8 mm gauge, 5 cm x 20 cm mesh, welded steel, galvanized + painted",
          shortDescription:
            "Intermediate panel with a heavier gauge, recommended for condominiums, businesses and areas that require more robustness without giving up design.",
          description:
            "The Insul G5 Panel increases strength with heavier-gauge wire while keeping the modular quick-install system. Perfect for condominiums, businesses and spaces that demand more security.",
          indicated: ["Condominiums", "Industries"],
        },
        {
          name: "G12 Panel",
          paragraph: "4.8 mm gauge, 2.5 cm x 20 cm mesh, reinforced welded steel, high strength",
          shortDescription:
            "High-strength panel with a tighter mesh, developed for industrial use and areas that demand the utmost in security and durability.",
          description:
            "The Insul G12 Panel is the most robust solution in the line, with a tight mesh and reinforced structure. Recommended for industries, logistics centers and perimeters that require high security.",
          indicated: ["Industries", "Gates and perimeters"],
        },
      ],
    },
    pipes: {
      label: "Residential Line",
      title1: "Posts",
      title2: "and accessories",
      text: "Raw material: Gerdau galvanized wire with a 70 g/m² hot-dip zinc layer",
      imgAlt: "Post with cap, clamp, screw and end cap",
      cards: [
        { title: "Cap", desc: "Top finish that protects the inside of the post." },
        { title: "Clamp", desc: "Fastens the panel to the post firmly and easily." },
        { title: "Screw", desc: "Hex head with sealing washer for a secure fastening." },
        { title: "End cap", desc: "Finishes the assembly, hiding the screw." },
      ],
      features: [
        ["Sheet thickness", "Posts up to 2.08 m: 125 mm.", "Posts from 2.48 m: 145 mm."],
        ["Rectangular metal", "posts, 4x6 cm."],
        ["Accessories with", "anti-UV protection."],
        ["Hot-dip galvanized", "post with an average", "zinc layer of 275 g/m."],
        ["Micro-crystalline", "tri-cationic phosphating"],
        ["Electrostatic", "Thermo-plastic polyester paint."],
      ],
    },
    coating: {
      label: "Residential Line",
      title: "Wire coating",
      subtitle:
        "Raw material: Gerdau galvanized wire with a 70 g/m² hot-dip zinc layer",
      prev: "Previous layer",
      next: "Next layer",
      layers: ["Electrostatic paint", "Tri-cationic phosphate", "Hot-dip galvanizing", "Gerdau steel"],
    },
    guarantee: {
      title1: "Proven quality",
      title2: "with a 5-year warranty!",
      note: "*in non-coastal environments",
      side: "Premium Polyester paints from top brands, with a longer-lasting gloss and resistance warranty.",
    },
    other: {
      title: "Other products",
      productTitle: "Ready-made fence",
      products: [{ name: "Fênix" }, { name: "Campeira" }, { name: "Campeira Boi" }],
    },
  },

  searchShowcase: {
    query: "Can I fence my property fast?",
    suggestions: [
      "Meet Insul. The company that makes wire mesh and fencing for the field",
      "Insul delivers ready-made fences for any property.",
    ],
    mostSearched: "Most searched",
  },

  productCard: {
    likedFence: "Liked this fence?",
    seeDetails: "See details",
    postSpacingLabel: "Post spacing",
    indicatedFor: "Recommended for",
  },

  videoCardCarousel: {
    headingLead: "Watch some videos about the",
    unmuteAria: "Unmute",
    muteAria: "Mute",
  },

  similarProducts: {
    heading: "Similar products",
  },

  animalChart: {
    capacityHeading: "containment capacity per animal",
    collidingWithFence: "colliding with the fence",
    escapingFence: "trying to escape through the fence",
  },

  animalNames: {
    Bovino: "Cattle",
    Bovinos: "Cattle",
    Caprino: "Goat",
    Caprinos: "Goats",
    Ovinos: "Sheep",
    "Suínos": "Pigs",
    Javaporco: "Wild boar",
    Aves: "Birds",
    "Cães e silvestres": "Dogs & wildlife",
    "Cães": "Dogs",
    Capivara: "Capybara",
    Avestruz: "Ostrich",
    Galinha: "Chicken",
    Ganso: "Goose",
  },

  cercasProntasPage: {
    cardPostTitle: "See more about our ready-made fences",
    cardPostDescriptionLead: "Specifications and details: ",
    cardPostDescriptionRest:
      "take a close look at how each Insul ready-made fence performs in the field.",
  },

  cercasProntas: {
    fenix: {
      title: "Ready-made Fence (rural)",
      paragraph:
        "2.50 mm wire, Hot-dip galvanized steel, Two-stage mesh, X-Knot (stiff stay)",
      shortDescription:
        "Single-twist mesh in high-carbon steel, with installation up to 6x faster and up to 50% fewer posts. Security and durability for any property.",
      paragraphs: [
        "The Fênix Insul Chain-Link Fence is a single-twist mesh fencing solution, made from high-carbon steel wire that delivers greater mechanical strength, durability and performance. Designed to offer security and reliability, it's ideal for projects that demand efficient, long-lasting fencing.",
        "Its construction system allows installation up to 6 times faster than conventional fencing, reducing project time and boosting productivity. Its structure also allows for up to 50% fewer posts, saving on materials without compromising the fence's strength.",
        "The Fênix Insul Chain-Link Fence is recommended for fencing homes, condominiums, businesses, industries, schools, sports courts, small farms, country properties, public areas and any other property that needs a practical, safe, high-performance solution.",
        "Combining technology, strength and excellent value for money, the Fênix Insul Chain-Link Fence offers wide visibility, low maintenance needs and high durability, making it a smart choice for projects that want fast installation, savings and quality in a single fencing system.",
      ],
      animals: [
        "Cattle",
        "Capybaras",
        "Dogs",
        "Goats",
        "Ostriches",
        "Sheep",
        "Pigs",
        "Wild boars",
        "Chickens",
        "Geese",
      ],
      hotspot: {
        title: "Cerca Fênix Insul",
        description:
          "High-strength wire with a galvanized finish, ideal for large properties.",
      },
      features: [
        {
          title: "2.50 mm Wire",
          description:
            "Heavy-gauge wire, built to withstand tension and impact in demanding fencing applications.",
        },
        {
          title: "Installation",
          description:
            "Mesh pre-stretched between posts, ready to install on any type of terrain.",
        },
        {
          title: "Two-stage mesh",
          description:
            "Smaller openings at the base and larger ones at the top, combining effective containment with visibility.",
        },
        {
          title: "X-Knot (stiff stay)",
          description:
            "Locks the wires in an X pattern, keeping the structure's tension and rigidity for longer.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Carbon Steel",
          description:
            "The only chain-link fencing in Brazil with wires rated for a 650 kgf breaking load.",
        },
        {
          category: "STRUCTURE",
          title: "X-Knot",
          description:
            "Forged knot that leaves no burrs and ensures safety against impacts.",
        },
        {
          category: "TERRAIN",
          title: "Any Terrain",
          description:
            "Follows slopes and inclines with no installation difficulty.",
        },
        {
          category: "SAVINGS",
          title: "Fast Installation",
          description:
            "Wider post spacing delivers savings of up to 50%.",
        },
        {
          category: "PROTECTION",
          title: "Dual-Density Mesh",
          description:
            "Tight at the bottom for containment, open at the top for savings.",
        },
      ],
      gallery: [
        { alt: "Fence installed on a rural property" },
        { alt: "Detail of the wire and mesh" },
        { alt: "Mesh roll" },
        { alt: "Fence on uneven terrain" },
        { alt: "Hot-dip galvanized finish" },
        { alt: "X-knot detail of the fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
      ],
    },
    "campeira-maxx": {
      title: "Ready-made Fence (rural)",
      paragraph:
        "2.50 mm wire, Hot-dip galvanized steel, Two-stage mesh, X-Knot (stiff stay)",
      shortDescription:
        "Insul's exclusive X-Knot, built to contain cattle and horses and protect crops from large animals. Breaking load of up to 700 kgf and a 5-year warranty.",
      paragraphs: [
        "The Campeira Maxx Insul ready-made fence is the definitive choice for those looking for the utmost in strength, durability and practicality. This exclusive Insul product stands out as the only one on the market with the revolutionary X-Knot (stiff stay), an innovation that ensures a more robust and secure structure, ideal for facing the toughest conditions in the field. Campeira Maxx Insul is the ideal choice for containing large and medium-sized animals such as cattle and horses, as well as being an extremely effective barrier against intruders. It protects crops and rural properties from attacks by wild boars, boar-pig hybrids, capybaras and other large animals that can cause significant damage. In addition, Campeira Maxx adapts perfectly to the terrain's relief, ensuring efficient installation and continuous protection regardless of topographic variations.",
        "With its strength and durability, Campeira Maxx offers the security needed to keep your animals contained and your land protected. The wires that make up Campeira Maxx are 2.50 mm thick, hot-dip galvanized and produced with renowned Gerdau quality, providing superior corrosion resistance and a breaking load of up to 700 kgf. This translates into a fence that maintains its integrity and functionality for many years, even in the most adverse conditions. In addition, the X-knot design ensures greater firmness and stability, keeping the fence intact even under external pressure.",
        "Campeira Maxx also stands out for how practical it is to install. The fence comes ready to use, which simplifies installation and saves time and labor. This practicality, combined with the product's high durability, results in a fencing solution that requires less maintenance over time, providing long-term savings. Another major advantage of Campeira Maxx is the 5-year warranty Insul offers, reflecting confidence in the product's quality and durability. In addition, the fence's aesthetic harmony is an important point, as, besides being functional, it blends perfectly into the environment, giving the property an organized, professional appearance.",
        "For retailers and resellers, the Campeira Maxx Insul ready-made fence represents a unique opportunity to add value to their product mix. Its exclusivity and quality advantages boost sales potential and strengthen the store's reputation as a supplier of high-quality products, while also offering a more modern, practical and durable alternative to hand-assembled oval-wire fencing. The high demand for strong, long-lasting fences, combined with the exclusive X-knot technology and all the quality offered by the Campeira Maxx Insul ready-made fence, guarantees strong sales potential and customer loyalty. With such a complete product, customer satisfaction is guaranteed, reducing complaints and increasing loyalty and profits. Choose the Campeira Maxx Insul ready-made fence and discover how a fence can make a difference on your property, combining innovation, quality and practicality in a single product.",
      ],
      animals: ["Cattle", "Capybaras", "Dogs", "Ostriches", "Sheep", "Pigs", "Wild boars"],
      hotspot: {
        title: "Cerca Campeira Maxx Insul",
        description:
          "Reinforced for larger pastures, with wider wire spacing.",
      },
      features: [
        {
          title: "Installation",
          description:
            "Mesh pre-stretched between posts, ready to install on any type of terrain.",
          captions: [
            {
              label: "Installation",
              value:
                "Mesh pre-assembled and stretched between the posts — it leaves the factory ready to install, no wire-by-wire assembly required.",
            },
            {
              label: "Span",
              value:
                "5x5 to 8x8 meters between posts, saving up to 50% on materials.",
            },
            {
              label: "X-Knot",
              value:
                "The steel wire and the X-knot (stiff stay) lock together, keeping the fence's tension and rigidity for much longer.",
            },
          ],
        },
        {
          title: "Upper | lower mesh",
          description:
            "22cm x 20cm mesh with a hot-dip galvanized steel finish.",
          captions: [
            {
              label: "Mesh",
              value: "",
              options: [
                {
                  label: "Upper mesh",
                  value:
                    "22cm x 20cm — more open to reduce material costs and keep a clean look, without sacrificing strength.",
                },
                {
                  label: "Lower mesh",
                  value:
                    "22cm x 10cm — tighter to reinforce animal containment and block smaller intruders.",
                },
              ],
            },
            {
              label: "Upper mesh",
              value:
                "22cm x 20cm — more open to reduce material costs and keep a clean look, without sacrificing strength.",
            },
            {
              label: "Lower mesh",
              value:
                "22cm x 10cm — tighter to reinforce animal containment and block smaller intruders.",
            },
          ],
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "2.50 mm Wire",
          description:
            "Heavy-gauge wire, built to withstand tension and impact in demanding fencing applications.",
        },
        {
          category: "FINISH",
          title: "Hot-Dip Galvanized Steel",
          description:
            "Corrosion protection and greater durability in any environment.",
        },
        {
          category: "STRUCTURE",
          title: "Two-stage mesh",
          description:
            "Smaller openings at the base and larger ones at the top, combining effective containment with visibility.",
        },
        {
          category: "STRUCTURE",
          title: "X-Knot (stiff stay)",
          description:
            "Locks the wires in an X pattern, keeping the structure's tension and rigidity for longer.",
        },
        {
          category: "PROTECTION",
          title: "Dual-Density Mesh",
          description:
            "Tight at the bottom for containment, open at the top for savings.",
        },
      ],
      gallery: [
        { alt: "Fence installed on a rural property" },
        { alt: "Detail of the wire and mesh" },
        { alt: "Mesh roll" },
        { alt: "Fence on uneven terrain" },
        { alt: "Hot-dip galvanized finish" },
        { alt: "X-knot detail of the fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
      ],
    },
    campeira: {
      title: "Ready-made Fence (rural)",
      paragraph:
        "2.30 mm wire, Hot-dip galvanized steel, Two-stage mesh, Traditional knot",
      shortDescription:
        "Insul's traditional, time-tested model, ideal for containing sheep, goats and pigs. Hot-dip galvanized wire with a 5-year warranty.",
      paragraphs: [
        "The Campeira Insul ready-made fence is synonymous with tradition and excellence in the ready-made fence market, widely recognized among customers for its efficiency and reliability. Designed to contain medium-sized animals such as sheep, goats and pigs, Campeira Insul stands out not only for its popularity but also for the quality advantages that make all the difference. Insul's quality is what puts Campeira ahead of other products on the market.",
        "Each fence is manufactured to rigorous quality standards, using high-quality Gerdau wires that undergo hot-dip galvanizing to ensure superior corrosion resistance. This process ensures greater strength and high durability, resulting in a fence that maintains its integrity and functionality for many years, even in the harshest conditions.",
        "In addition to its strength, Campeira Insul stands out for how practical it is to install. It comes ready to use, which makes fieldwork easier and significantly reduces installation time. This practicality, combined with lower maintenance costs, makes Campeira Insul an economical, efficient choice for rural property owners looking to optimize their investment without sacrificing quality. Insul offers a 5-year warranty on Campeira, reflecting confidence in the product's durability and superior performance.",
        "Another important advantage is how it adapts to the terrain's relief, allowing the fence to integrate continuously and effectively regardless of topographic variations. This feature ensures secure, stable containment tailored to each property's specific needs. Aesthetic harmony is another highlight of Campeira Insul. Besides being functional, the fence gives the property an organized, professional look, adding value to the rural setting and showing attention to detail.",
        "For shop owners and resellers, adding the Campeira Insul ready-made fence to their product mix is a strategic decision that adds value to their portfolio. By offering a high-quality product that customers recognize and trust, you attract a demanding audience and build loyalty among customers seeking durable, efficient solutions. With growing demand for ready-made fences, Campeira Insul guarantees strong sales potential and helps strengthen your store's reputation.",
      ],
      animals: ["Cattle", "Dogs", "Goats", "Pigs", "Sheep"],
      hotspot: {
        title: "Cerca Campeira Insul",
        description:
          "Traditional model for rural boundaries, strong and easy to install.",
      },
      features: [
        {
          title: "2.50 mm Wire",
          description:
            "Heavy-gauge wire, built to withstand tension and impact in demanding fencing applications.",
        },
        {
          title: "Installation",
          description:
            "Mesh pre-stretched between posts, ready to install on any type of terrain.",
        },
        {
          title: "Two-stage mesh",
          description:
            "Smaller openings at the base and larger ones at the top, combining effective containment with visibility.",
        },
        {
          title: "X-Knot (stiff stay)",
          description:
            "Locks the wires in an X pattern, keeping the structure's tension and rigidity for longer.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Carbon Steel",
          description:
            "The only chain-link fencing in Brazil with wires rated for a 650 kgf breaking load.",
        },
        {
          category: "STRUCTURE",
          title: "X-Knot",
          description:
            "Forged knot that leaves no burrs and ensures safety against impacts.",
        },
        {
          category: "TERRAIN",
          title: "Any Terrain",
          description:
            "Follows slopes and inclines with no installation difficulty.",
        },
        {
          category: "SAVINGS",
          title: "Fast Installation",
          description:
            "Wider post spacing delivers savings of up to 50%.",
        },
        {
          category: "PROTECTION",
          title: "Dual-Density Mesh",
          description:
            "Tight at the bottom for containment, open at the top for savings.",
        },
      ],
      gallery: [
        { alt: "Fence installed on a rural property" },
        { alt: "Detail of the wire and mesh" },
        { alt: "Mesh roll" },
        { alt: "Fence on uneven terrain" },
        { alt: "Hot-dip galvanized finish" },
        { alt: "X-knot detail of the fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
      ],
    },
    "campeira-boi": {
      title: "Ready-made Fence (rural)",
      paragraph:
        "2.50 mm wire, Hot-dip galvanized steel, 30 cm x 20 cm mesh, X-Knot (stiff stay)",
      shortDescription:
        "Exclusive X-Knot and 30x20cm mesh for containing cattle and large animals, with a breaking load of up to 700 kgf even on uneven terrain.",
      paragraphs: [
        "The Campeira Boi Insul ready-made fence is the ideal solution for those who need security and durability when containing medium and large animals. This exclusive Insul product is the only one on the market with the innovative X-knot (stiff stay), a technology that provides greater strength and stability, ensuring the fence stays firm and functional even under intense pressure. Designed to face the toughest conditions, Campeira Boi Insul stands out for its 700 kgf breaking load, making it highly effective at containing cattle, horses and other large animals.",
        "Its sturdy construction and high-quality materials guarantee a fence that not only fulfills its containment role but also withstands the wear of time. Durability is one of the pillars of Campeira Boi Insul. Manufactured by Insul with high-quality Gerdau wires that undergo hot-dip galvanizing, this fence offers superior corrosion resistance and longevity, resulting in a product that maintains its integrity for years, even in harsh environments. In addition, the fence is designed to adapt to the terrain's relief, ensuring efficient installation and continuous protection regardless of topographic variations.",
        "Ease of installation is another strong point of Campeira Boi Insul. The fence comes ready to use, which significantly reduces the time and effort needed for assembly. This, combined with its lower maintenance cost, makes Campeira Boi an economical, efficient choice for rural property owners looking to optimize their investments.",
        "For retailers and resellers, adding the Campeira Boi Insul ready-made fence to their product mix represents an excellent business opportunity. This exclusive, high-quality product attracts a qualified audience made up of rural property owners looking for sturdy, durable solutions. By stocking Campeira Boi in your store, you not only offer a standout product that meets market needs, but also a more modern, practical and durable alternative to hand-assembled oval-wire fencing, while strengthening your store's reputation as a supplier of top-tier items. The high demand for strong, long-lasting fences, combined with the exclusive X-knot technology and all the quality offered by the Campeira Boi Insul ready-made fence, guarantees strong sales potential and customer loyalty.",
        "Insul offers a 5-year warranty on Campeira Boi, reflecting our confidence in this product's quality and durability. Beyond its superior functionality, the fence also blends harmoniously into its surroundings, giving your property an organized, professional look. The Campeira Boi Insul ready-made fence is, therefore, the ideal choice for anyone who needs a reliable, strong and long-lasting fencing solution that provides security for both animals and property. With its unique combination of innovation, quality and practicality, Campeira Boi Insul is a safe, effective investment for your business.",
      ],
      animals: ["Cattle"],
      hotspot: {
        title: "Cerca Campeira Boi Insul",
        description:
          "Designed for cattle herds, with wire spacing built for maximum containment.",
      },
      features: [
        {
          title: "2.50 mm Wire",
          description:
            "Heavy-gauge wire, built to withstand tension and impact in demanding fencing applications.",
        },
        {
          title: "Installation",
          description:
            "Mesh pre-stretched between posts, ready to install on any type of terrain.",
        },
        {
          title: "Two-stage mesh",
          description:
            "Smaller openings at the base and larger ones at the top, combining effective containment with visibility.",
        },
        {
          title: "X-Knot (stiff stay)",
          description:
            "Locks the wires in an X pattern, keeping the structure's tension and rigidity for longer.",
        },
      ],
      videoCards: [
        {
          category: "MATERIAL",
          title: "Carbon Steel",
          description:
            "The only chain-link fencing in Brazil with wires rated for a 650 kgf breaking load.",
        },
        {
          category: "STRUCTURE",
          title: "X-Knot",
          description:
            "Forged knot that leaves no burrs and ensures safety against impacts.",
        },
        {
          category: "TERRAIN",
          title: "Any Terrain",
          description:
            "Follows slopes and inclines with no installation difficulty.",
        },
        {
          category: "SAVINGS",
          title: "Fast Installation",
          description:
            "Wider post spacing delivers savings of up to 50%.",
        },
        {
          category: "PROTECTION",
          title: "Dual-Density Mesh",
          description:
            "Tight at the bottom for containment, open at the top for savings.",
        },
      ],
      gallery: [
        { alt: "Fence installed on a rural property" },
        { alt: "Detail of the wire and mesh" },
        { alt: "Mesh roll" },
        { alt: "Fence on uneven terrain" },
        { alt: "Hot-dip galvanized finish" },
        { alt: "X-knot detail of the fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
        { alt: "Insul Fence" },
      ],
    },
  } as Record<string, CercaProntaTranslation>,
};

export default en;
