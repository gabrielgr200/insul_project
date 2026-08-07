import type { Locale } from "../i18n";

const flags: Record<Locale, React.ReactNode> = {
  pt: (
    <svg viewBox="0 0 28 20" className="block h-full w-full" aria-hidden>
      <rect width="28" height="20" fill="#009c3b" />
      <path d="M14 2 26 10 14 18 2 10Z" fill="#ffdf00" />
      <circle cx="14" cy="10" r="4.3" fill="#002776" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 28 20" className="block h-full w-full" aria-hidden>
      <rect width="28" height="20" fill="#fff" />
      <g fill="#b22234">
        <rect y="0" width="28" height="1.54" />
        <rect y="3.08" width="28" height="1.54" />
        <rect y="6.15" width="28" height="1.54" />
        <rect y="9.23" width="28" height="1.54" />
        <rect y="12.31" width="28" height="1.54" />
        <rect y="15.38" width="28" height="1.54" />
        <rect y="18.46" width="28" height="1.54" />
      </g>
      <rect width="12" height="10.77" fill="#3c3b6e" />
      <g fill="#fff">
        <circle cx="2.4" cy="2.2" r="0.7" />
        <circle cx="6" cy="2.2" r="0.7" />
        <circle cx="9.6" cy="2.2" r="0.7" />
        <circle cx="4.2" cy="4.6" r="0.7" />
        <circle cx="7.8" cy="4.6" r="0.7" />
        <circle cx="2.4" cy="7" r="0.7" />
        <circle cx="6" cy="7" r="0.7" />
        <circle cx="9.6" cy="7" r="0.7" />
        <circle cx="4.2" cy="9" r="0.7" />
        <circle cx="7.8" cy="9" r="0.7" />
      </g>
    </svg>
  ),
  es: (
    <svg viewBox="0 0 28 20" className="block h-full w-full" aria-hidden>
      <rect width="28" height="20" fill="#c60b1e" />
      <rect y="5" width="28" height="10" fill="#ffc400" />
    </svg>
  ),
};

const Flag = ({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) => (
  <span
    className={`inline-block shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 dark:ring-white/15 ${className}`}
  >
    {flags[locale]}
  </span>
);

export default Flag;
