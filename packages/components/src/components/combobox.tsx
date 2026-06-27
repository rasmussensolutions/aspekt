"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CaretDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { aspektConfig } from "./config";
import { playSound, type SoundName } from "./sound";

const comboboxInputGroupVariants = cva(
  [
    "group/combobox inline-flex w-full shrink-0 items-center border bg-[var(--combobox-background)] [--combobox-background:var(--surface)]",
    "[--combobox-ring:color-mix(in_oklab,var(--ring)_25%,transparent)]",
    "text-primary shadow-[0_0_0_1px_transparent] outline-none",
    "transition-[border-color,background-color,box-shadow,opacity] duration-200 ease-out",
    "hover:[--combobox-background:color-mix(in_oklab,var(--text-primary)_4%,var(--surface))]",
    "has-[:focus-visible]:shadow-[0_0_0_1px_var(--combobox-ring)]",
    "data-[popup-open]:shadow-[0_0_0_1px_var(--combobox-ring)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:border-destructive/55 data-[invalid]:[--combobox-ring:color-mix(in_oklab,var(--destructive)_20%,transparent)]",
  ],
  {
    variants: {
      variant: {
        outline: "border-border",
        soft:
          "border-transparent [--combobox-background:color-mix(in_oklab,var(--text-primary)_5%,var(--surface))] hover:[--combobox-background:color-mix(in_oklab,var(--text-primary)_8%,var(--surface))] dark:[--combobox-background:color-mix(in_oklab,var(--text-primary)_10%,var(--surface))] dark:hover:[--combobox-background:color-mix(in_oklab,var(--text-primary)_12%,var(--surface))]",
        ghost:
          "border-transparent [--combobox-background:transparent] hover:[--combobox-background:color-mix(in_oklab,var(--text-primary)_5%,var(--surface))] data-[popup-open]:[--combobox-background:color-mix(in_oklab,var(--text-primary)_5%,var(--surface))] dark:hover:[--combobox-background:color-mix(in_oklab,var(--text-primary)_10%,var(--surface))] dark:data-[popup-open]:[--combobox-background:color-mix(in_oklab,var(--text-primary)_10%,var(--surface))]",
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

const comboboxPopupVariants = cva(
  [
    "z-50 min-w-[var(--anchor-width)] overflow-hidden border border-border bg-surface-floating text-primary shadow-xl outline-none",
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

type ComboboxVariant = "soft" | "ghost" | "outline";
type ComboboxSize = "micro" | "tiny" | "small" | "medium" | "large";
type ComboboxShape = "square" | "round";

type ComboboxSound =
  | false
  | {
      change?: SoundName | false;
      close?: SoundName | false;
      open?: SoundName | false;
    };

type ComboboxRootProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComboboxPrimitive.Root.Props<Value, Multiple> & {
  shape?: ComboboxShape;
  size?: ComboboxSize;
  sound?: ComboboxSound;
};

type ComboboxLabelProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Label>,
  "className"
> & {
  className?: string;
};

type ComboboxValueProps = React.ComponentProps<typeof ComboboxPrimitive.Value>;

type ComboboxInputGroupProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.InputGroup>,
  "className" | "prefix" | "suffix"
> & {
  className?: string;
  invalid?: boolean;
  prefix?: React.ReactNode;
  shape?: ComboboxShape | null;
  size?: ComboboxSize | null;
  suffix?: React.ReactNode;
  variant?: ComboboxVariant | null;
};

type ComboboxInputProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Input>,
  "className"
> & {
  className?: string;
};

type ComboboxTriggerProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Trigger>,
  "className"
> & {
  className?: string;
};

type ComboboxClearProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Clear>,
  "className"
> & {
  className?: string;
};

type ComboboxPortalProps = React.ComponentProps<typeof ComboboxPrimitive.Portal>;

type ComboboxPositionerProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Positioner>,
  "className"
> & {
  className?: string;
};

type ComboboxPopupProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Popup>,
  "className"
> & {
  className?: string;
  shape?: ComboboxShape | null;
};

type ComboboxListProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.List>,
  "className"
> & {
  className?: string;
};

type ComboboxItemProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Item>,
  "children" | "className"
> & {
  children?: React.ReactNode;
  className?: string;
  indicator?: React.ReactNode;
};

type ComboboxItemIndicatorProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>,
  "className"
> & {
  className?: string;
};

type ComboboxGroupProps = React.ComponentProps<typeof ComboboxPrimitive.Group>;

type ComboboxGroupLabelProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.GroupLabel>,
  "className"
> & {
  className?: string;
};

type ComboboxEmptyProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Empty>,
  "className"
> & {
  className?: string;
};

type ComboboxStatusProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Status>,
  "className"
> & {
  className?: string;
};

type ComboboxIconProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Icon>,
  "className"
> & {
  className?: string;
};

const ComboboxSizeContext = React.createContext<ComboboxSize>("medium");
const ComboboxShapeContext = React.createContext<ComboboxShape>(
  aspektConfig.shape,
);

const comboboxSlotWidths = {
  micro: "0.875rem",
  tiny: "0.875rem",
  small: "1rem",
  medium: "1rem",
  large: "1rem",
} satisfies Record<ComboboxSize, string>;

const comboboxAffixGaps = {
  micro: "0.25rem",
  tiny: "0.25rem",
  small: "0.375rem",
  medium: "0.5rem",
  large: "0.5rem",
} satisfies Record<ComboboxSize, string>;

function getComboboxSound(
  sound: ComboboxSound | undefined,
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

function ComboboxAffix({
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
      data-slot={isPrefix ? "combobox-prefix" : "combobox-suffix"}
      data-visible={show ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden text-secondary",
        "transition-[width,max-width,opacity,margin] duration-200 ease-out",
        "group-focus-within/combobox:text-primary/70 group-data-[popup-open]/combobox:text-primary/70",
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

function ComboboxRoot<
  Value,
  Multiple extends boolean | undefined = false,
>({
  onOpenChange,
  onValueChange,
  shape,
  size = "medium",
  sound,
  ...props
}: ComboboxRootProps<Value, Multiple>) {
  const resolvedShape = shape ?? aspektConfig.shape;
  const handleOpenChange = React.useCallback<
    NonNullable<
      ComboboxPrimitive.Root.Props<Value, Multiple>["onOpenChange"]
    >
  >(
    (open, eventDetails) => {
      const nextSound = getComboboxSound(sound, open ? "open" : "close");

      if (nextSound) {
        playSound(nextSound);
      }

      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange, sound],
  );

  const handleValueChange = React.useCallback<
    NonNullable<
      ComboboxPrimitive.Root.Props<Value, Multiple>["onValueChange"]
    >
  >(
    (value, eventDetails) => {
      const nextSound = getComboboxSound(sound, "change");

      if (nextSound) {
        playSound(nextSound);
      }

      onValueChange?.(value, eventDetails);
    },
    [onValueChange, sound],
  );

  return (
    <ComboboxSizeContext.Provider value={size}>
      <ComboboxShapeContext.Provider value={resolvedShape}>
        <ComboboxPrimitive.Root
          onOpenChange={handleOpenChange}
          onValueChange={handleValueChange}
          {...props}
        />
      </ComboboxShapeContext.Provider>
    </ComboboxSizeContext.Provider>
  );
}

const ComboboxLabel = React.forwardRef<HTMLDivElement, ComboboxLabelProps>(
  function ComboboxLabel({ className, ...props }, ref) {
    return (
      <ComboboxPrimitive.Label
        ref={ref}
        data-slot="combobox-label"
        className={cn("text-sm font-medium text-primary", className)}
        {...props}
      />
    );
  },
);

function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value {...props} />;
}

const ComboboxInputGroup = React.forwardRef<
  HTMLDivElement,
  ComboboxInputGroupProps
>(function ComboboxInputGroup(
  {
    children,
    className,
    invalid = false,
    prefix,
    shape,
    size,
    suffix,
    variant,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const inheritedSize = React.useContext(ComboboxSizeContext);
  const inheritedShape = React.useContext(ComboboxShapeContext);
  const resolvedSize = size ?? inheritedSize;
  const resolvedShape = shape ?? inheritedShape;
  const showPrefix = Boolean(prefix);
  const showSuffix = Boolean(suffix);

  return (
    <ComboboxPrimitive.InputGroup
      ref={ref}
      data-slot="combobox-input-group"
      data-invalid={invalid ? "" : undefined}
      aria-invalid={invalid || ariaInvalid ? true : undefined}
      className={cn(
        comboboxInputGroupVariants({
          variant,
          size: resolvedSize,
          shape: resolvedShape,
          className,
        }),
      )}
      {...props}
    >
      <ComboboxAffix
        side="prefix"
        show={showPrefix}
        gap={comboboxAffixGaps[resolvedSize]}
        width={comboboxSlotWidths[resolvedSize]}
      >
        {prefix}
      </ComboboxAffix>

      {children}

      <ComboboxAffix
        side="suffix"
        show={showSuffix}
        gap={comboboxAffixGaps[resolvedSize]}
      >
        {suffix}
      </ComboboxAffix>
    </ComboboxPrimitive.InputGroup>
  );
});

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput({ className, ...props }, ref) {
    return (
      <ComboboxPrimitive.Input
        ref={ref}
        data-slot="combobox-input"
        className={cn(
          "min-w-0 flex-1 bg-transparent text-left outline-none placeholder:text-secondary",
          "disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    );
  },
);

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(function ComboboxTrigger({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      data-slot="combobox-trigger"
      type="button"
      className={cn(
        "ml-1 inline-flex shrink-0 items-center justify-center text-secondary outline-none",
        "transition-transform duration-200 data-[popup-open]:rotate-180",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? <CaretDownIcon aria-hidden="true" weight="bold" />}
    </ComboboxPrimitive.Trigger>
  );
});

const ComboboxClear = React.forwardRef<HTMLButtonElement, ComboboxClearProps>(
  function ComboboxClear({ className, children, ...props }, ref) {
    return (
      <ComboboxPrimitive.Clear
        ref={ref}
        data-slot="combobox-clear"
        type="button"
        className={cn(
          "ml-1 inline-flex shrink-0 items-center justify-center rounded-sm text-secondary outline-none",
          "transition-[opacity,color] duration-150 hover:text-primary",
          "data-[hidden]:pointer-events-none data-[hidden]:opacity-0",
          className,
        )}
        {...props}
      >
        {children ?? <XIcon aria-hidden="true" weight="bold" />}
      </ComboboxPrimitive.Clear>
    );
  },
);

function ComboboxPortal(props: ComboboxPortalProps) {
  return <ComboboxPrimitive.Portal {...props} />;
}

const ComboboxPositioner = React.forwardRef<
  HTMLDivElement,
  ComboboxPositionerProps
>(function ComboboxPositioner({ className, sideOffset = 6, ...props }, ref) {
  return (
    <ComboboxPrimitive.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={cn("z-50 outline-none", className)}
      {...props}
    />
  );
});

const ComboboxPopup = React.forwardRef<HTMLDivElement, ComboboxPopupProps>(
  function ComboboxPopup({ className, shape, ...props }, ref) {
    const inheritedShape = React.useContext(ComboboxShapeContext);
    const resolvedShape = shape ?? inheritedShape;

    return (
      <ComboboxShapeContext.Provider value={resolvedShape}>
        <ComboboxPrimitive.Popup
          ref={ref}
          data-slot="combobox-popup"
          className={cn(
            comboboxPopupVariants({ shape: resolvedShape }),
            className,
          )}
          {...props}
        />
      </ComboboxShapeContext.Provider>
    );
  },
);

const ComboboxList = React.forwardRef<HTMLDivElement, ComboboxListProps>(
  function ComboboxList({ className, ...props }, ref) {
    return (
      <ComboboxPrimitive.List
        ref={ref}
        data-slot="combobox-list"
        className={cn(
          "max-h-[min(var(--available-height),16rem)] overflow-y-auto p-1 scroll-py-1",
          className,
        )}
        {...props}
      />
    );
  },
);

const ComboboxItemIndicator = React.forwardRef<
  HTMLSpanElement,
  ComboboxItemIndicatorProps
>(function ComboboxItemIndicator({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      data-slot="combobox-item-indicator"
      className={cn(
        "inline-flex size-4 items-center justify-center text-current",
        "transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    >
      {children ?? <CheckIcon aria-hidden="true" weight="bold" />}
    </ComboboxPrimitive.ItemIndicator>
  );
});

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  function ComboboxItem({ children, className, indicator, ...props }, ref) {
    const inheritedShape = React.useContext(ComboboxShapeContext);

    return (
      <ComboboxPrimitive.Item
        ref={ref}
        data-slot="combobox-item"
        className={cn(
          "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-2.5 py-1.5 text-sm outline-none select-none",
          inheritedShape === "round" ? "rounded-full" : "rounded-md",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "data-[highlighted]:bg-primary data-[highlighted]:text-inverse",
          className,
        )}
        {...props}
      >
        <ComboboxItemIndicator className="col-start-1">
          {indicator}
        </ComboboxItemIndicator>
        <span className="col-start-2 min-w-0 truncate">{children}</span>
      </ComboboxPrimitive.Item>
    );
  },
);

function ComboboxGroup(props: ComboboxGroupProps) {
  return <ComboboxPrimitive.Group {...props} />;
}

const ComboboxGroupLabel = React.forwardRef<
  HTMLDivElement,
  ComboboxGroupLabelProps
>(function ComboboxGroupLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.GroupLabel
      ref={ref}
      data-slot="combobox-group-label"
      className={cn(
        "px-2.5 py-1.5 text-xs font-medium text-secondary",
        className,
      )}
      {...props}
    />
  );
});

const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty({ className, ...props }, ref) {
    return (
      <ComboboxPrimitive.Empty
        ref={ref}
        data-slot="combobox-empty"
        className={cn("px-2.5 py-6 text-center text-sm text-secondary", className)}
        {...props}
      />
    );
  },
);

const ComboboxStatus = React.forwardRef<HTMLDivElement, ComboboxStatusProps>(
  function ComboboxStatus({ className, ...props }, ref) {
    return (
      <ComboboxPrimitive.Status
        ref={ref}
        data-slot="combobox-status"
        className={cn("sr-only", className)}
        {...props}
      />
    );
  },
);

const ComboboxIcon = React.forwardRef<HTMLSpanElement, ComboboxIconProps>(
  function ComboboxIcon({ className, children, ...props }, ref) {
    return (
      <ComboboxPrimitive.Icon
        ref={ref}
        data-slot="combobox-icon"
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
        {...props}
      >
        {children ?? <CaretDownIcon aria-hidden="true" weight="bold" />}
      </ComboboxPrimitive.Icon>
    );
  },
);

export {
  ComboboxClear,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  comboboxInputGroupVariants,
  comboboxPopupVariants,
};
export type {
  ComboboxClearProps,
  ComboboxEmptyProps,
  ComboboxGroupLabelProps,
  ComboboxGroupProps,
  ComboboxIconProps,
  ComboboxInputGroupProps,
  ComboboxInputProps,
  ComboboxItemIndicatorProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxPopupProps,
  ComboboxPortalProps,
  ComboboxPositionerProps,
  ComboboxRootProps,
  ComboboxShape,
  ComboboxSize,
  ComboboxSound,
  ComboboxStatusProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
  ComboboxVariant,
};
