"use client";

import { Avatar } from "@aspekt/components-source/avatar";
import {
  AppTabsList,
  AppTabsPanel,
  AppTabsRoot,
  type AppTabsTabData,
  useAppTabs,
} from "@aspekt/components-source/app-tabs";
import { AspectRatio } from "@aspekt/components-source/aspect-ratio";
import { Button } from "@aspekt/components-source/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@aspekt/components-source/card";
import { Checkbox } from "@aspekt/components-source/checkbox";
import { Code } from "@aspekt/components-source/code";
import { Blockquote } from "@aspekt/components-source/blockquote";
import {
  ComboboxClear,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxTrigger,
} from "@aspekt/components-source/combobox";
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
} from "@aspekt/components-source/dialog";
import {
  DockBar,
  DockButton,
  DockMenu,
  DockMenuItem,
  DockPanel,
  DockPanelContent,
  DockPanelDescription,
  DockPanelHeader,
  DockPanelTitle,
  DockRoot,
  DockSeparator,
  DockTrigger,
} from "@aspekt/components-source/dock";
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
} from "@aspekt/components-source/drawer";
import {
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@aspekt/components-source/popover";
import { ScrollArea } from "@aspekt/components-source/scroll-area";
import { Heading } from "@aspekt/components-source/heading";
import { Kbd } from "@aspekt/components-source/kbd";
import { List, ListItem } from "@aspekt/components-source/list";
import { Prose } from "@aspekt/components-source/prose";
import { Text } from "@aspekt/components-source/text";

import { Input } from "@aspekt/components-source/input";
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
} from "@aspekt/components-source/select";
import {
  Sidebar as ComponentSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarInsetContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarRoot,
  SidebarSection,
  SidebarSectionLabel,
  SidebarSeparator,
  SidebarTrigger,
} from "@aspekt/components-source/sidebar";
import { InlineSlider } from "@aspekt/components-source/inline-slider";
import { Slider } from "@aspekt/components-source/slider";
import { Snippet } from "@aspekt/components-source/snippet";
import {
  SoundProvider,
  soundDepths,
  type SoundDepth,
  useSound,
} from "@aspekt/components-source/sound-provider";
import {
  Surface,
  SurfaceProvider,
  surfaceLevels,
} from "@aspekt/components-source/surface";
import { Switch } from "@aspekt/components-source/switch";
import {
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTab,
} from "@aspekt/components-source/tabs";
import { Table, type TableColumnDef } from "@aspekt/components-source/table";
import { Toggle } from "@aspekt/components-source/toggle";
import {
  toast,
  toastPositions,
  Toaster,
  type ToastPosition,
} from "@aspekt/components-source/toast";
import {
  ArrowRightIcon,
  ListIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  StackIcon,
  XIcon,
} from "@phosphor-icons/react";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

type IntroPage = "getting-started" | "principles";
type FoundationPage = "typography" | "surfaces" | "colors" | "sonification";
type UtilityPage = "scroll-fade" | "shimmer";
type ApiPage = "avatar-api" | "icon-api";
type ComponentPreview =
  | "app-tabs"
  | "aspect-ratio"
  | "scroll-area"
  | "avatar"
  | "button"
  | "card"
  | "checkbox"
  | "input"
  | "select"
  | "combobox"
  | "slider"
  | "inline-slider"
  | "switch"
  | "toggle"
  | "dialog"
  | "dock"
  | "drawer"
  | "popover"
  | "sidebar"
  | "toast"
  | "tabs"
  | "table"
  | "snippet"
  | "heading"
  | "text"
  | "code"
  | "kbd"
  | "prose"
  | "blockquote"
  | "list";

type TypographyPrimitive = Extract<
  ComponentPreview,
  "heading" | "text" | "code" | "kbd" | "prose" | "blockquote" | "list"
>;

type DocsPage =
  | IntroPage
  | FoundationPage
  | UtilityPage
  | ApiPage
  | ComponentPreview;
type DocsAppProps = {
  initialPage?: DocsPage;
};
type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";
type ButtonColor = "accent" | "info" | "destructive" | "warning" | "neutral";
type ButtonShape = "square" | "round";
type DialogSize = "small" | "medium" | "large";
type DrawerSide = "top" | "right" | "bottom" | "left";
type PopoverSide = "top" | "right" | "bottom" | "left";
type DockBarSize = "small" | "medium" | "large";
type DockPreviewPanel = "menu" | "create" | "closed";
type TabsVariant = "line" | "soft" | "outline";
type TabsOrientation = "horizontal" | "vertical";
type TableVariant = "outline" | "soft" | "ghost";
type TableSize = "compact" | "medium" | "large";
type ScrollAreaVariant = "outline" | "soft" | "ghost";
type ScrollAreaSize = "small" | "medium" | "large";
type ScrollAreaAxis = "vertical" | "horizontal";
type CardVariant = "outline" | "soft" | "ghost";
type CardSize = "small" | "medium" | "large";
type InputVariant = "outline" | "soft" | "ghost";
type SelectVariant = "outline" | "soft" | "ghost";
type ComboboxVariant = "outline" | "soft" | "ghost";
type CheckboxVariant = "solid" | "soft" | "outline";
type SliderVariant = "solid" | "soft" | "outline";
type SwitchVariant = "solid" | "soft" | "outline";
type SelectPreviewValue = "react" | "next" | "svelte" | "vue" | "astro";
type ComboboxPreviewValue = "React" | "Next.js" | "Svelte" | "Vue" | "Astro";
type ToastMaxToasts = "1" | "3" | "6" | "9";
type ToastType = "default" | "success" | "destructive" | "warning" | "info";
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
  | "destructive"
  | "success"
  | "warning";
type TextWeight = "normal" | "medium" | "semibold";
type TextAs = "p" | "span" | "div";
type CodeVariant = "inline" | "block";
type CodeTone =
  | "default"
  | "muted"
  | "accent"
  | "destructive"
  | "success"
  | "warning";
type KbdVariant = "outline" | "soft";
type KbdSize = "sm" | "base" | "lg";
type ProseSize = "sm" | "base" | "lg";
type ProseTone = "default" | "muted";
type BlockquoteSize = "sm" | "base" | "lg";
type BlockquoteTone = CodeTone;
type ListVariant = "disc" | "decimal" | "none";
type ListSize = "sm" | "base" | "lg";
type ListSpacing = "tight" | "normal" | "loose";
type ListTone = "default" | "muted" | "subtle";
type SnippetLanguageOption = "tsx" | "bash" | "json" | "css" | "html";
type SnippetVariant = "outline" | "soft";
type ButtonStatusOption = "none" | "success" | "fail";
type AvatarSize = "micro" | "tiny" | "small" | "medium" | "large";
type AvatarShape = "square" | "round";
type AvatarApiSizeOption = "32" | "64" | "128" | "256" | "512";
type AvatarApiRadiusOption = "none" | "8" | "24" | "full";
type IconApiSizeOption = "32" | "64" | "128" | "256" | "512";
type AvatarApiSettings = {
  initials: boolean;
  radius: AvatarApiRadiusOption;
  seed: string;
  size: AvatarApiSizeOption;
  variant: string;
};
type IconApiSettings = {
  size: IconApiSizeOption;
  target: string;
};
type AvatarApiEndpoint = {
  method: string;
  path: string;
  description: string;
  example: string;
};
type IconApiEndpoint = AvatarApiEndpoint;
type AvatarApiVariantDoc = {
  name: string;
  description: string;
  default_for_legacy_seed_urls?: boolean;
};
type AvatarApiDocs = {
  name: string;
  description: string;
  base_url: string;
  response_type: string;
  docs: string;
  endpoints: AvatarApiEndpoint[];
  variants: AvatarApiVariantDoc[];
  examples: string[];
};
type IconApiDocs = {
  name: string;
  description: string;
  base_url: string;
  response_type: string;
  docs: string;
  endpoints: IconApiEndpoint[];
  examples: string[];
};
type AspectRatioValue = "1:1" | "4:3" | "16:9" | "21:9";
type AppTabsVariant = "soft" | "outline" | "line";
type AppTabsSize = "small" | "medium" | "large";
type AppTabsColor = ButtonColor;
type AppTabsShape = ButtonShape;
type SidebarVariant = "solid" | "soft" | "floating" | "inset";
type SidebarSide = "left" | "right";

type ButtonSettings = {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  prefix: boolean;
  suffix: boolean;
  loading: boolean;
  status: ButtonStatusOption;
  disabled: boolean;
};

type CardSettings = {
  variant: CardVariant;
  size: CardSize;
  shape: ButtonShape;
};

type AvatarSettings = {
  image: boolean;
  shape: AvatarShape;
  size: AvatarSize;
};

