"use client";

import { Button } from "@aspekt/components/button";
import { Checkbox } from "@aspekt/components/checkbox";
import { Code } from "@aspekt/components/code";
import { Blockquote } from "@aspekt/components/blockquote";
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
} from "@aspekt/components/dialog";
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
} from "@aspekt/components/drawer";
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
} from "@aspekt/components/popover";
import { Heading } from "@aspekt/components/heading";
import { Kbd } from "@aspekt/components/kbd";
import { List, ListItem } from "@aspekt/components/list";
import { Prose } from "@aspekt/components/prose";
import { Text } from "@aspekt/components/text";

import { Input } from "@aspekt/components/input";
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
} from "@aspekt/components/select";
import { Slider } from "@aspekt/components/slider";
import { Snippet } from "@aspekt/components/snippet";
import { SoundProvider, useSound } from "@aspekt/components/sound-provider";
import { Switch } from "@aspekt/components/switch";
import {
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTab,
} from "@aspekt/components/tabs";
import { Table, type TableColumnDef } from "@aspekt/components/table";
import { Toggle } from "@aspekt/components/toggle";
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

type IntroPage = "getting-started" | "principles";
type ComponentPreview =
  | "button"
  | "checkbox"
  | "input"
  | "select"
  | "slider"
  | "switch"
  | "toggle"
  | "dialog"
  | "drawer"
  | "popover"
  | "tabs"
  | "table"
  | "snippet"
  | "sound-provider"
  | "heading"
  | "text"
  | "code"
  | "kbd"
  | "prose"
  | "blockquote"
  | "list";

type DocsPage = IntroPage | ComponentPreview;
type DocsAppProps = {
  initialPage?: DocsPage;
};
type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";
type ButtonColor = "accent" | "blue" | "red" | "amber" | "neutral";
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
type CheckboxVariant = "solid" | "soft" | "outline";
type SliderVariant = "solid" | "soft" | "outline";
type SwitchVariant = "solid" | "soft" | "outline";
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
type CodeVariant = "inline" | "block";
type CodeTone =
  | "default"
  | "muted"
  | "accent"
  | "danger"
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

