"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { aspektConfig } from "./config";
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
    "data-[invalid]:border-destructive/55 data-[invalid]:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid:
          "border-border bg-surface-current text-on-color hover:bg-surface-hover",
        soft:
          "border-transparent bg-surface-muted text-transparent hover:bg-surface-hover",
        outline:
          "border-border bg-transparent text-transparent hover:bg-surface-hover",
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
          "size-3.5 [--checkbox-radius:calc(var(--radius-sm)*0.5)] [&_svg]:size-2.5",
        tiny:
          "size-4 [--checkbox-radius:calc(var(--radius-sm)*0.65)] [&_svg]:size-3",
        small:
          "size-4.5 [--checkbox-radius:calc(var(--radius-sm)*0.8)] [&_svg]:size-3.5",
        medium: "size-5 [--checkbox-radius:var(--radius-sm)] [&_svg]:size-4",
        large:
          "size-5.5 [--checkbox-radius:var(--radius-md)] [&_svg]:size-4.5",
      },
      shape: {
        square: "rounded-[var(--checkbox-radius)]",
        round: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "accent",
        className:
          "data-[checked]:border-action/15 data-[checked]:bg-action data-[checked]:text-on-color data-[checked]:hover:bg-action/90 data-[indeterminate]:border-action/15 data-[indeterminate]:bg-action data-[indeterminate]:text-on-color",
      },
      {
        variant: "solid",
        color: "info",
        className:
          "data-[checked]:border-info/20 data-[checked]:bg-info data-[checked]:text-on-color data-[checked]:hover:bg-info/90 data-[indeterminate]:border-info/20 data-[indeterminate]:bg-info data-[indeterminate]:text-on-color",
      },
      {
        variant: "solid",
        color: "destructive",
        className:
          "data-[checked]:border-destructive/20 data-[checked]:bg-destructive data-[checked]:text-on-color data-[checked]:hover:bg-destructive/90 data-[indeterminate]:border-destructive/20 data-[indeterminate]:bg-destructive data-[indeterminate]:text-on-color",
      },
      {
        variant: "solid",
        color: "warning",
        className:
          "data-[checked]:border-warning/25 data-[checked]:bg-warning data-[checked]:text-on-color data-[checked]:hover:bg-warning/90 data-[indeterminate]:border-warning/25 data-[indeterminate]:bg-warning data-[indeterminate]:text-on-color",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "data-[checked]:border-primary/10 data-[checked]:bg-primary data-[checked]:text-inverse data-[checked]:hover:bg-primary/90 data-[indeterminate]:border-primary/10 data-[indeterminate]:bg-primary data-[indeterminate]:text-inverse",
      },

      {
        variant: "soft",
        color: "accent",
        className:
          "data-[checked]:bg-action/10 data-[checked]:text-action data-[checked]:hover:bg-action/15 data-[indeterminate]:bg-action/10 data-[indeterminate]:text-action",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "data-[checked]:bg-info/10 data-[checked]:text-info data-[checked]:hover:bg-info/15 data-[indeterminate]:bg-info/10 data-[indeterminate]:text-info",
      },
      {
        variant: "soft",
        color: "destructive",
        className:
          "data-[checked]:bg-destructive/10 data-[checked]:text-destructive data-[checked]:hover:bg-destructive/15 data-[indeterminate]:bg-destructive/10 data-[indeterminate]:text-destructive",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "data-[checked]:bg-warning/15 data-[checked]:text-warning data-[checked]:hover:bg-warning/20 data-[indeterminate]:bg-warning/15 data-[indeterminate]:text-warning",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "data-[checked]:bg-surface-active data-[checked]:text-primary data-[checked]:hover:bg-surface-hover data-[indeterminate]:bg-surface-active data-[indeterminate]:text-primary",
      },

      {
        variant: "outline",
        color: "accent",
        className:
          "data-[checked]:border-action/25 data-[checked]:bg-action/5 data-[checked]:text-action data-[checked]:hover:bg-action/10 data-[indeterminate]:border-action/25 data-[indeterminate]:bg-action/5 data-[indeterminate]:text-action",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "data-[checked]:border-info/30 data-[checked]:bg-info/5 data-[checked]:text-info data-[checked]:hover:bg-info/10 data-[indeterminate]:border-info/30 data-[indeterminate]:bg-info/5 data-[indeterminate]:text-info",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "data-[checked]:border-destructive/30 data-[checked]:bg-destructive/5 data-[checked]:text-destructive data-[checked]:hover:bg-destructive/10 data-[indeterminate]:border-destructive/30 data-[indeterminate]:bg-destructive/5 data-[indeterminate]:text-destructive",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "data-[checked]:border-warning/35 data-[checked]:bg-warning/10 data-[checked]:text-warning data-[checked]:hover:bg-warning/15 data-[indeterminate]:border-warning/35 data-[indeterminate]:bg-warning/10 data-[indeterminate]:text-warning",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "data-[checked]:border-primary/15 data-[checked]:bg-surface-active data-[checked]:text-primary data-[checked]:hover:bg-surface-hover data-[indeterminate]:border-primary/15 data-[indeterminate]:bg-surface-active data-[indeterminate]:text-primary",
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "neutral",
      size: "medium",
      shape: "square",
    },
  },
);

type CheckboxRootProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

type CheckboxVariant = "solid" | "soft" | "outline";

type CheckboxColor = "accent" | "info" | "destructive" | "warning" | "neutral";

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
    const resolvedShape = shape ?? aspektConfig.shape;
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
            shape: resolvedShape,
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
            {indicator ?? <CheckIcon aria-hidden="true" weight="bold" />}
          </span>

          <span className="col-start-1 row-start-1 inline-flex size-full scale-50 items-center justify-center opacity-0 transition-[opacity,scale] duration-150 group-data-[indeterminate]/checkbox:scale-100 group-data-[indeterminate]/checkbox:opacity-100">
            {indeterminateIndicator ?? (
              <MinusIcon aria-hidden="true" weight="bold" />
            )}
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
