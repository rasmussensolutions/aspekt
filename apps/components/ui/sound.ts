export type SoundName =
  | "button.solid"
  | "button.soft"
  | "button.ghost"
  | "button.outline"
  | "button.destructive"
  | "dialog.open"
  | "dialog.close"
  | "input.focus"
  | "input.unfocus"
  | "input.clear"
  | "success"
  | "error";

type SoundSettings = {
  enabled: boolean;
  volume: number;
};

const settings: SoundSettings = {
  enabled: true,
  volume: 1,
};

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
      volume,
      ctx.currentTime + duration * 0.72,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  } else if (envelope === "reverse") {
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.002);
    gain.gain.exponentialRampToValueAtTime(
      volume * 0.38,
      ctx.currentTime + duration * 0.32,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  } else {
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.004);
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

const sounds: Record<SoundName, () => void> = {
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

export function playSound(sound: SoundName) {
  if (isMobileDevice()) return;
  sounds[sound]?.();
}

export function configureSounds(options: Partial<SoundSettings>) {
  if (typeof options.enabled === "boolean") {
    settings.enabled = options.enabled;
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

export function getSoundSettings() {
  return { ...settings };
}
