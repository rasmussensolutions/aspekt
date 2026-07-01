"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { CircleNotchIcon, XIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { aspektConfig } from "./config";
import { playSound, type SoundName } from "./sound";

const inputVariants = cva(
  [
    "group/input relative inline-flex w-full shrink-0 items-center border bg-[var(--input-background)] [--input-background:var(--surface-current)]",
    "[--input-ring:color-mix(in_oklab,var(--ring)_25%,transparent)]",
    "text-primary shadow-[0_0_0_1px_transparent]",
    "transition-[border-color,background-color,box-shadow,opacity] duration-200 ease-out",
    "focus-within:shadow-[0_0_0_1px_var(--input-ring)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:border-destructive/55 data-[invalid]:[--input-ring:color-mix(in_oklab,var(--destructive)_20%,transparent)]",
  ],
  {
    variants: {
      variant: {
        outline: "border-border",
        soft:
          "border-transparent [--input-background:var(--surface-muted)] hover:[--input-background:var(--surface-hover)]",
        ghost:
          "border-transparent [--input-background:transparent] hover:[--input-background:var(--surface-hover)] focus-within:[--input-background:transparent]",
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

type InputVariant = "soft" | "ghost" | "outline";

type InputSize = "micro" | "tiny" | "small" | "medium" | "large";

type InputShape = "square" | "round";

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

type InputProps = Omit<InputPrimitiveProps, "prefix" | "size" | "suffix"> & {
  clearable?: boolean;
  invalid?: boolean;
  loading?: boolean;
  onClear?: () => void;
  prefix?: React.ReactNode;
  shape?: InputShape | null;
  size?: InputSize | null;
  sound?:
    | false
    | {
        blur?: SoundName | false;
        clear?: SoundName | false;
        focus?: SoundName | false;
      };
  suffix?: React.ReactNode;
  variant?: InputVariant | null;
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
      <CircleNotchIcon
        className="size-full animate-spin motion-reduce:animate-none"
        aria-hidden="true"
        weight="bold"
      />
    </span>
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
        "inline-flex shrink-0 items-center justify-center overflow-hidden text-secondary",
        "transition-[width,opacity,margin] duration-200 ease-out",
        "group-focus-within/input:text-primary/70",
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
        "inline-flex shrink-0 items-center justify-center overflow-hidden text-secondary",
        "transition-[margin,opacity] duration-200 ease-out",
        "group-focus-within/input:text-primary/70",
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
  const resolvedShape = shape ?? aspektConfig.shape;
  const hasValue = currentValue.length > 0;
  const isDisabled = Boolean(disabled);
  const isReadOnly = Boolean(readOnly);
  const showClear = clearable && hasValue && !isDisabled && !isReadOnly;
  const showPrefix = Boolean(prefix);
  const showSuffix = Boolean(suffix) || loading || showClear;
  const showStatusSlot = loading || showClear;
  const clearSound = sound === undefined ? "clear" : sound && sound.clear;
  const focusSound = sound === undefined ? "focus" : sound && sound.focus;
  const blurSound = sound === undefined ? false : sound && sound.blur;

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
    if (blurSound) {
      playSound(blurSound);
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
          shape: resolvedShape,
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
          "placeholder:text-secondary disabled:cursor-not-allowed",
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
              "inline-flex items-center justify-center rounded-sm text-secondary outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-current/20",
              inputSpinnerSizes[resolvedSize],
            )}
          >
            <XIcon aria-hidden="true" weight="bold" />
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
export type { InputProps, InputShape, InputSize, InputVariant };
