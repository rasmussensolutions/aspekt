"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";

import { Button, ButtonShapeProvider } from "./button";
import { playSound, type SoundName } from "./sound";

const popoverPopupVariants = cva(
  [
    "relative z-50 grid max-w-[calc(100vw-2rem)] gap-4 border border-neutral-200 bg-background text-foreground shadow-xl outline-none",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-out",
    "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
    "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
    "dark:border-white/15 dark:bg-neutral-950",
  ],
  {
    variants: {
      size: {
        small: "w-64 p-3",
        medium: "w-80 p-5",
        large: "w-96 p-5",
      },
      shape: {
        square: "rounded-lg",
        round: "rounded-3xl",
      },
    },
    defaultVariants: {
      size: "medium",
      shape: "square",
    },
  },
);

type PopoverSound =
  | false
  | {
      close?: SoundName | false;
      open?: SoundName | false;
    };

type PopoverSize = "small" | "medium" | "large";

type PopoverShape = "square" | "round";

const PopoverShapeContext = React.createContext<PopoverShape>("square");

type PopoverRootPrimitiveProps<Payload = unknown> =
  PopoverPrimitive.Root.Props<Payload>;

type PopoverRootProps<Payload = unknown> = Omit<
  PopoverRootPrimitiveProps<Payload>,
  "onOpenChange"
> & {
  onOpenChange?: PopoverRootPrimitiveProps<Payload>["onOpenChange"];
  shape?: PopoverShape;
  sound?: PopoverSound;
};

type PopoverPortalProps = React.ComponentProps<typeof PopoverPrimitive.Portal>;

type PopoverPositionerProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Positioner>,
  "className"
> & {
  className?: string;
};

type PopoverBackdropProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Backdrop>,
  "className"
> & {
  className?: string;
};

type PopoverPopupProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Popup>,
  "className"
> & {
  className?: string;
  shape?: PopoverShape | null;
  size?: PopoverSize | null;
};

type PopoverArrowProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Arrow>,
  "className"
> & {
  className?: string;
};

type PopoverViewportProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Viewport>,
  "className"
> & {
  className?: string;
};

type PopoverHeaderProps = React.HTMLAttributes<HTMLDivElement>;

type PopoverFooterProps = React.HTMLAttributes<HTMLDivElement>;

type PopoverTitleProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Title>,
  "className"
> & {
  className?: string;
};

type PopoverDescriptionProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Description>,
  "className"
> & {
  className?: string;
};

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

type PopoverButtonProps = Pick<
  ButtonProps,
  | "className"
  | "color"
  | "loading"
  | "prefix"
  | "shape"
  | "size"
  | "sound"
  | "suffix"
  | "variant"
>;

type PopoverTriggerProps = Omit<
  PopoverPrimitive.Trigger.Props,
  keyof PopoverButtonProps | "render"
> &
  PopoverButtonProps;

type PopoverCloseProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Close>,
  keyof PopoverButtonProps | "render"
> &
  PopoverButtonProps;

function getPopoverSound(sound: PopoverSound | undefined, open: boolean) {
  if (sound === undefined) return open ? "popover.open" : "popover.close";
  if (sound === false) return false;
  return open ? sound.open : sound.close;
}

function PopoverRoot<Payload = unknown>({
  onOpenChange,
  shape = "square",
  sound,
  ...props
}: PopoverRootProps<Payload>) {
  const handleOpenChange = React.useCallback<
    NonNullable<PopoverRootPrimitiveProps<Payload>["onOpenChange"]>
  >(
    (open, eventDetails) => {
      const nextSound = getPopoverSound(sound, open);

      if (nextSound) {
        playSound(nextSound);
      }

      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange, sound],
  );

  return (
    <PopoverShapeContext.Provider value={shape}>
      <ButtonShapeProvider shape={shape}>
        <PopoverPrimitive.Root onOpenChange={handleOpenChange} {...props} />
      </ButtonShapeProvider>
    </PopoverShapeContext.Provider>
  );
}

function PopoverPortal(props: PopoverPortalProps) {
  return <PopoverPrimitive.Portal {...props} />;
}

const PopoverPositioner = React.forwardRef<
  HTMLDivElement,
  PopoverPositionerProps
