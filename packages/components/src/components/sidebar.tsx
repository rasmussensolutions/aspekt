"use client";

import { Separator } from "@base-ui/react/separator";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { Button, type ButtonProps } from "./button";

const SIDEBAR_RESIZE_STEP = 16;

const sidebarRootVariants = cva(
  [
    "group/sidebar-root flex min-h-dvh w-full bg-surface text-primary",
    "[--sidebar-width:16rem] [--sidebar-collapsed-width:3rem]",
  ],
  {
    variants: {
      side: {
        left: "",
        right: "flex-row-reverse",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

const sidebarVariants = cva(
  [
    "peer/sidebar group/sidebar relative z-10 flex min-h-dvh shrink-0 flex-col text-primary",
    "transition-[width,background-color,border-color,box-shadow] duration-200 ease-out",
    "group-data-[resizing]/sidebar-root:transition-none",
    "data-[side=left]:border-r data-[side=right]:border-l",
    "data-[state=expanded]:w-[var(--sidebar-width)]",
    "data-[state=collapsed]:w-[var(--sidebar-collapsed-width)]",
    "data-[collapsible=false]:w-[var(--sidebar-width)]",
  ],
  {
    variants: {
      variant: {
        solid: "border-border bg-surface-raised",
        soft: "border-transparent bg-surface-sunken/35",
        floating: [
          "m-2 min-h-[calc(100dvh-1rem)] rounded-md border border-border bg-surface-raised shadow-sm",
          "data-[side=left]:border data-[side=right]:border",
        ],
        inset: [
          "p-2 border-transparent bg-transparent",
          "data-[side=left]:border data-[side=right]:border",
        ],
      },
    },
    defaultVariants: {
      variant: "soft",
    },
  },
);

const sidebarMenuButtonVariants = cva(
  [
    "group/sidebar-menu-button relative flex w-full min-w-0 items-center gap-2 rounded-lg",
    "font-medium text-secondary outline-none select-none",
    "transition-[background-color,color,box-shadow,opacity] duration-150 ease-out",
    "hover:bg-surface-sunken/70 hover:text-primary",
    "focus-visible:ring-2 focus-visible:ring-current/20",
    "data-[active]:bg-surface-sunken data-[active]:text-primary",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:gap-0 group-data-[state=collapsed]/sidebar:px-0",
  ],
  {
    variants: {
      size: {
        small:
          "h-7 px-2 text-sm group-data-[state=collapsed]/sidebar:h-7 group-data-[state=collapsed]/sidebar:w-7 group-data-[state=collapsed]/sidebar:min-w-7 group-data-[state=collapsed]/sidebar:max-w-7 [&_svg:not([class*='size-'])]:size-[1.125rem]",
        medium:
          "h-8 px-2 text-sm group-data-[state=collapsed]/sidebar:h-8 group-data-[state=collapsed]/sidebar:w-8 group-data-[state=collapsed]/sidebar:min-w-8 group-data-[state=collapsed]/sidebar:max-w-8 [&_svg:not([class*='size-'])]:size-[1.125rem]",
        large:
          "h-9 px-2.5 text-sm group-data-[state=collapsed]/sidebar:h-9 group-data-[state=collapsed]/sidebar:w-9 group-data-[state=collapsed]/sidebar:min-w-9 group-data-[state=collapsed]/sidebar:max-w-9 [&_svg:not([class*='size-'])]:size-[1.125rem]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

type SidebarSide = "left" | "right";

type SidebarVariant = "solid" | "soft" | "floating" | "inset";

type SidebarMenuButtonSize = "small" | "medium" | "large";

type SidebarStyle = React.CSSProperties & {
  "--sidebar-collapsed-width"?: string;
  "--sidebar-width"?: string;
};

type SidebarContextValue = {
  collapseThreshold: number;
  collapsible: boolean;
  maxWidth: number;
  minWidth: number;
  open: boolean;
  resizable: boolean;
  resizeBy: (delta: number) => void;
  sidebarRef: React.RefObject<HTMLElement | null>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  side: SidebarSide;
  startResize: (event: React.PointerEvent<HTMLButtonElement>) => void;
  toggle: () => void;
};

type SidebarRootProps = React.HTMLAttributes<HTMLDivElement> & {
  collapseThreshold?: number;
  collapsedWidth?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  maxWidth?: number;
  minWidth?: number;
  onOpenChange?: (open: boolean) => void;
  onWidthChange?: (width: number) => void;
  open?: boolean;
  resizable?: boolean;
  side?: SidebarSide;
  width?: string;
};

type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SidebarVariant | null;
};

type SidebarInsetProps = React.HTMLAttributes<HTMLElement>;

type SidebarInsetContentProps = React.HTMLAttributes<HTMLDivElement>;

type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>;

type SidebarFooterProps = React.HTMLAttributes<HTMLDivElement>;

type SidebarSectionProps = React.HTMLAttributes<HTMLDivElement>;

type SidebarSectionLabelProps = React.HTMLAttributes<HTMLDivElement>;

type SidebarMenuProps = React.HTMLAttributes<HTMLUListElement>;

type SidebarMenuItemProps = React.LiHTMLAttributes<HTMLLIElement>;

type SidebarMenuButtonProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "prefix"
> & {
  active?: boolean;
  as?: "a" | "button";
  disabled?: boolean;
  href?: string;
  prefix?: React.ReactNode;
  size?: SidebarMenuButtonSize | null;
  suffix?: React.ReactNode;
  target?: string;
  type?: "button" | "reset" | "submit";
};

type SidebarSeparatorProps = Omit<
  React.ComponentProps<typeof Separator>,
  "className"
> & {
  className?: string;
};

type SidebarRailProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children?: React.ReactNode;
};

type SidebarTriggerProps = Omit<
  ButtonProps,
  "aria-label" | "onClick" | "prefix"
> & {
  "aria-label"?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  prefix?: React.ReactNode;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function clampSidebarWidth(width: number, minWidth: number, maxWidth: number) {
  return Math.min(Math.max(width, minWidth), maxWidth);
}

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function useSidebar(component = "useSidebar") {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error(`${component} must be used inside SidebarRoot.`);
  }

  return context;
}

function useControllableOpen({
  defaultOpen,
  onOpenChange,
  open,
}: {
  defaultOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = open ?? uncontrolledOpen;

  const setOpen = React.useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(
    (nextOpen) => {
      const value =
        typeof nextOpen === "function" ? nextOpen(currentOpen) : nextOpen;

      if (!isControlled) {
        setUncontrolledOpen(value);
      }

      onOpenChange?.(value);
    },
    [currentOpen, isControlled, onOpenChange],
  );

  return [currentOpen, setOpen] as const;
}

function SidebarRoot({
  children,
  className,
  collapseThreshold = 128,
  collapsedWidth = "3rem",
  collapsible = true,
  defaultOpen = true,
  maxWidth = 384,
  minWidth = 192,
  onOpenChange,
  onWidthChange,
  open,
  resizable = true,
  side = "left",
  style,
  width = "16rem",
  ...props
}: SidebarRootProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const sidebarRef = React.useRef<HTMLElement | null>(null);
  const cleanupResizeRef = React.useRef<(() => void) | null>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizedWidth, setResizedWidth] = React.useState<number | null>(null);
  const [controlledOpen, setControlledOpen] = useControllableOpen({
    defaultOpen,
    onOpenChange,
    open,
  });
  const resolvedOpen = collapsible ? controlledOpen : true;

  const setSidebarWidth = React.useCallback(
    (nextWidth: number) => {
      const clampedWidth = clampSidebarWidth(nextWidth, minWidth, maxWidth);

      setResizedWidth(clampedWidth);
      onWidthChange?.(clampedWidth);
    },
    [maxWidth, minWidth, onWidthChange],
  );

  const setOpen = React.useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(
    (nextOpen) => {
      if (!collapsible) return;
      setControlledOpen(nextOpen);
    },
    [collapsible, setControlledOpen],
  );

  const toggle = React.useCallback(() => {
    setOpen((value) => !value);
  }, [setOpen]);

  const resizeTo = React.useCallback(
    (nextWidth: number) => {
      if (!resizable) return;

      if (collapsible && nextWidth <= collapseThreshold) {
        setOpen(false);
        return;
      }

      setOpen(true);
      setSidebarWidth(nextWidth);
    },
    [collapseThreshold, collapsible, resizable, setOpen, setSidebarWidth],
  );

  const resizeBy = React.useCallback(
    (delta: number) => {
      const currentWidth = resolvedOpen
        ? (sidebarRef.current?.getBoundingClientRect().width ?? minWidth)
        : minWidth;

      resizeTo(currentWidth + delta);
    },
    [minWidth, resizeTo, resolvedOpen],
  );

  const startResize = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!resizable) return;

      const root = rootRef.current;
      if (!root) return;

      const rootRect = root.getBoundingClientRect();
      const previousCursor = document.body.style.cursor;
      const previousUserSelect = document.body.style.userSelect;

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      cleanupResizeRef.current?.();
      setIsResizing(true);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";

      const handlePointerMove = (pointerEvent: PointerEvent) => {
        const nextWidth =
          side === "left"
            ? pointerEvent.clientX - rootRect.left
            : rootRect.right - pointerEvent.clientX;

        resizeTo(nextWidth);
      };

      const cleanup = () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", cleanup);
        window.removeEventListener("pointercancel", cleanup);
        document.body.style.cursor = previousCursor;
        document.body.style.userSelect = previousUserSelect;
        cleanupResizeRef.current = null;
        setIsResizing(false);
      };

      cleanupResizeRef.current = cleanup;
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", cleanup);
      window.addEventListener("pointercancel", cleanup);
    },
    [resizable, resizeTo, side],
  );

  React.useEffect(() => () => cleanupResizeRef.current?.(), []);

  const context = React.useMemo(
    () => ({
      collapseThreshold,
      collapsible,
      maxWidth,
      minWidth,
      open: resolvedOpen,
      resizable,
      resizeBy,
      sidebarRef,
      setOpen,
      side,
      startResize,
      toggle,
    }),
    [
      collapseThreshold,
      collapsible,
      maxWidth,
      minWidth,
      resizable,
      resizeBy,
      resolvedOpen,
      setOpen,
      side,
      startResize,
      toggle,
    ],
  );

  const rootStyle: SidebarStyle = {
    "--sidebar-collapsed-width": collapsedWidth,
    "--sidebar-width": resizedWidth === null ? width : `${resizedWidth}px`,
    ...style,
  };

  return (
    <SidebarContext.Provider value={context}>
      <div
        ref={rootRef}
        data-slot="sidebar-root"
        data-collapsible={collapsible ? "" : undefined}
        data-resizing={isResizing ? "" : undefined}
        data-side={side}
        data-state={resolvedOpen ? "expanded" : "collapsed"}
        className={cn(sidebarRootVariants({ side }), className)}
        style={rootStyle}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { className, variant, ...props },
  ref,
) {
  const { collapsible, open, side, sidebarRef } = useSidebar("Sidebar");
  const dataVariant = variant === null ? undefined : (variant ?? "soft");
  const setSidebarRefs = React.useCallback(
    (node: HTMLElement | null) => {
      sidebarRef.current = node;
      setForwardedRef(ref, node);
    },
    [ref, sidebarRef],
  );

  return (
    <aside
      ref={setSidebarRefs}
      data-slot="sidebar"
      data-collapsible={collapsible ? "" : undefined}
      data-side={side}
      data-state={open ? "expanded" : "collapsed"}
      data-variant={dataVariant}
      className={cn(sidebarVariants({ variant }), className)}
      {...props}
    />
  );
});

const SidebarInset = React.forwardRef<HTMLElement, SidebarInsetProps>(
  function SidebarInset({ className, ...props }, ref) {
    return (
      <main
        ref={ref}
        data-slot="sidebar-inset"
        className={cn(
          "min-w-0 flex-1 bg-transparent transition-[margin,border-radius,background-color] duration-200 ease-out",
          "peer-data-[variant=floating]/sidebar:m-2",
          "group-data-[side=left]/sidebar-root:peer-data-[variant=floating]/sidebar:ml-0 group-data-[side=right]/sidebar-root:peer-data-[variant=floating]/sidebar:mr-0",
          "peer-data-[variant=floating]/sidebar:[&_[data-slot=sidebar-inset-content]]:rounded-md",
          "peer-data-[variant=inset]/sidebar:m-2 peer-data-[variant=inset]/sidebar:rounded-lg",
          "group-data-[side=left]/sidebar-root:peer-data-[variant=inset]/sidebar:ml-0 group-data-[side=right]/sidebar-root:peer-data-[variant=inset]/sidebar:mr-0",
          "peer-data-[variant=solid]/sidebar:[&_[data-slot=sidebar-inset-content]]:rounded-none peer-data-[variant=solid]/sidebar:[&_[data-slot=sidebar-inset-content]]:border-0 peer-data-[variant=solid]/sidebar:[&_[data-slot=sidebar-inset-content]]:bg-surface-raised peer-data-[variant=solid]/sidebar:[&_[data-slot=sidebar-inset-content]]:shadow-none",
          "peer-data-[variant=soft]/sidebar:[&_[data-slot=sidebar-inset-content]]:rounded-none peer-data-[variant=soft]/sidebar:[&_[data-slot=sidebar-inset-content]]:border-0 peer-data-[variant=soft]/sidebar:[&_[data-slot=sidebar-inset-content]]:bg-surface peer-data-[variant=soft]/sidebar:[&_[data-slot=sidebar-inset-content]]:shadow-none",
          className,
        )}
        {...props}
      />
    );
  },
);

const SidebarInsetContent = React.forwardRef<
  HTMLDivElement,
  SidebarInsetContentProps
>(function SidebarInsetContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-inset-content"
      className={cn(
        "min-h-0 flex-1 overflow-hidden rounded-lg border border-border bg-surface-raised shadow-sm",
        className,
      )}
      {...props}
    />
  );
});

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  function SidebarHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-header"
        className={cn(
          "flex min-h-10 shrink-0 items-center gap-2 px-4 py-1.5",
          "group-data-[variant=inset]/sidebar:pr-0",
          "group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0",
          className,
        )}
        {...props}
      />
    );
  },
);

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  function SidebarContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-content"
        className={cn(
          "min-h-0 flex-1 overflow-y-auto p-2 group-data-[state=collapsed]/sidebar:px-0",
          className,
        )}
        {...props}
      />
    );
  },
);

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  function SidebarFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        className={cn(
          "mt-auto shrink-0 px-2 pt-2 pb-0 group-data-[state=collapsed]/sidebar:px-0",
          className,
        )}
        {...props}
      />
    );
  },
);

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  function SidebarSection({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-section"
        className={cn("grid gap-1", className)}
        {...props}
      />
    );
  },
);

