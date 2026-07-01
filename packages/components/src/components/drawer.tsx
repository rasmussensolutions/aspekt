"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";

import { Button, ButtonShapeProvider } from "./button";
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

const drawerViewportVariants = cva(
  [
    "fixed inset-0 z-50 flex",
    "supports-[-webkit-touch-callout:none]:absolute",
  ],
  {
    variants: {
      side: {
        top: "items-start justify-center",
        right: "items-stretch justify-end",
        bottom: "items-end justify-center",
        left: "items-stretch justify-start",
      },
      detached: {
        true: [
          "[--drawer-detached-offset:0.75rem] p-[var(--drawer-detached-offset)]",
          "sm:[--drawer-detached-offset:1rem]",
        ],
        false: "[--drawer-detached-offset:0px]",
      },
    },
    defaultVariants: {
      side: "bottom",
      detached: false,
    },
  },
);

const drawerContentVariants = cva(
  [
    "z-50 grid gap-5 overflow-y-auto overscroll-contain touch-auto",
    "border border-border text-primary outline-none",
    "transition-[opacity,transform] duration-200 ease-out",
    "data-[swiping]:select-none",
    "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
  ],
  {
    variants: {
      side: {
        top: [
          "w-full max-w-2xl",
          "[transform:translateY(var(--drawer-swipe-movement-y))]",
          "data-[ending-style]:[transform:translateY(calc(-100%_-_var(--drawer-detached-offset)_-_2px))]",
          "data-[starting-style]:[transform:translateY(calc(-100%_-_var(--drawer-detached-offset)_-_2px))]",
        ],
        right: [
          "h-full max-h-full",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-[ending-style]:[transform:translateX(calc(100%_+_var(--drawer-detached-offset)_+_2px))]",
          "data-[starting-style]:[transform:translateX(calc(100%_+_var(--drawer-detached-offset)_+_2px))]",
        ],
        bottom: [
          "w-full max-w-2xl",
          "[transform:translateY(var(--drawer-swipe-movement-y))]",
          "data-[ending-style]:[transform:translateY(calc(100%_+_var(--drawer-detached-offset)_+_2px))]",
          "data-[starting-style]:[transform:translateY(calc(100%_+_var(--drawer-detached-offset)_+_2px))]",
        ],
        left: [
          "h-full max-h-full",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-[ending-style]:[transform:translateX(calc(-100%_-_var(--drawer-detached-offset)_-_2px))]",
          "data-[starting-style]:[transform:translateX(calc(-100%_-_var(--drawer-detached-offset)_-_2px))]",
        ],
      },
      size: {
        small: "p-[var(--overlay-padding-sm)]",
        medium: "p-[var(--overlay-padding-md)]",
        large: "p-[var(--overlay-padding-md)]",
      },
      shape: {
        square: "",
        round: "",
      },
      detached: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        side: ["top", "bottom"],
        size: "small",
        className: "max-h-[min(24rem,80dvh)]",
      },
      {
        side: ["top", "bottom"],
        size: "medium",
        className: "max-h-[min(32rem,80dvh)]",
      },
      {
        side: ["top", "bottom"],
        size: "large",
        className: "max-h-[min(40rem,88dvh)]",
      },
      {
        side: ["left", "right"],
        size: "small",
        className:
          "w-[22rem] max-w-[calc(100vw_-_var(--drawer-detached-offset)_-_var(--drawer-detached-offset))]",
      },
      {
        side: ["left", "right"],
        size: "medium",
        className:
          "w-[28rem] max-w-[calc(100vw_-_var(--drawer-detached-offset)_-_var(--drawer-detached-offset))]",
      },
      {
        side: ["left", "right"],
        size: "large",
        className:
          "w-[34rem] max-w-[calc(100vw_-_var(--drawer-detached-offset)_-_var(--drawer-detached-offset))]",
      },
      {
        side: "top",
        detached: false,
        className: "border-t-0",
      },
      {
        side: "right",
        detached: false,
        className: "border-r-0",
      },
      {
        side: "bottom",
        detached: false,
        className: "border-b-0",
      },
      {
        side: "left",
        detached: false,
        className: "border-l-0",
      },
      {
        side: "top",
        shape: "square",
        detached: false,
        className: "rounded-b-[var(--overlay-radius-square)]",
      },
      {
        side: "top",
        shape: "round",
        detached: false,
        className: "rounded-b-[var(--overlay-radius-round)]",
      },
      {
        side: "right",
        shape: "square",
        detached: false,
        className: "rounded-l-[var(--overlay-radius-square)]",
      },
      {
        side: "right",
        shape: "round",
        detached: false,
        className: "rounded-l-[var(--overlay-radius-round)]",
      },
      {
        side: "bottom",
        shape: "square",
        detached: false,
        className: "rounded-t-[var(--overlay-radius-square)]",
      },
      {
        side: "bottom",
        shape: "round",
        detached: false,
        className: "rounded-t-[var(--overlay-radius-round)]",
      },
      {
        side: "left",
        shape: "square",
        detached: false,
        className: "rounded-r-[var(--overlay-radius-square)]",
      },
      {
        side: "left",
        shape: "round",
        detached: false,
        className: "rounded-r-[var(--overlay-radius-round)]",
      },
      {
        shape: "square",
        detached: true,
        className: "rounded-[var(--overlay-radius-square)]",
      },
      {
        shape: "round",
        detached: true,
        className: "rounded-[var(--overlay-radius-round)]",
      },
    ],
    defaultVariants: {
      side: "bottom",
      size: "medium",
      shape: "square",
      detached: false,
    },
  },
);

