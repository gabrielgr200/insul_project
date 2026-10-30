import * as THREE from "three";
import type { SimulatorSpec, SimulatorState, Application } from "./terrainSimulatorTypes";

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
  function buildFence() {
    root.remove(fence); disposeGroup(fence); fence=new THREE.Group();root.add(fence);
    const {width:w,depth:d,height:h}=state;
    const corners=[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]];
    const segments: [THREE.Vector3,THREE.Vector3][]=[];
    for(let side=0;side<4;side++){
      const [ax,az]=corners[side],[bx,bz]=corners[(side+1)%4],length=Math.hypot(bx-ax,bz-az);
      const at=(x:number,y:number)=>new THREE.Vector3(ax+(bx-ax)*x/length,y,az+(bz-az)*x/length);
      for(let x=0;x<length-.001;x+=spec.spacing){const post=new THREE.Mesh(new THREE.BoxGeometry(.105,h+.2,.105),concrete);post.position.copy(at(x,(h+.2)/2));fence.add(post);}
      if(spec.kind==="rect"){
        for(let x=0;x<length;x+=spec.meshWidth)segments.push([at(x,.025),at(x,h)]);
        segments.push([at(length,.025),at(length,h)]);
        for(let y=.025;y<h;y+=spec.meshHeight)segments.push([at(0,y),at(length,y)]);
        segments.push([at(0,h),at(length,h)]);
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
  function update(next: SimulatorState){const previous=state;state=next;if(previous.width!==next.width||previous.depth!==next.depth||previous.height!==next.height)buildFence();if(previous.application!==next.application)buildScenery(next.application);
    root.rotation.y=THREE.MathUtils.degToRad(next.rotation);root.scale.setScalar(next.zoom);
    scenery.scale.setScalar(Math.max(.25,Math.min(1,(next.width-1)/4.8,(next.depth-1)/4)));
    const angle=THREE.MathUtils.degToRad(next.angle);camera.position.set(0,Math.sin(angle)*23,Math.cos(angle)*23);camera.lookAt(0,.5,0);render();
  }
  function resize(){if(!host.clientWidth||!host.clientHeight)return;renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();render();}
  const observer=new ResizeObserver(resize);observer.observe(host);
  let drag: {x:number;y:number;px:number;py:number}|null=null;
  const canvas=renderer.domElement;
  const down=(event:PointerEvent)=>{drag={x:event.clientX,y:event.clientY,px:root.position.x,py:root.position.y};canvas.setPointerCapture(event.pointerId);};
  const move=(event:PointerEvent)=>{if(!drag)return;const units=2*23*Math.tan(THREE.MathUtils.degToRad(19))/host.clientHeight;root.position.x=drag.px+(event.clientX-drag.x)*units;root.position.y=drag.py-(event.clientY-drag.y)*units;render();};
  const up=()=>{drag=null;};
  const wheel=(event:WheelEvent)=>{event.preventDefault();onZoom(Math.max(.4,Math.min(1.8,state.zoom-event.deltaY*.001)));};
  canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",up);canvas.addEventListener("wheel",wheel,{passive:false});
  buildFence();buildScenery(state.application);update(state);resize();
  return {update,center(){root.position.set(0,0,0);render();},canvas,
    dispose(){observer.disconnect();canvas.removeEventListener("pointerdown",down);canvas.removeEventListener("pointermove",move);canvas.removeEventListener("pointerup",up);canvas.removeEventListener("pointercancel",up);canvas.removeEventListener("wheel",wheel);disposeGroup(fence);disposeGroup(scenery,true);field.geometry.dispose();field.material.dispose();steel.dispose();concrete.dispose();renderer.dispose();canvas.remove();}
  };
}
