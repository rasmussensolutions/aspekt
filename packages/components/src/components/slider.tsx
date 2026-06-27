"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { playSound, type SoundName } from "./sound";

const sliderRootVariants = cva(
  [
    "group/slider grid w-full gap-2 text-primary",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:text-destructive",
  ],
  {
    variants: {
      size: {
        micro:
          "text-xs [--slider-control-size:1.25rem] [--slider-thumb-radius:calc(var(--radius-sm)*0.5)] [--slider-thumb-size:0.875rem] [--slider-track-size:0.25rem]",
        tiny:
          "text-xs [--slider-control-size:1.5rem] [--slider-thumb-radius:calc(var(--radius-sm)*0.65)] [--slider-thumb-size:1rem] [--slider-track-size:0.3125rem]",
        small:
          "text-sm [--slider-control-size:1.75rem] [--slider-thumb-radius:calc(var(--radius-sm)*0.8)] [--slider-thumb-size:1.125rem] [--slider-track-size:0.375rem]",
        medium:
          "text-sm [--slider-control-size:2rem] [--slider-thumb-radius:var(--radius-sm)] [--slider-thumb-size:1.375rem] [--slider-track-size:0.5rem]",
        large:
          "text-base [--slider-control-size:2.25rem] [--slider-thumb-radius:var(--radius-md)] [--slider-thumb-size:1.625rem] [--slider-track-size:0.625rem]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

const sliderControlVariants = cva(
  [
    "flex touch-none items-center select-none",
    "data-[orientation=horizontal]:h-[var(--slider-control-size)] data-[orientation=horizontal]:w-full",
    "data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-[var(--slider-control-size)] data-[orientation=vertical]:justify-center",
  ],
  {
    variants: {
      size: {
        micro: "",
        tiny: "",
        small: "",
        medium: "",
        large: "",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

const sliderTrackVariants = cva(
  [
    "relative grow transition-[background-color,border-color,box-shadow]",
    "data-[orientation=horizontal]:h-[var(--slider-track-size)] data-[orientation=horizontal]:w-full",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[var(--slider-track-size)]",
    "data-[invalid]:border-destructive/45 data-[invalid]:ring-destructive/15",
  ],
  {
    variants: {
      variant: {
        solid: "border border-transparent bg-control-track",
        soft: "border border-transparent bg-control-track/80",
        outline: "border border-border bg-surface",
      },
      shape: {
        square: "rounded-md",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      shape: "round",
    },
  },
);

const sliderIndicatorVariants = cva(
  [
    "block rounded-[inherit] select-none transition-colors",
    "data-[orientation=horizontal]:h-full",
    "data-[orientation=vertical]:w-full",
  ],
  {
    variants: {
      color: {
        accent: "bg-action",
        blue: "bg-info",
        red: "bg-destructive",
        amber: "bg-warning",
        neutral: "bg-primary",
      },
      variant: {
        solid: "",
        soft: "",
        outline: "",
      },
    },
    defaultVariants: {
      color: "blue",
      variant: "outline",
    },
  },
);

const sliderThumbVariants = cva(
  [
    "z-10 block size-[var(--slider-thumb-size)] shrink-0 border bg-surface shadow-sm ring-1 ring-border",
    "cursor-grab outline-none transition-[background-color,border-color,box-shadow,scale,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "active:scale-95 data-[disabled]:cursor-not-allowed data-[disabled]:active:scale-100",
    "data-[dragging]:cursor-grabbing data-[dragging]:scale-95",
    "data-[elastic]:[transform:translate3d(var(--slider-elastic-thumb-x),var(--slider-elastic-thumb-y),0)_scale(var(--slider-elastic-thumb-scale))]",
    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-current/25",
    "data-[invalid]:border-destructive/55 data-[invalid]:ring-destructive/20",
    "border-border",
  ],
  {
    variants: {
      color: {
        accent: "",
        blue: "",
        red: "",
        amber: "",
        neutral: "",
      },
      shape: {
        square: "rounded-[var(--slider-thumb-radius)]",
        round: "rounded-full",
      },
      variant: {
        solid: "",
        soft: "",
        outline: "",
      },
    },
    compoundVariants: [
      {
        color: "accent",
        variant: ["soft", "outline"],
        className: "border-action/25",
      },
      {
        color: "blue",
        variant: ["soft", "outline"],
        className: "border-info/25",
      },
      {
        color: "red",
        variant: ["soft", "outline"],
        className: "border-destructive/25",
      },
      {
        color: "amber",
        variant: ["soft", "outline"],
        className: "border-warning/35",
      },
      {
        color: "neutral",
        variant: ["soft", "outline"],
        className: "border-primary/15",
      },
    ],
    defaultVariants: {
      color: "blue",
      shape: "round",
      variant: "outline",
    },
  },
);

type SliderValue = number | readonly number[];
type SliderRootProps = SliderPrimitive.Root.Props<SliderValue>;
type SliderOrientation = NonNullable<SliderRootProps["orientation"]>;
type SliderElasticEdge = "before" | "after" | null;
type SliderVariant = "solid" | "soft" | "outline";
type SliderColor = "accent" | "blue" | "red" | "amber" | "neutral";
type SliderSize = "micro" | "tiny" | "small" | "medium" | "large";
type SliderShape = "square" | "round";

type SliderElasticState = {
  activeThumbIndex: number;
  edge: SliderElasticEdge;
  x: number;
  y: number;
};

type SliderElasticStyle = React.CSSProperties & {
  "--slider-elastic-thumb-scale": number;
  "--slider-elastic-thumb-x": string;
  "--slider-elastic-thumb-y": string;
};

const emptySliderElasticState = {
  activeThumbIndex: 0,
  edge: null,
  x: 0,
  y: 0,
} satisfies SliderElasticState;

const sliderElasticLimit = 6;
const sliderElasticResistance = 0.12;
const sliderFeedbackMinIntervalMs = 58;

type SliderFeedbackThumbState = {
  feedbackTime: number;
};

type SliderSound =
  | SoundName
  | false
  | {
      change?: SoundName | false;
      commit?: SoundName | false;
    };

type SliderProps = Omit<
  SliderRootProps,
  "children" | "className" | "color"
> & {
    className?: string;
    color?: SliderColor | null;
    controlClassName?: string;
    elastic?: boolean;
    indicatorClassName?: string;
    invalid?: boolean;
    label?: React.ReactNode;
    labelClassName?: string;
    shape?: SliderShape | null;
    showValue?: boolean;
    size?: SliderSize | null;
    sound?: SliderSound;
    thumbClassName?: string;
    thumbLabel?: string;
    thumbLabels?: readonly string[];
    trackClassName?: string;
    valueClassName?: string;
    variant?: SliderVariant | null;
  };

function getSliderValues(value: SliderValue | undefined) {
  if (Array.isArray(value)) return value;
  return [value ?? 0];
}

function areSliderElasticStatesEqual(
  current: SliderElasticState,
  next: SliderElasticState,
) {
  return (
    current.activeThumbIndex === next.activeThumbIndex &&
    current.edge === next.edge &&
    current.x === next.x &&
    current.y === next.y
  );
}

function getSliderElasticOffset(distance: number) {
  return Math.min(
    sliderElasticLimit,
    (distance * sliderElasticResistance) / (1 + distance / 180),
  );
}

function getSliderElasticState({
  activeThumbIndex,
  control,
  orientation,
  pointerX,
  pointerY,
}: {
  activeThumbIndex: number;
  control: HTMLDivElement;
  orientation: SliderOrientation;
  pointerX: number;
  pointerY: number;
}): SliderElasticState {
  const rect = control.getBoundingClientRect();

  if (orientation === "vertical") {
    if (pointerY < rect.top) {
      const offset = getSliderElasticOffset(rect.top - pointerY);

      return {
        activeThumbIndex,
        edge: "before",
        x: 0,
        y: -offset,
      };
    }

    if (pointerY > rect.bottom) {
      const offset = getSliderElasticOffset(pointerY - rect.bottom);

      return {
        activeThumbIndex,
        edge: "after",
        x: 0,
        y: offset,
      };
    }

    return { ...emptySliderElasticState, activeThumbIndex };
  }

  if (pointerX < rect.left) {
    const offset = getSliderElasticOffset(rect.left - pointerX);

    return {
      activeThumbIndex,
      edge: "before",
      x: -offset,
      y: 0,
    };
  }

  if (pointerX > rect.right) {
    const offset = getSliderElasticOffset(pointerX - rect.right);

    return {
      activeThumbIndex,
      edge: "after",
      x: offset,
      y: 0,
    };
  }

  return { ...emptySliderElasticState, activeThumbIndex };
}

function getSliderThumbIndexFromTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;

  const thumb = target.closest("[data-slot='slider-thumb']");
  const index = Number(thumb?.getAttribute("data-index"));

  return Number.isInteger(index) ? index : null;
}

function getSliderSound(
  sound: SliderSound | undefined,
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

function shouldPlaySliderFeedbackSound({
  activeThumbIndex,
  state,
}: {
  activeThumbIndex: number;
  state: React.MutableRefObject<SliderFeedbackThumbState[]>;
}) {
  const now =
    typeof performance === "undefined" ? Date.now() : performance.now();
  const thumbState = state.current[activeThumbIndex];
  const canPlay =
    !thumbState ||
    now - thumbState.feedbackTime >= sliderFeedbackMinIntervalMs;

  state.current[activeThumbIndex] = {
    feedbackTime: canPlay ? now : thumbState?.feedbackTime ?? 0,
  };

  return canPlay;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    className,
    color,
    controlClassName,
    defaultValue,
    disabled = false,
    elastic = true,
    indicatorClassName,
    invalid = false,
    label,
    labelClassName,
    max = 100,
    min = 0,
    onValueChange,
    onValueCommitted,
    orientation = "horizontal",
    shape,
    showValue = false,
    size,
    sound,
    step = 1,
    thumbClassName,
    thumbLabel,
    thumbLabels,
    trackClassName,
    value,
    valueClassName,
    variant,
    "aria-invalid": ariaInvalid,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const values = getSliderValues(value ?? defaultValue);
  const thumbCount = Math.max(1, values.length);
  const activeThumbIndexRef = React.useRef(0);
  const feedbackStateRef = React.useRef<SliderFeedbackThumbState[]>([]);
  const [elasticState, setElasticState] =
    React.useState<SliderElasticState>(emptySliderElasticState);
  const defaultThumbLabel =
    thumbLabel ??
    (typeof ariaLabel === "string"
      ? ariaLabel
      : typeof label === "string"
        ? label
        : "Slider");
  const elasticStyle: SliderElasticStyle = {
    "--slider-elastic-thumb-scale": elasticState.edge === null ? 1 : 0.98,
    "--slider-elastic-thumb-x": `${elasticState.x}px`,
    "--slider-elastic-thumb-y": `${elasticState.y}px`,
  } satisfies SliderElasticStyle;

  const updateElasticState = React.useCallback((next: SliderElasticState) => {
    setElasticState((current) =>
      areSliderElasticStatesEqual(current, next) ? current : next,
    );
  }, []);

  const resetElasticState = React.useCallback(() => {
    updateElasticState({
      ...emptySliderElasticState,
      activeThumbIndex: activeThumbIndexRef.current,
    });
  }, [updateElasticState]);

  const updateElasticStateFromPointer = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!elastic || disabled) return;

      updateElasticState(
        getSliderElasticState({
          activeThumbIndex: activeThumbIndexRef.current,
          control: event.currentTarget,
          orientation,
          pointerX: event.clientX,
          pointerY: event.clientY,
        }),
      );
    },
    [disabled, elastic, orientation, updateElasticState],
  );

  const handleElasticPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const thumbIndex = getSliderThumbIndexFromTarget(event.target);

      if (thumbIndex !== null) {
        activeThumbIndexRef.current = thumbIndex;
      }

      updateElasticStateFromPointer(event);

      if (!elastic || disabled) return;

      const ownerDocument = event.currentTarget.ownerDocument;
      const ownerWindow = ownerDocument.defaultView;
      const reset = () => {
        resetElasticState();
        ownerDocument.removeEventListener("pointerup", reset);
        ownerDocument.removeEventListener("pointercancel", reset);
        ownerWindow?.removeEventListener("blur", reset);
      };

      ownerDocument.addEventListener("pointerup", reset);
      ownerDocument.addEventListener("pointercancel", reset);
      ownerWindow?.addEventListener("blur", reset);
    },
    [disabled, elastic, resetElasticState, updateElasticStateFromPointer],
  );

  const handleValueChange = React.useCallback<
    NonNullable<SliderRootProps["onValueChange"]>
  >(
    (nextValue, eventDetails) => {
      activeThumbIndexRef.current = eventDetails.activeThumbIndex;

      const resolvedSound = getSliderSound(sound, "change");

      if (
        resolvedSound &&
        shouldPlaySliderFeedbackSound({
          activeThumbIndex: eventDetails.activeThumbIndex,
          state: feedbackStateRef,
        })
      ) {
        playSound(resolvedSound, { depth: "feedback" });
      }

      onValueChange?.(nextValue, eventDetails);
    },
    [onValueChange, sound],
  );

  const handleValueCommitted = React.useCallback<
    NonNullable<SliderRootProps["onValueCommitted"]>
  >(
    (nextValue, eventDetails) => {
      feedbackStateRef.current = [];

      const resolvedSound = getSliderSound(sound, "commit");

      if (resolvedSound) {
        playSound(resolvedSound);
      }

      onValueCommitted?.(nextValue, eventDetails);
    },
    [onValueCommitted, sound],
  );

  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      data-invalid={invalid ? "" : undefined}
      aria-invalid={invalid || ariaInvalid ? true : undefined}
      aria-label={ariaLabel}
      className={cn(sliderRootVariants({ size, className }))}
      disabled={disabled}
      orientation={orientation}
      min={min}
      max={max}
      step={step}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      onValueCommitted={handleValueCommitted}
      {...props}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-4">
          {label && (
            <SliderPrimitive.Label
              className={cn(
                "text-sm font-medium leading-none text-current",
                labelClassName,
              )}
            >
              {label}
            </SliderPrimitive.Label>
          )}

          {showValue && (
            <SliderPrimitive.Value
              className={cn(
                "ml-auto font-mono text-sm text-secondary",
                valueClassName,
              )}
            >
              {(formattedValues) => formattedValues.join(" - ")}
            </SliderPrimitive.Value>
          )}
        </div>
      )}

      <div data-slot="slider-elastic-region" style={elasticStyle}>
        <SliderPrimitive.Control
          data-slot="slider-control"
          data-invalid={invalid ? "" : undefined}
          className={cn(sliderControlVariants({ size }), controlClassName)}
          onLostPointerCapture={resetElasticState}
          onPointerCancel={resetElasticState}
          onPointerDown={handleElasticPointerDown}
          onPointerMove={updateElasticStateFromPointer}
          onPointerUp={resetElasticState}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            data-invalid={invalid ? "" : undefined}
            className={cn(
              sliderTrackVariants({ variant, shape, className: trackClassName }),
            )}
          >
            <SliderPrimitive.Indicator
              data-slot="slider-indicator"
              className={cn(
                sliderIndicatorVariants({
                  variant,
                  color,
                  className: indicatorClassName,
                }),
              )}
            />

            {Array.from({ length: thumbCount }, (_, index) => (
              <SliderPrimitive.Thumb
                key={index}
                data-slot="slider-thumb"
                data-elastic={
                  elasticState.edge !== null &&
                  elasticState.activeThumbIndex === index
                    ? ""
                    : undefined
                }
                data-invalid={invalid ? "" : undefined}
                index={index}
                getAriaLabel={(thumbIndex) =>
                  thumbLabels?.[thumbIndex] ??
                  (thumbCount > 1
                    ? `${defaultThumbLabel} ${thumbIndex + 1}`
                    : defaultThumbLabel)
                }
                className={cn(
                  sliderThumbVariants({
                    variant,
                    color,
                    shape,
                    className: thumbClassName,
                  }),
                )}
              />
            ))}
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </div>
    </SliderPrimitive.Root>
  );
});

export { Slider, sliderRootVariants as sliderVariants };
export type {
  SliderColor,
  SliderProps,
  SliderShape,
  SliderSize,
  SliderSound,
  SliderValue,
  SliderVariant,
};
