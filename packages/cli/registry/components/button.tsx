"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";

import { playSound, type SoundName } from "./sound";

const buttonVariants = cva(
  [
    "group/button inline-flex w-fit shrink-0 items-center justify-center",
    "font-medium whitespace-nowrap outline-none select-none",
    "transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-100",
    "cursor-pointer active:scale-[0.97]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
    "data-[loading]:cursor-not-allowed data-[loading]:active:scale-100",
    "focus-visible:ring-2 focus-visible:ring-current/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        ghost: "",
        outline: "bg-transparent",
      },
      color: {
        accent: "",
        blue: "",
        red: "",
        amber: "",
        neutral: "",
      },
      size: {
        micro: "h-6.5 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
        tiny: "h-7 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
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
          "bg-primary text-white border border-black/15 hover:bg-primary/90",
      },
      {
        variant: "solid",
        color: "blue",
        className:
          "bg-blue-600 text-white border border-blue-700 hover:bg-blue-700",
      },
      {
        variant: "solid",
        color: "red",
        className:
          "bg-red-600 text-white border border-red-700 hover:bg-red-700",
      },
      {
        variant: "solid",
        color: "amber",
        className:
          "bg-amber-500 text-amber-950 border border-amber-600 hover:bg-amber-600",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "bg-neutral-950 text-white border border-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:border-white/80 dark:hover:bg-neutral-200",
      },

      {
        variant: "soft",
        color: "accent",
        className:
          "bg-primary/10 text-primary border border-transparent hover:bg-primary/15",
      },
      {
        variant: "soft",
        color: "blue",
        className:
          "bg-blue-600/10 dark:bg-blue-600/25 text-blue-700 dark:text-blue-100 border border-transparent hover:bg-blue-600/15",
      },
      {
        variant: "soft",
        color: "red",
        className:
          "bg-red-600/10 dark:bg-red-600/25 text-red-700 dark:text-red-300 border border-transparent hover:bg-red-600/15",
      },
      {
        variant: "soft",
        color: "amber",
        className:
          "bg-amber-500/15 dark:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-transparent hover:bg-amber-500/20",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "bg-neutral-950/5 text-neutral-950 border border-transparent hover:bg-neutral-950/10 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-white/15",
      },

      {
        variant: "ghost",
        color: "accent",
        className: "text-primary border border-transparent hover:bg-primary/10",
      },
      {
        variant: "ghost",
        color: "blue",
        className:
          "text-blue-700 border border-transparent hover:bg-blue-600/10",
      },
      {
        variant: "ghost",
        color: "red",
        className: "text-red-700 border border-transparent hover:bg-red-600/10",
      },
      {
        variant: "ghost",
        color: "amber",
        className:
          "text-amber-800 border border-transparent hover:bg-amber-500/15",
      },
      {
        variant: "ghost",
        color: "neutral",
        className:
          "text-neutral-950 border border-transparent hover:bg-neutral-950/10 dark:text-white dark:hover:bg-white/10",
      },

      {
        variant: "outline",
        color: "accent",
        className:
          "bg-primary/5 text-primary border border-primary/25 hover:bg-primary/10",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "bg-blue-600/5 dark:bg-blue-600/25 text-blue-700 dark:text-blue-100 border border-blue-600/30 hover:bg-blue-600/10",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "bg-red-600/5 dark:bg-red-600/25 text-red-700 dark:text-red-300 border border-red-600/30 hover:bg-red-600/10",
      },
      {
        variant: "outline",
        color: "amber",
        className:
          "bg-amber-500/10 dark:bg-amber-500/5 text-amber-800 dark:text-amber-300 border border-amber-500/35 hover:bg-amber-500/15",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "bg-white text-neutral-950 border border-neutral-950/10 hover:bg-neutral-950/5 dark:bg-neutral-900 dark:text-white dark:border-white/15 dark:hover:bg-white/10",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "blue",
      size: "medium",
      shape: "square",
    },
  },
);

type ButtonVariant = "solid" | "soft" | "ghost" | "outline";

type ButtonColor = "accent" | "blue" | "red" | "amber" | "neutral";

type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";

type ButtonShape = "square" | "round";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "prefix" | "suffix"
> &
  {
    variant?: ButtonVariant | null;
    color?: ButtonColor | null;
    size?: ButtonSize | null;
    shape?: ButtonShape | null;
    loading?: boolean;
    sound?: SoundName | false;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
  };

const ButtonShapeContext = React.createContext<ButtonShape | undefined>(
  undefined,
);

const buttonVariantSounds = {
  solid: "button.solid",
  soft: "button.soft",
  ghost: "button.ghost",
  outline: "button.outline",
} satisfies Record<ButtonVariant, SoundName>;

const buttonSpinnerSizes = {
  micro: "size-3",
  tiny: "size-3",
  small: "size-3.5",
  medium: "size-4",
  large: "size-4",
} satisfies Record<ButtonSize, string>;

const buttonPrefixSlotWidths = {
  micro: "0.75rem",
  tiny: "0.875rem",
  small: "1rem",
  medium: "1rem",
  large: "1rem",
} satisfies Record<ButtonSize, string>;

const buttonAffixGaps = {
  micro: "0.375rem",
  tiny: "0.375rem",
  small: "0.5rem",
  medium: "0.5rem",
  large: "0.5rem",
} satisfies Record<ButtonSize, string>;

