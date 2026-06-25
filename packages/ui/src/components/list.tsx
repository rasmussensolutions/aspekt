import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

const listVariants = cva(
  "text-pretty text-foreground marker:text-neutral-400 dark:marker:text-neutral-500",
  {
    variants: {
      variant: {
        disc: "list-disc pl-5",
        decimal: "list-decimal pl-5",
        none: "list-none pl-0",
      },
      size: {
        sm: "text-sm leading-6",
        base: "text-base leading-7",
        lg: "text-lg leading-8",
      },
      spacing: {
        tight: "space-y-1",
        normal: "space-y-2",
        loose: "space-y-3",
      },
      tone: {
        default: "text-foreground",
        muted: "text-neutral-600 dark:text-neutral-300",
        subtle: "text-neutral-500 dark:text-neutral-400",
      },
    },
    defaultVariants: {
      variant: "disc",
      size: "base",
      spacing: "normal",
      tone: "default",
    },
  },
);

type ListProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof listVariants> & {
    as?: "ul" | "ol";
  };

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement>;

function List({
  as,
  className,
  size,
  spacing,
  tone,
  variant,
  ...props
}: ListProps) {
  const Component = as ?? (variant === "decimal" ? "ol" : "ul");

  return (
    <Component
      data-slot="list"
      className={cn(
        listVariants({ variant, size, spacing, tone }),
        className,
      )}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: ListItemProps) {
  return (
    <li data-slot="list-item" className={cn("pl-1", className)} {...props} />
  );
}

export { List, ListItem, listVariants };