type TabsSettings = {
  variant: TabsVariant;
  size: ButtonSize;
  color: ButtonColor;
  shape: ButtonShape;
  orientation: TabsOrientation;
  indicator: boolean;
  activateOnFocus: boolean;
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

const emptyOverflowState = {
  top: false,
  right: false,
  bottom: false,
  left: false,
} satisfies ScrollOverflowState;

const scrollOverflowThreshold = 2;

const introIds = ["getting-started", "principles"] as const;
const componentIds = [
  "button",
  "checkbox",
  "input",
  "select",
  "slider",
  "switch",
  "toggle",
  "dialog",
  "drawer",
  "popover",
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
  "sound-provider",
] as const;
const docsPageIds = [...introIds, ...componentIds] as const;

const navGroups = [
  {
    title: "Introduction",
    items: [
      { label: "Getting started", page: "getting-started" },
      { label: "Principles", page: "principles" },
    ],
  },
  {
    title: "Typography",
    items: [
      { label: "Heading", page: "heading" },
      { label: "Text", page: "text" },
      { label: "Code", page: "code" },
      { label: "Kbd", page: "kbd" },
      { label: "Prose", page: "prose" },
      { label: "Blockquote", page: "blockquote" },
      { label: "List", page: "list" },
    ],
  },
  {
    title: "Controls",
    items: [
      { label: "Button", page: "button" },
      { label: "Checkbox", page: "checkbox" },
      { label: "Input", page: "input" },
      { label: "Select", page: "select" },
      { label: "Slider", page: "slider" },
      { label: "Switch", page: "switch" },
      { label: "Toggle", page: "toggle" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Dialog", page: "dialog" },
      { label: "Drawer", page: "drawer" },
      { label: "Popover", page: "popover" },
      { label: "Tabs", page: "tabs" },
      { label: "Table", page: "table" },
      { label: "Snippet", page: "snippet" },
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
  status: ["none", "success", "fail"],
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

const tabsOptions = {
  variant: ["line", "soft", "outline"],
  size: buttonOptions.size,
  color: buttonOptions.color,
  shape: buttonOptions.shape,
  orientation: ["horizontal", "vertical"],
} as const;

const tableOptions = {
  variant: ["outline", "soft", "ghost"],
  size: ["compact", "medium", "large"],
  shape: buttonOptions.shape,
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

const codeOptions = {
  variant: ["inline", "block"],
  tone: ["default", "muted", "accent", "danger", "success", "warning"],
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
  slider: {
    title: "Slider",
    description: "is used to select a value from a range.",
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
  "sound-provider": {
    title: "Sound Provider",
    description: "is the app-level opt-in for Aspekt UI interaction sound.",
  },
} satisfies Record<
  ComponentPreview,
  {
    title: string;
    description: string;
  }
>;

const componentImportExamples = {
  button: 'import { Button } from "@/components/aspekt/button";',
  checkbox: 'import { Checkbox } from "@/components/aspekt/checkbox";',
  input: 'import { Input } from "@/components/aspekt/input";',
  select:
    'import { SelectRoot, SelectTrigger } from "@/components/aspekt/select";',
  slider: 'import { Slider } from "@/components/aspekt/slider";',
  switch: 'import { Switch } from "@/components/aspekt/switch";',
  toggle: 'import { Toggle } from "@/components/aspekt/toggle";',
  dialog:
    'import { DialogRoot, DialogTrigger } from "@/components/aspekt/dialog";',
  drawer:
    'import { DrawerRoot, DrawerTrigger } from "@/components/aspekt/drawer";',
  popover:
    'import { PopoverRoot, PopoverTrigger } from "@/components/aspekt/popover";',
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
  "sound-provider":
    'import { SoundProvider, useSound } from "@/components/aspekt/sound-provider";',
} satisfies Record<ComponentPreview, string>;

const componentUsageExamples = {
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
  slider: `<Slider
  aria-label="Volume"
  label="Volume"
  defaultValue={64}
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
  "sound-provider": `<SoundProvider enabled variant="pop" volume={0.8}>
  <App />
</SoundProvider>`,
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

const defaultButtonSettings = {
  variant: "solid",
  size: "medium",
  color: "neutral",
  shape: "square",
  prefix: false,
  suffix: false,
  loading: false,
  status: "none",
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

const defaultSwitchSettings = {
  variant: "outline",
  size: "medium",
  color: "blue",
  shape: "round",
  checked: true,
  invalid: false,
  disabled: false,
  readOnly: false,
} satisfies SwitchSettings;

const defaultSliderSettings = {
  variant: "outline",
  size: "medium",
  color: "blue",
  shape: "round",
  value: 64,
  showValue: true,
  invalid: false,
  disabled: false,
} satisfies SliderSettings;

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

const defaultPopoverSettings = {
  arrow: true,
  modal: false,
  shape: "round",
  side: "bottom",
  size: "medium",
} satisfies PopoverSettings;

const defaultTabsSettings = {
  variant: "soft",
  size: "medium",
  color: "blue",
  shape: "square",
  orientation: "horizontal",
  indicator: true,
  activateOnFocus: true,
} satisfies TabsSettings;

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
  Paid: "border-emerald-600/20 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300",
  Pending:
    "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  Overdue: "border-red-600/20 bg-red-600/10 text-red-700 dark:text-red-300",
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
  --primary: #ff5800;
  --foreground: #171717;
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
    code: "pnpm dlx @aspekt/ui init",
    language: "bash",
  },
  {
    label: "npm",
    code: "npx @aspekt/ui init",
    language: "bash",
  },
  {
    label: "yarn",
    code: "yarn dlx @aspekt/ui init",
    language: "bash",
  },
  {
    label: "bun",
    code: "bunx @aspekt/ui init",
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
  accent: "bg-orange-600",
  blue: "bg-blue-600",
  red: "bg-red-600",
  amber: "bg-amber-500",
  neutral: "bg-neutral-950 dark:bg-white",
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
        className="size-4.5"
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
          <p className="text-lg tracking-tight font-normal text-neutral-500 dark:text-neutral-400">
            {group.title}
          </p>
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
  );
}

function MobileNavbar({
  onMenuOpen,
}: {
  onMenuOpen: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-background/95 px-6 py-4 backdrop-blur sm:px-10 lg:hidden dark:border-white/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <LogoLockup />
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuOpen}
          className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-foreground focus-visible:ring-2 focus-visible:ring-current/25 dark:text-neutral-400 dark:hover:bg-white/10"
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
    <div className="fixed inset-0 z-50 flex flex-col bg-background text-foreground lg:hidden">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4 sm:px-10 dark:border-white/15">
        <LogoLockup />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-foreground focus-visible:ring-2 focus-visible:ring-current/25 dark:text-neutral-400 dark:hover:bg-white/10"
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
            className="h-10 w-full rounded-lg border border-neutral-200 bg-transparent pl-9 pr-3 text-base text-foreground outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10 dark:border-white/15 dark:placeholder:text-neutral-500 dark:focus:border-white/35 dark:focus:ring-white/10"
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
  const { ref: sidebarScrollRef, overflow } =
    useScrollOverflow<HTMLDivElement>();

  return (
    <aside className="relative hidden w-full shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-72">
      <div
        ref={sidebarScrollRef}
        className="flex h-full flex-col px-6 py-8 sm:px-10 lg:overflow-y-auto lg:px-8 lg:py-18"
      >
        <LogoLockup className="mb-16" />
        <DocsNavigation activePage={activePage} onPageChange={onPageChange} />
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
        variant="soft"
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
      <h2 className="min-w-0 text-sm font-medium text-foreground">{label}</h2>
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
        <h2 className="text-sm font-medium text-foreground">{label}</h2>
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

function isDocsPage(value: string): value is DocsPage {
  return (docsPageIds as readonly string[]).includes(value);
}

function getDocsPageCopy(page: DocsPage) {
  return isComponentPreview(page) ? componentCopy[page] : introCopy[page];
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
  const { enabled, variant, volume, setEnabled, setVariant, setVolume, play } =
    useSound();

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

        <label className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5">
          <span className="min-w-0">
            <span className="block text-sm font-medium text-foreground">
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
        "inline-flex items-center gap-3 px-6 text-sm font-medium text-foreground",
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
        <p className="text-base leading-7 text-foreground">
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
      <span className="text-foreground">Open command menu</span>
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
                  <span className="min-w-0 break-all text-right font-mono text-foreground">
                    drawer
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    target
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-foreground">
                    @/components/aspekt/drawer
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    install
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-foreground">
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
                <span className="min-w-0 break-all text-right font-mono text-foreground">
                  @aspekt/ui
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  version
                </span>
                <span className="min-w-0 break-all text-right font-mono text-foreground">
                  0.1.5
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  export
                </span>
                <span className="min-w-0 break-all text-right font-mono text-foreground">
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
              <h2 className="text-sm font-semibold text-foreground">
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
          tokens and prepares your project for copied source components.
        </Text>
        <Snippet className="max-w-3xl" tabs={initCommandTabs} />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Add a component
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Add only the components you need. The CLI copies the component source
          into your project so you can edit it directly.
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
          components to play sound, disable sound globally, change the sound
          variant, or tune the volume across your app.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`import { SoundProvider } from "@/components/aspekt/sound-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider enabled variant="pop" volume={0.8}>
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

function IntroDocumentation({ activePage }: { activePage: IntroPage }) {
  return activePage === "getting-started" ? (
    <GettingStartedDocumentation />
  ) : (
    <PrinciplesDocumentation />
  );
}

export function DocsApp({ initialPage = "getting-started" }: DocsAppProps) {
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
  const [popoverSettings, setPopoverSettings] = React.useState<PopoverSettings>(
    defaultPopoverSettings,
  );
  const [tabsSettings, setTabsSettings] =
    React.useState<TabsSettings>(defaultTabsSettings);
  const [tableSettings, setTableSettings] =
    React.useState<TableSettings>(defaultTableSettings);
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
  const [inputValue, setInputValue] = React.useState("Search components");
  const [selectValue, setSelectValue] =
    React.useState<SelectPreviewValue>("react");
  const [activePage, setActivePage] = React.useState<DocsPage>(initialPage);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileMenuSearch, setMobileMenuSearch] = React.useState("");
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
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
                <span className=" text-foreground">{pageCopy.title}</span>{" "}
                {pageCopy.description}
              </p>
            </div>

            {activeComponent ? (
              <>
                <div className="relative mb-12 flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900/70 sm:min-h-80 lg:min-h-80">
                  {activeComponent === "button" ? (
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
                  ) : activeComponent === "list" ? (
                    <ListPreview settings={listSettings} />
                  ) : (
                    <SoundProviderPreview />
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
                    {activeComponent !== "sound-provider" && (
                      <TabsTab value="controls">Controls</TabsTab>
                    )}
                    <TabsIndicator />
                  </TabsList>
                  <TabsPanel value="usage">
                    <ImportExample activeComponent={activeComponent} />
                  </TabsPanel>
                  {activeComponent !== "sound-provider" && (
                    <TabsPanel value="controls">
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
                        <div className="grid divide-y divide-neutral-200 dark:divide-white/10">
                          <OptionRow
                            label="variant"
                            values={sliderOptions.variant}
                            active={sliderSettings.variant}
                            onValueChange={(variant) =>
                              setSliderSettings((settings) => ({
                                ...settings,
                                variant,
                              }))
                            }
                          />

                          <OptionRow
                            label="size"
                            values={sliderOptions.size}
                            active={sliderSettings.size}
                            onValueChange={(size) =>
                              setSliderSettings((settings) => ({
                                ...settings,
                                size,
                              }))
                            }
                          />

                          <OptionRow
                            label="color"
                            values={sliderOptions.color}
                            active={sliderSettings.color}
                            dots={buttonColorDots}
                            onValueChange={(color) =>
                              setSliderSettings((settings) => ({
                                ...settings,
                                color,
                              }))
                            }
                          />

                          <OptionRow
                            label="shape"
                            values={sliderOptions.shape}
                            active={sliderSettings.shape}
                            onValueChange={(shape) =>
                              setSliderSettings((settings) => ({
                                ...settings,
                                shape,
                              }))
                            }
                          />

                          <BooleanOptionRow
                            label="showValue"
                            checked={sliderSettings.showValue}
                            onCheckedChange={(showValue) =>
                              setSliderSettings((settings) => ({
                                ...settings,
                                showValue,
                              }))
                            }
                          />

                          <BooleanOptionRow
                            label="invalid"
                            checked={sliderSettings.invalid}
                            onCheckedChange={(invalid) =>
                              setSliderSettings((settings) => ({
                                ...settings,
                                invalid,
                              }))
                            }
                          />

                          <BooleanOptionRow
                            label="disabled"
                            checked={sliderSettings.disabled}
                            onCheckedChange={(disabled) =>
                              setSliderSettings((settings) => ({
                                ...settings,
                                disabled,
                              }))
                            }
                          />
                        </div>
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
                  )}
                </TabsRoot>
              </>
            ) : (
              activeIntroPage && (
                <IntroDocumentation activePage={activeIntroPage} />
              )
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
