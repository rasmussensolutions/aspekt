"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { playSound, type SoundName } from "./sound";

const toggleVariants = cva(
  [
    "group/toggle inline-flex w-fit shrink-0 items-center justify-center",
    "font-medium whitespace-nowrap outline-none select-none",
    "transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-100",
    "cursor-pointer active:scale-[0.97]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:active:scale-100",
    "focus-visible:ring-2 focus-visible:ring-current/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid:
          "border border-neutral-950/10 bg-neutral-950/5 text-neutral-700 hover:bg-neutral-950/10 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15",
        soft:
          "border border-transparent bg-neutral-950/5 text-neutral-700 hover:bg-neutral-950/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15",
        ghost:
          "border border-transparent bg-transparent text-neutral-700 hover:bg-neutral-950/5 dark:text-neutral-200 dark:hover:bg-white/10",
        outline:
          "border border-neutral-950/10 bg-white text-neutral-700 hover:bg-neutral-950/5 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-white/10",
      },
      color: {
        accent: "",
        blue: "",
        red: "",
        amber: "",
        neutral: "",
      },
      size: {
        micro: "h-6.5 px-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        tiny: "h-7 px-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        small: "h-8 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
        medium: "h-9 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        large: "h-10 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        square: "rounded-lg",
        round: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "accent",
        className:
          "data-[pressed]:border-black/15 data-[pressed]:bg-primary data-[pressed]:text-white data-[pressed]:hover:bg-primary/90",
      },
      {
        variant: "solid",
        color: "blue",
        className:
          "data-[pressed]:border-blue-700 data-[pressed]:bg-blue-600 data-[pressed]:text-white data-[pressed]:hover:bg-blue-700",
      },
      {
        variant: "solid",
        color: "red",
        className:
          "data-[pressed]:border-red-700 data-[pressed]:bg-red-600 data-[pressed]:text-white data-[pressed]:hover:bg-red-700",
      },
      {
        variant: "solid",
        color: "amber",
        className:
          "data-[pressed]:border-amber-600 data-[pressed]:bg-amber-500 data-[pressed]:text-amber-950 data-[pressed]:hover:bg-amber-600",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "data-[pressed]:border-neutral-900 data-[pressed]:bg-neutral-950 data-[pressed]:text-white data-[pressed]:hover:bg-neutral-800 dark:data-[pressed]:border-white/80 dark:data-[pressed]:bg-white dark:data-[pressed]:text-neutral-950 dark:data-[pressed]:hover:bg-neutral-200",
      },

      {
        variant: "soft",
        color: "accent",
        className:
          "data-[pressed]:bg-primary/10 data-[pressed]:text-primary data-[pressed]:hover:bg-primary/15",
      },
      {
        variant: "soft",
        color: "blue",
        className:
          "data-[pressed]:bg-blue-600/10 data-[pressed]:text-blue-700 data-[pressed]:hover:bg-blue-600/15 dark:data-[pressed]:bg-blue-600/25 dark:data-[pressed]:text-blue-100",
      },
      {
        variant: "soft",
        color: "red",
        className:
          "data-[pressed]:bg-red-600/10 data-[pressed]:text-red-700 data-[pressed]:hover:bg-red-600/15 dark:data-[pressed]:bg-red-600/25 dark:data-[pressed]:text-red-300",
      },
      {
        variant: "soft",
        color: "amber",
        className:
          "data-[pressed]:bg-amber-500/15 data-[pressed]:text-amber-800 data-[pressed]:hover:bg-amber-500/20 dark:data-[pressed]:bg-amber-500/25 dark:data-[pressed]:text-amber-300",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "data-[pressed]:bg-neutral-950/10 data-[pressed]:text-neutral-950 data-[pressed]:hover:bg-neutral-950/15 dark:data-[pressed]:bg-white/15 dark:data-[pressed]:text-white dark:data-[pressed]:hover:bg-white/20",
      },

      {
        variant: "ghost",
        color: "accent",
        className:
          "data-[pressed]:bg-primary/10 data-[pressed]:text-primary data-[pressed]:hover:bg-primary/15",
      },
      {
        variant: "ghost",
        color: "blue",
        className:
          "data-[pressed]:bg-blue-600/10 data-[pressed]:text-blue-700 data-[pressed]:hover:bg-blue-600/15 dark:data-[pressed]:bg-blue-600/25 dark:data-[pressed]:text-blue-100",
      },
      {
        variant: "ghost",
        color: "red",
        className:
          "data-[pressed]:bg-red-600/10 data-[pressed]:text-red-700 data-[pressed]:hover:bg-red-600/15 dark:data-[pressed]:bg-red-600/25 dark:data-[pressed]:text-red-300",
      },
      {
        variant: "ghost",
        color: "amber",
        className:
          "data-[pressed]:bg-amber-500/15 data-[pressed]:text-amber-800 data-[pressed]:hover:bg-amber-500/20 dark:data-[pressed]:bg-amber-500/25 dark:data-[pressed]:text-amber-300",
      },
      {
        variant: "ghost",
        color: "neutral",
        className:
          "data-[pressed]:bg-neutral-950/10 data-[pressed]:text-neutral-950 data-[pressed]:hover:bg-neutral-950/15 dark:data-[pressed]:bg-white/15 dark:data-[pressed]:text-white dark:data-[pressed]:hover:bg-white/20",
      },

      {
        variant: "outline",
        color: "accent",
        className:
          "data-[pressed]:border-primary/25 data-[pressed]:bg-primary/5 data-[pressed]:text-primary data-[pressed]:hover:bg-primary/10",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "data-[pressed]:border-blue-600/30 data-[pressed]:bg-blue-600/5 data-[pressed]:text-blue-700 data-[pressed]:hover:bg-blue-600/10 dark:data-[pressed]:bg-blue-600/25 dark:data-[pressed]:text-blue-100",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "data-[pressed]:border-red-600/30 data-[pressed]:bg-red-600/5 data-[pressed]:text-red-700 data-[pressed]:hover:bg-red-600/10 dark:data-[pressed]:bg-red-600/25 dark:data-[pressed]:text-red-300",
      },
      {
        variant: "outline",
        color: "amber",
        className:
          "data-[pressed]:border-amber-500/35 data-[pressed]:bg-amber-500/10 data-[pressed]:text-amber-800 data-[pressed]:hover:bg-amber-500/15 dark:data-[pressed]:bg-amber-500/5 dark:data-[pressed]:text-amber-300",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "data-[pressed]:border-neutral-950/15 data-[pressed]:bg-neutral-950/10 data-[pressed]:text-neutral-950 data-[pressed]:hover:bg-neutral-950/15 dark:data-[pressed]:border-white/20 dark:data-[pressed]:bg-white/15 dark:data-[pressed]:text-white dark:data-[pressed]:hover:bg-white/20",
      },
    ],
    defaultVariants: {
      variant: "soft",
      color: "blue",
      size: "medium",
      shape: "square",
    },
  },
);

