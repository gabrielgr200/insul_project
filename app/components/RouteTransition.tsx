"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import TransitionOverlay, {
  BAND_COUNT,
  BAND_DURATION,
  BAND_STAGGER,
} from "./TransitionOverlay";

const HOLD = 0.12;
const SWEEP_DURATION = BAND_DURATION + BAND_STAGGER * (BAND_COUNT - 1);
const MIN_COVER_MS = (SWEEP_DURATION + HOLD) * 1000;
const MAX_COVER_MS = 8000;

const isReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isInternalNavClick = (e: MouseEvent) => {
  if (e.defaultPrevented || e.button !== 0) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;

  const anchor = (e.target as HTMLElement | null)?.closest?.(
    "a[href]"
  ) as HTMLAnchorElement | null;
  if (!anchor) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  return url.pathname !== window.location.pathname;
};

type Phase = "idle" | "covering" | "revealing";

const BeginTransitionContext = createContext<() => void>(() => {});

export const useBeginPageTransition = () => useContext(BeginTransitionContext);

const RouteTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const coverStartPathname = useRef(pathname);
  const minElapsedRef = useRef(false);
  const navigatedRef = useRef(false);
  const minTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const maybeReveal = useCallback(() => {
    if (
      phaseRef.current === "covering" &&
      minElapsedRef.current &&
      navigatedRef.current
    ) {
      window.scrollTo(0, 0);
      setPhase("revealing");
    }
  }, []);

  const beginTransition = useCallback(() => {
    if (phaseRef.current !== "idle" || isReducedMotion()) return;

    // `coverStartPathname` already holds the last confirmed pathname (kept in
    // sync below whenever we're idle). Don't re-read window.location here:
    // for a browser back/forward navigation, the URL has already changed by
    // the time the popstate handler runs, which would make us compare against
    // the new pathname and never notice navigation "finished".
    minElapsedRef.current = false;
    navigatedRef.current = false;
    setPhase("covering");

    if (minTimeoutRef.current) clearTimeout(minTimeoutRef.current);
    minTimeoutRef.current = setTimeout(() => {
      minElapsedRef.current = true;
      maybeReveal();
    }, MIN_COVER_MS);

    if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    maxTimeoutRef.current = setTimeout(() => {
      minElapsedRef.current = true;
      navigatedRef.current = true;
      maybeReveal();
    }, MAX_COVER_MS);
  }, [maybeReveal]);

  // Keeps `coverStartPathname` in sync with the settled pathname (runs again
  // once `phase` returns to "idle", not just when `pathname` itself changes -
  // otherwise it goes stale and a later back/forward nav is never detected),
  // and confirms navigation completed once the URL actually changes.
  useEffect(() => {
    if (phase === "idle") {
      coverStartPathname.current = pathname;
    } else if (phase === "covering" && pathname !== coverStartPathname.current) {
      navigatedRef.current = true;
      maybeReveal();
    }
  }, [phase, pathname, maybeReveal]);

  useEffect(() => {
    if (phase !== "revealing") return;

    const timeout = setTimeout(() => setPhase("idle"), SWEEP_DURATION * 1000);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Fires the cover the instant the user clicks a link or navigates back/forward,
  // instead of waiting for the route change to actually resolve.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isInternalNavClick(e)) beginTransition();
    };
    const handlePopState = () => beginTransition();

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [beginTransition]);

  useEffect(() => {
    return () => {
      if (minTimeoutRef.current) clearTimeout(minTimeoutRef.current);
      if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    };
  }, []);

  return (
    <BeginTransitionContext.Provider value={beginTransition}>
      {children}
      {phase !== "idle" && (
        <TransitionOverlay covering={phase === "covering"} />
      )}
    </BeginTransitionContext.Provider>
  );
};

export default RouteTransition;
