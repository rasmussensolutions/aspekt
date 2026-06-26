"use client";

import * as React from "react";
import {
  configureSounds,
  getSoundDepthSettings,
  getSoundSettings,
  type SoundDepth,
  soundDepths,
  type SoundDepthInput,
  type SoundDepthSettings,
  type SoundName,
  type SoundPlayOptions,
  soundVariants,
  type SoundVariant,
  playSound,
  registerSoundProvider,
  unregisterSoundProvider,
} from "./sound";

type SoundProviderProps = {
  enabled?: boolean;
  depths?: SoundDepthInput;
  variant?: SoundVariant;
  volume?: number;
  children: React.ReactNode;
};

type SoundContextValue = {
  enabled: boolean;
  depths: SoundDepthSettings;
  variant: SoundVariant;
  volume: number;
  play: (sound: SoundName, options?: SoundPlayOptions) => void;
  setEnabled: (enabled: boolean) => void;
  setDepthEnabled: (depth: SoundDepth, enabled: boolean) => void;
  setDepths: (depths: SoundDepthInput) => void;
  setVariant: (variant: SoundVariant) => void;
  setVolume: (volume: number) => void;
};

const SoundContext = React.createContext<SoundContextValue | null>(null);

export function SoundProvider({
  enabled = true,
  depths,
  variant = "pop",
  volume = 1,
  children,
}: SoundProviderProps) {
  const [enabledState, setEnabledState] = React.useState(enabled);
  const [depthState, setDepthState] = React.useState(
    () => getSoundDepthSettings(depths),
  );
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
      depths: depthState,
      variant: variantState,
      volume: volumeState,
    });
  }, [depthState, enabledState, variantState, volumeState]);

  const play = React.useCallback(
    (sound: SoundName, options?: SoundPlayOptions) => {
      playSound(sound, options);
    },
    [],
  );

  const setDepths = React.useCallback((nextDepths: SoundDepthInput) => {
    setDepthState(getSoundDepthSettings(nextDepths));
  }, []);

  const setDepthEnabled = React.useCallback(
    (depth: SoundDepth, enabled: boolean) => {
      setDepthState((currentDepths) => ({
        ...currentDepths,
        [depth]: enabled,
      }));
    },
    [],
  );

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
      depths: depthState,
      variant: variantState,
      volume: volumeState,
      play,
      setEnabled,
      setDepthEnabled,
      setDepths,
      setVariant,
      setVolume,
    }),
    [
      depthState,
      enabledState,
      variantState,
      volumeState,
      play,
      setEnabled,
      setDepthEnabled,
      setDepths,
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
    depths: settings.depths,
    variant: settings.variant,
    volume: settings.volume,
    play: noop,
    setEnabled: noop,
    setDepthEnabled: noop,
    setDepths: noop,
    setVariant: noop,
    setVolume: noop,
  } satisfies SoundContextValue;
}

export { soundDepths, soundVariants };
export type {
  SoundDepth,
  SoundDepthInput,
  SoundDepthSettings,
  SoundName,
  SoundPlayOptions,
  SoundVariant,
};
