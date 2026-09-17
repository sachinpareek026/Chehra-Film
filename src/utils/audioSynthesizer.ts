// Web Audio API generator for ambient auteur cinema atmosphere
class CinemaAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Master gain with smooth fade in
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 2.5);
    masterGain.connect(this.ctx.destination);
    this.gainNode = masterGain;

    // Fundamental cinematic Indian drone: D2 (73.4Hz) and A2 (110Hz) harmonic resonance
    const freqs = [73.42, 110.0, 146.83, 220.0];
    this.oscillators = [];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Add gentle detune for organic acoustic warmth
      osc.detune.setValueAtTime((idx - 1.5) * 3, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.18 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start();
      this.oscillators.push(osc);
    });

    // Create subtle warm wind/field ambiance using filtered pink noise
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        output[i] = (b0 + b1 + b2) * 0.04;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);

      whiteNoise.start();
      this.noiseNode = whiteNoise;
    } catch {
      // Audio buffer fallback safe
    }

    this.isRunning = true;
  }

  public stop() {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      this.oscillators = [];
      if (this.noiseNode) {
        try {
          (this.noiseNode as AudioBufferSourceNode).stop();
          this.noiseNode.disconnect();
        } catch {
          // Ignore
        }
        this.noiseNode = null;
      }
      this.isRunning = false;
    }, 850);
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const cinemaAudio = new CinemaAudioEngine();
