"use client";

import { useEffect, useRef } from "react";

export default function HoverGridBackground({ global = false }: { global?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = -1000;
    let y = -1000;
    let visible = false;

    const render = () => {
      frame = 0;
      const bounds = grid.getBoundingClientRect();
      const localX = x - bounds.left;
      const localY = y - bounds.top;
      const coveredByLocalGrid = global && Array.from(document.querySelectorAll<HTMLElement>('[data-hover-grid="local"]')).some(element => {
        const rect = element.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      });
      grid.style.setProperty("--hover-grid-x", `${localX}px`);
      grid.style.setProperty("--hover-grid-y", `${localY}px`);
      grid.style.setProperty("--hover-grid-visible", visible && !coveredByLocalGrid && media.matches && localX >= 0 && localX <= bounds.width && localY >= 0 && localY <= bounds.height ? "1" : "0");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      visible = true;
      schedule();
    };
    const hide = () => {
      visible = false;
      schedule();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    const observer = new IntersectionObserver(schedule);
    observer.observe(grid);
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", hide);
    media.addEventListener("change", hide);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", hide);
      media.removeEventListener("change", hide);
    };
  }, [global]);

  return <div ref={gridRef} aria-hidden="true" data-hover-grid={global ? "global" : "local"} className="hover-grid-background" />;
}
