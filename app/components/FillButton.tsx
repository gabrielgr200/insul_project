"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./FillButton.module.css";

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
  ({ href, onClick, className, target, rel, children }, ref) => {
    const Comp = (href ? "a" : "button") as React.ElementType;
    return <Comp data-home-button ref={ref} href={href} type={href ? undefined : "button"} target={target} rel={rel} onClick={onClick} className={cn(styles.button, className)}>
      <span className={styles.label}><span className={styles.text}>{children}</span><span className={`${styles.text} ${styles.copy}`} aria-hidden="true">{children}</span></span>
    </Comp>;
  }
);
FillButton.displayName = "FillButton";
export default FillButton;
