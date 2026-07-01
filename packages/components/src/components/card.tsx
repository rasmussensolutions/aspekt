"use client";

import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

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

const cardVariants = cva(
  [
    "grid w-full border text-primary transition-[background-color,border-color,box-shadow]",
  ],
  {
    variants: {
      variant: {
        outline: "border-border",
        soft: "border-transparent bg-surface-muted",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        small: "gap-3 p-3 text-sm",
        medium: "gap-4 p-5 text-sm",
        large: "gap-5 p-6 text-base",
      },
      shape: {
        square: "rounded-lg",
        round: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "medium",
      shape: "square",
    },
  },
);

type CardVariant = "outline" | "soft" | "ghost";

type CardSize = "small" | "medium" | "large";

type CardShape = "square" | "round";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  shape?: CardShape | null;
  size?: CardSize | null;
  surface?: SurfaceLevelValue | null;
  surfaceLift?: number | null;
  surfaceShadow?: SurfaceShadow | null;
  variant?: CardVariant | null;
};

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

type CardActionProps = React.HTMLAttributes<HTMLDivElement>;

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    shape,
    size,
    style,
    surface,
    surfaceLift,
    surfaceShadow,
    variant,
    ...props
  },
  ref,
) {
  const resolvedShape = shape ?? aspektConfig.shape;
  const resolvedVariant = variant ?? "outline";
  const resolvedSurface = useResolvedSurfaceLevel({
    level: surface,
    lift: surfaceLift ?? (resolvedVariant === "outline" ? 1 : 0),
  });
  const resolvedShadow =
    resolvedVariant === "outline"
      ? resolveSurfaceShadow(surfaceShadow, resolvedSurface)
      : false;

  return (
    <SurfaceProvider value={resolvedSurface}>
      <div
        ref={ref}
        data-slot="card"
        data-surface-level={resolvedSurface}
        className={cn(
          resolvedVariant === "outline"
            ? getSurfaceClassName(resolvedSurface, resolvedShadow)
            : null,
          cardVariants({
            shape: resolvedShape,
            size,
            variant: resolvedVariant,
          }),
          className,
        )}
        style={getSurfaceStyle(resolvedSurface, style)}
        {...props}
      />
    </SurfaceProvider>
  );
});

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1.5",
          "[&_[data-slot=card-action]]:col-start-2 [&_[data-slot=card-action]]:row-span-2 [&_[data-slot=card-action]]:row-start-1 [&_[data-slot=card-action]]:self-start [&_[data-slot=card-action]]:justify-self-end",
          "[&_[data-slot=card-description]]:col-start-1 [&_[data-slot=card-title]]:col-start-1",
          className,
        )}
        {...props}
      />
    );
  },
);

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        data-slot="card-title"
        className={cn("text-base font-medium leading-none text-primary", className)}
        {...props}
      />
    );
  },
);

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(function CardDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn("text-sm leading-6 text-secondary", className)}
      {...props}
    />
  );
});

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  function CardAction({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn("flex items-center gap-2", className)}
        {...props}
      />
    );
  },
);

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn("min-w-0 text-sm leading-6 text-primary", className)}
        {...props}
      />
    );
  },
);

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn(
          "flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:items-center sm:justify-end",
          className,
        )}
        {...props}
      />
    );
  },
);

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
export type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardShape,
  CardSize,
  CardTitleProps,
  CardVariant,
};
