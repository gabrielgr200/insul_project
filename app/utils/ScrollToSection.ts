import { ScrollSmoother } from "gsap/ScrollSmoother";

export function scrollToSection(id: string, headerOffset = 80) {
  const el = document.getElementById(id);
  if (!el) return;

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(smoother.offset(el, "top top") - headerOffset, true);
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}
