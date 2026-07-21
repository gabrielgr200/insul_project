import { useState, useEffect, useRef } from "react";

export const useCountUp = (
  end: number,
  duration = 2750,
  start = 0,
  trigger = false,
) => {
  const [count, setCount] = useState(start);
  const [prevTrigger, setPrevTrigger] = useState(trigger);
  const frameRef = useRef<number | null>(null);

  if (trigger !== prevTrigger) {
    setPrevTrigger(trigger);
    if (!trigger) setCount(start);
  }

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * progress);
      setCount(value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current!);
  }, [trigger, end, duration, start]);

  return count;
};
