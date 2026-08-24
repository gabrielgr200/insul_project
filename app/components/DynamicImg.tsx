'use client';

import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

const ImageLayer = ({ src, fadeIn }: { src: string; fadeIn: boolean }) => {
  const [visible, setVisible] = useState(!fadeIn);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!fadeIn) return;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setVisible(true));
      rafRef.current = raf2;
    });
    rafRef.current = raf1;
    return () => cancelAnimationFrame(rafRef.current);
  }, [fadeIn]);

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

const DynamicImg = ({ src }: { src?: string }) => {
  const nextId = useRef(0);
  const [layers, setLayers] = useState<{ id: number; src: string }[]>(() =>
    src ? [{ id: nextId.current++, src }] : [],
  );
  const lastSrcRef = useRef<string | undefined>(src);

  useEffect(() => {
    if (!src || src === lastSrcRef.current) return;
    lastSrcRef.current = src;

    const img = new window.Image();
    img.src = src;
    const addLayer = () => {
      if (lastSrcRef.current !== src) return;
      setLayers((prev) => [...prev, { id: nextId.current++, src }]);
    };
    if (img.complete) {
      addLayer();
    } else {
      img.onload = addLayer;
      img.onerror = () => {
        console.error(`DynamicImg: falha ao carregar a imagem "${src}"`);
        addLayer();
      };
    }
  }, [src]);

  useEffect(() => {
    if (layers.length <= 1) return;
    const timer = setTimeout(() => {
      setLayers((prev) => prev.slice(-1));
    }, 700);
    return () => clearTimeout(timer);
  }, [layers]);

  return (
    <>
      <div
        className="PRODUCTS-IMAGE relative lg:w-[60%] mt-10 lg:mt-0 saturate-130 overflow-clip
        transition-all duration-700 ease-in-out rounded-2xl"
      >
        <div
          className={`w-full h-[450px] lg:h-[700px] flex items-center
          justify-center text-zinc-500 ${!src && "bg-zinc-200"}`}
        >
          {!src && (
            <span className="text-lg">Shop by room image placeholder</span>
          )}
        </div>
        {layers.map((layer, i) => (
          <ImageLayer key={layer.id} src={layer.src} fadeIn={i > 0} />
        ))}
      </div>

      {src && layers.length === 0 && <Spinner />}
    </>
  );
};

export default DynamicImg;
