"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { simulatorSpec, type Application, type SimulatorProduct, type SimulatorState } from "./terrainSimulatorTypes";
import type { createTerrainSimulator } from "./terrainSimulatorEngine";
import styles from "./TerrainSimulator.module.css";

type Engine = ReturnType<typeof createTerrainSimulator>;
const applications: [Application,string][] = [["terrain","Terreno livre"],["house","Casa"],["company","Empresa"],["park","Praça / local público"],["dog","Canil com cachorro"]];
const defaults = (height: number): SimulatorState => ({width:10,depth:8,height,rotation:-12,angle:23,zoom:1,application:"terrain"});

export default function TerrainSimulator({product,meshWidth,meshHeight}:{product:SimulatorProduct;meshWidth?:string;meshHeight?:string}){
  const id=useId();
  const spec=useMemo(()=>simulatorSpec(product,meshWidth,meshHeight),[product,meshWidth,meshHeight]);
  const [state,setState]=useState(()=>defaults(spec.heights.includes(1.5)?1.5:spec.heights[0]));
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
  const range=(key:"width"|"depth"|"rotation"|"angle"|"zoom",label:string,min:number,max:number,step:number=1)=> <label htmlFor={`${id}-${key}`} className={styles.control}>{label}<output>{key==="zoom"?`${Math.round(state[key]*100)}%`:key==="width"||key==="depth"?`${state[key].toFixed(1).replace(".",",")} m`:`${state[key]}°`}</output><input id={`${id}-${key}`} type="range" min={min} max={max} step={step} value={state[key]} onChange={event=>change(key,Number(event.target.value))}/></label>;
  return <div className={styles.simulator}>
    <div className={styles.layout}>
      <div className={styles.controls}>
        <h3>{product.name}</h3>
        <label className={styles.control} htmlFor={`${id}-application`}>Aplicação do cercamento<select id={`${id}-application`} value={state.application} onChange={event=>change("application",event.target.value as Application)}>{applications.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
        {range("width","Largura",3,18,.1)}{range("depth","Profundidade",3,18,.1)}
        <label className={styles.control} htmlFor={`${id}-height`}>Altura {spec.morada?"":"ilustrativa"}<select id={`${id}-height`} value={state.height} onChange={event=>change("height",Number(event.target.value))}>{spec.heights.map(height=><option key={height} value={height}>{height.toFixed(2).replace(".",",")} m</option>)}</select></label>
        {range("rotation","Rotação",-180,180)}{range("angle","Ângulo da câmera",5,65)}{range("zoom","Escala visual",.4,1.8,.01)}
        <button type="button" onClick={()=>{setState(defaults(spec.heights.includes(1.5)?1.5:spec.heights[0]));engine.current?.center();}}>Restaurar ajustes</button>
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
