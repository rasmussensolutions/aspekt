"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { playSound, type SoundName } from "./sound";

const inputVariants = cva(
  [
    "group/input relative inline-flex w-full shrink-0 items-center border bg-[var(--input-background)] [--input-background:var(--background)]",
    "[--input-ring:rgba(23,23,23,0.25)] dark:[--input-ring:rgba(237,237,237,0.25)]",
    "text-foreground shadow-[0_0_0_1px_transparent]",
    "transition-[border-color,background-color,box-shadow,opacity] duration-200 ease-out",
    "focus-within:shadow-[0_0_0_1px_var(--input-ring)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:border-red-600/55 data-[invalid]:[--input-ring:rgba(220,38,38,0.2)]",
    "dark:data-[invalid]:border-red-500/60",
  ],
  {
    variants: {
      variant: {
        outline: "border-neutral-200 dark:border-white/15",
        soft:
          "border-transparent [--input-background:color-mix(in_oklab,var(--foreground)_5%,var(--background))] hover:[--input-background:color-mix(in_oklab,var(--foreground)_8%,var(--background))] dark:[--input-background:color-mix(in_oklab,var(--foreground)_10%,var(--background))] dark:hover:[--input-background:color-mix(in_oklab,var(--foreground)_12%,var(--background))]",
        ghost:
          "border-transparent [--input-background:transparent] hover:[--input-background:color-mix(in_oklab,var(--foreground)_5%,var(--background))] focus-within:[--input-background:transparent] dark:hover:[--input-background:color-mix(in_oklab,var(--foreground)_10%,var(--background))]",
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
    defaultVariants: {
      variant: "outline",
      size: "medium",
      shape: "square",
    },
  },
);

type InputSize = NonNullable<VariantProps<typeof inputVariants>["size"]>;

type InputPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof InputPrimitive
>;
type InputChangeEvent = Parameters<
  NonNullable<InputPrimitiveProps["onChange"]>
>[0];
type InputBlurEvent = Parameters<NonNullable<InputPrimitiveProps["onBlur"]>>[0];
type InputFocusEvent = Parameters<
  NonNullable<InputPrimitiveProps["onFocus"]>
>[0];

type InputProps = Omit<InputPrimitiveProps, "prefix" | "size" | "suffix"> &
  VariantProps<typeof inputVariants> & {
    clearable?: boolean;
    invalid?: boolean;
    loading?: boolean;
    onClear?: () => void;
    prefix?: React.ReactNode;
    sound?:
      | false
      | {
          clear?: SoundName | false;
          focus?: SoundName | false;
          unfocus?: SoundName | false;
        };
    suffix?: React.ReactNode;
  };

const inputSlotWidths = {
  micro: "0.875rem",
  tiny: "0.875rem",
  small: "1rem",
  medium: "1rem",
  large: "1rem",
} satisfies Record<InputSize, string>;

const inputSpinnerSizes = {
  micro: "size-3",
  tiny: "size-3",
  small: "size-3.5",
  medium: "size-4",
  large: "size-4",
} satisfies Record<InputSize, string>;

const inputAffixGaps = {
  micro: "0.25rem",
  tiny: "0.25rem",
  small: "0.375rem",
  medium: "0.5rem",
  large: "0.5rem",
} satisfies Record<InputSize, string>;

function getTextValue(value: InputPrimitiveProps["value"] | undefined) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.join(",");
  return String(value);
}

function InputSpinner({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <style>
        {`
          @keyframes input-spinner-rotate {
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes input-spinner-dash {
            0% {
              stroke-dasharray: 1 56;
              stroke-dashoffset: 0;
            }

            50% {
              stroke-dasharray: 34 56;
              stroke-dashoffset: -14;
            }

            100% {
              stroke-dasharray: 34 56;
              stroke-dashoffset: -52;
            }
          }
        `}
      </style>

      <svg
        className="size-full"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{
          animation: "input-spinner-rotate 1.35s linear infinite",
        }}
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
          style={{
            animation: "input-spinner-dash 1.35s ease-in-out infinite",
          }}
        />
      </svg>
    </span>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InputAffix({
  side,
  show,
  reserve,
  gap,
  width,
  children,
}: {
  side: "prefix" | "suffix";
  show: boolean;
  reserve: boolean;
  gap: string;
  width: string;
  children: React.ReactNode;
}) {
  const isPrefix = side === "prefix";
  const isVisible = show || reserve;

  return (
    <span
      data-slot={isPrefix ? "input-prefix" : "input-suffix"}
      data-visible={show ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden text-neutral-400",
        "transition-[width,opacity,margin] duration-200 ease-out",
        "group-focus-within/input:text-neutral-500 dark:group-focus-within/input:text-neutral-300",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{
        width: isVisible ? undefined : "0px",
        minWidth: isVisible ? width : "0px",
        marginRight: isPrefix && isVisible ? gap : 0,
        marginLeft: !isPrefix && isVisible ? gap : 0,
      }}
    >
      <span className="inline-flex shrink-0 items-center justify-center gap-1">
        {children}
      </span>
    </span>
  );
}

function InputSuffix({
  show,
  gap,
  children,
}: {
  show: boolean;
  gap: string;
  children: React.ReactNode;
}) {
  return (
    <span
      data-slot="input-suffix"
      data-visible={show ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden text-neutral-400",
        "transition-[margin,opacity] duration-200 ease-out",
        "group-focus-within/input:text-neutral-500 dark:group-focus-within/input:text-neutral-300",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{
        marginLeft: show ? gap : 0,
      }}
    >
      <span className="inline-flex shrink-0 items-center justify-center">
        {children}
      </span>
    </span>
  );
}

function InputSuffixSlot({
  show,
  gap,
  width,
  maxWidth,
  children,
}: {
  show: boolean;
  gap: string;
  width?: string;
  maxWidth?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      data-visible={show ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden",
        "transition-[width,max-width,opacity,margin] duration-200 ease-out",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{
        width: width ? (show ? width : "0px") : undefined,
        maxWidth: width ? undefined : show ? (maxWidth ?? "16rem") : "0px",
        marginLeft: show ? gap : 0,
      }}
    >
      <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    variant,
    size,
    shape,
    type = "text",
    clearable = false,
    disabled,
    invalid = false,
    loading = false,
    onChange,
    onClear,
    onBlur,
    onFocus,
    prefix,
    readOnly,
    sound,
    suffix,
    value,
    defaultValue,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const resolvedSize = size ?? "medium";
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    getTextValue(defaultValue),
  );

  const currentValue = isControlled ? getTextValue(value) : uncontrolledValue;
  const hasValue = currentValue.length > 0;
  const isDisabled = Boolean(disabled);
  const isReadOnly = Boolean(readOnly);
  const showClear = clearable && hasValue && !isDisabled && !isReadOnly;
  const showPrefix = Boolean(prefix);
  const showSuffix = Boolean(suffix) || loading || showClear;
  const showStatusSlot = loading || showClear;
  const clearSound = sound === undefined ? "input.clear" : sound && sound.clear;
  const focusSound = sound === undefined ? "input.focus" : sound && sound.focus;
  const unfocusSound = sound === undefined ? false : sound && sound.unfocus;

  function setInputRef(node: React.ComponentRef<typeof InputPrimitive> | null) {
    const input = node as HTMLInputElement | null;
    inputRef.current = input;

    if (typeof ref === "function") {
      ref(input);
    } else if (ref) {
      ref.current = input;
    }
  }

  function handleChange(event: InputChangeEvent) {
    if (!isControlled) {
      setUncontrolledValue((event.currentTarget as HTMLInputElement).value);
    }

    onChange?.(event);
  }

  function handleFocus(event: InputFocusEvent) {
    if (focusSound) {
      playSound(focusSound);
    }

    onFocus?.(event);
  }

  function handleBlur(event: InputBlurEvent) {
    if (unfocusSound) {
      playSound(unfocusSound);
    }

    onBlur?.(event);
  }

  function handleClear() {
    const input = inputRef.current;
    if (!input) return;

    if (clearSound) {
      playSound(clearSound);
    }

    const valueSetter = Object.getOwnPropertyDescriptor(input, "value")?.set;
    const prototype = Object.getPrototypeOf(input);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      "value",
    )?.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(input, "");
    } else {
      valueSetter?.call(input, "");
    }

    if (!isControlled) {
      setUncontrolledValue("");
    }

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
    onClear?.();
  }

  function focusInput(event: React.MouseEvent<HTMLSpanElement>) {
    if ((event.target as HTMLElement).closest("button,input")) return;

    event.preventDefault();
    inputRef.current?.focus();
  }

  return (
    <span
      data-slot="input-root"
      data-disabled={isDisabled ? "" : undefined}
      data-filled={hasValue ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      data-loading={loading ? "" : undefined}
      onMouseDown={focusInput}
      className={cn(
        inputVariants({
          variant,
          size: resolvedSize,
          shape,
          className,
        }),
      )}
    >
      <InputAffix
        side="prefix"
        show={showPrefix}
        reserve={showPrefix}
        gap={inputAffixGaps[resolvedSize]}
        width={inputSlotWidths[resolvedSize]}
      >
        {prefix}
      </InputAffix>

      <InputPrimitive
        ref={setInputRef}
        data-slot="input"
        type={type}
        disabled={isDisabled}
        readOnly={isReadOnly}
        value={isControlled ? value : undefined}
        defaultValue={isControlled ? undefined : defaultValue}
        aria-invalid={invalid || ariaInvalid ? true : undefined}
        aria-busy={loading || undefined}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "min-w-0 flex-1 bg-transparent outline-none",
          "placeholder:text-neutral-400 disabled:cursor-not-allowed",
          "read-only:cursor-default",
        )}
        {...props}
      />

      <InputSuffix show={showSuffix} gap={inputAffixGaps[resolvedSize]}>
        <InputSuffixSlot
          show={loading}
          gap="0px"
          width={inputSlotWidths[resolvedSize]}
        >
          <InputSpinner className={inputSpinnerSizes[resolvedSize]} />
        </InputSuffixSlot>

        <InputSuffixSlot
          show={showClear && !loading}
          gap="0px"
          width={inputSlotWidths[resolvedSize]}
        >
          <button
            type="button"
            aria-label="Clear input"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            aria-hidden={!showClear || loading}
            tabIndex={showClear && !loading ? 0 : -1}
            className={cn(
              "inline-flex items-center justify-center rounded-sm text-neutral-400 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-current/20",
              inputSpinnerSizes[resolvedSize],
            )}
          >
            <ClearIcon />
          </button>
        </InputSuffixSlot>

        <InputSuffixSlot
          show={Boolean(suffix)}
          gap={showStatusSlot ? inputAffixGaps[resolvedSize] : "0px"}
          maxWidth="16rem"
        >
          {suffix}
        </InputSuffixSlot>
      </InputSuffix>
    </span>
  );
});

export { Input, inputVariants };
