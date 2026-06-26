"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";

import { Button, ButtonShapeProvider } from "./button";
import { playSound, type SoundName } from "./sound";

const dialogContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-50 grid w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 gap-5",
    "border border-border bg-popover text-popover-foreground shadow-2xl outline-none",
    "transition-[opacity,transform] duration-150 ease-out",
    "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
    "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
  ],
  {
    variants: {
      size: {
        small: "max-w-sm p-6",
        medium: "max-w-lg p-8",
        large: "max-w-2xl p-8",
      },
      shape: {
        square: "rounded-xl",
        round: "rounded-3xl",
      },
    },
    defaultVariants: {
      size: "medium",
      shape: "square",
    },
  },
);

type DialogSound =
  | false
  | {
      close?: SoundName | false;
      open?: SoundName | false;
    };

type DialogSize = "small" | "medium" | "large";

type DialogShape = "square" | "round";

const DialogShapeContext = React.createContext<DialogShape>("square");

type DialogRootPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Root
>;

type DialogRootProps = Omit<
  DialogRootPrimitiveProps,
  "disablePointerDismissal" | "onOpenChange"
> & {
  disablePointerDismissal?: DialogRootPrimitiveProps["disablePointerDismissal"];
  dismissible?: boolean;
  onOpenChange?: DialogRootPrimitiveProps["onOpenChange"];
  shape?: DialogShape;
  sound?: DialogSound;
};

type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>;

type DialogOverlayProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Backdrop>,
  "className"
> & {
  className?: string;
};

type DialogContentProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Popup>,
  "className"
> & {
    className?: string;
    shape?: DialogShape | null;
    size?: DialogSize | null;
  };

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

type DialogTitleProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Title>,
  "className"
> & {
  className?: string;
};

type DialogDescriptionProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Description>,
  "className"
> & {
  className?: string;
};

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

type DialogButtonProps = Pick<
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

type DialogTriggerProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Trigger>,
  keyof DialogButtonProps | "render"
> &
  DialogButtonProps;

type DialogCloseProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Close>,
  keyof DialogButtonProps | "render"
> &
  DialogButtonProps;

function getDialogSound(sound: DialogSound | undefined, open: boolean) {
  if (sound === undefined) return open ? "open" : "close";
  if (sound === false) return false;
  return open ? sound.open : sound.close;
}

function DialogRoot({
  disablePointerDismissal,
  dismissible = true,
  onOpenChange,
  shape = "square",
  sound,
  ...props
}: DialogRootProps) {
  const handleOpenChange = React.useCallback<
    NonNullable<DialogRootPrimitiveProps["onOpenChange"]>
  >(
    (open, eventDetails) => {
      const nextSound = getDialogSound(sound, open);

      if (nextSound) {
        playSound(nextSound);
      }

      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange, sound],
  );

  return (
    <DialogShapeContext.Provider value={shape}>
      <ButtonShapeProvider shape={shape}>
        <DialogPrimitive.Root
          disablePointerDismissal={disablePointerDismissal ?? !dismissible}
          onOpenChange={handleOpenChange}
          {...props}
        />
      </ButtonShapeProvider>
    </DialogShapeContext.Provider>
  );
}

function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />;
}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  function DialogOverlay({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Backdrop
        ref={ref}
        data-slot="dialog-overlay"
        className={cn(
          "fixed inset-0 z-50 min-h-dvh bg-foreground/40 transition-opacity duration-150",
          "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          "supports-[-webkit-touch-callout:none]:absolute",
          className,
        )}
        {...props}
      />
    );
  },
);

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({ className, shape, size, ...props }, ref) {
    const inheritedShape = React.useContext(DialogShapeContext);

    return (
      <DialogPrimitive.Popup
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          dialogContentVariants({ shape: shape ?? inheritedShape, size }),
          className,
        )}
        {...props}
      />
    );
  },
);

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger(
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
      <DialogPrimitive.Trigger
        ref={ref}
        data-slot="dialog-trigger"
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

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose(
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
      <DialogPrimitive.Close
        ref={ref}
        data-slot="dialog-close"
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

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-header"
        className={cn("grid gap-1.5", className)}
        {...props}
      />
    );
  },
);

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn(
          "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
          className,
        )}
        {...props}
      />
    );
  },
);

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Title
        ref={ref}
        data-slot="dialog-title"
        className={cn("text-lg font-medium leading-none", className)}
        {...props}
      />
    );
  },
);

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn(
        "text-sm leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});

export {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
};
export type {
  DialogButtonProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
  DialogShape,
  DialogSize,
  DialogSound,
  DialogTitleProps,
  DialogTriggerProps,
};
