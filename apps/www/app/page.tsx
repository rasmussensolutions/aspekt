"use client";

import { Button } from "@aspekt/ui/button";
import { Checkbox } from "@aspekt/ui/checkbox";
import {
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
} from "@aspekt/ui/dialog";
import {
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@aspekt/ui/drawer";
import { Heading } from "@aspekt/ui/heading";
import { Text } from "@aspekt/ui/text";

import { Input } from "@aspekt/ui/input";
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectRoot,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
} from "@aspekt/ui/select";
import { SoundProvider, useSound } from "@aspekt/ui/sound-provider";
import { Switch } from "@base-ui/react/switch";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  StackIcon,
} from "@phosphor-icons/react";
import * as React from "react";
import { Toggle } from "@aspekt/ui/toggle";

type IntroPage = "purpose" | "principles";
type ComponentPreview =
  | "button"
  | "checkbox"
  | "input"
  | "select"
  | "toggle"
  | "dialog"
  | "drawer"
  | "sound-provider"
  | "heading"
  | "text";

type DocsPage = IntroPage | ComponentPreview;
type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";
type ButtonColor = "accent" | "blue" | "red" | "amber" | "neutral";
type ButtonShape = "square" | "round";
type DialogSize = "small" | "medium" | "large";
type DrawerSide = "top" | "right" | "bottom" | "left";
type InputVariant = "outline" | "soft" | "ghost";
type SelectVariant = "outline" | "soft" | "ghost";
type CheckboxVariant = "solid" | "soft" | "outline";
type SelectPreviewValue = "react" | "next" | "svelte" | "vue" | "astro";
type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingTone = "default" | "muted" | "subtle" | "accent";
type HeadingLevelOption = "1" | "2" | "3" | "4" | "5" | "6";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type TextSize = "lg" | "base" | "sm" | "xs";
type TextTone =
  | "default"
  | "muted"
  | "subtle"
  | "accent"
  | "danger"
  | "success"
  | "warning";
type TextWeight = "normal" | "medium" | "semibold";
type TextAs = "p" | "span" | "div";

type ButtonSettings = {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  prefix: boolean;
  suffix: boolean;
  loading: boolean;
  disabled: boolean;
};

type InputSettings = {
  variant: InputVariant;
  size: ButtonSize;
  shape: ButtonShape;
  prefix: boolean;
  suffix: boolean;
  loading: boolean;
  invalid: boolean;
  clearable: boolean;
  disabled: boolean;
  readOnly: boolean;
};

type SelectSettings = {
  variant: SelectVariant;
  size: ButtonSize;
  shape: ButtonShape;
  prefix: boolean;
  suffix: boolean;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
};

type CheckboxSettings = {
  variant: CheckboxVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  checked: boolean;
  indeterminate: boolean;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
};

type ToggleSettings = {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  prefix: boolean;
  suffix: boolean;
  pressed: boolean;
  disabled: boolean;
};

type DialogSettings = {
  shape: ButtonShape;
  size: DialogSize;
};

type DrawerSettings = {
  backdrop: boolean;
  detached: boolean;
  shape: ButtonShape;
  side: DrawerSide;
  size: DialogSize;
};

type HeadingSettings = {
  size: HeadingSize;
  tone: HeadingTone;
  level: HeadingLevelOption;
};

type TextSettings = {
  size: TextSize;
  tone: TextTone;
  weight: TextWeight;
  as: TextAs;
};

type OverflowEdge = "top" | "right" | "bottom" | "left";

type ScrollOverflowState = Record<OverflowEdge, boolean>;

const emptyOverflowState = {
  top: false,
  right: false,
  bottom: false,
  left: false,
} satisfies ScrollOverflowState;

const scrollOverflowThreshold = 2;

const introIds = ["purpose", "principles"] as const;
const componentIds = [
  "button",
  "checkbox",
  "input",
  "select",
  "toggle",
  "dialog",
  "drawer",
  "heading",
  "text",
  "sound-provider",
] as const;
const docsPageIds = [...introIds, ...componentIds] as const;

