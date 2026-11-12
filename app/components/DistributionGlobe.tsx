"use client";

import { useEffect, useRef } from "react";
import { useContentTranslation } from "./LanguageProvider";
import styles from "./DistributionGlobe.module.css";

type Location = { name: string; lat: number; lon: number };
type Vec = [number, number, number];
type GeoLand = { features: { geometry: { type: string; coordinates: number[][][] | number[][][][] } }[] };
type Boundary = { geometry: { type: string; coordinates: number[][] | number[][][] | number[][][][] } };
const stateLabels: Location[] = [
  ["AC",-9.3,-70], ["AM",-4.5,-64], ["RR",2,-62], ["RO",-11,-63],
  ["AP",1.4,-52], ["PA",-4,-53], ["TO",-10,-48], ["MA",-5,-45],
  ["PI",-8,-43], ["CE",-5,-39], ["RN",-5.5,-35.5], ["PB",-7,-36.5],
  ["PE",-8.5,-38], ["AL",-9.7,-36.3], ["SE",-11,-37.3], ["BA",-12.5,-41.5],
  ["MT",-13,-56], ["GO",-16,-49.5], ["DF",-15.8,-47.9],
  ["MS",-21,-55], ["MG",-18,-44.5], ["ES",-20,-40.5],
  ["RJ",-22.5,-42.5], ["SP",-22.5,-48.5], ["PR",-24.8,-51],
  ["SC",-27,-50], ["RS",-30,-54],
].map(([name,lat,lon]) => ({name: name as string,lat: lat as number,lon: lon as number}));
const countryLabels: Location[] = [
  {name:"Brasil",lat:-9,lon:-57}, {name:"Argentina",lat:-40,lon:-65},
  {name:"Paraguai",lat:-23,lon:-59}, {name:"Uruguai",lat:-33,lon:-56},
  {name:"Chile",lat:-31,lon:-72}, {name:"Bolívia",lat:-17,lon:-65},
  {name:"Peru",lat:-10,lon:-75}, {name:"Equador",lat:-1,lon:-79},
  {name:"Colômbia",lat:5,lon:-73}, {name:"Venezuela",lat:9,lon:-65},
  {name:"Guiana",lat:6,lon:-59}, {name:"Suriname",lat:5,lon:-55},
];
const countries: Location[] = [
  { name: "Brasil", lat: -15.8, lon: -47.9 },
  { name: "Argentina", lat: -34.6, lon: -58.4 },
  { name: "Paraguai", lat: -25.3, lon: -57.6 },
  { name: "Uruguai", lat: -34.9, lon: -56.2 },
];
const hubs: Location[] = [
  { name: "Divinópolis · MG", lat: -20.14, lon: -44.89 },
  { name: "Cachoeira do Sul · RS", lat: -30.0392, lon: -52.8939 },
];
// Destinos nacionais do mapa anterior, com os dois centros como origem.
const domestic = [
  [-9.97,-67.81],[-9.66,-35.74],[.03,-51.07],[-3.12,-60.02],[-12.97,-38.5],[-3.73,-38.53],
  [-15.8,-47.9],[-20.32,-40.34],[-16.68,-49.25],[-2.53,-44.3],[-15.6,-56.1],[-20.47,-54.62],
  [-1.45,-48.49],[-7.12,-34.86],[-25.43,-49.27],[-8.05,-34.88],[-5.09,-42.8],[-22.91,-43.17],
  [-5.79,-35.21],[-8.76,-63.9],[2.82,-60.67],[-27.59,-48.55],[-23.55,-46.63],[-10.91,-37.07],[-10.18,-48.33],
];
const rad = Math.PI / 180;
function vector(lat: number, lon: number): Vec {
  return [Math.cos(lat * rad) * Math.sin(lon * rad), Math.sin(lat * rad), Math.cos(lat * rad) * Math.cos(lon * rad)];
}
export default function DistributionGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(0);
  const focus = useRef({ lat: -19, lon: -53 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  const translate = useContentTranslation();

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const controller = new AbortController();
    let disposed = false, frame = 0, width = 0, height = 0, visible = true;
    let landLines: Vec[][] = [];
    let stateLines: Vec[][] = [], countryLines: Vec[][] = [];
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const view = { lat: -19, lon: -53 };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    resize.observe(root);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(root);
    fetch("/maps/south-america-boundaries.json", { signal: controller.signal })
      .then(response => response.json()).then((data: {states: Boundary[]; countries: Boundary[]}) => {
        if (disposed) return;
        const lines = (features: Boundary[]) => features.flatMap(({geometry}) => {
          const rings = geometry.type === "LineString" ? [geometry.coordinates as number[][]]
            : geometry.type === "MultiPolygon" ? (geometry.coordinates as number[][][][]).flat()
            : geometry.coordinates as number[][][];
          return rings.map(ring => ring.map(([lon,lat]) => vector(lat,lon)));
        });
        stateLines = lines(data.states); countryLines = lines(data.countries);
      }).catch(error => { if (error.name !== "AbortError") console.error(error); });
    fetch("/maps/land-110m.geojson", { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("Globe geography unavailable");
      return response.json() as Promise<GeoLand>;
    }).then(data => {
      if (disposed) return;
      const polygons = data.features.flatMap(feature => feature.geometry.type === "Polygon" ? [feature.geometry.coordinates as number[][][]] : feature.geometry.coordinates as number[][][][]);
      landLines = polygons.flatMap(polygon => polygon.map(ring => ring.map(([lon,lat]) => vector(lat,lon))));
    }).catch(error => { if (error.name !== "AbortError") console.error(error); });

    const draw = (now: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(draw);
      if (!visible || !width || document.hidden) return;
      const dark = document.documentElement.classList.contains("dark");
      const time = media.matches ? 0 : now / 1000;
      const ease = media.matches ? 1 : .035;
      view.lat += (focus.current.lat - view.lat) * ease;
      view.lon += (focus.current.lon - view.lon) * ease;
      const lat = view.lat * rad, lon = (view.lon + (drag.current || media.matches ? 0 : Math.sin(time * .12) * 2)) * rad;
      const radius = Math.min(width * .49, height * .49), cx = width * .54, cy = height * .49;
      const project = (v: Vec) => {
        const x = v[0] * Math.cos(lon) - v[2] * Math.sin(lon);
        const z0 = v[0] * Math.sin(lon) + v[2] * Math.cos(lon);
        const y = v[1] * Math.cos(lat) - z0 * Math.sin(lat);
        const z = v[1] * Math.sin(lat) + z0 * Math.cos(lat);
        const magnification = 1.5 / (1.5 - .5 * Math.min(1, z));
        return { x: cx + x * radius * magnification, y: cy - y * radius * magnification, z };
      };
      ctx.clearRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(cx, cy, radius * .8, cx, cy, radius * 1.19);
      glow.addColorStop(0, dark ? "#07548125" : "#0754810c"); glow.addColorStop(1, "#07548100");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      const sphere = ctx.createRadialGradient(cx - radius * .35, cy - radius * .45, 0, cx, cy, radius);
      sphere.addColorStop(0, dark ? "#102b3e" : "#f5f9fc"); sphere.addColorStop(1, dark ? "#050e16" : "#e2ebf0");
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fillStyle = sphere; ctx.fill();
      ctx.strokeStyle = dark ? "#ffffff25" : "#002d4d25"; ctx.lineWidth = 1; ctx.stroke();
      // Meridians and parallels follow the sphere, rather than a flat grid.
      ctx.strokeStyle = dark ? "#8db5ce0c" : "#002d4d0b"; ctx.lineWidth = .7;
      const line = (vertices: Vec[]) => {
        let pen = false; ctx.beginPath();
        vertices.forEach(v => { const p = project(v); if (p.z < .01) { pen = false; return; } if (pen) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); pen = true; }); ctx.stroke();
      };
      for (let l = -60; l <= 60; l += 30) line(Array.from({ length: 181 }, (_, i) => vector(l, i * 2 - 180)));
      for (let l = -180; l < 180; l += 30) line(Array.from({ length: 91 }, (_, i) => vector(i * 2 - 90, l)));
      ctx.strokeStyle = dark ? "#668da344" : "#52788c44"; ctx.lineWidth = .65;
      landLines.forEach(line);
      ctx.lineWidth = .75; ctx.strokeStyle = dark ? "#94b5ca44" : "#52788c55";
      stateLines.forEach(line);
      ctx.lineWidth = 1.2; ctx.strokeStyle = dark ? "#b8cfdd88" : "#315c7299";
      countryLines.forEach(line);
      const route = (from: Location, to: Location, index: number, international: boolean) => {
        const a = vector(from.lat, from.lon), b = vector(to.lat, to.lon);
        const at = (t: number): Vec => {
          const raw = a.map((v, i) => v * (1-t) + b[i] * t) as Vec;
          const length = Math.hypot(...raw), lift = 1 + Math.sin(t * Math.PI) * (international ? .18 : .1);
          return raw.map(v => v / length * lift) as Vec;
        };
        ctx.strokeStyle = international ? (dark ? "#ffffff99" : "#002d4d88") : "#ff550069";
        ctx.lineWidth = international ? 1 : .75; ctx.setLineDash([2, 5]); ctx.lineDashOffset = -time * 9;
        line(Array.from({ length: 61 }, (_, i) => at(i / 60))); ctx.setLineDash([]);
        const p = project(at((time * .16 + index * .13) % 1));
        if (p.z > 0) { ctx.beginPath(); ctx.arc(p.x, p.y, international ? 2 : 1.4, 0, Math.PI * 2); ctx.fillStyle = international && dark ? "#fff" : "#ff5500"; ctx.fill(); }
      };
      domestic.forEach(([lat, lon], index) => route(hubs[index % 2], { name: "", lat, lon }, index, false));
      countries.slice(1).forEach((country, index) => { const anchor = countryLabels.find(label => label.name === country.name)!; route(hubs[1], { ...anchor, lat: anchor.lat - 2 }, index, true); });
      // Labels use a halo and collision detection to stay legible at notebook sizes.
      const occupied: {x:number;y:number;w:number;h:number}[] = [];
      const label = (place: Location, country: boolean) => {
        const p = project(vector(place.lat,place.lon));
        if (p.z < .35 || p.x < 24 || p.x > width-24 || p.y < 20 || p.y > height-20) return;
        const size = country ? (width < 500 ? 11 : 14) : (width < 500 ? 8 : 10);
        ctx.font = `${country ? 600 : 400} ${size}px Poppins, sans-serif`;
        const name = place.name, w = ctx.measureText(name).width + 8;
        const box = {x:p.x-w/2,y:p.y-size/2,w,h:size+(country ? 24 : 5)};
        if (occupied.some(b => box.x < b.x+b.w && box.x+box.w > b.x && box.y < b.y+b.h && box.y+box.h > b.y)) return;
        occupied.push(box);
        ctx.textAlign = "center"; ctx.lineJoin = "round"; ctx.lineWidth = 4;
        ctx.strokeStyle = dark ? "#071722" : "#edf4f8"; ctx.strokeText(name,p.x,p.y);
        ctx.fillStyle = country ? (dark ? "#e4edf3" : "#002d4d") : (dark ? "#a5bdcc" : "#426477"); ctx.fillText(name,p.x,p.y);
        ctx.textAlign = "start";
        if (country && countries.some(entry => entry.name === place.name)) {
          const dotY = p.y + 10;
          const active = place.name === "Brasil";
          ctx.beginPath(); ctx.arc(p.x, dotY, active ? 5 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ff5500"; ctx.fill();
          ctx.beginPath(); ctx.arc(p.x, dotY, active ? 9 : 6, 0, Math.PI * 2);
          ctx.lineWidth = 1; ctx.strokeStyle = "#ff550080"; ctx.stroke();
        }
      };
      countryLabels.forEach(place => label(place,true));
      stateLabels.forEach(place => label(place,false));
      [...countries, ...hubs].forEach((place, index) => {
        if (index < countries.length) return;
        const anchor = index < countries.length ? countryLabels.find(label => label.name === place.name)! : place;
        const p = project(vector(anchor.lat, anchor.lon)); if (p.z < .1) return;
        if (index < countries.length) p.y += 14;
        const active = index === selectedRef.current;
        ctx.beginPath(); ctx.arc(p.x, p.y, active ? 6 : 3, 0, Math.PI * 2); ctx.fillStyle = "#ff5500"; ctx.shadowColor = "#ff5500"; ctx.shadowBlur = active ? 16 : 7; ctx.fill(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, active ? 13 + Math.sin(time * 2) * 2 : 6, 0, Math.PI * 2); ctx.strokeStyle = "#ff550080"; ctx.stroke();
        if (index >= countries.length) {
          ctx.font = `${active ? 600 : 400} ${width < 450 ? 10 : 12}px Poppins, sans-serif`;
          const labelWidth = ctx.measureText(place.name).width + 16;
          const lx = p.x - labelWidth / 2;
          const ly = p.y - 42;
          if (index >= countries.length) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y - 7); ctx.lineTo(p.x, ly + 25);
            ctx.strokeStyle = "#ff5500"; ctx.lineWidth = 1; ctx.stroke();
          }
          ctx.fillStyle = dark ? "#081722ed" : "#ffffffed"; ctx.beginPath(); ctx.roundRect(lx, ly, labelWidth, 25, 12); ctx.fill();
          ctx.fillStyle = active ? "#ff5500" : dark ? "#e2ebf0" : "#002d4d"; ctx.fillText(place.name, lx + 8, ly + 17);
        }
      });
    };
    frame = requestAnimationFrame(draw);
    return () => { disposed = true; controller.abort(); cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); };
  }, []);

  return <div className={styles.wrapper}>
    <div ref={rootRef} className={styles.globe}>
      <canvas ref={canvasRef} aria-label={translate("Distribuição no Brasil, Argentina, Paraguai e Uruguai")} role="img"
        onPointerDown={event => { drag.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => { if (!drag.current) return; focus.current.lon -= (event.clientX - drag.current.x) * .22; focus.current.lat = Math.max(-65, Math.min(65, focus.current.lat + (event.clientY - drag.current.y) * .22)); drag.current = { x: event.clientX, y: event.clientY }; }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} />
    </div>
  </div>;
}
