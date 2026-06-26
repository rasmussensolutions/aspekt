"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

import { playSound } from "./sound";

const toastPositions = [
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
  "top-center",
  "bottom-center",
] as const;

const toastRootVariants = cva(
  [
    "pointer-events-auto w-full overflow-hidden border-2 border-border bg-popover text-popover-foreground shadow-xl outline-none",
    "transition-[opacity,transform] duration-200 ease-out",
    "data-[limited]:pointer-events-none data-[limited]:opacity-0",
    "data-[swiping]:transition-none",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ],
  {
    variants: {
      colorful: {
        true: [
          "data-[type=success]:[background-color:var(--success-surface)]",
          "data-[type=success]:[border-color:var(--success-border)]",
          "data-[type=error]:[background-color:var(--destructive-surface)]",
          "data-[type=error]:[border-color:var(--destructive-border)]",
          "data-[type=warning]:[background-color:var(--warning-surface)]",
          "data-[type=warning]:[border-color:var(--warning-border)]",
          "data-[type=info]:[background-color:var(--info-surface)]",
          "data-[type=info]:[border-color:var(--info-border)]",
        ],
        false: "",
      },
      shape: {
        square: "rounded-lg",
        round: "rounded-2xl",
      },
      stacked: {
        true: [
          "absolute inset-x-0",
          "z-[calc(1000_-_var(--toast-index))]",
          "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_var(--toast-collapsed-y)))_scale(calc(1_-_(var(--toast-index)_*_0.04)))]",
          "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_var(--toast-expanded-y)))_scale(1)]",
        ],
        false: "relative",
      },
      side: {
        bottom: [
          "bottom-0",
          "[--toast-collapsed-y:calc(var(--toast-index)_*_-0.75rem)]",
          "[--toast-expanded-y:calc((var(--toast-offset-y)_+_(var(--toast-index)_*_0.5rem))_*_-1)]",
          "data-[starting-style]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_0.75rem))_scale(0.98)]",
        ],
        top: [
          "top-0",
          "[--toast-collapsed-y:calc(var(--toast-index)_*_0.75rem)]",
          "[--toast-expanded-y:calc(var(--toast-offset-y)_+_(var(--toast-index)_*_0.5rem))]",
          "data-[starting-style]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_-_0.75rem))_scale(0.98)]",
        ],
      },
    },
    defaultVariants: {
      colorful: false,
      shape: "square",
      stacked: true,
      side: "bottom",
    },
  },
);

type ToastShape = "square" | "round";
type ToastPosition = (typeof toastPositions)[number];
type ToastObject = React.ComponentProps<typeof ToastPrimitive.Root>["toast"];
type ToastSide = "bottom" | "top";
type ToastManager = ReturnType<typeof ToastPrimitive.createToastManager>;
type ToastOptions = Parameters<ToastManager["add"]>[0];
type ToastInput = React.ReactNode | ToastOptions;
type ToastBaseOptions = Omit<ToastOptions, "title">;
type ToastShortcutOptions = Omit<ToastOptions, "title" | "type">;
type ToastShortcut = (
  input: ToastInput,
  options?: ToastShortcutOptions,
) => string;
type ToastFunction = {
  (input: ToastInput, options?: ToastBaseOptions): string;
  close: ToastManager["close"];
  error: ToastShortcut;
  info: ToastShortcut;
  manager: ToastManager;
  promise: ToastManager["promise"];
  success: ToastShortcut;
  update: ToastManager["update"];
  warning: ToastShortcut;
};

type ToastProviderProps = React.ComponentProps<
  typeof ToastPrimitive.Provider
> & {
  maxToasts?: number;
};

type ToastViewportProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Viewport>,
  "className" | "style"
> & {
  className?: string;
  placement?: "absolute" | "fixed";
  position?: ToastPosition;
  style?: React.CSSProperties;
};

type ToastPortalProps = React.ComponentProps<typeof ToastPrimitive.Portal>;

type ToastRootProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Root>,
  "className"
> & {
  className?: string;
  colorful?: boolean | null;
  shape?: ToastShape | null;
};

type ToastPositionerProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Positioner>,
  "className"
> & {
  className?: string;
};

type ToastContentProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Content>,
  "className"
> & {
  className?: string;
};

type ToastTitleProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Title>,
  "className"
> & {
  className?: string;
};

type ToastDescriptionProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Description>,
  "className"
> & {
  className?: string;
};

type ToastActionProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Action>,
  "className"
> & {
  className?: string;
};

type ToastCloseProps = Omit<
  React.ComponentProps<typeof ToastPrimitive.Close>,
  "className"
> & {
  className?: string;
};

type ToastListProps = {
  className?: string;
  colorful?: boolean;
  renderToast?: (toast: ToastObject) => React.ReactNode;
  shape?: ToastShape;
};

type ToasterProps = Omit<ToastProviderProps, "children"> & {
  colorful?: ToastListProps["colorful"];
  placement?: ToastViewportProps["placement"];
  position?: ToastViewportProps["position"];
  renderToast?: ToastListProps["renderToast"];
  shape?: ToastListProps["shape"];
  toastClassName?: string;
  viewportClassName?: string;
  viewportStyle?: React.CSSProperties;
};

const ToastMaxToastsContext = React.createContext(6);
const ToastPositionContext = React.createContext<ToastPosition>("bottom-right");

const toastViewportClassNames = {
  fixed: {
    "bottom-right": "fixed bottom-4 right-4 sm:bottom-6 sm:right-6",
    "bottom-left": "fixed bottom-4 left-4 sm:bottom-6 sm:left-6",
    "bottom-center": "fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6",
    "top-right": "fixed right-4 top-4 sm:right-6 sm:top-6",
    "top-left": "fixed left-4 top-4 sm:left-6 sm:top-6",
    "top-center": "fixed left-1/2 top-4 -translate-x-1/2 sm:top-6",
  },
  absolute: {
    "bottom-right": "absolute bottom-4 right-4",
    "bottom-left": "absolute bottom-4 left-4",
    "bottom-center": "absolute bottom-4 left-1/2 -translate-x-1/2",
    "top-right": "absolute right-4 top-4",
    "top-left": "absolute left-4 top-4",
    "top-center": "absolute left-1/2 top-4 -translate-x-1/2",
  },
} satisfies Record<"absolute" | "fixed", Record<ToastPosition, string>>;

type ToastViewportStyle = React.CSSProperties & {
  "--toast-stack-height"?: string;
};

const globalToastManager = ToastPrimitive.createToastManager();

function isToastOptions(value: ToastInput): value is ToastOptions {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    React.isValidElement(value)
  ) {
    return false;
  }

  return [
    "actionProps",
    "data",
    "description",
    "id",
    "onClose",
    "onRemove",
    "positionerProps",
    "priority",
    "timeout",
    "title",
    "type",
  ].some((key) => key in value);
}

function normalizeToastOptions(
  input: ToastInput,
  options?: Partial<ToastOptions>,
): ToastOptions {
  if (isToastOptions(input)) {
    return { ...input, ...options };
  }

  return { ...options, title: input };
}

function addToast(input: ToastInput, options?: ToastBaseOptions) {
  return globalToastManager.add(normalizeToastOptions(input, options));
}

function addToastWithType(type: string): ToastShortcut {
  return (input, options) =>
    globalToastManager.add(normalizeToastOptions(input, { ...options, type }));
}

const toast = Object.assign(addToast, {
  close: globalToastManager.close,
  error: addToastWithType("error"),
  info: addToastWithType("info"),
  manager: globalToastManager,
  promise: globalToastManager.promise,
  success: addToastWithType("success"),
  update: globalToastManager.update,
  warning: addToastWithType("warning"),
}) satisfies ToastFunction;

function getToastSide(position: ToastPosition): ToastSide {
  return position.startsWith("top") ? "top" : "bottom";
}

function getToastSound(
  type: React.ComponentProps<typeof ToastPrimitive.Root>["toast"]["type"],
) {
  if (type === "success" || type === "error" || type === "warning") {
    return type;
  }

  return "appear";
}

