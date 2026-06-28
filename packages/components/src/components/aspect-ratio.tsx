import { cn } from "cnfast";
import * as React from "react";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
  ratio?: number | null;
};

function getAspectRatioValue(ratio: number | null | undefined) {
  return typeof ratio === "number" && Number.isFinite(ratio) && ratio > 0
    ? ratio
    : 1;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ className, ratio = 1, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="aspect-ratio"
        className={cn("relative overflow-hidden", className)}
        style={{
          ...style,
          aspectRatio: getAspectRatioValue(ratio),
        }}
        {...props}
      />
    );
  },
);

export { AspectRatio, getAspectRatioValue };
export type { AspectRatioProps };
