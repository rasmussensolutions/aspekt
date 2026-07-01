"use client";

import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import {
  Button,
  ButtonShapeProvider,
  type ButtonProps,
  type ButtonShape,
} from "./button";
import { aspektConfig } from "./config";
import {
  SurfaceProvider,
  getSurfaceClassName,
  getSurfaceStyle,
  resolveSurfaceShadow,
  type SurfaceLevelValue,
  type SurfaceShadow,
  useResolvedSurfaceLevel,
} from "./surface";

const dockRootVariants = cva(
  "pointer-events-none flex flex-col items-center gap-2",
  {
    variants: {
      position: {
        fixed:
          "fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 px-3",
        static: "relative w-full px-0",
      },
    },
    defaultVariants: {
      position: "fixed",
    },
  },
);

const dockBarVariants = cva(
  [
    "pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center gap-1 border border-border text-primary",
  ],
  {
    variants: {
      size: {
        small: "min-h-10 p-1",
        medium: "min-h-12 p-1.5",
        large: "min-h-14 p-2",
      },
      shape: {
        square: "rounded-[var(--overlay-radius-square)]",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      size: "medium",
      shape: "round",
    },
  },
);

const dockPanelVariants = cva(
  [
    "pointer-events-auto w-md max-w-[min(42rem,calc(100vw-1.5rem))] overflow-hidden border border-border text-primary",
    "max-h-[min(70dvh,34rem)]",
  ],
  {
    variants: {
      shape: {
        square: "rounded-[var(--overlay-radius-square)]",
        round: "rounded-[var(--overlay-radius-round)]",
      },
    },
    defaultVariants: {
      shape: "round",
    },
  },
);

type DockValue = string | null;

type DockShape = ButtonShape;

type DockPosition = "fixed" | "static";

type DockBarSize = "small" | "medium" | "large";

type DockItemAlign = "start" | "end";

type DockContextValue = {
  setValue: (value: DockValue) => void;
  shape: DockShape;
  value: DockValue;
};

type DockRootProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> & {
  defaultValue?: DockValue;
  onValueChange?: (value: DockValue) => void;
  position?: DockPosition | null;
  shape?: DockShape | null;
  value?: DockValue;
};

type DockBarProps = React.HTMLAttributes<HTMLElement> & {
  shape?: DockShape | null;
  size?: DockBarSize | null;
  surface?: SurfaceLevelValue | null;
  surfaceLift?: number | null;
  surfaceShadow?: SurfaceShadow | null;
};

type DockPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  forceMount?: boolean;
  shape?: DockShape | null;
  surface?: SurfaceLevelValue | null;
  surfaceLift?: number | null;
  surfaceShadow?: SurfaceShadow | null;
  value: string;
};

type DockPanelHeaderProps = React.HTMLAttributes<HTMLDivElement>;

type DockPanelTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

type DockPanelDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

type DockPanelContentProps = React.HTMLAttributes<HTMLDivElement>;

type DockPanelFooterProps = React.HTMLAttributes<HTMLDivElement>;

type DockButtonBaseProps = {
  active?: boolean;
  align?: DockItemAlign | null;
  separator?: boolean;
};

type DockNativeButtonProps = ButtonProps &
  DockButtonBaseProps & {
    href?: never;
  };

type DockButtonProps = DockNativeButtonProps;

type DockTriggerProps = Omit<
  DockNativeButtonProps,
  "active" | "asChild" | "value"
> & {
  activeChildren?: React.ReactNode;
  value: string;
};

type DockMenuProps = React.HTMLAttributes<HTMLDivElement>;

type DockMenuItemProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "prefix"
> & {
  active?: boolean;
  badge?: React.ReactNode;
  closeOnSelect?: boolean;
  prefix?: React.ReactNode;
  shape?: DockShape | null;
  suffix?: React.ReactNode;
};

type DockSeparatorOrientation = "horizontal" | "vertical";

type DockSeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: DockSeparatorOrientation;
};

const DockContext = React.createContext<DockContextValue | null>(null);

function useDockContext(component: string) {
  const context = React.useContext(DockContext);

  if (!context) {
    throw new Error(`${component} must be used within DockRoot.`);
  }

  return context;
}

function useOptionalDockContext() {
  return React.useContext(DockContext);
}

