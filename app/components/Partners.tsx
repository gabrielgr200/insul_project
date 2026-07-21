'use client';

import { useState, useRef, useEffect } from "react";
import { useCountUp } from "../Hook/useCountUp";

const Partners = () => {
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
      <div className="grid grid-cols-4 text-center px-20 divide-x divide-zinc-300">
        <div>
          <h2 className="text-6xl impact font-bold text-[#ff5500]">
            {area}
          </h2>
          <p className="py-2 text-[#002d4d] font-normal">m² area fabril</p>
        </div>
        <div>
          <h2 className="text-6xl impact font-bold text-[#ff5500]">
            +{milhao}Milhão
          </h2>
          <p className="py-2 text-[#002d4d] font-normal">m² de telas / mês</p>
        </div>
        <div>
          <h2 className="text-6xl impact font-bold text-[#ff5500]">
            {anos}
          </h2>
          <p className="py-2 text-[#002d4d] font-normal">Anos de mercado</p>
        </div>
        <div>
          <h2 className="text-6xl impact font-bold text-[#ff5500]">
            +{toneladas}
          </h2>
          <p className="py-2 text-[#002d4d] font-normal">
            Ton. processadas / mês
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partners;
