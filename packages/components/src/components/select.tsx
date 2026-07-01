"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { aspektConfig } from "./config";
import { playSound, type SoundName } from "./sound";
import {
  SurfaceProvider,
  getSurfaceClassName,
  getSurfaceStyle,
  resolveSurfaceShadow,
  type SurfaceLevelValue,
  type SurfaceShadow,
  useResolvedSurfaceLevel,
} from "./surface";

const selectTriggerVariants = cva(
  [
    "group/select inline-flex w-full shrink-0 cursor-pointer items-center border bg-[var(--select-background)] [--select-background:var(--surface-current)]",
    "[--select-ring:color-mix(in_oklab,var(--ring)_25%,transparent)]",
    "text-primary shadow-[0_0_0_1px_transparent] outline-none select-none",
    "transition-[border-color,background-color,box-shadow,opacity] duration-200 ease-out",
    "hover:[--select-background:var(--surface-hover)]",
    "focus-visible:shadow-[0_0_0_1px_var(--select-ring)]",
    "data-[popup-open]:shadow-[0_0_0_1px_var(--select-ring)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[invalid]:border-destructive/55 data-[invalid]:[--select-ring:color-mix(in_oklab,var(--destructive)_20%,transparent)]",
  ],
  {
    variants: {
      variant: {
        outline: "border-border",
        soft:
          "border-transparent [--select-background:var(--surface-muted)] hover:[--select-background:var(--surface-hover)]",
        ghost:
          "border-transparent [--select-background:transparent] hover:[--select-background:var(--surface-hover)] data-[popup-open]:[--select-background:var(--surface-hover)]",
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

const selectPopupVariants = cva(
  [
    "z-50 min-w-[var(--anchor-width)] overflow-hidden border border-border text-primary outline-none",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-out",
    "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
    "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
  ],
  {
    variants: {
      shape: {
        square: "rounded-[var(--overlay-radius-square)]",
        round: "rounded-[var(--overlay-radius-round)]",
      },
    },
    defaultVariants: {
      shape: "square",
    },
  },
);

type SelectVariant = "soft" | "ghost" | "outline";

type SelectSize = "micro" | "tiny" | "small" | "medium" | "large";

type SelectShape = "square" | "round";

type SelectSound =
  | false
  | {
      change?: SoundName | false;
      close?: SoundName | false;
      open?: SoundName | false;
    };

type SelectRootProps<
  Value,
  Multiple extends boolean | undefined = false,
> = SelectPrimitive.Root.Props<Value, Multiple> & {
  shape?: SelectShape;
  size?: SelectSize;
  sound?: SelectSound;
};

type SelectLabelProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Label>,
  "className"
> & {
  className?: string;
};

type SelectTriggerProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Trigger>,
  "children" | "className" | "prefix" | "suffix"
> & {
    children?: React.ReactNode;
    className?: string;
    invalid?: boolean;
    placeholder?: React.ReactNode;
    prefix?: React.ReactNode;
    shape?: SelectShape | null;
    size?: SelectSize | null;
    suffix?: React.ReactNode;
    valueClassName?: string;
    variant?: SelectVariant | null;
  };

type SelectValueProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Value>,
  "className"
> & {
  className?: string;
};

type SelectPortalProps = React.ComponentProps<typeof SelectPrimitive.Portal>;

type SelectPositionerProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Positioner>,
  "className"
> & {
  className?: string;
};

type SelectPopupProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Popup>,
  "className"
> & {
    className?: string;
    shape?: SelectShape | null;
    surface?: SurfaceLevelValue | null;
    surfaceLift?: number | null;
    surfaceShadow?: SurfaceShadow | null;
  };

type SelectListProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.List>,
  "className"
> & {
  className?: string;
};

type SelectItemProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Item>,
  "children" | "className"
> & {
  children?: React.ReactNode;
  className?: string;
  indicator?: React.ReactNode;
};

type SelectItemIndicatorProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.ItemIndicator>,
  "className"
> & {
  className?: string;
};

type SelectItemTextProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.ItemText>,
  "className"
> & {
  className?: string;
};

type SelectScrollArrowProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>,
  "className"
> & {
  className?: string;
};

type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

type SelectGroupLabelProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.GroupLabel>,
  "className"
> & {
  className?: string;
};

const SelectSizeContext = React.createContext<SelectSize>("medium");
const SelectShapeContext = React.createContext<SelectShape>(
  aspektConfig.shape,
);

const selectSlotWidths = {
  micro: "0.875rem",
  tiny: "0.875rem",
  small: "1rem",
  medium: "1rem",
  large: "1rem",
} satisfies Record<SelectSize, string>;

const selectAffixGaps = {
  micro: "0.25rem",
  tiny: "0.25rem",
  small: "0.375rem",
  medium: "0.5rem",
  large: "0.5rem",
} satisfies Record<SelectSize, string>;

function getSelectSound(
  sound: SelectSound | undefined,
  event: "change" | "close" | "open",
) {
  if (sound === false) return false;

  if (sound === undefined) {
    if (event === "open") return "open";
    if (event === "change") return "change";
    return false;
  }

  return sound[event];
}

function SelectAffix({
  side,
  show,
  gap,
  width,
  children,
}: {
  side: "prefix" | "suffix";
  show: boolean;
  gap: string;
  width?: string;
  children: React.ReactNode;
}) {
  const isPrefix = side === "prefix";

  return (
    <span
      data-slot={isPrefix ? "select-prefix" : "select-suffix"}
      data-visible={show ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden text-secondary",
        "transition-[width,max-width,opacity,margin] duration-200 ease-out",
        "group-focus-visible/select:text-primary/70 group-data-[popup-open]/select:text-primary/70",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{
        width: width ? (show ? width : "0px") : undefined,
        maxWidth: width ? undefined : show ? "16rem" : "0px",
        marginRight: isPrefix && show ? gap : 0,
        marginLeft: !isPrefix && show ? gap : 0,
      }}
    >
      <span className="inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}

function SelectRoot<
  Value,
  Multiple extends boolean | undefined = false,
>({
  onOpenChange,
  onValueChange,
  shape,
  size = "medium",
  sound,
  ...props
}: SelectRootProps<Value, Multiple>) {
  const resolvedShape = shape ?? aspektConfig.shape;
  const handleOpenChange = React.useCallback<
    NonNullable<SelectPrimitive.Root.Props<Value, Multiple>["onOpenChange"]>
  >(
    (open, eventDetails) => {
      const nextSound = getSelectSound(sound, open ? "open" : "close");

      if (nextSound) {
        playSound(nextSound);
      }

      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange, sound],
  );

  const handleValueChange = React.useCallback<
    NonNullable<SelectPrimitive.Root.Props<Value, Multiple>["onValueChange"]>
  >(
    (value, eventDetails) => {
      const nextSound = getSelectSound(sound, "change");

      if (nextSound) {
        playSound(nextSound);
      }

      onValueChange?.(value, eventDetails);
    },
    [onValueChange, sound],
  );

  return (
    <SelectSizeContext.Provider value={size}>
      <SelectShapeContext.Provider value={resolvedShape}>
        <SelectPrimitive.Root
          onOpenChange={handleOpenChange}
          onValueChange={handleValueChange}
          {...props}
        />
      </SelectShapeContext.Provider>
    </SelectSizeContext.Provider>
  );
}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  function SelectLabel({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Label
        ref={ref}
        data-slot="select-label"
        className={cn("text-sm font-medium text-primary", className)}
        {...props}
      />
    );
  },
);

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  function SelectValue({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Value
        ref={ref}
        data-slot="select-value"
        className={cn(
          "min-w-0 flex-1 truncate text-left",
          "data-[placeholder]:text-secondary",
          className,
        )}
        {...props}
      />
    );
  },
);

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    {
      children,
      className,
      invalid = false,
      placeholder = "Select option",
      prefix,
      shape,
      size,
      suffix,
      valueClassName,
      variant,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) {
    const inheritedSize = React.useContext(SelectSizeContext);
    const inheritedShape = React.useContext(SelectShapeContext);
    const resolvedSize = size ?? inheritedSize;
    const resolvedShape = shape ?? inheritedShape;
    const showPrefix = Boolean(prefix);
    const showSuffix = Boolean(suffix);

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        data-slot="select-trigger"
        data-invalid={invalid ? "" : undefined}
        type="button"
        aria-invalid={invalid || ariaInvalid ? true : undefined}
        className={cn(
          selectTriggerVariants({
            variant,
            size: resolvedSize,
            shape: resolvedShape,
            className,
          }),
        )}
        {...props}
      >
        <SelectAffix
          side="prefix"
          show={showPrefix}
          gap={selectAffixGaps[resolvedSize]}
          width={selectSlotWidths[resolvedSize]}
        >
          {prefix}
        </SelectAffix>

        {children ?? (
          <SelectValue placeholder={placeholder} className={valueClassName} />
        )}

        <SelectAffix
          side="suffix"
          show={showSuffix}
          gap={selectAffixGaps[resolvedSize]}
        >
          {suffix}
        </SelectAffix>

        <SelectPrimitive.Icon
          data-slot="select-icon"
          className={cn(
            "ml-2 inline-flex shrink-0 items-center justify-center text-secondary",
            "transition-transform duration-200 group-data-[popup-open]/select:rotate-180",
          )}
        >
          <CaretDownIcon aria-hidden="true" weight="bold" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);

function SelectPortal(props: SelectPortalProps) {
  return <SelectPrimitive.Portal {...props} />;
}

const SelectPositioner = React.forwardRef<
  HTMLDivElement,
  SelectPositionerProps
>(function SelectPositioner(
  {
    alignItemWithTrigger = false,
    className,
    sideOffset = 6,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.Positioner
      ref={ref}
      alignItemWithTrigger={alignItemWithTrigger}
      sideOffset={sideOffset}
      className={cn("z-50 outline-none", className)}
      {...props}
    />
  );
});

const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  function SelectPopup(
    {
      className,
      shape,
      style,
      surface,
      surfaceLift,
      surfaceShadow,
      ...props
    },
    ref,
  ) {
    const inheritedShape = React.useContext(SelectShapeContext);
    const resolvedShape = shape ?? inheritedShape;
    const resolvedSurface = useResolvedSurfaceLevel({
      level: surface,
      lift: surfaceLift ?? 2,
    });
    const resolvedShadow = resolveSurfaceShadow(surfaceShadow, resolvedSurface);

    return (
      <SurfaceProvider value={resolvedSurface}>
        <SelectShapeContext.Provider value={resolvedShape}>
          <SelectPrimitive.Popup
            ref={ref}
            data-slot="select-popup"
            data-surface-level={resolvedSurface}
            className={cn(
              getSurfaceClassName(resolvedSurface, resolvedShadow),
              selectPopupVariants({ shape: resolvedShape }),
              className,
            )}
            style={getSurfaceStyle(resolvedSurface, style)}
            {...props}
          />
        </SelectShapeContext.Provider>
      </SurfaceProvider>
    );
  },
);

const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
  function SelectList({ className, ...props }, ref) {
    return (
      <SelectPrimitive.List
        ref={ref}
        data-slot="select-list"
        className={cn(
          "max-h-[min(var(--available-height),16rem)] overflow-y-auto p-1 scroll-py-1",
          className,
        )}
        {...props}
      />
    );
  },
);

const SelectItemIndicator = React.forwardRef<
  HTMLSpanElement,
  SelectItemIndicatorProps
>(function SelectItemIndicator({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.ItemIndicator
      ref={ref}
      data-slot="select-item-indicator"
      className={cn(
        "inline-flex size-4 items-center justify-center text-current",
        "transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    >
      {children ?? <CheckIcon aria-hidden="true" weight="bold" />}
    </SelectPrimitive.ItemIndicator>
  );
});

const SelectItemText = React.forwardRef<HTMLDivElement, SelectItemTextProps>(
  function SelectItemText({ className, ...props }, ref) {
    return (
      <SelectPrimitive.ItemText
        ref={ref}
        data-slot="select-item-text"
        className={cn("min-w-0 truncate", className)}
        {...props}
      />
    );
  },
);

const SelectItem = React.forwardRef<HTMLElement, SelectItemProps>(
  function SelectItem({ children, className, indicator, ...props }, ref) {
    const inheritedShape = React.useContext(SelectShapeContext);

    return (
      <SelectPrimitive.Item
        ref={ref}
        data-slot="select-item"
        className={cn(
          "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-2.5 py-1.5 text-sm outline-none select-none",
          inheritedShape === "round" ? "rounded-full" : "rounded-md",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "data-[highlighted]:bg-primary data-[highlighted]:text-inverse",
          className,
        )}
        {...props}
      >
        <SelectItemIndicator className="col-start-1">
          {indicator}
        </SelectItemIndicator>
        <SelectItemText className="col-start-2">{children}</SelectItemText>
      </SelectPrimitive.Item>
    );
  },
);

const SelectScrollUpArrow = React.forwardRef<
  HTMLDivElement,
  SelectScrollArrowProps
>(function SelectScrollUpArrow({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.ScrollUpArrow
      ref={ref}
      data-slot="select-scroll-up-arrow"
      className={cn(
        "flex h-5 cursor-default items-center justify-center bg-surface-current text-secondary",
        className,
      )}
      {...props}
    >
      {children ?? (
        <span className="rotate-180">
          <CaretDownIcon aria-hidden="true" weight="bold" />
        </span>
      )}
    </SelectPrimitive.ScrollUpArrow>
  );
});

const SelectScrollDownArrow = React.forwardRef<
  HTMLDivElement,
  SelectScrollArrowProps
>(function SelectScrollDownArrow({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.ScrollDownArrow
      ref={ref}
      data-slot="select-scroll-down-arrow"
      className={cn(
        "flex h-5 cursor-default items-center justify-center bg-surface-current text-secondary",
        className,
      )}
      {...props}
    >
      {children ?? <CaretDownIcon aria-hidden="true" weight="bold" />}
    </SelectPrimitive.ScrollDownArrow>
  );
});

function SelectGroup(props: SelectGroupProps) {
  return <SelectPrimitive.Group {...props} />;
}

const SelectGroupLabel = React.forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  function SelectGroupLabel({ className, ...props }, ref) {
    return (
      <SelectPrimitive.GroupLabel
        ref={ref}
        data-slot="select-group-label"
        className={cn(
          "px-2.5 py-1.5 text-xs font-medium text-secondary",
          className,
        )}
        {...props}
      />
    );
  },
);

export {
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectRoot,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
  SelectValue,
  selectPopupVariants,
  selectTriggerVariants,
};
export type {
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectListProps,
  SelectPopupProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectRootProps,
  SelectScrollArrowProps,
  SelectShape,
  SelectSize,
  SelectSound,
  SelectTriggerProps,
  SelectValueProps,
  SelectVariant,
};