>(function PopoverPositioner(
  {
    align = "center",
    className,
    collisionPadding = 16,
    sideOffset = 8,
    ...props
  },
  ref,
) {
  return (
    <PopoverPrimitive.Positioner
      ref={ref}
      align={align}
      collisionPadding={collisionPadding}
      data-slot="popover-positioner"
      sideOffset={sideOffset}
      className={cn(
        "z-50 data-[anchor-hidden]:pointer-events-none data-[anchor-hidden]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});

const PopoverBackdrop = React.forwardRef<HTMLDivElement, PopoverBackdropProps>(
  function PopoverBackdrop({ className, ...props }, ref) {
    return (
      <PopoverPrimitive.Backdrop
        ref={ref}
        data-slot="popover-backdrop"
        className={cn(
          "fixed inset-0 z-50 min-h-dvh bg-transparent transition-opacity duration-150",
          "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          "supports-[-webkit-touch-callout:none]:absolute",
          className,
        )}
        {...props}
      />
    );
  },
);

const PopoverPopup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(
  function PopoverPopup({ className, shape, size, ...props }, ref) {
    const inheritedShape = React.useContext(PopoverShapeContext);

    return (
      <PopoverPrimitive.Popup
        ref={ref}
        data-slot="popover-popup"
        className={cn(
          popoverPopupVariants({ shape: shape ?? inheritedShape, size }),
          className,
        )}
        {...props}
      />
    );
  },
);

const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  function PopoverArrow({ className, ...props }, ref) {
    return (
      <PopoverPrimitive.Arrow
        ref={ref}
        data-slot="popover-arrow"
        className={cn(
          "relative block h-1.5 w-3 overflow-clip",
          "data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90",
          "data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180",
          "before:absolute before:bottom-0 before:left-1/2 before:size-2 before:-translate-x-1/2 before:translate-y-1/2",
          "before:rotate-45 before:border before:border-neutral-200 before:bg-background before:content-['']",
          "dark:before:border-white/15 dark:before:bg-neutral-950",
          className,
        )}
        {...props}
      />
    );
  },
);

const PopoverViewport = React.forwardRef<HTMLDivElement, PopoverViewportProps>(
  function PopoverViewport({ className, ...props }, ref) {
    return (
      <PopoverPrimitive.Viewport
        ref={ref}
        data-slot="popover-viewport"
        className={cn("grid gap-4", className)}
        {...props}
      />
    );
  },
);

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger(
    {
      className,
      color = "neutral",
      loading,
      prefix,
      shape,
      size,
      sound = false,
      suffix,
      variant,
      ...props
    },
    ref,
  ) {
    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        data-slot="popover-trigger"
        render={
          <Button
            className={className}
            color={color}
            loading={loading}
            prefix={prefix}
            shape={shape}
            size={size}
            sound={sound}
            suffix={suffix}
            variant={variant}
          />
        }
        {...props}
      />
    );
  },
);

const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  function PopoverClose(
    {
      className,
      color = "neutral",
      loading,
      prefix,
      shape,
      size,
      sound = false,
      suffix,
      variant = "ghost",
      ...props
    },
    ref,
  ) {
    return (
      <PopoverPrimitive.Close
        ref={ref}
        data-slot="popover-close"
        render={
          <Button
            className={className}
            color={color}
            loading={loading}
            prefix={prefix}
            shape={shape}
            size={size}
            sound={sound}
            suffix={suffix}
            variant={variant}
          />
        }
        {...props}
      />
    );
  },
);

const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  function PopoverHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="popover-header"
        className={cn("grid gap-1.5", className)}
        {...props}
      />
    );
  },
);

const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
  function PopoverFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="popover-footer"
        className={cn(
          "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
          className,
        )}
        {...props}
      />
    );
  },
);

const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  function PopoverTitle({ className, ...props }, ref) {
    return (
      <PopoverPrimitive.Title
        ref={ref}
        data-slot="popover-title"
        className={cn("text-sm font-medium leading-none", className)}
        {...props}
      />
    );
  },
);

const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  PopoverDescriptionProps
>(function PopoverDescription({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      data-slot="popover-description"
      className={cn(
        "text-sm leading-6 text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
});

const PopoverContent = PopoverPopup;

export {
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
  popoverPopupVariants,
};
export type {
  PopoverArrowProps,
  PopoverBackdropProps,
  PopoverButtonProps,
  PopoverCloseProps,
  PopoverDescriptionProps,
  PopoverFooterProps,
  PopoverHeaderProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerProps,
  PopoverRootProps,
  PopoverShape,
  PopoverSize,
  PopoverSound,
  PopoverTitleProps,
  PopoverTriggerProps,
  PopoverViewportProps,
};
