const REELS = ["/videos/video_1.mp4", "/videos/video_2.mp4", "/videos/video_3.mp4"];

const VideoShowcase = () => {
  return (
    <section className="relative max-w-6xl mx-auto p-4 sm:p-8 mt-20 mb-20">

      <div className="w-full aspect-video rounded-3xl overflow-hidden bg-transparent">
        <video
          className="h-full w-full object-cover"
          src="/videos/insul.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 md:gap-6">
        {REELS.map((src) => (
          <div
            key={src}
            className="aspect-[9/16] rounded-2xl overflow-hidden bg-transparent"
          >
            <video
              className="h-full w-full object-cover"
              src={src}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoShowcase;
