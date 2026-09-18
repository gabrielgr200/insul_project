"use client";

import dynamic from "next/dynamic";

const VideoCard3D = dynamic(() => import("./VideoCard3D"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video w-full animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
  ),
});

export default VideoCard3D;