function getToastLimit(value: number | undefined, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(1, Math.floor(value));
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 5L11 11M11 5L5 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function ToastProvider({
  children,
  limit,
  maxToasts,
  toastManager = globalToastManager,
  ...props
}: ToastProviderProps) {
  const resolvedMaxToasts = getToastLimit(maxToasts ?? limit, 6);
  const resolvedLimit = getToastLimit(limit, resolvedMaxToasts);

  return (
    <ToastMaxToastsContext.Provider value={resolvedMaxToasts}>
      <ToastPrimitive.Provider
        limit={Math.min(resolvedLimit, resolvedMaxToasts)}
        toastManager={toastManager}
        {...props}
      >
        {children}
      </ToastPrimitive.Provider>
    </ToastMaxToastsContext.Provider>
  );
}

function ToastPortal(props: ToastPortalProps) {
  return <ToastPrimitive.Portal {...props} />;
}

const ToastViewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(
  function ToastViewport(
    {
      className,
      placement = "fixed",
      position = "bottom-right",
      style,
      ...props
    },
    ref,
  ) {
    const { toasts } = ToastPrimitive.useToastManager();
    const visibleToasts = toasts.filter(
      (toast) => !toast.limited && toast.transitionStatus !== "ending",
    );
    const visibleToastGap = 8;
    const stackHeight = visibleToasts.reduce(
      (height, toast, index) =>
        height + (toast.height ?? 0) + (index === 0 ? 0 : visibleToastGap),
      0,
    );
    const viewportStyle: ToastViewportStyle = {
      "--toast-stack-height": `${stackHeight}px`,
      ...style,
    };

    return (
      <ToastPositionContext.Provider value={position}>
        <ToastPrimitive.Viewport
          ref={ref}
          data-position={position}
          data-slot="toast-viewport"
          className={cn(
            toastViewportClassNames[placement][position],
            "pointer-events-auto z-50 h-[var(--toast-frontmost-height,0px)] w-[min(calc(100vw-2rem),24rem)] outline-none transition-[height] duration-200 ease-out data-[expanded]:h-[var(--toast-stack-height,var(--toast-frontmost-height,0px))]",
            className,
          )}
          style={viewportStyle}
          {...props}
        />
      </ToastPositionContext.Provider>
    );
  },
);

const ToastRoot = React.forwardRef<HTMLDivElement, ToastRootProps>(
  function ToastRoot({ className, colorful, shape, toast, ...props }, ref) {
    const position = React.useContext(ToastPositionContext);
    const stacked = toast.positionerProps?.anchor === undefined;
    const playedSoundKeyRef = React.useRef<string | null>(null);
    const sound = getToastSound(toast.type);

    React.useEffect(() => {
      if (!sound || toast.limited || toast.transitionStatus === "ending") {
        return;
      }

      const soundKey = `${toast.id}:${sound}`;

      if (playedSoundKeyRef.current === soundKey) {
        return;
      }

      playedSoundKeyRef.current = soundKey;
      playSound(sound, { depth: "cues" });
    }, [sound, toast.id, toast.limited, toast.transitionStatus]);

    return (
      <ToastPrimitive.Root
        ref={ref}
        data-slot="toast-root"
        className={cn(
          toastRootVariants({
            colorful,
            shape,
            side: stacked ? getToastSide(position) : null,
            stacked,
          }),
          className,
        )}
        toast={toast}
        {...props}
      />
    );
  },
);

const ToastPositioner = React.forwardRef<HTMLDivElement, ToastPositionerProps>(
  function ToastPositioner({ className, sideOffset = 8, ...props }, ref) {
    return (
      <ToastPrimitive.Positioner
        ref={ref}
        data-slot="toast-positioner"
        sideOffset={sideOffset}
        className={cn("z-50 outline-none", className)}
        {...props}
      />
    );
  },
);

const ToastContent = React.forwardRef<HTMLDivElement, ToastContentProps>(
  function ToastContent({ className, ...props }, ref) {
    return (
      <ToastPrimitive.Content
        ref={ref}
        data-slot="toast-content"
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] gap-3 overflow-hidden p-4",
          "transition-opacity duration-200 data-[behind]:opacity-0 data-[expanded]:opacity-100",
          className,
        )}
        {...props}
      />
    );
  },
);

