"use client";

import * as React from "react";

const surfaces = [
  {
    name: "surface-1",
    value: "var(--surface-1)",
    description:
      "Canvas substrate. The default page and app background.",
    className: "bg-surface-1 shadow-surface-1",
  },
  {
    name: "surface-2",
    value: "var(--surface-2)",
    description:
      "Raised content. Cards, panels, tables, and persistent regions.",
    className: "bg-surface-2 shadow-surface-2",
  },
  {
    name: "surface-3",
    value: "var(--surface-3)",
    description:
      "Floating content. Small overlays, menus, and nested panels.",
    className: "bg-surface-3 shadow-surface-3",
  },
  {
    name: "surface-4",
    value: "var(--surface-4)",
    description:
      "Overlay content. Dialogs, drawers, toasts, and prominent surfaces.",
    className: "bg-surface-4 shadow-surface-4",
  },
  {
    name: "surface-5",
    value: "var(--surface-5)",
    description:
      "Nested overlays. Dropdowns and popovers opened inside overlays.",
    className: "bg-surface-5 shadow-surface-5",
  },
  {
    name: "surface-6",
    value: "var(--surface-6)",
    description:
      "Deep nesting. Second-order overlays that still need separation.",
    className: "bg-surface-6 shadow-surface-6",
  },
  {
    name: "surface-7",
    value: "var(--surface-7)",
    description: "High foreground. Rare planes above already elevated content.",
    className: "bg-surface-7 shadow-surface-7",
  },
  {
    name: "surface-8",
    value: "var(--surface-8)",
    description: "Maximum foreground. The clamped top of the ladder.",
    className: "bg-surface-8 shadow-surface-8",
  },
];

const supportingTokens = [
  {
    group: "Text depth",
    tokens: [
      {
        name: "text-primary",
        value: "#171717",
        previewClass: "text-[#171717]",
        type: "text",
      },
      {
        name: "text-secondary",
        value: "#737373",
        previewClass: "text-[#737373]",
        type: "text",
      },
      {
        name: "text-tertiary",
        value: "#a3a3a3",
        previewClass: "text-[#a3a3a3]",
        type: "text",
      },
      {
        name: "text-disabled",
        value: "#b8b8b8",
        previewClass: "text-[#b8b8b8]",
        type: "text",
      },
    ],
  },
  {
    group: "Text roles",
    tokens: [
      {
        name: "text-inverse",
        value: "#ededed",
        previewClass: "text-[#ededed]",
        type: "text",
      },
      {
        name: "text-on-color",
        value: "#ffffff",
        previewClass: "text-[#ffffff]",
        type: "text",
      },
      {
        name: "text-link",
        value: "oklch(0.5282 0.2628 262.87)",
        previewClass: "text-[oklch(0.5282_0.2628_262.87)]",
        type: "text",
      },
    ],
  },
  {
    group: "Surface treatments",
    tokens: [
      {
        name: "surface-current",
        value: "var(--surface-current)",
        previewClass: "bg-surface-current",
        type: "swatch",
      },
      {
        name: "surface-muted",
        value: "var(--surface-muted)",
        previewClass: "bg-surface-muted",
        type: "swatch",
      },
      {
        name: "surface-hover",
        value: "var(--surface-hover)",
        previewClass: "bg-surface-hover",
        type: "swatch",
      },
      {
        name: "surface-active",
        value: "var(--surface-active)",
        previewClass: "bg-surface-active",
        type: "swatch",
      },
      {
        name: "surface-border",
        value: "var(--surface-border)",
        previewClass: "bg-surface-border",
        type: "swatch",
      },
      {
        name: "surface-border-strong",
        value: "var(--surface-border-strong)",
        previewClass: "bg-surface-border-strong",
        type: "swatch",
      },
      {
        name: "surface-ring",
        value: "var(--surface-ring)",
        previewClass: "bg-surface-ring",
        type: "swatch",
      },
    ],
  },
  {
    group: "Accent",
    tokens: [
      {
        name: "accent",
        value: "oklch(56% 0.18 255)",
        previewClass: "bg-[oklch(56%_0.18_255)]",
        type: "swatch",
      },
      {
        name: "text-on-color",
        value: "oklch(100% 0 0)",
        previewClass: "bg-[oklch(100%_0_0)]",
        type: "swatch",
      },
      {
        name: "accent-soft",
        value: "oklch(95.5% 0.032 255)",
        previewClass: "bg-[oklch(95.5%_0.032_255)]",
        type: "swatch",
      },
      {
        name: "accent-active",
        value: "oklch(92.5% 0.045 255)",
        previewClass: "bg-[oklch(92.5%_0.045_255)]",
        type: "swatch",
      },
      {
        name: "accent-border",
        value: "oklch(82% 0.07 255)",
        previewClass: "bg-[oklch(82%_0.07_255)]",
        type: "swatch",
      },
      {
        name: "text-link",
        value: "oklch(38% 0.14 255)",
        previewClass: "text-[oklch(38%_0.14_255)]",
        type: "text",
      },
    ],
  },
  {
    group: "Overlay roles",
    tokens: [
      {
        name: "overlay-scrim",
        value: "var(--overlay-scrim)",
        previewClass: "bg-overlay-scrim",
        type: "swatch",
      },
      {
        name: "text-inverse",
        value: "oklch(98.5% 0.004 250)",
        previewClass: "bg-[oklch(98.5%_0.004_250)]",
        type: "swatch",
      },
    ],
  },
];