const navGroups = [
  {
    title: "Introduction",
    items: [
      { label: "Purpose", page: "purpose" },
      { label: "Principles", page: "principles" },
    ],
  },
  {
    title: "Typography",
    items: [
      { label: "Heading", page: "heading" },
      { label: "Text", page: "text" },
      { label: "Code", page: "input" },
      { label: "Kbd", page: "input" },
      { label: "Prose", page: "input" },
      { label: "Blockquote", page: "input" },
      { label: "List", page: "input" },
    ],
  },
  {
    title: "Controls",
    items: [
      { label: "Button", page: "button" },
      { label: "Checkbox", page: "checkbox" },
      { label: "Input", page: "input" },
      { label: "Select", page: "select" },
      { label: "Toggle", page: "toggle" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Dialog", page: "dialog" },
      { label: "Drawer", page: "drawer" },
    ],
  },

  {
    title: "SFX",
    items: [{ label: "Sound Provider", page: "sound-provider" }],
  },
] as const satisfies readonly {
  title: string;
  items: readonly { label: string; page: DocsPage }[];
}[];

const buttonOptions = {
  variant: ["solid", "soft", "ghost", "outline"],
  size: ["micro", "tiny", "small", "medium", "large"],
  color: ["accent", "blue", "red", "amber", "neutral"],
  shape: ["square", "round"],
} as const;

const inputOptions = {
  variant: ["outline", "soft", "ghost"],
  size: buttonOptions.size,
  shape: buttonOptions.shape,
} as const;

const selectOptions = {
  variant: ["outline", "soft", "ghost"],
  size: buttonOptions.size,
  shape: buttonOptions.shape,
} as const;

const checkboxOptions = {
  variant: ["solid", "soft", "outline"],
  size: buttonOptions.size,
  color: buttonOptions.color,
  shape: buttonOptions.shape,
} as const;

const toggleOptions = {
  variant: buttonOptions.variant,
  size: buttonOptions.size,
  color: buttonOptions.color,
  shape: buttonOptions.shape,
} as const;

const dialogOptions = {
  shape: buttonOptions.shape,
  size: ["small", "medium", "large"],
} as const;

const drawerOptions = {
  shape: buttonOptions.shape,
  side: ["bottom", "right", "left", "top"],
  size: dialogOptions.size,
} as const;

const headingOptions = {
  size: ["display", "h1", "h2", "h3", "h4", "h5", "h6"],
  tone: ["default", "muted", "subtle", "accent"],
  level: ["1", "2", "3", "4", "5", "6"],
} as const;

const textOptions = {
  size: ["lg", "base", "sm", "xs"],
  tone: [
    "default",
    "muted",
    "subtle",
    "accent",
    "danger",
    "success",
    "warning",
  ],
  weight: ["normal", "medium", "semibold"],
  as: ["p", "span", "div"],
} as const;

const soundVariantOptions = ["soft", "click", "snap", "pop", "thock"] as const;

const registryBaseUrl = "https://aspekt.systems/r";

const componentCopy = {
  button: {
    title: "Button",
    description: "is used to initiate interactions.",
  },
  checkbox: {
    title: "Checkbox",
    description: "is used to select one or more options.",
  },
  input: {
    title: "Input",
    description: "is used to collect text.",
  },
  select: {
    title: "Select",
    description: "is used to choose one value from a menu.",
  },
  toggle: {
    title: "Toggle",
    description: "is used to toggle a value on or off.",
  },
  dialog: {
    title: "Dialog",
    description: "is used for focused decisions and short modal workflows.",
  },
  drawer: {
    title: "Drawer",
    description: "is used to reveal contextual content from an edge.",
  },
  heading: {
    title: "Heading",
    description: "is used to define the title of a section.",
  },
  text: {
    title: "Text",
    description: "is used to display text.",
  },
  "sound-provider": {
    title: "Sound Provider",
    description:
      "is an optional app-level controller for Aspekt UI interaction sound.",
  },
} satisfies Record<
  ComponentPreview,
  {
    title: string;
    description: string;
  }
>;

const componentImportExamples = {
  button: 'import { Button } from "@aspekt/ui/button";',
  checkbox: 'import { Checkbox } from "@aspekt/ui/checkbox";',
  input: 'import { Input } from "@aspekt/ui/input";',
  select: 'import { SelectRoot, SelectTrigger } from "@aspekt/ui/select";',
  toggle: 'import { Toggle } from "@aspekt/ui/toggle";',
  dialog: 'import { DialogRoot, DialogTrigger } from "@aspekt/ui/dialog";',
  drawer: 'import { DrawerRoot, DrawerTrigger } from "@aspekt/ui/drawer";',
  heading: 'import { Heading } from "@aspekt/ui/heading";',
  text: 'import { Text } from "@aspekt/ui/text";',
  "sound-provider":
    'import { SoundProvider, useSound } from "@aspekt/ui/sound-provider";',
} satisfies Record<ComponentPreview, string>;

const introCopy = {
  purpose: {
    title: "Purpose",
    description: "...",
  },
  principles: {
    title: "Principles",
    description: "...",
  },
} satisfies Record<
  IntroPage,
  {
    title: string;
    description: string;
  }
>;

const defaultButtonSettings = {
  variant: "solid",
  size: "medium",
  color: "neutral",
  shape: "square",
  prefix: false,
  suffix: false,
  loading: false,
  disabled: false,
} satisfies ButtonSettings;

const defaultInputSettings = {
  variant: "outline",
  size: "medium",
  shape: "square",
  prefix: true,
  suffix: false,
  loading: false,
  invalid: false,
  clearable: true,
  disabled: false,
  readOnly: false,
} satisfies InputSettings;

const defaultSelectSettings = {
  variant: "outline",
  size: "medium",
  shape: "square",
  prefix: true,
  suffix: false,
  invalid: false,
  disabled: false,
  readOnly: false,
} satisfies SelectSettings;

const defaultCheckboxSettings = {
  variant: "outline",
  size: "medium",
  color: "blue",
  shape: "square",
  checked: true,
  indeterminate: false,
  invalid: false,
  disabled: false,
  readOnly: false,
} satisfies CheckboxSettings;

const defaultToggleSettings = {
  variant: "soft",
  size: "medium",
  color: "blue",
  shape: "square",
  prefix: true,
  suffix: false,
  pressed: false,
  disabled: false,
} satisfies ToggleSettings;

const defaultDialogSettings = {
  shape: "round",
  size: "medium",
} satisfies DialogSettings;

const defaultDrawerSettings = {
  backdrop: true,
  detached: false,
  shape: "round",
  side: "bottom",
  size: "medium",
} satisfies DrawerSettings;

const defaultHeadingSettings = {
  size: "h1",
  tone: "default",
  level: "2",
} satisfies HeadingSettings;

const defaultTextSettings = {
  size: "base",
  tone: "default",
  weight: "normal",
  as: "p",
} satisfies TextSettings;

const selectPreviewItems = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "next" },
  { label: "Svelte", value: "svelte" },
  { label: "Vue", value: "vue" },
  { label: "Astro", value: "astro" },
] as const satisfies readonly {
  label: string;
  value: SelectPreviewValue;
}[];

const headingLevelValues = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
} satisfies Record<HeadingLevelOption, HeadingLevel>;

const buttonColorDots = {
  accent: "bg-orange-600",
  blue: "bg-blue-600",
  red: "bg-red-600",
  amber: "bg-amber-500",
  neutral: "bg-neutral-950 dark:bg-white",
} satisfies Record<ButtonColor, string>;

const buttonShortcutSuffixBackgrounds = {
  accent: "bg-primary/10",
  blue: "bg-blue-600/10",
  red: "bg-red-600/10",
  amber: "bg-amber-500/10",
  neutral: "bg-neutral-950/10 dark:bg-white/10",
} satisfies Record<ButtonColor, string>;

const solidButtonShortcutSuffixBackgrounds = {
  accent: "bg-black/15",
  blue: "bg-blue-700",
  red: "bg-red-700",
  amber: "bg-amber-600",
  neutral: "bg-neutral-900 dark:bg-neutral-950/10",
} satisfies Record<ButtonColor, string>;

function areOverflowStatesEqual(
  current: ScrollOverflowState,
  next: ScrollOverflowState,
) {
  return (
    current.top === next.top &&
    current.right === next.right &&
    current.bottom === next.bottom &&
    current.left === next.left
  );
}

function useScrollOverflow<TElement extends HTMLElement>() {
  const ref = React.useRef<TElement>(null);
  const [overflow, setOverflow] =
    React.useState<ScrollOverflowState>(emptyOverflowState);

  const updateOverflow = React.useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const maxScrollTop = element.scrollHeight - element.clientHeight;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    const nextOverflow = {
      top: element.scrollTop > scrollOverflowThreshold,
      right:
        maxScrollLeft - element.scrollLeft > scrollOverflowThreshold &&
        maxScrollLeft > scrollOverflowThreshold,
      bottom:
        maxScrollTop - element.scrollTop > scrollOverflowThreshold &&
        maxScrollTop > scrollOverflowThreshold,
      left: element.scrollLeft > scrollOverflowThreshold,
    } satisfies ScrollOverflowState;

    setOverflow((currentOverflow) =>
      areOverflowStatesEqual(currentOverflow, nextOverflow)
        ? currentOverflow
        : nextOverflow,
    );
  }, []);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrame = 0;
    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateOverflow);
    };

    requestUpdate();
    element.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(requestUpdate);
    resizeObserver?.observe(element);

    const mutationObserver =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(requestUpdate);
    mutationObserver?.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      element.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [updateOverflow]);

  return { ref, overflow };
}

function ProgressiveOverflowFade({
  edge,
  visible,
  className = "",
}: {
  edge: OverflowEdge;
  visible: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-edge={edge}
      className={[
        "progressive-overflow-fade",
        visible ? "opacity-100" : "opacity-0",
        className,
      ].join(" ")}
    />
  );
}

