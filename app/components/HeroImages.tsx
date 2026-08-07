const HeroImages = ({ src }: { src: string }) => {
  return (
    <img
      src={src}
      alt="Rolos de tela soldada Insul"
      className="block w-full h-auto object-contain saturate-120 HERO-IMAGE-WRAPPER"
    />
  );
};

export default HeroImages;
