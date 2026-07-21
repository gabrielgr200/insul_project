'use client';

import { ArrowRight } from "lucide-react";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

interface TextArrowCTAProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TextArrowCTA = ({
  children = "Clique para ver os produtos",
  onClick,
  className = "",
}: TextArrowCTAProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col gap-2 cursor-pointer select-none ${className}`}
    >
      <span className="flex items-center">
        <span
          className={`flex items-center overflow-hidden w-0 opacity-0 -translate-x-2 transition-all duration-500 ${EASE} group-hover:w-[22px] group-hover:mr-2 group-hover:opacity-100 group-hover:translate-x-0`}
        >
          <ArrowRight size={18} className="text-[#ff5500] shrink-0" />
        </span>

        <span className="text-sm lg:text-base font-medium text-[#002d4d] poppins">
          {children}
        </span>

        <span
          className={`flex items-center overflow-hidden w-[22px] ml-2 opacity-100 translate-x-0 transition-all duration-500 ${EASE} group-hover:w-0 group-hover:ml-0 group-hover:opacity-0 group-hover:translate-x-2`}
        >
          <ArrowRight size={18} className="text-[#ff5500] shrink-0" />
        </span>
      </span>

      <span className="relative h-px w-full overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-full origin-right bg-[#ff5500] animate-line-out group-hover:origin-left group-hover:animate-line-in" />
      </span>
    </button>
  );
};

export default TextArrowCTA;
