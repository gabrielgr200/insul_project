"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { simulatorSpec, type Application, type SimulatorProduct, type SimulatorState, type SimulatorSpec } from "./terrainSimulatorTypes";
import type { createTerrainSimulator } from "./terrainSimulatorEngine";
import styles from "./TerrainSimulator.module.css";

type Engine = ReturnType<typeof createTerrainSimulator>;
const applications: [Application,string][] = [["terrain","Terreno livre"],["house","Casa"],["company","Empresa"],["park","Praça / local público"],["dog","Canil com cachorro"]];
const javaApplications: [Application,string][] = [["rural","Cercamento rural"],["sheep","Ovinos"],["goat","Caprinos"],["dog","Cães"],["cattle","Bovinos"],["crops","Proteção de lavouras"],["boar","Javali / javaporco"],["peccary","Cateto"],["whiteLippedPeccary","Queixada"]];
const fenixApplications: [Application,string][] = [["rural","Cercamento no campo"],["house","Casa"],["dog","Animais de pequeno porte"],["sheep","Animais de médio porte"],["cattle","Animais de grande porte"],["company","Grandes obras / alambrados"]];
const maxxApplications: [Application,string][] = [...javaApplications,["house","Chácaras e fazendas"]];
const campeiraApplications: [Application,string][] = [["rural","Cercamento rural"],["sheep","Criação de ovinos"],["cattle","Criação de bovinos"],["pig","Criação de suínos"],["crops","Proteção de lavouras"],["house","Chácaras e fazendas"]];
const g12Applications: [Application,string][] = [["terrain","Área de proteção"],["machinery","Máquinas e equipamentos industriais"],["metalwork","Estruturas metálicas / grades e portões"]];
const g5Applications: [Application,string][] = [["terrain","Terreno"],["house","Casa / condomínio"],["company","Comércio / indústria"],["dog","Canil"],["metalwork","Estruturas metálicas / grades e portões"]];
const gradilApplications: [Application,string][] = [["terrain","Terreno"],["house","Casa"],["company","Indústria"],["dog","Canil"],["cattle","Animais pesados"],["metalwork","Estruturas metálicas / grades e portões"]];
const gradilColors = [["Verde","#29563d"],["Azul","#194b95"],["Branco","#eeeeea"],["Preto","#242628"],["Cinza","#898e92"],["Amarelo","#d5bd13"]];
const galinheiroApplications: [Application,string][] = [["terrain","Cercamento leve"],["chicken","Galinheiro"],["rural","Propriedade rural"],["cistern","Construção de cisterna de água"]];
const mangueirao16Applications: [Application,string][] = [["terrain","Área de contenção"],["rural","Propriedade rural"],["house","Residência"],["sheep","Ovinos / animais de médio porte"],["pig","Suínos"],["rabbit","Animais de pequeno porte"],["construction","Fechamento provisório de obra"]];
const multyMaxxApplications: [Application,string][] = [["terrain","Cercamento de maior segurança"],["house","Residência"],["garden","Horta / jardim"],["rabbit","Pequenos animais"],["metalwork","Serralheria / grades e portões"],["padel","Quadra de padel"]];
const multyUsoApplications: [Application,string][] = [["terrain","Terreno livre"],["house","Residência"],["garden","Horta / jardim"],["rabbit","Coelho"],["cat","Gato"],["chicken","Galinha"],["bird","Ave de médio porte"]];
const moradaLeveApplications: [Application,string][] = [["terrain","Cercamento leve / pátio"],["house","Residência"],["garden","Horta / jardim"],["dog","Animais de pequeno porte"],["sheep","Animais de médio porte"]];
const moradaOpenApplications: [Application,string][] = [["terrain","Cercamento de terreno"],["house","Casa"],["company","Empresa"],["park","Praça / local público"],["sheep","Animais de médio porte"]];
const moradaApplications: [Application,string][] = [["terrain","Cercamento de terreno"],["house","Casa"],["company","Empresa"],["park","Praça / local público"],["dog","Canil / animais de pequeno porte"],["sheep","Animais de médio porte"]];
const titanApplications: [Application,string][] = [["terrain","Cercamento de terreno"],["house","Cercamento residencial"],["company","Cercamento industrial"],["dog","Canil"],["metalwork","Peças de serralheria"],["eps","Construção em EPS"]];
const bravaApplications: [Application,string][] = [["terrain","Terreno livre"],["house","Casa / condomínio"],["coast","Terreno na praia"],["company","Empresa"],["park","Praça / local público"]];
const torcaoApplications: [Application,string][] = [["terrain","Cercamentos em geral"],["relief","Terreno com relevo"],["sport","Quadra esportiva"]];
const torcaoPvcApplications: [Application,string][] = [...torcaoApplications,["coast","Área litorânea"]];
const defaults = (spec: SimulatorSpec): SimulatorState => ({width:10,depth:8,height:spec.heights.includes(1.5)?1.5:spec.heights[0],rotation:-12,angle:23,zoom:spec.java?1.2:1,application:spec.java||spec.fenix||spec.maxx||spec.boi||spec.campeira?"rural":"terrain",spacing:spec.spacing});