type ToggleVariant = "solid" | "soft" | "ghost" | "outline";

type ToggleColor = "accent" | "blue" | "red" | "amber" | "neutral";

type ToggleSize = "micro" | "tiny" | "small" | "medium" | "large";

type ToggleShape = "square" | "round";

type ToggleSound =
  | SoundName
  | false
  | {
      off?: SoundName | false;
      on?: SoundName | false;
    };

type ToggleProps = Omit<
  TogglePrimitive.Props,
  "className" | "color" | "prefix" | "suffix"
> & {
    className?: string;
    color?: ToggleColor | null;
    prefix?: React.ReactNode;
    shape?: ToggleShape | null;
    size?: ToggleSize | null;
    sound?: ToggleSound;
    suffix?: React.ReactNode;
    variant?: ToggleVariant | null;
  };

const toggleIndicatorSizes = {
  micro: "size-3",
  tiny: "size-3",
  small: "size-3.5",
  medium: "size-4",
  large: "size-4",
} satisfies Record<ToggleSize, string>;

const togglePrefixSlotWidths = {
  micro: "0.75rem",
  tiny: "0.875rem",
  small: "1rem",
  medium: "1rem",
  large: "1rem",
} satisfies Record<ToggleSize, string>;

const toggleAffixGaps = {
  micro: "0.375rem",
  tiny: "0.375rem",
  small: "0.5rem",
  medium: "0.5rem",
  large: "0.5rem",
} satisfies Record<ToggleSize, string>;

