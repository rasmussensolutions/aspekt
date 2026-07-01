"use client";

import { cn } from "cnfast";
import * as React from "react";

const surfaceLevels = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type SurfaceLevel = (typeof surfaceLevels)[number];

type SurfaceLevelValue = SurfaceLevel | number;

type SurfaceShadow = SurfaceLevelValue | false;

type SurfaceStyle = React.CSSProperties & {
  "--surface-current"?: string;
  "--surface-current-level"?: string;
  "--surface-muted"?: string;
  "--surface-hover"?: string;
  "--surface-active"?: string;
  "--surface-border"?: string;
  "--surface-border-strong"?: string;
  "--surface-ring"?: string;
  "--border"?: string;
  "--input"?: string;
  "--ring"?: string;
};

type SurfaceProviderProps = {
  children: React.ReactNode;
  value: SurfaceLevelValue;
};

type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  level?: SurfaceLevelValue | null;
  lift?: number | null;
  shadow?: SurfaceShadow | null;
};

type ElevatedSurfaceProps = Omit<SurfaceProps, "lift"> & {
  lift?: number | null;
};

const SurfaceLevelContext = React.createContext<SurfaceLevel>(1);

const surfaceBackgroundClasses = {
  1: "bg-surface-1",
  2: "bg-surface-2",
  3: "bg-surface-3",
  4: "bg-surface-4",
  5: "bg-surface-5",
  6: "bg-surface-6",
  7: "bg-surface-7",
  8: "bg-surface-8",
} satisfies Record<SurfaceLevel, string>;

const surfaceShadowClasses = {
  1: "shadow-surface-1",
  2: "shadow-surface-2",
  3: "shadow-surface-3",
  4: "shadow-surface-4",
  5: "shadow-surface-5",
  6: "shadow-surface-6",
  7: "shadow-surface-7",
  8: "shadow-surface-8",
} satisfies Record<SurfaceLevel, string>;

function clampSurfaceLevel(level: SurfaceLevelValue): SurfaceLevel {
  const nextLevel = Number.isFinite(level) ? Math.round(level) : 1;

  return Math.min(8, Math.max(1, nextLevel)) as SurfaceLevel;
}

function resolveSurfaceLevel({
  level,
  lift = 0,
  substrate,
}: {
  level?: SurfaceLevelValue | null;
  lift?: number | null;
  substrate: SurfaceLevelValue;
}) {
  return clampSurfaceLevel(level ?? clampSurfaceLevel(substrate) + (lift ?? 0));
}

function resolveSurfaceShadow(
  shadow: SurfaceShadow | null | undefined,
  fallback: SurfaceLevelValue,
) {
  if (shadow === false) return false;

  return clampSurfaceLevel(shadow ?? fallback);
}

function getSurfaceClassName(
  level: SurfaceLevelValue,
  shadow?: SurfaceShadow | null,
) {
  const resolvedLevel = clampSurfaceLevel(level);
  const resolvedShadow = resolveSurfaceShadow(shadow, resolvedLevel);

  return cn(
    surfaceBackgroundClasses[resolvedLevel],
    resolvedShadow === false ? null : surfaceShadowClasses[resolvedShadow],
  );
}

function getSurfaceStyle(
  level: SurfaceLevelValue,
  style?: React.CSSProperties,
): SurfaceStyle;
function getSurfaceStyle<TState>(
  level: SurfaceLevelValue,
  style?:
    | React.CSSProperties
    | ((state: TState) => React.CSSProperties | undefined),
): SurfaceStyle | ((state: TState) => SurfaceStyle);
function getSurfaceStyle<TState>(
  level: SurfaceLevelValue,
  style?:
    | React.CSSProperties
    | ((state: TState) => React.CSSProperties | undefined),
): SurfaceStyle | ((state: TState) => SurfaceStyle) {
  const resolvedLevel = clampSurfaceLevel(level);
  const surfaceStyle = {
    "--surface-current": `var(--surface-${resolvedLevel})`,
    "--surface-current-level": String(resolvedLevel),
    "--surface-muted":
      "color-mix(in oklab, var(--text-primary) var(--surface-muted-strength), var(--surface-current))",
    "--surface-hover":
      "color-mix(in oklab, var(--text-primary) var(--surface-hover-strength), var(--surface-current))",
    "--surface-active":
      "color-mix(in oklab, var(--text-primary) var(--surface-active-strength), var(--surface-current))",
    "--surface-border":
      "color-mix(in oklab, var(--text-primary) var(--surface-border-strength), var(--surface-current))",
    "--surface-border-strong":
      "color-mix(in oklab, var(--text-primary) var(--surface-border-strong-strength), var(--surface-current))",
    "--surface-ring":
      "color-mix(in oklab, var(--text-primary) var(--surface-ring-strength), transparent)",
    "--border": "var(--surface-border)",
    "--input": "var(--surface-border)",
    "--ring": "var(--surface-ring)",
  } satisfies SurfaceStyle;

  if (typeof style === "function") {
    return (state: TState) => ({
      ...surfaceStyle,
      ...style(state),
    });
  }

  return {
    ...surfaceStyle,
    ...style,
  } satisfies SurfaceStyle;
}

function useSurfaceLevel() {
  return React.useContext(SurfaceLevelContext);
}

function useResolvedSurfaceLevel({
  level,
  lift,
}: {
  level?: SurfaceLevelValue | null;
  lift?: number | null;
} = {}) {
  const substrate = useSurfaceLevel();

  return resolveSurfaceLevel({ level, lift, substrate });
}

function SurfaceProvider({ children, value }: SurfaceProviderProps) {
  return (
    <SurfaceLevelContext.Provider value={clampSurfaceLevel(value)}>
      {children}
    </SurfaceLevelContext.Provider>
  );
}

const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
  { children, className, level, lift = 0, shadow, style, ...props },
  ref,
) {
  const resolvedLevel = useResolvedSurfaceLevel({ level, lift });

  return (
    <SurfaceProvider value={resolvedLevel}>
      <div
        ref={ref}
        data-surface-level={resolvedLevel}
        className={cn(getSurfaceClassName(resolvedLevel, shadow), className)}
        style={getSurfaceStyle(resolvedLevel, style)}
        {...props}
      >
        {children}
      </div>
    </SurfaceProvider>
  );
});

const ElevatedSurface = React.forwardRef<HTMLDivElement, ElevatedSurfaceProps>(
  function ElevatedSurface({ lift = 1, ...props }, ref) {
    return <Surface ref={ref} lift={lift} {...props} />;
  },
);

export {
  ElevatedSurface,
  Surface,
  SurfaceProvider,
  clampSurfaceLevel,
  getSurfaceClassName,
  getSurfaceStyle,
  resolveSurfaceLevel,
  resolveSurfaceShadow,
  surfaceBackgroundClasses,
  surfaceLevels,
  surfaceShadowClasses,
  useResolvedSurfaceLevel,
  useSurfaceLevel,
};
export type {
  ElevatedSurfaceProps,
  SurfaceLevel,
  SurfaceLevelValue,
  SurfaceProps,
  SurfaceProviderProps,
  SurfaceShadow,
};