function TokenPreview({
  name,
  value,
  previewClass,
  type,
}: {
  name: string;
  value: string;
  previewClass: string;
  type: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-current p-3">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-primary">
          {name}
        </div>
        <div className="mt-0.5 truncate text-xs text-secondary">
          {value}
        </div>
      </div>

      {type === "text" ? (
        <div
          className={["shrink-0 text-lg font-semibold", previewClass].join(" ")}
        >
          Aa
        </div>
      ) : (
        <div
          className={[
            "h-9 w-14 shrink-0 rounded-lg border border-border",
            previewClass,
          ].join(" ")}
        />
      )}
    </div>
  );
}

export function AspektColorSystemDemo() {
  return (
    <div className="min-h-screen bg-surface-current p-6 text-primary md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-4">
          <div className="inline-flex rounded-full border border-border bg-surface-2 px-3 py-1 text-sm text-secondary shadow-surface-2">
            Aspekt surface model
          </div>

          <div className="space-y-2">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Eight levels, one current substrate.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-secondary">
              Components read the current surface from context and lift
              relative to it. Treatments such as muted, hover, active, border,
              and ring stay contextual instead of becoming extra aliases.
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-border bg-surface-2 p-5 shadow-surface-2 md:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Surface stack
              </h2>
              <p className="mt-1 text-sm text-secondary">
                Ordered from canvas to maximum foreground.
              </p>
            </div>

            <div className="rounded-xl bg-surface-muted px-3 py-2 text-xs text-secondary">
              surface-1 -&gt; surface-2 -&gt; ... -&gt; surface-8
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {surfaces.map((surface, index) => (
              <div
                key={surface.name}
                className={[
                  "min-h-64 rounded-2xl border border-border p-5",
                  surface.className,
                ].join(" ")}
              >
                <div className="mb-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-tertiary">
                      Layer {index + 1}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-primary">
                      {surface.name}
                    </h3>
                  </div>

                  <div className="rounded-full border border-border bg-surface-current/70 px-2.5 py-1 text-xs text-secondary backdrop-blur">
                    {index === 0
                      ? "canvas"
                      : index === surfaces.length - 1
                        ? "max"
                        : `+${index}`}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-secondary">
                  {surface.description}
                </p>

                <div className="mt-5 rounded-xl border border-border bg-surface-current/60 p-3 text-xs text-tertiary">
                  {surface.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-border bg-surface-2 p-5 shadow-surface-2 md:p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Real UI example
                </h2>
                <p className="mt-1 text-sm text-secondary">
                  Levels create planes. Treatments create states inside a
                  plane.
                </p>
              </div>

              <button className="w-fit rounded-xl bg-action px-3.5 py-2 text-sm font-medium text-on-color shadow-surface-2 transition hover:brightness-95 active:scale-[0.98]">
                New project
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-surface-1 p-4">
              <div className="rounded-2xl border border-border bg-surface-3 p-4 shadow-surface-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">Aspekt components</h3>
                    <p className="text-sm text-secondary">
                      surface-3 plane.
                    </p>
                  </div>

                  <span className="rounded-full border border-surface-border-strong bg-surface-active px-2.5 py-1 text-xs font-medium text-primary">
                    Selected
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-surface-muted p-3">
                  <div className="mb-3 flex items-center justify-between text-xs text-tertiary">
                    <span>surface-muted treatment</span>
                    <span>3 updates</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Button color variants refined",
                      "Dialog overlay behavior checked",
                      "Docs color page prepared",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-current px-3 py-2 text-sm"
                      >
                        <span>{item}</span>
                        <span className="text-xs text-tertiary">
                          current
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <button className="rounded-xl border border-border bg-surface-current px-3 py-2 text-sm font-medium hover:bg-surface-hover active:bg-surface-active">
                    Default
                  </button>
                  <button className="rounded-xl bg-surface-muted px-3 py-2 text-sm font-medium text-primary hover:bg-surface-hover">
                    Soft
                  </button>
                  <button className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-inverse">
                    Solid
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-surface-border-strong bg-surface-muted p-4 text-sm text-secondary">
              <strong className="font-semibold">Token rule:</strong> color
              level describes the plane. Surface treatment tokens describe
              local state. Intent colors still describe meaning.
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface-2 p-5 shadow-surface-2 md:p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Supporting tokens
            </h2>
            <p className="mt-1 text-sm text-secondary">
              Treatments, text depth, and intent live alongside the surface
              ladder.
            </p>

            <div className="mt-6 space-y-6">
              {supportingTokens.map((group) => (
                <div key={group.group}>
                  <h3 className="mb-2 text-sm font-semibold text-secondary">
                    {group.group}
                  </h3>

                  <div className="space-y-2">
                    {group.tokens.map((token) => (
                      <TokenPreview
                        key={token.name}
                        name={token.name}
                        value={token.value}
                        previewClass={token.previewClass}
                        type={token.type}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative rounded-3xl border border-border bg-surface-2 p-5 shadow-surface-2 md:p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Floating without aliases
          </h2>
          <p className="mt-1 text-sm text-secondary">
            The trigger uses surface-3. The menu lifts to surface-4. A nested
            hint lifts again without needing a named alias.
          </p>

          <div className="mt-6 rounded-2xl bg-surface-1 p-6">
            <div className="relative max-w-md rounded-2xl border border-border bg-surface-3 p-4 shadow-surface-3">
              <div className="font-semibold">Command trigger</div>
              <div className="mt-1 text-sm text-secondary">
                This is a surface-3 plane.
              </div>

              <div className="absolute left-6 top-20 z-10 w-72 rounded-2xl border border-border bg-surface-4 p-2 shadow-surface-4">
                {["Open components", "View tokens", "Copy theme"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl px-3 py-2 text-sm text-primary hover:bg-surface-hover"
                    >
                      {item}
                    </div>
                  ),
                )}

                <div className="mt-2 rounded-xl border border-border bg-surface-5 px-3 py-2 text-xs text-secondary shadow-surface-5">
                  Nested hint uses surface-5.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ConstructionPage() {
  return (
    <div>
      <AspektColorSystemDemo />
    </div>
  );
}
