'use client';

import { useState } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa6";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/casadascercas", Icon: FaFacebookF, color: "#1877F2" },
  {
    label: "WhatsApp",
    href: "https://wa.me/5551995098453",
    Icon: FaWhatsapp,
    color: "#25D366",
  },
  { label: "Youtube", href: "https://www.youtube.com/@insultelas", Icon: FaYoutube, color: "#FF0000" },
  { label: "Instagram", href: "https://www.instagram.com/insultelas/", Icon: FaInstagram, gradient: true },
  { label: "Casa das Cercas", href: "https://www.casadascercas.com.br", Icon: FaGlobe, color: "#1b76bc" },
];

const SocialLinks = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 mt-6 w-fit">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FED576" />
            <stop offset="26%" stopColor="#F47133" />
            <stop offset="61%" stopColor="#BC3081" />
            <stop offset="100%" stopColor="#4C63D2" />
          </linearGradient>
        </defs>
      </svg>
      <style>{`.instagram-gradient-icon path { fill: url(#instagram-gradient); }`}</style>

      {socials.map((s) => (
        <div key={s.label} className="relative">
          <span
            className={`absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-[10px]
            font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200
            ${
              hovered === s.label
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            {s.label}
          </span>

          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            onMouseEnter={() => setHovered(s.label)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10
            hover:scale-110 hover:bg-white/20 transition-all duration-200"
            style={s.gradient ? undefined : { color: s.color }}
          >
            <s.Icon size={14} className={s.gradient ? "instagram-gradient-icon" : undefined} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