type DrawerSound =
  | false
  | {
      close?: SoundName | false;
      open?: SoundName | false;
    };

type DrawerSide = "top" | "right" | "bottom" | "left";

type DrawerSize = "small" | "medium" | "large";

type DrawerShape = "square" | "round";

type DrawerBackdrop = boolean;

type DrawerDetached = boolean;

const DrawerBackdropContext = React.createContext<DrawerBackdrop>(true);
const DrawerDetachedContext = React.createContext<DrawerDetached>(false);
const DrawerSideContext = React.createContext<DrawerSide>("bottom");
const DrawerShapeContext = React.createContext<DrawerShape>(
  aspektConfig.shape,
);

type DrawerRootPrimitiveProps = React.ComponentProps<
  typeof DrawerPrimitive.Root
>;

type DrawerRootProps = Omit<
  DrawerRootPrimitiveProps,
  "disablePointerDismissal" | "onOpenChange"
> & {
  backdrop?: DrawerBackdrop;
  detached?: DrawerDetached;
  disablePointerDismissal?: DrawerRootPrimitiveProps["disablePointerDismissal"];
  dismissible?: boolean;
  onOpenChange?: DrawerRootPrimitiveProps["onOpenChange"];
  shape?: DrawerShape;
  side?: DrawerSide;
  sound?: DrawerSound;
};

type DrawerPortalProps = React.ComponentProps<typeof DrawerPrimitive.Portal>;

type DrawerOverlayProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Backdrop>,
  "className"
> & {
  backdrop?: DrawerBackdrop;
  className?: string;
};

type DrawerViewportProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Viewport>,
  "className"
> & {
    className?: string;
    detached?: DrawerDetached | null;
    side?: DrawerSide | null;
  };

type DrawerContentProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Popup>,
  "className"
> & {
    className?: string;
    detached?: DrawerDetached | null;
    shape?: DrawerShape | null;
    side?: DrawerSide | null;
    size?: DrawerSize | null;
    surface?: SurfaceLevelValue | null;
    surfaceLift?: number | null;
    surfaceShadow?: SurfaceShadow | null;
  };

type DrawerBodyProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Content>,
  "className"