function DockRoot({
  children,
  className,
  defaultValue = null,
  onValueChange,
  position,
  shape,
  value: valueProp,
  ...props
}: DockRootProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<DockValue>(defaultValue);
  const value = valueProp === undefined ? uncontrolledValue : valueProp;
  const resolvedPosition = position ?? "fixed";
  const resolvedShape = shape ?? aspektConfig.shape;

  const setValue = React.useCallback(
    (nextValue: DockValue) => {
      if (valueProp === undefined) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [onValueChange, valueProp],
  );

  React.useEffect(() => {
    if (!value) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setValue(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [setValue, value]);

  const context = React.useMemo<DockContextValue>(
    () => ({
      setValue,
      shape: resolvedShape,
      value,
    }),
    [resolvedShape, setValue, value],
  );

  return (
    <DockContext.Provider value={context}>
      <ButtonShapeProvider shape={resolvedShape}>
        <div
          data-slot="dock-root"
          data-state={value ? "open" : "closed"}
          className={cn(
            dockRootVariants({ position: resolvedPosition }),
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </ButtonShapeProvider>
    </DockContext.Provider>
  );
}

const DockBar = React.forwardRef<HTMLElement, DockBarProps>(function DockBar(
  {
    children,
    className,
    shape,
    size,
    style,
    surface,
    surfaceLift,
    surfaceShadow,
    ...props
  },
  ref,
) {
  const context = useOptionalDockContext();
  const resolvedSurface = useResolvedSurfaceLevel({
    level: surface,
    lift: surfaceLift ?? 3,
  });
  const resolvedShadow = resolveSurfaceShadow(surfaceShadow, resolvedSurface);

  return (
    <SurfaceProvider value={resolvedSurface}>
      <nav
        ref={ref}
        data-slot="dock-bar"
        data-surface-level={resolvedSurface}
        className={cn(
          getSurfaceClassName(resolvedSurface, resolvedShadow),
          dockBarVariants({ shape: shape ?? context?.shape, size }),
          className,
        )}
        style={getSurfaceStyle(resolvedSurface, style)}
        {...props}
      >
        {children}
      </nav>
    </SurfaceProvider>
  );
});

const DockPanel = React.forwardRef<HTMLDivElement, DockPanelProps>(
  function DockPanel(
    {
      className,
      forceMount,
      shape,
      style,
      surface,
      surfaceLift,
      surfaceShadow,
      value,
      ...props
    },
    ref,
  ) {
    const context = useDockContext("DockPanel");
    const open = context.value === value;
    const resolvedSurface = useResolvedSurfaceLevel({
      level: surface,
      lift: surfaceLift ?? 4,
    });
    const resolvedShadow = resolveSurfaceShadow(surfaceShadow, resolvedSurface);

    if (!open && !forceMount) {
      return null;
    }

    return (
      <SurfaceProvider value={resolvedSurface}>
        <div
          ref={ref}
          data-slot="dock-panel"
          data-surface-level={resolvedSurface}
          data-state={open ? "open" : "closed"}
          hidden={!open}
          className={cn(
            getSurfaceClassName(resolvedSurface, resolvedShadow),
            dockPanelVariants({ shape: shape ?? context.shape }),
            className,
          )}
          style={getSurfaceStyle(resolvedSurface, style)}
          {...props}
        />
      </SurfaceProvider>
    );
  },
);

const DockPanelHeader = React.forwardRef<HTMLDivElement, DockPanelHeaderProps>(
  function DockPanelHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dock-panel-header"
        className={cn("grid gap-1.5 border-b border-border p-4", className)}
        {...props}
      />
    );
  },
);

const DockPanelTitle = React.forwardRef<
  HTMLHeadingElement,
  DockPanelTitleProps
>(function DockPanelTitle({ className, ...props }, ref) {
  return (
    <h3
      ref={ref}
      data-slot="dock-panel-title"
      className={cn(
        "text-base font-medium leading-none text-primary",
        className,
      )}
      {...props}
    />
  );
});

const DockPanelDescription = React.forwardRef<
  HTMLParagraphElement,
  DockPanelDescriptionProps
>(function DockPanelDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="dock-panel-description"
      className={cn("text-sm leading-6 text-secondary", className)}
      {...props}
    />
  );
});

const DockPanelContent = React.forwardRef<
  HTMLDivElement,
  DockPanelContentProps
>(function DockPanelContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="dock-panel-content"
      className={cn("overflow-y-auto p-2", className)}
      {...props}
    />
  );
});

const DockPanelFooter = React.forwardRef<HTMLDivElement, DockPanelFooterProps>(
  function DockPanelFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dock-panel-footer"
        className={cn(
          "flex items-center justify-end gap-2 border-t border-border p-3",
          className,
        )}
        {...props}
      />
    );
  },
);

function DockBarDivider({ align }: { align?: DockItemAlign | null }) {
  return (
    <span
      aria-hidden="true"
      data-slot="dock-bar-divider"
      className={cn(
        "h-7 w-px shrink-0 bg-border",
        align === "end" && "ml-auto",
      )}
    />
  );
}

const DockButton = React.forwardRef<HTMLElement, DockButtonProps>(
  function DockButton(
    {
      active,
      align,
      className,
      color = "neutral",
      separator,
      shape,
      size = "medium",
      variant,
      ...props
    },
    ref,
  ) {
    const context = useOptionalDockContext();

    return (
      <>
        {separator && <DockBarDivider align={align} />}
        <Button
          ref={ref}
          data-slot="dock-button"
          data-active={active ? "" : undefined}
          color={color}
          shape={shape ?? context?.shape}
          size={size}
          variant={variant ?? (active ? "soft" : "ghost")}
          className={cn(
            "min-w-9 px-2",
            align === "end" && !separator && "ml-auto",
            className,
          )}
          {...props}
        />
      </>
    );
  },
);