type AspectRatioSettings = {
  ratio: AspectRatioValue;
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

type ComboboxSettings = {
  variant: ComboboxVariant;
  size: ButtonSize;
  shape: ButtonShape;
  prefix: boolean;
  clearable: boolean;
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

type SwitchSettings = {
  variant: SwitchVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  checked: boolean;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
};

type SliderSettings = {
  variant: SliderVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  value: number;
  showValue: boolean;
  invalid: boolean;
  disabled: boolean;
};
type InlineSliderSettings = SliderSettings;

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

type PopoverSettings = {
  arrow: boolean;
  modal: boolean;
  shape: ButtonShape;
  side: PopoverSide;
  size: DialogSize;
};

type DockSettings = {
  panel: DockPreviewPanel;
  shape: ButtonShape;
  size: DockBarSize;
};

type ToastSettings = {
  action: boolean;
  autoClose: boolean;
  colorful: boolean;
  maxToasts: ToastMaxToasts;
  position: ToastPosition;
  shape: ButtonShape;
  type: ToastType;
};

type TabsSettings = {
  variant: TabsVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  orientation: TabsOrientation;
  indicator: boolean;
  activateOnFocus: boolean;
};

type AppTabsSettings = {
  variant: AppTabsVariant;
  size: AppTabsSize;
  color: AppTabsColor;
  shape: AppTabsShape;
};

type TableSettings = {
  variant: TableVariant;
  size: TableSize;
  shape: ButtonShape;
  striped: boolean;
  hoverable: boolean;
  sortable: boolean;
  stickyHeader: boolean;
  showColumnBorders: boolean;
};

type ScrollAreaSettings = {
  axis: ScrollAreaAxis;
  fade: boolean;
  shape: ButtonShape;
  size: ScrollAreaSize;
  variant: ScrollAreaVariant;
};

type SidebarSettings = {
  collapsible: boolean;
  open: boolean;
  side: SidebarSide;
  variant: SidebarVariant;
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

type CodeSettings = {
  copyable: boolean;
  variant: CodeVariant;
  tone: CodeTone;
};

type KbdSettings = {
  variant: KbdVariant;
  size: KbdSize;
  shape: ButtonShape;
};

type ProseSettings = {
  size: ProseSize;
  tone: ProseTone;
};

type BlockquoteSettings = {
  size: BlockquoteSize;
  tone: BlockquoteTone;
};

type ListSettings = {
  variant: ListVariant;
  size: ListSize;
  spacing: ListSpacing;
  tone: ListTone;
};

type SnippetSettings = {
  copyable: boolean;
  filename: boolean;
  language: SnippetLanguageOption;
  shape: ButtonShape;
  showLineNumbers: boolean;
  variant: SnippetVariant;
  wrap: boolean;
};

type OverflowEdge = "top" | "right" | "bottom" | "left";

type ScrollOverflowState = Record<OverflowEdge, boolean>;

type UseScrollOverflowOptions = {
  initialOverflow?: Partial<ScrollOverflowState>;
};

const emptyOverflowState = {
  top: false,
  right: false,
  bottom: false,
  left: false,
} satisfies ScrollOverflowState;

const initialBottomOverflowState = {
  ...emptyOverflowState,
  bottom: true,
} satisfies ScrollOverflowState;

const scrollOverflowThreshold = 2;
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

function useDebouncedValue<TValue>(value: TValue, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delayMs, value]);

  return debouncedValue;
}

const introIds = ["getting-started", "principles"] as const;
const foundationIds = [
  "typography",
  "surfaces",
  "colors",
  "sonification",
] as const;
const utilityIds = ["scroll-fade", "shimmer"] as const;
const apiIds = ["avatar-api", "icon-api"] as const;
const typographyPrimitiveIds = [
  "heading",
  "text",
  "code",
  "kbd",
  "prose",
  "blockquote",
  "list",
] as const satisfies readonly TypographyPrimitive[];
const componentIds = [
  "app-tabs",
  "aspect-ratio",
  "scroll-area",
  "avatar",
  "button",
  "card",
  "checkbox",
  "input",
  "select",
  "combobox",
  "slider",
  "inline-slider",
  "switch",
  "toggle",
  "dialog",
  "dock",
  "drawer",
  "popover",
  "sidebar",
  "toast",
  "tabs",
  "table",
  "snippet",
  "heading",
  "text",
  "code",
  "kbd",
  "prose",
  "blockquote",
  "list",
] as const;
const docsComponentIds = [
  "app-tabs",
  "aspect-ratio",
  "scroll-area",
  "avatar",
  "card",
  "button",
  "checkbox",
  "input",
  "select",
  "combobox",
  "slider",
  "inline-slider",
  "switch",
  "toggle",
  "dialog",
  "dock",
  "drawer",
  "popover",
  "sidebar",
  "toast",
  "tabs",
  "table",
  "snippet",
] as const;
const docsPageIds = [
  ...introIds,
  ...foundationIds,
  ...utilityIds,
  ...apiIds,
  ...docsComponentIds,
] as const;

const navGroups = [
  {
    title: "Introduction",
    items: [
      { label: "Getting started", page: "getting-started" },
      { label: "Principles", page: "principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { label: "Typography", page: "typography" },
      { label: "Surfaces", page: "surfaces" },
      { label: "Colors", page: "colors" },
      { label: "Sonification", page: "sonification" },
    ],
  },
  {
    title: "Controls",
    items: [
      { label: "Button", page: "button" },
      { label: "Checkbox", page: "checkbox" },
      { label: "Input", page: "input" },
      { label: "Select", page: "select" },
      { label: "Combobox", page: "combobox" },
      { label: "Slider", page: "slider" },
      { label: "Inline Slider", page: "inline-slider" },
      { label: "Switch", page: "switch" },
      { label: "Toggle", page: "toggle" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Aspect Ratio", page: "aspect-ratio" },
      { label: "Scroll Area", page: "scroll-area" },
      { label: "Avatar", page: "avatar" },
      { label: "Card", page: "card" },
      { label: "Dialog", page: "dialog" },
      { label: "Dock", page: "dock" },
      { label: "Drawer", page: "drawer" },
      { label: "Popover", page: "popover" },
      { label: "Sidebar", page: "sidebar" },
      { label: "App Tabs", page: "app-tabs" },
      { label: "Toast", page: "toast" },
      { label: "Tabs", page: "tabs" },
      { label: "Table", page: "table" },
      { label: "Snippet", page: "snippet" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { label: "Scroll Fade", page: "scroll-fade" },
      { label: "Shimmer", page: "shimmer" },
    ],
  },
  {
    title: "APIs",
    items: [
      { label: "Avatar API", page: "avatar-api" },
      { label: "Icon API", page: "icon-api" },
    ],
  },
] as const satisfies readonly {
  title: string;
  items: readonly { label: string; page: DocsPage }[];
}[];

const buttonOptions = {
  variant: ["solid", "soft", "ghost", "outline"],
  size: ["micro", "tiny", "small", "medium", "large"],
  color: ["accent", "info", "destructive", "warning", "neutral"],
  shape: ["square", "round"],
  status: ["none", "success", "fail"],
} as const;

const avatarOptions = {
  size: ["micro", "tiny", "small", "medium", "large"],
  shape: ["square", "round"],
} as const;

const aspectRatioOptions = {
  ratio: ["1:1", "4:3", "16:9", "21:9"],
} as const;

const cardOptions = {
  variant: ["outline", "soft", "ghost"],
  size: ["small", "medium", "large"],
  shape: buttonOptions.shape,
} as const;

const aspectRatioValues = {
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "21:9": 21 / 9,
} satisfies Record<AspectRatioValue, number>;

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

const comboboxOptions = {
  variant: inputOptions.variant,
  size: buttonOptions.size,
  shape: buttonOptions.shape,
} as const;

const checkboxOptions = {
  variant: ["solid", "soft", "outline"],
  size: buttonOptions.size,
  color: buttonOptions.color,
  shape: buttonOptions.shape,
} as const;

const switchOptions = {
  variant: checkboxOptions.variant,
  size: buttonOptions.size,
  color: buttonOptions.color,
  shape: buttonOptions.shape,
} as const;

const sliderOptions = {
  variant: checkboxOptions.variant,
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

const popoverOptions = {
  shape: buttonOptions.shape,
  side: ["bottom", "right", "left", "top"],
  size: dialogOptions.size,
} as const;

const dockOptions = {
  panel: ["menu", "create", "closed"],
  shape: buttonOptions.shape,
  size: ["small", "medium", "large"],
} as const;

const toastOptions = {
  maxToasts: ["1", "3", "6", "9"],
  position: toastPositions,
  shape: buttonOptions.shape,
  type: ["default", "success", "destructive", "warning", "info"],
} as const;

const tabsOptions = {
  variant: ["line", "soft", "outline"],
  size: buttonOptions.size,
  color: buttonOptions.color,
  shape: buttonOptions.shape,
  orientation: ["horizontal", "vertical"],
} as const;

const appTabsOptions = {
  variant: ["soft", "outline", "line"],
  size: ["small", "medium", "large"],
  color: buttonOptions.color,
  shape: buttonOptions.shape,
} as const;

const tableOptions = {
  variant: ["outline", "soft", "ghost"],
  size: ["compact", "medium", "large"],
  shape: buttonOptions.shape,
} as const;

const scrollAreaOptions = {
  axis: ["vertical", "horizontal"],
  variant: ["outline", "soft", "ghost"],
  size: ["small", "medium", "large"],
  shape: buttonOptions.shape,
} as const;

const sidebarOptions = {
  variant: ["solid", "soft", "floating", "inset"],
  side: ["left", "right"],
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
    "destructive",
    "success",
    "warning",
  ],
  weight: ["normal", "medium", "semibold"],
  as: ["p", "span", "div"],
} as const;

const codeOptions = {
  variant: ["inline", "block"],
  tone: ["default", "muted", "accent", "destructive", "success", "warning"],
} as const;

const kbdOptions = {
  variant: ["outline", "soft"],
  size: ["sm", "base", "lg"],
  shape: buttonOptions.shape,
} as const;

const proseOptions = {
  size: ["sm", "base", "lg"],
  tone: ["default", "muted"],
} as const;

const blockquoteOptions = {
  size: ["sm", "base", "lg"],
  tone: codeOptions.tone,
} as const;

const listOptions = {
  variant: ["disc", "decimal", "none"],
  size: ["sm", "base", "lg"],
  spacing: ["tight", "normal", "loose"],
  tone: ["default", "muted", "subtle"],
} as const;

const snippetOptions = {
  language: ["tsx", "bash", "json", "css", "html"],
  shape: buttonOptions.shape,
  variant: ["outline", "soft"],
} as const;

const soundVariantOptions = ["soft", "click", "snap", "pop", "thock"] as const;

const sliderFeedbackSound = { change: "change", commit: false } as const;
const sliderMinuteFormat = {
  style: "unit",
  unit: "minute",
  unitDisplay: "short",
} satisfies Intl.NumberFormatOptions;

const soundDepthCopy = {
  interactions: {
    label: "interactions",
    description:
      "direct input sounds such as pressing a button, focusing a field, opening a layer, or toggling a control.",
  },
  cues: {
    label: "cues",
    description:
      "semantic result sounds such as success and error, even when they are triggered from component state.",
  },
  feedback: {
    label: "feedback",
    description:
      "continuous control response. Today this powers Slider value changes with adaptive ticks that stay detailed on small ranges and sparse on dense ones.",
  },
} satisfies Record<
  SoundDepth,
  {
    label: string;
    description: string;
  }
>;

const componentCopy = {
  "app-tabs": {
    title: "App Tabs",
    description:
      "is used to keep open application pages mounted while switching between them.",
  },
  "aspect-ratio": {
    title: "Aspect Ratio",
    description: "is used to preserve proportional media and embeds.",
  },
  "scroll-area": {
    title: "Scroll Area",
    description:
      "is used to contain overflow with custom scrollbars and edge fades.",
  },
  avatar: {
    title: "Avatar",
    description: "is used to identify people, teams, and entities.",
  },
  card: {
    title: "Card",
    description: "is used to group related content and actions.",
  },
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
  combobox: {
    title: "Combobox",
    description: "is used to search and choose from suggested values.",
  },
  slider: {
    title: "Slider",
    description: "is used to select a value from a range.",
  },
  "inline-slider": {
    title: "Inline Slider",
    description:
      "is used to adjust a compact labeled value from inside the control surface.",
  },
  switch: {
    title: "Switch",
    description: "is used to turn a setting on or off.",
  },
  toggle: {
    title: "Toggle",
    description: "is used to toggle a value on or off.",
  },
  dialog: {
    title: "Dialog",
    description: "is used for focused decisions and short modal workflows.",
  },
  dock: {
    title: "Dock",
    description:
      "is used for mobile-first navigation actions and expandable menus.",
  },
  drawer: {
    title: "Drawer",
    description: "is used to reveal contextual content from an edge.",
  },
  popover: {
    title: "Popover",
    description: "is used to reveal anchored contextual content.",
  },
  sidebar: {
    title: "Sidebar",
    description: "is used to frame persistent application navigation.",
  },
  toast: {
    title: "Toast",
    description: "is used to display brief status messages.",
  },
  tabs: {
    title: "Tabs",
    description: "is used to switch between related panels.",
  },
  table: {
    title: "Table",
    description: "is used to scan, compare, and sort structured data.",
  },
  snippet: {
    title: "Snippet",
    description: "is used to display formatted code examples.",
  },
  heading: {
    title: "Heading",
    description: "is used to define the title of a section.",
  },
  text: {
    title: "Text",
    description: "is used to display text.",
  },
  code: {
    title: "Code",
    description: "is used to display inline code and code blocks.",
  },
  kbd: {
    title: "Kbd",
    description: "is used to show keyboard input.",
  },
  prose: {
    title: "Prose",
    description: "is used to format long-form rich text.",
  },
  blockquote: {
    title: "Blockquote",
    description: "is used to quote supporting commentary.",
  },
  list: {
    title: "List",
    description: "is used to group related content.",
  },
} satisfies Record<
  ComponentPreview,
  {
    title: string;
    description: string;
  }
>;

const componentImportExamples = {
  "aspect-ratio":
    'import { AspectRatio } from "@/components/aspekt/aspect-ratio";',
  "scroll-area":
    'import { ScrollArea } from "@/components/aspekt/scroll-area";',
  avatar: 'import { Avatar } from "@/components/aspekt/avatar";',
  card: `import { Button } from "@/components/aspekt/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/aspekt/card";
import { Input } from "@/components/aspekt/input";`,
  button: 'import { Button } from "@/components/aspekt/button";',
  checkbox: 'import { Checkbox } from "@/components/aspekt/checkbox";',
  input: 'import { Input } from "@/components/aspekt/input";',
  select:
    'import { SelectRoot, SelectTrigger } from "@/components/aspekt/select";',
  combobox:
    'import { ComboboxRoot, ComboboxInput } from "@/components/aspekt/combobox";',
  slider: 'import { Slider } from "@/components/aspekt/slider";',
  "inline-slider":
    'import { InlineSlider } from "@/components/aspekt/inline-slider";',
  switch: 'import { Switch } from "@/components/aspekt/switch";',
  toggle: 'import { Toggle } from "@/components/aspekt/toggle";',
  dialog:
    'import { DialogRoot, DialogTrigger } from "@/components/aspekt/dialog";',
  dock: `import {
  DockBar,
  DockButton,
  DockMenu,
  DockMenuItem,
  DockPanel,
  DockPanelContent,
  DockPanelDescription,
  DockPanelHeader,
  DockPanelTitle,
  DockRoot,
  DockSeparator,
  DockTrigger,
} from "@/components/aspekt/dock";`,
  drawer:
    'import { DrawerRoot, DrawerTrigger } from "@/components/aspekt/drawer";',
  popover:
    'import { PopoverRoot, PopoverTrigger } from "@/components/aspekt/popover";',
  "app-tabs": `import {
  AppTabsList,
  AppTabsPanel,
  AppTabsRoot,
} from "@/components/aspekt/app-tabs";`,
  sidebar: `import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarInsetContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRoot,
  SidebarSection,
  SidebarSectionLabel,
} from "@/components/aspekt/sidebar";`,
  toast: 'import { toast, Toaster } from "@/components/aspekt/toast";',
  tabs: 'import { TabsRoot, TabsList, TabsTab, TabsPanel, TabsIndicator } from "@/components/aspekt/tabs";',
  table:
    'import { Table, type TableColumnDef } from "@/components/aspekt/table";',
  snippet: 'import { Snippet } from "@/components/aspekt/snippet";',
  heading: 'import { Heading } from "@/components/aspekt/heading";',
  text: 'import { Text } from "@/components/aspekt/text";',
  code: 'import { Code } from "@/components/aspekt/code";',
  kbd: 'import { Kbd } from "@/components/aspekt/kbd";',
  prose: 'import { Prose } from "@/components/aspekt/prose";',
  blockquote: 'import { Blockquote } from "@/components/aspekt/blockquote";',
  list: 'import { List, ListItem } from "@/components/aspekt/list";',
} satisfies Record<ComponentPreview, string>;

const avatarApiBaseUrl = "https://avatar.aspekt.systems";
const avatarApiDocsUrl = `${avatarApiBaseUrl}/docs.json?aspekt=docs`;
const avatarApiDocsFetchUrl = "/api/avatar-docs";
const avatarApiUsername = "aspekt_systems";
const avatarApiSizeOptions = ["32", "64", "128", "256", "512"] as const;
const avatarApiRadiusOptions = ["none", "8", "24", "full"] as const;
const iconApiBaseUrl = "https://icon.aspekt.systems";
const iconApiDocsUrl = `${iconApiBaseUrl}/docs.json?aspekt=docs`;
const iconApiDefaultTarget = "www.aspekt.systems";
const iconApiSizeOptions = ["32", "64", "128", "256", "512"] as const;
const fallbackAvatarApiDocs = {
  name: "Aspekt Avatar API",
  description: "Generate deterministic SVG avatars from a URL seed.",
  base_url: avatarApiBaseUrl,
  response_type: "image/svg+xml; charset=utf-8",
  docs: avatarApiDocsUrl,
  endpoints: [
    {
      method: "GET",
      path: "/:seed",
      description:
        "Generate the default solid avatar for a seed. Initials are shown by default on legacy seed URLs.",
      example: `${avatarApiBaseUrl}/mira-slate`,
    },
    {
      method: "GET",
      path: "/:variant/:seed",
      description:
        "Generate an avatar with an explicit variant. Initials are hidden by default unless the initials query parameter is enabled.",
      example: `${avatarApiBaseUrl}/gradient/nova-river?size=256&radius=full&initials=true`,
    },
  ],
  variants: [
    {
      name: "solid",
      description: "Flat background color with optional initials.",
      default_for_legacy_seed_urls: true,
    },
    {
      name: "gradient",
      description: "Soft abstract gradient shapes generated from the seed.",
    },
    {
      name: "grid",
      description: "Seeded 8 by 8 tile pattern.",
    },
  ],
  examples: [
    `${avatarApiBaseUrl}/mira-slate`,
    `${avatarApiBaseUrl}/solid/nova-river?initials=false`,
    `${avatarApiBaseUrl}/gradient/nova-river?size=256&radius=full`,
    `${avatarApiBaseUrl}/grid/nova-river?initials`,
  ],
} satisfies AvatarApiDocs;
const fallbackIconApiDocs = {
  name: "Aspekt Icon API",
  description:
    "Fetch a site favicon as image/png, with generated initials as the fallback.",
  base_url: iconApiBaseUrl,
  response_type: "image/png",
  docs: iconApiDocsUrl,
  endpoints: [
    {
      method: "GET",
      path: "/:url",
      description:
        "Resolve the target page from the path, discover its favicon, and return a PNG image.",
      example: `${iconApiBaseUrl}/www.example.com`,
    },
    {
      method: "GET",
      path: "/?url=:url",
      description:
        "Use the query-string form for full URLs that include paths or query parameters.",
      example: `${iconApiBaseUrl}/?url=https%3A%2F%2Fwww.example.com%2Fproducts`,
    },
    {
      method: "HEAD",
      path: "/:url",
      description:
        "Return the same cache and image metadata headers without an image body.",
      example: `${iconApiBaseUrl}/www.example.com`,
    },
  ],
  examples: [
    `${iconApiBaseUrl}/www.example.com`,
    `${iconApiBaseUrl}/www.aspekt.systems?size=128`,
    `${iconApiBaseUrl}/?url=https%3A%2F%2Fwww.example.com%2Fdocs&size=256`,
  ],
} satisfies IconApiDocs;
const avatarExampleImageSrc = `${avatarApiBaseUrl}/gradient/${avatarApiUsername}`;

const componentUsageExamples = {
  "aspect-ratio": `<AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg border border-border bg-surface-current">
  <Image
    src="/logo.png"
    alt="Aspekt logo"
    fill
    sizes="(min-width: 640px) 24rem, calc(100vw - 3rem)"
    className="object-contain p-12 dark:invert"
  />
</AspectRatio>`,
  "scroll-area": `<ScrollArea
  className="h-64 w-full max-w-sm"
  contentClassName="grid gap-3 p-4"
  fade
>
  {updates.map((update) => (
    <article key={update.title} className="rounded-lg border p-3">
      <h3 className="text-sm font-medium">{update.title}</h3>
      <p className="text-sm text-secondary">{update.description}</p>
    </article>
  ))}
</ScrollArea>`,
  avatar: `<Avatar
  alt="Tobias Rasmussen"
  fallback="TR"
  src="${avatarExampleImageSrc}"
/>`,
  card: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Sign in to your account</CardTitle>
    <CardDescription>
      Enter your email below to sign in.
    </CardDescription>
    <CardAction>
      <Button color="neutral" size="tiny" variant="soft">
        Sign up
      </Button>
    </CardAction>
  </CardHeader>
  <form className="grid gap-4">
    <CardContent className="grid gap-3">
      <label className="grid gap-1.5">
        <span className="text-sm font-medium">Email</span>
        <Input type="email" placeholder="you@example.com" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-medium">Password</span>
        <Input type="password" placeholder="Enter password" />
      </label>
    </CardContent>
    <CardFooter className="pt-0">
      <Button type="submit" color="neutral" className="w-full">
        Sign in
      </Button>
    </CardFooter>
  </form>
</Card>`,
  button: `<Button color="neutral" status="success" sound="success">
  Save changes
</Button>`,
  checkbox: `<label>
  <Checkbox defaultChecked />
  Receive product updates
</label>`,
  input: `<Input
  placeholder="Search components"
  clearable
  prefix={<MagnifyingGlassIcon />}
/>`,
  select: `const items = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "next" },
];

<SelectRoot items={items} defaultValue="react">
  <SelectTrigger aria-label="Framework" />
  <SelectPortal>
    <SelectPositioner>
      <SelectPopup>
        <SelectList>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </SelectPositioner>
  </SelectPortal>
</SelectRoot>`,
  combobox: `const items = ["React", "Next.js", "Svelte", "Vue", "Astro"];

<ComboboxRoot items={items} defaultValue="React">
  <ComboboxInputGroup>
    <ComboboxInput placeholder="Search frameworks" />
    <ComboboxClear />
    <ComboboxTrigger />
  </ComboboxInputGroup>
  <ComboboxPortal>
    <ComboboxPositioner>
      <ComboboxPopup>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No results</ComboboxEmpty>
      </ComboboxPopup>
    </ComboboxPositioner>
  </ComboboxPortal>
</ComboboxRoot>`,
  slider: `<Slider
  aria-label="Volume"
  label="Volume"
  defaultValue={64}
  showValue
/>`,
  "inline-slider": `<InlineSlider
  aria-label="Minutes"
  label="Minutes"
  defaultValue={35}
  format={{ style: "unit", unit: "minute", unitDisplay: "short" }}
  showValue
/>`,
  switch: `<Switch defaultChecked aria-label="Enable notifications" />`,
  toggle: `<Toggle defaultPressed>
  Bold
</Toggle>`,
  dialog: `<DialogRoot>
  <DialogTrigger>Archive project</DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Archive project?</DialogTitle>
        <DialogDescription>
          Move Q3 launch plan out of active work. You can restore it later
          from the archive.
        </DialogDescription>
      </DialogHeader>
      <div className="rounded-lg border p-3 text-sm">
        12 open tasks and 4 milestones will be hidden from dashboards.
      </div>
      <DialogFooter>
        <DialogClose>Keep project</DialogClose>
        <Button color="destructive">Archive project</Button>
      </DialogFooter>
    </DialogContent>
  </DialogPortal>
</DialogRoot>`,
  dock: `<DockRoot defaultValue="menu">
  <DockPanel value="menu">
    <DockPanelHeader>
      <DockPanelTitle>Atlas Studio</DockPanelTitle>
      <DockPanelDescription>
        Jump between mobile workspace views from the dock.
      </DockPanelDescription>
    </DockPanelHeader>
    <DockPanelContent>
      <DockMenu>
        <DockMenuItem active prefix={<StackIcon />}>
          Roadmap
        </DockMenuItem>
        <DockMenuItem prefix={<ListIcon />}>Releases</DockMenuItem>
        <DockMenuItem prefix={<PlusCircleIcon />}>Reports</DockMenuItem>
        <DockSeparator />
        <DockMenuItem badge="99+" prefix={<StackIcon />}>
          Inbox
        </DockMenuItem>
      </DockMenu>
    </DockPanelContent>
  </DockPanel>
  <DockPanel value="create">
    <DockPanelHeader>
      <DockPanelTitle>Quick actions</DockPanelTitle>
      <DockPanelDescription>
        Start common workspace tasks from the dock.
      </DockPanelDescription>
    </DockPanelHeader>
    <DockPanelContent>
      <DockMenu>
        <DockMenuItem prefix={<PlusCircleIcon />}>New brief</DockMenuItem>
        <DockMenuItem prefix={<StackIcon />}>Add milestone</DockMenuItem>
        <DockMenuItem prefix={<ListIcon />}>Invite collaborator</DockMenuItem>
      </DockMenu>
    </DockPanelContent>
  </DockPanel>
  <DockBar>
    <DockButton aria-label="Search" prefix={<MagnifyingGlassIcon />}>
      Search
    </DockButton>
    <DockButton asChild active prefix={<StackIcon />}>
      <a href="#roadmap">Roadmap</a>
    </DockButton>
    <DockTrigger value="create" aria-label="Open quick actions">
      <PlusCircleIcon />
    </DockTrigger>
    <DockTrigger
      value="menu"
      aria-label="Toggle navigation"
      activeChildren={<XIcon />}
      align="end"
      separator
    >
      <ListIcon />
    </DockTrigger>
  </DockBar>
</DockRoot>`,
  drawer: `<DrawerRoot side="right" detached>
  <DrawerTrigger>View order</DrawerTrigger>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerViewport>
      <DrawerContent>
        <DrawerBody>
          <DrawerHeader>
            <DrawerTitle>Order #1048</DrawerTitle>
            <DrawerDescription>
              A shipment for Acme Studio is scheduled for Tuesday morning.
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between gap-4">
              <span>Customer</span>
              <span>Acme Studio</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Total</span>
              <span>$3,240.00</span>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
            <Button color="neutral">Create label</Button>
          </DrawerFooter>
        </DrawerBody>
      </DrawerContent>
    </DrawerViewport>
  </DrawerPortal>
</DrawerRoot>`,
  popover: `<PopoverRoot>
  <PopoverTrigger>Share report</PopoverTrigger>
  <PopoverPortal>
    <PopoverPositioner>
      <PopoverPopup>
        <PopoverArrow />
        <PopoverHeader>
          <PopoverTitle>Share revenue report</PopoverTitle>
          <PopoverDescription>
            Invite finance teammates to review the monthly numbers.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <span>Access</span>
            <span>View only</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Expires</span>
            <span>7 days</span>
          </div>
        </div>
        <PopoverFooter>
          <PopoverClose>Dismiss</PopoverClose>
          <Button color="neutral">Copy link</Button>
        </PopoverFooter>
      </PopoverPopup>
    </PopoverPositioner>
  </PopoverPortal>
</PopoverRoot>`,
  "app-tabs": `<AppTabsRoot
  defaultTabs={tabs}
  defaultValue="projects"
  variant="soft"
  color="neutral"
  shape="round"
>
  <AppTabsList />
  <AppTabsPanel value="projects">
    <ProjectsPage />
  </AppTabsPanel>
</AppTabsRoot>`,
  sidebar: `<SidebarRoot>
  <Sidebar variant="inset">
    <SidebarHeader>Acme</SidebarHeader>
    <SidebarContent>
      <SidebarSection>
        <SidebarSectionLabel>Workspace</SidebarSectionLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild active>
              <a href="/projects">Projects</a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarSection>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarInsetContent>
      <ProjectsPage />
    </SidebarInsetContent>
  </SidebarInset>
</SidebarRoot>`,
  toast: `async function publishRelease(releaseId: string) {
  try {
    await publishReleaseById(releaseId);
  } catch {
    toast.destructive("Publish failed", {
      description: "Check the build output before trying again.",
    });
  }
}

<Toaster autoClose colorful maxToasts={6} position="bottom-right" />`,
  tabs: `<TabsRoot defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="usage">Usage</TabsTab>
    <TabsTab value="api">API</TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="overview">
    Tabs group related content into focused panels.
  </TabsPanel>
  <TabsPanel value="usage">Use arrow keys to move between tabs.</TabsPanel>
  <TabsPanel value="api">Pair each tab with a matching panel.</TabsPanel>
</TabsRoot>`,
  table: `type Invoice = {
  customer: string;
  status: "Paid" | "Pending" | "Overdue";
  total: number;
};

const columns = [
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) =>
      Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(getValue<number>()),
  },
] satisfies TableColumnDef<Invoice>[];

<Table
  columns={columns}
  data={invoices}
  caption="Recent invoices"
  striped
/>`,
  snippet: `<Snippet
  tabs={[
    {
      label: "pnpm",
      code: "pnpm dlx @aspekt/ui add button",
      language: "bash",
    },
    {
      label: "npm",
      code: "npx @aspekt/ui add button",
      language: "bash",
    },
  ]}
/>`,
  heading: `<Heading level={2} size="h3">
  Build interfaces with intention
</Heading>`,
  text: `<Text tone="muted">
  Components should feel finished before they reach your product.
</Text>`,
  code: `<Code copyable>
  variant="soft"
</Code>`,
  kbd: `<span>
  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>
</span>`,
  prose: `<Prose>
  <h2>Quiet systems scale better</h2>
  <p>Prose styles long-form content with Aspekt rhythm.</p>
</Prose>`,
  blockquote: `<Blockquote source="Aspekt principle">
  Interfaces feel better when details are designed as one system.
</Blockquote>`,
  list: `<List>
  <ListItem>Install the package.</ListItem>
  <ListItem>Import the component.</ListItem>
  <ListItem>Ship the interface.</ListItem>
</List>`,
} satisfies Record<ComponentPreview, string>;

const introCopy = {
  "getting-started": {
    title: "Getting started",
    description: "shows how to install Aspekt and render your first component.",
  },
  principles: {
    title: "Principles",
    description: "shape how Aspekt components become product-ready.",
  },
} satisfies Record<
  IntroPage,
  {
    title: string;
    description: string;
  }
>;

const foundationCopy = {
  typography: {
    title: "Typography",
    description:
      "collects the text primitives used to shape hierarchy, rhythm, and long-form content.",
  },
  surfaces: {
    title: "Surfaces",
    description:
      "explains Aspekt depth, contextual surface inheritance, overlay lift, and neutral state treatments.",
  },
  colors: {
    title: "Colors",
    description:
      "documents text roles, action colors, feedback colors, structure tokens, and radii.",
  },
  sonification: {
    title: "Sonification",
    description:
      "explains how Aspekt uses optional sound feedback to make interface state changes feel clearer.",
  },
} satisfies Record<
  FoundationPage,
  {
    title: string;
    description: string;
  }
>;

const utilityCopy = {
  "scroll-fade": {
    title: "Scroll Fade",
    description: "adds edge fades to scroll containers with CSS masks.",
  },
  shimmer: {
    title: "Shimmer",
    description: "adds animated text shimmer for pending and generated states.",
  },
} satisfies Record<
  UtilityPage,
  {
    title: string;
    description: string;
  }
>;

const apiCopy = {
  "avatar-api": {
    title: "Avatar API",
    description:
      "generates deterministic avatar images from a variant and username URL.",
  },
  "icon-api": {
    title: "Icon API",
    description:
      "returns a site favicon as PNG, with a simple initials fallback.",
  },
} satisfies Record<
  ApiPage,
  {
    title: string;
    description: string;
  }
>;

const defaultAvatarApiSettings = {
  initials: false,
  radius: "full",
  seed: avatarApiUsername,
  size: "64",
  variant: "gradient",
} satisfies AvatarApiSettings;

const defaultIconApiSettings = {
  size: "64",
  target: iconApiDefaultTarget,
} satisfies IconApiSettings;

const defaultAvatarSettings = {
  image: true,
  shape: "round",
  size: "large",
} satisfies AvatarSettings;

const defaultAspectRatioSettings = {
  ratio: "16:9",
} satisfies AspectRatioSettings;

const defaultScrollAreaSettings = {
  axis: "vertical",
  fade: true,
  shape: "round",
  size: "medium",
  variant: "outline",
} satisfies ScrollAreaSettings;

const defaultButtonSettings = {
  variant: "solid",
  size: "medium",
  color: "neutral",
  shape: "round",
  prefix: false,
  suffix: false,
  loading: false,
  status: "none",
  disabled: false,
} satisfies ButtonSettings;

const defaultCardSettings = {
  variant: "outline",
  size: "medium",
  shape: "round",
} satisfies CardSettings;

const defaultInputSettings = {
  variant: "soft",
  size: "medium",
  shape: "round",
  prefix: true,
  suffix: false,
  loading: false,
  invalid: false,
  clearable: true,
  disabled: false,
  readOnly: false,
} satisfies InputSettings;

const defaultSelectSettings = {
  variant: "soft",
  size: "medium",
  shape: "round",
  prefix: true,
  suffix: false,
  invalid: false,
  disabled: false,
  readOnly: false,
} satisfies SelectSettings;

const defaultComboboxSettings = {
  variant: "soft",
  size: "medium",
  shape: "round",
  prefix: true,
  clearable: true,
  invalid: false,
  disabled: false,
  readOnly: false,
} satisfies ComboboxSettings;

const defaultCheckboxSettings = {
  variant: "solid",
  size: "small",
  color: "accent",
  shape: "square",
  checked: true,
  indeterminate: false,
  invalid: false,
  disabled: false,
  readOnly: false,
} satisfies CheckboxSettings;

const defaultSwitchSettings = {
  variant: "solid",
  size: "medium",
  color: "neutral",
  shape: "round",
  checked: true,
  invalid: false,
  disabled: false,
  readOnly: false,
} satisfies SwitchSettings;

const defaultSliderSettings = {
  variant: "soft",
  size: "small",
  color: "neutral",
  shape: "square",
  value: 64,
  showValue: true,
  invalid: false,
  disabled: false,
} satisfies SliderSettings;

const defaultInlineSliderSettings = {
  variant: "solid",
  size: "small",
  color: "neutral",
  shape: "round",
  value: 35,
  showValue: true,
  invalid: false,
  disabled: false,
} satisfies InlineSliderSettings;

const defaultToggleSettings = {
  variant: "soft",
  size: "medium",
  color: "neutral",
  shape: "round",
  prefix: true,
  suffix: false,
  pressed: false,
  disabled: false,
} satisfies ToggleSettings;

const defaultDialogSettings = {
  shape: "round",
  size: "small",
} satisfies DialogSettings;

const defaultDrawerSettings = {
  backdrop: true,
  detached: false,
  shape: "round",
  side: "bottom",
  size: "medium",
} satisfies DrawerSettings;

const defaultPopoverSettings = {
  arrow: true,
  modal: false,
  shape: "round",
  side: "bottom",
  size: "medium",
} satisfies PopoverSettings;

const defaultDockSettings = {
  panel: "menu",
  shape: "round",
  size: "medium",
} satisfies DockSettings;

const defaultToastSettings = {
  action: false,
  autoClose: true,
  colorful: true,
  maxToasts: "6",
  position: "bottom-right",
  shape: "round",
  type: "default",
} satisfies ToastSettings;

const defaultTabsSettings = {
  variant: "soft",
  size: "small",
  color: "neutral",
  shape: "round",
  orientation: "horizontal",
  indicator: true,
  activateOnFocus: true,
} satisfies TabsSettings;

const defaultAppTabsSettings = {
  variant: "soft",
  size: "small",
  color: "accent",
  shape: "square",
} satisfies AppTabsSettings;

const defaultTableSettings = {
  variant: "outline",
  size: "medium",
  shape: "square",
  striped: false,
  hoverable: true,
  sortable: true,
  stickyHeader: false,
  showColumnBorders: false,
} satisfies TableSettings;

const scrollAreaPreviewItems = [
  {
    title: "Release notes",
    meta: "8 min ago",
    description:
      "Draft copy is ready for the June platform update and needs one final product review.",
  },
  {
    title: "Design audit",
    meta: "18 min ago",
    description:
      "Three dense dashboard states have been checked for focus order, overflow, and long labels.",
  },
  {
    title: "Billing export",
    meta: "42 min ago",
    description:
      "The finance workspace export finished with 124 customer rows and two retry warnings.",
  },
  {
    title: "Invite queue",
    meta: "1 hr ago",
    description:
      "Six pending collaborator invitations are waiting for domain approval.",
  },
  {
    title: "Incident review",
    meta: "2 hr ago",
    description:
      "A monitoring summary is attached to the reliability channel for Tuesday planning.",
  },
] as const;

const defaultSidebarSettings = {
  collapsible: true,
  open: true,
  side: "left",
  variant: "inset",
} satisfies SidebarSettings;

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

const defaultCodeSettings = {
  copyable: false,
  variant: "inline",
  tone: "default",
} satisfies CodeSettings;

const defaultKbdSettings = {
  variant: "outline",
  size: "base",
  shape: "square",
} satisfies KbdSettings;

const defaultProseSettings = {
  size: "base",
  tone: "default",
} satisfies ProseSettings;

const defaultBlockquoteSettings = {
  size: "base",
  tone: "default",
} satisfies BlockquoteSettings;

const defaultListSettings = {
  variant: "disc",
  size: "base",
  spacing: "normal",
  tone: "default",
} satisfies ListSettings;

const defaultSnippetSettings = {
  copyable: true,
  filename: true,
  language: "tsx",
  shape: "square",
  showLineNumbers: true,
  variant: "outline",
  wrap: false,
} satisfies SnippetSettings;

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

const comboboxPreviewItems = [
  "React",
  "Next.js",
  "Svelte",
  "Vue",
  "Astro",
] as const satisfies readonly ComboboxPreviewValue[];

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

type Invoice = {
  id: string;
  customer: string;
  plan: string;
  status: InvoiceStatus;
  total: number;
  issued: string;
};

const invoiceStatusClasses = {
  Paid: "border-success-border bg-success-surface text-success",
  Pending: "border-warning-border bg-warning-surface text-warning",
  Overdue: "border-destructive-border bg-destructive-surface text-destructive",
} satisfies Record<InvoiceStatus, string>;

const tablePreviewData = [
  {
    id: "INV-2418",
    customer: "Northstar Labs",
    plan: "Scale",
    status: "Paid",
    total: 1280,
    issued: "Jun 12",
  },
  {
    id: "INV-2419",
    customer: "Aperture Works",
    plan: "Team",
    status: "Pending",
    total: 640,
    issued: "Jun 14",
  },
  {
    id: "INV-2420",
    customer: "Signal & Co.",
    plan: "Enterprise",
    status: "Overdue",
    total: 3420,
    issued: "Jun 16",
  },
  {
    id: "INV-2421",
    customer: "Fieldstone Studio",
    plan: "Team",
    status: "Paid",
    total: 780,
    issued: "Jun 18",
  },
] satisfies Invoice[];

const currencyFormatter = new Intl.NumberFormat("en", {
  currency: "USD",
  style: "currency",
});

const tablePreviewColumns = [
  {
    accessorKey: "id",
    header: "Invoice",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<InvoiceStatus>();

      return (
        <span
          className={[
            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
            invoiceStatusClasses[status],
          ].join(" ")}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "issued",
    header: "Issued",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => (
      <span className="font-medium">
        {currencyFormatter.format(getValue<number>())}
      </span>
    ),
  },
] satisfies TableColumnDef<Invoice>[];

const snippetExamples = {
  tsx: {
    filename: "save-button.tsx",
    code: `import { Button } from "@/components/aspekt/button";

export function SaveButton() {
  return (
    <Button color="neutral" status="success" sound="success">
      Save changes
    </Button>
  );
}`,
  },
  bash: {
    filename: "terminal",
    code: `pnpm dlx @aspekt/ui init
pnpm dlx @aspekt/ui add button`,
  },
  json: {
    filename: "terminal",
    code: `npx @aspekt/ui add button input dialog`,
  },
  css: {
    filename: "theme.css",
    code: `:root {
  --text-primary: #171717;
  --action: #171717;
}`,
  },
  html: {
    filename: "index.html",
    code: `<button type="button" data-state="open">
  Save changes
</button>`,
  },
} satisfies Record<
  SnippetLanguageOption,
  {
    code: string;
    filename: string;
  }
>;

const snippetHighlightedLines = {
  tsx: [4, 5, 6],
  bash: [1],
  json: [3],
  css: [2],
  html: [1],
} satisfies Record<SnippetLanguageOption, readonly number[]>;

const initCommandTabs = [
  {
    label: "pnpm",
    code: "pnpm dlx @aspekt/ui init --preset square",
    language: "bash",
  },
  {
    label: "npm",
    code: "npx @aspekt/ui init --preset square",
    language: "bash",
  },
  {
    label: "yarn",
    code: "yarn dlx @aspekt/ui init --preset square",
    language: "bash",
  },
  {
    label: "bun",
    code: "bunx @aspekt/ui init --preset square",
    language: "bash",
  },
] as const;

const addButtonCommandTabs = [
  {
    label: "pnpm",
    code: "pnpm dlx @aspekt/ui add button",
    language: "bash",
  },
  {
    label: "npm",
    code: "npx @aspekt/ui add button",
    language: "bash",
  },
  {
    label: "yarn",
    code: "yarn dlx @aspekt/ui add button",
    language: "bash",
  },
  {
    label: "bun",
    code: "bunx @aspekt/ui add button",
    language: "bash",
  },
] as const;

const headingLevelValues = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
} satisfies Record<HeadingLevelOption, HeadingLevel>;

const buttonColorDots = {
  accent: "bg-action",
  info: "bg-info",
  destructive: "bg-destructive",
  warning: "bg-warning",
  neutral: "bg-primary",
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

function useScrollOverflow<TElement extends HTMLElement>({
  initialOverflow,
}: UseScrollOverflowOptions = {}) {
  const ref = React.useRef<TElement>(null);
  const [overflow, setOverflow] = React.useState<ScrollOverflowState>(() => ({
    ...emptyOverflowState,
    ...initialOverflow,
  }));

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

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrame = 0;
    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateOverflow);
    };

    updateOverflow();
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

function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "flex items-center gap-2.5 select-none pointer-events-none",
        className,
      ].join(" ")}
    >
      <Image
        src="/logo.png"
        width={24}
        height={24}
        sizes="32px"
        className="size-4.5 dark:invert"
        alt="Aspekt logo"
      />
      <span className="rounded-full text-lg leading-none text-neutral-600 dark:border-white/30 dark:text-neutral-300">
        Aspekt UI
      </span>
    </div>
  );
}

function DocsNavigation({
  activePage,
  query = "",
  onPageChange,
}: {
  activePage: DocsPage;
  query?: string;
  onPageChange: (page: DocsPage) => void;
}) {
  const filteredGroups = getFilteredNavGroups(query);

  if (filteredGroups.length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        No matches found.
      </p>
    );
  }

  return (
    <nav className="flex flex-col gap-14" aria-label="Aspekt UI documentation">
      {filteredGroups.map((group) => (
        <div key={group.title} className="space-y-3">
          <Text
            as="p"
            size={"lg"}
            className="tracking-tight text-secondary dark:text-primary"
          >
            {group.title}
          </Text>
          <ul className="space-y-2">
            {group.items.map((item) => (
              <li key={item.label} className="ml-2">
                <button
                  type="button"
                  aria-current={item.page === activePage ? "page" : undefined}
                  onClick={() => onPageChange(item.page)}
                  className={[
                    "relative inline-flex text-left text-base leading-none outline-none transition-colors",
                    item.page === activePage
                      ? "font-medium text-primary"
                      : "text-tertiary hover:text-primary focus-visible:text-primary dark:text-neutral-400",
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
  );
}

function MobileNavbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-surface-current/95 px-6 py-4 backdrop-blur sm:px-10 lg:hidden dark:border-white/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <LogoLockup />
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuOpen}
          className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-primary focus-visible:ring-2 focus-visible:ring-current/25 dark:text-neutral-400 dark:hover:bg-white/10"
        >
          <ListIcon className="size-5" weight="bold" />
        </button>
      </div>
    </header>
  );
}

function MobileMenu({
  activePage,
  open,
  query,
  onClose,
  onPageChange,
  onQueryChange,
}: {
  activePage: DocsPage;
  open: boolean;
  query: string;
  onClose: () => void;
  onPageChange: (page: DocsPage) => void;
  onQueryChange: (query: string) => void;
}) {
  const { ref: menuScrollRef, overflow } = useScrollOverflow<HTMLDivElement>();

  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-surface-current text-primary lg:hidden">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4 sm:px-10 dark:border-white/15">
        <LogoLockup />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-primary focus-visible:ring-2 focus-visible:ring-current/25 dark:text-neutral-400 dark:hover:bg-white/10"
        >
          <XIcon className="size-5" weight="bold" />
        </button>
      </div>

      <div className="shrink-0 border-b border-neutral-200 px-6 py-4 sm:px-10 dark:border-white/15">
        <label className="relative block">
          <span className="sr-only">Search documentation</span>
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.currentTarget.value)}
            placeholder="Search documentation"
            className="h-10 w-full rounded-lg border border-neutral-200 bg-transparent pl-9 pr-3 text-base text-primary outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10 dark:border-white/15 dark:placeholder:text-neutral-500 dark:focus:border-white/35 dark:focus:ring-white/10"
          />
        </label>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={menuScrollRef}
          className="h-full overflow-y-auto px-6 py-8 sm:px-10"
        >
          <DocsNavigation
            activePage={activePage}
            query={query}
            onPageChange={onPageChange}
          />
        </div>
        <ProgressiveOverflowFade edge="top" visible={overflow.top} />
        <ProgressiveOverflowFade edge="bottom" visible={overflow.bottom} />
      </div>
    </div>
  );
}

function Sidebar({
  activePage,
  onPageChange,
}: {
  activePage: DocsPage;
  onPageChange: (page: DocsPage) => void;
}) {
  const { ref: sidebarScrollRef, overflow } = useScrollOverflow<HTMLDivElement>(
    {
      initialOverflow: initialBottomOverflowState,
    },
  );

  return (
    <aside className="relative hidden w-full shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-72">
      <div
        ref={sidebarScrollRef}
        className="flex h-full flex-col px-6 py-8 sm:px-10 lg:overflow-y-auto lg:px-8 lg:py-18"
      >
        <LogoLockup className="mb-16" />
        <DocsNavigation activePage={activePage} onPageChange={onPageChange} />
        <div className="mt-auto pt-8">
          <ThemeToggle className="w-fit justify-start" />
        </div>
      </div>
      <ProgressiveOverflowFade edge="top" visible={overflow.top} />
      <ProgressiveOverflowFade edge="bottom" visible={overflow.bottom} />
    </aside>
  );
}

function SegmentedControl<T extends string>({
  values,
  active,
  onValueChange,
}: {
  values: readonly T[];
  active: T;
  onValueChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex min-h-8 max-w-full items-center gap-1 rounded-lg bg-neutral-100 p-0.5 text-sm text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
      {values.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={value === active}
          onClick={() => onValueChange(value)}
          className={[
            "inline-flex h-7 min-w-8 items-center justify-center rounded-md px-2.5 font-medium transition-colors",
            value === active
              ? "bg-white text-neutral-950 shadow-sm dark:bg-white dark:text-neutral-950"
              : "hover:text-neutral-950 dark:hover:text-white",
          ].join(" ")}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

function ColorSwatchControl<T extends string>({
  values,
  active,
  dots,
  onValueChange,
}: {
  values: readonly T[];
  active: T;
  dots: Partial<Record<T, string>>;
  onValueChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex min-h-8 items-center gap-1 rounded-lg bg-neutral-100 p-0.5 dark:bg-white/10">
      {values.map((value) => (
        <button
          key={value}
          type="button"
          aria-label={value}
          aria-pressed={value === active}
          onClick={() => onValueChange(value)}
          className={[
            "inline-flex size-7 items-center justify-center rounded-md transition-colors",
            value === active
              ? "bg-white shadow-sm dark:bg-white"
              : "hover:bg-white/70 dark:hover:bg-white/10",
          ].join(" ")}
        >
          <span
            className={`size-2.5 rounded-full ${dots[value]}`}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

function ControlSelect<T extends string>({
  label,
  values,
  active,
  onValueChange,
}: {
  label: string;
  values: readonly T[];
  active: T;
  onValueChange: (value: T) => void;
}) {
  const items = React.useMemo(
    () => values.map((value) => ({ label: value, value })),
    [values],
  );

  return (
    <SelectRoot
      value={active}
      onValueChange={(nextValue) => {
        if (nextValue) {
          onValueChange(nextValue as T);
        }
      }}
      items={items}
      size="small"
      shape="square"
      sound={false}
    >
      <SelectTrigger
        aria-label={`Select ${label}`}
        className="w-36"
        valueClassName="font-medium"
        variant="outline"
      />
      <SelectPortal>
        <SelectPositioner align="end">
          <SelectPopup className="min-w-36">
            <SelectScrollUpArrow />
            <SelectList>
              {items.map((item) => (
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
  const control = dots ? (
    <ColorSwatchControl
      values={values}
      active={active}
      dots={dots}
      onValueChange={onValueChange}
    />
  ) : values.length > 3 ? (
    <ControlSelect
      label={label}
      values={values}
      active={active}
      onValueChange={onValueChange}
    />
  ) : (
    <SegmentedControl
      values={values}
      active={active}
      onValueChange={onValueChange}
    />
  );

  return (
    <div className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5">
      <h2 className="min-w-0 text-sm font-medium text-primary">{label}</h2>
      {control}
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
    <div className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5">
      <div className="min-w-0">
        <h2 className="text-sm font-medium text-primary">{label}</h2>
        {typeLabel !== "boolean" && (
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            {typeLabel}
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={`Toggle ${label}`}
        color="accent"
        shape="square"
        size="small"
        variant="solid"
      />
    </div>
  );
}

function SliderOptionsPanel({
  settings,
  onSettingsChange,
}: {
  settings: SliderSettings;
  onSettingsChange: React.Dispatch<React.SetStateAction<SliderSettings>>;
}) {
  return (
    <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
      <OptionRow
        label="variant"
        values={sliderOptions.variant}
        active={settings.variant}
        onValueChange={(variant) =>
          onSettingsChange((current) => ({
            ...current,
            variant,
          }))
        }
      />

      <OptionRow
        label="size"
        values={sliderOptions.size}
        active={settings.size}
        onValueChange={(size) =>
          onSettingsChange((current) => ({
            ...current,
            size,
          }))
        }
      />

      <OptionRow
        label="color"
        values={sliderOptions.color}
        active={settings.color}
        dots={buttonColorDots}
        onValueChange={(color) =>
          onSettingsChange((current) => ({
            ...current,
            color,
          }))
        }
      />

      <OptionRow
        label="shape"
        values={sliderOptions.shape}
        active={settings.shape}
        onValueChange={(shape) =>
          onSettingsChange((current) => ({
            ...current,
            shape,
          }))
        }
      />

      <BooleanOptionRow
        label="showValue"
        checked={settings.showValue}
        onCheckedChange={(showValue) =>
          onSettingsChange((current) => ({
            ...current,
            showValue,
          }))
        }
      />

      <BooleanOptionRow
        label="invalid"
        checked={settings.invalid}
        onCheckedChange={(invalid) =>
          onSettingsChange((current) => ({
            ...current,
            invalid,
          }))
        }
      />

      <BooleanOptionRow
        label="disabled"
        checked={settings.disabled}
        onCheckedChange={(disabled) =>
          onSettingsChange((current) => ({
            ...current,
            disabled,
          }))
        }
      />
    </div>
  );
}

function ImportExample({
  activeComponent,
}: {
  activeComponent: ComponentPreview;
}) {
  const importCommand = componentImportExamples[activeComponent];
  const usageExample = componentUsageExamples[activeComponent];

  return (
    <div className="grid gap-2">
      <Snippet code={importCommand} copyable={false} language="tsx" />
      <Snippet code={usageExample} language="tsx" showHeader={false} />
    </div>
  );
}

function isComponentPreview(value: string): value is ComponentPreview {
  return (componentIds as readonly string[]).includes(value);
}

function isIntroPage(value: string): value is IntroPage {
  return (introIds as readonly string[]).includes(value);
}

function isFoundationPage(value: string): value is FoundationPage {
  return (foundationIds as readonly string[]).includes(value);
}

function isUtilityPage(value: string): value is UtilityPage {
  return (utilityIds as readonly string[]).includes(value);
}

function isApiPage(value: string): value is ApiPage {
  return (apiIds as readonly string[]).includes(value);
}

function isDocsPage(value: string): value is DocsPage {
  return (docsPageIds as readonly string[]).includes(value);
}

function getDocsPageCopy(page: DocsPage) {
  if (isComponentPreview(page)) return componentCopy[page];
  if (isFoundationPage(page)) return foundationCopy[page];
  if (isUtilityPage(page)) return utilityCopy[page];
  if (isApiPage(page)) return apiCopy[page];

  return introCopy[page];
}

function getPathForPage(page: DocsPage) {
  return page === "getting-started" ? "/" : `/${page}`;
}

function getPageFromLocation() {
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "");

  if (!pathname) return "getting-started";
  if (isDocsPage(pathname)) return pathname;

  const hash = window.location.hash.slice(1);
  if (hash === "purpose") return "getting-started";
  if (isDocsPage(hash)) return hash;

  return null;
}

type NavigationGroup = {
  title: string;
  items: readonly { label: string; page: DocsPage }[];
};

function getFilteredNavGroups(query: string): NavigationGroup[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return [...navGroups];

  return navGroups
    .map((group) => {
      const groupMatches = group.title.toLowerCase().includes(normalizedQuery);
      const items = group.items.filter((item) => {
        const copy = getDocsPageCopy(item.page);

        return (
          groupMatches ||
          item.label.toLowerCase().includes(normalizedQuery) ||
          copy.title.toLowerCase().includes(normalizedQuery) ||
          copy.description.toLowerCase().includes(normalizedQuery)
        );
      });

      return { title: group.title, items };
    })
    .filter((group) => group.items.length > 0);
}

function SoundProviderControls() {
  const {
    depths,
    enabled,
    mobileEnabled,
    variant,
    volume,
    setDepthEnabled,
    setEnabled,
    setMobileEnabled,
    setVariant,
    setVolume,
    play,
  } = useSound();
  const [feedbackValue, setFeedbackValue] = React.useState(40);

  return (
    <div className="grid w-full max-w-md gap-6 px-6">
      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
        <BooleanOptionRow
          label="enabled"
          checked={enabled}
          onCheckedChange={setEnabled}
        />

        <BooleanOptionRow
          label="mobile enabled"
          checked={mobileEnabled}
          onCheckedChange={setMobileEnabled}
        />

        <OptionRow
          label="variant"
          values={soundVariantOptions}
          active={variant}
          onValueChange={setVariant}
        />

        {soundDepths.map((depth) => (
          <BooleanOptionRow
            key={depth}
            label={depth}
            checked={depths[depth]}
            onCheckedChange={(checked) => setDepthEnabled(depth, checked)}
            typeLabel="depth"
          />
        ))}

        <label className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5">
          <span className="min-w-0">
            <span className="block text-sm font-medium text-primary">
              volume
            </span>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
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
            className="h-2 w-36 cursor-pointer accent-orange-600"
          />
        </label>

        <label className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5">
          <span className="min-w-0">
            <span className="block text-sm font-medium text-primary">
              slider feedback
            </span>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              {feedbackValue}
            </span>
          </span>
          <Slider
            aria-label="Slider feedback"
            className="w-36"
            color="accent"
            max={100}
            min={0}
            onValueChange={(value) => {
              if (typeof value === "number") {
                setFeedbackValue(value);
              }
            }}
            shape="round"
            size="small"
            sound={sliderFeedbackSound}
            step={1}
            value={feedbackValue}
            variant="soft"
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
          color="destructive"
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
        "inline-flex items-center gap-3 px-6 text-sm font-medium text-primary",
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

function SwitchPreview({
  settings,
  onCheckedChange,
}: {
  settings: SwitchSettings;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={[
        "inline-flex items-center gap-3 px-6 text-sm font-medium text-primary",
        settings.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      ].join(" ")}
    >
      <Switch
        checked={settings.checked}
        onCheckedChange={onCheckedChange}
        variant={settings.variant}
        color={settings.color}
        size={settings.size}
        shape={settings.shape}
        invalid={settings.invalid}
        disabled={settings.disabled}
        readOnly={settings.readOnly}
      />
      Enable workspace notifications
    </label>
  );
}

function SliderPreview({
  settings,
  onValueChange,
}: {
  settings: SliderSettings;
  onValueChange: (value: number) => void;
}) {
  return (
    <div className="w-full max-w-sm px-6">
      <Slider
        aria-label="Volume"
        label="Volume"
        value={settings.value}
        onValueChange={(value) => {
          if (typeof value === "number") {
            onValueChange(value);
          }
        }}
        variant={settings.variant}
        color={settings.color}
        size={settings.size}
        shape={settings.shape}
        showValue={settings.showValue}
        invalid={settings.invalid}
        disabled={settings.disabled}
      />
    </div>
  );
}

function InlineSliderPreview({
  settings,
  onValueChange,
}: {
  settings: InlineSliderSettings;
  onValueChange: (value: number) => void;
}) {
  return (
    <div className="w-full max-w-sm px-6">
      <InlineSlider
        aria-label="Minutes"
        label="Minutes"
        format={sliderMinuteFormat}
        value={settings.value}
        onValueChange={onValueChange}
        variant={settings.variant}
        color={settings.color}
        size={settings.size}
        shape={settings.shape}
        showValue={settings.showValue}
        invalid={settings.invalid}
        disabled={settings.disabled}
      />
    </div>
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
        suffix={settings.suffix ? (settings.pressed ? "On" : "Off") : undefined}
        disabled={settings.disabled}
      >
        Toggle me
      </Toggle>
    </div>
  );
}

function AvatarPreview({ settings }: { settings: AvatarSettings }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 px-6">
      <Avatar
        alt="Tobias Rasmussen"
        fallback="TR"
        shape={settings.shape}
        size={settings.size}
        src={settings.image ? avatarExampleImageSrc : undefined}
      />
      <div className="grid min-w-0 gap-1">
        <Text as={"p"} size={"lg"} className="leading-4">
          Tobias Rasmussen
        </Text>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Aspekt systems
        </p>
      </div>
    </div>
  );
}

function AspectRatioPreview({ settings }: { settings: AspectRatioSettings }) {
  return (
    <AspectRatio
      ratio={aspectRatioValues[settings.ratio]}
      className="w-full max-w-sm rounded-lg border border-border bg-surface-current shadow-sm"
    >
      <Image
        src="/logo.png"
        alt="Aspekt logo"
        fill
        sizes="(min-width: 640px) 24rem, calc(100vw - 6rem)"
        className="object-contain p-12 dark:invert"
      />
    </AspectRatio>
  );
}

function CardPreview({ settings }: { settings: CardSettings }) {
  return (
    <div className="w-full max-w-sm px-6">
      <Card
        variant={settings.variant}
        size={settings.size}
        shape={settings.shape}
      >
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Enter your email below to sign in.</CardDescription>
          <CardAction>
            <Button
              type="button"
              color="neutral"
              size="tiny"
              shape={settings.shape}
              variant="soft"
            >
              Sign up
            </Button>
          </CardAction>
        </CardHeader>

        <form
          className="grid gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <CardContent className="grid gap-3">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-primary">Email</span>
              <Input
                type="email"
                placeholder="you@example.com"
                shape={settings.shape}
                variant="soft"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-primary">Password</span>
              <Input
                type="password"
                placeholder="Enter password"
                shape={settings.shape}
                variant="soft"
              />
            </label>
          </CardContent>

          <CardFooter className="pt-0">
            <Button
              type="submit"
              color="neutral"
              shape={settings.shape}
              className="w-full"
            >
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
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

function CodePreview({ settings }: { settings: CodeSettings }) {
  return (
    <div className="grid w-full max-w-xl gap-5 px-6">
      {settings.variant === "inline" ? (
        <p className="text-base leading-7 text-primary">
          Use{" "}
          <Code
            copyable={settings.copyable}
            variant={settings.variant}
            tone={settings.tone}
          >
            variant=&quot;{settings.tone}&quot;
          </Code>{" "}
          when the code belongs inside a sentence.
        </p>
      ) : (
        <Code
          copyable={settings.copyable}
          variant={settings.variant}
          tone={settings.tone}
        >{`npx @aspekt/ui init
import { Code } from "@/components/aspekt/code";`}</Code>
      )}
    </div>
  );
}

function KbdPreview({ settings }: { settings: KbdSettings }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-6 text-sm text-neutral-500 dark:text-neutral-400">
      <span className="text-primary">Open command menu</span>
      <span className="inline-flex items-center gap-1.5">
        <Kbd
          shape={settings.shape}
          size={settings.size}
          variant={settings.variant}
        >
          ⌘
        </Kbd>
        <Kbd
          shape={settings.shape}
          size={settings.size}
          variant={settings.variant}
        >
          K
        </Kbd>
      </span>
      <span>or</span>
      <span className="inline-flex items-center gap-1.5">
        <Kbd
          shape={settings.shape}
          size={settings.size}
          variant={settings.variant}
        >
          Ctrl
        </Kbd>
        <Kbd
          shape={settings.shape}
          size={settings.size}
          variant={settings.variant}
        >
          K
        </Kbd>
      </span>
    </div>
  );
}

function ProsePreview({ settings }: { settings: ProseSettings }) {
  return (
    <Prose
      as="article"
      className="px-6"
      size={settings.size}
      tone={settings.tone}
    >
      <h2>Quiet systems scale better</h2>
      <p>
        Prose gives long-form content a clear rhythm while keeping links, inline{" "}
        <code>code</code>, lists, and quotes visually aligned with the rest of
        Aspekt UI.
      </p>
      <blockquote>
        Good documentation should feel like part of the product, not a separate
        room with different furniture.
      </blockquote>
      <ul>
        <li>Readable line length</li>
        <li>Consistent spacing</li>
        <li>Styled rich text primitives</li>
      </ul>
    </Prose>
  );
}

function BlockquotePreview({ settings }: { settings: BlockquoteSettings }) {
  return (
    <div className="w-full max-w-xl px-6">
      <Blockquote
        size={settings.size}
        tone={settings.tone}
        source="Aspekt principle"
      >
        Interfaces feel better when structure, feedback, and tone are designed
        as one system.
      </Blockquote>
    </div>
  );
}

function ListPreview({ settings }: { settings: ListSettings }) {
  return (
    <div className="w-full max-w-xl px-6">
      <List
        size={settings.size}
        spacing={settings.spacing}
        tone={settings.tone}
        variant={settings.variant}
      >
        <ListItem>Install the package.</ListItem>
        <ListItem>Import the component.</ListItem>
        <ListItem>Ship the interface.</ListItem>
      </List>
    </div>
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

function ComboboxPreview({
  settings,
  value,
  onValueChange,
}: {
  settings: ComboboxSettings;
  value: ComboboxPreviewValue;
  onValueChange: (value: ComboboxPreviewValue) => void;
}) {
  return (
    <ComboboxRoot<ComboboxPreviewValue>
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue) {
          onValueChange(nextValue);
        }
      }}
      items={comboboxPreviewItems}
      size={settings.size}
      shape={settings.shape}
      disabled={settings.disabled}
      readOnly={settings.readOnly}
      autoHighlight
    >
      <div className="w-full max-w-xs px-6">
        <ComboboxInputGroup
          variant={settings.variant}
          size={settings.size}
          shape={settings.shape}
          invalid={settings.invalid}
          prefix={settings.prefix ? <MagnifyingGlassIcon /> : undefined}
        >
          <ComboboxInput
            aria-label="Preview combobox"
            placeholder="Search frameworks"
          />
          {settings.clearable && <ComboboxClear />}
          <ComboboxTrigger />
        </ComboboxInputGroup>
      </div>
      <ComboboxPortal>
        <ComboboxPositioner>
          <ComboboxPopup>
            <ComboboxList>
              {(item: ComboboxPreviewValue) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
            <ComboboxEmpty>No frameworks found</ComboboxEmpty>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </ComboboxRoot>
  );
}

function SoundProviderPreview() {
  return (
    <SoundProvider enabled variant="pop" volume={0.8}>
      <SoundProviderControls />
    </SoundProvider>
  );
}

function DialogPreview({ settings }: { settings: DialogSettings }) {
  return (
    <DialogRoot shape={settings.shape}>
      <DialogTrigger>Archive project</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent size={settings.size}>
          <DialogHeader>
            <DialogTitle>Archive project?</DialogTitle>
            <DialogDescription>
              Move Q3 launch plan out of active work. You can restore it later
              from the archive.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose variant={"soft"}>Keep project</DialogClose>
            <Button type="button" color="neutral">
              Archive project
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
      <DrawerTrigger>View order</DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerViewport>
          <DrawerContent size={settings.size}>
            <DrawerBody>
              <DrawerHeader>
                <DrawerTitle>Order #1048</DrawerTitle>
                <DrawerDescription>
                  A shipment for Acme Studio is scheduled for Tuesday morning.
                </DrawerDescription>
              </DrawerHeader>

              <div className="grid gap-2 rounded-lg border border-border bg-surface-muted p-3 text-sm">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    customer
                  </span>
                  <span className="min-w-0 text-right font-medium text-primary">
                    Acme Studio
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    total
                  </span>
                  <span className="min-w-0 text-right font-medium text-primary">
                    $3,240.00
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    delivery
                  </span>
                  <span className="min-w-0 text-right font-medium text-primary">
                    Tuesday, 9:00 AM
                  </span>
                </div>
              </div>

              <DrawerFooter>
                <DrawerClose>Close</DrawerClose>
                <Button type="button" color="neutral">
                  Create label
                </Button>
              </DrawerFooter>
            </DrawerBody>
          </DrawerContent>
        </DrawerViewport>
      </DrawerPortal>
    </DrawerRoot>
  );
}

function PopoverPreview({ settings }: { settings: PopoverSettings }) {
  return (
    <PopoverRoot modal={settings.modal} shape={settings.shape}>
      <PopoverTrigger>Share report</PopoverTrigger>
      <PopoverPortal>
        {settings.modal && <PopoverBackdrop />}
        <PopoverPositioner side={settings.side}>
          <PopoverPopup size={settings.size}>
            {settings.arrow && <PopoverArrow />}
            <PopoverHeader>
              <PopoverTitle>Share revenue report</PopoverTitle>
              <PopoverDescription>
                Invite finance teammates to review the monthly numbers.
              </PopoverDescription>
            </PopoverHeader>

            <div className="grid gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm dark:border-white/15 dark:bg-white/5">
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  access
                </span>
                <span className="min-w-0 text-right font-medium text-primary">
                  View only
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  expires
                </span>
                <span className="min-w-0 text-right font-medium text-primary">
                  7 days
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  recipients
                </span>
                <span className="min-w-0 text-right font-medium text-primary">
                  Finance team
                </span>
              </div>
            </div>

            <PopoverFooter>
              <PopoverClose>Dismiss</PopoverClose>
              <Button type="button" color="neutral">
                Copy link
              </Button>
            </PopoverFooter>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </PopoverRoot>
  );
}

type DockPreviewView =
  | "roadmap"
  | "releases"
  | "activity"
  | "reports"
  | "inbox"
  | "customers"
  | "automations"
  | "search"
  | "brief"
  | "milestone"
  | "collaborator";

const dockPreviewViews = {
  roadmap: {
    icon: StackIcon,
    eyebrow: "Planning",
    title: "Roadmap",
    description: "Prioritize the next mobile workspace milestones.",
    metric: "4 lanes",
    status: "Q3",
    items: [
      ["Mobile command bar", "Design review", "Today"],
      ["Insights overview", "Ready for scope", "Wed"],
      ["Customer handoff", "Blocked by copy", "Fri"],
    ],
  },
  releases: {
    icon: ListIcon,
    eyebrow: "Shipping",
    title: "Releases",
    description: "Coordinate what is ready to package this week.",
    metric: "3 builds",
    status: "Stable",
    items: [
      ["v1.8 dashboard polish", "Waiting on QA", "2 checks"],
      ["API usage cards", "Release notes drafted", "Ready"],
      ["Billing filters", "Regression pass", "Tonight"],
    ],
  },
  activity: {
    icon: MagnifyingGlassIcon,
    eyebrow: "Timeline",
    title: "Activity",
    description: "Track the latest changes across the workspace.",
    metric: "18 events",
    status: "Live",
    items: [
      ["Maya moved Reports to review", "Product", "4m"],
      ["Jon attached new launch notes", "Content", "12m"],
      ["Pilot feedback imported", "Research", "31m"],
    ],
  },
  reports: {
    icon: PlusCircleIcon,
    eyebrow: "Insights",
    title: "Reports",
    description: "Review summaries before the weekly planning sync.",
    metric: "7 charts",
    status: "Draft",
    items: [
      ["Activation trend", "Up 12 percent", "Green"],
      ["Mobile retention", "Needs a closer look", "Watch"],
      ["Team velocity", "On pace", "Good"],
    ],
  },
  inbox: {
    icon: StackIcon,
    eyebrow: "Messages",
    title: "Inbox",
    description: "Triage workspace requests before they pile up.",
    metric: "99+",
    status: "Busy",
    items: [
      ["Finance approval", "Needs owner", "High"],
      ["Partner intro", "Reply drafted", "New"],
      ["Design QA notes", "Assigned to Lina", "Open"],
    ],
  },
  customers: {
    icon: ListIcon,
    eyebrow: "Accounts",
    title: "Customers",
    description: "Keep high-signal customer work easy to reach.",
    metric: "42",
    status: "Active",
    items: [
      ["Northstar Labs", "Expansion call", "Today"],
      ["Fjord Studio", "Prototype shared", "Wed"],
      ["Lumen Health", "Security review", "Open"],
    ],
  },
  automations: {
    icon: PlusCircleIcon,
    eyebrow: "Workflows",
    title: "Automations",
    description: "Inspect the helpers keeping recurring work moving.",
    metric: "Beta",
    status: "5 active",
    items: [
      ["Weekly digest", "Runs Monday", "On"],
      ["Launch checklist", "Triggered by release", "On"],
      ["Renewal reminders", "Paused for edits", "Paused"],
    ],
  },
  search: {
    icon: MagnifyingGlassIcon,
    eyebrow: "Find",
    title: "Search",
    description: "Surface pages, customers, and recent workspace files.",
    metric: "8 hits",
    status: "Recent",
    items: [
      ["Roadmap planning", "Workspace page", "Top"],
      ["Q3 launch notes", "Document", "Recent"],
      ["Northstar Labs", "Customer", "Pinned"],
    ],
  },
  brief: {
    icon: PlusCircleIcon,
    eyebrow: "Create",
    title: "New brief",
    description: "Draft the project context before the team jumps in.",
    metric: "3 steps",
    status: "Template",
    items: [
      ["Define audience", "Required", "Step 1"],
      ["Add success metric", "Recommended", "Step 2"],
      ["Assign reviewers", "Optional", "Step 3"],
    ],
  },
  milestone: {
    icon: StackIcon,
    eyebrow: "Create",
    title: "Add milestone",
    description: "Add a visible checkpoint to the active roadmap.",
    metric: "May 18",
    status: "Draft",
    items: [
      ["Name milestone", "Mobile beta", "Done"],
      ["Choose owner", "Unassigned", "Next"],
      ["Attach tasks", "12 suggested", "Later"],
    ],
  },
  collaborator: {
    icon: ListIcon,
    eyebrow: "Create",
    title: "Invite collaborator",
    description: "Bring someone into the workspace with the right context.",
    metric: "2 seats",
    status: "Ready",
    items: [
      ["Mira Chen", "Product lead", "Editor"],
      ["Owen Vale", "Research", "Viewer"],
      ["Invite note", "Personalized", "Ready"],
    ],
  },
} satisfies Record<
  DockPreviewView,
  {
    description: string;
    eyebrow: string;
    icon: typeof StackIcon;
    items: Array<[string, string, string]>;
    metric: string;
    status: string;
    title: string;
  }
>;

function DockPreview({
  settings,
  onPanelChange,
}: {
  settings: DockSettings;
  onPanelChange: (panel: DockPreviewPanel) => void;
}) {
  const [activeView, setActiveView] =
    React.useState<DockPreviewView>("roadmap");
  const activePreview = dockPreviewViews[activeView];
  const ActiveIcon = activePreview.icon;

  function selectView(view: DockPreviewView) {
    setActiveView(view);
    onPanelChange("closed");
  }

  return (
    <div className="h-[34rem] w-full max-w-2xl px-6">
      <DockRoot
        className="h-full justify-end overflow-hidden rounded-2xl border border-border bg-surface-current"
        position="static"
        shape={settings.shape}
        value={settings.panel === "closed" ? null : settings.panel}
        onValueChange={(value) =>
          onPanelChange(value === null ? "closed" : (value as DockPreviewPanel))
        }
      >
        <div className="pointer-events-auto flex min-h-0 w-full flex-1 self-stretch p-5">
          <div className="flex min-h-0 w-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-medium uppercase text-tertiary">
                  <ActiveIcon className="size-4" />
                  {activePreview.eyebrow}
                </div>
                <h3 className="mt-2 truncate text-2xl font-semibold leading-tight text-primary">
                  {activePreview.title}
                </h3>
                <p className="mt-1 max-w-sm text-sm leading-6 text-secondary">
                  {activePreview.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DockPanel value="menu">
          <DockPanelHeader>
            <DockPanelTitle>Atlas Studio</DockPanelTitle>
            <DockPanelDescription>
              Mobile navigation for a product workspace.
            </DockPanelDescription>
          </DockPanelHeader>
          <DockPanelContent>
            <DockMenu>
              <DockMenuItem
                active={activeView === "roadmap"}
                closeOnSelect
                prefix={<StackIcon />}
                onClick={() => setActiveView("roadmap")}
              >
                Roadmap
              </DockMenuItem>
              <DockMenuItem
                active={activeView === "releases"}
                closeOnSelect
                prefix={<ListIcon />}
                onClick={() => setActiveView("releases")}
              >
                Releases
              </DockMenuItem>
              <DockMenuItem
                active={activeView === "activity"}
                closeOnSelect
                prefix={<MagnifyingGlassIcon />}
                onClick={() => setActiveView("activity")}
              >
                Activity
              </DockMenuItem>
              <DockMenuItem
                active={activeView === "reports"}
                closeOnSelect
                prefix={<PlusCircleIcon />}
                onClick={() => setActiveView("reports")}
              >
                Reports
              </DockMenuItem>
              <DockSeparator />
              <DockMenuItem
                active={activeView === "inbox"}
                badge="99+"
                closeOnSelect
                prefix={<StackIcon />}
                onClick={() => setActiveView("inbox")}
              >
                Inbox
              </DockMenuItem>
              <DockMenuItem
                active={activeView === "customers"}
                closeOnSelect
                prefix={<ListIcon />}
                suffix={<ArrowRightIcon />}
                onClick={() => setActiveView("customers")}
              >
                Customers
              </DockMenuItem>
              <DockMenuItem
                active={activeView === "automations"}
                badge="Beta"
                closeOnSelect
                prefix={<PlusCircleIcon />}
                suffix={<ArrowRightIcon />}
                onClick={() => setActiveView("automations")}
              >
                Automations
              </DockMenuItem>
            </DockMenu>
          </DockPanelContent>
        </DockPanel>
        <DockPanel value="create">
          <DockPanelHeader>
            <DockPanelTitle>Quick actions</DockPanelTitle>
            <DockPanelDescription>
              Start common workspace tasks from the dock.
            </DockPanelDescription>
          </DockPanelHeader>
          <DockPanelContent>
            <DockMenu>
              <DockMenuItem
                active={activeView === "brief"}
                closeOnSelect
                prefix={<PlusCircleIcon />}
                onClick={() => setActiveView("brief")}
              >
                New brief
              </DockMenuItem>
              <DockMenuItem
                active={activeView === "milestone"}
                closeOnSelect
                prefix={<StackIcon />}
                onClick={() => setActiveView("milestone")}
              >
                Add milestone
              </DockMenuItem>
              <DockMenuItem
                active={activeView === "collaborator"}
                closeOnSelect
                prefix={<ListIcon />}
                onClick={() => setActiveView("collaborator")}
              >
                Invite collaborator
              </DockMenuItem>
            </DockMenu>
          </DockPanelContent>
        </DockPanel>

        <DockBar size={settings.size} className="mx-auto w-full max-w-sm">
          <DockButton
            active={activeView === "search"}
            aria-label="Search"
            prefix={<MagnifyingGlassIcon />}
            shape={settings.shape}
            onClick={() => selectView("search")}
          >
            Search
          </DockButton>
          <DockButton
            active={activeView === "roadmap"}
            asChild
            prefix={<StackIcon />}
            shape={settings.shape}
          >
            <a
              href="#dock-roadmap"
              onClick={(event) => {
                event.preventDefault();
                selectView("roadmap");
              }}
            >
              Roadmap
            </a>
          </DockButton>
          <DockTrigger
            value="create"
            aria-label="Open quick actions"
            activeChildren={<XIcon />}
            shape={settings.shape}
            prefix={<PlusCircleIcon />}
          >
            Menu
          </DockTrigger>
          <DockTrigger
            value="menu"
            aria-label="Toggle dock menu"
            activeChildren={<XIcon />}
            align="end"
            separator
            shape={settings.shape}
          >
            <ListIcon />
          </DockTrigger>
        </DockBar>
      </DockRoot>
    </div>
  );
}

const sidebarPreviewPages = {
  issues: {
    icon: MagnifyingGlassIcon,
    label: "My work",
  },
  projects: {
    icon: StackIcon,
    label: "Projects",
  },
  members: {
    icon: PlusCircleIcon,
    label: "Members",
  },
} as const;

type SidebarPreviewPageValue = keyof typeof sidebarPreviewPages;

const sidebarPreviewPageValues = [
  "issues",
  "projects",
  "members",
] as const satisfies readonly SidebarPreviewPageValue[];

function getSidebarPreviewTab(value: SidebarPreviewPageValue): AppTabsTabData {
  const page = sidebarPreviewPages[value];
  const Icon = page.icon;

  return {
    label: page.label,
    prefix: <Icon />,
    value,
  };
}

const sidebarPreviewInitialTabs = [
  getSidebarPreviewTab("projects"),
  getSidebarPreviewTab("issues"),
] satisfies AppTabsTabData[];

const sidebarPreviewSections = [
  {
    label: null,
    items: [{ value: "issues" }],
  },
  {
    label: "Workspace",
    items: [{ value: "projects" }, { value: "members" }],
  },
] as const satisfies readonly {
  label: string | null;
  items: readonly { value: SidebarPreviewPageValue }[];
}[];

function isSidebarPreviewPageValue(
  value: string,
): value is SidebarPreviewPageValue {
  return value in sidebarPreviewPages;
}

function SidebarPreviewNavigation({
  activeValue,
  onItemSelect,
}: {
  activeValue: SidebarPreviewPageValue;
  onItemSelect: (value: SidebarPreviewPageValue) => void;
}) {
  return (
    <SidebarContent className="space-y-5 p-2">
      {sidebarPreviewSections.map((section) => (
        <SidebarSection key={section.label ?? "primary"}>
          {section.label && (
            <SidebarSectionLabel>{section.label}</SidebarSectionLabel>
          )}
          <SidebarMenu>
            {section.items.map((item) => {
              const page = sidebarPreviewPages[item.value];
              const Icon = page.icon;

              return (
                <SidebarMenuItem key={`${section.label}-${item.value}`}>
                  <SidebarMenuButton
                    active={activeValue === item.value}
                    onClick={() => onItemSelect(item.value)}
                    prefix={<Icon />}
                    size="small"
                  >
                    {page.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarSection>
      ))}
    </SidebarContent>
  );
}

function AppTabsPreviewNavigation() {
  const { activeValue, openTab } = useAppTabs("AppTabsPreviewNavigation");
  const selectedValue = isSidebarPreviewPageValue(activeValue)
    ? activeValue
    : "projects";

  return (
    <SidebarPreviewNavigation
      activeValue={selectedValue}
      onItemSelect={(value) => openTab(getSidebarPreviewTab(value))}
    />
  );
}

function AppTabsPreviewPage({ value }: { value: SidebarPreviewPageValue }) {
  const page = sidebarPreviewPages[value];
  const [count, setCount] = React.useState(0);

  return (
    <div className="grid h-full place-items-center p-4">
      <Button
        aria-label={`Increase ${page.label} count`}
        color="neutral"
        size="medium"
        variant="soft"
        onClick={() => setCount((value) => value + 1)}
      >
        Count {count}
      </Button>
    </div>
  );
}

function SidebarPreview({
  settings,
  onOpenChange,
}: {
  settings: SidebarSettings;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeValue, setActiveValue] =
    React.useState<SidebarPreviewPageValue>("projects");

  return (
    <div className="w-full max-w-2xl px-6">
      <SidebarRoot
        collapsedWidth="3rem"
        collapsible={settings.collapsible}
        open={settings.open}
        onOpenChange={onOpenChange}
        side={settings.side}
        width="13rem"
        className="h-[34rem] !min-h-[34rem] overflow-hidden rounded-lg border border-border bg-surface-current shadow-sm"
      >
        <ComponentSidebar
          variant={settings.variant}
          className={
            settings.variant === "floating"
              ? "h-[calc(100%-1rem)] !min-h-[calc(100%-1rem)]"
              : "h-full !min-h-full"
          }
        >
          <SidebarHeader className="min-h-11">
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-primary transition-[max-width,opacity] group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0">
              Aspekt UI
            </span>
            <SidebarTrigger
              className="group-data-[state=collapsed]/sidebar:hidden"
              size="tiny"
            />
          </SidebarHeader>

          <SidebarPreviewNavigation
            activeValue={activeValue}
            onItemSelect={setActiveValue}
          />

          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  prefix={<Avatar alt="TR" fallback="TR" size="micro" />}
                >
                  Tobias
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </ComponentSidebar>

        <SidebarInset className="flex min-h-0 flex-col overflow-hidden p-0">
          <SidebarInsetContent />
        </SidebarInset>
      </SidebarRoot>
    </div>
  );
}

function AppTabsPreview({ settings }: { settings: AppTabsSettings }) {
  return (
    <div className="w-full max-w-2xl px-6">
      <AppTabsRoot
        color={settings.color}
        defaultTabs={sidebarPreviewInitialTabs}
        defaultValue="projects"
        shape={settings.shape}
        size={settings.size}
        variant={settings.variant}
        className="h-[34rem] !min-h-[34rem] overflow-hidden rounded-lg border border-border bg-surface-current shadow-sm"
      >
        <SidebarRoot
          collapsedWidth="3rem"
          width="13rem"
          className="!min-h-0 flex-1 overflow-hidden"
        >
          <ComponentSidebar variant="inset" className="h-full !min-h-full">
            <SidebarHeader className="min-h-11">
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-primary transition-[max-width,opacity] group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0">
                Aspekt UI
              </span>
              <SidebarTrigger
                className="group-data-[state=collapsed]/sidebar:hidden"
                size="tiny"
              />
            </SidebarHeader>

            <AppTabsPreviewNavigation />

            <SidebarFooter>
              <SidebarSeparator />
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    prefix={<Avatar alt="TR" fallback="TR" size="micro" />}
                  >
                    Tobias
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </ComponentSidebar>

          <SidebarInset className="flex min-h-0 flex-col overflow-hidden p-0">
            <AppTabsList />
            <SidebarInsetContent>
              {sidebarPreviewPageValues.map((value) => (
                <AppTabsPanel key={value} value={value} className="h-full">
                  <AppTabsPreviewPage value={value} />
                </AppTabsPanel>
              ))}
            </SidebarInsetContent>
          </SidebarInset>
        </SidebarRoot>
      </AppTabsRoot>
    </div>
  );
}

const toastPreviewCopy = {
  default: {
    title: "Queued",
    description: "Your export is waiting for the next publish window.",
  },
  success: {
    title: "Saved",
    description: "Your changes are now live in the component library.",
  },
  destructive: {
    title: "Publish failed",
    description: "Check the build output before trying again.",
  },
  warning: {
    title: "Review changes",
    description: "Some settings affect every installed component.",
  },
  info: {
    title: "Heads up",
    description: "A new component preview is ready to inspect.",
  },
} satisfies Record<ToastType, { title: string; description: string }>;

function ToastPreview({ settings }: { settings: ToastSettings }) {
  const maxToasts = Number(settings.maxToasts);

  return (
    <>
      <Toaster
        autoClose={settings.autoClose}
        colorful={settings.colorful}
        limit={maxToasts}
        maxToasts={maxToasts}
        position={settings.position}
        shape={settings.shape}
      />
      <ToastPreviewContent settings={settings} />
    </>
  );
}

function ToastPreviewContent({ settings }: { settings: ToastSettings }) {
  const copy = toastPreviewCopy[settings.type];
  const type = settings.type === "default" ? undefined : settings.type;
  const toastIds = React.useRef(new Set<string>());
  const toastIdCounter = React.useRef(0);
  const actionProps = React.useMemo(
    () => (settings.action ? { children: "Undo" } : undefined),
    [settings.action],
  );
  const showToast = React.useCallback(() => {
    toastIdCounter.current += 1;
    const id = `preview-toast-${toastIdCounter.current}`;
    toastIds.current.add(id);

    toast({
      id,
      title: copy.title,
      description: copy.description,
      type,
      actionProps,
      onRemove: () => {
        toastIds.current.delete(id);
      },
    });
  }, [actionProps, copy.description, copy.title, type]);

  React.useEffect(() => {
    const ids = toastIds.current;

    return () => {
      ids.forEach((id) => toast.close(id));
      ids.clear();
    };
  }, []);

  return (
    <div className="relative flex min-h-80 w-full items-center justify-center px-6 py-10">
      <Button type="button" color="neutral" onClick={showToast}>
        Show toast
      </Button>
    </div>
  );
}

const tabsPreviewPanels = {
  overview: {
    title: "Overview",
    body: "Tabs keep dense product surfaces scan-friendly by separating related content into predictable panels.",
  },
  usage: {
    title: "Usage",
    body: "Use a matching value on every tab and panel. Keyboard focus and ARIA relationships are handled by Base UI.",
  },
  api: {
    title: "API",
    body: "Control the visual language with variant, color, size, shape, orientation, and the optional active indicator.",
  },
} as const;

function TabsPreview({ settings }: { settings: TabsSettings }) {
  return (
    <div className="w-full max-w-2xl px-6">
      <TabsRoot
        defaultValue="overview"
        variant={settings.variant}
        color={settings.color}
        size={settings.size}
        shape={settings.shape}
        orientation={settings.orientation}
        className={
          settings.orientation === "vertical"
            ? "min-h-48 grid-cols-[minmax(7rem,auto)_minmax(0,1fr)]"
            : ""
        }
      >
        <TabsList activateOnFocus={settings.activateOnFocus}>
          <TabsTab value="overview" prefix={<StackIcon />}>
            Overview
          </TabsTab>
          <TabsTab value="usage">Usage</TabsTab>
          <TabsTab value="api">API</TabsTab>
          {settings.indicator && <TabsIndicator />}
        </TabsList>
        {Object.entries(tabsPreviewPanels).map(([value, panel]) => (
          <TabsPanel key={value} value={value}>
            <div className="grid gap-2">
              <h2 className="text-sm font-semibold text-primary">
                {panel.title}
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                {panel.body}
              </p>
            </div>
          </TabsPanel>
        ))}
      </TabsRoot>
    </div>
  );
}

function ScrollAreaPreview({ settings }: { settings: ScrollAreaSettings }) {
  const isHorizontal = settings.axis === "horizontal";

  return (
    <div className="w-full px-6">
      <ScrollArea
        className={[
          "mx-auto w-full",
          isHorizontal ? "h-44 max-w-2xl" : "h-72 max-w-md",
        ].join(" ")}
        contentClassName={[
          isHorizontal ? "flex w-max gap-3 p-4" : "grid min-w-full gap-3 p-4",
        ].join(" ")}
        fade={settings.fade && !isHorizontal}
        scrollbars={settings.axis}
        scrollbarVisibility="always"
        shape={settings.shape}
        size={settings.size}
        variant={settings.variant}
        viewportClassName={
          settings.fade && isHorizontal ? "scroll-fade-x scroll-fade-8" : ""
        }
      >
        {scrollAreaPreviewItems.map((item) => (
          <article
            key={item.title}
            className={[
              "grid gap-2 rounded-lg border border-border bg-surface-current px-4 py-3 shadow-sm",
              isHorizontal ? "w-60 shrink-0" : "",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-medium text-primary">{item.title}</h2>
              <span className="shrink-0 font-mono text-xs text-tertiary">
                {item.meta}
              </span>
            </div>
            <p className="text-sm leading-6 text-secondary">
              {item.description}
            </p>
          </article>
        ))}
      </ScrollArea>
    </div>
  );
}

function TablePreview({ settings }: { settings: TableSettings }) {
  return (
    <div className="w-full px-6">
      <Table
        caption="Recent invoices"
        columns={tablePreviewColumns}
        data={tablePreviewData}
        defaultSorting={[{ id: "total", desc: true }]}
        hoverable={settings.hoverable}
        shape={settings.shape}
        showColumnBorders={settings.showColumnBorders}
        size={settings.size}
        sortable={settings.sortable}
        stickyHeader={settings.stickyHeader}
        striped={settings.striped}
        variant={settings.variant}
      />
    </div>
  );
}

function SnippetPreview({ settings }: { settings: SnippetSettings }) {
  const example = snippetExamples[settings.language];

  return (
    <div className="w-full max-w-2xl px-6">
      <Snippet
        code={example.code}
        copyable={settings.copyable}
        filename={settings.filename ? example.filename : undefined}
        highlightedLines={snippetHighlightedLines[settings.language]}
        language={settings.language}
        shape={settings.shape}
        showLineNumbers={settings.showLineNumbers}
        variant={settings.variant}
        wrap={settings.wrap}
      />
    </div>
  );
}

const principlesIntro = [
  "Aspekt is built around a simple idea: interface components should feel finished.",
  "Not just functional. Not just themeable. Finished. The kind of components you can place into a product and immediately feel like the details have already been considered: spacing, motion, states, accessibility, composition, dark mode, responsiveness, and the tiny visual decisions that make an interface feel intentional.",
  "These are the principles behind Aspekt.",
] as const;

const principles = [
  {
    title: "Designed, not just styled",
    body: [
      "A component is more than a collection of classes.",
      "Aspekt components are designed as complete interface pieces, with careful attention to proportion, rhythm, interaction states, and visual balance. The goal is not to provide bare primitives and leave the rest to you. The goal is to give you components that already feel product-ready, while still leaving enough room to adapt them to your brand.",
      "You should not have to redesign a button before using it.",
    ],
  },
  {
    title: "Sharp defaults",
    body: [
      "Defaults matter.",
      "Most teams do not want to spend days tuning border radii, shadows, focus states, spacing, hover effects, and disabled styles before they can ship. Aspekt is opinionated by default so that every component looks and feels polished the moment it lands in your app.",
      "Customization should be available when you need it, not required before the component becomes usable.",
    ],
  },
  {
    title: "Color and text live on depth axes",
    body: [
      "Neutral surface color should describe depth before it describes importance.",
      "From deepest to foremost, Aspekt uses surface-1 through surface-8. Components lift relative to their current substrate, while muted, hover, active, border, and ring treatments adapt inside that surface.",
      "Text follows the same idea: text-primary, text-secondary, text-tertiary, and text-disabled move from strongest to quietest.",
      "Intent colors stay separate. Brand, status, selection, warning, and destructive states should not be hidden inside the surface scale.",
    ],
  },
  {
    title: "Customizable without becoming shapeless",
    body: [
      "Aspekt gives you control, but not chaos.",
      "Components support variants, sizes, colors, class names, and composition patterns where it makes sense. The goal is flexibility without turning every component into an unstructured styling puzzle.",
      "Good customization should preserve the quality of the component. It should help you adapt the design, not accidentally break it.",
    ],
  },
  {
    title: "Details are part of the API",
    body: [
      "The small things are not decoration. They are part of the experience.",
      "Focus rings, loading states, icon alignment, keyboard behavior, pressed states, transitions, disabled styles, text wrapping, and responsive edge cases all matter. Aspekt treats these details as part of the component’s contract.",
      "A component should not only look good in the ideal state. It should hold up in the awkward states too.",
    ],
  },
  {
    title: "Built for real products",
    body: [
      "Aspekt is made for interfaces that need to survive actual usage.",
      "Forms with errors. Buttons with long labels. Menus with keyboard navigation. Dialogs that need focus management. Components inside dashboards, marketing pages, SaaS apps, internal tools, and dense product flows.",
      "The components are designed to be beautiful, but they are not decorative toys. They are meant to be used.",
    ],
  },
  {
    title: "Accessible by default",
    body: [
      "Accessibility should not be an afterthought or a separate checklist at the end.",
      "Aspekt components are built with accessibility in mind from the start: semantic structure, keyboard interactions, focus handling, readable contrast, and predictable behavior. The goal is to make the right thing the easy thing.",
      "Good design should work for more people, not fewer.",
    ],
  },
  {
    title: "Motion with restraint",
    body: [
      "Motion should support the interface, not perform on top of it.",
      "Aspekt uses animation to make interactions feel responsive, clear, and tactile. Transitions should help users understand what changed, where something came from, or what state they are in.",
      "No unnecessary drama. No sluggish effects. No animation just because it can be animated.",
    ],
  },
  {
    title: "Sound as feedback",
    body: [
      "Sound is a first-class opt-in layer in Aspekt, not an accidental side effect.",
      "Aspekt components can include sound feedback because interactions can be felt as well as seen. Presses, toggles, success states, errors, and state changes can all become clearer when they have a short, intentional audio cue.",
      "Sound is silent until an app is wrapped in SoundProvider. Once enabled, it can be disabled globally, tuned with different sound variants and volume, or overridden per component when a specific interaction needs different behavior.",
      "Global opt-in and control belong in SoundProvider. Local control belongs on the component. Both should feel easy.",
    ],
  },
  {
    title: "Consistency without monotony",
    body: [
      "A system should feel connected, not repetitive.",
      "Aspekt components share the same visual language: spacing, shape, shadows, typography, interaction states, and motion all work together. This makes products feel coherent without forcing every screen to look identical.",
      "Consistency creates trust. Variation creates life. Aspekt aims for both.",
    ],
  },
  {
    title: "Ownership when you need it",
    body: [
      "Different teams want different levels of control.",
      "Some want a package that stays updated and improves over time. Others want to pull components into their own codebase and fully own them. Aspekt is designed to support both workflows.",
      "Use the package when you want clean updates. Bring components into your project when you need deeper control. Eject when you want full ownership.",
      "The system should adapt to how you build, not the other way around.",
    ],
  },
  {
    title: "Quality over quantity",
    body: [
      "Aspekt is not trying to be the biggest component library.",
      "It is better to have fewer components that are excellent than hundreds of components that feel unfinished. Every component should earn its place in the system.",
      "The goal is not to cover every possible UI pattern immediately. The goal is to make the important ones exceptionally well.",
    ],
  },
  {
    title: "Made to disappear",
    body: [
      "The best component libraries do not constantly remind you they exist.",
      "They help you move faster, make better interfaces, and avoid repeating the same design decisions over and over. They give your product a strong foundation, then get out of the way.",
      "Aspekt is built to feel precise, polished, and dependable — so you can focus on the product around it.",
    ],
  },
] as const;

function GettingStartedDocumentation() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Initialize Aspekt UI
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Run the CLI in a React and Tailwind project. It adds the Aspekt theme
          tokens, creates your project defaults, and prepares your project for
          copied source components.
        </Text>
        <Snippet className="max-w-3xl" tabs={initCommandTabs} />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Choose project shape
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Use square or round as the default shape for installed components.
          Aspekt stores the setting in components/aspekt/config.ts, and direct
          component props like shape=&quot;round&quot; still override it.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`npx @aspekt/ui init --preset round
npx @aspekt/ui preset square`}
          filename="terminal"
          language="bash"
        />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Add a component
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Add only the components you need. The CLI copies the component source
          into your project so you can edit it directly, and refreshes the
          Aspekt CSS theme block if needed.
        </Text>
        <Snippet className="max-w-3xl" tabs={addButtonCommandTabs} />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Import local source
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Components live in your app, usually under components/aspekt. Import
          them from your local component path.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`import { Button } from "@/components/aspekt/button";

export function SaveButton() {
  return <Button>Save changes</Button>;
}`}
          filename="save-button.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Use the same pattern everywhere
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Every component follows the same local source pattern. Browse the
          sidebar, pick the component you need, and add it with the CLI.
        </Text>
        <List
          variant="disc"
          spacing="normal"
          tone="muted"
          className="max-w-3xl"
        >
          <ListItem>
            <Code>npx @aspekt/ui add button</Code> for buttons.
          </ListItem>
          <ListItem>
            <Code>npx @aspekt/ui add dialog</Code> for modal workflows.
          </ListItem>
          <ListItem>
            <Code>npx @aspekt/ui add input</Code> for form fields.
          </ListItem>
          <ListItem>
            <Code>npx @aspekt/ui add sound-provider</Code> for global sound
            control.
          </ListItem>
        </List>
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Opt into sound feedback
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Aspekt stays silent unless you opt in. Add SoundProvider when you want
          components to play sound, subscribe to specific sound depths, change
          the sound variant, or tune the volume across your app. Mobile playback
          stays muted unless you pass <Code>mobileEnabled</Code>.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`import { SoundProvider } from "@/components/aspekt/sound-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider
      enabled
      depths={["interactions", "cues"]}
      variant="pop"
      volume={0.8}
    >
      {children}
    </SoundProvider>
  );
}`}
          filename="app-providers.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Override sound per component
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          After SoundProvider is mounted, use global settings for broad
          behavior, then override individual components when a specific
          interaction needs to be quieter, louder, or semantically different.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`import { Button } from "@/components/aspekt/button";