function Sidebar({
  activePage,
  onPageChange,
}: {
  activePage: DocsPage;
  onPageChange: (page: DocsPage) => void;
}) {
  const { ref: sidebarScrollRef, overflow } =
    useScrollOverflow<HTMLDivElement>();

  return (
    <aside className="relative w-full shrink-0 lg:sticky lg:top-0 lg:h-screen lg:w-72">
      <div
        ref={sidebarScrollRef}
        className="flex h-full flex-col px-6 py-8 sm:px-10 lg:overflow-y-auto lg:px-8 lg:py-18"
      >
        <div className="mb-16 flex items-center gap-2 select-none pointer-events-none">
          <span className="rounded-full text-lg leading-none text-neutral-600 dark:border-white/30 dark:text-neutral-300">
            aspekt.systems
          </span>
        </div>

        <nav
          className="flex flex-col gap-14"
          aria-label="Aspekt UI documentation"
        >
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-lg tracking-tight font-normal text-neutral-500 dark:text-neutral-400">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label} className="ml-2">
                    <button
                      type="button"
                      aria-current={
                        item.page === activePage ? "page" : undefined
                      }
                      onClick={() => onPageChange(item.page)}
                      className={[
                        "relative inline-flex text-left text-base leading-none outline-none transition-colors",
                        item.page === activePage
                          ? "font-medium text-foreground"
                          : "text-neutral-400 hover:text-foreground focus-visible:text-foreground dark:text-neutral-400",
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <ProgressiveOverflowFade edge="top" visible={overflow.top} />
      <ProgressiveOverflowFade edge="bottom" visible={overflow.bottom} />
    </aside>
  );
}

function ValueList({ values }: { values: readonly string[] }) {
  return (
    <p className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
      {values.map((value, index) => (
        <React.Fragment key={value}>
          {index > 0 && <span className="px-2 text-neutral-400">|</span>}
          <span>{value}</span>
        </React.Fragment>
      ))}
    </p>
  );
}

function SegmentedControl<T extends string>({
  values,
  active,
  dots,
  onValueChange,
}: {
  values: readonly T[];
  active: T;
  dots?: Partial<Record<T, string>>;
  onValueChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex min-h-9 max-w-full items-center gap-1 rounded-lg bg-neutral-100 p-1 text-sm text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
      {values.map((value) => (
        <button
          key={value}
          type="button"
          aria-label={dots ? value : undefined}
          aria-pressed={value === active}
          onClick={() => onValueChange(value)}
          className={[
            "inline-flex h-7 min-w-8 items-center justify-center rounded-md px-3 font-medium transition-colors",
            value === active
              ? "bg-white text-neutral-950 shadow-sm dark:bg-white dark:text-neutral-950"
              : "hover:text-neutral-950 dark:hover:text-white",
            dots ? "px-2" : "",
          ].join(" ")}
        >
          {dots?.[value] ? (
            <span
              className={`size-2 rounded-full ${dots[value]}`}
              aria-hidden="true"
            />
          ) : (
            value
          )}
        </button>
      ))}
    </div>
  );
}

function OptionRow<T extends string>({
  label,
  values,
  active,
  dots,
  onValueChange,
}: {
  label: string;
  values: readonly T[];
  active: T;
  dots?: Partial<Record<T, string>>;
  onValueChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <h2 className="text-sm font-semibold text-foreground">{label}</h2>
        <ValueList values={values} />
      </div>
      <SegmentedControl
        values={values}
        active={active}
        dots={dots}
        onValueChange={onValueChange}
      />
    </div>
  );
}

function BooleanOptionRow({
  label,
  checked,
  onCheckedChange,
  typeLabel = "boolean",
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  typeLabel?: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <h2 className="text-sm font-semibold text-foreground">{label}</h2>
        <p className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
          {typeLabel}
        </p>
      </div>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={`Toggle ${label}`}
        className="relative inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md bg-neutral-100 text-white outline-none transition-colors data-[checked]:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-600/30 dark:bg-white/10"
      >
        {checked && (
          <span className="absolute h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-white" />
        )}
      </Switch.Root>
    </div>
  );
}

function ShowcaseButton(props: React.ComponentProps<typeof Button>) {
  return <Button type="button" {...props} />;
}

function ButtonShortcutSuffix({
  color,
  variant,
}: {
  color: ButtonColor;
  variant: ButtonVariant;
}) {
  const keyClassName = [
    "inline-flex size-5 items-center justify-center rounded-md text-xs leading-none",
    variant === "solid"
      ? solidButtonShortcutSuffixBackgrounds[color]
      : buttonShortcutSuffixBackgrounds[color],
  ].join(" ");

  return (
    <span className="inline-flex items-center gap-0.5">
      <span className={keyClassName}>⌘</span>
      <span className={keyClassName}>K</span>
    </span>
  );
}

function ButtonShowcaseRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-max grid-cols-5 items-center gap-x-4 gap-y-3">
      {children}
    </div>
  );
}