function getToggleSound(sound: ToggleSound | undefined, pressed: boolean) {
  if (sound === false) return false;

  if (sound === undefined) {
    return pressed ? "on" : "off";
  }

  if (typeof sound === "string") return sound;

  return pressed ? sound.on : sound.off;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToggleIndicator({ className }: { className?: string }) {
  return (
    <span
      data-slot="toggle-indicator"
      aria-hidden
      className={cn("grid shrink-0 place-items-center", className)}
    >
      <span className="col-start-1 row-start-1 size-1.5 rounded-full bg-current opacity-45 transition-[opacity,scale] duration-150 group-data-[pressed]/toggle:scale-50 group-data-[pressed]/toggle:opacity-0" />
      <CheckIcon className="col-start-1 row-start-1 size-full scale-50 opacity-0 transition-[opacity,scale] duration-150 group-data-[pressed]/toggle:scale-100 group-data-[pressed]/toggle:opacity-100" />
    </span>
  );
}

function ToggleAffix({
  side,
  show,
  gap,
  width,
  children,
}: {
  side: "prefix" | "suffix";
  show: boolean;
  gap: string;
  width?: string;
  children: React.ReactNode;
}) {
  const isPrefix = side === "prefix";

  return (
    <span
      data-slot={isPrefix ? "toggle-prefix" : "toggle-suffix"}
      data-visible={show ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden",
        "transition-[width,max-width,opacity,margin] duration-200 ease-out",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{
        width: width ? (show ? width : "0px") : undefined,
        maxWidth: width ? undefined : show ? "16rem" : "0px",
        marginRight: isPrefix && show ? gap : 0,
        marginLeft: !isPrefix && show ? gap : 0,
      }}
    >
      <span className="inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    children,
    className,
    color,
    onPressedChange,
    prefix,
    shape,
    size,
    sound,
    suffix,
    type = "button",
    variant,
    ...props
  },
  ref,
) {
  const resolvedSize = size ?? "medium";
  const hasLabel = Boolean(children);
  const hasPrefix = Boolean(prefix);
  const hasSuffix = Boolean(suffix);
  const showDefaultIndicator = !hasLabel && !hasPrefix && !hasSuffix;
  const showPrefix = hasPrefix || showDefaultIndicator;

  const handlePressedChange = React.useCallback<
    NonNullable<TogglePrimitive.Props["onPressedChange"]>
  >(
    (pressed, eventDetails) => {
      const resolvedSound = getToggleSound(sound, pressed);

      if (resolvedSound) {
        playSound(resolvedSound);
      }

      onPressedChange?.(pressed, eventDetails);
    },
    [onPressedChange, sound],
  );

  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle"
      type={type}
      className={cn(
        toggleVariants({
          variant,
          color,
          size: resolvedSize,
          shape,
          className,
        }),
      )}
      onPressedChange={handlePressedChange}
      {...props}
    >
      <ToggleAffix
        side="prefix"
        show={showPrefix}
        gap={hasLabel ? toggleAffixGaps[resolvedSize] : "0px"}
        width={hasPrefix ? undefined : togglePrefixSlotWidths[resolvedSize]}
      >
        {hasPrefix ? (
          prefix
        ) : (
          <ToggleIndicator className={toggleIndicatorSizes[resolvedSize]} />
        )}
      </ToggleAffix>

      {children && (
        <span data-slot="toggle-label" className="inline-flex items-center">
          {children}
        </span>
      )}

      <ToggleAffix
        side="suffix"
        show={hasSuffix}
        gap={hasLabel ? toggleAffixGaps[resolvedSize] : "0px"}
      >
        {suffix}
      </ToggleAffix>
    </TogglePrimitive>
  );
});

export { Toggle, toggleVariants };
export type {
  ToggleColor,
  ToggleProps,
  ToggleShape,
  ToggleSize,
  ToggleSound,
  ToggleVariant,
};
