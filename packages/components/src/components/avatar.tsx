"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

const avatarRootVariants = cva(
  [
    "relative inline-flex shrink-0 overflow-hidden align-middle",
    "bg-surface-sunken text-primary ring-1 ring-border/70 select-none",
  ],
  {
    variants: {
      size: {
        micro: "size-6 text-[0.625rem]",
        tiny: "size-7 text-xs",
        small: "size-8 text-xs",
        medium: "size-9 text-sm",
        large: "size-10 text-sm",
      },
      shape: {
        square: "rounded-md",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      size: "medium",
      shape: "round",
    },
  },
);

const avatarFallbackVariants = cva(
  [
    "flex size-full items-center justify-center",
    "bg-surface-sunken font-medium text-secondary uppercase",
  ],
  {
    variants: {
      size: {
        micro: "text-[0.625rem]",
        tiny: "text-xs",
        small: "text-xs",
        medium: "text-sm",
        large: "text-sm",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

type AvatarSize = "micro" | "tiny" | "small" | "medium" | "large";

type AvatarShape = "square" | "round";

type AvatarRootProps = Omit<
  React.ComponentProps<typeof AvatarPrimitive.Root>,
  "className"
> & {
  className?: string;
  shape?: AvatarShape | null;
  size?: AvatarSize | null;
};

type AvatarImageProps = Omit<
  React.ComponentProps<typeof AvatarPrimitive.Image>,
  "className"
> & {
  className?: string;
};

type AvatarFallbackProps = Omit<
  React.ComponentProps<typeof AvatarPrimitive.Fallback>,
  "className"
> & {
  className?: string;
  size?: AvatarSize | null;
};

type AvatarProps = Omit<AvatarRootProps, "children"> & {
  alt?: string;
  children?: React.ReactNode;
  delay?: AvatarFallbackProps["delay"];
  fallback?: React.ReactNode;
  fallbackProps?: Omit<AvatarFallbackProps, "children" | "delay">;
  imageProps?: Omit<AvatarImageProps, "alt" | "src">;
  src?: string;
};

const AvatarSizeContext = React.createContext<AvatarSize>("medium");

function getAvatarInitials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  function AvatarRoot({ className, shape, size, ...props }, ref) {
    const resolvedSize = size ?? "medium";

    return (
      <AvatarSizeContext.Provider value={resolvedSize}>
        <AvatarPrimitive.Root
          ref={ref}
          data-slot="avatar-root"
          className={cn(
            avatarRootVariants({ shape, size: resolvedSize }),
            className,
          )}
          {...props}
        />
      </AvatarSizeContext.Provider>
    );
  },
);

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage({ className, ...props }, ref) {
    return (
      <AvatarPrimitive.Image
        ref={ref}
        data-slot="avatar-image"
        className={cn(
          "size-full object-cover transition-opacity duration-150 ease-out",
          "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({ className, delay = 300, size, ...props }, ref) {
    const inheritedSize = React.useContext(AvatarSizeContext);

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        data-slot="avatar-fallback"
        delay={delay}
        className={cn(
          avatarFallbackVariants({ size: size ?? inheritedSize }),
          className,
        )}
        {...props}
      />
    );
  },
);

function Avatar({
  alt,
  children,
  delay,
  fallback,
  fallbackProps,
  imageProps,
  src,
  ...props
}: AvatarProps) {
  if (children) {
    return <AvatarRoot {...props}>{children}</AvatarRoot>;
  }

  return (
    <AvatarRoot {...props}>
      {src && <AvatarImage alt={alt ?? ""} src={src} {...imageProps} />}
      <AvatarFallback delay={delay} {...fallbackProps}>
        {fallback ?? (alt ? getAvatarInitials(alt) : null)}
      </AvatarFallback>
    </AvatarRoot>
  );
}

export {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  avatarFallbackVariants,
  avatarRootVariants,
  getAvatarInitials,
};
export type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
  AvatarRootProps,
  AvatarShape,
  AvatarSize,
};