export function Actions() {
  return (
    <div>
      <Button status="success" sound="success">
        Publish
      </Button>
      <Button sound={false} variant="outline">
        Quiet action
      </Button>
    </div>
  );
}`}
          filename="actions.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Keep building
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Start with Button, Input, Select, Dialog, and the typography
          primitives. Each page shows the import, live preview, and controls for
          the component API.
        </Text>
      </section>
    </div>
  );
}

const scrollFadeItems = [
  "Inbox triage",
  "Customer handoff",
  "Launch notes",
  "Billing review",
  "Research summary",
  "Design QA",
  "Metrics follow-up",
  "Security check",
  "Roadmap sync",
  "Release prep",
] as const;

const scrollFadeTags = [
  "Design",
  "Engineering",
  "Marketing",
  "Product",
  "Research",
  "Sales",
  "Support",
  "Operations",
  "Finance",
  "Legal",
] as const;

function ScrollFadeDemoItems({
  count = scrollFadeItems.length,
}: {
  count?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5 p-1.5">
      {scrollFadeItems.slice(0, count).map((item) => (
        <div
          key={item}
          className="rounded-lg bg-surface-current px-3 py-2.5 text-sm text-primary shadow-sm ring-1 ring-black/5 dark:bg-surface-current dark:ring-white/10"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function ScrollFadeDemoTags() {
  return (
    <div className="flex w-max gap-1.5 p-1.5">
      {scrollFadeTags.map((tag) => (
        <div
          key={tag}
          className="shrink-0 rounded-lg bg-surface-current px-3 py-2.5 text-sm text-primary shadow-sm ring-1 ring-black/5 dark:bg-surface-current dark:ring-white/10"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

function ScrollFadeFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-surface-current dark:border-white/10 dark:bg-surface-active">
        {children}
      </div>
      <Text as="p" size="xs" tone="muted" className="text-center font-mono">
        {label}
      </Text>
    </div>
  );
}

function ScrollFadeDocumentation() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Install once
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Scroll Fade ships in the Aspekt theme block. Run init once, then add
          the utility classes to any scroll container.
        </Text>
        <Snippet
          className="max-w-3xl"
          code="pnpm dlx @aspekt/ui init"
          filename="terminal"
          language="bash"
        />
      </section>

      <section className="grid gap-6 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-4">
          <Heading level={2} size="h5" className="max-w-3xl">
            Vertical scroll
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Use <Code>scroll-fade</Code> or <Code>scroll-fade-y</Code> on the
            element that owns vertical overflow. The mask reveals and clears as
            the container reaches each edge.
          </Text>
        </div>

        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <ScrollFadeFrame label="scroll-fade">
            <div className="h-72 overflow-y-auto scroll-fade">
              <ScrollFadeDemoItems />
            </div>
          </ScrollFadeFrame>
          <ScrollFadeFrame label="scroll-fade scroll-fade-24">
            <div className="h-72 overflow-y-auto scroll-fade scroll-fade-24">
              <ScrollFadeDemoItems />
            </div>
          </ScrollFadeFrame>
        </div>

        <Snippet
          className="max-w-3xl"
          code={`<div className="h-72 overflow-y-auto scroll-fade">
  {items.map((item) => (
    <div key={item}>{item}</div>
  ))}
