"use client";

import * as React from "react";
import {
  configureSounds,
  getSoundSettings,
  type SoundName,
  soundVariants,
  type SoundVariant,
  playSound,
  registerSoundProvider,
  unregisterSoundProvider,
} from "./sound";

type SoundProviderProps = {
  enabled?: boolean;
  variant?: SoundVariant;
  volume?: number;
  children: React.ReactNode;
};

type SoundContextValue = {
  enabled: boolean;
  variant: SoundVariant;
  volume: number;
  play: (sound: SoundName) => void;
  setEnabled: (enabled: boolean) => void;
  setVariant: (variant: SoundVariant) => void;
  setVolume: (volume: number) => void;
};

const SoundContext = React.createContext<SoundContextValue | null>(null);

export function SoundProvider({
  enabled = true,
  variant = "pop",
  volume = 1,
  children,
}: SoundProviderProps) {
  const [enabledState, setEnabledState] = React.useState(enabled);
  const [variantState, setVariantState] = React.useState(variant);
  const [volumeState, setVolumeState] = React.useState(volume);

  React.useEffect(() => {
    registerSoundProvider();

    return () => {
      unregisterSoundProvider();
    };
  }, []);

  React.useEffect(() => {
    configureSounds({
      enabled: enabledState,
      variant: variantState,
      volume: volumeState,
    });
  }, [enabledState, variantState, volumeState]);

  const play = React.useCallback((sound: SoundName) => {
    playSound(sound);
  }, []);

  const setEnabled = React.useCallback((nextEnabled: boolean) => {
    setEnabledState(nextEnabled);
  }, []);

  const setVariant = React.useCallback((nextVariant: SoundVariant) => {
    setVariantState(nextVariant);
  }, []);

  const setVolume = React.useCallback((nextVolume: number) => {
    setVolumeState(nextVolume);
  }, []);

  const value = React.useMemo(
    () => ({
      enabled: enabledState,
      variant: variantState,
      volume: volumeState,
      play,
      setEnabled,
      setVariant,
      setVolume,
    }),
    [
      enabledState,
      variantState,
      volumeState,
      play,
      setEnabled,
      setVariant,
      setVolume,
    ],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const context = React.useContext(SoundContext);

  if (context) return context;

  const settings = getSoundSettings();
  const noop = () => {};

  return {
    enabled: settings.enabled,
    variant: settings.variant,
    volume: settings.volume,
    play: noop,
    setEnabled: noop,
    setVariant: noop,
    setVolume: noop,
  } satisfies SoundContextValue;
}

export { soundVariants };
export type { SoundName, SoundVariant };
