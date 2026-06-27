"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { aspektConfig } from "./config";
import { playSound, type SoundName } from "./sound";

const switchVariants = cva(
  [
    "group/switch relative inline-flex shrink-0 cursor-pointer items-center border outline-none select-none",
    "transition-[background-color,border-color,box-shadow,opacity,transform] duration-200 ease-out",
    "active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-current/25",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:active:scale-100",
    "data-[readonly]:cursor-default data-[readonly]:active:scale-100",
    "data-[invalid]:border-destructive/55 data-[invalid]:ring-destructive/20",
  ],
  {
    variants: {
      variant: {
        solid: "border-border bg-surface hover:bg-surface-sunken/80",
        soft: "border-transparent bg-control-soft hover:bg-control-soft/80",
        outline: "border-border bg-surface hover:bg-surface-sunken",
      },
      color: {
        accent: "",
        info: "",
        destructive: "",
        warning: "",
        neutral: "",
      },
      size: {
        micro:
          "h-4 w-7 p-0.5 [--switch-thumb-radius:calc(var(--radius-sm)*0.8)] [--switch-thumb-size:0.75rem] [--switch-thumb-translate:0.75rem] [--switch-track-radius:var(--radius-sm)]",
        tiny: "h-4.5 w-8 p-0.5 [--switch-thumb-radius:var(--radius-sm)] [--switch-thumb-size:0.875rem] [--switch-thumb-translate:0.875rem] [--switch-track-radius:var(--radius-md)]",
        small:
          "h-5 w-9 p-0.5 [--switch-thumb-radius:var(--radius-sm)] [--switch-thumb-size:1rem] [--switch-thumb-translate:1rem] [--switch-track-radius:var(--radius-md)]",
        medium:
          "h-6 w-10.5 p-0.5 [--switch-thumb-radius:var(--radius-md)] [--switch-thumb-size:1.25rem] [--switch-thumb-translate:1.125rem] [--switch-track-radius:var(--radius-lg)]",
        large:
          "h-7 w-12 p-0.5 [--switch-thumb-radius:var(--radius-md)] [--switch-thumb-size:1.5rem] [--switch-thumb-translate:1.25rem] [--switch-track-radius:var(--radius-lg)]",
      },
      shape: {
        square: "rounded-[var(--switch-track-radius)]",
        round:
          "rounded-full [--switch-thumb-radius:var(--radius-full)] [--switch-track-radius:var(--radius-full)]",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "accent",
        className:
          "data-[checked]:border-action/15 data-[checked]:bg-action data-[checked]:hover:bg-action/90",
      },
      {
        variant: "solid",
        color: "info",
        className:
          "data-[checked]:border-info/20 data-[checked]:bg-info data-[checked]:hover:bg-info/90",
      },
      {
        variant: "solid",
        color: "destructive",
        className:
          "data-[checked]:border-destructive/20 data-[checked]:bg-destructive data-[checked]:hover:bg-destructive/90",
      },
      {
        variant: "solid",
        color: "warning",
        className:
          "data-[checked]:border-warning/25 data-[checked]:bg-warning data-[checked]:hover:bg-warning/90",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "data-[checked]:border-primary/10 data-[checked]:bg-primary data-[checked]:hover:bg-primary/90",
      },

      {
        variant: "soft",
        color: "accent",
        className:
          "data-[checked]:bg-action/10 data-[checked]:hover:bg-action/15",
      },
      {
        variant: "soft",
        color: "info",
        className: "data-[checked]:bg-info/10 data-[checked]:hover:bg-info/15",
      },
      {
        variant: "soft",
        color: "destructive",
        className:
          "data-[checked]:bg-destructive/10 data-[checked]:hover:bg-destructive/15",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "data-[checked]:bg-warning/15 data-[checked]:hover:bg-warning/20",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "data-[checked]:bg-primary/10 data-[checked]:hover:bg-primary/15",
      },

      {
        variant: "outline",
        color: "accent",
        className:
          "data-[checked]:border-action/25 data-[checked]:bg-action/5 data-[checked]:hover:bg-action/10",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "data-[checked]:border-info/30 data-[checked]:bg-info/5 data-[checked]:hover:bg-info/10",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "data-[checked]:border-destructive/30 data-[checked]:bg-destructive/5 data-[checked]:hover:bg-destructive/10",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "data-[checked]:border-warning/35 data-[checked]:bg-warning/10 data-[checked]:hover:bg-warning/15",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "data-[checked]:border-primary/15 data-[checked]:bg-primary/10 data-[checked]:hover:bg-primary/15",
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "neutral",
      size: "medium",
      shape: "round",
    },
  },
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block size-[var(--switch-thumb-size)] rounded-[var(--switch-thumb-radius)]",
    "bg-surface shadow-sm ring-1 ring-border",
    "transition-[translate,background-color,box-shadow] duration-200 ease-out",
    "data-[checked]:translate-x-[var(--switch-thumb-translate)]",
    "data-[checked]:bg-on-color",
  ],
  {
    variants: {
      color: {
        accent: "data-[checked]:bg-on-color",
        info: "data-[checked]:bg-on-color",
        destructive: "data-[checked]:bg-on-color",
        warning: "data-[checked]:bg-on-color",
        neutral: "data-[checked]:bg-surface",
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
        className: "data-[checked]:bg-action",
      },
      {
        variant: ["soft", "outline"],
        color: "info",
        className: "data-[checked]:bg-info",
      },
      {
        variant: ["soft", "outline"],
        color: "destructive",
        className: "data-[checked]:bg-destructive",
      },
      {
        variant: ["soft", "outline"],
        color: "warning",
        className: "data-[checked]:bg-warning",
      },
      {
        variant: ["soft", "outline"],
        color: "neutral",
        className: "data-[checked]:bg-primary",
      },
    ],
    defaultVariants: {
      color: "neutral",
      variant: "outline",
    },
  },
);

type SwitchRootProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
>;

type SwitchVariant = "solid" | "soft" | "outline";

type SwitchColor = "accent" | "info" | "destructive" | "warning" | "neutral";

type SwitchSize = "micro" | "tiny" | "small" | "medium" | "large";

type SwitchShape = "square" | "round";

type SwitchSound =
  | SoundName
  | false
  | {
      off?: SoundName | false;
      on?: SoundName | false;
    };

type SwitchProps = Omit<SwitchRootProps, "children" | "className" | "color"> & {
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
    return checked ? "on" : "off";
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
  const resolvedShape = shape ?? aspektConfig.shape;
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
          shape: resolvedShape,
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
