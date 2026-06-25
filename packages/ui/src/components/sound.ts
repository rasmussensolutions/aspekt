export type SoundName =
  | "button.solid"
  | "button.soft"
  | "button.ghost"
  | "button.outline"
  | "button.destructive"
  | "dialog.open"
  | "dialog.close"
  | "drawer.open"
  | "drawer.close"
  | "input.focus"
  | "input.unfocus"
  | "input.clear"
  | "select.open"
  | "select.close"
  | "select.change"
  | "toggle.on"
  | "toggle.off"
  | "checkbox.check"
  | "checkbox.uncheck"
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
  enabled: true,
  variant: "soft",
  volume: 1,
};

const outputVolumeBoost = 4;

let audioContext: AudioContext | null = null;

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

const softSounds: Record<SoundName, () => void> = {
  "button.solid": playButtonSolidSound,

  "button.soft": () => {
    playTone({
      frequency: 520,
      duration: 0.05,
      volume: 0.018 * settings.volume,
      type: "sine",
    });
  },

  "button.ghost": () => {
    playTone({
      frequency: 760,
      duration: 0.025,
      volume: 0.012 * settings.volume,
      type: "sine",
    });
  },

  "button.outline": () => {
    playTone({
      frequency: 620,
      duration: 0.035,
      volume: 0.02 * settings.volume,
      type: "triangle",
    });
  },

  "button.destructive": () => {
    playTone({
      frequency: 220,
      duration: 0.065,
      volume: 0.025 * settings.volume,
      type: "triangle",
    });
  },

  "dialog.open": () => {
    playTone({
      frequency: 360,
      endFrequency: 520,
      duration: 0.07,
      volume: 0.018 * settings.volume,
      type: "triangle",
    });
  },

  "dialog.close": () => {
    playTone({
      frequency: 420,
      endFrequency: 260,
      duration: 0.06,
      volume: 0.014 * settings.volume,
      type: "triangle",
    });
  },

  "drawer.open": () => {
    playTone({
      frequency: 320,
      endFrequency: 500,
      duration: 0.075,
      volume: 0.018 * settings.volume,
      type: "triangle",
    });
  },

  "drawer.close": () => {
    playTone({
      frequency: 400,
      endFrequency: 240,
      duration: 0.065,
      volume: 0.014 * settings.volume,
      type: "triangle",
    });
  },

  "input.focus": playButtonSolidSound,

  "input.unfocus": () => {
    playTone({
      frequency: 300,
      endFrequency: 240,
      duration: 0.07,
      volume: 0.014 * settings.volume,
      type: "triangle",
    });
  },

  "input.clear": () => {
    playTone({
      frequency: 640,
      endFrequency: 420,
      duration: 0.035,
      volume: 0.008 * settings.volume,
      type: "triangle",
    });
  },

  "select.open": () => {
    playTone({
      frequency: 460,
      endFrequency: 620,
      duration: 0.055,
      volume: 0.016 * settings.volume,
      type: "triangle",
    });
  },

  "select.close": () => {
    playTone({
      frequency: 360,
      endFrequency: 280,
      duration: 0.045,
      volume: 0.012 * settings.volume,
      type: "triangle",
    });
  },

  "select.change": () => {
    playTone({
      frequency: 680,
      duration: 0.032,
      volume: 0.014 * settings.volume,
      type: "sine",
    });
  },

  "toggle.on": () => {
    playTone({
      frequency: 520,
      endFrequency: 700,
      duration: 0.05,
      volume: 0.017 * settings.volume,
      type: "triangle",
    });
  },

  "toggle.off": () => {
    playTone({
      frequency: 420,
      endFrequency: 280,
      duration: 0.045,
      volume: 0.013 * settings.volume,
      type: "triangle",
    });
  },

  "checkbox.check": () => {
    playTone({
      frequency: 560,
      endFrequency: 720,
      duration: 0.045,
      volume: 0.015 * settings.volume,
      type: "triangle",
    });
  },

  "checkbox.uncheck": () => {
    playTone({
      frequency: 420,
      endFrequency: 260,
      duration: 0.04,
      volume: 0.011 * settings.volume,
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
    playTone({
      frequency: 180,
      duration: 0.08,
      volume: 0.026 * settings.volume,
      type: "triangle",
    });
  },
};

const clickSounds: Record<SoundName, () => void> = {
  "button.solid": () => {
    playTactileClick({
      brightness: 0.62,
      duration: 0.012,
      volume: 0.012 * settings.volume,
    });
  },

  "button.soft": () => {
    playTactileClick({
      brightness: 0.48,
      duration: 0.01,
      volume: 0.008 * settings.volume,
    });
  },

  "button.ghost": () => {
    playTactileClick({
      brightness: 0.78,
      duration: 0.008,
      volume: 0.006 * settings.volume,
    });
  },

  "button.outline": () => {
    playTactileClick({
      brightness: 0.58,
      duration: 0.011,
      volume: 0.009 * settings.volume,
    });
  },

  "button.destructive": () => {
    playTactileClick({
      brightness: 0.32,
      duration: 0.015,
      volume: 0.013 * settings.volume,
    });
  },

  "dialog.open": () => {
    playTactileClick({
      brightness: 0.54,
      duration: 0.014,
      volume: 0.01 * settings.volume,
    });
  },

  "dialog.close": () => {
    playTactileClick({
      brightness: 0.4,
      duration: 0.012,
      volume: 0.009 * settings.volume,
    });
  },

  "drawer.open": () => {
    playTactileClick({
      brightness: 0.52,
      duration: 0.014,
      volume: 0.01 * settings.volume,
    });
  },

  "drawer.close": () => {
    playTactileClick({
      brightness: 0.36,
      duration: 0.012,
      volume: 0.009 * settings.volume,
    });
  },

  "input.focus": () => {
    playTactileClick({
      brightness: 0.62,
      duration: 0.01,
      volume: 0.009 * settings.volume,
    });
  },

  "input.unfocus": () => {
    playTactileClick({
      brightness: 0.36,
      duration: 0.011,
      volume: 0.008 * settings.volume,
    });
  },

  "input.clear": () => {
    playTactileClick({
      brightness: 0.86,
      duration: 0.007,
      volume: 0.006 * settings.volume,
    });
  },

  "select.open": () => {
    playTactileClick({
      brightness: 0.5,
      duration: 0.011,
      volume: 0.009 * settings.volume,
    });
  },

  "select.close": () => {
    playTactileClick({
      brightness: 0.38,
      duration: 0.01,
      volume: 0.008 * settings.volume,
    });
  },

  "select.change": () => {
    playTactileClick({
      brightness: 0.78,
      duration: 0.008,
      volume: 0.008 * settings.volume,
    });
  },

  "toggle.on": () => {
    playTactileClick({
      brightness: 0.7,
      duration: 0.01,
      volume: 0.009 * settings.volume,
    });
  },

  "toggle.off": () => {
    playTactileClick({
      brightness: 0.42,
      duration: 0.01,
      volume: 0.0075 * settings.volume,
    });
  },

  "checkbox.check": () => {
    playTactileClick({
      brightness: 0.74,
      duration: 0.009,
      volume: 0.008 * settings.volume,
    });
  },

  "checkbox.uncheck": () => {
    playTactileClick({
      brightness: 0.44,
      duration: 0.009,
      volume: 0.0065 * settings.volume,
    });
  },

  success: () => {
    playTactileClick({
      brightness: 0.52,
      duration: 0.01,
      volume: 0.008 * settings.volume,
    });

    playTactileClick({
      brightness: 0.78,
      delay: 0.032,
      duration: 0.008,
      volume: 0.008 * settings.volume,
    });
  },

  error: () => {
    playTactileClick({
      brightness: 0.26,
      duration: 0.015,
      volume: 0.013 * settings.volume,
    });

    playTactileClick({
      brightness: 0.22,
      delay: 0.026,
      duration: 0.013,
      volume: 0.01 * settings.volume,
    });
  },
};

const snapSounds: Record<SoundName, () => void> = {
  "button.solid": () => {
    playSnap({
      brightness: 0.94,
      duration: 0.006,
      volume: 0.01 * settings.volume,
    });
  },

  "button.soft": () => {
    playSnap({
      brightness: 0.82,
      duration: 0.005,
      volume: 0.007 * settings.volume,
    });
  },

  "button.ghost": () => {
    playSnap({
      brightness: 1,
      duration: 0.004,
      volume: 0.0055 * settings.volume,
    });
  },

  "button.outline": () => {
    playSnap({
      brightness: 0.9,
      duration: 0.005,
      volume: 0.008 * settings.volume,
    });
  },

  "button.destructive": () => {
    playSnap({
      brightness: 0.62,
      duration: 0.008,
      volume: 0.011 * settings.volume,
    });
  },

  "dialog.open": () => {
    playSnap({
      brightness: 0.86,
      duration: 0.007,
      volume: 0.0085 * settings.volume,
    });
  },

  "dialog.close": () => {
    playSnap({
      brightness: 0.7,
      duration: 0.006,
      volume: 0.0075 * settings.volume,
    });
  },

  "drawer.open": () => {
    playSnap({
      brightness: 0.84,
      duration: 0.007,
      volume: 0.0085 * settings.volume,
    });
  },

  "drawer.close": () => {
    playSnap({
      brightness: 0.64,
      duration: 0.006,
      volume: 0.0075 * settings.volume,
    });
  },

  "input.focus": () => {
    playSnap({
      brightness: 0.92,
      duration: 0.005,
      volume: 0.008 * settings.volume,
    });
  },

  "input.unfocus": () => {
    playSnap({
      brightness: 0.64,
      duration: 0.006,
      volume: 0.0065 * settings.volume,
    });
  },

  "input.clear": () => {
    playSnap({
      brightness: 1,
      duration: 0.004,
      volume: 0.005 * settings.volume,
    });
  },

  "select.open": () => {
    playSnap({
      brightness: 0.82,
      duration: 0.006,
      volume: 0.0075 * settings.volume,
    });
  },

  "select.close": () => {
    playSnap({
      brightness: 0.66,
      duration: 0.005,
      volume: 0.0065 * settings.volume,
    });
  },

  "select.change": () => {
    playSnap({
      brightness: 0.98,
      duration: 0.004,
      volume: 0.0065 * settings.volume,
    });
  },

  "toggle.on": () => {
    playSnap({
      brightness: 0.9,
      duration: 0.005,
      volume: 0.007 * settings.volume,
    });
  },

  "toggle.off": () => {
    playSnap({
      brightness: 0.66,
      duration: 0.005,
      volume: 0.006 * settings.volume,
    });
  },

  "checkbox.check": () => {
    playSnap({
      brightness: 0.94,
      duration: 0.004,
      volume: 0.0065 * settings.volume,
    });
  },

  "checkbox.uncheck": () => {
    playSnap({
      brightness: 0.68,
      duration: 0.004,
      volume: 0.0055 * settings.volume,
    });
  },

  success: () => {
    playSnap({
      brightness: 0.82,
      duration: 0.005,
      volume: 0.0065 * settings.volume,
    });

    playSnap({
      brightness: 1,
      delay: 0.026,
      duration: 0.004,
      volume: 0.0065 * settings.volume,
    });
  },

  error: () => {
    playSnap({
      brightness: 0.48,
      duration: 0.008,
      volume: 0.0105 * settings.volume,
    });

    playSnap({
      brightness: 0.36,
      delay: 0.023,
      duration: 0.007,
      volume: 0.008 * settings.volume,
    });
  },
};

const popSounds: Record<SoundName, () => void> = {
  "button.solid": () => {
    playPop({
      frequency: 260,
      endFrequency: 130,
      volume: 0.02 * settings.volume,
    });
  },

  "button.soft": () => {
    playPop({
      frequency: 220,
      endFrequency: 130,
      duration: 0.036,
      volume: 0.014 * settings.volume,
    });
  },

  "button.ghost": () => {
    playPop({
      frequency: 340,
      endFrequency: 180,
      duration: 0.026,
      volume: 0.011 * settings.volume,
    });
  },

  "button.outline": () => {
    playPop({
      frequency: 250,
      endFrequency: 140,
      duration: 0.034,
      volume: 0.016 * settings.volume,
    });
  },

  "button.destructive": () => {
    playPop({
      frequency: 150,
      endFrequency: 90,
      duration: 0.05,
      volume: 0.023 * settings.volume,
      type: "triangle",
    });
  },

  "dialog.open": () => {
    playPop({
      frequency: 210,
      endFrequency: 320,
      duration: 0.044,
      volume: 0.016 * settings.volume,
    });
  },

  "dialog.close": () => {
    playPop({
      frequency: 210,
      endFrequency: 120,
      duration: 0.04,
      volume: 0.014 * settings.volume,
    });
  },

  "drawer.open": () => {
    playPop({
      frequency: 190,
      endFrequency: 310,
      duration: 0.046,
      volume: 0.016 * settings.volume,
    });
  },

  "drawer.close": () => {
    playPop({
      frequency: 200,
      endFrequency: 110,
      duration: 0.04,
      volume: 0.014 * settings.volume,
    });
  },

  "input.focus": () => {
    playPop({
      frequency: 250,
      endFrequency: 140,
      duration: 0.034,
      volume: 0.015 * settings.volume,
    });
  },

  "input.unfocus": () => {
    playPop({
      frequency: 180,
      endFrequency: 110,
      duration: 0.038,
      volume: 0.012 * settings.volume,
    });
  },

  "input.clear": () => {
    playPop({
      frequency: 380,
      endFrequency: 190,
      duration: 0.022,
      volume: 0.008 * settings.volume,
    });
  },

  "select.open": () => {
    playPop({
      frequency: 220,
      endFrequency: 300,
      duration: 0.036,
      volume: 0.014 * settings.volume,
    });
  },

  "select.close": () => {
    playPop({
      frequency: 200,
      endFrequency: 120,
      duration: 0.034,
      volume: 0.012 * settings.volume,
    });
  },

  "select.change": () => {
    playPop({
      frequency: 320,
      endFrequency: 170,
      duration: 0.024,
      volume: 0.01 * settings.volume,
    });
  },

  "toggle.on": () => {
    playPop({
      frequency: 220,
      endFrequency: 320,
      duration: 0.036,
      volume: 0.014 * settings.volume,
    });
  },

  "toggle.off": () => {
    playPop({
      frequency: 220,
      endFrequency: 120,
      duration: 0.032,
      volume: 0.011 * settings.volume,
    });
  },

  "checkbox.check": () => {
    playPop({
      frequency: 240,
      endFrequency: 340,
      duration: 0.032,
      volume: 0.012 * settings.volume,
    });
  },

  "checkbox.uncheck": () => {
    playPop({
      frequency: 210,
      endFrequency: 110,
      duration: 0.03,
      volume: 0.009 * settings.volume,
    });
  },

  success: () => {
    playPop({
      frequency: 240,
      endFrequency: 150,
      duration: 0.032,
      volume: 0.012 * settings.volume,
    });

    window.setTimeout(() => {
      playPop({
        frequency: 340,
        endFrequency: 220,
        duration: 0.032,
        volume: 0.012 * settings.volume,
      });
    }, 46);
  },

  error: () => {
    playPop({
      frequency: 130,
      endFrequency: 82,
      duration: 0.052,
      volume: 0.022 * settings.volume,
      type: "triangle",
    });
  },
};

const thockSounds: Record<SoundName, () => void> = {
  "button.solid": () => {
    playThock({
      frequency: 145,
      endFrequency: 94,
      volume: 0.012 * settings.volume,
    });
  },

  "button.soft": () => {
    playThock({
      brightness: 0.14,
      frequency: 165,
      endFrequency: 110,
      duration: 0.028,
      volume: 0.009 * settings.volume,
    });
  },

  "button.ghost": () => {
    playThock({
      brightness: 0.24,
      frequency: 205,
      endFrequency: 140,
      duration: 0.024,
      volume: 0.007 * settings.volume,
    });
  },

  "button.outline": () => {
    playThock({
      frequency: 155,
      endFrequency: 100,
      duration: 0.03,
      volume: 0.01 * settings.volume,
    });
  },

  "button.destructive": () => {
    playThock({
      brightness: 0.08,
      frequency: 98,
      endFrequency: 68,
      duration: 0.04,
      volume: 0.014 * settings.volume,
    });
  },

  "dialog.open": () => {
    playThock({
      frequency: 135,
      endFrequency: 190,
      duration: 0.034,
      volume: 0.011 * settings.volume,
    });
  },

  "dialog.close": () => {
    playThock({
      brightness: 0.12,
      frequency: 135,
      endFrequency: 84,
      duration: 0.032,
      volume: 0.01 * settings.volume,
    });
  },

  "drawer.open": () => {
    playThock({
      frequency: 128,
      endFrequency: 185,
      duration: 0.036,
      volume: 0.011 * settings.volume,
    });
  },

  "drawer.close": () => {
    playThock({
      brightness: 0.1,
      frequency: 128,
      endFrequency: 78,
      duration: 0.032,
      volume: 0.01 * settings.volume,
    });
  },

  "input.focus": () => {
    playThock({
      frequency: 165,
      endFrequency: 105,
      duration: 0.028,
      volume: 0.009 * settings.volume,
    });
  },

  "input.unfocus": () => {
    playThock({
      brightness: 0.12,
      frequency: 125,
      endFrequency: 82,
      duration: 0.03,
      volume: 0.008 * settings.volume,
    });
  },

  "input.clear": () => {
    playThock({
      brightness: 0.28,
      frequency: 215,
      endFrequency: 135,
      duration: 0.022,
      volume: 0.006 * settings.volume,
    });
  },

  "select.open": () => {
    playThock({
      frequency: 150,
      endFrequency: 195,
      duration: 0.03,
      volume: 0.009 * settings.volume,
    });
  },

  "select.close": () => {
    playThock({
      brightness: 0.12,
      frequency: 132,
      endFrequency: 88,
      duration: 0.028,
      volume: 0.008 * settings.volume,
    });
  },

  "select.change": () => {
    playThock({
      brightness: 0.22,
      frequency: 185,
      endFrequency: 120,
      duration: 0.024,
      volume: 0.008 * settings.volume,
    });
  },

  "toggle.on": () => {
    playThock({
      brightness: 0.2,
      frequency: 150,
      endFrequency: 205,
      duration: 0.028,
      volume: 0.009 * settings.volume,
    });
  },

  "toggle.off": () => {
    playThock({
      brightness: 0.12,
      frequency: 140,
      endFrequency: 86,
      duration: 0.028,
      volume: 0.0075 * settings.volume,
    });
  },

  "checkbox.check": () => {
    playThock({
      brightness: 0.22,
      frequency: 155,
      endFrequency: 210,
      duration: 0.026,
      volume: 0.008 * settings.volume,
    });
  },

  "checkbox.uncheck": () => {
    playThock({
      brightness: 0.12,
      frequency: 135,
      endFrequency: 82,
      duration: 0.026,
      volume: 0.0065 * settings.volume,
    });
  },

  success: () => {
    playThock({
      frequency: 155,
      endFrequency: 105,
      duration: 0.026,
      volume: 0.008 * settings.volume,
    });

    window.setTimeout(() => {
      playThock({
        brightness: 0.22,
        frequency: 205,
        endFrequency: 135,
        duration: 0.024,
        volume: 0.008 * settings.volume,
      });
    }, 40);
  },

  error: () => {
    playThock({
      brightness: 0.08,
      frequency: 92,
      endFrequency: 62,
      duration: 0.042,
      volume: 0.014 * settings.volume,
    });
  },
};

export function playSound(sound: SoundName) {
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
  return { ...settings };
}
