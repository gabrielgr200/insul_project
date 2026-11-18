export function formatVoiceTime(value: number): string {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** RMS peaks sampled from the actual decoded audio, rather than random bars. */
export function voiceWaveform(samples: Float32Array, count = 32): number[] {
  const peaks = Array.from({ length: count }, (_, index) => {
    const start = Math.floor(index * samples.length / count);
    const end = Math.floor((index + 1) * samples.length / count);
    const stride = Math.max(1, Math.floor((end - start) / 256));
    let energy = 0;
    let size = 0;
    for (let offset = start; offset < end; offset += stride) { energy += samples[offset] ** 2; size++; }
    return size ? Math.sqrt(energy / size) : 0;
  });
  const max = Math.max(...peaks, 0.001);
  return peaks.map(peak => 3 + peak / max * 19);
}

/** Waveform window synchronized to playback time, preserving actual sound intensity. */
export function voicePlaybackBars(samples: Float32Array, sampleRate: number, time: number, count = 30): number[] {
  if (sampleRate <= 0 || !Number.isFinite(time)) return Array(count).fill(4);
  const start = Math.max(0, Math.floor(time * sampleRate));
  const windowSize = Math.max(count, Math.floor(sampleRate * 0.16));
  return Array.from({ length: count }, (_, index) => {
    const from = start + Math.floor(index * windowSize / count);
    const end = Math.min(samples.length, start + Math.floor((index + 1) * windowSize / count));
    let energy = 0;
    for (let offset = from; offset < end; offset++) energy += samples[offset] ** 2;
    const rms = end > from ? Math.sqrt(energy / (end - from)) : 0;
    return 4 + Math.min(1, rms * 7) * 12;
  });
}
