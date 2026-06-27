"use client";

import { Avatar } from "@aspekt/components-source/avatar";
import {
  AppTabsList,
  AppTabsPanel,
  AppTabsRoot,
  type AppTabsTabData,
  useAppTabs,
} from "@aspekt/components-source/app-tabs";
import { Button } from "@aspekt/components-source/button";
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
import { ThemeToggle } from "./theme-toggle";

type IntroPage = "getting-started" | "principles";
type FoundationPage = "typography" | "colors" | "sonification";
type ComponentPreview =
  | "app-tabs"
  | "avatar"
  | "button"
  | "checkbox"
  | "input"
  | "select"
  | "combobox"
  | "slider"
  | "inline-slider"
  | "switch"
  | "toggle"
  | "dialog"
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

type DocsPage = IntroPage | FoundationPage | ComponentPreview;
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
type TabsVariant = "line" | "soft" | "outline";
type TabsOrientation = "horizontal" | "vertical";
type TableVariant = "outline" | "soft" | "ghost";
type TableSize = "compact" | "medium" | "large";
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

type AvatarSettings = {
  image: boolean;
  shape: AvatarShape;
  size: AvatarSize;
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

const introIds = ["getting-started", "principles"] as const;
const foundationIds = ["typography", "colors", "sonification"] as const;
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
  "avatar",
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
  "avatar",
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
      { label: "Avatar", page: "avatar" },
      { label: "Dialog", page: "dialog" },
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
  avatar: {
    title: "Avatar",
    description: "is used to identify people, teams, and entities.",
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
  avatar: 'import { Avatar } from "@/components/aspekt/avatar";',
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

const componentUsageExamples = {
  avatar: `<Avatar alt="Maya Chen" fallback="MC" />`,
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
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Publish component</DialogTitle>
        <DialogDescription>
          Make the latest changes available to your app.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button color="neutral">Publish</Button>
      </DialogFooter>
    </DialogContent>
  </DialogPortal>
</DialogRoot>`,
  drawer: `<DrawerRoot side="right" detached>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerViewport>
      <DrawerContent>
        <DrawerBody>
          <DrawerHeader>
            <DrawerTitle>Component details</DrawerTitle>
            <DrawerDescription>
              Review details before saving changes.
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
</DrawerRoot>`,
  popover: `<PopoverRoot>
  <PopoverTrigger>Open popover</PopoverTrigger>
  <PopoverPortal>
    <PopoverPositioner>
      <PopoverPopup>
        <PopoverArrow />
        <PopoverHeader>
          <PopoverTitle>Publish target</PopoverTitle>
          <PopoverDescription>
            Review the npm package before publishing.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <PopoverClose>Cancel</PopoverClose>
          <Button color="neutral">Publish</Button>
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
            <SidebarMenuButton active>Projects</SidebarMenuButton>
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
  colors: {
    title: "Colors",
    description:
      "explains the z-axis surface scale and the theme tokens that ship through Aspekt.",
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

const defaultAvatarSettings = {
  image: false,
  shape: "round",
  size: "large",
} satisfies AvatarSettings;

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
  color: "info",
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

const defaultPopoverSettings = {
  arrow: true,
  modal: false,
  shape: "round",
  side: "bottom",
  size: "medium",
} satisfies PopoverSettings;

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
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-surface/95 px-6 py-4 backdrop-blur sm:px-10 lg:hidden dark:border-white/15">
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
    <div className="fixed inset-0 z-50 flex flex-col bg-surface text-primary lg:hidden">
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

function isDocsPage(value: string): value is DocsPage {
  return (docsPageIds as readonly string[]).includes(value);
}

function getDocsPageCopy(page: DocsPage) {
  if (isComponentPreview(page)) return componentCopy[page];
  if (isFoundationPage(page)) return foundationCopy[page];

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
    variant,
    volume,
    setDepthEnabled,
    setEnabled,
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
        alt="Maya Chen"
        fallback="MC"
        shape={settings.shape}
        size={settings.size}
        src={settings.image ? "/logo.png" : undefined}
      />
      <div className="grid min-w-0 gap-1">
        <p className="text-sm font-medium text-primary">Maya Chen</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Product systems
        </p>
      </div>
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
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent size={settings.size}>
          <DialogHeader>
            <DialogTitle>Publish component</DialogTitle>
            <DialogDescription>
              This makes the latest component changes available to your app.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-500 dark:border-white/15 dark:bg-white/5 dark:text-neutral-300">
            @/components/aspekt/dialog
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
                <DrawerTitle>Review component</DrawerTitle>
                <DrawerDescription>
                  Confirm the package export before publishing the component.
                </DrawerDescription>
              </DrawerHeader>

              <div className="grid gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm dark:border-white/15 dark:bg-white/5">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    component
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-primary">
                    drawer
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    target
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-primary">
                    @/components/aspekt/drawer
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    install
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-primary">
                    npx @aspekt/ui init
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

function PopoverPreview({ settings }: { settings: PopoverSettings }) {
  return (
    <PopoverRoot modal={settings.modal} shape={settings.shape}>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverPortal>
        {settings.modal && <PopoverBackdrop />}
        <PopoverPositioner side={settings.side}>
          <PopoverPopup size={settings.size}>
            {settings.arrow && <PopoverArrow />}
            <PopoverHeader>
              <PopoverTitle>Publish target</PopoverTitle>
              <PopoverDescription>
                Confirm the package metadata before publishing to npm.
              </PopoverDescription>
            </PopoverHeader>

            <div className="grid gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm dark:border-white/15 dark:bg-white/5">
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  package
                </span>
                <span className="min-w-0 break-all text-right font-mono text-primary">
                  @aspekt/ui
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  version
                </span>
                <span className="min-w-0 break-all text-right font-mono text-primary">
                  0.1.5
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  export
                </span>
                <span className="min-w-0 break-all text-right font-mono text-primary">
                  @/components/aspekt/popover
                </span>
              </div>
            </div>

            <PopoverFooter>
              <PopoverClose>Cancel</PopoverClose>
              <Button type="button" color="neutral">
                Publish
              </Button>
            </PopoverFooter>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </PopoverRoot>
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
        className="h-[34rem] !min-h-[34rem] overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
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
        className="h-[34rem] !min-h-[34rem] overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
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
      "From deepest to foremost, Aspekt uses surface-sunken, surface, surface-raised, and surface-floating. Deeper planes are darker; foremost planes are brighter.",
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
          the sound variant, or tune the volume across your app.
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
    name: "--surface-sunken",
    className: "bg-surface-sunken",
    layer: "Layer 0",
    position: "Deepest",
    description:
      "Inset wells, code blocks, table headers, and quiet nested regions.",
  },
  {
    name: "--surface",
    className: "bg-surface",
    layer: "Layer 1",
    position: "Base",
    description: "The default app and site canvas.",
  },
  {
    name: "--surface-raised",
    className: "bg-surface-raised",
    layer: "Layer 2",
    position: "Raised",
    description: "Cards, panels, sheets, and controls above the canvas.",
  },
  {
    name: "--surface-floating",
    className: "bg-surface-floating",
    layer: "Layer 3",
    position: "Foremost",
    description: "Popovers, dropdowns, command menus, dialogs, and tooltips.",
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
    title: "Depth surfaces",
    tokens: surfaceDepthTokens,
  },
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
        name: "--control-track",
        className: "bg-control-track",
        description:
          "Inactive rails and neutral control tracks that must remain visible on sunken surfaces.",
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
        className: "bg-surface-raised",
        previewClassName: "h-10 w-14 rounded-[var(--radius)]",
        description: "Base corner radius used to derive the scale.",
      },
      {
        name: "--radius-sm",
        className: "bg-surface-raised",
        previewClassName: "h-10 w-14 rounded-sm",
        description: "Small controls and compact nested elements.",
      },
      {
        name: "--radius-md",
        className: "bg-surface-raised",
        previewClassName: "h-10 w-14 rounded-md",
        description: "Default control radius.",
      },
      {
        name: "--radius-lg",
        className: "bg-surface-raised",
        previewClassName: "h-10 w-14 rounded-lg",
        description: "Cards, previews, and larger controls.",
      },
      {
        name: "--radius-xl",
        className: "bg-surface-raised",
        previewClassName: "h-10 w-14 rounded-xl",
        description: "Large surfaces and prominent panels.",
      },
      {
        name: "--radius-2xl",
        className: "bg-surface-raised",
        previewClassName: "h-10 w-14 rounded-2xl",
        description: "Roomier modal and sheet surfaces.",
      },
      {
        name: "--radius-3xl",
        className: "bg-surface-raised",
        previewClassName: "h-10 w-14 rounded-3xl",
        description: "Maximum radius for expressive large containers.",
      },
      {
        name: "--radius-full",
        className: "bg-surface-raised",
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
          <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised px-4 py-10 dark:bg-neutral-900/70">
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

function ColorsDocumentation() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Color on the z axis
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Aspekt treats neutral surface tokens as planes in depth. The stack
          runs from deepest to foremost: <Code>surface-sunken</Code>,{" "}
          <Code>surface</Code>, <Code>surface-raised</Code>, and{" "}
          <Code>surface-floating</Code>. Deeper planes are darker; foremost
          planes are brighter.
        </Text>
        <Text size="base" tone="muted" className="max-w-3xl">
          Text follows its own depth ramp from primary to disabled. Role tokens
          handle inverse surfaces, colored fills, and links. Intent colors still
          describe meaning: action, selection, success, warning, destructive,
          and information states.
        </Text>
      </section>

      <section className="grid gap-8">
        {colorTokenGroups.map((group) => (
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
                    className={`${"previewClassName" in token ? token.previewClassName : "size-10 rounded-lg"} border border-neutral-200 dark:border-white/15 ${token.className}`}
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

        <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised px-4 py-10 dark:bg-neutral-900/70">
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
              controls should make sound while they move; Slider feedback adapts
              to the range so dense controls do not become noisy.
            </Text>
            <Snippet
              className="max-w-3xl"
              code={`import { SoundProvider } from "@/components/aspekt/sound-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider
      enabled
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

function FoundationDocumentation({
  activePage,
  ...typographyProps
}: { activePage: FoundationPage } & TypographyDocumentationProps) {
  if (activePage === "typography") {
    return <TypographyDocumentation {...typographyProps} />;
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
  const [avatarSettings, setAvatarSettings] = React.useState<AvatarSettings>(
    defaultAvatarSettings,
  );
  const [buttonSettings, setButtonSettings] = React.useState<ButtonSettings>(
    defaultButtonSettings,
  );
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
    "relative mb-12 flex items-center justify-center overflow-hidden rounded-2xl bg-surface-sunken dark:bg-surface-raised",
    activeComponent === "sidebar" || activeComponent === "app-tabs"
      ? "min-h-[38rem] sm:min-h-[40rem] lg:min-h-[42rem]"
      : "min-h-80 sm:min-h-80 lg:min-h-80",
  ].join(" ");

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface text-primary">
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
                  {activeComponent === "avatar" ? (
                    <AvatarPreview settings={avatarSettings} />
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