</div>`}
          filename="scroll-list.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-6 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-4">
          <Heading level={2} size="h5" className="max-w-3xl">
            Horizontal and edge fades
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Use <Code>scroll-fade-x</Code> for horizontal overflow. Use edge
            classes when only one side should fade.
          </Text>
        </div>

        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <ScrollFadeFrame label="scroll-fade-x">
            <div className="overflow-x-auto scroll-fade-x">
              <ScrollFadeDemoTags />
            </div>
          </ScrollFadeFrame>
          <ScrollFadeFrame label="scroll-fade-b">
            <div className="h-36 overflow-y-auto scroll-fade-b">
              <ScrollFadeDemoItems count={7} />
            </div>
          </ScrollFadeFrame>
        </div>

        <Snippet
          className="max-w-3xl"
          code={`<div className="overflow-x-auto scroll-fade-x">
  {tags.map((tag) => (
    <div key={tag}>{tag}</div>
  ))}
</div>

<div className="h-48 overflow-y-auto scroll-fade-b">
  ...
</div>`}
          filename="scroll-fade-edges.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Reference
        </Heading>
        <List
          variant="disc"
          spacing="normal"
          tone="muted"
          className="max-w-3xl"
        >
          <ListItem>
            <Code>scroll-fade</Code>, <Code>scroll-fade-y</Code>, and{" "}
            <Code>scroll-fade-x</Code> cover both edges on an axis.
          </ListItem>
          <ListItem>
            <Code>scroll-fade-t</Code>, <Code>scroll-fade-r</Code>,{" "}
            <Code>scroll-fade-b</Code>, and <Code>scroll-fade-l</Code> target
            physical edges.
          </ListItem>
          <ListItem>
            <Code>scroll-fade-s</Code> and <Code>scroll-fade-e</Code> target
            logical inline start and end, including RTL layouts.
          </ListItem>
          <ListItem>
            <Code>scroll-fade-24</Code>, <Code>scroll-fade-[15%]</Code>, and
            per-edge sizes like <Code>scroll-fade-b-8</Code> tune the fade
            distance.
          </ListItem>
          <ListItem>
            <Code>scroll-fade-none</Code> removes the mask for responsive or
            stateful overrides.
          </ListItem>
        </List>
      </section>
    </div>
  );
}

function ShimmerFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-surface-current p-5 dark:border-white/10 dark:bg-surface-active">
      <div className="flex min-h-16 items-center">{children}</div>
      <Text as="p" size="xs" tone="muted" className="font-mono">
        {label}
      </Text>
    </div>
  );
}

function ShimmerDocumentation() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Install once
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Shimmer ships in the Aspekt theme block. Run init once, then add the
          utility classes to text that represents loading, pending, or generated
          output.
        </Text>
        <Snippet
          className="max-w-3xl"
          code="pnpm dlx @aspekt/ui init"
          filename="terminal"
          language="bash"
        />
      </section>

      <section className="grid gap-6 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-4">
          <Heading level={2} size="h5" className="max-w-3xl">
            Text shimmer
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Use <Code>shimmer</Code> on text that should feel alive while a
            response, summary, or result is being prepared. It uses the text
            color as the base and sweeps a highlight through the glyphs.
          </Text>
        </div>

        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <ShimmerFrame label="shimmer">
            <p className="shimmer text-sm text-secondary">
              Generating response...
            </p>
          </ShimmerFrame>
          <ShimmerFrame label="shimmer shimmer-color-info/60 shimmer-duration-1000">
            <p className="shimmer shimmer-color-info/60 shimmer-duration-1000 text-sm text-secondary">
              Searching project context...
            </p>
          </ShimmerFrame>
        </div>

        <Snippet
          className="max-w-3xl"
          code={`<p className="shimmer text-primary">
  Generating response...
