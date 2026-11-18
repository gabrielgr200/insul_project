"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function useChatScroll(frame: RefObject<HTMLDivElement | null>, messages: RefObject<HTMLDivElement | null>, active: boolean) {
  const resume = useRef<(() => void) | undefined>(undefined);
  const release = () => { resume.current?.(); resume.current = undefined; };
  const enter = () => {
    if (resume.current) return;
    const smoother = ScrollSmoother.get();
    if (smoother && !smoother.paused()) {
      smoother.paused(true);
      resume.current = () => { if (ScrollSmoother.get() === smoother) smoother.paused(false); };
    }
  };

  useEffect(() => {
    if (!active) return;
    const onWheel = (event: WheelEvent) => {
      const container = frame.current;
      if (!container || !(event.target instanceof Node) || !container.contains(event.target) || event.ctrlKey) return;
      // Capture before the site's scroll normalizer. At either edge, keep the wheel inside the chat.
      event.preventDefault();
      event.stopImmediatePropagation();
      let scroller: HTMLElement | null = messages.current;
      let element = event.target instanceof HTMLElement ? event.target : event.target.parentElement;
      while (element && element !== container) {
        const style = getComputedStyle(element);
        if ((/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight)
          || (event.deltaX !== 0 && /(auto|scroll)/.test(style.overflowX) && element.scrollWidth > element.clientWidth)) {
          scroller = element;
          break;
        }
        element = element.parentElement;
      }
      if (!scroller) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
      scroller.scrollTop += event.deltaY * unit;
      scroller.scrollLeft += event.deltaX * unit;
    };
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("blur", release);
      release();
    };
  }, [frame, messages, active]);

  return { onMouseEnter: enter, onMouseLeave: release };
}
