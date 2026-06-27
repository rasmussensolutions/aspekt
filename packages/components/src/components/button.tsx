"use client";

import { CheckIcon, CircleNotchIcon, XIcon } from "@phosphor-icons/react";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";

import { aspektConfig } from "./config";
import { playSound, type SoundName } from "./sound";

const buttonVariants = cva(
  [
    "group/button inline-flex w-fit shrink-0 items-center justify-center",
    "font-medium whitespace-nowrap outline-none select-none",
    "transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-100",
    "cursor-pointer active:scale-[0.97]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
    "data-[loading]:cursor-not-allowed data-[loading]:active:scale-100",
    "data-[status=fail]:motion-safe:animate-[aspekt-button-shake_420ms_cubic-bezier(0.36,0.07,0.19,0.97)_both]",
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
        info: "",
        destructive: "",
        warning: "",
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
          "bg-action text-on-color border border-action/15 hover:bg-action/90",
      },
      {
        variant: "solid",
        color: "info",
        className:
          "bg-info text-on-color border border-info/20 hover:bg-info/90",
      },
      {
        variant: "solid",
        color: "destructive",
        className:
          "bg-destructive text-on-color border border-destructive/20 hover:bg-destructive/90",
      },
      {
        variant: "solid",
        color: "warning",
        className:
          "bg-warning text-on-color border border-warning/25 hover:bg-warning/90",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "bg-primary text-inverse border border-primary/10 hover:bg-primary/90",
      },

      {
        variant: "soft",
        color: "accent",
        className:
          "bg-action/10 text-action border border-transparent hover:bg-action/15",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "bg-info/10 text-info border border-transparent hover:bg-info/15",
      },
      {
        variant: "soft",
        color: "destructive",
        className:
          "bg-destructive/10 text-destructive border border-transparent hover:bg-destructive/15",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "bg-warning/15 text-warning border border-transparent hover:bg-warning/20",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "bg-control-soft text-primary border border-transparent hover:bg-control-soft/80",
      },

      {
        variant: "ghost",
        color: "accent",
        className: "text-action border border-transparent hover:bg-action/10",
      },
      {
        variant: "ghost",
        color: "info",
        className: "text-info border border-transparent hover:bg-info/10",
      },
      {
        variant: "ghost",
        color: "destructive",
        className:
          "text-destructive border border-transparent hover:bg-destructive/10",
      },
      {
        variant: "ghost",
        color: "warning",
        className: "text-warning border border-transparent hover:bg-warning/15",
      },
      {
        variant: "ghost",
        color: "neutral",
        className:
          "text-primary border border-transparent hover:bg-surface-sunken",
      },

      {
        variant: "outline",
        color: "accent",
        className:
          "bg-action/5 text-action border border-action/25 hover:bg-action/10",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "bg-info/5 text-info border border-info/30 hover:bg-info/10",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "bg-destructive/5 text-destructive border border-destructive/30 hover:bg-destructive/10",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "bg-warning/10 text-warning border border-warning/35 hover:bg-warning/15",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "bg-surface text-primary border border-border hover:bg-surface-sunken",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "neutral",
      size: "medium",
      shape: "square",
    },
  },
);

type ButtonVariant = "solid" | "soft" | "ghost" | "outline";

type ButtonColor = "accent" | "info" | "destructive" | "warning" | "neutral";

type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";

type ButtonShape = "square" | "round";

type ButtonStatus = "success" | "fail";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "prefix" | "suffix"
> & {
  variant?: ButtonVariant | null;
  color?: ButtonColor | null;
  size?: ButtonSize | null;
  shape?: ButtonShape | null;
  loading?: boolean;
  status?: ButtonStatus | null;
  statusDuration?: number | false | null;
  onStatusClear?: () => void;
  sound?: SoundName | false;
  failSound?: SoundName | false;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const ButtonShapeContext = React.createContext<ButtonShape | undefined>(
  undefined,
);

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
      <CircleNotchIcon
        className="size-full animate-spin motion-reduce:animate-none"
        aria-hidden="true"
        weight="bold"
      />
    </span>
  );
}