const buttonSuffixPadding = {
  micro: "pr-1.5",
  tiny: "pr-2",
  small: "pr-2",
  medium: "",
  large: "",
} satisfies Record<ButtonSize, string>;

function Spinner({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <svg
        className="size-full animate-spin motion-reduce:animate-none"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
        />

        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="36 56"
          strokeDashoffset="8"
        />
      </svg>
    </span>
  );
}

function ButtonAffix({
  side,
  show,
  gap,
  width,
  replacing = false,
  replacement,
  children,
}: {
  side: "prefix" | "suffix";
  show: boolean;
  gap: string;
  width?: string;
  replacing?: boolean;
  replacement?: React.ReactNode;
  children: React.ReactNode;
}) {
  const isPrefix = side === "prefix";
  const hasReplacement = Boolean(replacement);
  const hasFixedWidth = isPrefix && Boolean(width);
  const showReplacement = hasReplacement && replacing;
  const showChildren = !hasReplacement || !replacing;

  return (
    <span
      data-slot={isPrefix ? "button-prefix" : "button-suffix"}
      data-visible={show ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden",
        "transition-[width,max-width,opacity,margin] duration-200 ease-out",
        show ? "opacity-100" : "opacity-0",
      )}
      style={{
        width: hasFixedWidth ? (show ? width : "0px") : undefined,
        maxWidth: hasFixedWidth ? undefined : show ? "16rem" : "0px",
        marginRight: isPrefix && show ? gap : 0,
        marginLeft: !isPrefix && show ? gap : 0,
      }}
    >
      <span className="grid shrink-0 place-items-center">
        <span
          aria-hidden={!showChildren}
          className={cn(
            "col-start-1 row-start-1 inline-flex shrink-0 items-center justify-center",
            "transition-[opacity,scale] duration-200 ease-out",
            showChildren ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        >
          {children}
        </span>

        {hasReplacement && (
          <span
            aria-hidden={!showReplacement}
            className={cn(
              "col-start-1 row-start-1 inline-flex shrink-0 items-center justify-center",
              "transition-[opacity,scale] duration-200 ease-out",
              showReplacement ? "scale-100 opacity-100" : "scale-90 opacity-0",
            )}
          >
            {replacement}
          </span>
        )}
      </span>
    </span>
  );
}

function ButtonShapeProvider({
  children,
  shape,
}: {
  children: React.ReactNode;
  shape?: ButtonShape;
}) {
  return (
    <ButtonShapeContext.Provider value={shape}>
      {children}
    </ButtonShapeContext.Provider>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    color,
    size,
    shape,
    loading = false,
    sound,
    prefix,
    suffix,
    onClick,
    disabled,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const inheritedShape = React.useContext(ButtonShapeContext);
  const resolvedVariant = variant ?? "solid";
  const resolvedColor = color ?? "blue";
  const resolvedSize = size ?? "medium";
  const resolvedShape = shape ?? inheritedShape ?? "square";

  const isDisabled = Boolean(disabled);
  const isInteractionBlocked = isDisabled || loading;
  const hasLabel = Boolean(children);
  const hasPrefix = Boolean(prefix);
  const hasSuffix = Boolean(suffix);
  const shouldLoadInSuffix = loading && !hasPrefix && hasSuffix;
  const shouldLoadInPrefix = loading && !shouldLoadInSuffix;
  const showPrefix = shouldLoadInPrefix || hasPrefix;
  const showSuffix = shouldLoadInSuffix || hasSuffix;

  const resolvedSound =
    sound === undefined ? buttonVariantSounds[resolvedVariant] : sound;

  return (
    <button
      ref={ref}
      data-slot="button"
      data-loading={loading ? "" : undefined}
      data-disabled={isDisabled ? "" : undefined}
      type={type}
      className={cn(
        buttonVariants({
          variant: resolvedVariant,
          color: resolvedColor,
          size: resolvedSize,
          shape: resolvedShape,
          className,
        }),
        showSuffix && buttonSuffixPadding[resolvedSize],
      )}
      disabled={isDisabled}
      aria-disabled={loading && !isDisabled ? true : undefined}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (isInteractionBlocked) {
          event.preventDefault();
          return;
        }

        if (resolvedSound) {
          playSound(resolvedSound);
        }

        onClick?.(event);
      }}
      {...props}
    >
      <ButtonAffix
        side="prefix"
        show={showPrefix}
        gap={hasLabel ? buttonAffixGaps[resolvedSize] : "0px"}
        width={hasPrefix ? undefined : buttonPrefixSlotWidths[resolvedSize]}
        replacing={shouldLoadInPrefix}
        replacement={
          shouldLoadInPrefix ? (
            <Spinner className={buttonSpinnerSizes[resolvedSize]} />
          ) : undefined
        }
      >
        {prefix}
      </ButtonAffix>

      {children && (
        <span data-slot="button-label" className="inline-flex items-center">
          {children}
        </span>
      )}

      <ButtonAffix
        side="suffix"
        show={showSuffix}
        gap={hasLabel ? buttonAffixGaps[resolvedSize] : "0px"}
        replacing={shouldLoadInSuffix}
        replacement={
          shouldLoadInSuffix ? (
            <Spinner className={buttonSpinnerSizes[resolvedSize]} />
          ) : undefined
        }
      >
        {suffix}
      </ButtonAffix>
    </button>
  );
});

export { Button, ButtonShapeProvider, buttonVariants };
export type {
  ButtonColor,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
};
