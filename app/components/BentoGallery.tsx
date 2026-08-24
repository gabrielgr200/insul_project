interface BentoImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

interface BentoGalleryProps {
  images: [
    BentoImage,
    BentoImage,
    BentoImage,
    BentoImage,
    BentoImage,
    BentoImage,
  ];
}

const CELL_CLASSES = [
  "col-span-2 row-span-1 md:col-span-6",
  "col-span-2 row-span-1 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-4",
  "col-span-1 row-span-1 md:col-span-2",
  "col-span-1 row-span-1 md:col-span-4",
];

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"];

const isVideoSrc = (src: string) => {
  const clean = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
};

const BentoGallery = ({ images }: BentoGalleryProps) => {
  return (
    <div className="grid grid-cols-2 auto-rows-[140px] gap-3 md:grid-cols-8 md:auto-rows-[150px]">
      {images.map((image, i) =>
        isVideoSrc(image.src) ? (
          <div
            key={image.src}
            className={`${CELL_CLASSES[i]} overflow-hidden rounded-md`}
          >
            <video
              src={image.src}
              aria-label={image.alt}
              className="h-full w-full object-cover"
              style={{ objectPosition: image.objectPosition ?? "center" }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        ) : (
          <div
            key={image.src}
            className={`${CELL_CLASSES[i]} overflow-hidden rounded-md`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              style={{ objectPosition: image.objectPosition ?? "center" }}
              draggable={false}
            />
          </div>
        ),
      )}
    </div>
  );
};

export default BentoGallery;