const ToastTitle = React.forwardRef<HTMLHeadingElement, ToastTitleProps>(
  function ToastTitle({ className, ...props }, ref) {
    return (
      <ToastPrimitive.Title
        ref={ref}
        data-slot="toast-title"
        className={cn(
          "text-sm font-medium leading-5 text-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  ToastDescriptionProps
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      data-slot="toast-description"
      className={cn(
        "mt-0.5 text-sm leading-5 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});

const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  function ToastAction({ className, ...props }, ref) {
    return (
      <ToastPrimitive.Action
        ref={ref}
        data-slot="toast-action"
        className={cn(
          "inline-flex h-7 shrink-0 items-center justify-center rounded-md px-2 text-sm font-medium outline-none",
          "text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-current/20",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  function ToastClose({ className, children, ...props }, ref) {
    return (
      <ToastPrimitive.Close
        ref={ref}
        data-slot="toast-close"
        aria-label="Dismiss notification"
        className={cn(
          "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none",
          "hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-current/20",
          className,
        )}
        {...props}
      >
        {children ?? <XIcon />}
      </ToastPrimitive.Close>
    );
  },
);

function ToastDefaultContent() {
  return (
    <ToastContent>
      <div className="min-w-0">
        <ToastTitle />
        <ToastDescription />
      </div>
      <div className="flex shrink-0 items-start gap-1">
        <ToastAction />
        <ToastClose />
      </div>
    </ToastContent>
  );
}

function ToastList({
  className,
  colorful = false,
  renderToast,
  shape = "square",
}: ToastListProps) {
  const { close, toasts } = ToastPrimitive.useToastManager();
  const maxToasts = React.useContext(ToastMaxToastsContext);

  React.useEffect(() => {
    const liveToasts = toasts.filter(
      (toast) => toast.transitionStatus !== "ending",
    );
    const excessToasts = liveToasts.slice(maxToasts);

    for (const toast of excessToasts) {
      close(toast.id);
    }
  }, [close, maxToasts, toasts]);

  return (
    <>
      {toasts.map((toast) => {
        const toastNode = renderToast ? (
          renderToast(toast)
        ) : (
          <ToastRoot
            toast={toast}
            colorful={colorful}
            shape={shape}
            className={className}
          >
            <ToastDefaultContent />
          </ToastRoot>
        );

        if (toast.positionerProps?.anchor !== undefined) {
          return (
            <ToastPositioner key={toast.id} toast={toast}>
              {toastNode}
            </ToastPositioner>
          );
        }

        return <React.Fragment key={toast.id}>{toastNode}</React.Fragment>;
      })}
    </>
  );
}

function Toaster({
  colorful = false,
  placement,
  position,
  renderToast,
  shape = "square",
  toastClassName,
  viewportClassName,
  viewportStyle,
  ...props
}: ToasterProps) {
  return (
    <ToastProvider {...props}>
      <ToastPortal>
        <ToastViewport
          className={viewportClassName}
          placement={placement}
          position={position}
          style={viewportStyle}
        >
          <ToastList
            className={toastClassName}
            colorful={colorful}
            renderToast={renderToast}
            shape={shape}
          />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const useToastManager = ToastPrimitive.useToastManager;
const createToastManager = ToastPrimitive.createToastManager;

export {
  Toaster,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastList,
  ToastPortal,
  ToastPositioner,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  createToastManager,
  globalToastManager as toastManager,
  toast,
  toastPositions,
  toastRootVariants,
  useToastManager,
};
export type {
  ToasterProps,
  ToastActionProps,
  ToastCloseProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastFunction,
  ToastListProps,
  ToastObject,
  ToastOptions,
  ToastPortalProps,
  ToastPosition,
  ToastPositionerProps,
  ToastProviderProps,
  ToastRootProps,
  ToastShape,
  ToastShortcutOptions,
  ToastTitleProps,
  ToastViewportProps,
};
