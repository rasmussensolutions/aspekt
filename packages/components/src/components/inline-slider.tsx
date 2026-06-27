"use client";

import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { aspektConfig } from "./config";
import { playSound, type SoundName } from "./sound";

const inlineSliderRootVariants = cva("relative w-full text-primary", {
  variants: {
    size: {
      micro:
        "h-8 text-xs [--inline-slider-padding-x:0.75rem] [--inline-slider-thumb-height:1rem] [--inline-slider-thumb-width:0.1875rem]",
      tiny:
        "h-9 text-xs [--inline-slider-padding-x:0.875rem] [--inline-slider-thumb-height:1.125rem] [--inline-slider-thumb-width:0.1875rem]",
      small:
        "h-11 text-sm [--inline-slider-padding-x:1rem] [--inline-slider-thumb-height:1.375rem] [--inline-slider-thumb-width:0.25rem]",
      medium:
        "h-[3.25rem] text-sm [--inline-slider-padding-x:1.25rem] [--inline-slider-thumb-height:1.625rem] [--inline-slider-thumb-width:0.25rem]",
      large:
        "h-16 text-base [--inline-slider-padding-x:1.5rem] [--inline-slider-thumb-height:2rem] [--inline-slider-thumb-width:0.3125rem]",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const inlineSliderSurfaceVariants = cva(
  [
    "group/inline-slider absolute inset-0 cursor-pointer touch-none overflow-hidden shadow-inner outline-none select-none",
    "transition-[background-color,border-color,box-shadow,opacity,transform,width] duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
    "data-[dragging]:duration-0 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:ring-2 data-[invalid]:ring-destructive/15",
    "focus-visible:ring-2 focus-visible:ring-current/25 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ],
  {
    variants: {
      shape: {
        square: "rounded-lg",
        round: "rounded-full",
      },
      variant: {
        solid: "border border-transparent bg-control-soft",
        soft: "border border-transparent bg-control-soft/80",
        outline: "border border-border bg-surface",
      },
    },
    defaultVariants: {
      shape: "round",
      variant: "soft",
    },
  },
);

const inlineSliderIndicatorVariants = cva(
  "pointer-events-none absolute inset-y-0 left-0 z-[1] rounded-[inherit] transition-colors",
  {
    variants: {
      color: {
        accent: "bg-action/12",
        info: "bg-info/15",
        destructive: "bg-destructive/15",
        warning: "bg-warning/20",
        neutral: "bg-primary/10 dark:bg-white/10",
      },
    },
    defaultVariants: {
      color: "neutral",
    },
  },
);

const inlineSliderThumbVariants = cva(
  [
    "pointer-events-none absolute top-1/2 z-[3] block -translate-y-1/2",
    "h-[var(--inline-slider-thumb-height)] w-[var(--inline-slider-thumb-width)] rounded-full",
    "transition-[background-color,opacity,transform] duration-150 ease-out",
    "group-data-[dragging]/inline-slider:scale-y-95",
  ],
  {
    variants: {
      color: {
        accent: "bg-action/40",
        info: "bg-info/60",
        destructive: "bg-destructive/60",
        warning: "bg-warning/70",
        neutral: "bg-primary/35 dark:bg-white/45",
      },
    },
    defaultVariants: {
      color: "neutral",
    },
  },
);

type InlineSliderColor = "accent" | "info" | "destructive" | "warning" | "neutral";
type InlineSliderShape = "square" | "round";
type InlineSliderSize = "micro" | "tiny" | "small" | "medium" | "large";
type InlineSliderVariant = "solid" | "soft" | "outline";
type InlineSliderFormat =
  | Intl.NumberFormatOptions
  | ((value: number) => string);

type InlineSliderSound =
  | SoundName
  | false
  | {
      change?: SoundName | false;
      commit?: SoundName | false;
    };

type InlineSliderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "color" | "defaultValue" | "onChange"
> & {
    className?: string;
    color?: InlineSliderColor | null;
    defaultValue?: number;
    disabled?: boolean;
    format?: InlineSliderFormat;
    invalid?: boolean;
    label: React.ReactNode;
    max?: number;
    min?: number;
    onValueChange?: (value: number) => void;
    onValueCommitted?: (value: number) => void;
    shape?: InlineSliderShape | null;
    showValue?: boolean;
    size?: InlineSliderSize | null;
    sound?: InlineSliderSound;
    step?: number;
    tickCount?: number;
    value?: number;
    variant?: InlineSliderVariant | null;
  };

type InlineSliderBounds = Pick<DOMRect, "left" | "right" | "width"> & {
  nativeWidth: number;
  scale: number;
};

type InlineSliderDodge = {
  left: number;
  right: number;
};

const inlineSliderClickThreshold = 3;
const inlineSliderContinuousSnapThreshold = 0.03125;
const inlineSliderDeadZone = 32;
const inlineSliderFeedbackMinIntervalMs = 58;
const inlineSliderMaxStretch = 8;
const inlineSliderMaxCursorRange = 200;
const inlineSliderMaxTickCount = 32;
const inlineSliderHandleBuffer = 8;
const inlineSliderLabelOffset = 16;
const inlineSliderValueOffset = 4;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getStepDecimalCount(step: number) {
  if (!Number.isFinite(step)) return 0;

  const value = step.toString();
  const decimalIndex = value.indexOf(".");

  return decimalIndex === -1 ? 0 : value.length - decimalIndex - 1;
}

function roundValueToStep(value: number, min: number, step: number) {
  if (!Number.isFinite(step) || step <= 0) return value;

  const rounded = min + Math.round((value - min) / step) * step;

  return Number(rounded.toFixed(getStepDecimalCount(step)));
}

function getBoundedValue(value: number, min: number, max: number, step: number) {
  return clamp(roundValueToStep(value, min, step), min, max);
}

function getSnappedClickValue(
  value: number,
  min: number,
  max: number,
  step: number,
) {
  if (max <= min || !Number.isFinite(step) || step <= 0) {
    return clamp(value, min, max);
  }

  const discreteSteps = (max - min) / step;

  if (discreteSteps <= 10) {
    return getBoundedValue(value, min, max, step);
  }

  const normalized = (value - min) / (max - min);
  const nearestDecile = Math.round(normalized * 10) / 10;
  const snappedValue =
    Math.abs(normalized - nearestDecile) <= inlineSliderContinuousSnapThreshold
      ? min + nearestDecile * (max - min)
      : value;

  return getBoundedValue(snappedValue, min, max, step);
}

function getValuePercent(value: number, min: number, max: number) {
  if (max <= min) return 0;

  return ((value - min) / (max - min)) * 100;
}

function getTickCount({
  max,
  min,
  step,
  tickCount,
}: {
  max: number;
  min: number;
  step: number;
  tickCount: number | undefined;
}) {
  if (max <= min || !Number.isFinite(step) || step <= 0) return 0;

  if (tickCount === undefined) {
    const discreteSteps = (max - min) / step;

    return discreteSteps <= 10 ? Math.max(0, discreteSteps - 1) : 9;
  }

  if (!Number.isFinite(tickCount)) return 0;

  return Math.max(0, Math.min(inlineSliderMaxTickCount, Math.floor(tickCount)));
}

function getValueFromPointer(clientX: number, bounds: InlineSliderBounds) {
  if (bounds.nativeWidth <= 0) return 0;

  const sceneX = (clientX - bounds.left) / bounds.scale;

  return clamp(sceneX / bounds.nativeWidth, 0, 1);
}

function getInlineSliderStretch(clientX: number, bounds: InlineSliderBounds) {
  let distancePast = 0;
  let sign = 0;

  if (clientX < bounds.left) {
    distancePast = bounds.left - clientX;
    sign = -1;
  } else if (clientX > bounds.right) {
    distancePast = clientX - bounds.right;
    sign = 1;
  }

  if (sign === 0) return 0;

  const overflow = Math.max(0, distancePast - inlineSliderDeadZone);

  return (
    sign *
    inlineSliderMaxStretch *
    Math.sqrt(Math.min(overflow / inlineSliderMaxCursorRange, 1))
  );
}

function getInlineSliderSound(
  sound: InlineSliderSound | undefined,
  interaction: "change" | "commit",
) {
  if (sound === false) return false;

  if (sound === undefined) {
    return interaction === "commit" ? "commit" : "change";
  }

  if (typeof sound === "string") {
    return interaction === "commit" ? sound : false;
  }

  return sound[interaction];
}

const InlineSlider = React.forwardRef<HTMLDivElement, InlineSliderProps>(
  function InlineSlider(
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className,
      color,
      defaultValue,
      disabled = false,
      format,
      invalid = false,
      label,
      max = 100,
      min = 0,
      onKeyDown,
      onPointerDown,
      onValueChange,
      onValueCommitted,
      shape,
      showValue = true,
      size,
      sound,
      step = 1,
      tickCount,
      value,
      variant,
      ...props
    },
    ref,
  ) {
    const boundedDefaultValue = React.useMemo(
      () => getBoundedValue(defaultValue ?? min, min, max, step),
      [defaultValue, max, min, step],
    );
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(boundedDefaultValue);
    const isControlled = value !== undefined;
    const currentValue = getBoundedValue(
      isControlled ? value : uncontrolledValue,
      min,
      max,
      step,
    );
    const formatter = React.useMemo(
      () =>
        format && typeof format !== "function"
          ? new Intl.NumberFormat(undefined, format)
          : null,
      [format],
    );
    const formattedValue =
      typeof format === "function"
        ? format(currentValue)
        : formatter
          ? formatter.format(currentValue)
          : String(currentValue);
    const percent = getValuePercent(currentValue, min, max);
    const discreteSteps = (max - min) / step;
    const range = max - min;
    const resolvedTickCount = getTickCount({ max, min, step, tickCount });
    const ticks = React.useMemo(
      () =>
        Array.from({ length: resolvedTickCount }, (_, index) => ({
          percent:
            tickCount === undefined && discreteSteps <= 10 && range > 0
              ? (((index + 1) * step) / range) * 100
              : ((index + 1) / (resolvedTickCount + 1)) * 100,
        })),
      [discreteSteps, range, resolvedTickCount, step, tickCount],
    );
    const activePointerIdRef = React.useRef<number | null>(null);
    const boundsRef = React.useRef<InlineSliderBounds | null>(null);
    const cleanupPointerSessionRef = React.useRef<(() => void) | null>(null);
    const feedbackTimeRef = React.useRef(0);
    const generatedLabelId = React.useId();
    const isClickRef = React.useRef(true);
    const labelRef = React.useRef<HTMLSpanElement | null>(null);
    const latestValueRef = React.useRef(currentValue);
    const pointerStartRef = React.useRef<{ x: number; y: number } | null>(
      null,
    );
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const surfaceRef = React.useRef<HTMLDivElement | null>(null);
    const valueRef = React.useRef<HTMLSpanElement | null>(null);
    const [dodge, setDodge] = React.useState<InlineSliderDodge>({
      left: 38,
      right: 72,
    });
    const [dragging, setDragging] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const [interacting, setInteracting] = React.useState(false);
    const [stretch, setStretch] = React.useState(0);

    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;

        if (typeof ref === "function") {
          ref(node);
          return;
        }

        if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    React.useEffect(() => {
      latestValueRef.current = currentValue;
    }, [currentValue]);

    React.useLayoutEffect(() => {
      const root = rootRef.current;
      if (!root) return;

      const measure = () => {
        const trackWidth = root.offsetWidth;
        if (trackWidth <= 0) return;

        const labelWidth = labelRef.current?.offsetWidth ?? 0;
        const valueWidth = valueRef.current?.offsetWidth ?? 0;
        const left =
          ((inlineSliderLabelOffset + labelWidth + inlineSliderHandleBuffer) /
            trackWidth) *
          100;
        const right =
          ((trackWidth -
            inlineSliderValueOffset -
            valueWidth -
            inlineSliderHandleBuffer) /
            trackWidth) *
          100;

        setDodge((current) =>
          current.left === left && current.right === right
            ? current
            : { left, right },
        );
      };

      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(root);

      if (labelRef.current) observer.observe(labelRef.current);
      if (valueRef.current) observer.observe(valueRef.current);

      return () => observer.disconnect();
    }, [formattedValue, label, showValue]);

    React.useEffect(
      () => () => {
        cleanupPointerSessionRef.current?.();
        cleanupPointerSessionRef.current = null;
      },
      [],
    );

    const playFeedbackSound = React.useCallback(
      (interaction: "change" | "commit") => {
        if (disabled) return;

        const resolvedSound = getInlineSliderSound(sound, interaction);
        if (!resolvedSound) return;

        if (interaction === "change") {
          const now =
            typeof performance === "undefined"
              ? Date.now()
              : performance.now();

          if (now - feedbackTimeRef.current < inlineSliderFeedbackMinIntervalMs) {
            return;
          }

          feedbackTimeRef.current = now;
          playSound(resolvedSound, { depth: "feedback" });
          return;
        }

        playSound(resolvedSound);
      },
      [disabled, sound],
    );

    const commitValue = React.useCallback(() => {
      playFeedbackSound("commit");
      onValueCommitted?.(latestValueRef.current);
    }, [onValueCommitted, playFeedbackSound]);

    const setNextValue = React.useCallback(
      (nextValue: number) => {
        const boundedValue = getBoundedValue(nextValue, min, max, step);

        if (boundedValue === latestValueRef.current) {
          return boundedValue;
        }

        latestValueRef.current = boundedValue;

        if (!isControlled) {
          setUncontrolledValue(boundedValue);
        }

        playFeedbackSound("change");
        onValueChange?.(boundedValue);

        return boundedValue;
      },
      [isControlled, max, min, onValueChange, playFeedbackSound, step],
    );

    const updateFromPointer = React.useCallback(
      (clientX: number) => {
        const bounds = boundsRef.current;
        if (!bounds) return;

        const nextPercent = getValueFromPointer(clientX, bounds);
        const nextValue = min + nextPercent * (max - min);

        setStretch(getInlineSliderStretch(clientX, bounds));
        setNextValue(nextValue);
      },
      [max, min, setNextValue],
    );

    const setValueFromPointer = React.useCallback(
      (clientX: number, snap: boolean) => {
        const bounds = boundsRef.current;
        if (!bounds) return;

        const nextPercent = getValueFromPointer(clientX, bounds);
        const nextValue = min + nextPercent * (max - min);

        setNextValue(
          snap ? getSnappedClickValue(nextValue, min, max, step) : nextValue,
        );
      },
      [max, min, setNextValue, step],
    );

    const stopPointerSession = React.useCallback(
      (commit: boolean, clientX?: number) => {
        const hadActiveSession =
          activePointerIdRef.current !== null ||
          boundsRef.current !== null ||
          cleanupPointerSessionRef.current !== null;

        if (!hadActiveSession) {
          return;
        }

        const wasClick = isClickRef.current;

        if (commit && wasClick && typeof clientX === "number") {
          setValueFromPointer(clientX, true);
        }

        activePointerIdRef.current = null;
        boundsRef.current = null;
        isClickRef.current = true;
        pointerStartRef.current = null;
        cleanupPointerSessionRef.current?.();
        cleanupPointerSessionRef.current = null;
        setDragging(false);
        setInteracting(false);
        setStretch(0);

        if (commit) {
          commitValue();
        }
      },
      [commitValue, setValueFromPointer],
    );

    React.useEffect(() => {
      if (disabled) {
        stopPointerSession(false);
      }
    }, [disabled, stopPointerSession]);

    const startPointerSession = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (disabled || event.button !== 0) return;

        onPointerDown?.(event);
        if (event.defaultPrevented) return;

        const surface = surfaceRef.current;
        if (!surface) return;

        event.preventDefault();
        surface.focus({ preventScroll: true });
        surface.setPointerCapture?.(event.pointerId);

        activePointerIdRef.current = event.pointerId;
        const root = rootRef.current;

        if (root) {
          const rect = root.getBoundingClientRect();
          const nativeWidth = root.offsetWidth || rect.width;

          boundsRef.current = {
            left: rect.left,
            nativeWidth,
            right: rect.right,
            scale: nativeWidth > 0 ? rect.width / nativeWidth : 1,
            width: rect.width,
          };
        } else {
          const rect = surface.getBoundingClientRect();

          boundsRef.current = {
            left: rect.left,
            nativeWidth: rect.width,
            right: rect.right,
            scale: 1,
            width: rect.width,
          };
        }
        isClickRef.current = true;
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
        setInteracting(true);

        const ownerDocument = surface.ownerDocument;
        const ownerWindow = ownerDocument.defaultView;

        cleanupPointerSessionRef.current?.();
        cleanupPointerSessionRef.current = null;

        const handlePointerMove = (pointerEvent: PointerEvent) => {
          if (
            activePointerIdRef.current !== null &&
            pointerEvent.pointerId !== activePointerIdRef.current
          ) {
            return;
          }

          const start = pointerStartRef.current;
          if (start) {
            const deltaX = pointerEvent.clientX - start.x;
            const deltaY = pointerEvent.clientY - start.y;

            if (
              isClickRef.current &&
              Math.hypot(deltaX, deltaY) > inlineSliderClickThreshold
            ) {
              isClickRef.current = false;
              setDragging(true);
            }
          }

          if (isClickRef.current) {
            return;
          }

          updateFromPointer(pointerEvent.clientX);
        };

        const handlePointerEnd = (pointerEvent: PointerEvent) => {
          if (
            activePointerIdRef.current !== null &&
            pointerEvent.pointerId !== activePointerIdRef.current
          ) {
            return;
          }

          stopPointerSession(true, pointerEvent.clientX);

          if (surface.hasPointerCapture?.(pointerEvent.pointerId)) {
            surface.releasePointerCapture(pointerEvent.pointerId);
          }
        };

        const handlePointerCancel = (pointerEvent: PointerEvent) => {
          if (
            activePointerIdRef.current !== null &&
            pointerEvent.pointerId !== activePointerIdRef.current
          ) {
            return;
          }

          stopPointerSession(false);
        };

        const handleWindowBlur = () => {
          stopPointerSession(false);
        };

        const cleanup = () => {
          ownerDocument.removeEventListener(
            "pointermove",
            handlePointerMove,
            true,
          );
          ownerDocument.removeEventListener(
            "pointerup",
            handlePointerEnd,
            true,
          );
          ownerDocument.removeEventListener(
            "pointercancel",
            handlePointerCancel,
            true,
          );
          ownerWindow?.removeEventListener("blur", handleWindowBlur);
        };

        ownerDocument.addEventListener("pointermove", handlePointerMove, true);
        ownerDocument.addEventListener("pointerup", handlePointerEnd, true);
        ownerDocument.addEventListener(
          "pointercancel",
          handlePointerCancel,
          true,
        );
        ownerWindow?.addEventListener("blur", handleWindowBlur);
        cleanupPointerSessionRef.current = cleanup;
      },
      [disabled, onPointerDown, stopPointerSession, updateFromPointer],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (disabled || event.defaultPrevented) return;

        const resolvedStep = event.shiftKey ? step * 10 : step;
        let nextValue: number | null = null;

        switch (event.key) {
          case "ArrowRight":
          case "ArrowUp":
            nextValue = currentValue + resolvedStep;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            nextValue = currentValue - resolvedStep;
            break;
          case "PageUp":
            nextValue = currentValue + resolvedStep * 10;
            break;
          case "PageDown":
            nextValue = currentValue - resolvedStep * 10;
            break;
          case "Home":
            nextValue = min;
            break;
          case "End":
            nextValue = max;
            break;
          default:
            return;
        }

        event.preventDefault();
        setNextValue(nextValue);
        commitValue();
      },
      [
        commitValue,
        currentValue,
        disabled,
        max,
        min,
        onKeyDown,
        setNextValue,
        step,
      ],
    );

    const stretchSize = Math.abs(stretch);
    const shouldUseGeneratedLabel = !ariaLabel && !ariaLabelledBy;
    const isActive = !disabled && (interacting || hovered);
    const valueDodge = percent < dodge.left || percent > dodge.right;
    const handleOpacity = !isActive
      ? 0
      : valueDodge
        ? 0.1
        : dragging
          ? 0.8
          : 0.5;
    const handleLeft = `max(4px, calc(${percent}% - 8px))`;
    const valueText = String(formattedValue);
    const resolvedShape = shape ?? aspektConfig.shape;

    return (
      <div
        ref={setRootRef}
        data-slot="inline-slider"
        className={cn(inlineSliderRootVariants({ size, className }))}
        {...props}
      >
        <div
          ref={surfaceRef}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-invalid={invalid || undefined}
          aria-label={ariaLabel}
          aria-labelledby={
            ariaLabelledBy ??
            (shouldUseGeneratedLabel ? generatedLabelId : undefined)
          }
          aria-orientation="horizontal"
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={currentValue}
          aria-valuetext={valueText}
          data-disabled={disabled ? "" : undefined}
          data-dragging={dragging ? "" : undefined}
          data-elastic={stretch !== 0 ? "" : undefined}
          data-invalid={invalid ? "" : undefined}
          data-interacting={interacting ? "" : undefined}
          data-active={isActive ? "" : undefined}
          className={cn(
            inlineSliderSurfaceVariants({ variant, shape: resolvedShape }),
          )}
          style={{
            transform: `translate3d(${stretch < 0 ? stretch : 0}px, 0, 0)`,
            width: `calc(100% + ${stretchSize}px)`,
          }}
          onKeyDown={handleKeyDown}
          onLostPointerCapture={() => stopPointerSession(false)}
          onMouseEnter={() => {
            if (!disabled) {
              setHovered(true);
            }
          }}
          onMouseLeave={() => setHovered(false)}
          onPointerCancel={() => stopPointerSession(false)}
          onPointerDown={startPointerSession}
          onPointerUp={(event) => stopPointerSession(true, event.clientX)}
        >
          <div
            data-slot="inline-slider-indicator"
            aria-hidden="true"
            className={cn(inlineSliderIndicatorVariants({ color }))}
            style={{ width: `${percent}%` }}
          />

          <div
            data-slot="inline-slider-ticks"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2]"
          >
            {ticks.map((style, index) => (
              style.percent > dodge.left && style.percent < dodge.right ? (
                <span
                  key={index}
                  className="absolute top-1/2 h-[22%] min-h-2 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent transition-colors group-data-[active]/inline-slider:bg-primary/20 dark:group-data-[active]/inline-slider:bg-white/20"
                  style={{ left: `${style.percent}%` }}
                />
              ) : null
            ))}
          </div>

          <span
            data-slot="inline-slider-thumb"
            aria-hidden="true"
            className={cn(inlineSliderThumbVariants({ color }))}
            style={{
              left: handleLeft,
              opacity: handleOpacity,
            }}
          />

          <div
            data-slot="inline-slider-content"
            className="pointer-events-none absolute inset-0 z-[4] flex min-w-0 items-center gap-4 px-[var(--inline-slider-padding-x)]"
          >
            <span
              ref={labelRef}
              id={shouldUseGeneratedLabel ? generatedLabelId : undefined}
              className="min-w-0 truncate font-medium leading-none text-secondary"
            >
              {label}
            </span>

            {showValue && (
              <span
                ref={valueRef}
                aria-hidden="true"
                className="ml-auto shrink-0 whitespace-nowrap font-mono font-semibold leading-none text-primary transition-colors group-data-[active]/inline-slider:text-primary"
              >
                {formattedValue}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export {
  InlineSlider,
  inlineSliderRootVariants as inlineSliderVariants,
};
export type {
  InlineSliderColor,
  InlineSliderFormat,
  InlineSliderProps,
  InlineSliderShape,
  InlineSliderSize,
  InlineSliderSound,
  InlineSliderVariant,
};
