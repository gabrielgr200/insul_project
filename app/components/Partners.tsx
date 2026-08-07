'use client';

import { useState, useRef, useEffect } from "react";
import { useCountUp } from "../Hook/useCountUp";
import { useTranslation } from "./LanguageProvider";

const Partners = () => {
  const { t } = useTranslation();
  const [counterState, setCounterState] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCounterState(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const area = useCountUp(8460, 2750, 0, counterState);
  const milhao = useCountUp(1, 2750, 0, counterState);
  const anos = useCountUp(14, 2750, 0, counterState);
  const toneladas = useCountUp(450, 2750, 0, counterState);

  return (
    <div ref={sectionRef} className="px-2.5 py-2">
      <div className="grid grid-cols-2 gap-y-8 border-zinc-300 [&>*:nth-child(2)]:border-l [&>*:nth-child(4)]:border-l px-[clamp(1rem,5vw,5rem)] text-center min-[1213px]:grid-cols-4 min-[1213px]:gap-y-0 min-[1213px]:divide-x min-[1213px]:divide-zinc-300">
        <div>
          <h2 className="impact text-[clamp(1.25rem,5vw,3.75rem)] font-bold text-[#ff5500]">
            {area}
          </h2>
          <p className="py-2 text-[clamp(0.7rem,2vw,1rem)] text-[#002d4d] dark:text-white font-normal">{t("partners.area")}</p>
        </div>
        <div>
          <h2 className="impact text-[clamp(1.25rem,5vw,3.75rem)] font-bold text-[#ff5500]">
            +{milhao}Milhão
          </h2>
          <p className="py-2 text-[clamp(0.7rem,2vw,1rem)] text-[#002d4d] dark:text-white font-normal">{t("partners.telas")}</p>
        </div>
        <div>
          <h2 className="impact text-[clamp(1.25rem,5vw,3.75rem)] font-bold text-[#ff5500]">
            {anos}
          </h2>
          <p className="py-2 text-[clamp(0.7rem,2vw,1rem)] text-[#002d4d] dark:text-white font-normal">{t("partners.anos")}</p>
        </div>
        <div>
          <h2 className="impact text-[clamp(1.25rem,5vw,3.75rem)] font-bold text-[#ff5500]">
            +{toneladas}
          </h2>
          <p className="py-2 text-[clamp(0.7rem,2vw,1rem)] text-[#002d4d] dark:text-white font-normal">
            {t("partners.toneladas")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partners;