</p>

<p className="shimmer shimmer-color-info/60 shimmer-duration-1000">
  Searching project context...
</p>`}
          filename="pending-state.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-6 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-4">
          <Heading level={2} size="h5" className="max-w-3xl">
            Direction and spread
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Tune the highlight with color, duration, angle, and spread
            modifiers. Use <Code>shimmer-reverse</Code> for the opposite sweep,
            or <Code>shimmer-once</Code> when the shimmer should run one time.
          </Text>
        </div>

        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <ShimmerFrame label="shimmer shimmer-color-success/70 shimmer-spread-24">
            <p className="shimmer shimmer-color-success/70 shimmer-spread-24 text-sm text-secondary">
              Syncing workspace state...
            </p>
          </ShimmerFrame>
          <ShimmerFrame label="shimmer shimmer-angle-45 shimmer-reverse">
            <p className="shimmer shimmer-angle-45 shimmer-reverse text-sm text-secondary">
              Preparing handoff notes...
            </p>
          </ShimmerFrame>
        </div>

        <Snippet
          className="max-w-3xl"
          code={`<span className="shimmer shimmer-color-success/70 shimmer-spread-24">
  Syncing workspace state...
</span>

<span className="shimmer shimmer-angle-45 shimmer-reverse">
  Preparing handoff notes...
</span>`}
          filename="shimmer-options.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-6 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-4">
          <Heading level={2} size="h5" className="max-w-3xl">
            Disable when needed
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Use <Code>shimmer-none</Code> for responsive or stateful overrides.
            Reduced-motion users also receive the non-animated fallback.
          </Text>
        </div>

        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <ShimmerFrame label="shimmer shimmer-once">
            <p className="shimmer shimmer-once text-sm text-secondary">
              Created summary
            </p>
          </ShimmerFrame>
          <ShimmerFrame label="shimmer shimmer-none">
            <p className="shimmer shimmer-none text-sm text-secondary">
              Static text fallback
            </p>
          </ShimmerFrame>
        </div>
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Reference
        </Heading>
        <List
          variant="disc"
          spacing="normal"
          tone="muted"
          className="max-w-3xl"
        >
          <ListItem>
            <Code>shimmer</Code> applies the animated text shimmer.
          </ListItem>
          <ListItem>
            <Code>shimmer-color-info/60</Code> and{" "}
            <Code>shimmer-color-[#7c3aed]</Code> set the highlight color.
          </ListItem>
          <ListItem>
            <Code>shimmer-duration-1000</Code> and{" "}
            <Code>shimmer-duration-[1.75s]</Code> set animation speed.
          </ListItem>
          <ListItem>
            <Code>shimmer-spread-24</Code> and <Code>shimmer-angle-45</Code>{" "}
            adjust the sweep shape.
          </ListItem>
          <ListItem>
            <Code>shimmer-once</Code>, <Code>shimmer-reverse</Code>, and{" "}
            <Code>shimmer-none</Code> control repetition, direction, and
            fallback.
          </ListItem>
        </List>
      </section>
    </div>
  );
}

function UtilityDocumentation({ activePage }: { activePage: UtilityPage }) {
  if (activePage === "scroll-fade") {
    return <ScrollFadeDocumentation />;
  }

  return <ShimmerDocumentation />;
}

function PrinciplesDocumentation() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Principles
        </Heading>
        {principlesIntro.map((paragraph) => (
          <Text key={paragraph} size="base" tone="muted" className="max-w-3xl">
            {paragraph}
          </Text>
        ))}
      </section>

      <section className="grid gap-8">
        {principles.map((principle) => (
          <div
            key={principle.title}
            className="grid gap-3 border-t border-neutral-200 pt-6 dark:border-white/15"
          >
            <Heading level={3} size="h5" className="max-w-3xl">
              {principle.title}
            </Heading>
            {principle.body.map((paragraph) => (
              <Text
                key={paragraph}
                size="base"
                tone="muted"
                className="max-w-3xl"
              >
                {paragraph}
              </Text>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

const surfaceDepthTokens = [
  {
    name: "--surface-1",
    className: "bg-surface-1",
    layer: "Level 1",
    position: "Canvas",
    description: "The default app and site substrate.",
  },
  {
    name: "--surface-2",
    className: "bg-surface-2",
    layer: "Level 2",
    position: "Raised",
    description: "Cards, panels, tables, and persistent content surfaces.",
  },
  {
    name: "--surface-3",
    className: "bg-surface-3",
    layer: "Level 3",
    position: "Floating",
    description: "Small overlays, menus, and elevated nested panels.",
  },
  {
    name: "--surface-4",
    className: "bg-surface-4",
    layer: "Level 4",
    position: "Overlay",
    description: "Dialogs, drawers, toasts, and prominent overlay surfaces.",
  },
  {
    name: "--surface-5",
    className: "bg-surface-5",
    layer: "Level 5",
    position: "Nested overlay",
    description: "Dropdowns and popovers opened inside larger overlays.",
  },
  {
    name: "--surface-6",
    className: "bg-surface-6",
    layer: "Level 6",
    position: "Deep nested",
    description: "Second-order nested overlays that still need separation.",
  },
  {
    name: "--surface-7",
    className: "bg-surface-7",
    layer: "Level 7",
    position: "High foreground",
    description: "Rare foreground planes above already elevated content.",
  },
  {
    name: "--surface-8",
    className: "bg-surface-8",
    layer: "Level 8",
    position: "Maximum",
    description: "The clamped top of the surface ladder.",
  },
] as const;

const surfaceTreatmentTokens = [
  {
    name: "--surface-current",
    className: "bg-surface-current",
    description:
      "The current substrate inherited from the nearest Surface context.",
  },
  {
    name: "--surface-muted",
    className: "bg-surface-muted",
    description:
      "Soft fills, quiet regions, rails, code blocks, and inactive controls.",
  },
  {
    name: "--surface-hover",
    className: "bg-surface-hover",
    description: "Hover and transient interaction fills inside a surface.",
  },
  {
    name: "--surface-active",
    className: "bg-surface-active",
    description: "Pressed, selected, checked, and active neutral states.",
  },
  {
    name: "--surface-border",
    className: "bg-surface-border",
    description: "Default contextual borders and separators.",
  },
  {
    name: "--surface-border-strong",
    className: "bg-surface-border-strong",
    description: "Higher contrast borders for selected or emphasized outlines.",
  },
  {
    name: "--surface-ring",
    className: "bg-surface-ring",
    description: "Contextual focus rings and active outlines.",
  },
] as const;

const surfaceShadowTokens = [
  {
    name: "shadow-surface-1",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-1",
    description: "The resting shadow for the app canvas and base substrate.",
  },
  {
    name: "shadow-surface-2",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-2",
    description: "A quiet elevation for cards, panels, and tables.",
  },
  {
    name: "shadow-surface-3",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-3",
    description: "A visible lift for floating panels and compact overlays.",
  },
  {
    name: "shadow-surface-4",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-4",
    description: "The default overlay shadow for dialogs, drawers, and toasts.",
  },
  {
    name: "shadow-surface-5",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-5",
    description: "A stronger shadow for overlays opened inside overlays.",
  },
  {
    name: "shadow-surface-6",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-6",
    description: "A high foreground shadow for second-order nested content.",
  },
  {
    name: "shadow-surface-7",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-7",
    description: "A rare foreground shadow above already elevated planes.",
  },
  {
    name: "shadow-surface-8",
    className: "bg-surface-current",
    previewClassName: "h-10 w-14 rounded-lg shadow-surface-8",
    description: "The strongest clamped shadow in the surface scale.",
  },
] as const;

const surfaceTokenGroups = [
  {
    title: "Surface levels",
    tokens: surfaceDepthTokens,
  },
  {
    title: "Surface treatments",
    tokens: surfaceTreatmentTokens,
  },
  {
    title: "Surface shadows",
    tokens: surfaceShadowTokens,
  },
] as const;

const textDepthTokens = [
  {
    name: "--text-primary",
    className: "bg-primary",
    textClassName: "text-primary",
    layer: "Text 0",
    position: "Primary",
    description: "Default body, labels, headings, and high-emphasis text.",
  },
  {
    name: "--text-secondary",
    className: "bg-secondary",
    textClassName: "text-secondary",
    layer: "Text 1",
    position: "Secondary",
    description: "Supporting copy, helper text, captions, and quieter labels.",
  },
  {
    name: "--text-tertiary",
    className: "bg-tertiary",
    textClassName: "text-tertiary",
    layer: "Text 2",
    position: "Tertiary",
    description: "Low-emphasis metadata, hints, and decorative interface text.",
  },
  {
    name: "--text-disabled",
    className: "bg-disabled",
    textClassName: "text-disabled",
    layer: "Text 3",
    position: "Disabled",
    description: "Unavailable, disabled, or intentionally inactive text.",
  },
] as const;

const textRoleTokens = [
  {
    name: "--text-inverse",
    className: "bg-inverse",
    description: "Text on inverse neutral surfaces.",
  },
  {
    name: "--text-on-color",
    className: "bg-on-color",
    description: "Text on filled brand or action colors.",
  },
  {
    name: "--text-link",
    className: "bg-link",
    description: "Links and navigational text affordances.",
  },
] as const;

const colorTokenGroups = [
  {
    title: "Text depth",
    tokens: textDepthTokens,
  },
  {
    title: "Text roles",
    tokens: textRoleTokens,
  },
  {
    title: "Actions",
    tokens: [
      {
        name: "--action",
        className: "bg-action",
        description: "Primary brand and action color.",
      },
      {
        name: "--action-secondary",
        className: "bg-action-secondary",
        description: "Lower-emphasis actions and neutral controls.",
      },
      {
        name: "--accent",
        className: "bg-accent",
        description: "Soft emphasis and selected states.",
      },
      {
        name: "--destructive",
        className: "bg-destructive",
        description: "Dangerous or destructive actions.",
      },
      {
        name: "--destructive-surface",
        className: "bg-destructive-surface",
        description: "Soft destructive surfaces for status components.",
      },
      {
        name: "--destructive-border",
        className: "bg-destructive-border",
        description: "Lower-chroma destructive borders and outlines.",
      },
    ],
  },
  {
    title: "Feedback",
    tokens: [
      {
        name: "--success",
        className: "bg-success",
        description: "Successful states and positive confirmations.",
      },
      {
        name: "--success-surface",
        className: "bg-success-surface",
        description: "Soft success surfaces for status components.",
      },
      {
        name: "--success-border",
        className: "bg-success-border",
        description: "Lower-chroma success borders and outlines.",
      },
      {
        name: "--warning",
        className: "bg-warning",
        description: "Cautionary states that need attention.",
      },
      {
        name: "--warning-surface",
        className: "bg-warning-surface",
        description: "Soft warning surfaces for status components.",
      },
      {
        name: "--warning-border",
        className: "bg-warning-border",
        description: "Lower-chroma warning borders and outlines.",
      },
      {
        name: "--info",
        className: "bg-info",
        description: "Informational states and neutral notices.",
      },
      {
        name: "--info-surface",
        className: "bg-info-surface",
        description: "Soft info surfaces for status components.",
      },
      {
        name: "--info-border",
        className: "bg-info-border",
        description: "Lower-chroma info borders and outlines.",
      },
    ],
  },
  {
    title: "Structure",
    tokens: [
      {
        name: "--border",
        className: "bg-border",
        description: "Borders and separators.",
      },
      {
        name: "--input",
        className: "bg-input",
        description: "Input borders and field surfaces.",
      },
      {
        name: "--ring",
        className: "bg-ring",
        description: "Focus rings and active outlines.",
      },
      {
        name: "--overlay-scrim",
        className: "bg-overlay-scrim",
        description: "Modal and drawer scrims that dim inactive content.",
      },
    ],
  },
  {
    title: "Radii",
    tokens: [
      {
        name: "--radius",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-[var(--radius)]",
        description: "Base corner radius used to derive the scale.",
      },
      {
        name: "--radius-sm",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-sm",
        description: "Small controls and compact nested elements.",
      },
      {
        name: "--radius-md",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-md",
        description: "Default control radius.",
      },
      {
        name: "--radius-lg",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-lg",
        description: "Cards, previews, and larger controls.",
      },
      {
        name: "--radius-xl",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-xl",
        description: "Large surfaces and prominent panels.",
      },
      {
        name: "--radius-2xl",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-2xl",
        description: "Roomier modal and sheet surfaces.",
      },
      {
        name: "--radius-3xl",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-3xl",
        description: "Maximum radius for expressive large containers.",
      },
      {
        name: "--radius-full",
        className: "bg-surface-current",
        previewClassName: "h-10 w-14 rounded-full",
        description: "Fully rounded pills, toggles, and circular controls.",
      },
    ],
  },
] as const;

type TypographyDocumentationProps = {
  activePrimitive: TypographyPrimitive;
  blockquoteSettings: BlockquoteSettings;
  codeSettings: CodeSettings;
  headingSettings: HeadingSettings;
  kbdSettings: KbdSettings;
  listSettings: ListSettings;
  onActivePrimitiveChange: (primitive: TypographyPrimitive) => void;
  proseSettings: ProseSettings;
  setBlockquoteSettings: React.Dispatch<
    React.SetStateAction<BlockquoteSettings>
  >;
  setCodeSettings: React.Dispatch<React.SetStateAction<CodeSettings>>;
  setHeadingSettings: React.Dispatch<React.SetStateAction<HeadingSettings>>;
  setKbdSettings: React.Dispatch<React.SetStateAction<KbdSettings>>;
  setListSettings: React.Dispatch<React.SetStateAction<ListSettings>>;
  setProseSettings: React.Dispatch<React.SetStateAction<ProseSettings>>;
  setTextSettings: React.Dispatch<React.SetStateAction<TextSettings>>;
  textSettings: TextSettings;
};

function TypographyPrimitivePreview({
  activePrimitive,
  blockquoteSettings,
  codeSettings,
  headingSettings,
  kbdSettings,
  listSettings,
  proseSettings,
  textSettings,
}: Pick<
  TypographyDocumentationProps,
  | "activePrimitive"
  | "blockquoteSettings"
  | "codeSettings"
  | "headingSettings"
  | "kbdSettings"
  | "listSettings"
  | "proseSettings"
  | "textSettings"
>) {
  if (activePrimitive === "heading") {
    return <HeadingPreview settings={headingSettings} />;
  }

  if (activePrimitive === "text") {
    return <TextPreview settings={textSettings} />;
  }

  if (activePrimitive === "code") {
    return <CodePreview settings={codeSettings} />;
  }

  if (activePrimitive === "kbd") {
    return <KbdPreview settings={kbdSettings} />;
  }

  if (activePrimitive === "prose") {
    return <ProsePreview settings={proseSettings} />;
  }

  if (activePrimitive === "blockquote") {
    return <BlockquotePreview settings={blockquoteSettings} />;
  }

  return <ListPreview settings={listSettings} />;
}

function TypographyPrimitiveControls({
  activePrimitive,
  blockquoteSettings,
  codeSettings,
  headingSettings,
  kbdSettings,
  listSettings,
  proseSettings,
  setBlockquoteSettings,
  setCodeSettings,
  setHeadingSettings,
  setKbdSettings,
  setListSettings,
  setProseSettings,
  setTextSettings,
  textSettings,
}: Omit<TypographyDocumentationProps, "onActivePrimitiveChange">) {
  if (activePrimitive === "heading") {
    return (
      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
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
    );
  }

  if (activePrimitive === "text") {
    return (
      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
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
    );
  }

  if (activePrimitive === "code") {
    return (
      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
        <BooleanOptionRow
          label="copyable"
          checked={codeSettings.copyable}
          onCheckedChange={(copyable) =>
            setCodeSettings((settings) => ({ ...settings, copyable }))
          }
        />
        <OptionRow
          label="variant"
          values={codeOptions.variant}
          active={codeSettings.variant}
          onValueChange={(variant) =>
            setCodeSettings((settings) => ({ ...settings, variant }))
          }
        />
        <OptionRow
          label="tone"
          values={codeOptions.tone}
          active={codeSettings.tone}
          onValueChange={(tone) =>
            setCodeSettings((settings) => ({ ...settings, tone }))
          }
        />
      </div>
    );
  }

  if (activePrimitive === "kbd") {
    return (
      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
        <OptionRow
          label="variant"
          values={kbdOptions.variant}
          active={kbdSettings.variant}
          onValueChange={(variant) =>
            setKbdSettings((settings) => ({ ...settings, variant }))
          }
        />
        <OptionRow
          label="size"
          values={kbdOptions.size}
          active={kbdSettings.size}
          onValueChange={(size) =>
            setKbdSettings((settings) => ({ ...settings, size }))
          }
        />
        <OptionRow
          label="shape"
          values={kbdOptions.shape}
          active={kbdSettings.shape}
          onValueChange={(shape) =>
            setKbdSettings((settings) => ({ ...settings, shape }))
          }
        />
      </div>
    );
  }

  if (activePrimitive === "prose") {
    return (
      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
        <OptionRow
          label="size"
          values={proseOptions.size}
          active={proseSettings.size}
          onValueChange={(size) =>
            setProseSettings((settings) => ({ ...settings, size }))
          }
        />
        <OptionRow
          label="tone"
          values={proseOptions.tone}
          active={proseSettings.tone}
          onValueChange={(tone) =>
            setProseSettings((settings) => ({ ...settings, tone }))
          }
        />
      </div>
    );
  }

  if (activePrimitive === "blockquote") {
    return (
      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
        <OptionRow
          label="size"
          values={blockquoteOptions.size}
          active={blockquoteSettings.size}
          onValueChange={(size) =>
            setBlockquoteSettings((settings) => ({ ...settings, size }))
          }
        />
        <OptionRow
          label="tone"
          values={blockquoteOptions.tone}
          active={blockquoteSettings.tone}
          onValueChange={(tone) =>
            setBlockquoteSettings((settings) => ({ ...settings, tone }))
          }
        />
      </div>
    );
  }

  return (
    <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
      <OptionRow
        label="variant"
        values={listOptions.variant}
        active={listSettings.variant}
        onValueChange={(variant) =>
          setListSettings((settings) => ({ ...settings, variant }))
        }
      />
      <OptionRow
        label="size"
        values={listOptions.size}
        active={listSettings.size}
        onValueChange={(size) =>
          setListSettings((settings) => ({ ...settings, size }))
        }
      />
      <OptionRow
        label="spacing"
        values={listOptions.spacing}
        active={listSettings.spacing}
        onValueChange={(spacing) =>
          setListSettings((settings) => ({ ...settings, spacing }))
        }
      />
      <OptionRow
        label="tone"
        values={listOptions.tone}
        active={listSettings.tone}
        onValueChange={(tone) =>
          setListSettings((settings) => ({ ...settings, tone }))
        }
      />
    </div>
  );
}

function TypographyDocumentation(props: TypographyDocumentationProps) {
  const activeCopy = componentCopy[props.activePrimitive];

  return (
    <div className="grid gap-12">
      <section className="grid gap-6 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-3">
          <Heading level={2} size="h5" className="max-w-3xl">
            Text primitives
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Typography components share tone, scale, spacing, and composition
            defaults so product text feels deliberate from headings to dense
            long-form content.
          </Text>
        </div>

        <div className="grid gap-4">
          <TabsRoot
            value={props.activePrimitive}
            onValueChange={(value) => {
              if (value && isComponentPreview(value)) {
                props.onActivePrimitiveChange(value as TypographyPrimitive);
              }
            }}
            variant="outline"
            color="neutral"
            size="tiny"
          >
            <TabsList>
              {typographyPrimitiveIds.map((primitive) => (
                <TabsTab key={primitive} value={primitive}>
                  {componentCopy[primitive].title}
                </TabsTab>
              ))}
              <TabsIndicator />
            </TabsList>
          </TabsRoot>
          <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-surface-current px-4 py-10 dark:bg-neutral-900/70">
            <TypographyPrimitivePreview {...props} />
          </div>
        </div>

        <TabsRoot defaultValue="usage" variant="line" color="neutral">
          <TabsList>
            <TabsTab value="usage">Usage</TabsTab>
            <TabsTab value="controls">Controls</TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanel value="usage">
            <div className="grid gap-4">
              <Text size="base" tone="muted" className="max-w-3xl">
                {activeCopy.title} {activeCopy.description}
              </Text>
              <ImportExample activeComponent={props.activePrimitive} />
            </div>
          </TabsPanel>
          <TabsPanel value="controls">
            <TypographyPrimitiveControls {...props} />
          </TabsPanel>
        </TabsRoot>
      </section>
    </div>
  );
}

type SurfacePreviewLevel = (typeof surfaceLevels)[number];

function getSurfacePreviewLevel(value: number) {
  return Math.min(8, Math.max(1, Math.round(value))) as SurfacePreviewLevel;
}

function getSurfacePreviewLayerStyle(level: SurfacePreviewLevel) {
  return {
    backgroundColor: `var(--surface-${level})`,
    boxShadow: `var(--surface-shadow-${level})`,
  } satisfies React.CSSProperties;
}

const surfacePreviewCode = `import {
  ElevatedSurface,
  SurfaceProvider,
} from "@/components/aspekt/surface";