> & {
  className?: string;
};

type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

type DrawerTitleProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Title>,
  "className"
> & {
  className?: string;
};

type DrawerDescriptionProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Description>,
  "className"
> & {
  className?: string;
};

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

type DrawerButtonProps = Pick<
  ButtonProps,
  | "className"
  | "color"
  | "loading"
  | "prefix"
  | "shape"
  | "size"
  | "sound"
  | "status"
  | "suffix"
  | "variant"
>;

type DrawerTriggerProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Trigger>,
  keyof DrawerButtonProps | "render"
> &
  DrawerButtonProps;

type DrawerCloseProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Close>,
  keyof DrawerButtonProps | "render"
> &
  DrawerButtonProps;

const drawerSwipeDirections = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
} satisfies Record<
  DrawerSide,
  NonNullable<DrawerRootPrimitiveProps["swipeDirection"]>
>;

function getDrawerSound(sound: DrawerSound | undefined, open: boolean) {
  if (sound === undefined) return open ? "open" : "close";
  if (sound === false) return false;
  return open ? sound.open : sound.close;
}

function DrawerRoot({
  backdrop = true,
  detached = false,
  disablePointerDismissal,
  dismissible = true,
  onOpenChange,
  shape,
  side = "bottom",
  sound,
  swipeDirection,
  ...props
}: DrawerRootProps) {
  const resolvedShape = shape ?? aspektConfig.shape;
  const handleOpenChange = React.useCallback<
    NonNullable<DrawerRootPrimitiveProps["onOpenChange"]>
  >(
    (open, eventDetails) => {
      const nextSound = getDrawerSound(sound, open);

      if (nextSound) {
        playSound(nextSound);
      }

      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange, sound],
  );

  return (
    <DrawerBackdropContext.Provider value={backdrop}>
      <DrawerDetachedContext.Provider value={detached}>
        <DrawerSideContext.Provider value={side}>
          <DrawerShapeContext.Provider value={resolvedShape}>
            <ButtonShapeProvider shape={resolvedShape}>
              <DrawerPrimitive.Root
                disablePointerDismissal={
                  disablePointerDismissal ?? !dismissible
                }
                onOpenChange={handleOpenChange}
                swipeDirection={swipeDirection ?? drawerSwipeDirections[side]}
                {...props}
              />
            </ButtonShapeProvider>
          </DrawerShapeContext.Provider>
        </DrawerSideContext.Provider>
      </DrawerDetachedContext.Provider>
    </DrawerBackdropContext.Provider>
  );
}

function DrawerPortal(props: DrawerPortalProps) {
  return <DrawerPrimitive.Portal {...props} />;
}

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  function DrawerOverlay({ backdrop, className, ...props }, ref) {
    const inheritedBackdrop = React.useContext(DrawerBackdropContext);
    const hasBackdrop = backdrop ?? inheritedBackdrop;

    return (
      <DrawerPrimitive.Backdrop
        ref={ref}
        data-slot="drawer-overlay"
        className={cn(
          "fixed inset-0 z-50 min-h-dvh",
          hasBackdrop
            ? "bg-overlay-scrim opacity-[calc(1_-_var(--drawer-swipe-progress))]"
            : "bg-transparent opacity-100",
          "transition-opacity duration-200 ease-out",
          "data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
          "supports-[-webkit-touch-callout:none]:absolute",
          className,
        )}
        {...props}
      />
    );
  },
);

