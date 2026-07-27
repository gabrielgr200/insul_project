"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FillButtonProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  overlayClassName?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
};

const FillButton = React.forwardRef<HTMLElement, FillButtonProps>(
  ({ href, onClick, className, overlayClassName, target, rel, children }, forwardedRef) => {
    const localRef = React.useRef<HTMLElement | null>(null);
    const [clipPath, setClipPath] = React.useState("circle(0% at 50% 50%)");
    const [transition, setTransition] = React.useState("none");

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      [forwardedRef],
    );

    const getPoint = (e: React.MouseEvent<HTMLElement>) => {
      const rect = localRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      return { x, y };
    };

    const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
      const { x, y } = getPoint(e);
      setTransition("none");
      setClipPath(`circle(0% at ${x}% ${y}%)`);
      requestAnimationFrame(() => {
        setTransition("clip-path 550ms cubic-bezier(0.22, 1, 0.36, 1)");
        setClipPath(`circle(150% at ${x}% ${y}%)`);
      });
    };

    const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
      const { x, y } = getPoint(e);
      setTransition("clip-path 550ms cubic-bezier(0.22, 1, 0.36, 1)");
      setClipPath(`circle(0% at ${x}% ${y}%)`);
    };

    const Comp = (href ? "a" : "button") as React.ElementType;

    return (
      <Comp
        ref={setRefs}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn("relative isolate overflow-hidden", className)}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-2",
            overlayClassName,
          )}
          style={{ clipPath, transition }}
        >
          {children}
        </span>
      </Comp>
    );
  },
);
FillButton.displayName = "FillButton";

export default FillButton;
