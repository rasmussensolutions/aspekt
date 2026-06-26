"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { playSound, type SoundName } from "./sound";

const checkboxVariants = cva(
  [
    "group/checkbox inline-flex shrink-0 items-center justify-center border",
    "text-transparent outline-none select-none",
    "transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-100",
    "cursor-pointer active:scale-[0.92]",
    "focus-visible:ring-2 focus-visible:ring-current/25",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:active:scale-100",
    "data-[readonly]:cursor-default data-[readonly]:active:scale-100",
    "data-[invalid]:border-red-600/55 data-[invalid]:ring-red-600/20 dark:data-[invalid]:border-red-500/60",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid:
          "border-neutral-300 bg-white text-white hover:bg-neutral-50 dark:border-white/15 dark:bg-neutral-900 dark:hover:bg-white/10",
        soft:
          "border-transparent bg-neutral-950/5 text-transparent hover:bg-neutral-950/10 dark:bg-white/10 dark:hover:bg-white/15",
        outline:
          "border-neutral-300 bg-transparent text-transparent hover:bg-neutral-950/5 dark:border-white/15 dark:hover:bg-white/10",
      },
      color: {
        accent: "",
        blue: "",
        red: "",
        amber: "",
        neutral: "",
      },
      size: {
        micro: "size-3.5 [&_svg]:size-2.5",
        tiny: "size-4 [&_svg]:size-3",
        small: "size-4.5 [&_svg]:size-3.5",
        medium: "size-5 [&_svg]:size-4",
        large: "size-5.5 [&_svg]:size-4.5",
      },
      shape: {
        square: "rounded-md",
        round: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "accent",
        className:
          "data-[checked]:border-black/15 data-[checked]:bg-primary data-[checked]:text-white data-[checked]:hover:bg-primary/90 data-[indeterminate]:border-black/15 data-[indeterminate]:bg-primary data-[indeterminate]:text-white",
      },
      {
        variant: "solid",
        color: "blue",
        className:
          "data-[checked]:border-blue-700 data-[checked]:bg-blue-600 data-[checked]:text-white data-[checked]:hover:bg-blue-700 data-[indeterminate]:border-blue-700 data-[indeterminate]:bg-blue-600 data-[indeterminate]:text-white",
      },
      {
        variant: "solid",
        color: "red",
        className:
          "data-[checked]:border-red-700 data-[checked]:bg-red-600 data-[checked]:text-white data-[checked]:hover:bg-red-700 data-[indeterminate]:border-red-700 data-[indeterminate]:bg-red-600 data-[indeterminate]:text-white",
      },
      {
        variant: "solid",
        color: "amber",
        className:
          "data-[checked]:border-amber-600 data-[checked]:bg-amber-500 data-[checked]:text-amber-950 data-[checked]:hover:bg-amber-600 data-[indeterminate]:border-amber-600 data-[indeterminate]:bg-amber-500 data-[indeterminate]:text-amber-950",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "data-[checked]:border-neutral-900 data-[checked]:bg-neutral-950 data-[checked]:text-white data-[checked]:hover:bg-neutral-800 data-[indeterminate]:border-neutral-900 data-[indeterminate]:bg-neutral-950 data-[indeterminate]:text-white dark:data-[checked]:border-white/80 dark:data-[checked]:bg-white dark:data-[checked]:text-neutral-950 dark:data-[checked]:hover:bg-neutral-200 dark:data-[indeterminate]:border-white/80 dark:data-[indeterminate]:bg-white dark:data-[indeterminate]:text-neutral-950",
      },

      {
        variant: "soft",
        color: "accent",
        className:
          "data-[checked]:bg-primary/10 data-[checked]:text-primary data-[checked]:hover:bg-primary/15 data-[indeterminate]:bg-primary/10 data-[indeterminate]:text-primary",
      },
      {
        variant: "soft",
        color: "blue",
        className:
          "data-[checked]:bg-blue-600/10 data-[checked]:text-blue-700 data-[checked]:hover:bg-blue-600/15 data-[indeterminate]:bg-blue-600/10 data-[indeterminate]:text-blue-700 dark:data-[checked]:bg-blue-600/25 dark:data-[checked]:text-blue-100 dark:data-[indeterminate]:bg-blue-600/25 dark:data-[indeterminate]:text-blue-100",
      },
      {
        variant: "soft",
        color: "red",
        className:
          "data-[checked]:bg-red-600/10 data-[checked]:text-red-700 data-[checked]:hover:bg-red-600/15 data-[indeterminate]:bg-red-600/10 data-[indeterminate]:text-red-700 dark:data-[checked]:bg-red-600/25 dark:data-[checked]:text-red-300 dark:data-[indeterminate]:bg-red-600/25 dark:data-[indeterminate]:text-red-300",
      },
      {
        variant: "soft",
        color: "amber",
        className:
          "data-[checked]:bg-amber-500/15 data-[checked]:text-amber-800 data-[checked]:hover:bg-amber-500/20 data-[indeterminate]:bg-amber-500/15 data-[indeterminate]:text-amber-800 dark:data-[checked]:bg-amber-500/25 dark:data-[checked]:text-amber-300 dark:data-[indeterminate]:bg-amber-500/25 dark:data-[indeterminate]:text-amber-300",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "data-[checked]:bg-neutral-950/10 data-[checked]:text-neutral-950 data-[checked]:hover:bg-neutral-950/15 data-[indeterminate]:bg-neutral-950/10 data-[indeterminate]:text-neutral-950 dark:data-[checked]:bg-white/15 dark:data-[checked]:text-white dark:data-[checked]:hover:bg-white/20 dark:data-[indeterminate]:bg-white/15 dark:data-[indeterminate]:text-white",
      },

      {
        variant: "outline",
        color: "accent",
        className:
          "data-[checked]:border-primary/25 data-[checked]:bg-primary/5 data-[checked]:text-primary data-[checked]:hover:bg-primary/10 data-[indeterminate]:border-primary/25 data-[indeterminate]:bg-primary/5 data-[indeterminate]:text-primary",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "data-[checked]:border-blue-600/30 data-[checked]:bg-blue-600/5 data-[checked]:text-blue-700 data-[checked]:hover:bg-blue-600/10 data-[indeterminate]:border-blue-600/30 data-[indeterminate]:bg-blue-600/5 data-[indeterminate]:text-blue-700 dark:data-[checked]:bg-blue-600/25 dark:data-[checked]:text-blue-100 dark:data-[indeterminate]:bg-blue-600/25 dark:data-[indeterminate]:text-blue-100",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "data-[checked]:border-red-600/30 data-[checked]:bg-red-600/5 data-[checked]:text-red-700 data-[checked]:hover:bg-red-600/10 data-[indeterminate]:border-red-600/30 data-[indeterminate]:bg-red-600/5 data-[indeterminate]:text-red-700 dark:data-[checked]:bg-red-600/25 dark:data-[checked]:text-red-300 dark:data-[indeterminate]:bg-red-600/25 dark:data-[indeterminate]:text-red-300",
      },
      {
        variant: "outline",
        color: "amber",
        className:
          "data-[checked]:border-amber-500/35 data-[checked]:bg-amber-500/10 data-[checked]:text-amber-800 data-[checked]:hover:bg-amber-500/15 data-[indeterminate]:border-amber-500/35 data-[indeterminate]:bg-amber-500/10 data-[indeterminate]:text-amber-800 dark:data-[checked]:bg-amber-500/5 dark:data-[checked]:text-amber-300 dark:data-[indeterminate]:bg-amber-500/5 dark:data-[indeterminate]:text-amber-300",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "data-[checked]:border-neutral-950/15 data-[checked]:bg-neutral-950/10 data-[checked]:text-neutral-950 data-[checked]:hover:bg-neutral-950/15 data-[indeterminate]:border-neutral-950/15 data-[indeterminate]:bg-neutral-950/10 data-[indeterminate]:text-neutral-950 dark:data-[checked]:border-white/20 dark:data-[checked]:bg-white/15 dark:data-[checked]:text-white dark:data-[checked]:hover:bg-white/20 dark:data-[indeterminate]:border-white/20 dark:data-[indeterminate]:bg-white/15 dark:data-[indeterminate]:text-white",
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "blue",
      size: "medium",
      shape: "square",
    },
  },
);

type CheckboxRootProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

type CheckboxVariant = "solid" | "soft" | "outline";

type CheckboxColor = "accent" | "blue" | "red" | "amber" | "neutral";

type CheckboxSize = "micro" | "tiny" | "small" | "medium" | "large";

type CheckboxShape = "square" | "round";

type CheckboxSound =
  | SoundName
  | false
  | {
      off?: SoundName | false;
      on?: SoundName | false;
    };

type CheckboxProps = Omit<
  CheckboxRootProps,
  "children" | "className" | "color"
> & {
    className?: string;
    color?: CheckboxColor | null;
    indicator?: React.ReactNode;
    indeterminateIndicator?: React.ReactNode;
    invalid?: boolean;
    shape?: CheckboxShape | null;
    size?: CheckboxSize | null;
    sound?: CheckboxSound;
    variant?: CheckboxVariant | null;
  };

function getCheckboxSound(sound: CheckboxSound | undefined, checked: boolean) {
  if (sound === false) return false;

  if (sound === undefined) {
    return checked ? "on" : "off";
  }

  if (typeof sound === "string") return sound;

  return checked ? sound.on : sound.off;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
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

function MinusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 8H12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  function Checkbox(
    {
      className,
      color,
      indicator,
      indeterminateIndicator,
      invalid = false,
      onCheckedChange,
      shape,
      size,
      sound,
      variant,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) {
    const handleCheckedChange = React.useCallback<
      NonNullable<CheckboxRootProps["onCheckedChange"]>
    >(
      (checked, eventDetails) => {
        const resolvedSound = getCheckboxSound(sound, checked);

        if (resolvedSound) {
          playSound(resolvedSound);
        }

        onCheckedChange?.(checked, eventDetails);
      },
      [onCheckedChange, sound],
    );

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        data-invalid={invalid ? "" : undefined}
        aria-invalid={invalid || ariaInvalid ? true : undefined}
        className={cn(
          checkboxVariants({
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
        <CheckboxPrimitive.Indicator
          keepMounted
          data-slot="checkbox-indicator"
          className={cn(
            "grid size-full place-items-center",
            "transition-[opacity,scale] duration-150",
            "data-[unchecked]:scale-50 data-[unchecked]:opacity-0",
          )}
        >
          <span className="col-start-1 row-start-1 inline-flex size-full scale-100 items-center justify-center opacity-100 transition-[opacity,scale] duration-150 group-data-[indeterminate]/checkbox:scale-50 group-data-[indeterminate]/checkbox:opacity-0">
            {indicator ?? <CheckIcon />}
          </span>

          <span className="col-start-1 row-start-1 inline-flex size-full scale-50 items-center justify-center opacity-0 transition-[opacity,scale] duration-150 group-data-[indeterminate]/checkbox:scale-100 group-data-[indeterminate]/checkbox:opacity-100">
            {indeterminateIndicator ?? <MinusIcon />}
          </span>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

export { Checkbox, checkboxVariants };
export type {
  CheckboxColor,
  CheckboxProps,
  CheckboxShape,
  CheckboxSize,
  CheckboxSound,
  CheckboxVariant,
};