const DrawerViewport = React.forwardRef<HTMLDivElement, DrawerViewportProps>(
  function DrawerViewport({ className, detached, side, ...props }, ref) {
    const inheritedDetached = React.useContext(DrawerDetachedContext);
    const inheritedSide = React.useContext(DrawerSideContext);

    return (
      <DrawerPrimitive.Viewport
        ref={ref}
        data-slot="drawer-viewport"
        className={cn(
          drawerViewportVariants({
            detached: detached ?? inheritedDetached,
            side: side ?? inheritedSide,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(
    {
      className,
      detached,
      shape,
      side,
      size,
      style,
      surface,
      surfaceLift,
      surfaceShadow,
      ...props
    },
    ref,
  ) {
    const inheritedDetached = React.useContext(DrawerDetachedContext);
    const inheritedShape = React.useContext(DrawerShapeContext);
    const inheritedSide = React.useContext(DrawerSideContext);
    const resolvedSurface = useResolvedSurfaceLevel({
      level: surface,
      lift: surfaceLift ?? 4,
    });
    const resolvedShadow = resolveSurfaceShadow(surfaceShadow, resolvedSurface);

    return (
      <SurfaceProvider value={resolvedSurface}>
        <DrawerPrimitive.Popup
          ref={ref}
          data-slot="drawer-content"
          data-surface-level={resolvedSurface}
          className={cn(
            getSurfaceClassName(resolvedSurface, resolvedShadow),
            drawerContentVariants({
              detached: detached ?? inheritedDetached,
              shape: shape ?? inheritedShape,
              side: side ?? inheritedSide,
              size,
            }),
            className,
          )}
          style={getSurfaceStyle(resolvedSurface, style)}
          {...props}
        />
      </SurfaceProvider>
    );
  },
);

const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  function DrawerBody({ className, ...props }, ref) {
    return (
      <DrawerPrimitive.Content
        ref={ref}
        data-slot="drawer-body"
        className={cn("grid gap-4", className)}
        {...props}
      />
    );
  },
);

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  function DrawerTrigger(
    {
      className,
      color = "neutral",
      loading,
      prefix,
      shape,
      size,
      sound = false,
      status,
      suffix,
      variant,
      ...props
    },
    ref,
  ) {
    return (
      <DrawerPrimitive.Trigger
        ref={ref}
        data-slot="drawer-trigger"
        render={
          <Button
            className={className}
            color={color}
            loading={loading}
            prefix={prefix}
            shape={shape}
            size={size}
            sound={sound}
            status={status}
            suffix={suffix}
            variant={variant}
          />
        }
        {...props}
      />
    );
  },
);

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose(
    {
      className,
      color = "neutral",
      loading,
      prefix,
      shape,
      size,
      sound = false,
      status,
      suffix,
      variant = "ghost",
      ...props
    },
    ref,
  ) {
    return (
      <DrawerPrimitive.Close
        ref={ref}
        data-slot="drawer-close"
        render={
          <Button
            className={className}
            color={color}
            loading={loading}
            prefix={prefix}
            shape={shape}
            size={size}
            sound={sound}
            status={status}
            suffix={suffix}
            variant={variant}
          />
        }
        {...props}
      />
    );
  },
);

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="drawer-header"
        className={cn("grid gap-1.5", className)}
        {...props}
      />
    );
  },
);

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="drawer-footer"
        className={cn(
          "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
          className,
        )}
        {...props}
      />
    );
  },
);

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({ className, ...props }, ref) {
    return (
      <DrawerPrimitive.Title
        ref={ref}
        data-slot="drawer-title"
        className={cn("text-lg font-medium leading-none", className)}
        {...props}
      />
    );
  },
);

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(function DrawerDescription({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      data-slot="drawer-description"
      className={cn(
        "text-sm leading-6 text-secondary",
        className,
      )}
      {...props}
    />
  );
});

const DrawerPopup = DrawerContent;

export {
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPopup,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  drawerContentVariants,
  drawerViewportVariants,
};
export type {
  DrawerBackdrop,
  DrawerBodyProps,
  DrawerButtonProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerDetached,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerPortalProps,
  DrawerRootProps,
  DrawerShape,
  DrawerSide,
  DrawerSize,
  DrawerSound,
  DrawerTitleProps,
  DrawerTriggerProps,
  DrawerViewportProps,
};