const DockTrigger = React.forwardRef<HTMLButtonElement, DockTriggerProps>(
  function DockTrigger(
    { activeChildren, children, onClick, prefix, value, ...props },
    ref,
  ) {
    const context = useDockContext("DockTrigger");
    const open = context.value === value;
    const hasPrefix = Boolean(prefix);
    const showActiveChildren = open && activeChildren !== undefined;
    const resolvedPrefix =
      showActiveChildren && hasPrefix ? activeChildren : prefix;
    const resolvedChildren =
      showActiveChildren && !hasPrefix ? activeChildren : children;

    return (
      <DockButton
        ref={ref as React.ForwardedRef<HTMLElement>}
        aria-expanded={open}
        data-slot="dock-trigger"
        data-state={open ? "open" : "closed"}
        active={open}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            context.setValue(open ? null : value);
          }
        }}
        prefix={resolvedPrefix}
        {...props}
      >
        {resolvedChildren}
      </DockButton>
    );
  },
);

const DockMenu = React.forwardRef<HTMLDivElement, DockMenuProps>(
  function DockMenu({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dock-menu"
        className={cn("grid gap-1", className)}
        {...props}
      />
    );
  },
);

const DockMenuItem = React.forwardRef<HTMLButtonElement, DockMenuItemProps>(
  function DockMenuItem(
    {
      active,
      badge,
      children,
      className,
      closeOnSelect = false,
      onClick,
      prefix,
      shape,
      suffix,
      type = "button",
      ...props
    },
    ref,
  ) {
    const context = useOptionalDockContext();
    const resolvedShape = shape ?? context?.shape ?? aspektConfig.shape;

    return (
      <button
        ref={ref}
        data-slot="dock-menu-item"
        data-active={active ? "" : undefined}
        type={type}
        className={cn(
          "flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm font-medium text-secondary outline-none",
          "transition-[background-color,color,opacity] hover:bg-surface-hover hover:text-primary",
          "focus-visible:ring-2 focus-visible:ring-current/20",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[active]:bg-surface-muted data-[active]:text-primary",
          resolvedShape === "round" ? "rounded-full" : "rounded-lg",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);

          if (closeOnSelect && !event.defaultPrevented) {
            context?.setValue(null);
          }
        }}
        {...props}
      >
        {prefix && (
          <span
            data-slot="dock-menu-item-prefix"
            className="inline-flex size-5 shrink-0 items-center justify-center text-secondary [&_svg]:size-5"
          >
            {prefix}
          </span>
        )}
        <span
          data-slot="dock-menu-item-label"
          className="min-w-0 flex-1 truncate"
        >
          {children}
        </span>
        {badge && (
          <span
            data-slot="dock-menu-item-badge"
            className="inline-flex shrink-0 items-center rounded-full bg-action/10 px-2 py-0.5 text-xs font-medium text-action"
          >
            {badge}
          </span>
        )}
        {suffix && (
          <span
            data-slot="dock-menu-item-suffix"
            className="inline-flex shrink-0 items-center justify-center text-secondary [&_svg]:size-4"
          >
            {suffix}
          </span>
        )}
      </button>
    );
  },
);

const DockSeparator = React.forwardRef<HTMLDivElement, DockSeparatorProps>(
  function DockSeparator(
    { className, orientation = "horizontal", ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="dock-separator"
        role="separator"
        aria-orientation={orientation}
        className={cn(
          orientation === "horizontal"
            ? "h-px w-full bg-border"
            : "h-7 w-px shrink-0 bg-border",
          className,
        )}
        {...props}
      />
    );
  },
);

export {
  DockBar,
  DockButton,
  DockMenu,
  DockMenuItem,
  DockPanel,
  DockPanelContent,
  DockPanelDescription,
  DockPanelFooter,
  DockPanelHeader,
  DockPanelTitle,
  DockRoot,
  DockSeparator,
  DockTrigger,
  dockBarVariants,
  dockPanelVariants,
  dockRootVariants,
};
export type {
  DockBarProps,
  DockBarSize,
  DockButtonProps,
  DockItemAlign,
  DockMenuItemProps,
  DockMenuProps,
  DockPanelContentProps,
  DockPanelDescriptionProps,
  DockPanelFooterProps,
  DockPanelHeaderProps,
  DockPanelProps,
  DockPanelTitleProps,
  DockPosition,
  DockRootProps,
  DockSeparatorProps,
  DockSeparatorOrientation,
  DockShape,
  DockTriggerProps,
  DockValue,
};