const SidebarSectionLabel = React.forwardRef<
  HTMLDivElement,
  SidebarSectionLabelProps
>(function SidebarSectionLabel({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-section-label"
      className={cn(
        "max-h-8 overflow-hidden px-2 pb-1 pt-3 text-xs font-medium text-secondary",
        "transition-[max-height,opacity,padding,transform] duration-150 ease-out",
        "group-data-[state=collapsed]/sidebar:max-h-0 group-data-[state=collapsed]/sidebar:translate-x-1 group-data-[state=collapsed]/sidebar:px-0 group-data-[state=collapsed]/sidebar:pb-0 group-data-[state=collapsed]/sidebar:opacity-0",
        className,
      )}
      {...props}
    />
  );
});

const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  function SidebarMenu({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        data-slot="sidebar-menu"
        className={cn("grid list-none gap-0.5 p-0", className)}
        {...props}
      />
    );
  },
);

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  function SidebarMenuItem({ className, ...props }, ref) {
    return (
      <li
        ref={ref}
        data-slot="sidebar-menu-item"
        className={cn(
          "min-w-0 group-data-[state=collapsed]/sidebar:grid group-data-[state=collapsed]/sidebar:place-items-center",
          className,
        )}
        {...props}
      />
    );
  },
);

const SidebarMenuButton = React.forwardRef<HTMLElement, SidebarMenuButtonProps>(
  function SidebarMenuButton(
    {
      active = false,
      as = "button",
      children,
      className,
      disabled = false,
      prefix,
      size,
      suffix,
      type = "button",
      ...props
    },
    ref,
  ) {
    const { open } = useSidebar("SidebarMenuButton");
    const Component = as;
    const label = typeof children === "string" ? children : undefined;
    const ariaLabel = open || props["aria-label"] ? props["aria-label"] : label;
    const buttonProps =
      Component === "button"
        ? {
            disabled,
            type,
          }
        : {
            "aria-disabled": disabled || undefined,
            tabIndex: disabled ? -1 : props.tabIndex,
          };

    return (
      <Component
        ref={ref as never}
        data-slot="sidebar-menu-button"
        data-active={active ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn(sidebarMenuButtonVariants({ size }), className)}
        {...props}
        aria-label={ariaLabel}
        aria-current={active ? "page" : props["aria-current"]}
        {...buttonProps}
      >
        {prefix && (
          <span
            data-slot="sidebar-menu-prefix"
            className="grid shrink-0 place-items-center"
          >
            {prefix}
          </span>
        )}

        {children && (
          <span
            data-slot="sidebar-menu-label"
            className={cn(
              "min-w-0 max-w-full flex-1 truncate text-left",
              "transition-[max-width,opacity] duration-150 ease-out",
              "group-data-[state=collapsed]/sidebar:hidden group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0",
            )}
          >
            {children}
          </span>
        )}

        {suffix && (
          <span
            data-slot="sidebar-menu-suffix"
            className={cn(
              "ml-auto inline-flex shrink-0 items-center justify-center text-xs text-secondary",
              "group-data-[state=collapsed]/sidebar:hidden",
            )}
          >
            {suffix}
          </span>
        )}
      </Component>
    );
  },
);

