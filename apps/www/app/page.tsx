"use client";

import { Button } from "@aspekt/ui/button";
import { Checkbox } from "@aspekt/ui/checkbox";
import { Code } from "@aspekt/ui/code";
import { Blockquote } from "@aspekt/ui/blockquote";
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
import { Kbd } from "@aspekt/ui/kbd";
import { List, ListItem } from "@aspekt/ui/list";
import { Prose } from "@aspekt/ui/prose";
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
import { Slider } from "@aspekt/ui/slider";
import { Snippet } from "@aspekt/ui/snippet";
import { SoundProvider, useSound } from "@aspekt/ui/sound-provider";
import { Switch } from "@aspekt/ui/switch";
import { Toggle } from "@aspekt/ui/toggle";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  StackIcon,
} from "@phosphor-icons/react";
import * as React from "react";

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
type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";
type ButtonColor = "accent" | "blue" | "red" | "amber" | "neutral";
type ButtonShape = "square" | "round";
type DialogSize = "small" | "medium" | "large";
type DrawerSide = "top" | "right" | "bottom" | "left";
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
  slider: 'import { Slider } from "@aspekt/ui/slider";',
  switch: 'import { Switch } from "@aspekt/ui/switch";',
  toggle: 'import { Toggle } from "@aspekt/ui/toggle";',
  dialog: 'import { DialogRoot, DialogTrigger } from "@aspekt/ui/dialog";',
  drawer: 'import { DrawerRoot, DrawerTrigger } from "@aspekt/ui/drawer";',
  snippet: 'import { Snippet } from "@aspekt/ui/snippet";',
  heading: 'import { Heading } from "@aspekt/ui/heading";',
  text: 'import { Text } from "@aspekt/ui/text";',
  code: 'import { Code } from "@aspekt/ui/code";',
  kbd: 'import { Kbd } from "@aspekt/ui/kbd";',
  prose: 'import { Prose } from "@aspekt/ui/prose";',
  blockquote: 'import { Blockquote } from "@aspekt/ui/blockquote";',
  list: 'import { List, ListItem } from "@aspekt/ui/list";',
  "sound-provider":
    'import { SoundProvider, useSound } from "@aspekt/ui/sound-provider";',
} satisfies Record<ComponentPreview, string>;

