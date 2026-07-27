import { Award, Globe2, Grid3x3, Mountain, ShieldCheck, Wallet } from "lucide-react";
import ExpandableCard, { CardItem } from "@/components/forgeui/expandable-card";

interface ExpandableCardExampleProps {
  color: string;
}

export function ExpandableCardExample({ color }: ExpandableCardExampleProps) {
  return (
    <section
      className="mx-auto max-w-full px-4 py-16 sm:px-8"
      style={{ backgroundColor: color }}
    >
      <ExpandableCard items={fenceSpecifications} />
    </section>
  );
}

const fenceSpecifications: CardItem[] = [
  {
    id: "aco-alto-carbono",
    title: "Aço alto carbono",
    subtitle: "Resistência de ruptura inigualável no mercado",
    icon: <Award className="h-8 w-8" />,
    description: "650 kgf de ruptura",
    details:
      "Única alambrado no Brasil a possuir arames de 650kgf de carga de ruptura.",
    metadata: "Material | Fenix",
  },
  {
    id: "no-em-x",
    title: "Nó em X (Stiff Stay)",
    subtitle: "Nó forjado que blinda a cerca contra impactos",
    icon: <ShieldCheck className="h-8 w-8" />,
    description: "Sem rebarbas",
    details:
      "Tecnologia exclusiva de nó forjado que não deixa rebarbas e confere segurança mecânica contra impactos como nenhuma outra.",
    metadata: "Estrutura | Fenix",
  },
  {
    id: "adaptacao-terreno",
    title: "Adaptação a qualquer terreno",
    subtitle: "Acompanha aclives e declives sem dificuldade",
    icon: <Mountain className="h-8 w-8" />,
    description: "Aclives e declives",
    details:
      "A Fenix acompanha perfeitamente o terreno em aclives e declives sem dificuldades na instalação.",
    metadata: "Instalação | Fenix",
  },
  {
    id: "economia-instalacao",
    title: "Maior economia e instalação ultrarápida",
    subtitle: "Até 50% de economia com instalação mais rápida",
    icon: <Wallet className="h-8 w-8" />,
    description: "Vãos de 5 a 8m",
    details:
      "Seus arames de aço permitem espaçamento maior entre mourões de 5-5 até 8-8m, gerando até 50% de economia frente a outras telas.",
    metadata: "Economia | Fenix",
  },
  {
    id: "malha-bimodal",
    title: "Malha bimodal: inteligente e segura",
    subtitle: "Fechada embaixo, aberta em cima: proteção com economia",
    icon: <Grid3x3 className="h-8 w-8" />,
    description: "60cm de malha fechada",
    details:
      "Proteção estratégica: malha fechada nos primeiros 60cm para contenção de animais e invasores. Restante a trama se abre para reduzir custos e manter o visual harmônico.",
    metadata: "Design | Fenix",
  },
  {
    id: "tecnologia-neozelandesa",
    title: "Tecnologia neozelandesa, força brasileira",
    subtitle: "Exclusividade da Insul na América do Sul",
    icon: <Globe2 className="h-8 w-8" />,
    description: "Exclusividade Insul",
    details:
      "Exclusividade da Insul na América do Sul, a Fenix traz tecnologia de ponta para cercamentos urbanos e rurais. Imbatível na comparação contra qualquer outro modelo de alambrado.",
    metadata: "Tecnologia | Fenix",
  },
];
