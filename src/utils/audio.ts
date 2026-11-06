/**
 * Web Audio API synthesizer for the iconic Netflix "Ta-Dum" sound.
 * Zero external audio files, works completely offline with zero latency.
 */
let audioCtx: AudioContext | null = null;

export function playNetflixTaDum() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    } else if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const ctx = audioCtx;
    const now = ctx.currentTime;

    // 1. Deep Sub Bass hit (D1 note ~ 36.7Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(73.4, now); // D2
    subOsc.frequency.exponentialRampToValueAtTime(36.7, now + 0.8); // D1
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.5, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.5);

    // 2. Cinematic First Hit (Ta)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(146.8, now); // D3
    osc1.frequency.exponentialRampToValueAtTime(110.0, now + 0.35);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);

    // 3. Cinematic Second Resonant Hit (Dummm)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(110.0, now + 0.18); // A2
    osc2.frequency.exponentialRampToValueAtTime(73.4, now + 1.2); // D2
    gain2.gain.setValueAtTime(0.001, now + 0.18);
    gain2.gain.linearRampToValueAtTime(0.38, now + 0.28);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 1.7);
  } catch {
    // Graceful fallback if audio is blocked or restricted
  }
}