export default function TerrainSimulator({product,meshWidth,meshHeight}:{product:SimulatorProduct;meshWidth?:string;meshHeight?:string}){
  const id=useId();
  const spec=useMemo(()=>simulatorSpec(product,meshWidth,meshHeight),[product,meshWidth,meshHeight]);
  const [state,setState]=useState(()=>defaults(spec));
  const [error,setError]=useState("");
  const host=useRef<HTMLDivElement>(null),engine=useRef<Engine|null>(null),latest=useRef(state);
  useEffect(()=>{latest.current=state;engine.current?.update(state);},[state]);
  useEffect(()=>{
    let cancelled=false;let instance:Engine|null=null;
    import("./terrainSimulatorEngine").then(({createTerrainSimulator})=>{
      if(cancelled||!host.current)return;
      instance=createTerrainSimulator(host.current,spec,latest.current,zoom=>setState(previous=>({...previous,zoom})));engine.current=instance;
    }).catch(()=>{if(!cancelled)setError("Não foi possível iniciar o 3D. Verifique a aceleração gráfica do navegador.");});
    return()=>{cancelled=true;instance?.dispose();engine.current=null;};
  },[spec]);
  function change<K extends keyof SimulatorState>(key:K,value:SimulatorState[K]){setState(previous=>({...previous,[key]:value}));}
  const range=(key:"width"|"depth"|"rotation"|"angle"|"zoom"|"spacing",label:string,min:number,max:number,step:number=1)=> <label htmlFor={`${id}-${key}`} className={styles.control}>{label}<output>{key==="zoom"?`${Math.round(state[key]*100)}%`:key==="width"||key==="depth"||key==="spacing"?`${state[key].toFixed(1).replace(".",",")} m`:`${state[key]}°`}</output><input id={`${id}-${key}`} type="range" min={min} max={max} step={step} value={state[key]} onChange={event=>change(key,Number(event.target.value))}/></label>;
  return <div className={styles.simulator}>
    <div className={styles.layout}>
      <div className={styles.controls}>
        <h3>{product.name}</h3>
        <label className={styles.control} htmlFor={`${id}-application`}>Aplicação do cercamento<select id={`${id}-application`} value={state.application} onChange={event=>change("application",event.target.value as Application)}>{(spec.g12?g12Applications:spec.g5?g5Applications:spec.g4?gradilApplications:spec.galinheiro?galinheiroApplications:(spec.mangueirao16||spec.mangueirao18)?mangueirao16Applications:spec.multyMaxx?multyMaxxApplications:spec.multyUso?multyUsoApplications:spec.moradaLeve?moradaLeveApplications:spec.moradaOpen?moradaOpenApplications:spec.morada?moradaApplications:spec.titan?titanApplications:(spec.brava||spec.bravaLeve)?bravaApplications:spec.torcaoPvc?torcaoPvcApplications:spec.torcao?torcaoApplications:spec.campeira?campeiraApplications:spec.maxx||spec.boi?maxxApplications:spec.fenix?fenixApplications:spec.java?javaApplications:applications).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
        {range("width","Largura",3,18,.1)}{range("depth","Profundidade",3,18,.1)}
        {spec.gradil&&!spec.g12&&<label className={styles.control} htmlFor={`${id}-color`}>Cor do gradil<select id={`${id}-color`} value={state.color??spec.color} onChange={event=>change("color",event.target.value)}>{gradilColors.map(([name,color])=><option key={color} value={color}>{name}</option>)}</select></label>}
        {(spec.g4||spec.g5||spec.g12)&&<span className={styles.control}>Distância entre mourões: 2,50 m</span>}
        <label className={styles.control} htmlFor={`${id}-height`}>Altura {spec.g12||spec.g5||spec.g4||spec.galinheiro||spec.mangueirao18||spec.mangueirao16||spec.multyMaxx||spec.multyUso||spec.moradaLeve||spec.moradaOpen||spec.titan||spec.brava||spec.bravaLeve||spec.morada||spec.java||spec.fenix||spec.maxx||spec.boi||spec.campeira||spec.torcao?"":"ilustrativa"}<select id={`${id}-height`} disabled={spec.heights.length===1} value={state.height} onChange={event=>change("height",Number(event.target.value))}>{spec.heights.map(height=><option key={height} value={height}>{height.toFixed(2).replace(".",",")} m</option>)}</select></label>
        {(spec.java||spec.fenix||spec.maxx||spec.boi||spec.campeira)&&range("spacing","Distância entre mourões",spec.boi?7:8,10,.5)}
        {(spec.torcao||spec.brava||spec.bravaLeve||spec.titan||spec.morada||spec.moradaOpen||spec.moradaLeve||spec.multyUso||spec.multyMaxx||spec.mangueirao16||spec.mangueirao18||spec.galinheiro)&&<span className={styles.control}>Distância entre mourões: 3 m</span>}
        {range("rotation","Rotação",-180,180)}{range("angle","Ângulo da câmera",5,65)}{range("zoom","Escala visual",.4,3,.01)}
        <button type="button" onClick={()=>{setState(defaults(spec));engine.current?.center();}}>Restaurar ajustes</button>
      </div>
      <div className={styles.preview}>
        <div className={styles.stage}>
          <div ref={host} className={styles.canvas}/>
          {spec.morada&&<span className={styles.hint}>Aceita leves desníveis (até 15º de angulação, acima disso recomenda-se uso de patamares).</span>}
          {error&&<p role="alert" className={styles.error}>{error}</p>}
        </div>
        <p className={styles.note}>Simulação ilustrativa com ajuste manual. As medidas são referências do modelo 3D. Os elementos representam cenários de uso; confirme a aplicação e as especificações do produto para seu projeto.</p>
      </div>
    </div>
  </div>;
}