function ButtonColorShowcase({ color }: { color: ButtonColor }) {
  const { ref: showcaseScrollRef, overflow } =
    useScrollOverflow<HTMLDivElement>();

  return (
    <section className="relative border-t border-neutral-200 pt-8 first:border-t-0 first:pt-0 dark:border-white/15">
      <div ref={showcaseScrollRef} className="overflow-x-auto">
        <div className="grid w-max gap-4">
          {buttonOptions.shape.map((shape) => (
            <React.Fragment key={`${color}-${shape}`}>
              {buttonOptions.variant.map((variant) => (
                <ButtonShowcaseRow key={`${color}-${shape}-${variant}-compose`}>
                  {buttonOptions.size.map((size) => (
                    <ShowcaseButton
                      key={`${color}-${shape}-${variant}-${size}-compose`}
                      variant={variant}
                      color={color}
                      size={size}
                      shape={shape}
                    >
                      Compose
                    </ShowcaseButton>
                  ))}
                </ButtonShowcaseRow>
              ))}

              <div className="h-3" />

              {buttonOptions.variant.map((variant) => (
                <ButtonShowcaseRow key={`${color}-${shape}-${variant}-search`}>
                  {buttonOptions.size.map((size) => (
                    <ShowcaseButton
                      key={`${color}-${shape}-${variant}-${size}-search`}
                      variant={variant}
                      color={color}
                      size={size}
                      shape={shape}
                      prefix={<MagnifyingGlassIcon />}
                      suffix={<PlusCircleIcon />}
                    >
                      Search
                    </ShowcaseButton>
                  ))}
                </ButtonShowcaseRow>
              ))}

              <div className="h-3" />

              {buttonOptions.variant.map((variant) => (
                <ButtonShowcaseRow
                  key={`${color}-${shape}-${variant}-shortcut`}
                >
                  {buttonOptions.size.map((size) => (
                    <ShowcaseButton
                      key={`${color}-${shape}-${variant}-${size}-shortcut`}
                      variant={variant}
                      color={color}
                      size={size}
                      shape={shape}
                      prefix={<MagnifyingGlassIcon />}
                      suffix={
                        <ButtonShortcutSuffix color={color} variant={variant} />
                      }
                    >
                      Search
                    </ShowcaseButton>
                  ))}
                </ButtonShowcaseRow>
              ))}

              {shape === "square" && <div className="h-6" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <ProgressiveOverflowFade edge="left" visible={overflow.left} />
      <ProgressiveOverflowFade edge="right" visible={overflow.right} />
    </section>
  );
}

function ButtonVariationShowcase() {
  return (
    <div className="mt-4 grid gap-10 border-t border-neutral-200 pt-10 dark:border-white/15">
      {buttonOptions.color.map((color) => (
        <ButtonColorShowcase key={color} color={color} />
      ))}
    </div>
  );
}

function InstallCommands({
  activeComponent,
}: {
  activeComponent: ComponentPreview;
}) {
  const activeLabel = componentCopy[activeComponent].title;
  const packageCommand = "npm install @aspekt/ui";
  const importCommand = componentImportExamples[activeComponent];
  const registryCommand = `pnpm dlx shadcn@latest add ${registryBaseUrl}/${activeComponent}.json`;

  return (
    <div className="mb-12 grid gap-2 rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/15 dark:bg-neutral-900">
      <div className="text-sm font-medium text-foreground">{activeLabel}</div>
      <pre className="overflow-x-auto rounded-md bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
        <code>{packageCommand}</code>
      </pre>
      <pre className="overflow-x-auto rounded-md bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
        <code>{importCommand}</code>
      </pre>
      <pre className="overflow-x-auto rounded-md bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
        <code>{registryCommand}</code>
      </pre>
    </div>
  );
}

const soundProviderRootExample = `
import { SoundProvider } from "@aspekt/ui/sound-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SoundProvider enabled variant="soft" volume={0.8}>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
`;

const useSoundExample = `
import { useSound } from "@aspekt/ui/sound-provider";

export function SoundSettings() {
  const variants = ["soft", "click", "snap", "pop", "thock"] as const;
  const { enabled, setEnabled, variant, setVariant, volume, setVolume, play } =
    useSound();

  return (
    <div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Disable" : "Enable"} sound
      </button>
      <input
        min={0}
        max={1}
        step={0.05}
        type="range"
        value={volume}
        onChange={(event) => setVolume(Number(event.currentTarget.value))}
      />
      <button
        onClick={() => {
          const index = variants.indexOf(variant);
          setVariant(variants[(index + 1) % variants.length]);
        }}
      >
        Use next sound variant
      </button>
      <button onClick={() => play("success")}>Preview</button>
    </div>
  );
}
`;

const dialogExample = `
import { Button } from "@aspekt/ui/button";
import {
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
} from "@aspekt/ui/dialog";

export function ExampleDialog() {
  return (
    <DialogRoot shape="round">
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish component</DialogTitle>
            <DialogDescription>
              This will update the public registry JSON for this component.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button color="neutral">Publish</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
`;

const drawerExample = `
import { Button } from "@aspekt/ui/button";
import {
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@aspekt/ui/drawer";

export function ExampleDrawer() {
  return (
    <DrawerRoot backdrop={false} detached shape="round" side="right">
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerViewport>
          <DrawerContent>
            <DrawerBody>
              <DrawerHeader>
                <DrawerTitle>Component details</DrawerTitle>
                <DrawerDescription>
                  Review registry metadata before publishing.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>Cancel</DrawerClose>
                <Button color="neutral">Save</Button>
              </DrawerFooter>
            </DrawerBody>
          </DrawerContent>
        </DrawerViewport>
      </DrawerPortal>
    </DrawerRoot>
  );
}
`;

function isComponentPreview(value: string): value is ComponentPreview {
  return (componentIds as readonly string[]).includes(value);
}

function isIntroPage(value: string): value is IntroPage {
  return (introIds as readonly string[]).includes(value);
}

function isDocsPage(value: string): value is DocsPage {
  return (docsPageIds as readonly string[]).includes(value);
}

function getDocsPageCopy(page: DocsPage) {
  return isComponentPreview(page) ? componentCopy[page] : introCopy[page];
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-neutral-50 px-4 py-3 font-mono text-sm leading-6 text-neutral-700 dark:bg-white/5 dark:text-neutral-300">
      <code>{children.trim()}</code>
    </pre>
  );
}

function SoundProviderControls() {
  const { enabled, variant, volume, setEnabled, setVariant, setVolume, play } =
    useSound();

  return (
    <div className="grid w-full max-w-md gap-6 px-6">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-white/15">
          <div>
            <h2 className="text-sm font-semibold text-foreground">enabled</h2>
            <p className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
              {String(enabled)}
            </p>
          </div>
          <Switch.Root
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Toggle interaction sound"
            className="relative inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md bg-neutral-200 text-white outline-none transition-colors data-[checked]:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-600/30 dark:bg-white/10"
          >
            {enabled && (
              <span className="absolute h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-white" />
            )}
          </Switch.Root>
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-white/15">
          <div>
            <h2 className="text-sm font-semibold text-foreground">variant</h2>
            <ValueList values={soundVariantOptions} />
          </div>
          <SegmentedControl
            values={soundVariantOptions}
            active={variant}
            onValueChange={setVariant}
          />
        </div>

        <label className="grid gap-3 border-b border-neutral-200 pb-4 dark:border-white/15">
          <span>
            <span className="block text-sm font-semibold text-foreground">
              volume
            </span>
            <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
              {volume.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => setVolume(Number(event.currentTarget.value))}
            className="h-2 w-full cursor-pointer accent-orange-600"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          color="neutral"
          sound={false}
          onClick={() => play("success")}
        >
          Play success
        </Button>
        <Button
          type="button"
          color="red"
          variant="outline"
          sound={false}
          onClick={() => play("error")}
        >
          Play error
        </Button>
      </div>
    </div>
  );
}
function HeadingPreview({ settings }: { settings: HeadingSettings }) {
  return (
    <div className="px-6 text-center">
      <Heading
        size={settings.size}
        tone={settings.tone}
        level={headingLevelValues[settings.level]}
        className="max-w-2xl"
      >
        Build interfaces with intention
      </Heading>
    </div>
  );
}

function CheckboxPreview({
  settings,
  onCheckedChange,
}: {
  settings: CheckboxSettings;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={[
        "inline-flex items-center gap-3 px-6 text-sm font-medium text-foreground",
        settings.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      ].join(" ")}
    >
      <Checkbox
        checked={settings.checked}
        onCheckedChange={onCheckedChange}
        indeterminate={settings.indeterminate}
        variant={settings.variant}
        color={settings.color}
        size={settings.size}
        shape={settings.shape}
        invalid={settings.invalid}
        disabled={settings.disabled}
        readOnly={settings.readOnly}
      />
      Receive product updates
    </label>
  );
}

function TogglePreview({
  settings,
  onPressedChange,
}: {
  settings: ToggleSettings;
  onPressedChange: (pressed: boolean) => void;
}) {
  return (
    <div className="px-6">
      <Toggle
        pressed={settings.pressed}
        onPressedChange={onPressedChange}
        variant={settings.variant}
        color={settings.color}
        size={settings.size}
        shape={settings.shape}
        prefix={settings.prefix ? <StackIcon /> : undefined}
        suffix={
          settings.suffix ? (settings.pressed ? "On" : "Off") : undefined
        }
        disabled={settings.disabled}
      >
        Toggle me
      </Toggle>
    </div>
  );
}

function TextPreview({ settings }: { settings: TextSettings }) {
  return (
    <Text
      as={settings.as}
      size={settings.size}
      tone={settings.tone}
      weight={settings.weight}
      className="block max-w-xl px-6"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet
      purus eu mattis placerat. Etiam massa mi, congue sed tellus eget,
      imperdiet eleifend nulla. Donec ex lacus, ultricies ac magna eu, accumsan
      suscipit justo. Maecenas consectetur lorem ex, et congue mi maximus et.
      Proin sed efficitur sapien. Vestibulum volutpat, odio sollicitudin lacinia
      porta, lectus elit hendrerit magna, eget tempus felis justo sed magna.
    </Text>
  );
}

function SelectPreview({
  settings,
  value,
  onValueChange,
}: {
  settings: SelectSettings;
  value: SelectPreviewValue;
  onValueChange: (value: SelectPreviewValue) => void;
}) {
  return (
    <SelectRoot
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue) {
          onValueChange(nextValue);
        }
      }}
      items={selectPreviewItems}
      size={settings.size}
      shape={settings.shape}
      disabled={settings.disabled}
      readOnly={settings.readOnly}
    >
      <SelectTrigger
        aria-label="Preview select"
        variant={settings.variant}
        invalid={settings.invalid}
        prefix={settings.prefix ? <StackIcon /> : undefined}
        suffix={settings.suffix ? "UI" : undefined}
        className="max-w-xs"
      />
      <SelectPortal>
        <SelectPositioner>
          <SelectPopup>
            <SelectScrollUpArrow />
            <SelectList>
              {selectPreviewItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectList>
            <SelectScrollDownArrow />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </SelectRoot>
  );
}

function SoundProviderPreview() {
  return (
    <SoundProvider enabled variant="soft" volume={0.8}>
      <SoundProviderControls />
    </SoundProvider>
  );
}

function SoundProviderDocumentation() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-3 border-t border-neutral-200 pt-8 dark:border-white/15">
        <h2 className="text-sm font-semibold text-foreground">optional</h2>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Aspekt UI sounds are enabled by default and components can play them
          without a provider. Add SoundProvider when you want one global place
          to disable sound, choose a sound variant, tune volume, or trigger
          sounds from your own UI.
        </p>
      </section>

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold text-foreground">wrap your app</h2>
        <CodeBlock>{soundProviderRootExample}</CodeBlock>
      </section>

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold text-foreground">useSound</h2>
        <CodeBlock>{useSoundExample}</CodeBlock>
      </section>
    </div>
  );
}