function NestedOverlayPreview() {
  return (
    <SurfaceProvider value={1}>
      <ElevatedSurface lift={1}>
        <ElevatedSurface lift={1}>
          <ElevatedSurface lift={2}>
            Popover inside a card
          </ElevatedSurface>
        </ElevatedSurface>
      </ElevatedSurface>
    </SurfaceProvider>
  );
}`;

const contextualSurfacePreviewCode = `import { Button } from "@/components/aspekt/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/aspekt/card";
import { Surface, SurfaceProvider } from "@/components/aspekt/surface";

function ContextualCard({ level }: { level: number }) {
  return (
    <SurfaceProvider value={1}>
      <Card surface={level} surfaceShadow={level}>
        <CardHeader>
          <CardTitle>Workspace review</CardTitle>
          <CardDescription>Card substrate surface-{level}</CardDescription>
          <CardAction>
            <Button size="tiny" variant="soft">
              Approve
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Button variant="outline">Details</Button>
          <Surface lift={2}>Nested menu</Surface>
        </CardContent>
      </Card>
    </SurfaceProvider>
  );
}`;

const dashboardSurfacePreviewCode = `import {
  PopoverArrow,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/aspekt/popover";
import { Surface } from "@/components/aspekt/surface";

function DashboardOverlayStack() {
  return (
    <Surface level={1}>
      <main>Dashboard background</main>

      <Surface lift={3}>
        <aside>Drawer</aside>

        <PopoverRoot defaultOpen>
          <PopoverTrigger variant="soft">
            Qualified leads
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner side="bottom" sideOffset={8}>
              <PopoverPopup surfaceLift={2}>
                <PopoverArrow />
                Popover inside drawer
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </PopoverRoot>
      </Surface>
    </Surface>
  );
}`;

function SurfaceStackLayer({
  index = 0,
  levels,
}: {
  index?: number;
  levels: readonly SurfacePreviewLevel[];
}) {
  const level = levels[index];

  if (!level) return null;

  const isLast = index === levels.length - 1;

  return (
    <Surface
      level={level}
      shadow={level}
      className={[
        "relative flex items-center justify-center border border-border transition-[background-color,box-shadow]",
        isLast
          ? "h-24 w-24 rounded-2xl sm:h-28 sm:w-28"
          : "rounded-[1.75rem] p-4 sm:p-6",
      ]
        .filter(Boolean)
        .join(" ")}
      style={getSurfacePreviewLayerStyle(level)}
    >
      <span className="sr-only">surface-{level}</span>
      {isLast ? null : <SurfaceStackLayer levels={levels} index={index + 1} />}
    </Surface>
  );
}

function DashboardSurfacePreview() {
  return (
    <div className="grid gap-4 pt-2">
      <div className="grid gap-3">
        <Heading level={4} size="h6" className="max-w-3xl">
          Dashboard, drawer, popover
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          A common product flow: open a drawer from a dashboard, then open a
          popover inside that drawer. Each overlay lifts from the surface it
          actually sits in.
        </Text>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-current p-4 text-primary shadow-surface-2 sm:p-6">
        <TabsRoot defaultValue="preview" variant="soft" color="neutral">
          <TabsList>
            <TabsTab value="preview">Preview</TabsTab>
            <TabsTab value="code">Code</TabsTab>
            <TabsIndicator />
          </TabsList>

          <TabsPanel value="preview">
            <div className="pt-6">
              <Surface
                level={1}
                shadow={1}
                className="relative min-h-[34rem] overflow-hidden rounded-2xl border border-border"
              >
                <div className="grid h-full min-h-[34rem] grid-cols-[4.5rem_minmax(0,1fr)]">
                  <aside className="border-r border-border bg-surface-muted p-3">
                    <div className="mb-6 size-9 rounded-xl bg-surface-active" />
                    <div className="grid gap-2">
                      {["", "", "", ""].map((_, index) => (
                        <div
                          key={index}
                          className="h-8 rounded-lg bg-surface-hover"
                        />
                      ))}
                    </div>
                  </aside>

                  <main className="grid content-start gap-4 p-4 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <Heading level={5} size="h6">
                          Revenue dashboard
                        </Heading>
                        <Text size="sm" tone="muted">
                          Surface-1 application background
                        </Text>
                      </div>
                      <Button color="neutral" size="small" variant="outline">
                        Filters
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {["Pipeline", "Conversion", "Expansion"].map((label) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-border bg-surface-current p-3"
                        >
                          <Text size="sm" tone="muted">
                            {label}
                          </Text>
                          <div className="mt-2 h-6 rounded-lg bg-surface-muted" />
                        </div>
                      ))}
                    </div>

                    <div className="grid h-48 items-end gap-2 rounded-2xl border border-border bg-surface-muted p-4 sm:grid-cols-8">
                      {[54, 68, 46, 76, 88, 58, 72, 92].map((height, index) => (
                        <div
                          key={index}
                          className="rounded-t-lg bg-surface-active"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </main>
                </div>

                <Surface
                  lift={3}
                  className="absolute inset-y-4 right-4 flex w-[min(22rem,calc(100%-2rem))] flex-col rounded-2xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Heading level={5} size="h6">
                        Segment drawer
                      </Heading>
                      <Text size="sm" tone="muted">
                        Lifted to surface-4 from the dashboard
                      </Text>
                    </div>
                    <Code>4</Code>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-xl bg-surface-muted p-3">
                      <Text size="sm" tone="muted">
                        Account owner
                      </Text>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">Mina Torres</span>
                        <Button color="neutral" size="tiny" variant="soft">
                          Change
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border p-3">
                      <Text size="sm" tone="muted">
                        Status filter
                      </Text>
                      <Button
                        className="mt-2 w-full justify-between"
                        color="neutral"
                        size="small"
                        suffix={<span className="text-secondary">3</span>}
                        variant="soft"
                      >
                        Qualified leads
                      </Button>
                      <Surface
                        lift={2}
                        className="mt-2 grid gap-3 rounded-xl border border-border p-3"
                      >
                        <div>
                          <Heading level={6} size="h6">
                            Status popover
                          </Heading>
                          <Text size="sm" tone="muted">
                            Lifted from the drawer context to surface-6.
                          </Text>
                        </div>

                        <div className="grid gap-1">
                          {["Qualified", "Proposal sent", "Needs review"].map(
                            (status) => (
                              <button
                                key={status}
                                type="button"
                                className="rounded-lg px-2.5 py-1.5 text-left text-sm text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
                              >
                                {status}
                              </button>
                            ),
                          )}
                        </div>
                      </Surface>
                    </div>
                  </div>
                </Surface>
              </Surface>
            </div>
          </TabsPanel>

          <TabsPanel value="code">
            <Snippet
              className="mt-6"
              code={dashboardSurfacePreviewCode}
              filename="dashboard-overlay-stack.tsx"
              language="tsx"
              variant="soft"
            />
          </TabsPanel>
        </TabsRoot>
      </div>
    </div>
  );
}

function SurfaceContextPreview() {
  const [cardLevel, setCardLevel] = React.useState<SurfacePreviewLevel>(3);
  const nestedLevel = getSurfacePreviewLevel(cardLevel + 2);

  return (
    <div className="grid gap-4 pt-2">
      <div className="grid gap-3">
        <Heading level={4} size="h6" className="max-w-3xl">
          One card, many substrates
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Move the card through the ladder. The neutral buttons, muted regions,
          borders, and lifted menu all recompute from that card&apos;s current
          surface instead of using fixed colors.
        </Text>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-current p-4 text-primary shadow-surface-2 sm:p-6">
        <TabsRoot defaultValue="preview" variant="soft" color="neutral">
          <TabsList>
            <TabsTab value="preview">Preview</TabsTab>
            <TabsTab value="code">Code</TabsTab>
            <TabsIndicator />
          </TabsList>

          <TabsPanel value="preview">
            <div className="grid gap-8 pt-6">
              <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-1 p-6">
                <SurfaceProvider value={1}>
                  <Card
                    surface={cardLevel}
                    surfaceShadow={cardLevel}
                    shape="round"
                    size="large"
                    className="relative max-w-md overflow-visible"
                  >
                    <CardHeader>
                      <CardTitle>Workspace review</CardTitle>
                      <CardDescription>
                        Card substrate surface-{cardLevel}
                      </CardDescription>
                      <CardAction>
                        <Button color="neutral" size="tiny" variant="soft">
                          Approve
                        </Button>
                      </CardAction>
                    </CardHeader>

                    <CardContent className="grid gap-3">
                      <div className="grid gap-2 rounded-xl bg-surface-muted p-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-secondary">Pending edits</span>
                          <span className="font-mono text-primary">12</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-surface-active">
                          <div className="h-full w-2/3 rounded-full bg-primary" />
                        </div>
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2">
                        <Button
                          color="neutral"
                          size="small"
                          variant="outline"
                          className="w-full"
                        >
                          Details
                        </Button>
                        <Button
                          color="neutral"
                          size="small"
                          variant="ghost"
                          className="w-full"
                        >
                          Snooze
                        </Button>
                      </div>

                      <Surface
                        lift={2}
                        className="w-full rounded-2xl border border-border p-3 sm:ml-auto sm:w-64"
                      >
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium">
                              Nested menu
                            </span>
                            <Code>surface-{nestedLevel}</Code>
                          </div>
                          <button
                            type="button"
                            className="rounded-lg px-2 py-1.5 text-left text-sm text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
                          >
                            Reassign owner
                          </button>
                          <button
                            type="button"
                            className="rounded-lg px-2 py-1.5 text-left text-sm text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
                          >
                            Schedule follow-up
                          </button>
                        </div>
                      </Surface>
                    </CardContent>
                  </Card>
                </SurfaceProvider>
              </div>

              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 px-1 pb-2 sm:px-20">
                <span className="font-mono text-sm text-secondary">
                  surface-{cardLevel}
                </span>
                <Slider
                  aria-label="Card surface level"
                  color="neutral"
                  max={8}
                  min={1}
                  onValueChange={(value) => {
                    const nextValue = Array.isArray(value) ? value[0] : value;

                    if (typeof nextValue === "number") {
                      setCardLevel(getSurfacePreviewLevel(nextValue));
                    }
                  }}
                  shape="round"
                  size="small"
                  step={1}
                  value={cardLevel}
                  variant="soft"
                />
              </div>
            </div>
          </TabsPanel>

          <TabsPanel value="code">
            <Snippet
              className="mt-6"
              code={contextualSurfacePreviewCode}
              filename="contextual-surface.tsx"
              language="tsx"
              variant="soft"
            />
          </TabsPanel>
        </TabsRoot>
      </div>
    </div>
  );
}

function SurfaceRangePreview() {
  const [range, setRange] = React.useState<[number, number]>([1, 8]);
  const low = Math.min(range[0], range[1]);
  const high = Math.max(range[0], range[1]);
  const levels = surfaceLevels.filter((level) => level >= low && level <= high);

  return (
    <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
      <div className="grid gap-3">
        <Heading level={3} size="h5" className="max-w-3xl">
          Move through levels
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Drag both knobs to choose which slice of the ladder to nest. Each
          layer lifts a single step off the one it sits in, whether the stack
          spans two levels or all eight.
        </Text>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-current p-4 text-primary shadow-surface-2 sm:p-6">
        <TabsRoot defaultValue="preview" variant="soft" color="neutral">
          <TabsList>
            <TabsTab value="preview">Preview</TabsTab>
            <TabsTab value="code">Code</TabsTab>
            <TabsIndicator />
          </TabsList>

          <TabsPanel value="preview">
            <div className="grid gap-8 pt-6">
              <div
                role="img"
                aria-label={`Nested surface preview from level ${low} to level ${high}.`}
                className="relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 sm:min-h-[32rem]"
              >
                <SurfaceProvider value={low}>
                  <SurfaceStackLayer levels={levels} />
                </SurfaceProvider>
              </div>

              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 px-1 pb-2 sm:px-20">
                <span className="font-mono text-sm text-secondary">
                  {low} - {high}
                </span>
                <Slider
                  aria-label="Surface level range"
                  color="neutral"
                  max={8}
                  min={1}
                  onValueChange={(value) => {
                    const values = Array.isArray(value)
                      ? value
                      : [value, value];

                    setRange([values[0] ?? 1, values[1] ?? values[0] ?? 1]);
                  }}
                  shape="round"
                  size="small"
                  step={1}
                  thumbLabels={["Lower surface level", "Upper surface level"]}
                  value={range}
                  variant="soft"
                />
              </div>
            </div>
          </TabsPanel>

          <TabsPanel value="code">
            <Snippet
              className="mt-6"
              code={surfacePreviewCode}
              filename="surface-preview.tsx"
              language="tsx"
              variant="soft"
            />
          </TabsPanel>
        </TabsRoot>
      </div>

      <SurfaceContextPreview />

      <DashboardSurfacePreview />
    </section>
  );
}

type TokenGroupListToken = {
  name: string;
  className: string;
  description: string;
  previewClassName?: string;
};

type TokenGroupListGroup = {
  title: string;
  tokens: readonly TokenGroupListToken[];
};

function TokenGroupList({
  groups,
}: {
  groups: readonly TokenGroupListGroup[];
}) {
  return (
    <section className="grid gap-8">
      {groups.map((group) => (
        <div
          key={group.title}
          className="grid gap-4 border-t border-neutral-200 pt-6 dark:border-white/15"
        >
          <Heading level={3} size="h5">
            {group.title}
          </Heading>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.tokens.map((token) => (
              <div
                key={token.name}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className={`${token.previewClassName ?? "size-10 rounded-lg"} border border-neutral-200 dark:border-white/15 ${token.className}`}
                />
                <span className="min-w-0">
                  <Code>{token.name}</Code>
                  <Text size="sm" tone="muted" className="mt-1">
                    {token.description}
                  </Text>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

const surfaceGuidelines = [
  {
    title: "Choose a substrate",
    body: "Use surface-1 for the page or application canvas, then reserve higher levels for content that visually moves forward.",
  },
  {
    title: "Lift from context",
    body: "Use lift when a component should sit above whatever surface contains it. Nested overlays stay separated without hard-coded colors.",
  },
  {
    title: "Keep meaning separate",
    body: "Use neutral surfaces for depth. Use action, success, warning, destructive, and info colors only when the UI needs semantic meaning.",
  },
] as const;

const surfaceLayerRows = [
  {
    title: "Tokens",
    example: "--surface-1, --surface-current, --surface-hover",
    description:
      "CSS custom properties that define colors, shadows, and contextual treatments. Tokens do not choose a level by themselves.",
  },
  {
    title: "Class names",
    example: "bg-surface-current, border-border, shadow-surface-3",
    description:
      "Tailwind utilities mapped to the tokens. Use these when styling markup inside an already resolved surface.",
  },
  {
    title: "React API",
    example: "SurfaceProvider value, Surface level, Surface lift",
    description:
      "Components that resolve the current level, publish it to descendants, and update contextual tokens for the subtree.",
  },
  {
    title: "Component props",
    example: "surface, surfaceLift, surfaceShadow",
    description:
      "Built-in surface controls on Aspekt components. Most overlays already lift from their current context by default.",
  },
] as const;

const surfaceApiRows = [
  {
    name: "SurfaceProvider",
    props: ["value={1}"],
    description:
      "Sets the current surface context for descendants. Values are rounded and clamped from 1 to 8.",
  },
  {
    name: "Surface",
    props: ["level={2}", "lift={1}", "shadow={false}"],
    description:
      "Creates a plane, resolves absolute or relative depth, applies the matching surface background and shadow, then publishes the resolved level.",
  },
  {
    name: "ElevatedSurface",
    props: ["lift={1}"],
    description:
      "A convenience wrapper around Surface for the common case where something should lift one step from its parent.",
  },
  {
    name: "Component props",
    props: ["surface", "surfaceLift", "surfaceShadow"],
    description:
      "Surface controls built into overlays and framed primitives. Use them when the component should override its default depth.",
  },
] as const;

const surfaceBuiltInRows = [
  {
    component: "Small overlays",
    examples: ["PopoverPopup", "SelectPopup", "ComboboxPopup"],
    default: "surfaceLift={2}",
    description:
      "Small overlays lift two levels above the surface that opened them.",
  },
  {
    component: "Prominent overlays",
    examples: ["DialogContent", "DrawerContent", "Toast"],
    default: "surfaceLift={4}",
    description:
      "Prominent overlays move further forward from the application canvas or current overlay.",
  },
  {
    component: "Framed content",
    examples: ["Card", "Table", "ScrollArea"],
    default: "outline lifts by 1",
    description:
      "Framed content surfaces lift one level for outline variants and stay in context for softer variants.",
  },
  {
    component: "Dock surfaces",
    examples: ["DockBar", "DockPanel"],
    default: "surfaceLift={3} / {4}",
    description:
      "Mobile dock controls and panels reserve higher planes for persistent foreground UI.",
  },
] as const;

const surfaceNextJsExampleTabs = [
  {
    label: "Root layout",
    filename: "app/layout.tsx",
    language: "tsx",
    code: `import type { ReactNode } from "react";

import { SurfaceProvider } from "@/components/aspekt/surface";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface-current text-primary">
        <SurfaceProvider value={1}>{children}</SurfaceProvider>
      </body>
    </html>
  );
}`,
  },
  {
    label: "Dashboard page",
    filename: "app/dashboard/page.tsx",
    language: "tsx",
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/aspekt/card";
import {
  PopoverArrow,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/aspekt/popover";
import { Surface } from "@/components/aspekt/surface";

export default function DashboardPage() {
  return (
    <Surface level={1} className="min-h-screen p-6">
      <main className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card surface={2} surfaceShadow={2}>
          <CardHeader>
            <CardTitle>Pipeline</CardTitle>
            <CardDescription>
              This card sits on surface-2 above the app canvas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Surface lift={1} className="rounded-xl border border-border p-3">
              Local detail panel resolves to surface-3.
            </Surface>
          </CardContent>
        </Card>

        <Surface lift={3} className="rounded-2xl border border-border p-4">
          <PopoverRoot>
            <PopoverTrigger color="neutral" variant="soft">
              Segment
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverPositioner sideOffset={8}>
                <PopoverPopup surfaceLift={2} className="w-72">
                  <PopoverArrow />
                  <PopoverHeader>
                    <PopoverTitle>Status filter</PopoverTitle>
                    <PopoverDescription>
                      The popover lifts two levels from the side panel.
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverPopup>
              </PopoverPositioner>
            </PopoverPortal>
          </PopoverRoot>
        </Surface>
      </main>
    </Surface>
  );
}`,
  },
] as const;

