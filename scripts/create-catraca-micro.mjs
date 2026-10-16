import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { mkdir, writeFile, readFile } from 'node:fs/promises';

// Single-photo reconstruction. Dimensions are illustrative, in metres.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(value => { this.result = value; this.onloadend?.(); }); }
  readAsDataURL(blob) { blob.arrayBuffer().then(value => { this.result = `data:${blob.type};base64,${Buffer.from(value).toString('base64')}`; this.onloadend?.(); }); }
};
const model = new THREE.Group();
model.name = 'Catraca micro — reconstrução visual aproximada';
model.userData = { source: 'catraca_micro.png', dimensionalAccuracy: 'Approximate; no measured dimensions supplied', units: 'metres' };
const zinc = new THREE.MeshStandardMaterial({ name: 'Aço zincado azulado', color: 0xa4bec5, metalness: 0.88, roughness: 0.32 });
const steel = new THREE.MeshStandardMaterial({ name: 'Aço do eixo', color: 0x87979c, metalness: 0.92, roughness: 0.29 });
function mesh(name, geometry, material = zinc, position = [0, 0, 0]) {
  const item = new THREE.Mesh(geometry, material); item.name = name; item.position.set(...position); model.add(item); return item;
}
function hole(shape, x, y, radius) { const path = new THREE.Path(); path.absarc(x, y, radius, 0, Math.PI * 2, true); shape.holes.push(path); }
function plate(shape, depth = 0.002) { return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.00045, bevelThickness: 0.00035, bevelSegments: 3, steps: 1, curveSegments: 40 }); }
// Folded U bracket, with two pierced cheek plates and a slotted back.
const side = new THREE.Shape();
side.moveTo(-0.027, -0.016); side.lineTo(0.006, -0.016);
side.bezierCurveTo(0.015, -0.016, 0.017, -0.009, 0.025, -0.013);
side.lineTo(0.034, -0.019); side.quadraticCurveTo(0.046, -0.012, 0.045, 0.001);
side.lineTo(0.043, 0.011); side.lineTo(0.027, 0.013);
side.quadraticCurveTo(0.018, 0.015, 0.018, 0.025); side.lineTo(-0.027, 0.025); side.closePath();
hole(side, 0.034, -0.001, 0.0041); hole(side, -0.005, 0.006, 0.0063);
mesh('Chapa lateral frontal com furo de fixação', plate(side), zinc, [0, 0, 0.017]);
mesh('Chapa lateral traseira com furo de fixação', plate(side), zinc, [0, 0, -0.019]);
const rear = new THREE.Shape(); rear.moveTo(-0.019,-0.016); rear.lineTo(0.019,-0.016); rear.lineTo(0.019,0.025); rear.lineTo(-0.019,0.025); rear.closePath();
const slot = new THREE.Path(); slot.moveTo(-0.008,0.003); slot.lineTo(0.008,0.003); slot.lineTo(0.008,0.010); slot.lineTo(-0.008,0.010); slot.closePath(); rear.holes.push(slot);
const back = mesh('Dobra traseira com rasgo para arame', plate(rear), zinc, [-0.027, 0, 0]); back.rotation.y = Math.PI / 2;
// Winding shaft with a true transverse wire hole, extruded along its axis.
const shaftShape = new THREE.Shape(); shaftShape.absarc(0, 0, 0.006, 0, Math.PI * 2, false);
hole(shaftShape, 0, 0, 0.0024);
const shaft = mesh('Tambor vazado para passagem do arame', plate(shaftShape, 0.034), steel, [-0.005,0.006,-0.017]);
// The visible cross-drilled opening is modelled across the centre of the drum.
// Split barrel around that opening avoids a dark decal in place of geometry.
model.remove(shaft);
function cylinder(name, radius, length, position, segments = 48, material = zinc) {
  const m = mesh(name, new THREE.CylinderGeometry(radius, radius, length, segments), material, position); m.rotation.x = Math.PI / 2; return m;
}
const barrel = new THREE.Shape(); barrel.moveTo(-0.006,-0.017); barrel.lineTo(0.006,-0.017); barrel.lineTo(0.006,0.017); barrel.lineTo(-0.006,0.017); barrel.closePath(); hole(barrel,0,0,0.0026);
const drum = mesh('Eixo com perfuração transversal', plate(barrel,0.008),steel,[-0.005,0.010,0]); drum.rotation.x = Math.PI/2;
cylinder('Mancal frontal',0.0077,0.002,[-0.005,0.006,0.020]);
cylinder('Mancal traseiro',0.0077,0.002,[-0.005,0.006,-0.020]);
const gear = new THREE.Shape();
for(let i=0;i<80;i++){ const a=i/80*Math.PI*2; const r=i%4<2?0.011:0.0094; if(i===0)gear.moveTo(Math.cos(a)*r,Math.sin(a)*r); else gear.lineTo(Math.cos(a)*r,Math.sin(a)*r); } gear.closePath();
mesh('Roda dentada de retenção',plate(gear,0.0025),zinc,[-0.005,0.006,0.022]);
cylinder('Cabeça sextavada de acionamento',0.008,0.011,[-0.005,0.006,0.030],6);
const pawl = new THREE.Shape(); pawl.moveTo(-0.024,0.004); pawl.lineTo(-0.024,0.012); pawl.quadraticCurveTo(-0.022,0.017,-0.017,0.015); pawl.lineTo(-0.008,0.013); pawl.lineTo(-0.013,0.006); pawl.closePath();
mesh('Lingueta de trava',plate(pawl,0.002),zinc,[0,0,0.023]);
cylinder('Rebite da lingueta',0.003,0.004,[-0.021,0.010,0.026]);
model.updateMatrixWorld(true);
const output = new URL('../public/models/', import.meta.url); await mkdir(output,{recursive:true});
const glb = await new GLTFExporter().parseAsync(model,{binary:true});
await writeFile(new URL('catraca_micro.glb',output),Buffer.from(glb));
// Validate the container header and exported mesh data.
const data = await readFile(new URL('catraca_micro.glb',output));
if(data.toString('ascii',0,4)!=='glTF' || data.readUInt32LE(8)!==data.length) throw new Error('Invalid GLB');
const jsonLength=data.readUInt32LE(12); const json=JSON.parse(data.toString('utf8',20,20+jsonLength));
if(!json.meshes?.length || !json.accessors?.length) throw new Error('Missing mesh data');
console.log(`Created catraca_micro.glb: ${data.length} bytes, ${json.meshes.length} meshes.`);
