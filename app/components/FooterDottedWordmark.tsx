"use client";

import { useEffect, useRef } from "react";

type Dot = { homeX: number; homeY: number; x: number; y: number; opacity: number; delay: number };

export default function FooterDottedWordmark() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let radius = 0.8;
    let frame = 0;
    let visible = false;
    let revealed = false;
    let startedAt = 0;
    let disposed = false;
    let pointer: { x: number; y: number } | null = null;

    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || disposed) return;
      const elapsed = motionPreference.matches ? 2 : (now - startedAt) / 1700;
      const reach = Math.min(110, Math.max(45, width * 0.08));
      let moving = false;
      let entering = false;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#e2e8ef";

      for (const dot of dots) {
        const progress = Math.max(0, Math.min(1, (elapsed - dot.delay) / 0.72));
        const ease = 1 - Math.pow(1 - progress, 3);
        let targetX = dot.homeX;
        let targetY = dot.homeY + (1 - ease) * height * 0.2;
        if (pointer && !motionPreference.matches) {
          const dx = dot.homeX - pointer.x;
          const dy = dot.homeY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < reach) {
            const force = Math.pow(1 - distance / reach, 2) * 20;
            targetX += dx / distance * force;
            targetY += dy / distance * force;
          }
        }
        if (motionPreference.matches) {
          dot.x = targetX;
          dot.y = targetY;
        } else {
          dot.x += (targetX - dot.x) * 0.16;
          dot.y += (targetY - dot.y) * 0.16;
        }
        moving ||= Math.abs(targetX - dot.x) + Math.abs(targetY - dot.y) > 0.04;
        entering ||= progress < 1;
        context.globalAlpha = dot.opacity * ease;
        context.fillRect(dot.x - radius, dot.y - radius, radius * 2, radius * 2);
      }
      context.globalAlpha = 1;
      if (!entering) revealed = true;
      if (entering || moving) frame = requestAnimationFrame(draw);
    };

    const requestDraw = () => {
      if (visible && !frame && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const build = () => {
      if (disposed) return;
      width = root.clientWidth;
      height = root.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mask = document.createElement("canvas");
      mask.width = Math.ceil(width);
      mask.height = Math.ceil(height);
      const ink = mask.getContext("2d", { willReadFrequently: true });
      if (!ink) return;
      const family = getComputedStyle(root).fontFamily;
      ink.font = `700 100px ${family}`;
      const metrics = ink.measureText("INSUL");
      const inkHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || 76;
      const size = Math.min(width * 0.96 / metrics.width, height * 0.86 / inkHeight) * 100;
      ink.font = `700 ${size}px ${family}`;
      ink.textAlign = "center";
      const fitted = ink.measureText("INSUL");
      const baseline = (height + fitted.actualBoundingBoxAscent - fitted.actualBoundingBoxDescent) / 2;
      ink.fillText("INSUL", width / 2, baseline);

      const pixels = ink.getImageData(0, 0, mask.width, mask.height).data;
      const gap = Math.max(3, Math.min(5, width / 300));
      radius = Math.max(0.55, Math.min(0.9, gap * 0.2));
      dots = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const alpha = pixels[(Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3];
          if (alpha < 128) continue;
          const fade = Math.pow(Math.max(0, 1 - y / height), 1.6);
          dots.push({ homeX: x, homeY: y, x, y: revealed ? y : y + height * 0.2, opacity: 0.025 + fade * 0.75, delay: x / width * 0.14 + y / height * 0.12 });
        }
      }
      if (revealed) startedAt = performance.now() - 2500;
      requestDraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      requestDraw();
    };
    const onPointerLeave = () => { pointer = null; requestDraw(); };
    const onVisibility = () => {
      if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
      else requestDraw();
    };
    const resize = new ResizeObserver(build);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (!startedAt) startedAt = performance.now();
        requestDraw();
      } else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { threshold: 0.08 });
    resize.observe(root);
    intersection.observe(root);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motionPreference.addEventListener("change", build);
    void document.fonts.ready.then(build);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionPreference.removeEventListener("change", build);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="relative mt-12 aspect-[4/1] w-full select-none sm:mt-16">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
