import * as THREE from "three";
import type { SimulatorSpec, SimulatorState, Application } from "./terrainSimulatorTypes";
import { bimodalMeshLevels } from "./terrainSimulatorTypes";

export function createTerrainSimulator(host: HTMLElement, spec: SimulatorSpec, initial: SimulatorState, onZoom: (zoom: number) => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0,0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:none;cursor:grab";
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38,1,.1,200), root = new THREE.Group(); scene.add(root);
  scene.add(new THREE.HemisphereLight(0xffffff,0x64704c,2.5));
  const sun = new THREE.DirectionalLight(0xfff3dc,3); sun.position.set(-8,15,8); scene.add(sun);
  const steel = new THREE.MeshStandardMaterial({color:spec.color,metalness:.65,roughness:.5});
  const concrete = new THREE.MeshStandardMaterial({color:spec.gradil?spec.color:0xbab8ac,roughness:.95});
  const field = new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({color:0x889d60,roughness:1}));
  field.rotation.x=-Math.PI/2; field.position.y=-.025; scene.add(field);
  let fence = new THREE.Group(), scenery = new THREE.Group(), state=initial;
  root.add(fence,scenery);
  function disposeGroup(group: THREE.Group, materials=false) {
    group.traverse(object => { if(object instanceof THREE.Mesh || object instanceof THREE.LineSegments){object.geometry.dispose();if(materials){const ms=Array.isArray(object.material)?object.material:[object.material];ms.forEach(m=>m.dispose());}} });
  }
  const groundHeight = (x:number,z:number) => state.application === "relief" ? .07*x+.04*z : 0;
  function buildFence() {
    root.remove(fence); disposeGroup(fence); fence=new THREE.Group();root.add(fence);
    const {width:w,depth:d,height:h}=state;
    const corners=[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]];
    const segments: [THREE.Vector3,THREE.Vector3][]=[];
    for(let side=0;side<4;side++){
      const [ax,az]=corners[side],[bx,bz]=corners[(side+1)%4],length=Math.hypot(bx-ax,bz-az);
      const at=(x:number,y:number)=>{const point=new THREE.Vector3(ax+(bx-ax)*x/length,y,az+(bz-az)*x/length);point.y+=groundHeight(point.x,point.z);return point;};
      for(let x=0;x<length-.001;x+=state.spacing){const post=new THREE.Mesh(new THREE.BoxGeometry(.105,h+.2,.105),concrete);post.position.copy(at(x,(h+.2)/2));fence.add(post);}
      if(spec.kind==="rect"){
        for(let x=0;x<length;x+=spec.meshWidth)segments.push([at(x,spec.boi?0:.025),at(x,h)]);
        segments.push([at(length,spec.boi?0:.025),at(length,h)]);
        if(spec.lowerMeshHeight){
          for(const y of bimodalMeshLevels(spec,h))segments.push([at(0,y),at(length,y)]);
        }else if(spec.boi){
          for(let row=0;row<=Math.round(h/spec.meshHeight);row++){const y=Math.max(0,h-row*spec.meshHeight);segments.push([at(0,y),at(length,y)]);}
        }else for(let y=.025;y<h;y+=spec.meshHeight)segments.push([at(0,y),at(length,y)]);
        if(!spec.lowerMeshHeight&&!spec.boi)segments.push([at(0,h),at(length,h)]);
      }else if(spec.kind==="hex"){
        const cw=Math.max(.04,spec.meshWidth),ch=Math.max(.04,spec.meshHeight);
        for(let y=ch/2,row=0;y<h;y+=ch*.866,row++)for(let x=0;x<length;x+=cw*1.5){
          const cx=x+(row%2?cw*.75:0);
          for(let k=0;k<6;k++){const a=k*Math.PI/3,b=(k+1)*Math.PI/3,x1=cx+Math.cos(a)*cw/2,x2=cx+Math.cos(b)*cw/2,y1=y+Math.sin(a)*ch/2,y2=y+Math.sin(b)*ch/2;if(x1>=0&&x2>=0&&x1<=length&&x2<=length&&y1>=.025&&y2>=.025&&y1<=h&&y2<=h)segments.push([at(x1,y1),at(x2,y2)]);}
        }
      }else{
        const step=Math.max(.04,spec.meshWidth),rise=spec.meshHeight/step;
        for(let start=-h/rise;start<=length;start+=step)for(const sign of [-1,1]){
          const x1=Math.max(0,start),x2=Math.min(length,start+h/rise);if(x2<=x1)continue;
          const y1=(x1-start)*rise,y2=(x2-start)*rise;
          segments.push([at(x1,sign===1?y1:h-y1),at(x2,sign===1?y2:h-y2)]);
        }
      }
    }
    const geometry=new THREE.CylinderGeometry(spec.wire/2,spec.wire/2,1,4);
    const wires=new THREE.InstancedMesh(geometry,steel,segments.length),dummy=new THREE.Object3D(),up=new THREE.Vector3(0,1,0);
    segments.forEach(([a,b],i)=>{const delta=b.clone().sub(a);dummy.position.copy(a).add(b).multiplyScalar(.5);dummy.quaternion.setFromUnitVectors(up,delta.clone().normalize());dummy.scale.set(1,delta.length(),1);dummy.updateMatrix();wires.setMatrixAt(i,dummy.matrix);});
    wires.instanceMatrix.needsUpdate=true;fence.add(wires);
  }
  function buildScenery(type: Application){
    root.remove(scenery);disposeGroup(scenery,true);scenery=new THREE.Group();root.add(scenery);
    function mesh(geometry:THREE.BufferGeometry,color:THREE.ColorRepresentation,x:number,y:number,z:number){const m=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,roughness:.8}));m.position.set(x,y,z);scenery.add(m);return m;}
    const box=(w:number,h:number,d:number,c:number,x:number,y:number,z:number)=>mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z);
    const ball=(r:number,c:number,x:number,y:number,z:number)=>mesh(new THREE.SphereGeometry(r,16,12),c,x,y,z);
    if(type==="coast"){
      mesh(new THREE.PlaneGeometry(60,60),0xdac799,0,-.025,0).rotation.x=-Math.PI/2;
      box(60,.02,22,0x55aabd,0,-.005,-22);
      for(const x of [-7,7]){
        mesh(new THREE.CylinderGeometry(.10,.18,3.1,8),0x99734c,x,1.55,-3);
        for(let i=0;i<6;i++){
          const angle=i*Math.PI/3;
          const leaf=ball(.32,0x527a3c,x+Math.cos(angle)*.65,3.0,-3+Math.sin(angle)*.65);
          leaf.scale.set(3,.22,.9);leaf.rotation.y=-angle;
        }
      }
    }
    if(type==="relief"){
      const geometry=new THREE.PlaneGeometry(60,60);
      const positions=geometry.attributes.position;
      for(let i=0;i<positions.count;i++)positions.setZ(i,.07*positions.getX(i)-.04*positions.getY(i)-.025);
      geometry.computeVertexNormals();
      mesh(geometry,0x889d60,0,0,0).rotation.x=-Math.PI/2;
    }
    if(type==="sport"){
      box(4.5,.035,3.1,0x487a91,0,.02,0);
      for(const z of [-1.4,1.4])box(4.2,.012,.035,0xffffff,0,.045,z);
      for(const x of [-2.1,0,2.1])box(.035,.012,2.8,0xffffff,x,.045,0);
      const circle=mesh(new THREE.TorusGeometry(.45,.012,6,40),0xffffff,0,.055,0);circle.rotation.x=-Math.PI/2;
      for(const x of [-2.3,2.3]){
        box(.055,1.8,.055,0xe5e8e9,x,.9,0);
        box(.055,.48,.8,0xffffff,x,1.75,0);
        const hoop=mesh(new THREE.TorusGeometry(.2,.025,8,20),0xff5500,x+(x<0?.2:-.2),1.6,0);hoop.rotation.x=-Math.PI/2;
      }
    }
    function farmAnimal(kind: Application, offsetX=0,offsetZ=0) {
      const isCattle=kind==="cattle",isSheep=kind==="sheep",isGoat=kind==="goat",isPig=kind==="pig";
      const color=isPig?0xe1aaa1:isCattle?0x8f5c36:isSheep?0xe5dfcc:isGoat?0xb99c79:kind==="whiteLippedPeccary"?0x50483f:0x6b5540;
      const size=isCattle?1.25:1;
      const start=scenery.children.length;
      ball(.4,color,0,.85,0).scale.set(1.7,1, .8);
      ball(.25,color,.64,1.02,0).scale.set(1,1.2,.85);
      ball(.16,kind==="whiteLippedPeccary"?0xd3c5b1:color,.84,.92,0).scale.set(1.4,.8,1);
      for(const x of [-.4,.4])for(const z of [-.22,.22])box(.1,.6,.1,isSheep?0x544639:color,x,.3,z);
      for(const z of [-.2,.2]){
        ball(.08,0x27231f,.76,1.1,z);
        const ear=ball(.10,color,.55,1.25,z);ear.scale.set(.6,1.2,.45);
        if(isCattle||isGoat){const horn=mesh(new THREE.ConeGeometry(.055,.3,7),0xd9cfaa,.55,1.42,z);horn.rotation.z=.4;}
      }
      if(isPig){ball(.035,0x704f4e,1.03,.96,-.055);ball(.035,0x704f4e,1.03,.96,.055);}
      if(isSheep)for(let i=0;i<8;i++)ball(.21,0xeee8d8,-.45+(i%4)*.28,1.02, i<4?-.20:.20);
      for(const object of scenery.children.slice(start)){object.position.multiplyScalar(size);object.position.x+=offsetX;object.position.z+=offsetZ;object.scale.multiplyScalar(size);}
    }
    if(["sheep","goat","cattle","boar","peccary","whiteLippedPeccary","pig"].includes(type))farmAnimal(type);
    if(type==="rural"){farmAnimal("sheep",-1,0);farmAnimal("cattle",1,-1);}
    if(type==="crops"){
      for(let x=-1.8;x<=1.8;x+=.6)for(let z=-1.4;z<=1.4;z+=.55){
        mesh(new THREE.CylinderGeometry(.025,.035,.65,6),0x678944,x,.325,z);
        const leaf=ball(.15,0x4d8039,x,.5,z);leaf.scale.set(1.8,.3,.7);leaf.rotation.z=.45;
      }
      farmAnimal("boar",2,1);
    }
    if(type==="house"){
      box(3,1.8,2.4,0xf1dfbd,0,.9,0);const roof=mesh(new THREE.ConeGeometry(2.22,1.05,4),0xa94c32,0,2.32,0);roof.rotation.y=Math.PI/4;roof.scale.z=.8;
      box(.55,1.15,.035,0x755037,.55,.575,1.22);box(.65,.65,.04,0x91bfce,-.7,1.05,1.23);box(.7,.04,.08,0xffffff,-.7,1.05,1.27);box(.04,.7,.08,0xffffff,-.7,1.05,1.27);box(.35,.8,.35,0x947a64,.8,2.35,-.45);
    }
    if(type==="company"){
      box(4,2.3,2.5,0xc1cad1,0,1.15,0);box(4.2,.18,2.7,0x082d49,0,2.39,0);box(1.4,1.7,.04,0x87939b,.7,.85,1.28);
      for(let i=0;i<4;i++)box(1.4,.035,.05,0xb7c1c8,.7,.3+i*.4,1.31);box(.8,.7,.04,0x7eb0c6,-1,1.35,1.28);box(3.4,.28,.06,0xff5500,0,2.05,1.29);
    }
    if(type==="park"){
      box(1.4,.1,.5,0xa37143,-.7,.5,.4);box(1.4,.45,.08,0xa37143,-.7,.8,.15);for(const x of [-1.2,-.2])box(.08,.5,.4,0x45545a,x,.25,.4);
      for(const [x,z] of [[1.6,-1.2],[-1.7,-1.1]]){mesh(new THREE.CylinderGeometry(.1,.14,1.5,8),0x85603e,x,.75,z);ball(.7,0x578448,x,1.9,z);ball(.5,0x65954f,x+.3,2.2,z);}
      mesh(new THREE.CylinderGeometry(.05,.05,2.6,8),0x49595f,1.5,1.3,1.1);ball(.18,0xffebbf,1.5,2.65,1.1);
    }
    if(type==="dog"){
      box(1.15,.8,1.05,0xc59a64,-1,.4,-.6);const roof=mesh(new THREE.ConeGeometry(.92,.48,4),0x894d36,-1,1.02,-.6);roof.rotation.y=Math.PI/4;box(.4,.53,.035,0x473b30,-1,.265,-.055);
      ball(.3,0xa57746,.55,.56,.6).scale.set(1.65,1,.85);ball(.24,0xb98c56,.99,.86,.6);ball(.14,0xcda575,1.17,.81,.6).scale.x=1.3;ball(.055,0x282828,1.32,.82,.6);
      for(const z of [.43,.77]){ball(.13,0x704c31,.95,1.02,z).scale.set(.65,1.6,.5);ball(.025,0x222222,1.12,.94,z);}
      for(const x of [.28,.8])for(const z of [.43,.77])box(.09,.4,.09,0x9e7040,x,.22,z);
      mesh(new THREE.CylinderGeometry(.045,.065,.45,8),0xa57746,.08,.78,.6).rotation.z=-.65;mesh(new THREE.CylinderGeometry(.23,.19,.10,20),0x8aa7b3,1.35,.05,1.2);
    }
  }
  function render(){renderer.render(scene,camera);}
  function update(next: SimulatorState){const previous=state;state=next;if(previous.width!==next.width||previous.depth!==next.depth||previous.height!==next.height||previous.spacing!==next.spacing||(previous.application==="relief")!==(next.application==="relief"))buildFence();if(previous.application!==next.application)buildScenery(next.application);
    root.rotation.y=THREE.MathUtils.degToRad(next.rotation);root.scale.setScalar(next.zoom);
    field.visible=next.application!=="relief"&&next.application!=="coast";
    scenery.scale.setScalar((next.application==="relief"||next.application==="coast")?1:Math.max(.25,Math.min(1,(next.width-1)/4.8,(next.depth-1)/4)));
    const angle=THREE.MathUtils.degToRad(next.angle);camera.position.set(0,Math.sin(angle)*23,Math.cos(angle)*23);camera.lookAt(0,.5,0);render();
  }
  function resize(){if(!host.clientWidth||!host.clientHeight)return;renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();render();}
  const observer=new ResizeObserver(resize);observer.observe(host);
  let drag: {x:number;y:number;px:number;py:number}|null=null;
  const canvas=renderer.domElement;
  const down=(event:PointerEvent)=>{drag={x:event.clientX,y:event.clientY,px:root.position.x,py:root.position.y};canvas.setPointerCapture(event.pointerId);};
  const move=(event:PointerEvent)=>{if(!drag)return;const units=2*23*Math.tan(THREE.MathUtils.degToRad(19))/host.clientHeight;root.position.x=drag.px+(event.clientX-drag.x)*units;root.position.y=drag.py-(event.clientY-drag.y)*units;render();};
  const up=()=>{drag=null;};
  const wheel=(event:WheelEvent)=>{event.preventDefault();onZoom(Math.max(.4,Math.min(3,state.zoom-event.deltaY*.001)));};
  canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",up);canvas.addEventListener("wheel",wheel,{passive:false});
  buildFence();buildScenery(state.application);update(state);resize();
  return {update,center(){root.position.set(0,0,0);render();},canvas,
    dispose(){observer.disconnect();canvas.removeEventListener("pointerdown",down);canvas.removeEventListener("pointermove",move);canvas.removeEventListener("pointerup",up);canvas.removeEventListener("pointercancel",up);canvas.removeEventListener("wheel",wheel);disposeGroup(fence);disposeGroup(scenery,true);field.geometry.dispose();field.material.dispose();steel.dispose();concrete.dispose();renderer.dispose();canvas.remove();}
  };
}
