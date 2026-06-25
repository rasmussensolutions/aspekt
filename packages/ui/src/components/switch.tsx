"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { playSound, type SoundName } from "./sound";

const switchVariants = cva(
  [
    "group/switch relative inline-flex shrink-0 cursor-pointer items-center border outline-none select-none",
    "transition-[background-color,border-color,box-shadow,opacity,transform] duration-200 ease-out",
    "active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-current/25",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:active:scale-100",
    "data-[readonly]:cursor-default data-[readonly]:active:scale-100",
    "data-[invalid]:border-red-600/55 data-[invalid]:ring-red-600/20 dark:data-[invalid]:border-red-500/60",
  ],
  {
    variants: {
      variant: {
        solid:
          "border-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15",
        soft:
          "border-transparent bg-neutral-950/5 hover:bg-neutral-950/10 dark:bg-white/10 dark:hover:bg-white/15",
        outline:
          "border-neutral-300 bg-white hover:bg-neutral-950/5 dark:border-white/15 dark:bg-neutral-900 dark:hover:bg-white/10",
      },
      color: {
        accent: "",
        blue: "",
        red: "",
        amber: "",
        neutral: "",
      },
      size: {
        micro:
          "h-4 w-7 p-0.5 [--switch-thumb-size:0.75rem] [--switch-thumb-translate:0.75rem]",
        tiny:
          "h-4.5 w-8 p-0.5 [--switch-thumb-size:0.875rem] [--switch-thumb-translate:0.875rem]",
        small:
          "h-5 w-9 p-0.5 [--switch-thumb-size:1rem] [--switch-thumb-translate:1rem]",
        medium:
          "h-6 w-10.5 p-0.5 [--switch-thumb-size:1.25rem] [--switch-thumb-translate:1.125rem]",
        large:
          "h-7 w-12 p-0.5 [--switch-thumb-size:1.5rem] [--switch-thumb-translate:1.25rem]",
      },
      shape: {
        square: "rounded-lg [--switch-thumb-radius:0.375rem]",
        round: "rounded-full [--switch-thumb-radius:999px]",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "accent",
        className:
          "data-[checked]:border-black/15 data-[checked]:bg-primary data-[checked]:hover:bg-primary/90",
      },
      {
        variant: "solid",
        color: "blue",
        className:
          "data-[checked]:border-blue-700 data-[checked]:bg-blue-600 data-[checked]:hover:bg-blue-700",
      },
      {
        variant: "solid",
        color: "red",
        className:
          "data-[checked]:border-red-700 data-[checked]:bg-red-600 data-[checked]:hover:bg-red-700",
      },
      {
        variant: "solid",
        color: "amber",
        className:
          "data-[checked]:border-amber-600 data-[checked]:bg-amber-500 data-[checked]:hover:bg-amber-600",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "data-[checked]:border-neutral-900 data-[checked]:bg-neutral-950 data-[checked]:hover:bg-neutral-800 dark:data-[checked]:border-white/80 dark:data-[checked]:bg-white dark:data-[checked]:hover:bg-neutral-200",
      },

      {
        variant: "soft",
        color: "accent",
        className:
          "data-[checked]:bg-primary/10 data-[checked]:hover:bg-primary/15",
      },
      {
        variant: "soft",
        color: "blue",
        className:
          "data-[checked]:bg-blue-600/10 data-[checked]:hover:bg-blue-600/15 dark:data-[checked]:bg-blue-600/25",
      },
      {
        variant: "soft",
        color: "red",
        className:
          "data-[checked]:bg-red-600/10 data-[checked]:hover:bg-red-600/15 dark:data-[checked]:bg-red-600/25",
      },
      {
        variant: "soft",
        color: "amber",
        className:
          "data-[checked]:bg-amber-500/15 data-[checked]:hover:bg-amber-500/20 dark:data-[checked]:bg-amber-500/25",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "data-[checked]:bg-neutral-950/10 data-[checked]:hover:bg-neutral-950/15 dark:data-[checked]:bg-white/15 dark:data-[checked]:hover:bg-white/20",
      },

      {
        variant: "outline",
        color: "accent",
        className:
          "data-[checked]:border-primary/25 data-[checked]:bg-primary/5 data-[checked]:hover:bg-primary/10",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "data-[checked]:border-blue-600/30 data-[checked]:bg-blue-600/5 data-[checked]:hover:bg-blue-600/10 dark:data-[checked]:bg-blue-600/25",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "data-[checked]:border-red-600/30 data-[checked]:bg-red-600/5 data-[checked]:hover:bg-red-600/10 dark:data-[checked]:bg-red-600/25",
      },
      {
        variant: "outline",
        color: "amber",
        className:
          "data-[checked]:border-amber-500/35 data-[checked]:bg-amber-500/10 data-[checked]:hover:bg-amber-500/15 dark:data-[checked]:bg-amber-500/5",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "data-[checked]:border-neutral-950/15 data-[checked]:bg-neutral-950/10 data-[checked]:hover:bg-neutral-950/15 dark:data-[checked]:border-white/20 dark:data-[checked]:bg-white/15 dark:data-[checked]:hover:bg-white/20",
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "blue",
      size: "medium",
      shape: "round",
    },
  },
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block size-[var(--switch-thumb-size)] rounded-[var(--switch-thumb-radius)]",
    "bg-white shadow-[0_1px_2px_rgb(0_0_0/0.16)] ring-1 ring-black/10",
    "transition-[translate,background-color,box-shadow] duration-200 ease-out",
    "data-[checked]:translate-x-[var(--switch-thumb-translate)]",
    "dark:bg-neutral-950 dark:ring-white/15 dark:data-[checked]:bg-white",
  ],
  {
    variants: {
      color: {
        accent: "data-[checked]:bg-white",
        blue: "data-[checked]:bg-white",
        red: "data-[checked]:bg-white",
        amber: "data-[checked]:bg-amber-950 dark:data-[checked]:bg-amber-950",
        neutral:
          "data-[checked]:bg-white dark:data-[checked]:bg-neutral-950",
      },
      variant: {
        solid: "",
        soft: "",
        outline: "",
      },
    },
    compoundVariants: [
      {
        variant: ["soft", "outline"],
        color: "accent",
        className: "data-[checked]:bg-primary",
      },
      {
        variant: ["soft", "outline"],
        color: "blue",
        className: "data-[checked]:bg-blue-600",
      },
      {
        variant: ["soft", "outline"],
        color: "red",
        className: "data-[checked]:bg-red-600",
      },
      {
        variant: ["soft", "outline"],
        color: "amber",
        className:
          "data-[checked]:bg-amber-500 dark:data-[checked]:bg-amber-500",
      },
      {
        variant: ["soft", "outline"],
        color: "neutral",
        className: "data-[checked]:bg-neutral-950 dark:data-[checked]:bg-white",
      },
    ],
    defaultVariants: {
      color: "blue",
      variant: "outline",
    },
  },
);

type SwitchRootProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
>;

type SwitchVariant = "solid" | "soft" | "outline";

type SwitchColor = "accent" | "blue" | "red" | "amber" | "neutral";

type SwitchSize = "micro" | "tiny" | "small" | "medium" | "large";

type SwitchShape = "square" | "round";

type SwitchSound =
  | SoundName
  | false
  | {
      off?: SoundName | false;
      on?: SoundName | false;
    };

type SwitchProps = Omit<
  SwitchRootProps,
  "children" | "className" | "color"
> & {
    className?: string;
    color?: SwitchColor | null;
    invalid?: boolean;
    shape?: SwitchShape | null;
    size?: SwitchSize | null;
    sound?: SwitchSound;
    thumb?: React.ReactNode;
    thumbClassName?: string;
    variant?: SwitchVariant | null;
  };

function getSwitchSound(sound: SwitchSound | undefined, checked: boolean) {
  if (sound === false) return false;

  if (sound === undefined) {
    return checked ? "switch.on" : "switch.off";
  }

  if (typeof sound === "string") return sound;

  return checked ? sound.on : sound.off;
}

const Switch = React.forwardRef<HTMLElement, SwitchProps>(function Switch(
  {
    className,
    color,
    invalid = false,
    onCheckedChange,
    shape,
    size,
    sound,
    thumb,
    thumbClassName,
    variant,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const handleCheckedChange = React.useCallback<
    NonNullable<SwitchRootProps["onCheckedChange"]>
  >(
    (checked, eventDetails) => {
      const resolvedSound = getSwitchSound(sound, checked);

      if (resolvedSound) {
        playSound(resolvedSound);
      }

      onCheckedChange?.(checked, eventDetails);
    },
    [onCheckedChange, sound],
  );

  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      data-invalid={invalid ? "" : undefined}
      aria-invalid={invalid || ariaInvalid ? true : undefined}
      className={cn(
        switchVariants({
          variant,
          color,
          size,
          shape,
          className,
        }),
      )}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          switchThumbVariants({ variant, color, className: thumbClassName }),
        )}
      >
        {thumb}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
});

export { Switch, switchVariants };
export type {
  SwitchColor,
  SwitchProps,
  SwitchShape,
  SwitchSize,
  SwitchSound,
  SwitchVariant,
};
