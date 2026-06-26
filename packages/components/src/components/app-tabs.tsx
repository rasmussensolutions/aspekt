"use client";

import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

const appTabsListVariants = cva(
  "flex shrink-0 items-center overflow-x-auto bg-transparent py-1",
  {
    variants: {
      variant: {
        soft: "gap-1",
        outline: "gap-1",
        line: "gap-0",
      },
      size: {
        small: "h-9",
        medium: "h-10",
        large: "h-11",
      },
      shape: {
        square: "",
        round: "",
      },
    },
    defaultVariants: {
      variant: "soft",
      size: "medium",
      shape: "round",
    },
  },
);

const appTabsTabVariants = cva(
  [
    "group/app-tabs-tab flex max-w-60 shrink-0 items-center border border-transparent",
    "font-medium text-muted-foreground outline-none select-none",
    "transition-[background-color,border-color,color,box-shadow,opacity] duration-150",
    "hover:text-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        soft: "bg-transparent",
        line: [
          "rounded-none border-x-0 border-t-0 border-b-2 border-b-transparent bg-transparent",
        ],
        outline: "border-border/60 bg-transparent",
      },
      color: {
        accent: "",
        blue: "",
        red: "",
        amber: "",
        neutral: "",
      },
      size: {
        small: "h-7 min-w-24 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        medium:
          "h-8 min-w-28 text-sm [&_svg:not([class*='size-'])]:size-4",
        large: "h-9 min-w-32 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        square: "",
        round: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: ["soft", "outline"],
        shape: "square",
        size: "small",
        className: "rounded-md",
      },
      {
        variant: ["soft", "outline"],
        shape: "square",
        size: "medium",
        className: "rounded-md",
      },
      {
        variant: ["soft", "outline"],
        shape: "square",
        size: "large",
        className: "rounded-lg",
      },
      {
        variant: "line",
        shape: ["square", "round"],
        className: "rounded-none",
      },
      {
        variant: "soft",
        color: "accent",
        className:
          "bg-primary/5 data-[active]:bg-primary/10 data-[active]:text-primary hover:bg-primary/10",
      },
      {
        variant: "soft",
        color: "blue",
        className:
          "bg-info/5 data-[active]:bg-info/10 data-[active]:text-info hover:bg-info/10",
      },
      {
        variant: "soft",
        color: "red",
        className:
          "bg-destructive/5 data-[active]:bg-destructive/10 data-[active]:text-destructive hover:bg-destructive/10",
      },
      {
        variant: "soft",
        color: "amber",
        className:
          "bg-warning/10 data-[active]:bg-warning/15 data-[active]:text-warning hover:bg-warning/15",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "bg-muted/50 data-[active]:bg-muted data-[active]:text-foreground hover:bg-muted",
      },
      {
        variant: "outline",
        color: "accent",
        className:
          "bg-primary/[0.03] data-[active]:border-primary/25 data-[active]:bg-primary/5 data-[active]:text-primary hover:bg-primary/5",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "bg-info/[0.03] data-[active]:border-info/30 data-[active]:bg-info/5 data-[active]:text-info hover:bg-info/5",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "bg-destructive/[0.03] data-[active]:border-destructive/30 data-[active]:bg-destructive/5 data-[active]:text-destructive hover:bg-destructive/5",
      },
      {
        variant: "outline",
        color: "amber",
        className:
          "bg-warning/[0.06] data-[active]:border-warning/35 data-[active]:bg-warning/10 data-[active]:text-warning hover:bg-warning/10",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "bg-muted/35 data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground hover:bg-muted/70",
      },
      {
        variant: "line",
        color: "accent",
        className: "data-[active]:border-b-primary data-[active]:text-primary",
      },
      {
        variant: "line",
        color: "blue",
        className: "data-[active]:border-b-info data-[active]:text-info",
      },
      {
        variant: "line",
        color: "red",
        className:
          "data-[active]:border-b-destructive data-[active]:text-destructive",
      },
      {
        variant: "line",
        color: "amber",
        className: "data-[active]:border-b-warning data-[active]:text-warning",
      },
      {
        variant: "line",
        color: "neutral",
        className:
          "data-[active]:border-b-foreground data-[active]:text-foreground",
      },
    ],
    defaultVariants: {
      variant: "soft",
      color: "neutral",
      size: "medium",
      shape: "round",
    },
  },
);