function DialogPreview({ settings }: { settings: DialogSettings }) {
  return (
    <DialogRoot shape={settings.shape}>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent size={settings.size}>
          <DialogHeader>
            <DialogTitle>Publish component</DialogTitle>
            <DialogDescription>
              This updates the hosted registry JSON and makes the latest source
              available through the install command.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-500 dark:border-white/15 dark:bg-white/5 dark:text-neutral-300">
            https://aspekt.systems/r/dialog.json
          </div>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button type="button" color="neutral">
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}

function DrawerPreview({ settings }: { settings: DrawerSettings }) {
  return (
    <DrawerRoot
      backdrop={settings.backdrop}
      detached={settings.detached}
      shape={settings.shape}
      side={settings.side}
    >
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerViewport>
          <DrawerContent size={settings.size}>
            <DrawerBody>
              <DrawerHeader>
                <DrawerTitle>Review registry item</DrawerTitle>
                <DrawerDescription>
                  Confirm the public install target before publishing the
                  component.
                </DrawerDescription>
              </DrawerHeader>

              <div className="grid gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm dark:border-white/15 dark:bg-white/5">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    component
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-foreground">
                    drawer
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    target
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-foreground">
                    components/aspekt/drawer.tsx
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    install
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-foreground">
                    /r/drawer.json
                  </span>
                </div>
              </div>

              <DrawerFooter>
                <DrawerClose>Cancel</DrawerClose>
                <Button type="button" color="neutral">
                  Save
                </Button>
              </DrawerFooter>
            </DrawerBody>
          </DrawerContent>
        </DrawerViewport>
      </DrawerPortal>
    </DrawerRoot>
  );
}

function DialogDocumentation() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-3 border-t border-neutral-200 pt-8 dark:border-white/15">
        <h2 className="text-sm font-semibold text-foreground">
          base ui primitive
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Dialog is built on Base UI primitives and styled for Aspekt. It
          includes portal rendering, backdrop dismissal, escape key dismissal,
          focus management, and the same default interaction sound model as the
          rest of Aspekt UI.
        </p>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          DialogTrigger and DialogClose compose Aspekt Button, so button
          variants, colors, sizes, loading state, affixes, and sound overrides
          stay consistent with the rest of the library.
        </p>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Pass shape to DialogRoot to control the dialog surface, DialogTrigger,
          DialogClose, and Aspekt Buttons rendered inside the dialog. Individual
          children can still override shape directly.
        </p>
      </section>

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold text-foreground">usage</h2>
        <CodeBlock>{dialogExample}</CodeBlock>
      </section>
    </div>
  );
}

function DrawerDocumentation() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-3 border-t border-neutral-200 pt-8 dark:border-white/15">
        <h2 className="text-sm font-semibold text-foreground">
          base ui primitive
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Drawer is built on Base UI primitives and styled for Aspekt. It
          includes portal rendering, backdrop dismissal, escape key dismissal,
          focus management, swipe-to-dismiss gestures, and the same interaction
          sound model as the rest of Aspekt UI.
        </p>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          DrawerViewport wraps the moving panel so Base UI can manage swipe
          movement and touch scroll locking. DrawerBody maps to Base UI
          Drawer.Content for selectable and scrollable drawer content.
        </p>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Pass side, backdrop, detached, shape, and size to control the drawer
          edge, dimming, spacing, and surface. DrawerTrigger and DrawerClose
          compose Aspekt Button, so variants, sizes, loading state, affixes,
          and sound overrides stay consistent.
        </p>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Keep DrawerOverlay in the portal when you want outside-click
          dismissal. Setting backdrop to false keeps that layer transparent
          instead of rendering the dark dim.
        </p>
      </section>

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold text-foreground">usage</h2>
        <CodeBlock>{drawerExample}</CodeBlock>
      </section>
    </div>
  );
}

const principles = [
  {
    title: "Feedback belongs to the interface",
    body: "Aspekt treats sound as part of interaction design, not as an afterthought. Visual feedback stays primary, and short optional audio cues can make successful actions, errors, and state changes easier to feel.",
  },
  {
    title: "Install only what you use",
    body: "Every component is published through focused package exports. Consumers can import Button, Dialog, Input, or Sound Provider independently without pulling a full component catalog into a bundle.",
  },
  {
    title: "Use the package",
    body: "Aspekt is a normal npm package first. Install @aspekt/ui, then use the focused component exports wherever the app needs them. Component imports load the shared stylesheet automatically.",
  },
  {
    title: "Respect existing projects",
    body: "The compatibility registry still installs into components/aspekt, so teams that prefer source-owned components can keep that workflow beside an existing shadcn/ui setup.",
  },
] as const;