function SurfaceDocumentation() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Depth before decoration
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Surfaces are Aspekt&apos;s neutral z-axis. The scale runs from{" "}
          <Code>surface-1</Code> through <Code>surface-8</Code>, where each step
          describes a plane moving toward the viewer rather than a louder visual
          priority.
        </Text>
        <Text size="base" tone="muted" className="max-w-3xl">
          Components read the nearest surface context and can lift from it. That
          keeps popovers, dropdowns, dialogs, drawers, and toasts visibly
          separated even when they open inside another elevated component.
        </Text>
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-3">
          <Heading level={3} size="h5" className="max-w-3xl">
            Tokens, classes, and API
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Surface tokens and class names are styling tools. The React API is
            what calculates the current surface level and passes that level to
            nested components.
          </Text>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface-current">
          {surfaceLayerRows.map((row, index) => (
            <div
              key={row.title}
              className={[
                "grid gap-2 p-4 md:grid-cols-[10rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-6",
                index === 0 ? "" : "border-t border-border",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Heading level={4} size="h6">
                {row.title}
              </Heading>
              <Code className="max-w-full break-words leading-5">
                {row.example}
              </Code>
              <Text size="sm" tone="muted">
                {row.description}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-3">
          <Heading level={3} size="h5" className="max-w-3xl">
            How the model works
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            A surface sets <Code>--surface-current</Code> for its subtree.
            Muted, hover, active, border, and ring treatments are then mixed
            from that current substrate, so neutral UI states keep the right
            contrast at every depth.
          </Text>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {surfaceGuidelines.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 rounded-2xl border border-border bg-surface-current p-4 shadow-sm"
            >
              <Heading level={4} size="h6">
                {item.title}
              </Heading>
              <Text size="sm" tone="muted">
                {item.body}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <SurfaceRangePreview />

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-3">
          <Heading level={3} size="h5" className="max-w-3xl">
            API shape
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            The exported surface primitives are small by design. Most product
            code should set an explicit level at major app boundaries, then let
            relative lift calculate nested panels and overlays from the current
            context.
          </Text>
          <Text size="base" tone="muted" className="max-w-3xl">
            The calculation is automatic when you use <Code>Surface</Code>,
            <Code>ElevatedSurface</Code>, or a component with{" "}
            <Code>surfaceLift</Code>. A class like{" "}
            <Code>bg-surface-current</Code> only reads the already resolved
            token.
          </Text>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {surfaceApiRows.map((row) => (
            <div
              key={row.name}
              className="grid content-start gap-3 rounded-xl border border-border bg-surface-current p-4"
            >
              <div className="grid gap-2">
                <span className="font-mono text-sm font-medium text-primary">
                  {row.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {row.props.map((prop) => (
                    <span
                      key={prop}
                      className="rounded-md border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-xs leading-5 text-secondary"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
              <Text size="sm" tone="muted">
                {row.description}
              </Text>
            </div>
          ))}
        </div>

        <div className="grid gap-3 pt-4">
          <Heading level={4} size="h6" className="max-w-3xl">
            Built-in component surfaces
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Components that create a new plane already participate in the
            surface model. Override <Code>surface</Code>,{" "}
            <Code>surfaceLift</Code>, or <Code>surfaceShadow</Code> only when a
            product flow needs a different depth.
          </Text>

          <div className="grid gap-3 md:grid-cols-2">
            {surfaceBuiltInRows.map((row) => (
              <div
                key={row.component}
                className="grid content-start gap-3 rounded-xl border border-border bg-surface-current p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Text as="span" size="sm" weight="medium">
                    {row.component}
                  </Text>
                  <span className="rounded-md border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-xs leading-5 text-secondary">
                    {row.default}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {row.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-xs leading-5 text-secondary"
                    >
                      {example}
                    </span>
                  ))}
                </div>
                <Text size="sm" tone="muted">
                  {row.description}
                </Text>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 pt-4">
          <Heading level={4} size="h6" className="max-w-3xl">
            Next.js placement
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            In the App Router, set the base context once near the root layout,
            then let pages and overlays choose absolute levels or relative lift
            based on the plane they introduce.
          </Text>
          <Snippet
            className="max-w-3xl"
            tabs={surfaceNextJsExampleTabs}
            variant="soft"
          />
        </div>
      </section>

      <TokenGroupList groups={surfaceTokenGroups} />
    </div>
  );
}

function ColorsDocumentation() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Color roles
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Colors document meaning and contrast: text depth, inverse text, action
          color, status color, structure, and radius tokens. Neutral depth has
          its own{" "}
          <Link
            href="/surfaces"
            className="font-medium text-link underline underline-offset-4"
          >
            Surfaces
          </Link>{" "}
          page so the z-axis model can be explained with examples.
        </Text>
        <Text size="base" tone="muted" className="max-w-3xl">
          Intent colors should describe what a state means, not how high it is.
          Use action, success, warning, destructive, and info tokens for product
          meaning; use surface levels when the interface needs spatial
          separation.
        </Text>
      </section>

      <TokenGroupList groups={colorTokenGroups} />
    </div>
  );
}

function SonificationDocumentation() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-6 border-t border-neutral-200 pt-8 dark:border-white/15">
        <div className="grid gap-3">
          <Heading level={2} size="h5" className="max-w-3xl">
            Interaction sound
          </Heading>
          <Text size="base" tone="muted" className="max-w-3xl">
            Sonification is Aspekt&apos;s optional layer for short, intentional
            audio feedback. It can make presses, toggles, confirmations, and
            errors feel more immediate while letting apps subscribe to the sound
            depths that match their product.
          </Text>
        </div>

        <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-surface-current px-4 py-10 dark:bg-neutral-900/70">
          <SoundProviderPreview />
        </div>
      </section>

      <TabsRoot defaultValue="usage" variant="line" color="neutral">
        <TabsList>
          <TabsTab value="usage">Usage</TabsTab>
          <TabsTab value="depths">Depths</TabsTab>
          <TabsTab value="principles">Principles</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="usage">
          <div className="grid gap-4">
            <Text size="base" tone="muted" className="max-w-3xl">
              Sound is silent until your app opts in with SoundProvider. After
              that, global settings can enable, disable, tune, change the sound
              variant, or subscribe to specific sound depths across every Aspekt
              component that supports sound. By default, SoundProvider
              subscribes to interactions and cues. Add feedback when continuous
              controls should make sound while they move. Mobile playback stays
              off by default and can be explicitly enabled with{" "}
              <Code>mobileEnabled</Code>.
            </Text>
            <Snippet
              className="max-w-3xl"
              code={`import { SoundProvider } from "@/components/aspekt/sound-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider
      enabled
      mobileEnabled
      depths={["interactions", "cues", "feedback"]}
      variant="pop"
      volume={0.8}
    >
      {children}
    </SoundProvider>
  );
}`}
              filename="app-providers.tsx"
              language="tsx"
            />
            <Snippet
              className="max-w-3xl"
              code={`import { Button } from "@/components/aspekt/button";

export function Actions() {
  return (
    <div>
      <Button status="success" sound="success">
        Publish
      </Button>
      <Button sound={false} variant="outline">
        Quiet action
      </Button>
    </div>
  );
}`}
              filename="actions.tsx"
              language="tsx"
            />
          </div>
        </TabsPanel>
        <TabsPanel value="depths">
          <div className="grid gap-4">
            <Text size="base" tone="muted" className="max-w-3xl">
              Depths split sound into independent subscriptions. Keep the whole
              system enabled, then choose which categories are allowed to play
              for the current product, surface, or user preference.
            </Text>
            <List
              variant="disc"
              spacing="normal"
              tone="muted"
              className="max-w-3xl"
            >
              {soundDepths.map((depth) => (
                <ListItem key={depth}>
                  <Code>{soundDepthCopy[depth].label}</Code> covers{" "}
                  {soundDepthCopy[depth].description}
                </ListItem>
              ))}
            </List>
            <Snippet
              className="max-w-3xl"
              code={`<SoundProvider
  depths={{
    interactions: true,
    cues: true,
    feedback: false,
  }}
>
  {children}
</SoundProvider>`}
              filename="app-providers.tsx"
              language="tsx"
            />
          </div>
        </TabsPanel>
        <TabsPanel value="principles">
          <div className="grid gap-4">
            <Text size="base" tone="muted" className="max-w-3xl">
              Sonification should support state, not decorate the interface.
              Short sounds work best when they confirm an action, signal a
              result, or make a repeated control feel more tactile without
              playing every possible high-resolution value change.
            </Text>
            <List
              variant="disc"
              spacing="normal"
              tone="muted"
              className="max-w-3xl"
            >
              <ListItem>Opt in globally with SoundProvider.</ListItem>
              <ListItem>
                Subscribe only to the depths that make the interface clearer.
              </ListItem>
              <ListItem>Keep defaults quiet and predictable.</ListItem>
              <ListItem>
                Override individual components when context matters.
              </ListItem>
              <ListItem>
                Respect disabled, quiet, and user-controlled states.
              </ListItem>
            </List>
          </div>
        </TabsPanel>
      </TabsRoot>
    </div>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getSafeString(value: unknown, fallback = "", maxLength = 320) {
  if (typeof value !== "string") return fallback;

  const trimmedValue = value.trim();

  if (!trimmedValue) return fallback;

  return trimmedValue.slice(0, maxLength);
}

function isSafeAvatarApiSegment(value: string) {
  return /^[a-z0-9][a-z0-9-]{0,63}$/i.test(value);
}

function getAvatarApiSeedSegment(seed: string) {
  const trimmedSeed = seed.trim().slice(0, 80);

  return encodeURIComponent(trimmedSeed || defaultAvatarApiSettings.seed);
}

function normalizeAvatarApiVariantDoc(
  value: unknown,
): AvatarApiVariantDoc | null {
  if (!isRecord(value)) return null;

  const name = getSafeString(value.name, "", 48).toLowerCase();

  if (!isSafeAvatarApiSegment(name)) return null;

  return {
    name,
    description: getSafeString(
      value.description,
      "Generated from the same stable seed.",
      240,
    ),
    default_for_legacy_seed_urls:
      typeof value.default_for_legacy_seed_urls === "boolean"
        ? value.default_for_legacy_seed_urls
        : undefined,
  };
}

function normalizeAvatarApiVariants(value: unknown) {
  if (!isRecord(value) || !Array.isArray(value.variants)) {
    return fallbackAvatarApiDocs.variants;
  }

  const variants = value.variants
    .slice(0, 8)
    .map(normalizeAvatarApiVariantDoc)
    .filter((variant): variant is AvatarApiVariantDoc => Boolean(variant));

  return variants.length > 0 ? variants : fallbackAvatarApiDocs.variants;
}

function useAvatarApiVariants(enabled: boolean) {
  const [variants, setVariants] = React.useState<AvatarApiVariantDoc[]>(
    fallbackAvatarApiDocs.variants,
  );

  React.useEffect(() => {
    if (!enabled) return;

    let active = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4500);

    async function loadVariants() {
      try {
        const response = await fetch(avatarApiDocsFetchUrl, {
          cache: "no-store",
          credentials: "omit",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load Avatar API variants.");
        }

        const variants = normalizeAvatarApiVariants(await response.json());

        if (active) {
          setVariants(variants);
        }
      } catch {
        if (active) {
          setVariants(fallbackAvatarApiDocs.variants);
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadVariants();

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [enabled]);

  return variants;
}

function getAvatarApiVariantOptions(variants: AvatarApiVariantDoc[]) {
  const names = variants.map((variant) => variant.name);

  return names.length > 0
    ? names
    : fallbackAvatarApiDocs.variants.map((variant) => variant.name);
}

function getAvatarApiImageSrc(settings: AvatarApiSettings) {
  const variant = isSafeAvatarApiSegment(settings.variant)
    ? settings.variant
    : defaultAvatarApiSettings.variant;
  const seed = getAvatarApiSeedSegment(settings.seed);
  const params = new URLSearchParams({
    initials: String(settings.initials),
    radius: settings.radius,
    size: settings.size,
  });

  return (
    avatarApiBaseUrl + "/" + variant + "/" + seed + "?" + params.toString()
  );
}

function getAvatarApiPreviewSize(settings: AvatarApiSettings) {
  return Math.min(Number(settings.size), 220);
}

function getIconApiTarget(value: string) {
  const trimmedValue = value.trim().slice(0, 180);

  return trimmedValue || defaultIconApiSettings.target;
}

function isSimpleIconApiPathTarget(value: string) {
  return (
    !/^[a-z][a-z0-9+.-]*:\/\//i.test(value) &&
    !/[/?#]/.test(value) &&
    /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(value)
  );
}

function getIconApiImageSrc(settings: IconApiSettings) {
  const target = getIconApiTarget(settings.target);
  const params = new URLSearchParams({ size: settings.size });

  if (isSimpleIconApiPathTarget(target)) {
    return `${iconApiBaseUrl}/${encodeURIComponent(target)}?${params.toString()}`;
  }

  params.set("url", target);

  return `${iconApiBaseUrl}/?${params.toString()}`;
}

function getIconApiFallback(target: string) {
  const clean = target
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/[/?#].*$/, "")
    .replace(/[_.+-]+/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim();
  const parts = clean.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return (parts[0] || "I").slice(0, 2).toUpperCase();
}

function getIconApiPreviewSize(settings: IconApiSettings) {
  return Math.min(Number(settings.size), 220);
}

function AvatarApiPreview({ settings }: { settings: AvatarApiSettings }) {
  const src = getAvatarApiImageSrc(settings);
  const previewSize = getAvatarApiPreviewSize(settings);

  return (
    <div className="grid max-w-full justify-items-center gap-4 px-6 text-center">
      <Avatar
        alt="Tobias Rasmussen"
        className="rounded-none bg-transparent ring-0"
        fallback="TR"
        imageProps={{ className: "object-contain" }}
        shape="square"
        size="large"
        src={src}
        style={{ height: previewSize, width: previewSize }}
      />
      <Code className="max-w-full break-all text-xs leading-5">{src}</Code>
    </div>
  );
}

function IconApiPreview({ settings }: { settings: IconApiSettings }) {
  const src = getIconApiImageSrc(settings);
  const target = getIconApiTarget(settings.target);
  const previewSize = getIconApiPreviewSize(settings);

  return (
    <div className="grid max-w-full justify-items-center gap-4 px-6 text-center">
      <Avatar
        alt={`${target} icon`}
        className="rounded-none bg-transparent ring-0"
        fallback={getIconApiFallback(target)}
        imageProps={{ className: "object-contain" }}
        shape="square"
        size="large"
        src={src}
        style={{ height: previewSize, width: previewSize }}
      />
      <Code className="max-w-full break-all text-xs leading-5">{src}</Code>
    </div>
  );
}

function AvatarApiUsageDocumentation({
  settings,
}: {
  settings: AvatarApiSettings;
}) {
  const src = getAvatarApiImageSrc(settings);
  const usageCode = [
    "<Avatar",
    '  alt="Tobias Rasmussen"',
    '  fallback="TR"',
    '  src="' + src + '"',
    "/>",
  ].join("\n");

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Snippet code={src} language="bash" showHeader={false} />
      </div>

      <Snippet className="max-w-3xl" code={usageCode} language="tsx" />
    </div>
  );
}

function IconApiUsageDocumentation({
  settings,
}: {
  settings: IconApiSettings;
}) {
  const src = getIconApiImageSrc(settings);
  const target = getIconApiTarget(settings.target);
  const usageCode = [
    "<Avatar",
    `  alt="${target} icon"`,
    `  fallback="${getIconApiFallback(target)}"`,
    '  shape="square"',
    '  src="' + src + '"',
    "/>",
  ].join("\n");

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Snippet code={src} language="bash" showHeader={false} />
      </div>

      <Snippet className="max-w-3xl" code={usageCode} language="tsx" />

      <div className="grid gap-2">
        {fallbackIconApiDocs.examples.map((example) => (
          <Snippet
            key={example}
            code={example}
            language="bash"
            showHeader={false}
          />
        ))}
      </div>
    </div>
  );
}

function AvatarApiSeedOptionRow({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="grid min-h-12 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] items-center gap-4 py-2.5">
      <h2 className="min-w-0 text-sm font-medium text-primary">seed</h2>
      <Input
        aria-label="Avatar API seed"
        value={value}
        onChange={(event) => onValueChange(event.currentTarget.value)}
        onClear={() => onValueChange("")}
        clearable
        shape="square"
        size="small"
        variant="outline"
      />
    </div>
  );
}

function IconApiTargetOptionRow({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="grid min-h-12 grid-cols-[minmax(0,1fr)_minmax(12rem,18rem)] items-center gap-4 py-2.5">
      <h2 className="min-w-0 text-sm font-medium text-primary">target</h2>
      <Input
        aria-label="Icon API target"
        value={value}
        onChange={(event) => onValueChange(event.currentTarget.value)}
        onClear={() => onValueChange("")}
        clearable
        shape="square"
        size="small"
        variant="outline"
      />
    </div>
  );
}

function AvatarApiControls({
  settings,
  variantOptions,
  onSettingsChange,
}: {
  settings: AvatarApiSettings;
  variantOptions: readonly string[];
  onSettingsChange: React.Dispatch<React.SetStateAction<AvatarApiSettings>>;
}) {
  return (
    <div className="grid divide-y divide-neutral-200 dark:divide-white/10 ">
      <AvatarApiSeedOptionRow
        value={settings.seed}
        onValueChange={(seed) =>
          onSettingsChange((current) => ({ ...current, seed }))
        }
      />

      <OptionRow
        label="variant"
        values={variantOptions}
        active={settings.variant}
        onValueChange={(variant) =>
          onSettingsChange((current) => ({ ...current, variant }))
        }
      />

      <OptionRow
        label="size"
        values={avatarApiSizeOptions}
        active={settings.size}
        onValueChange={(size) =>
          onSettingsChange((current) => ({ ...current, size }))
        }
      />

      <OptionRow
        label="radius"
        values={avatarApiRadiusOptions}
        active={settings.radius}
        onValueChange={(radius) =>
          onSettingsChange((current) => ({ ...current, radius }))
        }
      />

      <BooleanOptionRow
        label="initials"
        checked={settings.initials}
        onCheckedChange={(initials) =>
          onSettingsChange((current) => ({ ...current, initials }))
        }
      />
    </div>
  );
}

function IconApiControls({
  settings,
  onSettingsChange,
}: {
  settings: IconApiSettings;
  onSettingsChange: React.Dispatch<React.SetStateAction<IconApiSettings>>;
}) {
  return (
    <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
      <IconApiTargetOptionRow
        value={settings.target}
        onValueChange={(target) =>
          onSettingsChange((current) => ({ ...current, target }))
        }
      />

      <OptionRow
        label="size"
        values={iconApiSizeOptions}
        active={settings.size}
        onValueChange={(size) =>
          onSettingsChange((current) => ({ ...current, size }))
        }
      />
    </div>
  );
}

function AvatarApiDocumentation({
  previewStageClassName,
  previewSettings,
  settings,
  variantOptions,
  onSettingsChange,
}: {
  previewStageClassName: string;
  previewSettings: AvatarApiSettings;
  settings: AvatarApiSettings;
  variantOptions: readonly string[];
  onSettingsChange: React.Dispatch<React.SetStateAction<AvatarApiSettings>>;
}) {
  return (
    <>
      <div className={previewStageClassName}>
        <AvatarApiPreview settings={previewSettings} />
      </div>

      <TabsRoot
        defaultValue="usage"
        variant="line"
        color="neutral"
        className="mb-12"
      >
        <TabsList>
          <TabsTab value="usage">Usage</TabsTab>
          <TabsTab value="controls">Controls</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="usage">
          <AvatarApiUsageDocumentation settings={previewSettings} />
        </TabsPanel>
        <TabsPanel value="controls">
          <AvatarApiControls
            settings={settings}
            variantOptions={variantOptions}
            onSettingsChange={onSettingsChange}
          />
        </TabsPanel>
      </TabsRoot>
    </>
  );
}

function IconApiDocumentation({
  previewStageClassName,
  previewSettings,
  settings,
  onSettingsChange,
}: {
  previewStageClassName: string;
  previewSettings: IconApiSettings;
  settings: IconApiSettings;
  onSettingsChange: React.Dispatch<React.SetStateAction<IconApiSettings>>;
}) {
  return (
    <>
      <div className={previewStageClassName}>
        <IconApiPreview settings={previewSettings} />
      </div>

      <TabsRoot
        defaultValue="usage"
        variant="line"
        color="neutral"
        className="mb-12"
      >
        <TabsList>
          <TabsTab value="usage">Usage</TabsTab>
          <TabsTab value="controls">Controls</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="usage">
          <IconApiUsageDocumentation settings={previewSettings} />
        </TabsPanel>
        <TabsPanel value="controls">
          <IconApiControls
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        </TabsPanel>
      </TabsRoot>
    </>
  );
}

function FoundationDocumentation({
  activePage,
  ...typographyProps
}: { activePage: FoundationPage } & TypographyDocumentationProps) {
  if (activePage === "typography") {
    return <TypographyDocumentation {...typographyProps} />;
  }

  if (activePage === "surfaces") {
    return <SurfaceDocumentation />;
  }

  if (activePage === "colors") {
    return <ColorsDocumentation />;
  }

  return <SonificationDocumentation />;
}

function IntroDocumentation({ activePage }: { activePage: IntroPage }) {
  return activePage === "getting-started" ? (
    <GettingStartedDocumentation />
  ) : (
    <PrinciplesDocumentation />
  );
}

export function DocsApp({ initialPage = "getting-started" }: DocsAppProps) {
  const [aspectRatioSettings, setAspectRatioSettings] =
    React.useState<AspectRatioSettings>(defaultAspectRatioSettings);
  const [scrollAreaSettings, setScrollAreaSettings] =
    React.useState<ScrollAreaSettings>(defaultScrollAreaSettings);
  const [avatarApiSettings, setAvatarApiSettings] =
    React.useState<AvatarApiSettings>(defaultAvatarApiSettings);
  const [iconApiSettings, setIconApiSettings] = React.useState<IconApiSettings>(
    defaultIconApiSettings,
  );
  const [avatarSettings, setAvatarSettings] = React.useState<AvatarSettings>(
    defaultAvatarSettings,
  );
  const [buttonSettings, setButtonSettings] = React.useState<ButtonSettings>(
    defaultButtonSettings,
  );
  const [cardSettings, setCardSettings] =
    React.useState<CardSettings>(defaultCardSettings);
  const [checkboxSettings, setCheckboxSettings] =
    React.useState<CheckboxSettings>(defaultCheckboxSettings);
  const [switchSettings, setSwitchSettings] = React.useState<SwitchSettings>(
    defaultSwitchSettings,
  );
  const [sliderSettings, setSliderSettings] = React.useState<SliderSettings>(
    defaultSliderSettings,
  );
  const [inlineSliderSettings, setInlineSliderSettings] =
    React.useState<InlineSliderSettings>(defaultInlineSliderSettings);
  const [inputSettings, setInputSettings] =
    React.useState<InputSettings>(defaultInputSettings);
  const [selectSettings, setSelectSettings] = React.useState<SelectSettings>(
    defaultSelectSettings,
  );
  const [comboboxSettings, setComboboxSettings] =
    React.useState<ComboboxSettings>(defaultComboboxSettings);
  const [toggleSettings, setToggleSettings] = React.useState<ToggleSettings>(
    defaultToggleSettings,
  );
  const [dialogSettings, setDialogSettings] = React.useState<DialogSettings>(
    defaultDialogSettings,
  );
  const [drawerSettings, setDrawerSettings] = React.useState<DrawerSettings>(
    defaultDrawerSettings,
  );
  const [popoverSettings, setPopoverSettings] = React.useState<PopoverSettings>(
    defaultPopoverSettings,
  );
  const [dockSettings, setDockSettings] =
    React.useState<DockSettings>(defaultDockSettings);
  const [toastSettings, setToastSettings] =
    React.useState<ToastSettings>(defaultToastSettings);
  const [tabsSettings, setTabsSettings] =
    React.useState<TabsSettings>(defaultTabsSettings);
  const [appTabsSettings, setAppTabsSettings] = React.useState<AppTabsSettings>(
    defaultAppTabsSettings,
  );
  const [tableSettings, setTableSettings] =
    React.useState<TableSettings>(defaultTableSettings);
  const [sidebarSettings, setSidebarSettings] = React.useState<SidebarSettings>(
    defaultSidebarSettings,
  );
  const [snippetSettings, setSnippetSettings] = React.useState<SnippetSettings>(
    defaultSnippetSettings,
  );
  const [headingSettings, setHeadingSettings] = React.useState<HeadingSettings>(
    defaultHeadingSettings,
  );
  const [textSettings, setTextSettings] =
    React.useState<TextSettings>(defaultTextSettings);
  const [codeSettings, setCodeSettings] =
    React.useState<CodeSettings>(defaultCodeSettings);
  const [kbdSettings, setKbdSettings] =
    React.useState<KbdSettings>(defaultKbdSettings);
  const [proseSettings, setProseSettings] =
    React.useState<ProseSettings>(defaultProseSettings);
  const [blockquoteSettings, setBlockquoteSettings] =
    React.useState<BlockquoteSettings>(defaultBlockquoteSettings);
  const [listSettings, setListSettings] =
    React.useState<ListSettings>(defaultListSettings);
  const [activeTypographyPrimitive, setActiveTypographyPrimitive] =
    React.useState<TypographyPrimitive>("heading");
  const [inputValue, setInputValue] = React.useState("Search components");
  const [selectValue, setSelectValue] =
    React.useState<SelectPreviewValue>("react");
  const [comboboxValue, setComboboxValue] =
    React.useState<ComboboxPreviewValue>("React");
  const [activePage, setActivePage] = React.useState<DocsPage>(initialPage);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileMenuSearch, setMobileMenuSearch] = React.useState("");
  const fakeLoadingTimeoutRef = React.useRef<number | null>(null);
  const { ref: previewScrollRef, overflow: previewOverflow } =
    useScrollOverflow<HTMLElement>({
      initialOverflow: initialBottomOverflowState,
    });
  const activeComponent = isComponentPreview(activePage) ? activePage : null;
  const activeIntroPage = isIntroPage(activePage) ? activePage : null;
  const activeFoundationPage = isFoundationPage(activePage) ? activePage : null;
  const activeUtilityPage = isUtilityPage(activePage) ? activePage : null;
  const activeApiPage = isApiPage(activePage) ? activePage : null;
  const avatarApiVariants = useAvatarApiVariants(
    activeApiPage === "avatar-api",
  );
  const avatarApiVariantOptions = React.useMemo(
    () => getAvatarApiVariantOptions(avatarApiVariants),
    [avatarApiVariants],
  );
  const resolvedAvatarApiSettings = React.useMemo(() => {
    if (avatarApiVariantOptions.includes(avatarApiSettings.variant)) {
      return avatarApiSettings;
    }

    return {
      ...avatarApiSettings,
      variant: avatarApiVariantOptions[0] ?? defaultAvatarApiSettings.variant,
    };
  }, [avatarApiSettings, avatarApiVariantOptions]);
  const debouncedAvatarApiSeed = useDebouncedValue(
    resolvedAvatarApiSettings.seed,
    450,
  );
  const debouncedAvatarApiSettings = React.useMemo(
    () => ({
      ...resolvedAvatarApiSettings,
      seed: debouncedAvatarApiSeed,
    }),
    [debouncedAvatarApiSeed, resolvedAvatarApiSettings],
  );
  const debouncedIconApiTarget = useDebouncedValue(iconApiSettings.target, 450);
  const debouncedIconApiSettings = React.useMemo(
    () => ({
      ...iconApiSettings,
      target: debouncedIconApiTarget,
    }),
    [debouncedIconApiTarget, iconApiSettings],
  );
  const pageCopy = getDocsPageCopy(activePage);

  React.useEffect(() => {
    return () => {
      if (fakeLoadingTimeoutRef.current) {
        window.clearTimeout(fakeLoadingTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    function syncPageFromLocation() {
      const nextPage = getPageFromLocation();

      if (nextPage) {
        setActivePage(nextPage);
      }

      if (window.location.hash) {
        const canonicalPage = nextPage ?? initialPage;
        window.history.replaceState(null, "", getPathForPage(canonicalPage));
        return;
      }
    }

    syncPageFromLocation();
    window.addEventListener("popstate", syncPageFromLocation);

    return () => {
      window.removeEventListener("popstate", syncPageFromLocation);
    };
  }, [initialPage]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    function closeMenuOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    }

    desktopMediaQuery.addEventListener("change", closeMenuOnDesktop);

    return () => {
      desktopMediaQuery.removeEventListener("change", closeMenuOnDesktop);
    };
  }, [mobileMenuOpen]);

  function navigateToPage(page: DocsPage) {
    setActivePage(page);
    window.history.pushState(null, "", getPathForPage(page));
  }

  function navigateToMobilePage(page: DocsPage) {
    navigateToPage(page);
    setMobileMenuOpen(false);
  }

  function setButtonLoading(loading: boolean) {
    if (fakeLoadingTimeoutRef.current) {
      window.clearTimeout(fakeLoadingTimeoutRef.current);
      fakeLoadingTimeoutRef.current = null;
    }

    setButtonSettings((settings) => ({ ...settings, loading }));
  }

  function triggerFakeLoading() {
    setButtonSettings((settings) => ({
      ...settings,
      loading: true,
      status: "none",
    }));

    if (fakeLoadingTimeoutRef.current) {
      window.clearTimeout(fakeLoadingTimeoutRef.current);
    }

    fakeLoadingTimeoutRef.current = window.setTimeout(() => {
      fakeLoadingTimeoutRef.current = null;
      setButtonSettings((settings) => ({
        ...settings,
        loading: false,
        status: "fail",
      }));
    }, 2000);
  }

  const previewStageClassName = [
    "relative mb-12 flex items-center justify-center overflow-hidden rounded-2xl bg-surface-muted dark:bg-surface-2",
    activeComponent === "sidebar" ||
    activeComponent === "app-tabs" ||
    activeComponent === "dock"
      ? "min-h-[38rem] sm:min-h-[40rem] lg:min-h-[42rem]"
      : "min-h-120 sm:min-h-120 lg:min-h-120",
  ].join(" ");

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface-current text-primary">
      <MobileNavbar onMenuOpen={() => setMobileMenuOpen(true)} />
      <MobileMenu
        activePage={activePage}
        open={mobileMenuOpen}
        query={mobileMenuSearch}
        onClose={() => setMobileMenuOpen(false)}
        onPageChange={navigateToMobilePage}
        onQueryChange={setMobileMenuSearch}
      />

      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Sidebar activePage={activePage} onPageChange={navigateToPage} />

        <div className="relative min-w-0 overflow-hidden lg:h-screen">
          <section
            ref={previewScrollRef}
            className="flex min-h-0 min-w-0 flex-col overflow-x-hidden px-6 pb-16 pt-10 sm:px-10 sm:pt-12 lg:h-full lg:overflow-y-auto lg:px-12 lg:py-18"
          >
            <div className="mb-14 ">
              <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
                <span className=" text-primary">{pageCopy.title}</span>{" "}
                {pageCopy.description}
              </p>
            </div>

            {activeComponent ? (
              <>
                <div className={previewStageClassName}>
                  {activeComponent === "aspect-ratio" ? (
                    <AspectRatioPreview settings={aspectRatioSettings} />
                  ) : activeComponent === "scroll-area" ? (
                    <ScrollAreaPreview settings={scrollAreaSettings} />
                  ) : activeComponent === "avatar" ? (
                    <AvatarPreview settings={avatarSettings} />
                  ) : activeComponent === "card" ? (
                    <CardPreview settings={cardSettings} />
                  ) : activeComponent === "button" ? (
                    <div className="flex flex-wrap items-center justify-center gap-3">
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
                        disabled={buttonSettings.disabled}
                      >
                        Default button
                      </Button>

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
                        status={
                          buttonSettings.status === "none"
                            ? null
                            : buttonSettings.status
                        }
                        statusDuration={2400}
                        onStatusClear={() =>
                          setButtonSettings((settings) => ({
                            ...settings,
                            status: "none",
                          }))
                        }
                        disabled={buttonSettings.disabled}
                        onClick={triggerFakeLoading}
                      >
                        Simulate failure
                      </Button>
                    </div>
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
                  ) : activeComponent === "combobox" ? (
                    <ComboboxPreview
                      settings={comboboxSettings}
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                    />
                  ) : activeComponent === "slider" ? (
                    <SliderPreview
                      settings={sliderSettings}
                      onValueChange={(value) =>
                        setSliderSettings((settings) => ({
                          ...settings,
                          value,
                        }))
                      }
                    />
                  ) : activeComponent === "inline-slider" ? (
                    <InlineSliderPreview
                      settings={inlineSliderSettings}
                      onValueChange={(value) =>
                        setInlineSliderSettings((settings) => ({
                          ...settings,
                          value,
                        }))
                      }
                    />
                  ) : activeComponent === "switch" ? (
                    <SwitchPreview
                      settings={switchSettings}
                      onCheckedChange={(checked) =>
                        setSwitchSettings((settings) => ({
                          ...settings,
                          checked,
                        }))
                      }
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
                  ) : activeComponent === "popover" ? (
                    <PopoverPreview settings={popoverSettings} />
                  ) : activeComponent === "dock" ? (
                    <DockPreview
                      settings={dockSettings}
                      onPanelChange={(panel) =>
                        setDockSettings((settings) => ({
                          ...settings,
                          panel,
                        }))
                      }
                    />
                  ) : activeComponent === "app-tabs" ? (
                    <AppTabsPreview settings={appTabsSettings} />
                  ) : activeComponent === "sidebar" ? (
                    <SidebarPreview
                      settings={sidebarSettings}
                      onOpenChange={(open) =>
                        setSidebarSettings((settings) => ({
                          ...settings,
                          open,
                        }))
                      }
                    />
                  ) : activeComponent === "toast" ? (
                    <ToastPreview settings={toastSettings} />
                  ) : activeComponent === "tabs" ? (
                    <TabsPreview settings={tabsSettings} />
                  ) : activeComponent === "table" ? (
                    <TablePreview settings={tableSettings} />
                  ) : activeComponent === "snippet" ? (
                    <SnippetPreview settings={snippetSettings} />
                  ) : activeComponent === "heading" ? (
                    <HeadingPreview settings={headingSettings} />
                  ) : activeComponent === "text" ? (
                    <TextPreview settings={textSettings} />
                  ) : activeComponent === "code" ? (
                    <CodePreview settings={codeSettings} />
                  ) : activeComponent === "kbd" ? (
                    <KbdPreview settings={kbdSettings} />
                  ) : activeComponent === "prose" ? (
                    <ProsePreview settings={proseSettings} />
                  ) : activeComponent === "blockquote" ? (
                    <BlockquotePreview settings={blockquoteSettings} />
                  ) : (
                    <ListPreview settings={listSettings} />
                  )}
                </div>

                <TabsRoot
                  defaultValue="usage"
                  variant="line"
                  color="neutral"
                  className="mb-12"
                >
                  <TabsList>
                    <TabsTab value="usage">Usage</TabsTab>
                    <TabsTab value="controls">Controls</TabsTab>
                    <TabsIndicator />
                  </TabsList>
                  <TabsPanel value="usage">
                    <ImportExample activeComponent={activeComponent} />
                  </TabsPanel>
                  <TabsPanel value="controls">
                    {activeComponent === "aspect-ratio" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="ratio"
                          values={aspectRatioOptions.ratio}
                          active={aspectRatioSettings.ratio}
                          onValueChange={(ratio) =>
                            setAspectRatioSettings((settings) => ({
                              ...settings,
                              ratio,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "scroll-area" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={scrollAreaOptions.variant}
                          active={scrollAreaSettings.variant}
                          onValueChange={(variant) =>
                            setScrollAreaSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={scrollAreaOptions.size}
                          active={scrollAreaSettings.size}
                          onValueChange={(size) =>
                            setScrollAreaSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={scrollAreaOptions.shape}
                          active={scrollAreaSettings.shape}
                          onValueChange={(shape) =>
                            setScrollAreaSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <OptionRow
                          label="axis"
                          values={scrollAreaOptions.axis}
                          active={scrollAreaSettings.axis}
                          onValueChange={(axis) =>
                            setScrollAreaSettings((settings) => ({
                              ...settings,
                              axis,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="fade"
                          checked={scrollAreaSettings.fade}
                          onCheckedChange={(fade) =>
                            setScrollAreaSettings((settings) => ({
                              ...settings,
                              fade,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "avatar" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="size"
                          values={avatarOptions.size}
                          active={avatarSettings.size}
                          onValueChange={(size) =>
                            setAvatarSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={avatarOptions.shape}
                          active={avatarSettings.shape}
                          onValueChange={(shape) =>
                            setAvatarSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="image"
                          checked={avatarSettings.image}
                          onCheckedChange={(image) =>
                            setAvatarSettings((settings) => ({
                              ...settings,
                              image,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "card" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={cardOptions.variant}
                          active={cardSettings.variant}
                          onValueChange={(variant) =>
                            setCardSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={cardOptions.size}
                          active={cardSettings.size}
                          onValueChange={(size) =>
                            setCardSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={cardOptions.shape}
                          active={cardSettings.shape}
                          onValueChange={(shape) =>
                            setCardSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "button" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={buttonOptions.variant}
                          active={buttonSettings.variant}
                          onValueChange={(variant) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={buttonOptions.size}
                          active={buttonSettings.size}
                          onValueChange={(size) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="color"
                          values={buttonOptions.color}
                          active={buttonSettings.color}
                          dots={buttonColorDots}
                          onValueChange={(color) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              color,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={buttonOptions.shape}
                          active={buttonSettings.shape}
                          onValueChange={(shape) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="prefix"
                          checked={buttonSettings.prefix}
                          typeLabel="ReactNode"
                          onCheckedChange={(prefix) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              prefix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="suffix"
                          checked={buttonSettings.suffix}
                          typeLabel="ReactNode"
                          onCheckedChange={(suffix) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              suffix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="loading"
                          checked={buttonSettings.loading}
                          onCheckedChange={setButtonLoading}
                        />

                        <OptionRow
                          label="status"
                          values={buttonOptions.status}
                          active={buttonSettings.status}
                          onValueChange={(status) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              status,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="disabled"
                          checked={buttonSettings.disabled}
                          onCheckedChange={(disabled) =>
                            setButtonSettings((settings) => ({
                              ...settings,
                              disabled,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "checkbox" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
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
                            setCheckboxSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="color"
                          values={checkboxOptions.color}
                          active={checkboxSettings.color}
                          dots={buttonColorDots}
                          onValueChange={(color) =>
                            setCheckboxSettings((settings) => ({
                              ...settings,
                              color,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={checkboxOptions.shape}
                          active={checkboxSettings.shape}
                          onValueChange={(shape) =>
                            setCheckboxSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
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
                            setCheckboxSettings((settings) => ({
                              ...settings,
                              invalid,
                            }))
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
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={inputOptions.variant}
                          active={inputSettings.variant}
                          onValueChange={(variant) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={inputOptions.size}
                          active={inputSettings.size}
                          onValueChange={(size) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={inputOptions.shape}
                          active={inputSettings.shape}
                          onValueChange={(shape) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="prefix"
                          checked={inputSettings.prefix}
                          typeLabel="ReactNode"
                          onCheckedChange={(prefix) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              prefix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="suffix"
                          checked={inputSettings.suffix}
                          typeLabel="ReactNode"
                          onCheckedChange={(suffix) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              suffix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="loading"
                          checked={inputSettings.loading}
                          onCheckedChange={(loading) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              loading,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="invalid"
                          checked={inputSettings.invalid}
                          onCheckedChange={(invalid) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              invalid,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="clearable"
                          checked={inputSettings.clearable}
                          onCheckedChange={(clearable) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              clearable,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="disabled"
                          checked={inputSettings.disabled}
                          onCheckedChange={(disabled) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              disabled,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="readOnly"
                          checked={inputSettings.readOnly}
                          onCheckedChange={(readOnly) =>
                            setInputSettings((settings) => ({
                              ...settings,
                              readOnly,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "select" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={selectOptions.variant}
                          active={selectSettings.variant}
                          onValueChange={(variant) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={selectOptions.size}
                          active={selectSettings.size}
                          onValueChange={(size) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={selectOptions.shape}
                          active={selectSettings.shape}
                          onValueChange={(shape) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="prefix"
                          checked={selectSettings.prefix}
                          typeLabel="ReactNode"
                          onCheckedChange={(prefix) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              prefix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="suffix"
                          checked={selectSettings.suffix}
                          typeLabel="ReactNode"
                          onCheckedChange={(suffix) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              suffix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="invalid"
                          checked={selectSettings.invalid}
                          onCheckedChange={(invalid) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              invalid,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="disabled"
                          checked={selectSettings.disabled}
                          onCheckedChange={(disabled) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              disabled,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="readOnly"
                          checked={selectSettings.readOnly}
                          onCheckedChange={(readOnly) =>
                            setSelectSettings((settings) => ({
                              ...settings,
                              readOnly,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "combobox" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={comboboxOptions.variant}
                          active={comboboxSettings.variant}
                          onValueChange={(variant) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={comboboxOptions.size}
                          active={comboboxSettings.size}
                          onValueChange={(size) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={comboboxOptions.shape}
                          active={comboboxSettings.shape}
                          onValueChange={(shape) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="prefix"
                          checked={comboboxSettings.prefix}
                          typeLabel="ReactNode"
                          onCheckedChange={(prefix) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              prefix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="clearable"
                          checked={comboboxSettings.clearable}
                          onCheckedChange={(clearable) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              clearable,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="invalid"
                          checked={comboboxSettings.invalid}
                          onCheckedChange={(invalid) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              invalid,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="disabled"
                          checked={comboboxSettings.disabled}
                          onCheckedChange={(disabled) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              disabled,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="readOnly"
                          checked={comboboxSettings.readOnly}
                          onCheckedChange={(readOnly) =>
                            setComboboxSettings((settings) => ({
                              ...settings,
                              readOnly,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "switch" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={switchOptions.variant}
                          active={switchSettings.variant}
                          onValueChange={(variant) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={switchOptions.size}
                          active={switchSettings.size}
                          onValueChange={(size) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="color"
                          values={switchOptions.color}
                          active={switchSettings.color}
                          dots={buttonColorDots}
                          onValueChange={(color) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              color,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={switchOptions.shape}
                          active={switchSettings.shape}
                          onValueChange={(shape) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="checked"
                          checked={switchSettings.checked}
                          onCheckedChange={(checked) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              checked,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="invalid"
                          checked={switchSettings.invalid}
                          onCheckedChange={(invalid) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              invalid,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="disabled"
                          checked={switchSettings.disabled}
                          onCheckedChange={(disabled) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              disabled,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="readOnly"
                          checked={switchSettings.readOnly}
                          onCheckedChange={(readOnly) =>
                            setSwitchSettings((settings) => ({
                              ...settings,
                              readOnly,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "slider" && (
                      <SliderOptionsPanel
                        settings={sliderSettings}
                        onSettingsChange={setSliderSettings}
                      />
                    )}

                    {activeComponent === "inline-slider" && (
                      <SliderOptionsPanel
                        settings={inlineSliderSettings}
                        onSettingsChange={setInlineSliderSettings}
                      />
                    )}

                    {activeComponent === "toggle" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={toggleOptions.variant}
                          active={toggleSettings.variant}
                          onValueChange={(variant) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={toggleOptions.size}
                          active={toggleSettings.size}
                          onValueChange={(size) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="color"
                          values={toggleOptions.color}
                          active={toggleSettings.color}
                          dots={buttonColorDots}
                          onValueChange={(color) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              color,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={toggleOptions.shape}
                          active={toggleSettings.shape}
                          onValueChange={(shape) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="prefix"
                          checked={toggleSettings.prefix}
                          typeLabel="ReactNode"
                          onCheckedChange={(prefix) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              prefix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="suffix"
                          checked={toggleSettings.suffix}
                          typeLabel="ReactNode"
                          onCheckedChange={(suffix) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              suffix,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="pressed"
                          checked={toggleSettings.pressed}
                          onCheckedChange={(pressed) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              pressed,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="disabled"
                          checked={toggleSettings.disabled}
                          onCheckedChange={(disabled) =>
                            setToggleSettings((settings) => ({
                              ...settings,
                              disabled,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "dialog" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="shape"
                          values={dialogOptions.shape}
                          active={dialogSettings.shape}
                          onValueChange={(shape) =>
                            setDialogSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={dialogOptions.size}
                          active={dialogSettings.size}
                          onValueChange={(size) =>
                            setDialogSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "drawer" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="side"
                          values={drawerOptions.side}
                          active={drawerSettings.side}
                          onValueChange={(side) =>
                            setDrawerSettings((settings) => ({
                              ...settings,
                              side,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={drawerOptions.shape}
                          active={drawerSettings.shape}
                          onValueChange={(shape) =>
                            setDrawerSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
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
                            setDrawerSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "popover" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="side"
                          values={popoverOptions.side}
                          active={popoverSettings.side}
                          onValueChange={(side) =>
                            setPopoverSettings((settings) => ({
                              ...settings,
                              side,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={popoverOptions.shape}
                          active={popoverSettings.shape}
                          onValueChange={(shape) =>
                            setPopoverSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="modal"
                          checked={popoverSettings.modal}
                          onCheckedChange={(modal) =>
                            setPopoverSettings((settings) => ({
                              ...settings,
                              modal,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="arrow"
                          checked={popoverSettings.arrow}
                          onCheckedChange={(arrow) =>
                            setPopoverSettings((settings) => ({
                              ...settings,
                              arrow,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={popoverOptions.size}
                          active={popoverSettings.size}
                          onValueChange={(size) =>
                            setPopoverSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "dock" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="size"
                          values={dockOptions.size}
                          active={dockSettings.size}
                          onValueChange={(size) =>
                            setDockSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={dockOptions.shape}
                          active={dockSettings.shape}
                          onValueChange={(shape) =>
                            setDockSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <OptionRow
                          label="panel"
                          values={dockOptions.panel}
                          active={dockSettings.panel}
                          onValueChange={(panel) =>
                            setDockSettings((settings) => ({
                              ...settings,
                              panel,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "sidebar" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={sidebarOptions.variant}
                          active={sidebarSettings.variant}
                          onValueChange={(variant) =>
                            setSidebarSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="side"
                          values={sidebarOptions.side}
                          active={sidebarSettings.side}
                          onValueChange={(side) =>
                            setSidebarSettings((settings) => ({
                              ...settings,
                              side,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="collapsible"
                          checked={sidebarSettings.collapsible}
                          onCheckedChange={(collapsible) =>
                            setSidebarSettings((settings) => ({
                              ...settings,
                              collapsible,
                              open: collapsible ? settings.open : true,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="open"
                          checked={sidebarSettings.open}
                          onCheckedChange={(open) =>
                            setSidebarSettings((settings) => ({
                              ...settings,
                              open,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "app-tabs" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={appTabsOptions.variant}
                          active={appTabsSettings.variant}
                          onValueChange={(variant) =>
                            setAppTabsSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={appTabsOptions.size}
                          active={appTabsSettings.size}
                          onValueChange={(size) =>
                            setAppTabsSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="color"
                          values={appTabsOptions.color}
                          active={appTabsSettings.color}
                          dots={buttonColorDots}
                          onValueChange={(color) =>
                            setAppTabsSettings((settings) => ({
                              ...settings,
                              color,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={appTabsOptions.shape}
                          active={appTabsSettings.shape}
                          onValueChange={(shape) =>
                            setAppTabsSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "toast" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="shape"
                          values={toastOptions.shape}
                          active={toastSettings.shape}
                          onValueChange={(shape) =>
                            setToastSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <OptionRow
                          label="position"
                          values={toastOptions.position}
                          active={toastSettings.position}
                          onValueChange={(position) =>
                            setToastSettings((settings) => ({
                              ...settings,
                              position,
                            }))
                          }
                        />

                        <OptionRow
                          label="maxToasts"
                          values={toastOptions.maxToasts}
                          active={toastSettings.maxToasts}
                          onValueChange={(maxToasts) =>
                            setToastSettings((settings) => ({
                              ...settings,
                              maxToasts,
                            }))
                          }
                        />

                        <OptionRow
                          label="type"
                          values={toastOptions.type}
                          active={toastSettings.type}
                          onValueChange={(type) =>
                            setToastSettings((settings) => ({
                              ...settings,
                              type,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="action"
                          checked={toastSettings.action}
                          typeLabel="ReactNode"
                          onCheckedChange={(action) =>
                            setToastSettings((settings) => ({
                              ...settings,
                              action,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="autoClose"
                          checked={toastSettings.autoClose}
                          onCheckedChange={(autoClose) =>
                            setToastSettings((settings) => ({
                              ...settings,
                              autoClose,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="colorful"
                          checked={toastSettings.colorful}
                          onCheckedChange={(colorful) =>
                            setToastSettings((settings) => ({
                              ...settings,
                              colorful,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "tabs" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={tabsOptions.variant}
                          active={tabsSettings.variant}
                          onValueChange={(variant) =>
                            setTabsSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={tabsOptions.size}
                          active={tabsSettings.size}
                          onValueChange={(size) =>
                            setTabsSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="color"
                          values={tabsOptions.color}
                          active={tabsSettings.color}
                          dots={buttonColorDots}
                          onValueChange={(color) =>
                            setTabsSettings((settings) => ({
                              ...settings,
                              color,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={tabsOptions.shape}
                          active={tabsSettings.shape}
                          onValueChange={(shape) =>
                            setTabsSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <OptionRow
                          label="orientation"
                          values={tabsOptions.orientation}
                          active={tabsSettings.orientation}
                          onValueChange={(orientation) =>
                            setTabsSettings((settings) => ({
                              ...settings,
                              orientation,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="indicator"
                          checked={tabsSettings.indicator}
                          onCheckedChange={(indicator) =>
                            setTabsSettings((settings) => ({
                              ...settings,
                              indicator,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="activateOnFocus"
                          checked={tabsSettings.activateOnFocus}
                          onCheckedChange={(activateOnFocus) =>
                            setTabsSettings((settings) => ({
                              ...settings,
                              activateOnFocus,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "table" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={tableOptions.variant}
                          active={tableSettings.variant}
                          onValueChange={(variant) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={tableOptions.size}
                          active={tableSettings.size}
                          onValueChange={(size) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={tableOptions.shape}
                          active={tableSettings.shape}
                          onValueChange={(shape) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="striped"
                          checked={tableSettings.striped}
                          onCheckedChange={(striped) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              striped,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="hoverable"
                          checked={tableSettings.hoverable}
                          onCheckedChange={(hoverable) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              hoverable,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="sortable"
                          checked={tableSettings.sortable}
                          onCheckedChange={(sortable) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              sortable,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="stickyHeader"
                          checked={tableSettings.stickyHeader}
                          onCheckedChange={(stickyHeader) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              stickyHeader,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="showColumnBorders"
                          checked={tableSettings.showColumnBorders}
                          onCheckedChange={(showColumnBorders) =>
                            setTableSettings((settings) => ({
                              ...settings,
                              showColumnBorders,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "snippet" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="language"
                          values={snippetOptions.language}
                          active={snippetSettings.language}
                          onValueChange={(language) =>
                            setSnippetSettings((settings) => ({
                              ...settings,
                              language,
                            }))
                          }
                        />

                        <OptionRow
                          label="variant"
                          values={snippetOptions.variant}
                          active={snippetSettings.variant}
                          onValueChange={(variant) =>
                            setSnippetSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={snippetOptions.shape}
                          active={snippetSettings.shape}
                          onValueChange={(shape) =>
                            setSnippetSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="filename"
                          checked={snippetSettings.filename}
                          onCheckedChange={(filename) =>
                            setSnippetSettings((settings) => ({
                              ...settings,
                              filename,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="copyable"
                          checked={snippetSettings.copyable}
                          onCheckedChange={(copyable) =>
                            setSnippetSettings((settings) => ({
                              ...settings,
                              copyable,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="showLineNumbers"
                          checked={snippetSettings.showLineNumbers}
                          onCheckedChange={(showLineNumbers) =>
                            setSnippetSettings((settings) => ({
                              ...settings,
                              showLineNumbers,
                            }))
                          }
                        />

                        <BooleanOptionRow
                          label="wrap"
                          checked={snippetSettings.wrap}
                          onCheckedChange={(wrap) =>
                            setSnippetSettings((settings) => ({
                              ...settings,
                              wrap,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "heading" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="size"
                          values={headingOptions.size}
                          active={headingSettings.size}
                          onValueChange={(size) =>
                            setHeadingSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="tone"
                          values={headingOptions.tone}
                          active={headingSettings.tone}
                          onValueChange={(tone) =>
                            setHeadingSettings((settings) => ({
                              ...settings,
                              tone,
                            }))
                          }
                        />

                        <OptionRow
                          label="level"
                          values={headingOptions.level}
                          active={headingSettings.level}
                          onValueChange={(level) =>
                            setHeadingSettings((settings) => ({
                              ...settings,
                              level,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "text" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="size"
                          values={textOptions.size}
                          active={textSettings.size}
                          onValueChange={(size) =>
                            setTextSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="tone"
                          values={textOptions.tone}
                          active={textSettings.tone}
                          onValueChange={(tone) =>
                            setTextSettings((settings) => ({
                              ...settings,
                              tone,
                            }))
                          }
                        />

                        <OptionRow
                          label="weight"
                          values={textOptions.weight}
                          active={textSettings.weight}
                          onValueChange={(weight) =>
                            setTextSettings((settings) => ({
                              ...settings,
                              weight,
                            }))
                          }
                        />

                        <OptionRow
                          label="as"
                          values={textOptions.as}
                          active={textSettings.as}
                          onValueChange={(as) =>
                            setTextSettings((settings) => ({
                              ...settings,
                              as,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "code" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <BooleanOptionRow
                          label="copyable"
                          checked={codeSettings.copyable}
                          onCheckedChange={(copyable) =>
                            setCodeSettings((settings) => ({
                              ...settings,
                              copyable,
                            }))
                          }
                        />

                        <OptionRow
                          label="variant"
                          values={codeOptions.variant}
                          active={codeSettings.variant}
                          onValueChange={(variant) =>
                            setCodeSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="tone"
                          values={codeOptions.tone}
                          active={codeSettings.tone}
                          onValueChange={(tone) =>
                            setCodeSettings((settings) => ({
                              ...settings,
                              tone,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "kbd" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={kbdOptions.variant}
                          active={kbdSettings.variant}
                          onValueChange={(variant) =>
                            setKbdSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={kbdOptions.size}
                          active={kbdSettings.size}
                          onValueChange={(size) =>
                            setKbdSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="shape"
                          values={kbdOptions.shape}
                          active={kbdSettings.shape}
                          onValueChange={(shape) =>
                            setKbdSettings((settings) => ({
                              ...settings,
                              shape,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "prose" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="size"
                          values={proseOptions.size}
                          active={proseSettings.size}
                          onValueChange={(size) =>
                            setProseSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="tone"
                          values={proseOptions.tone}
                          active={proseSettings.tone}
                          onValueChange={(tone) =>
                            setProseSettings((settings) => ({
                              ...settings,
                              tone,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "blockquote" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="size"
                          values={blockquoteOptions.size}
                          active={blockquoteSettings.size}
                          onValueChange={(size) =>
                            setBlockquoteSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="tone"
                          values={blockquoteOptions.tone}
                          active={blockquoteSettings.tone}
                          onValueChange={(tone) =>
                            setBlockquoteSettings((settings) => ({
                              ...settings,
                              tone,
                            }))
                          }
                        />
                      </div>
                    )}

                    {activeComponent === "list" && (
                      <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                        <OptionRow
                          label="variant"
                          values={listOptions.variant}
                          active={listSettings.variant}
                          onValueChange={(variant) =>
                            setListSettings((settings) => ({
                              ...settings,
                              variant,
                            }))
                          }
                        />

                        <OptionRow
                          label="size"
                          values={listOptions.size}
                          active={listSettings.size}
                          onValueChange={(size) =>
                            setListSettings((settings) => ({
                              ...settings,
                              size,
                            }))
                          }
                        />

                        <OptionRow
                          label="spacing"
                          values={listOptions.spacing}
                          active={listSettings.spacing}
                          onValueChange={(spacing) =>
                            setListSettings((settings) => ({
                              ...settings,
                              spacing,
                            }))
                          }
                        />

                        <OptionRow
                          label="tone"
                          values={listOptions.tone}
                          active={listSettings.tone}
                          onValueChange={(tone) =>
                            setListSettings((settings) => ({
                              ...settings,
                              tone,
                            }))
                          }
                        />
                      </div>
                    )}
                  </TabsPanel>
                </TabsRoot>
              </>
            ) : (
              <>
                {activeIntroPage && (
                  <IntroDocumentation activePage={activeIntroPage} />
                )}
                {activeFoundationPage && (
                  <FoundationDocumentation
                    activePage={activeFoundationPage}
                    activePrimitive={activeTypographyPrimitive}
                    blockquoteSettings={blockquoteSettings}
                    codeSettings={codeSettings}
                    headingSettings={headingSettings}
                    kbdSettings={kbdSettings}
                    listSettings={listSettings}
                    onActivePrimitiveChange={setActiveTypographyPrimitive}
                    proseSettings={proseSettings}
                    setBlockquoteSettings={setBlockquoteSettings}
                    setCodeSettings={setCodeSettings}
                    setHeadingSettings={setHeadingSettings}
                    setKbdSettings={setKbdSettings}
                    setListSettings={setListSettings}
                    setProseSettings={setProseSettings}
                    setTextSettings={setTextSettings}
                    textSettings={textSettings}
                  />
                )}
                {activeUtilityPage && (
                  <UtilityDocumentation activePage={activeUtilityPage} />
                )}
                {activeApiPage && (
                  <>
                    {activeApiPage === "avatar-api" ? (
                      <AvatarApiDocumentation
                        previewStageClassName={previewStageClassName}
                        previewSettings={debouncedAvatarApiSettings}
                        settings={resolvedAvatarApiSettings}
                        variantOptions={avatarApiVariantOptions}
                        onSettingsChange={setAvatarApiSettings}
                      />
                    ) : (
                      <IconApiDocumentation
                        previewStageClassName={previewStageClassName}
                        previewSettings={debouncedIconApiSettings}
                        settings={iconApiSettings}
                        onSettingsChange={setIconApiSettings}
                      />
                    )}
                  </>
                )}
              </>
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

export default function Home() {
  return <DocsApp initialPage="getting-started" />;
}
