"use client";

import * as React from "react";
import {
  configureSounds,
  getSoundSettings,
  type SoundName,
  playSound,
} from "./sound";

type SoundProviderProps = {
  enabled?: boolean;
  volume?: number;
  children: React.ReactNode;
};

type SoundContextValue = {
  enabled: boolean;
  volume: number;
  play: (sound: SoundName) => void;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
};

const SoundContext = React.createContext<SoundContextValue | null>(null);

export function SoundProvider({
  enabled = true,
  volume = 1,
  children,
}: SoundProviderProps) {
  const [enabledState, setEnabledState] = React.useState(enabled);
  const [volumeState, setVolumeState] = React.useState(volume);

  React.useEffect(() => {
    configureSounds({ enabled: enabledState, volume: volumeState });
  }, [enabledState, volumeState]);

  const play = React.useCallback((sound: SoundName) => {
    playSound(sound);
  }, []);

  const setEnabled = React.useCallback((nextEnabled: boolean) => {
    setEnabledState(nextEnabled);
  }, []);

  const setVolume = React.useCallback((nextVolume: number) => {
    setVolumeState(nextVolume);
  }, []);

  const value = React.useMemo(
    () => ({
      enabled: enabledState,
      volume: volumeState,
      play,
      setEnabled,
      setVolume,
    }),
    [enabledState, volumeState, play, setEnabled, setVolume],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const context = React.useContext(SoundContext);

  if (context) return context;

  const settings = getSoundSettings();

  return {
    enabled: settings.enabled,
    volume: settings.volume,
    play: playSound,
    setEnabled: (enabled) => configureSounds({ enabled }),
    setVolume: (volume) => configureSounds({ volume }),
  } satisfies SoundContextValue;
}