function PurposeDocumentation() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-3 border-t border-neutral-200 pt-8 dark:border-white/15">
        <h2 className="text-sm font-semibold text-foreground">why aspekt</h2>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          ...
        </p>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          ...
        </p>
      </section>

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold text-foreground">
          what it is for
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Use Aspekt when you want expressive but practical UI primitives,
          namespaced safely inside your project, with interaction sounds enabled
          by default and configurable globally when your app needs it.
        </p>
      </section>
    </div>
  );
}

function PrinciplesDocumentation() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-3 border-t border-neutral-200 pt-8 dark:border-white/15">
        <h2 className="text-sm font-semibold text-foreground">principles</h2>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          ...{" "}
        </p>
      </section>

      <section className="grid gap-6">
        {principles.map((principle) => (
          <div
            key={principle.title}
            className="grid gap-2 border-t border-neutral-200 pt-5 dark:border-white/15"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {principle.title}
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              {principle.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

function IntroDocumentation({ activePage }: { activePage: IntroPage }) {
  return activePage === "purpose" ? (
    <PurposeDocumentation />
  ) : (
    <PrinciplesDocumentation />
  );
}

export default function Home() {
  const [buttonSettings, setButtonSettings] = React.useState<ButtonSettings>(
    defaultButtonSettings,
  );
  const [checkboxSettings, setCheckboxSettings] =
    React.useState<CheckboxSettings>(defaultCheckboxSettings);
  const [inputSettings, setInputSettings] =
    React.useState<InputSettings>(defaultInputSettings);
  const [selectSettings, setSelectSettings] = React.useState<SelectSettings>(
    defaultSelectSettings,
  );
  const [toggleSettings, setToggleSettings] = React.useState<ToggleSettings>(
    defaultToggleSettings,
  );
  const [dialogSettings, setDialogSettings] = React.useState<DialogSettings>(
    defaultDialogSettings,
  );
  const [drawerSettings, setDrawerSettings] = React.useState<DrawerSettings>(
    defaultDrawerSettings,
  );
  const [headingSettings, setHeadingSettings] = React.useState<HeadingSettings>(
    defaultHeadingSettings,
  );
  const [textSettings, setTextSettings] =
    React.useState<TextSettings>(defaultTextSettings);
  const [inputValue, setInputValue] = React.useState("Search components");
  const [selectValue, setSelectValue] =
    React.useState<SelectPreviewValue>("react");
  const [activePage, setActivePage] = React.useState<DocsPage>("purpose");
  const fakeLoadingTimeoutRef = React.useRef<number | null>(null);
  const { ref: previewScrollRef, overflow: previewOverflow } =
    useScrollOverflow<HTMLElement>();
  const activeComponent = isComponentPreview(activePage) ? activePage : null;
  const activeIntroPage = isIntroPage(activePage) ? activePage : null;
  const pageCopy = getDocsPageCopy(activePage);

  React.useEffect(() => {
    return () => {
      if (fakeLoadingTimeoutRef.current) {
        window.clearTimeout(fakeLoadingTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    function syncPageFromHash() {
      const hash = window.location.hash.slice(1);

      if (isDocsPage(hash)) {
        setActivePage(hash);
      }
    }

    syncPageFromHash();
    window.addEventListener("hashchange", syncPageFromHash);

    return () => {
      window.removeEventListener("hashchange", syncPageFromHash);
    };
  }, []);

  function navigateToPage(page: DocsPage) {
    setActivePage(page);
    window.history.replaceState(null, "", `#${page}`);
  }

  function setButtonLoading(loading: boolean) {
    if (fakeLoadingTimeoutRef.current) {
      window.clearTimeout(fakeLoadingTimeoutRef.current);
      fakeLoadingTimeoutRef.current = null;
    }

    setButtonSettings((settings) => ({ ...settings, loading }));
  }

  function triggerFakeLoading() {
    setButtonSettings((settings) => ({ ...settings, loading: true }));

    if (fakeLoadingTimeoutRef.current) {
      window.clearTimeout(fakeLoadingTimeoutRef.current);
    }

    fakeLoadingTimeoutRef.current = window.setTimeout(() => {
      fakeLoadingTimeoutRef.current = null;
      setButtonSettings((settings) => ({ ...settings, loading: false }));
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <Sidebar activePage={activePage} onPageChange={navigateToPage} />

        <div className="relative min-w-0 flex-1 lg:h-screen">
          <section
            ref={previewScrollRef}
            id={activePage}
            className="flex min-w-0 flex-1 flex-col px-6 pb-16 pt-4 sm:px-10 lg:h-full lg:overflow-y-auto lg:px-12 lg:py-18"
          >
            <div className="mb-14 ">
              <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
                <span className=" text-foreground">{pageCopy.title}</span>{" "}
                {pageCopy.description}
              </p>
            </div>

            {activeComponent ? (
              <>
                <div className="relative mb-12 flex min-h-80 items-center justify-center overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900/70 sm:min-h-96 lg:min-h-[30rem]">
                  {activeComponent === "button" ? (
                    <Button
                      variant={buttonSettings.variant}
                      color={buttonSettings.color}
                      size={buttonSettings.size}
                      shape={buttonSettings.shape}
                      prefix={
                        buttonSettings.prefix ? <PlusCircleIcon /> : undefined
                      }
                      suffix={
                        buttonSettings.suffix ? <ArrowRightIcon /> : undefined
                      }
                      loading={buttonSettings.loading}
                      disabled={buttonSettings.disabled}
                      onClick={triggerFakeLoading}
                    >
                      Click me
                    </Button>
                  ) : activeComponent === "checkbox" ? (
                    <CheckboxPreview
                      settings={checkboxSettings}
                      onCheckedChange={(checked) =>
                        setCheckboxSettings((settings) => ({
                          ...settings,
                          checked,
                          indeterminate: false,
                        }))
                      }
                    />
                  ) : activeComponent === "input" ? (
                    <Input
                      aria-label="Preview input"
                      value={inputValue}
                      onChange={(event) =>
                        setInputValue(event.currentTarget.value)
                      }
                      onClear={() => setInputValue("")}
                      placeholder="Type something"
                      variant={inputSettings.variant}
                      size={inputSettings.size}
                      shape={inputSettings.shape}
                      prefix={
                        inputSettings.prefix ? (
                          <MagnifyingGlassIcon />
                        ) : undefined
                      }
                      suffix={inputSettings.suffix ? "USD" : undefined}
                      loading={inputSettings.loading}
                      invalid={inputSettings.invalid}
                      clearable={inputSettings.clearable}
                      disabled={inputSettings.disabled}
                      readOnly={inputSettings.readOnly}
                      className="max-w-xs"
                    />
                  ) : activeComponent === "select" ? (
                    <SelectPreview
                      settings={selectSettings}
                      value={selectValue}
                      onValueChange={setSelectValue}
                    />
                  ) : activeComponent === "toggle" ? (
                    <TogglePreview
                      settings={toggleSettings}
                      onPressedChange={(pressed) =>
                        setToggleSettings((settings) => ({
                          ...settings,
                          pressed,
                        }))
                      }
                    />
                  ) : activeComponent === "dialog" ? (
                    <DialogPreview settings={dialogSettings} />
                  ) : activeComponent === "drawer" ? (
                    <DrawerPreview settings={drawerSettings} />
                  ) : activeComponent === "heading" ? (
                    <HeadingPreview settings={headingSettings} />
                  ) : activeComponent === "text" ? (
                    <TextPreview settings={textSettings} />
                  ) : (
                    <SoundProviderPreview />
                  )}
                </div>

                <InstallCommands activeComponent={activeComponent} />
              </>
            ) : (
              activeIntroPage && (
                <IntroDocumentation activePage={activeIntroPage} />
              )
            )}

            {activeComponent === "button" && (
              <div className="grid gap-8">
                <OptionRow
                  label="variant"
                  values={buttonOptions.variant}
                  active={buttonSettings.variant}
                  onValueChange={(variant) =>
                    setButtonSettings((settings) => ({ ...settings, variant }))
                  }
                />

                <OptionRow
                  label="size"
                  values={buttonOptions.size}
                  active={buttonSettings.size}
                  onValueChange={(size) =>
                    setButtonSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="color"
                  values={buttonOptions.color}
                  active={buttonSettings.color}
                  dots={buttonColorDots}
                  onValueChange={(color) =>
                    setButtonSettings((settings) => ({ ...settings, color }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={buttonOptions.shape}
                  active={buttonSettings.shape}
                  onValueChange={(shape) =>
                    setButtonSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <BooleanOptionRow
                  label="prefix"
                  checked={buttonSettings.prefix}
                  typeLabel="ReactNode"
                  onCheckedChange={(prefix) =>
                    setButtonSettings((settings) => ({ ...settings, prefix }))
                  }
                />

                <BooleanOptionRow
                  label="suffix"
                  checked={buttonSettings.suffix}
                  typeLabel="ReactNode"
                  onCheckedChange={(suffix) =>
                    setButtonSettings((settings) => ({ ...settings, suffix }))
                  }
                />

                <BooleanOptionRow
                  label="loading"
                  checked={buttonSettings.loading}
                  onCheckedChange={setButtonLoading}
                />

                <BooleanOptionRow
                  label="disabled"
                  checked={buttonSettings.disabled}
                  onCheckedChange={(disabled) =>
                    setButtonSettings((settings) => ({ ...settings, disabled }))
                  }
                />

                <ButtonVariationShowcase />
              </div>
            )}

            {activeComponent === "checkbox" && (
              <div className="grid gap-8">
                <OptionRow
                  label="variant"
                  values={checkboxOptions.variant}
                  active={checkboxSettings.variant}
                  onValueChange={(variant) =>
                    setCheckboxSettings((settings) => ({
                      ...settings,
                      variant,
                    }))
                  }
                />

                <OptionRow
                  label="size"
                  values={checkboxOptions.size}
                  active={checkboxSettings.size}
                  onValueChange={(size) =>
                    setCheckboxSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="color"
                  values={checkboxOptions.color}
                  active={checkboxSettings.color}
                  dots={buttonColorDots}
                  onValueChange={(color) =>
                    setCheckboxSettings((settings) => ({ ...settings, color }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={checkboxOptions.shape}
                  active={checkboxSettings.shape}
                  onValueChange={(shape) =>
                    setCheckboxSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <BooleanOptionRow
                  label="checked"
                  checked={checkboxSettings.checked}
                  onCheckedChange={(checked) =>
                    setCheckboxSettings((settings) => ({
                      ...settings,
                      checked,
                      indeterminate: false,
                    }))
                  }
                />

                <BooleanOptionRow
                  label="indeterminate"
                  checked={checkboxSettings.indeterminate}
                  onCheckedChange={(indeterminate) =>
                    setCheckboxSettings((settings) => ({
                      ...settings,
                      indeterminate,
                    }))
                  }
                />

                <BooleanOptionRow
                  label="invalid"
                  checked={checkboxSettings.invalid}
                  onCheckedChange={(invalid) =>
                    setCheckboxSettings((settings) => ({ ...settings, invalid }))
                  }
                />

                <BooleanOptionRow
                  label="disabled"
                  checked={checkboxSettings.disabled}
                  onCheckedChange={(disabled) =>
                    setCheckboxSettings((settings) => ({
                      ...settings,
                      disabled,
                    }))
                  }
                />

                <BooleanOptionRow
                  label="readOnly"
                  checked={checkboxSettings.readOnly}
                  onCheckedChange={(readOnly) =>
                    setCheckboxSettings((settings) => ({
                      ...settings,
                      readOnly,
                    }))
                  }
                />
              </div>
            )}

            {activeComponent === "input" && (
              <div className="grid gap-8">
                <OptionRow
                  label="variant"
                  values={inputOptions.variant}
                  active={inputSettings.variant}
                  onValueChange={(variant) =>
                    setInputSettings((settings) => ({ ...settings, variant }))
                  }
                />

                <OptionRow
                  label="size"
                  values={inputOptions.size}
                  active={inputSettings.size}
                  onValueChange={(size) =>
                    setInputSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={inputOptions.shape}
                  active={inputSettings.shape}
                  onValueChange={(shape) =>
                    setInputSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <BooleanOptionRow
                  label="prefix"
                  checked={inputSettings.prefix}
                  typeLabel="ReactNode"
                  onCheckedChange={(prefix) =>
                    setInputSettings((settings) => ({ ...settings, prefix }))
                  }
                />

                <BooleanOptionRow
                  label="suffix"
                  checked={inputSettings.suffix}
                  typeLabel="ReactNode"
                  onCheckedChange={(suffix) =>
                    setInputSettings((settings) => ({ ...settings, suffix }))
                  }
                />

                <BooleanOptionRow
                  label="loading"
                  checked={inputSettings.loading}
                  onCheckedChange={(loading) =>
                    setInputSettings((settings) => ({ ...settings, loading }))
                  }
                />

                <BooleanOptionRow
                  label="invalid"
                  checked={inputSettings.invalid}
                  onCheckedChange={(invalid) =>
                    setInputSettings((settings) => ({ ...settings, invalid }))
                  }
                />

                <BooleanOptionRow
                  label="clearable"
                  checked={inputSettings.clearable}
                  onCheckedChange={(clearable) =>
                    setInputSettings((settings) => ({ ...settings, clearable }))
                  }
                />

                <BooleanOptionRow
                  label="disabled"
                  checked={inputSettings.disabled}
                  onCheckedChange={(disabled) =>
                    setInputSettings((settings) => ({ ...settings, disabled }))
                  }
                />

                <BooleanOptionRow
                  label="readOnly"
                  checked={inputSettings.readOnly}
                  onCheckedChange={(readOnly) =>
                    setInputSettings((settings) => ({ ...settings, readOnly }))
                  }
                />
              </div>
            )}

            {activeComponent === "select" && (
              <div className="grid gap-8">
                <OptionRow
                  label="variant"
                  values={selectOptions.variant}
                  active={selectSettings.variant}
                  onValueChange={(variant) =>
                    setSelectSettings((settings) => ({ ...settings, variant }))
                  }
                />

                <OptionRow
                  label="size"
                  values={selectOptions.size}
                  active={selectSettings.size}
                  onValueChange={(size) =>
                    setSelectSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={selectOptions.shape}
                  active={selectSettings.shape}
                  onValueChange={(shape) =>
                    setSelectSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <BooleanOptionRow
                  label="prefix"
                  checked={selectSettings.prefix}
                  typeLabel="ReactNode"
                  onCheckedChange={(prefix) =>
                    setSelectSettings((settings) => ({ ...settings, prefix }))
                  }
                />

                <BooleanOptionRow
                  label="suffix"
                  checked={selectSettings.suffix}
                  typeLabel="ReactNode"
                  onCheckedChange={(suffix) =>
                    setSelectSettings((settings) => ({ ...settings, suffix }))
                  }
                />

                <BooleanOptionRow
                  label="invalid"
                  checked={selectSettings.invalid}
                  onCheckedChange={(invalid) =>
                    setSelectSettings((settings) => ({ ...settings, invalid }))
                  }
                />

                <BooleanOptionRow
                  label="disabled"
                  checked={selectSettings.disabled}
                  onCheckedChange={(disabled) =>
                    setSelectSettings((settings) => ({ ...settings, disabled }))
                  }
                />

                <BooleanOptionRow
                  label="readOnly"
                  checked={selectSettings.readOnly}
                  onCheckedChange={(readOnly) =>
                    setSelectSettings((settings) => ({ ...settings, readOnly }))
                  }
                />
              </div>
            )}

            {activeComponent === "toggle" && (
              <div className="grid gap-8">
                <OptionRow
                  label="variant"
                  values={toggleOptions.variant}
                  active={toggleSettings.variant}
                  onValueChange={(variant) =>
                    setToggleSettings((settings) => ({ ...settings, variant }))
                  }
                />

                <OptionRow
                  label="size"
                  values={toggleOptions.size}
                  active={toggleSettings.size}
                  onValueChange={(size) =>
                    setToggleSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="color"
                  values={toggleOptions.color}
                  active={toggleSettings.color}
                  dots={buttonColorDots}
                  onValueChange={(color) =>
                    setToggleSettings((settings) => ({ ...settings, color }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={toggleOptions.shape}
                  active={toggleSettings.shape}
                  onValueChange={(shape) =>
                    setToggleSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <BooleanOptionRow
                  label="prefix"
                  checked={toggleSettings.prefix}
                  typeLabel="ReactNode"
                  onCheckedChange={(prefix) =>
                    setToggleSettings((settings) => ({ ...settings, prefix }))
                  }
                />

                <BooleanOptionRow
                  label="suffix"
                  checked={toggleSettings.suffix}
                  typeLabel="ReactNode"
                  onCheckedChange={(suffix) =>
                    setToggleSettings((settings) => ({ ...settings, suffix }))
                  }
                />

                <BooleanOptionRow
                  label="pressed"
                  checked={toggleSettings.pressed}
                  onCheckedChange={(pressed) =>
                    setToggleSettings((settings) => ({ ...settings, pressed }))
                  }
                />

                <BooleanOptionRow
                  label="disabled"
                  checked={toggleSettings.disabled}
                  onCheckedChange={(disabled) =>
                    setToggleSettings((settings) => ({ ...settings, disabled }))
                  }
                />
              </div>
            )}

            {activeComponent === "dialog" && (
              <div className="mb-12 grid gap-8">
                <OptionRow
                  label="shape"
                  values={dialogOptions.shape}
                  active={dialogSettings.shape}
                  onValueChange={(shape) =>
                    setDialogSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <OptionRow
                  label="size"
                  values={dialogOptions.size}
                  active={dialogSettings.size}
                  onValueChange={(size) =>
                    setDialogSettings((settings) => ({ ...settings, size }))
                  }
                />
              </div>
            )}

            {activeComponent === "drawer" && (
              <div className="mb-12 grid gap-8">
                <OptionRow
                  label="side"
                  values={drawerOptions.side}
                  active={drawerSettings.side}
                  onValueChange={(side) =>
                    setDrawerSettings((settings) => ({ ...settings, side }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={drawerOptions.shape}
                  active={drawerSettings.shape}
                  onValueChange={(shape) =>
                    setDrawerSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <BooleanOptionRow
                  label="backdrop"
                  checked={drawerSettings.backdrop}
                  onCheckedChange={(backdrop) =>
                    setDrawerSettings((settings) => ({
                      ...settings,
                      backdrop,
                    }))
                  }
                />

                <BooleanOptionRow
                  label="detached"
                  checked={drawerSettings.detached}
                  onCheckedChange={(detached) =>
                    setDrawerSettings((settings) => ({
                      ...settings,
                      detached,
                    }))
                  }
                />

                <OptionRow
                  label="size"
                  values={drawerOptions.size}
                  active={drawerSettings.size}
                  onValueChange={(size) =>
                    setDrawerSettings((settings) => ({ ...settings, size }))
                  }
                />
              </div>
            )}

            {activeComponent === "heading" && (
              <div className="grid gap-8">
                <OptionRow
                  label="size"
                  values={headingOptions.size}
                  active={headingSettings.size}
                  onValueChange={(size) =>
                    setHeadingSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="tone"
                  values={headingOptions.tone}
                  active={headingSettings.tone}
                  onValueChange={(tone) =>
                    setHeadingSettings((settings) => ({ ...settings, tone }))
                  }
                />

                <OptionRow
                  label="level"
                  values={headingOptions.level}
                  active={headingSettings.level}
                  onValueChange={(level) =>
                    setHeadingSettings((settings) => ({ ...settings, level }))
                  }
                />
              </div>
            )}

            {activeComponent === "text" && (
              <div className="grid gap-8">
                <OptionRow
                  label="size"
                  values={textOptions.size}
                  active={textSettings.size}
                  onValueChange={(size) =>
                    setTextSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="tone"
                  values={textOptions.tone}
                  active={textSettings.tone}
                  onValueChange={(tone) =>
                    setTextSettings((settings) => ({ ...settings, tone }))
                  }
                />

                <OptionRow
                  label="weight"
                  values={textOptions.weight}
                  active={textSettings.weight}
                  onValueChange={(weight) =>
                    setTextSettings((settings) => ({ ...settings, weight }))
                  }
                />

                <OptionRow
                  label="as"
                  values={textOptions.as}
                  active={textSettings.as}
                  onValueChange={(as) =>
                    setTextSettings((settings) => ({ ...settings, as }))
                  }
                />
              </div>
            )}

            {activeComponent === "dialog" && <DialogDocumentation />}

            {activeComponent === "drawer" && <DrawerDocumentation />}

            {activeComponent === "sound-provider" && (
              <SoundProviderDocumentation />
            )}
          </section>
          <ProgressiveOverflowFade edge="top" visible={previewOverflow.top} />
          <ProgressiveOverflowFade
            edge="bottom"
            visible={previewOverflow.bottom}
          />
        </div>
      </div>
    </main>
  );
}
