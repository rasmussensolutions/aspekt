"use client";

import { cn } from "cnfast";
import * as React from "react";

type SlotChildProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
};

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  slottedChildren?: React.ReactNode;
};

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      setRef(ref, value);
    }
  };
}

function composeEventHandlers<E extends React.SyntheticEvent>(
  slotHandler: ((event: E) => void) | undefined,
  childHandler: ((event: E) => void) | undefined,
) {
  return (event: E) => {
    slotHandler?.(event);

    if (!event.defaultPrevented) {
      childHandler?.(event);
    }
  };
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, className, onClick, slottedChildren, style, ...props },
  ref,
) {
  const child = React.Children.only(children);

  if (!React.isValidElement<SlotChildProps>(child)) {
    throw new Error("Slot requires a single valid React element child.");
  }

  return React.cloneElement(child, {
    ...props,
    ...child.props,
    children: slottedChildren ?? child.props.children,
    className: cn(className, child.props.className),
    onClick: composeEventHandlers(onClick, child.props.onClick),
    ref: composeRefs(ref, child.props.ref),
    style: {
      ...style,
      ...child.props.style,
    },
  });
});

export { Slot };
export type { SlotProps };