const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  SidebarSeparatorProps
>(function SidebarSeparator(
  { className, orientation = "horizontal", ...props },
  ref,
) {
  return (
    <Separator
      ref={ref}
      data-slot="sidebar-separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        "data-[orientation=horizontal]:my-2 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:mx-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
});

const SidebarRail = React.forwardRef<HTMLButtonElement, SidebarRailProps>(
  function SidebarRail(
    { className, onClick, onKeyDown, onPointerDown, type = "button", ...props },
    ref,
  ) {
    const {
      collapsible,
      maxWidth,
      open,
      resizable,
      resizeBy,
      setOpen,
      side,
      startResize,
      toggle,
    } = useSidebar("SidebarRail");

    if (!collapsible && !resizable) return null;

    const resizeDelta =
      side === "left" ? SIDEBAR_RESIZE_STEP : -SIDEBAR_RESIZE_STEP;

    return (
      <button
        ref={ref}
        data-slot="sidebar-rail"
        data-side={side}
        data-state={open ? "expanded" : "collapsed"}
        type={type}
        aria-label={
          resizable
            ? "Resize sidebar"
            : open
              ? "Collapse sidebar"
              : "Expand sidebar"
        }
        onClick={(event) => {
          onClick?.(event);

          if (!resizable && !event.defaultPrevented) {
            toggle();
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (event.defaultPrevented) return;

          if (resizable && event.key === "ArrowRight") {
            event.preventDefault();
            resizeBy(resizeDelta);
            return;
          }

          if (resizable && event.key === "ArrowLeft") {
            event.preventDefault();
            resizeBy(-resizeDelta);
            return;
          }

          if (resizable && event.key === "Home") {
            event.preventDefault();
            setOpen(false);
            return;
          }

          if (resizable && event.key === "End") {
            event.preventDefault();
            resizeBy(maxWidth);
            return;
          }

          if (!resizable && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            toggle();
          }
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);

          if (!event.defaultPrevented) {
            startResize(event);
          }
        }}
        className={cn(
          "absolute inset-y-0 z-20 hidden w-3 cursor-ew-resize touch-none outline-none",
          "after:absolute after:inset-y-2 after:w-px after:rounded-full after:bg-transparent",
          "hover:after:bg-border focus-visible:after:bg-ring",
          "sm:block",
          side === "left"
            ? "right-0 translate-x-full after:left-0"
            : "left-0 -translate-x-full after:right-0",
          className,
        )}
        {...props}
      />
    );
  },
);

function SidebarTriggerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 3.5H12.5C13.0523 3.5 13.5 3.94772 13.5 4.5V11.5C13.5 12.0523 13.0523 12.5 12.5 12.5H3.5C2.94772 12.5 2.5 12.0523 2.5 11.5V4.5C2.5 3.94772 2.94772 3.5 3.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 4V12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  function SidebarTrigger(
    {
      "aria-label": ariaLabel,
      children,
      color = "neutral",
      disabled,
      onClick,
      prefix,
      size = "small",
      variant = "ghost",
      ...props
    },
    ref,
  ) {
    const { collapsible, open, toggle } = useSidebar("SidebarTrigger");

    return (
      <Button
        ref={ref}
        data-slot="sidebar-trigger"
        aria-label={ariaLabel ?? (open ? "Collapse sidebar" : "Expand sidebar")}
        color={color}
        disabled={!collapsible || disabled}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            toggle();
          }
        }}
        prefix={prefix ?? <SidebarTriggerIcon />}
        size={size}
        variant={variant}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarInsetContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarRoot,
  SidebarSection,
  SidebarSectionLabel,
  SidebarSeparator,
  SidebarTrigger,
  sidebarMenuButtonVariants,
  sidebarRootVariants,
  sidebarVariants,
  useSidebar,
};
export type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarInsetContentProps,
  SidebarInsetProps,
  SidebarMenuButtonProps,
  SidebarMenuButtonSize,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarProps,
  SidebarRailProps,
  SidebarRootProps,
  SidebarSectionLabelProps,
  SidebarSectionProps,
  SidebarSeparatorProps,
  SidebarSide,
  SidebarTriggerProps,
  SidebarVariant,
};