function ButtonStatusIcon({
  className,
  status,
}: {
  className?: string;
  status: ButtonStatus;
}) {
  if (status === "success") {
    return <CheckIcon aria-hidden="true" className={className} weight="bold" />;
  }

  return <XIcon aria-hidden="true" className={className} weight="bold" />;
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
    status,
    statusDuration = false,
    onStatusClear,
    sound,
    failSound = "error",
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
  const resolvedColor = color ?? "neutral";
  const resolvedSize = size ?? "medium";
  const resolvedShape = shape ?? inheritedShape ?? aspektConfig.shape;
  const effectiveColor = status === "fail" ? "destructive" : resolvedColor;

  const isDisabled = Boolean(disabled);
  const isInteractionBlocked = isDisabled || loading;
  const hasLabel = Boolean(children);
  const hasPrefix = Boolean(prefix);
  const hasSuffix = Boolean(suffix);
  const hasStatus = status === "success" || status === "fail";
  const shouldStatusInSuffix = hasStatus && !hasPrefix && hasSuffix;
  const shouldStatusInPrefix = hasStatus && !shouldStatusInSuffix;
  const shouldLoadInSuffix = !hasStatus && loading && !hasPrefix && hasSuffix;
  const shouldLoadInPrefix = !hasStatus && loading && !shouldLoadInSuffix;
  const showPrefix = shouldStatusInPrefix || shouldLoadInPrefix || hasPrefix;
  const showSuffix = shouldStatusInSuffix || shouldLoadInSuffix || hasSuffix;
  const statusIcon = hasStatus ? (
    <ButtonStatusIcon
      className={buttonSpinnerSizes[resolvedSize]}
      status={status}
    />
  ) : undefined;

  const resolvedSound = sound === undefined ? "press" : sound;
  const statusClearTimeoutRef = React.useRef<number | null>(null);
  const previousStatusRef = React.useRef<ButtonStatus | null | undefined>(
    status,
  );

  React.useEffect(() => {
    return () => {
      if (statusClearTimeoutRef.current) {
        window.clearTimeout(statusClearTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (statusClearTimeoutRef.current) {
      window.clearTimeout(statusClearTimeoutRef.current);
      statusClearTimeoutRef.current = null;
    }

    if (!hasStatus || statusDuration === false || statusDuration == null) {
      return;
    }

    statusClearTimeoutRef.current = window.setTimeout(() => {
      statusClearTimeoutRef.current = null;
      onStatusClear?.();
    }, Math.max(0, statusDuration));

    return () => {
      if (statusClearTimeoutRef.current) {
        window.clearTimeout(statusClearTimeoutRef.current);
        statusClearTimeoutRef.current = null;
      }
    };
  }, [hasStatus, onStatusClear, status, statusDuration]);

  React.useEffect(() => {
    const previousStatus = previousStatusRef.current;
    previousStatusRef.current = status;

    if (
      previousStatus !== "fail" &&
      status === "fail" &&
      sound !== false &&
      failSound
    ) {
      playSound(failSound);
    }
  }, [failSound, sound, status]);

  return (
    <button
      ref={ref}
      data-slot="button"
      data-loading={loading ? "" : undefined}
      data-disabled={isDisabled ? "" : undefined}
      data-status={status ?? undefined}
      type={type}
      className={cn(
        buttonVariants({
          variant: resolvedVariant,
          color: effectiveColor,
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
        replacing={shouldStatusInPrefix || shouldLoadInPrefix}
        replacement={
          shouldStatusInPrefix ? (
            statusIcon
          ) : shouldLoadInPrefix ? (
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
        replacing={shouldStatusInSuffix || shouldLoadInSuffix}
        replacement={
          shouldStatusInSuffix ? (
            statusIcon
          ) : shouldLoadInSuffix ? (
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
  ButtonStatus,
  ButtonVariant,
};
