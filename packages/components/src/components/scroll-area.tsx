"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
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

const scrollAreaRootVariants = cva(
  [
    "relative flex min-h-0 overflow-hidden text-primary",
    "[--scroll-area-scrollbar-padding:0.125rem] [--scroll-area-scrollbar-size:0.75rem]",
    "transition-[background-color,border-color,box-shadow]",
  ],
  {
    variants: {
      variant: {
        outline: "border border-border",
        soft: "border border-transparent bg-surface-muted",
        ghost: "border border-transparent bg-transparent",
      },
      size: {
        small:
          "text-sm [--scroll-area-scrollbar-padding:0.125rem] [--scroll-area-scrollbar-size:0.625rem]",
        medium:
          "text-sm [--scroll-area-scrollbar-padding:0.125rem] [--scroll-area-scrollbar-size:0.75rem]",
        large:
          "text-base [--scroll-area-scrollbar-padding:0.1875rem] [--scroll-area-scrollbar-size:0.875rem]",
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

const scrollAreaScrollbarVariants = cva(
  [
    "z-10 flex touch-none select-none p-[var(--scroll-area-scrollbar-padding)]",
    "transition-[background-color,opacity] duration-150 ease-out",
    "data-[orientation=vertical]:w-[var(--scroll-area-scrollbar-size)] data-[orientation=vertical]:justify-center",
    "data-[orientation=horizontal]:h-[var(--scroll-area-scrollbar-size)] data-[orientation=horizontal]:items-center",
  ],
  {
    variants: {
      visibility: {
        always:
          "pointer-events-auto bg-primary/5 opacity-100 dark:bg-white/5",
        hover:
          "pointer-events-none opacity-0 data-[hovering]:pointer-events-auto data-[hovering]:bg-primary/5 data-[hovering]:opacity-100 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 dark:data-[hovering]:bg-white/5",
        scroll:
          "pointer-events-none opacity-0 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100",
      },
    },
    defaultVariants: {
      visibility: "hover",
    },
  },
);

type ScrollAreaVariant = "outline" | "soft" | "ghost";

type ScrollAreaSize = "small" | "medium" | "large";

type ScrollAreaShape = "square" | "round";

type ScrollAreaScrollbars = "vertical" | "horizontal" | "both" | "none";

type ScrollAreaScrollbarVisibility = "always" | "hover" | "scroll";

type ScrollAreaRootProps = Omit<
  React.ComponentProps<typeof ScrollAreaPrimitive.Root>,
  "className"
> & {
  className?: string;
  shape?: ScrollAreaShape | null;
  size?: ScrollAreaSize | null;
  surface?: SurfaceLevelValue | null;
  surfaceLift?: number | null;
  surfaceShadow?: SurfaceShadow | null;
  variant?: ScrollAreaVariant | null;
};

type ScrollAreaViewportProps = Omit<
  React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>,
  "className"
> & {
  className?: string;
  fade?: boolean;
};

type ScrollAreaContentProps = Omit<
  React.ComponentProps<typeof ScrollAreaPrimitive.Content>,
  "className"
> & {
  className?: string;
};

type ScrollAreaScrollbarProps = Omit<
  React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>,
  "className"
> & {
  className?: string;
  visibility?: ScrollAreaScrollbarVisibility | null;
};

type ScrollAreaThumbProps = Omit<
  React.ComponentProps<typeof ScrollAreaPrimitive.Thumb>,
  "className"
> & {
  className?: string;
};

type ScrollAreaCornerProps = Omit<
  React.ComponentProps<typeof ScrollAreaPrimitive.Corner>,
  "className"
> & {
  className?: string;
};

type ScrollAreaProps = Omit<ScrollAreaRootProps, "children"> & {
  children?: React.ReactNode;
  contentClassName?: string;
  fade?: boolean;
  scrollbars?: ScrollAreaScrollbars;
  scrollbarVisibility?: ScrollAreaScrollbarVisibility | null;
  viewportClassName?: string;
};

function hasVerticalScrollbar(scrollbars: ScrollAreaScrollbars) {
  return scrollbars === "vertical" || scrollbars === "both";
}

function hasHorizontalScrollbar(scrollbars: ScrollAreaScrollbars) {
  return scrollbars === "horizontal" || scrollbars === "both";
}

const ScrollAreaRoot = React.forwardRef<HTMLDivElement, ScrollAreaRootProps>(
  function ScrollAreaRoot(
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
        <ScrollAreaPrimitive.Root
          ref={ref}
          data-slot="scroll-area-root"
          data-surface-level={resolvedSurface}
          className={cn(
            resolvedVariant === "outline"
              ? getSurfaceClassName(resolvedSurface, resolvedShadow)
              : null,
            scrollAreaRootVariants({
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
  },
);

const ScrollAreaViewport = React.forwardRef<
  HTMLDivElement,
  ScrollAreaViewportProps
>(function ScrollAreaViewport({ className, fade = false, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      data-slot="scroll-area-viewport"
      className={cn(
        "h-full w-full min-w-0 rounded-[inherit] outline-none",
        "focus-visible:ring-2 focus-visible:ring-current/20 focus-visible:ring-inset",
        fade ? "scroll-fade scroll-fade-8" : "",
        className,
      )}
      {...props}
    />
  );
});

const ScrollAreaContent = React.forwardRef<
  HTMLDivElement,
  ScrollAreaContentProps
>(function ScrollAreaContent({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Content
      ref={ref}
      data-slot="scroll-area-content"
      className={cn("min-w-full", className)}
      {...props}
    />
  );
});

const ScrollAreaScrollbar = React.forwardRef<
  HTMLDivElement,
  ScrollAreaScrollbarProps
>(function ScrollAreaScrollbar(
  { className, visibility = "hover", ...props },
  ref,
) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      data-slot="scroll-area-scrollbar"
      className={cn(
        scrollAreaScrollbarVariants({ visibility: visibility ?? "hover" }),
        className,
      )}
      {...props}
    />
  );
});

const ScrollAreaThumb = React.forwardRef<HTMLDivElement, ScrollAreaThumbProps>(
  function ScrollAreaThumb({ className, ...props }, ref) {
    return (
      <ScrollAreaPrimitive.Thumb
        ref={ref}
        data-slot="scroll-area-thumb"
        className={cn(
          "rounded-full bg-secondary/45 transition-colors duration-150",
          "hover:bg-primary/60 data-[scrolling]:bg-primary/55 dark:bg-white/35 dark:hover:bg-white/60 dark:data-[scrolling]:bg-white/55",
          "data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-full",
          className,
        )}
        {...props}
      />
    );
  },
);

const ScrollAreaCorner = React.forwardRef<
  HTMLDivElement,
  ScrollAreaCornerProps
>(function ScrollAreaCorner({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Corner
      ref={ref}
      data-slot="scroll-area-corner"
      className={cn("bg-primary/5 dark:bg-white/5", className)}
      {...props}
    />
  );
});

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(
    {
      children,
      contentClassName,
      fade,
      scrollbars = "vertical",
      scrollbarVisibility,
      viewportClassName,
      ...props
    },
    ref,
  ) {
    const showVerticalScrollbar = hasVerticalScrollbar(scrollbars);
    const showHorizontalScrollbar = hasHorizontalScrollbar(scrollbars);

    return (
      <ScrollAreaRoot ref={ref} {...props}>
        <ScrollAreaViewport fade={fade} className={viewportClassName}>
          <ScrollAreaContent className={contentClassName}>
            {children}
          </ScrollAreaContent>
        </ScrollAreaViewport>

        {showVerticalScrollbar ? (
          <ScrollAreaScrollbar visibility={scrollbarVisibility}>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        ) : null}

        {showHorizontalScrollbar ? (
          <ScrollAreaScrollbar
            orientation="horizontal"
            visibility={scrollbarVisibility}
          >
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        ) : null}

        {showVerticalScrollbar && showHorizontalScrollbar ? (
          <ScrollAreaCorner />
        ) : null}
      </ScrollAreaRoot>
    );
  },
);

export {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  scrollAreaRootVariants,
};
export type {
  ScrollAreaContentProps,
  ScrollAreaCornerProps,
  ScrollAreaProps,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaScrollbarVisibility,
  ScrollAreaScrollbars,
  ScrollAreaShape,
  ScrollAreaSize,
  ScrollAreaThumbProps,
  ScrollAreaVariant,
  ScrollAreaViewportProps,
};
