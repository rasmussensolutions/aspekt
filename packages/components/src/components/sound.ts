export type SoundName =
  | "press"
  | "open"
  | "close"
  | "focus"
  | "blur"
  | "clear"
  | "change"
  | "commit"
  | "on"
  | "off"
  | "success"
  | "error";

export const soundVariants = ["soft", "click", "snap", "pop", "thock"] as const;

export type SoundVariant = (typeof soundVariants)[number];

type SoundSettings = {
  enabled: boolean;
  variant: SoundVariant;
  volume: number;
};

const settings: SoundSettings = {
  enabled: false,
  variant: "pop",
  volume: 1,
};

const outputVolumeBoost = 4;

let audioContext: AudioContext | null = null;
let soundProviderCount = 0;

function isMobileDevice() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(pointer: coarse)").matches ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0)
  );
}

function getAudioContext() {
  if (typeof window === "undefined") return null;

  audioContext ??= new AudioContext();

  return audioContext;
}

function getOutputVolume(volume: number) {
  return Math.max(0, Math.min(volume * outputVolumeBoost, 1));
}

function playTone({
  frequency,
  endFrequency,
  duration,
  volume,
  type = "sine",
  envelope = "pluck",
}: {
  frequency: number;
  endFrequency?: number;
  duration: number;
  volume: number;
  type?: OscillatorType;
  envelope?: "pluck" | "swell" | "reverse";
}) {
  if (!settings.enabled) return;
  if (isMobileDevice()) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const outputVolume = getOutputVolume(volume);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  if (endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(
      endFrequency,
      ctx.currentTime + duration,
    );
  }

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);

  if (envelope === "swell") {
    gain.gain.exponentialRampToValueAtTime(
      outputVolume,
      ctx.currentTime + duration * 0.72,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  } else if (envelope === "reverse") {
    gain.gain.exponentialRampToValueAtTime(
      outputVolume,
      ctx.currentTime + 0.002,
    );
    gain.gain.exponentialRampToValueAtTime(
      outputVolume * 0.38,
      ctx.currentTime + duration * 0.32,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  } else {
    gain.gain.exponentialRampToValueAtTime(
      outputVolume,
      ctx.currentTime + 0.004,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  }

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

function blip(frequency: number, volume: number) {
  playTone({
    frequency,
    duration: 0.035,
    volume,
    type: "sine",
  });
}

function playButtonSolidSound() {
  playTone({
    frequency: 420,
    duration: 0.045,
    volume: 0.028 * settings.volume,
    type: "triangle",
  });
}

function playTactileClick({
  brightness = 0.55,
  delay = 0,
  duration = 0.012,
  volume,
}: {
  brightness?: number;
  delay?: number;
  duration?: number;
  volume: number;
}) {
  if (!settings.enabled) return;
  if (isMobileDevice()) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const sampleRate = ctx.sampleRate;
  const frameCount = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < frameCount; index += 1) {
    const progress = index / frameCount;
    const envelope = (1 - progress) ** 4;
    samples[index] = (Math.random() * 2 - 1) * envelope;
  }

  samples[0] = 1;
  if (frameCount > 1) samples[1] = -0.85;
  if (frameCount > 2) samples[2] = 0.45;

  const source = ctx.createBufferSource();
  const highpass = ctx.createBiquadFilter();
  const lowpass = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  const startTime = ctx.currentTime + delay;
  const outputVolume = getOutputVolume(volume);

  highpass.type = "highpass";
  highpass.frequency.setValueAtTime(1600 + brightness * 2200, startTime);
  highpass.Q.setValueAtTime(0.9, startTime);

  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(5200 + brightness * 4200, startTime);
  lowpass.Q.setValueAtTime(0.6, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(outputVolume, startTime + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  source.buffer = buffer;
  source.connect(highpass);
  highpass.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(ctx.destination);

  source.start(startTime);
  source.stop(startTime + duration);
}

function playSnap({
  brightness = 0.95,
  delay = 0,
  duration = 0.006,
  volume,
}: {
  brightness?: number;
  delay?: number;
  duration?: number;
  volume: number;
}) {
  playTactileClick({
    brightness,
    delay,
    duration,
    volume,
  });
}

function playPop({
  frequency,
  endFrequency,
  duration = 0.042,
  volume,
  type = "sine",
}: {
  frequency: number;
  endFrequency?: number;
  duration?: number;
  volume: number;
  type?: OscillatorType;
}) {
  playTone({
    frequency,
    endFrequency,
    duration,
    volume,
    type,
  });
}

function playThock({
  brightness = 0.18,
  frequency,
  endFrequency,
  duration = 0.034,
  volume,
}: {
  brightness?: number;
  frequency: number;
  endFrequency?: number;
  duration?: number;
  volume: number;
}) {
  playTactileClick({
    brightness,
    duration: 0.012,
    volume: volume * 0.7,
  });

  playTone({
    frequency,
    endFrequency,
    duration,
    volume,
    type: "triangle",
  });
}

type SoundMap = Record<SoundName, () => void>;

const softSounds: SoundMap = {
  press: playButtonSolidSound,

  open: () => {
    playTone({
      frequency: 360,
      endFrequency: 520,
      duration: 0.07,
      volume: 0.018 * settings.volume,
      type: "triangle",
    });
  },

  close: () => {
    playTone({
      frequency: 420,
      endFrequency: 260,
      duration: 0.06,
      volume: 0.014 * settings.volume,
      type: "triangle",
    });
  },

  focus: playButtonSolidSound,

  blur: () => {
    playTone({
      frequency: 300,
      endFrequency: 240,
      duration: 0.07,
      volume: 0.014 * settings.volume,
      type: "triangle",
    });
  },

  clear: () => {
    playTone({
      frequency: 640,
      endFrequency: 420,
      duration: 0.035,
      volume: 0.008 * settings.volume,
      type: "triangle",
    });
  },

  change: () => {
    playTone({
      frequency: 680,
      duration: 0.032,
      volume: 0.014 * settings.volume,
      type: "sine",
    });
  },

  commit: () => {
    playTone({
      frequency: 620,
      duration: 0.034,
      volume: 0.013 * settings.volume,
      type: "sine",
    });
  },

  on: () => {
    playTone({
      frequency: 520,
      endFrequency: 700,
      duration: 0.05,
      volume: 0.017 * settings.volume,
      type: "triangle",
    });
  },

  off: () => {
    playTone({
      frequency: 420,
      endFrequency: 280,
      duration: 0.045,
      volume: 0.013 * settings.volume,
      type: "triangle",
    });
  },

  success: () => {
    blip(520, 0.022 * settings.volume);

    window.setTimeout(() => {
      blip(780, 0.022 * settings.volume);
    }, 55);
  },

  error: () => {
    blip(392, 0.021 * settings.volume);

    window.setTimeout(() => {
      blip(311, 0.021 * settings.volume);
    }, 48);

    window.setTimeout(() => {
      blip(247, 0.018 * settings.volume);
    }, 96);
  },
};

const clickSounds: SoundMap = {
  press: () => {
    playTactileClick({
      brightness: 0.62,
      duration: 0.012,
      volume: 0.012 * settings.volume,
    });
  },

  open: () => {
    playTactileClick({
      brightness: 0.54,
      duration: 0.014,
      volume: 0.01 * settings.volume,
    });
  },

  close: () => {
    playTactileClick({
      brightness: 0.4,
      duration: 0.012,
      volume: 0.009 * settings.volume,
    });
  },

  focus: () => {
    playTactileClick({
      brightness: 0.62,
      duration: 0.01,
      volume: 0.009 * settings.volume,
    });
  },

  blur: () => {
    playTactileClick({
      brightness: 0.36,
      duration: 0.011,
      volume: 0.008 * settings.volume,
    });
  },

  clear: () => {
    playTactileClick({
      brightness: 0.86,
      duration: 0.007,
      volume: 0.006 * settings.volume,
    });
  },

  change: () => {
    playTactileClick({
      brightness: 0.78,
      duration: 0.008,
      volume: 0.008 * settings.volume,
    });
  },

  commit: () => {
    playTactileClick({
      brightness: 0.62,
      duration: 0.008,
      volume: 0.0075 * settings.volume,
    });
  },

  on: () => {
    playTactileClick({
      brightness: 0.7,
      duration: 0.01,
      volume: 0.009 * settings.volume,
    });
  },

  off: () => {
    playTactileClick({
      brightness: 0.42,
      duration: 0.01,
      volume: 0.0075 * settings.volume,
    });
  },

  success: () => {
    playTactileClick({
      brightness: 0.52,
      duration: 0.01,
      volume: 0.008 * settings.volume,
    });
    blip(520, 0.006 * settings.volume);

    playTactileClick({
      brightness: 0.78,
      delay: 0.032,
      duration: 0.008,
      volume: 0.008 * settings.volume,
    });

    window.setTimeout(() => {
      blip(780, 0.006 * settings.volume);
    }, 42);
  },

  error: () => {
    playTactileClick({
      brightness: 0.34,
      duration: 0.014,
      volume: 0.013 * settings.volume,
    });
    blip(392, 0.007 * settings.volume);

    playTactileClick({
      brightness: 0.18,
      delay: 0.042,
      duration: 0.013,
      volume: 0.0105 * settings.volume,
    });

    window.setTimeout(() => {
      blip(311, 0.007 * settings.volume);
    }, 42);

    window.setTimeout(() => {
      blip(247, 0.006 * settings.volume);
    }, 84);
  },
};

const snapSounds: SoundMap = {
  press: () => {
    playSnap({
      brightness: 0.94,
      duration: 0.006,
      volume: 0.01 * settings.volume,
    });
  },

  open: () => {
    playSnap({
      brightness: 0.86,
      duration: 0.007,
      volume: 0.0085 * settings.volume,
    });
  },

  close: () => {
    playSnap({
      brightness: 0.7,
      duration: 0.006,
      volume: 0.0075 * settings.volume,
    });
  },

  focus: () => {
    playSnap({
      brightness: 0.92,
      duration: 0.005,
      volume: 0.008 * settings.volume,
    });
  },

  blur: () => {
    playSnap({
      brightness: 0.64,
      duration: 0.006,
      volume: 0.0065 * settings.volume,
    });
  },

  clear: () => {
    playSnap({
      brightness: 1,
      duration: 0.004,
      volume: 0.005 * settings.volume,
    });
  },

  change: () => {
    playSnap({
      brightness: 0.98,
      duration: 0.004,
      volume: 0.0065 * settings.volume,
    });
  },

  commit: () => {
    playSnap({
      brightness: 0.78,
      duration: 0.004,
      volume: 0.006 * settings.volume,
    });
  },

  on: () => {
    playSnap({
      brightness: 0.9,
      duration: 0.005,
      volume: 0.007 * settings.volume,
    });
  },

  off: () => {
    playSnap({
      brightness: 0.66,
      duration: 0.005,
      volume: 0.006 * settings.volume,
    });
  },

  success: () => {
    playSnap({
      brightness: 0.82,
      duration: 0.005,
      volume: 0.0065 * settings.volume,
    });
    blip(520, 0.005 * settings.volume);

    playSnap({
      brightness: 1,
      delay: 0.026,
      duration: 0.004,
      volume: 0.0065 * settings.volume,
    });

    window.setTimeout(() => {
      blip(780, 0.005 * settings.volume);
    }, 34);
  },

  error: () => {
    playSnap({
      brightness: 0.52,
      duration: 0.007,
      volume: 0.0105 * settings.volume,
    });
    blip(392, 0.006 * settings.volume);

    playSnap({
      brightness: 0.24,
      delay: 0.036,
      duration: 0.007,
      volume: 0.009 * settings.volume,
    });

    window.setTimeout(() => {
      blip(311, 0.006 * settings.volume);
    }, 34);

    window.setTimeout(() => {
      blip(247, 0.005 * settings.volume);
    }, 68);
  },
};

const popSounds: SoundMap = {
  press: () => {
    playPop({
      frequency: 260,
      endFrequency: 130,
      volume: 0.02 * settings.volume,
    });
  },

  open: () => {
    playPop({
      frequency: 360,
      endFrequency: 540,
      duration: 0.052,
      volume: 0.016 * settings.volume,
      type: "triangle",
    });
  },

  close: () => {
    playPop({
      frequency: 260,
      endFrequency: 150,
      duration: 0.044,
      volume: 0.014 * settings.volume,
      type: "triangle",
    });
  },

  focus: () => {
    playPop({
      frequency: 300,
      endFrequency: 160,
      duration: 0.036,
      volume: 0.015 * settings.volume,
    });
  },

  blur: () => {
    playPop({
      frequency: 220,
      endFrequency: 120,
      duration: 0.034,
      volume: 0.012 * settings.volume,
    });
  },

  clear: () => {
    playPop({
      frequency: 420,
      endFrequency: 220,
      duration: 0.03,
      volume: 0.01 * settings.volume,
    });
  },

  change: () => {
    playPop({
      frequency: 520,
      endFrequency: 280,
      duration: 0.026,
      volume: 0.012 * settings.volume,
    });
  },

  commit: () => {
    playPop({
      frequency: 400,
      endFrequency: 190,
      duration: 0.03,
      volume: 0.011 * settings.volume,
    });
  },

  on: () => {
    playPop({
      frequency: 360,
      endFrequency: 760,
      duration: 0.045,
      volume: 0.016 * settings.volume,
      type: "triangle",
    });
  },

  off: () => {
    playPop({
      frequency: 340,
      endFrequency: 150,
      duration: 0.036,
      volume: 0.012 * settings.volume,
    });
  },

  success: () => {
    playPop({
      frequency: 360,
      endFrequency: 620,
      duration: 0.04,
      volume: 0.014 * settings.volume,
      type: "triangle",
    });

    window.setTimeout(() => {
      playPop({
        frequency: 520,
        endFrequency: 860,
        duration: 0.038,
        volume: 0.012 * settings.volume,
        type: "triangle",
      });
    }, 48);
  },

  error: () => {
    playPop({
      frequency: 210,
      endFrequency: 110,
      duration: 0.04,
      volume: 0.022 * settings.volume,
      type: "triangle",
    });

    window.setTimeout(() => {
      playPop({
        frequency: 150,
        endFrequency: 80,
        duration: 0.045,
        volume: 0.018 * settings.volume,
        type: "triangle",
      });
    }, 52);
  },
};

const thockSounds: SoundMap = {
  press: () => {
    playThock({
      frequency: 180,
      endFrequency: 92,
      volume: 0.018 * settings.volume,
    });
  },

  open: () => {
    playThock({
      brightness: 0.2,
      frequency: 220,
      endFrequency: 145,
      duration: 0.038,
      volume: 0.016 * settings.volume,
    });
  },

  close: () => {
    playThock({
      brightness: 0.14,
      frequency: 170,
      endFrequency: 92,
      duration: 0.034,
      volume: 0.014 * settings.volume,
    });
  },

  focus: () => {
    playThock({
      brightness: 0.2,
      frequency: 190,
      endFrequency: 100,
      duration: 0.03,
      volume: 0.014 * settings.volume,
    });
  },

  blur: () => {
    playThock({
      brightness: 0.12,
      frequency: 150,
      endFrequency: 82,
      duration: 0.03,
      volume: 0.012 * settings.volume,
    });
  },

  clear: () => {
    playThock({
      brightness: 0.28,
      frequency: 240,
      endFrequency: 128,
      duration: 0.024,
      volume: 0.01 * settings.volume,
    });
  },

  change: () => {
    playThock({
      brightness: 0.26,
      frequency: 260,
      endFrequency: 142,
      duration: 0.024,
      volume: 0.011 * settings.volume,
    });
  },

  commit: () => {
    playThock({
      brightness: 0.2,
      frequency: 220,
      endFrequency: 112,
      duration: 0.026,
      volume: 0.01 * settings.volume,
    });
  },

  on: () => {
    playThock({
      brightness: 0.24,
      frequency: 220,
      endFrequency: 160,
      duration: 0.034,
      volume: 0.014 * settings.volume,
    });
  },

  off: () => {
    playThock({
      brightness: 0.12,
      frequency: 150,
      endFrequency: 78,
      duration: 0.03,
      volume: 0.011 * settings.volume,
    });
  },

  success: () => {
    playThock({
      brightness: 0.2,
      frequency: 220,
      endFrequency: 150,
      duration: 0.03,
      volume: 0.012 * settings.volume,
    });
    blip(440, 0.005 * settings.volume);

    window.setTimeout(() => {
      playThock({
        brightness: 0.3,
        frequency: 300,
        endFrequency: 190,
        duration: 0.032,
        volume: 0.012 * settings.volume,
      });
    }, 48);

    window.setTimeout(() => {
      blip(660, 0.005 * settings.volume);
    }, 54);
  },

  error: () => {
    playThock({
      brightness: 0.1,
      frequency: 118,
      endFrequency: 82,
      duration: 0.03,
      volume: 0.014 * settings.volume,
    });
    blip(330, 0.006 * settings.volume);

    window.setTimeout(() => {
      playThock({
        brightness: 0.06,
        frequency: 82,
        endFrequency: 52,
        duration: 0.04,
        volume: 0.012 * settings.volume,
      });
    }, 54);

    window.setTimeout(() => {
      blip(247, 0.006 * settings.volume);
    }, 48);

    window.setTimeout(() => {
      blip(196, 0.005 * settings.volume);
    }, 96);
  },
};

export function playSound(sound: SoundName) {
  if (soundProviderCount === 0) return;
  if (isMobileDevice()) return;
  const sounds =
    {
      soft: softSounds,
      click: clickSounds,
      snap: snapSounds,
      pop: popSounds,
      thock: thockSounds,
    }[settings.variant] ?? softSounds;
  sounds[sound]?.();
}

export function configureSounds(options: Partial<SoundSettings>) {
  if (typeof options.enabled === "boolean") {
    settings.enabled = options.enabled;
  }

  if (
    typeof options.variant === "string" &&
    (soundVariants as readonly string[]).includes(options.variant)
  ) {
    settings.variant = options.variant;
  }

  if (typeof options.volume === "number") {
    settings.volume = Math.max(0, Math.min(options.volume, 1));
  }
}

export function enableSounds() {
  settings.enabled = true;
}

export function disableSounds() {
  settings.enabled = false;
}

export function setSoundVolume(volume: number) {
  settings.volume = Math.max(0, Math.min(volume, 1));
}

export function setSoundVariant(variant: SoundVariant) {
  settings.variant = variant;
}

export function getSoundSettings() {
  return { ...settings, enabled: soundProviderCount > 0 && settings.enabled };
}

export function registerSoundProvider() {
  soundProviderCount += 1;
}

export function unregisterSoundProvider() {
  soundProviderCount = Math.max(0, soundProviderCount - 1);

  if (soundProviderCount === 0) {
    settings.enabled = false;
  }
}
