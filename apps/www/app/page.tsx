"use client";

import { Button } from "@aspekt/ui/button";
import { Input } from "@aspekt/ui/input";
import { Switch } from "@base-ui/react/switch";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";
import * as React from "react";

type ComponentPreview = "button" | "input";
type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";
type ButtonColor = "accent" | "blue" | "red" | "amber" | "neutral";
type ButtonShape = "square" | "round";
type InputVariant = "outline" | "soft" | "ghost";

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

type OverflowEdge = "top" | "right" | "bottom" | "left";

type ScrollOverflowState = Record<OverflowEdge, boolean>;

const emptyOverflowState = {
  top: false,
  right: false,
  bottom: false,
  left: false,
} satisfies ScrollOverflowState;

const scrollOverflowThreshold = 2;

const navGroups = [
  {
    title: "Controls",
    items: [
      { label: "Button", component: "button" },
      { label: "Input", component: "input" },
    ],
  },
] as const;

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

const registryBaseUrl = "https://aspekt.systems/r";

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
  activeComponent,
  onComponentChange,
}: {
  activeComponent: ComponentPreview;
  onComponentChange: (component: ComponentPreview) => void;
}) {
  const { ref: sidebarScrollRef, overflow } =
    useScrollOverflow<HTMLDivElement>();

  return (
    <aside className="relative w-full shrink-0 lg:sticky lg:top-0 lg:h-screen lg:w-72">
      <div
        ref={sidebarScrollRef}
        className="flex h-full flex-col px-6 py-8 sm:px-10 lg:overflow-y-auto lg:px-8 lg:py-18"
      >
        <div className="mb-16 flex items-center gap-2">
          <span className="rounded-full text-base leading-none text-neutral-600 dark:border-white/30 dark:text-neutral-300">
            aspekt.systems
          </span>
        </div>

        <nav className="flex flex-col gap-14" aria-label="Component library">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-current={
                        item.component === activeComponent ? "page" : undefined
                      }
                      onClick={() => onComponentChange(item.component)}
                      className={[
                        "relative inline-flex text-left text-base leading-none outline-none transition-colors",
                        item.component === activeComponent
                          ? "font-medium text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-600"
                          : "text-neutral-500 hover:text-foreground focus-visible:text-foreground dark:text-neutral-400",
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
  const activeLabel = activeComponent === "button" ? "Button" : "Input";
  const command = `pnpm dlx shadcn@latest add ${registryBaseUrl}/${activeComponent}.json`;

  return (
    <div className="mb-12 grid gap-2 rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/15 dark:bg-neutral-900">
      <div className="text-sm font-medium text-foreground">{activeLabel}</div>
      <pre className="overflow-x-auto rounded-md bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
        <code>{command}</code>
      </pre>
    </div>
  );
}

export default function Home() {
  const [buttonSettings, setButtonSettings] = React.useState<ButtonSettings>(
    defaultButtonSettings,
  );
  const [inputSettings, setInputSettings] =
    React.useState<InputSettings>(defaultInputSettings);
  const [inputValue, setInputValue] = React.useState("Search components");
  const [activeComponent, setActiveComponent] =
    React.useState<ComponentPreview>("button");
  const fakeLoadingTimeoutRef = React.useRef<number | null>(null);
  const { ref: previewScrollRef, overflow: previewOverflow } =
    useScrollOverflow<HTMLElement>();

  React.useEffect(() => {
    return () => {
      if (fakeLoadingTimeoutRef.current) {
        window.clearTimeout(fakeLoadingTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    function syncComponentFromHash() {
      const hash = window.location.hash.slice(1);

      if (hash === "button" || hash === "input") {
        setActiveComponent(hash);
      }
    }

    syncComponentFromHash();
    window.addEventListener("hashchange", syncComponentFromHash);

    return () => {
      window.removeEventListener("hashchange", syncComponentFromHash);
    };
  }, []);

  function navigateToComponent(component: ComponentPreview) {
    setActiveComponent(component);
    window.history.replaceState(null, "", `#${component}`);
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
        <Sidebar
          activeComponent={activeComponent}
          onComponentChange={navigateToComponent}
        />

        <div className="relative min-w-0 flex-1 lg:h-screen">
          <section
            ref={previewScrollRef}
            id={activeComponent}
            className="flex min-w-0 flex-1 flex-col px-6 pb-16 pt-4 sm:px-10 lg:h-full lg:overflow-y-auto lg:px-12 lg:py-18"
          >
            <div className="mb-14">
              <p className="max-w-xl text-base text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-foreground">
                  {activeComponent === "button" ? "Button" : "Input"}
                </span>{" "}
                is used to{" "}
                {activeComponent === "button"
                  ? "initiate interactions."
                  : "collect text."}
              </p>
            </div>

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
              ) : (
                <Input
                  aria-label="Preview input"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.currentTarget.value)}
                  onClear={() => setInputValue("")}
                  placeholder="Type something"
                  variant={inputSettings.variant}
                  size={inputSettings.size}
                  shape={inputSettings.shape}
                  prefix={
                    inputSettings.prefix ? <MagnifyingGlassIcon /> : undefined
                  }
                  suffix={inputSettings.suffix ? "USD" : undefined}
                  loading={inputSettings.loading}
                  invalid={inputSettings.invalid}
                  clearable={inputSettings.clearable}
                  disabled={inputSettings.disabled}
                  readOnly={inputSettings.readOnly}
                  className="max-w-xs"
                />
              )}
            </div>

            <InstallCommands activeComponent={activeComponent} />

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