const appTabsTabTriggerVariants = cva(
  [
    "flex h-full min-w-0 flex-1 items-center gap-2 rounded-[inherit] text-left",
    "outline-none focus-visible:ring-2 focus-visible:ring-current/20",
  ],
  {
    variants: {
      size: {
        small: "px-2",
        medium: "px-2",
        large: "px-2.5",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

const appTabsTabPrefixVariants = cva("grid shrink-0 place-items-center", {
  variants: {
    size: {
      small: "size-3.5",
      medium: "size-4",
      large: "size-4",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type AppTabsVariant = "soft" | "line" | "outline";
type AppTabsColor = "accent" | "blue" | "red" | "amber" | "neutral";
type AppTabsSize = "small" | "medium" | "large";
type AppTabsShape = "square" | "round";

type AppTabsTabData = {
  closeable?: boolean;
  disabled?: boolean;
  label: React.ReactNode;
  prefix?: React.ReactNode;
  value: string;
};

type AppTabsContextValue = {
  activeValue: string;
  closeTab: (value: string) => void;
  color: AppTabsColor;
  isTabOpen: (value: string) => boolean;
  openTab: (tab: AppTabsTabData) => void;
  setActiveValue: (value: string) => void;
  shape: AppTabsShape;
  size: AppTabsSize;
  tabs: readonly AppTabsTabData[];
  variant: AppTabsVariant;
};

type AppTabsRootProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> & {
  color?: AppTabsColor | null;
  defaultTabs?: readonly AppTabsTabData[];
  defaultValue?: string;
  onTabsChange?: (tabs: AppTabsTabData[]) => void;
  onValueChange?: (value: string) => void;
  shape?: AppTabsShape | null;
  size?: AppTabsSize | null;
  tabs?: readonly AppTabsTabData[];
  value?: string;
  variant?: AppTabsVariant | null;
};

type AppTabsListProps = React.HTMLAttributes<HTMLDivElement> & {
  shape?: AppTabsShape | null;
  size?: AppTabsSize | null;
  variant?: AppTabsVariant | null;
};

type AppTabsTabProps = Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> & {
  color?: AppTabsColor | null;
  closeable?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  shape?: AppTabsShape | null;
  size?: AppTabsSize | null;
  value: string;
  variant?: AppTabsVariant | null;
};

type AppTabsTabCloseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children?: React.ReactNode;
  value?: string;
};

type AppTabsPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  forceMount?: boolean;
  value: string;
};

const AppTabsContext = React.createContext<AppTabsContextValue | null>(null);
const AppTabsTabContext = React.createContext<{ value: string } | null>(null);

function useAppTabs(component = "useAppTabs") {
  const context = React.useContext(AppTabsContext);

  if (!context) {
    throw new Error(`${component} must be used inside AppTabsRoot.`);
  }

  return context;
}

function getFirstEnabledTab(tabs: readonly AppTabsTabData[]) {
  return tabs.find((tab) => !tab.disabled)?.value ?? "";
}

function AppTabsRoot({
  children,
  className,
  color = "neutral",
  defaultTabs = [],
  defaultValue,
  onTabsChange,
  onValueChange,
  shape = "round",
  size = "medium",
  tabs: controlledTabs,
  value,
  variant = "soft",
  ...props
}: AppTabsRootProps) {
  const [uncontrolledTabs, setUncontrolledTabs] = React.useState<
    AppTabsTabData[]
  >(() => [...defaultTabs]);
  const tabs = controlledTabs ?? uncontrolledTabs;
  const isTabsControlled = controlledTabs !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    () => defaultValue ?? getFirstEnabledTab(tabs),
  );
  const isValueControlled = value !== undefined;
  const activeValue = value ?? uncontrolledValue;

  const commitTabs = React.useCallback(
    (nextTabs: AppTabsTabData[]) => {
      if (!isTabsControlled) {
        setUncontrolledTabs(nextTabs);
      }

      onTabsChange?.(nextTabs);
    },
    [isTabsControlled, onTabsChange],
  );

  const commitValue = React.useCallback(
    (nextValue: string, availableTabs = tabs) => {
      const canActivate =
        nextValue === "" ||
        availableTabs.some((tab) => tab.value === nextValue && !tab.disabled);

      if (!canActivate) return;

      if (!isValueControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isValueControlled, onValueChange, tabs],
  );

  const openTab = React.useCallback(
    (tab: AppTabsTabData) => {
      const existingTab = tabs.find((item) => item.value === tab.value);
      const nextTabs = existingTab
        ? tabs.map((item) =>
            item.value === tab.value ? { ...item, ...tab } : item,
          )
        : [...tabs, tab];

      commitTabs(nextTabs);

      if (!tab.disabled) {
        commitValue(tab.value, nextTabs);
      }
    },
    [commitTabs, commitValue, tabs],
  );

  const closeTab = React.useCallback(
    (tabValue: string) => {
      const closedIndex = tabs.findIndex((tab) => tab.value === tabValue);
      const closedTab = tabs[closedIndex];

      if (!closedTab || closedTab.closeable === false) return;

      const nextTabs = tabs.filter((tab) => tab.value !== tabValue);
      commitTabs(nextTabs);

      if (activeValue === tabValue) {
        const nextActiveTab =
          nextTabs[closedIndex] ??
          nextTabs[closedIndex - 1] ??
          nextTabs.find((tab) => !tab.disabled);

        commitValue(nextActiveTab?.value ?? "", nextTabs);
      }
    },
    [activeValue, commitTabs, commitValue, tabs],
  );

  const isTabOpen = React.useCallback(
    (tabValue: string) => tabs.some((tab) => tab.value === tabValue),
    [tabs],
  );

  React.useEffect(() => {
    if (activeValue && !isTabOpen(activeValue)) {
      commitValue(getFirstEnabledTab(tabs), tabs);
    }
  }, [activeValue, commitValue, isTabOpen, tabs]);

  const context = React.useMemo(
    () => ({
      activeValue,
      closeTab,
      color: color ?? "neutral",
      isTabOpen,
      openTab,
      setActiveValue: commitValue,
      shape: shape ?? "round",
      size: size ?? "medium",
      tabs,
      variant: variant ?? "soft",
    }),
    [
      activeValue,
      closeTab,
      color,
      commitValue,
      isTabOpen,
      openTab,
      shape,
      size,
      tabs,
      variant,
    ],
  );

  return (
    <AppTabsContext.Provider value={context}>
      <div
        data-slot="app-tabs-root"
        className={cn(
          "flex min-h-dvh min-w-0 flex-1 flex-col bg-background text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AppTabsContext.Provider>
  );
}

const AppTabsList = React.forwardRef<HTMLDivElement, AppTabsListProps>(
  function AppTabsList(
    { children, className, shape, size, variant, ...props },
    ref,
  ) {
    const context = useAppTabs("AppTabsList");
    const resolvedShape = shape ?? context.shape;
    const resolvedSize = size ?? context.size;
    const resolvedVariant = variant ?? context.variant;

    return (
      <div
        ref={ref}
        data-slot="app-tabs-list"
        data-shape={resolvedShape}
        data-size={resolvedSize}
        data-variant={resolvedVariant}
        role="tablist"
        className={cn(
          appTabsListVariants({
            shape: resolvedShape,
            size: resolvedSize,
            variant: resolvedVariant,
          }),
          className,
        )}
        {...props}
      >
        {children ??
          context.tabs.map((tab) => (
            <AppTabsTab
              key={tab.value}
              closeable={tab.closeable}
              disabled={tab.disabled}
              prefix={tab.prefix}
              value={tab.value}
            >
              {tab.label}
            </AppTabsTab>
          ))}
      </div>
    );
  },
);

const AppTabsTab = React.forwardRef<HTMLDivElement, AppTabsTabProps>(
  function AppTabsTab(
    {
      children,
      className,
      closeable,
      color,
      disabled,
      prefix,
      shape,
      size,
      value,
      variant,
      ...props
    },
    ref,
  ) {
    const context = useAppTabs("AppTabsTab");
    const tab = context.tabs.find((item) => item.value === value);
    const resolvedDisabled = disabled ?? tab?.disabled ?? false;
    const resolvedCloseable = closeable ?? tab?.closeable ?? true;
    const resolvedColor = color ?? context.color;
    const resolvedPrefix = prefix ?? tab?.prefix;
    const resolvedLabel = children ?? tab?.label ?? value;
    const resolvedShape = shape ?? context.shape;
    const resolvedSize = size ?? context.size;
    const resolvedVariant = variant ?? context.variant;
    const active = context.activeValue === value;

    return (
      <AppTabsTabContext.Provider value={{ value }}>
        <div
          ref={ref}
          data-slot="app-tabs-tab"
          data-active={active ? "" : undefined}
          data-color={resolvedColor}
          data-disabled={resolvedDisabled ? "" : undefined}
          data-shape={resolvedShape}
          data-size={resolvedSize}
          data-variant={resolvedVariant}
          className={cn(
            appTabsTabVariants({
              color: resolvedColor,
              shape: resolvedShape,
              size: resolvedSize,
              variant: resolvedVariant,
            }),
            className,
          )}
          {...props}
        >
          <button
            type="button"
            role="tab"
            aria-selected={active}
            disabled={resolvedDisabled}
            onClick={() => context.setActiveValue(value)}
            className={appTabsTabTriggerVariants({ size: resolvedSize })}
          >
            {resolvedPrefix && (
              <span className={appTabsTabPrefixVariants({ size: resolvedSize })}>
                {resolvedPrefix}
              </span>
            )}
            <span className="min-w-0 flex-1 truncate">{resolvedLabel}</span>
          </button>

          {resolvedCloseable && (
            <AppTabsTabClose aria-label={`Close ${value}`} />
          )}
        </div>
      </AppTabsTabContext.Provider>
    );
  },
);

const AppTabsTabClose = React.forwardRef<
  HTMLButtonElement,
  AppTabsTabCloseProps
>(function AppTabsTabClose(
  { className, onClick, type = "button", value, ...props },
  ref,
) {
  const tabContext = React.useContext(AppTabsTabContext);
  const { closeTab } = useAppTabs("AppTabsTabClose");
  const tabValue = value ?? tabContext?.value;

  if (!tabValue) {
    throw new Error(
      "AppTabsTabClose must receive a value or be used inside AppTabsTab.",
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      data-slot="app-tabs-tab-close"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);

        if (!event.defaultPrevented) {
          closeTab(tabValue);
        }
      }}
      className={cn(
        "mr-1 grid size-5 shrink-0 place-items-center rounded-md text-muted-foreground opacity-0 outline-none transition-[background-color,color,opacity] duration-150",
        "hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-current/20",
        "group-hover/app-tabs-tab:opacity-100 group-data-[active]/app-tabs-tab:opacity-100",
        className,
      )}
      {...props}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="size-3"
      >
        <path
          d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
});

const AppTabsPanel = React.forwardRef<HTMLDivElement, AppTabsPanelProps>(
  function AppTabsPanel(
    { children, className, forceMount = false, value, ...props },
    ref,
  ) {
    const { activeValue, isTabOpen } = useAppTabs("AppTabsPanel");
    const open = isTabOpen(value);
    const active = activeValue === value;

    if (!open && !forceMount) return null;

    return (
      <React.Activity mode={active ? "visible" : "hidden"} name={value}>
        <div
          ref={ref}
          data-slot="app-tabs-panel"
          data-active={active ? "" : undefined}
          hidden={!active}
          role="tabpanel"
          className={cn("min-h-0 min-w-0 flex-1", className)}
          {...props}
        >
          {children}
        </div>
      </React.Activity>
    );
  },
);

export {
  AppTabsList,
  AppTabsPanel,
  AppTabsRoot,
  AppTabsTab,
  AppTabsTabClose,
  appTabsListVariants,
  appTabsTabVariants,
  useAppTabs,
};
export type {
  AppTabsColor,
  AppTabsListProps,
  AppTabsPanelProps,
  AppTabsRootProps,
  AppTabsShape,
  AppTabsSize,
  AppTabsTabCloseProps,
  AppTabsTabData,
  AppTabsTabProps,
  AppTabsVariant,
};
