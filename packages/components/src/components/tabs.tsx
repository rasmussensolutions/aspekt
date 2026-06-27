"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { playSound, type SoundName } from "./sound";

const tabsRootVariants = cva("grid w-full text-primary", {
  variants: {
    orientation: {
      horizontal: "gap-4",
      vertical: "grid-cols-[auto_minmax(0,1fr)] gap-5",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const tabsListVariants = cva(
  [
    "relative inline-flex w-fit max-w-full shrink-0 items-center gap-1 text-sm",
    "data-[orientation=horizontal]:overflow-x-auto data-[orientation=horizontal]:overflow-y-hidden",
    "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  ],
  {
    variants: {
      variant: {
        line: "data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r border-border",
        soft: "rounded-lg bg-surface-sunken p-1 data-[orientation=vertical]:w-full",
        outline:
          "rounded-lg border border-border bg-surface p-1 data-[orientation=vertical]:w-full",
      },
      shape: {
        square: "",
        round: "",
      },
    },
    compoundVariants: [
      {
        variant: ["soft", "outline"],
        shape: "round",
        className: "rounded-2xl",
      },
    ],
    defaultVariants: {
      variant: "line",
      shape: "square",
    },
  },
);

const tabsTabVariants = cva(
  [
    "relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2",
    "font-medium whitespace-nowrap outline-none select-none",
    "transition-[background-color,border-color,color,box-shadow,opacity] duration-150",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[orientation=vertical]:justify-start",
    "focus-visible:ring-2 focus-visible:ring-current/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        line: "text-secondary hover:text-primary data-[active]:text-[var(--tabs-active-color)]",
        soft: "text-secondary hover:text-primary data-[active]:text-[var(--tabs-active-color)]",
        outline:
          "text-secondary hover:text-primary data-[active]:text-[var(--tabs-active-color)]",
      },
      color: {
        accent: "[--tabs-active-color:var(--action)]",
        blue: "[--tabs-active-color:var(--info)]",
        red: "[--tabs-active-color:var(--destructive)]",
        amber: "[--tabs-active-color:var(--warning)]",
        neutral: "[--tabs-active-color:var(--text-primary)]",
      },
      size: {
        micro: "h-6.5 px-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        tiny: "h-7 px-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        small: "h-8 px-2.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        medium: "h-9 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        large: "h-10 px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        square: "rounded-md",
        round: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "line",
        className:
          "rounded-none focus-visible:ring-offset-2 data-[orientation=horizontal]:-mb-px data-[orientation=vertical]:-mr-px",
      },
      {
        variant: "line",
        shape: "round",
        className: "rounded-none",
      },
    ],
    defaultVariants: {
      variant: "line",
      color: "blue",
      size: "medium",
      shape: "square",
    },
  },
);

const tabsIndicatorVariants = cva(
  [
    "pointer-events-none absolute z-0 transition-[left,right,top,bottom,width,height,transform,opacity] duration-200 ease-out",
    "data-[orientation=horizontal]:left-[var(--active-tab-left)] data-[orientation=horizontal]:w-[var(--active-tab-width)]",
    "data-[orientation=vertical]:top-[var(--active-tab-top)] data-[orientation=vertical]:h-[var(--active-tab-height)]",
  ],
  {
    variants: {
      variant: {
        line: "bg-[var(--tabs-indicator-color)] data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:right-0 data-[orientation=vertical]:w-0.5",
        soft: "rounded-[inherit] bg-surface-raised dark:bg-surface-floating shadow-sm data-[orientation=horizontal]:top-[var(--active-tab-top)] data-[orientation=horizontal]:h-[var(--active-tab-height)] data-[orientation=vertical]:left-[var(--active-tab-left)] data-[orientation=vertical]:w-[var(--active-tab-width)]",
        outline:
          "rounded-[inherit] bg-surface-sunken dark:bg-surface-floating data-[orientation=horizontal]:top-[var(--active-tab-top)] data-[orientation=horizontal]:h-[var(--active-tab-height)] data-[orientation=vertical]:left-[var(--active-tab-left)] data-[orientation=vertical]:w-[var(--active-tab-width)]",
      },
      color: {
        accent: "[--tabs-indicator-color:var(--action)]",
        blue: "[--tabs-indicator-color:var(--info)]",
        red: "[--tabs-indicator-color:var(--destructive)]",
        amber: "[--tabs-indicator-color:var(--warning)]",
        neutral: "[--tabs-indicator-color:var(--text-primary)]",
      },
      shape: {
        square: "rounded-md",
        round: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "line",
      color: "blue",
      shape: "square",
    },
  },
);

const tabsPanelVariants = cva(
  [
    "min-w-0 outline-none transition-[opacity,transform] duration-150 ease-out",
    "data-[hidden]:hidden data-[starting-style]:opacity-0",
    "data-[orientation=horizontal]:data-[starting-style]:translate-y-1",
    "data-[orientation=vertical]:data-[starting-style]:translate-x-1",
    "focus-visible:ring-2 focus-visible:ring-current/20",
  ],
  {
    variants: {
      padded: {
        true: "pt-1",
        false: "",
      },
    },
    defaultVariants: {
      padded: true,
    },
  },
);

type TabsValue = React.ComponentProps<typeof TabsPrimitive.Tab>["value"];
type TabsVariant = "line" | "soft" | "outline";
type TabsColor = "accent" | "blue" | "red" | "amber" | "neutral";
type TabsSize = "micro" | "tiny" | "small" | "medium" | "large";
type TabsShape = "square" | "round";
type TabsOrientation = NonNullable<
  React.ComponentProps<typeof TabsPrimitive.Root>["orientation"]
>;

type TabsSound =
  | SoundName
  | false
  | {
      change?: SoundName | false;
    };

type TabsRootProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  "className" | "onValueChange"
> & {
  className?: string;
  color?: TabsColor;
  onValueChange?: React.ComponentProps<
    typeof TabsPrimitive.Root
  >["onValueChange"];
  shape?: TabsShape;
  size?: TabsSize;
  sound?: TabsSound;
  variant?: TabsVariant;
};

type TabsListProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.List>,
  "className"
> & {
  className?: string;
  shape?: TabsShape | null;
  variant?: TabsVariant | null;
};

type TabsTabProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Tab>,
  "className" | "prefix" | "suffix"
> & {
  className?: string;
  color?: TabsColor | null;
  prefix?: React.ReactNode;
  shape?: TabsShape | null;
  size?: TabsSize | null;
  suffix?: React.ReactNode;
  variant?: TabsVariant | null;
};

type TabsIndicatorProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Indicator>,
  "className"
> & {
  className?: string;
  color?: TabsColor | null;
  shape?: TabsShape | null;
  variant?: TabsVariant | null;
};

type TabsPanelProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Panel>,
  "className"
> & {
  className?: string;
  padded?: boolean;
};

type TabsContextValue = {
  color: TabsColor;
  shape: TabsShape;
  size: TabsSize;
  variant: TabsVariant;
};

const TabsContext = React.createContext<TabsContextValue>({
  color: "blue",
  shape: "square",
  size: "medium",
  variant: "line",
});

function getTabsSound(sound: TabsSound | undefined) {
  if (sound === false) return false;
  if (sound === undefined) return "change";
  if (typeof sound === "string") return sound;
  return sound.change;
}

function TabsRoot({
  className,
  color = "blue",
  onValueChange,
  orientation = "horizontal",
  shape = "square",
  size = "medium",
  sound,
  variant = "line",
  ...props
}: TabsRootProps) {
  const context = React.useMemo(
    () => ({ color, shape, size, variant }),
    [color, shape, size, variant],
  );

  const handleValueChange = React.useCallback<
    NonNullable<
      React.ComponentProps<typeof TabsPrimitive.Root>["onValueChange"]
    >
  >(
    (value, eventDetails) => {
      const nextSound = getTabsSound(sound);

      if (nextSound && eventDetails.reason === "none") {
        playSound(nextSound);
      }

      onValueChange?.(value, eventDetails);
    },
    [onValueChange, sound],
  );

  return (
    <TabsContext.Provider value={context}>
      <TabsPrimitive.Root
        data-slot="tabs-root"
        className={cn(tabsRootVariants({ orientation }), className)}
        orientation={orientation}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsContext.Provider>
  );
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ className, shape, variant, ...props }, ref) {
    const context = React.useContext(TabsContext);
    const currentShape = shape ?? context.shape;
    const currentVariant = variant ?? context.variant;

    return (
      <TabsPrimitive.List
        ref={ref}
        data-slot="tabs-list"
        className={cn(
          tabsListVariants({
            shape: currentShape,
            variant: currentVariant,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

const TabsTab = React.forwardRef<HTMLElement, TabsTabProps>(function TabsTab(
  {
    children,
    className,
    color,
    prefix,
    shape,
    size,
    suffix,
    variant,
    ...props
  },
  ref,
) {
  const context = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Tab
      ref={ref}
      data-slot="tabs-tab"
      className={cn(
        tabsTabVariants({
          color: color ?? context.color,
          shape: shape ?? context.shape,
          size: size ?? context.size,
          variant: variant ?? context.variant,
        }),
        className,
      )}
      {...props}
    >
      {prefix}
      <span className="min-w-0 truncate">{children}</span>
      {suffix}
    </TabsPrimitive.Tab>
  );
});

const TabsIndicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  function TabsIndicator({ className, color, shape, variant, ...props }, ref) {
    const context = React.useContext(TabsContext);

    return (
      <TabsPrimitive.Indicator
        ref={ref}
        data-slot="tabs-indicator"
        className={cn(
          tabsIndicatorVariants({
            color: color ?? context.color,
            shape: shape ?? context.shape,
            variant: variant ?? context.variant,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  function TabsPanel({ className, padded, ...props }, ref) {
    return (
      <TabsPrimitive.Panel
        ref={ref}
        data-slot="tabs-panel"
        className={cn(tabsPanelVariants({ padded }), className)}
        {...props}
      />
    );
  },
);

export {
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTab,
  type TabsColor,
  type TabsIndicatorProps,
  type TabsListProps,
  type TabsOrientation,
  type TabsPanelProps,
  type TabsRootProps,
  type TabsShape,
  type TabsSize,
  type TabsSound,
  type TabsTabProps,
  type TabsValue,
  type TabsVariant,
};