const componentUsageExamples = {
  button: `<Button color="neutral" sound="success">
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
  snippet: `<Snippet
  filename="example.tsx"
  language="tsx"
  code={'<Button>Save changes</Button>'}
  showLineNumbers
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
  "sound-provider": `<SoundProvider enabled variant="soft" volume={0.8}>
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

const snippetExamples = {
  tsx: {
    filename: "save-button.tsx",
    code: `import { Button } from "@aspekt/ui/button";

export function SaveButton() {
  return (
    <Button color="neutral" sound="success">
      Save changes
    </Button>
  );
}`,
  },
  bash: {
    filename: "terminal",
    code: `npm install @aspekt/ui
pnpm --filter @aspekt/ui build`,
  },
  json: {
    filename: "package.json",
    code: `{
  "dependencies": {
    "@aspekt/ui": "^0.1.3"
  }
}`,
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
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={`Toggle ${label}`}
        color="accent"
        shape="square"
        size="medium"
        variant="solid"
      />
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

function ImportExample({
  activeComponent,
}: {
  activeComponent: ComponentPreview;
}) {
  const importCommand = componentImportExamples[activeComponent];
  const usageExample = componentUsageExamples[activeComponent];

  return (
    <div className="mb-12 grid gap-2 ">
      <div className="text-sm font-medium text-foreground">Usage</div>
      <Snippet code={importCommand} copyable={false} language="tsx" />
      <Snippet code={usageExample} language="tsx" showHeader={false} />
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
              This will make the latest component changes available to your app.
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
                  Review component details before saving changes.
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
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Toggle interaction sound"
            color="accent"
            shape="square"
            size="small"
            variant="soft"
          />
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
        >{`npm install @aspekt/ui
import { Code } from "@aspekt/ui/code";`}</Code>
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
        <Snippet
          code={soundProviderRootExample.trim()}
          filename="app/layout.tsx"
          language="tsx"
        />
      </section>

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold text-foreground">useSound</h2>
        <Snippet
          code={useSoundExample.trim()}
          filename="sound-settings.tsx"
          language="tsx"
        />
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
              This makes the latest component changes available to your app.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-500 dark:border-white/15 dark:bg-white/5 dark:text-neutral-300">
            @aspekt/ui/dialog
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
                    @aspekt/ui/drawer
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                    install
                  </span>
                  <span className="min-w-0 break-all text-right font-mono text-foreground">
                    npm install @aspekt/ui
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
        <Snippet
          code={dialogExample.trim()}
          filename="example-dialog.tsx"
          language="tsx"
        />
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
          compose Aspekt Button, so variants, sizes, loading state, affixes, and
          sound overrides stay consistent.
        </p>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Keep DrawerOverlay in the portal when you want outside-click
          dismissal. Setting backdrop to false keeps that layer transparent
          instead of rendering the dark dim.
        </p>
      </section>

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold text-foreground">usage</h2>
        <Snippet
          code={drawerExample.trim()}
          filename="example-drawer.tsx"
          language="tsx"
        />
      </section>
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
      "Sound is a first-class part of Aspekt, not an extra layer added at the end.",
      "Aspekt components include sound feedback by default because interactions should be felt as well as seen. Presses, toggles, success states, errors, and state changes can all become clearer when they have a short, intentional audio cue.",
      "Sound can be disabled, adjusted globally with SoundProvider, or tuned with different sound variants and volume. Components also support fine-grained sound control when a specific interaction needs different behavior.",
      "Global control belongs in SoundProvider. Local control belongs on the component. Both should feel easy.",
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
          Install the package
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Add Aspekt UI from npm. Components are imported from focused subpaths
          so you only reach for the pieces your app actually uses.
        </Text>
        <Snippet
          className="max-w-3xl"
          code="npm install @aspekt/ui"
          language="bash"
        />
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Import a component
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Import directly from the component subpath. The shared Aspekt
          stylesheet is loaded by the component entry, so you do not need a
          separate global CSS import to get the default styles.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`import { Button } from "@aspekt/ui/button";

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
          Every component follows the same package pattern. Browse the sidebar,
          pick the component you need, and import it from its own path.
        </Text>
        <List
          variant="disc"
          spacing="normal"
          tone="muted"
          className="max-w-3xl"
        >
          <ListItem>
            <Code>@aspekt/ui/button</Code> for buttons.
          </ListItem>
          <ListItem>
            <Code>@aspekt/ui/dialog</Code> for modal workflows.
          </ListItem>
          <ListItem>
            <Code>@aspekt/ui/input</Code> for form fields.
          </ListItem>
          <ListItem>
            <Code>@aspekt/ui/sound-provider</Code> for global sound control.
          </ListItem>
        </List>
      </section>

      <section className="grid gap-4 border-t border-neutral-200 pt-8 dark:border-white/15">
        <Heading level={2} size="h5" className="max-w-3xl">
          Add global sound control when you need it
        </Heading>
        <Text size="base" tone="muted" className="max-w-3xl">
          Aspekt sound feedback is enabled by default. Add SoundProvider when
          you want one global place to disable sound, change the sound variant,
          or tune the volume across your app.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`import { SoundProvider } from "@aspekt/ui/sound-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider enabled variant="soft" volume={0.8}>
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
          Use global settings for broad behavior, then override individual
          components when a specific interaction needs to be quieter, louder, or
          semantically different.
        </Text>
        <Snippet
          className="max-w-3xl"
          code={`import { Button } from "@aspekt/ui/button";

export function Actions() {
  return (
    <div>
      <Button sound="success">Publish</Button>
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

export default function Home() {
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
  const [activePage, setActivePage] =
    React.useState<DocsPage>("getting-started");
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

      if (hash === "purpose") {
        setActivePage("getting-started");
        window.history.replaceState(null, "", "#getting-started");
        return;
      }

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
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Sidebar activePage={activePage} onPageChange={navigateToPage} />

        <div className="relative min-w-0 overflow-hidden lg:h-screen">
          <section
            ref={previewScrollRef}
            className="flex min-h-0 min-w-0 flex-col overflow-x-hidden px-6 pb-16 pt-4 sm:px-10 lg:h-full lg:overflow-y-auto lg:px-12 lg:py-18"
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

                <ImportExample activeComponent={activeComponent} />
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

            {activeComponent === "switch" && (
              <div className="grid gap-8">
                <OptionRow
                  label="variant"
                  values={switchOptions.variant}
                  active={switchSettings.variant}
                  onValueChange={(variant) =>
                    setSwitchSettings((settings) => ({ ...settings, variant }))
                  }
                />

                <OptionRow
                  label="size"
                  values={switchOptions.size}
                  active={switchSettings.size}
                  onValueChange={(size) =>
                    setSwitchSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="color"
                  values={switchOptions.color}
                  active={switchSettings.color}
                  dots={buttonColorDots}
                  onValueChange={(color) =>
                    setSwitchSettings((settings) => ({ ...settings, color }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={switchOptions.shape}
                  active={switchSettings.shape}
                  onValueChange={(shape) =>
                    setSwitchSettings((settings) => ({ ...settings, shape }))
                  }
                />

                <BooleanOptionRow
                  label="checked"
                  checked={switchSettings.checked}
                  onCheckedChange={(checked) =>
                    setSwitchSettings((settings) => ({ ...settings, checked }))
                  }
                />

                <BooleanOptionRow
                  label="invalid"
                  checked={switchSettings.invalid}
                  onCheckedChange={(invalid) =>
                    setSwitchSettings((settings) => ({ ...settings, invalid }))
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
              <div className="grid gap-8">
                <OptionRow
                  label="variant"
                  values={sliderOptions.variant}
                  active={sliderSettings.variant}
                  onValueChange={(variant) =>
                    setSliderSettings((settings) => ({ ...settings, variant }))
                  }
                />

                <OptionRow
                  label="size"
                  values={sliderOptions.size}
                  active={sliderSettings.size}
                  onValueChange={(size) =>
                    setSliderSettings((settings) => ({ ...settings, size }))
                  }
                />

                <OptionRow
                  label="color"
                  values={sliderOptions.color}
                  active={sliderSettings.color}
                  dots={buttonColorDots}
                  onValueChange={(color) =>
                    setSliderSettings((settings) => ({ ...settings, color }))
                  }
                />

                <OptionRow
                  label="shape"
                  values={sliderOptions.shape}
                  active={sliderSettings.shape}
                  onValueChange={(shape) =>
                    setSliderSettings((settings) => ({ ...settings, shape }))
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
                    setSliderSettings((settings) => ({ ...settings, invalid }))
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

            {activeComponent === "snippet" && (
              <div className="mb-12 grid gap-8">
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
                    setSnippetSettings((settings) => ({ ...settings, shape }))
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
                    setSnippetSettings((settings) => ({ ...settings, wrap }))
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

            {activeComponent === "code" && (
              <div className="grid gap-8">
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
            )}

            {activeComponent === "kbd" && (
              <div className="grid gap-8">
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
            )}

            {activeComponent === "prose" && (
              <div className="grid gap-8">
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
            )}

            {activeComponent === "blockquote" && (
              <div className="grid gap-8">
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
            )}

            {activeComponent === "list" && (
              <div className="grid gap-8">
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
