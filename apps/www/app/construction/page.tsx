"use client";

import * as React from "react";

const surfaces = [
  {
    name: "surface-sunken",
    value: "oklch(0.9461 0 0)",
    description:
      "Deepest plane. Used for inset areas, table headers, code blocks, and quiet nested regions.",
    className: "bg-[oklch(0.9461_0_0)]",
  },
  {
    name: "surface",
    value: "oklch(0.9791 0 0)",
    description:
      "The app canvas. Used for body, page backgrounds, dashboards, and docs layouts.",
    className: "bg-[oklch(0.9791_0_0)]",
  },
  {
    name: "surface-raised",
    value: "oklch(1 0 0)",
    description:
      "Default content plane. Used for cards, forms, panels, sheets, and sections.",
    className: "bg-[oklch(1_0_0)]",
  },
  {
    name: "surface-floating",
    value: "oklch(100% 0 0)",
    description:
      "Floating plane. Used for popovers, dropdowns, command menus, dialogs, and sheets.",
    className:
      "bg-[oklch(100%_0_0)] shadow-[0_8px_24px_oklch(20%_0.02_250_/_0.10),0_24px_64px_oklch(20%_0.02_250_/_0.08)]",
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
    group: "Borders",
    tokens: [
      {
        name: "border-subtle",
        value: "oklch(92.5% 0.006 250)",
        previewClass: "bg-[oklch(92.5%_0.006_250)]",
        type: "swatch",
      },
      {
        name: "border",
        value: "oklch(88.5% 0.008 250)",
        previewClass: "bg-[oklch(88.5%_0.008_250)]",
        type: "swatch",
      },
      {
        name: "border-strong",
        value: "oklch(78% 0.012 250)",
        previewClass: "bg-[oklch(78%_0.012_250)]",
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
        name: "accent-sunken",
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
    group: "Inverse",
    tokens: [
      {
        name: "inverse-surface",
        value: "oklch(20% 0.012 250)",
        previewClass: "bg-[oklch(20%_0.012_250)]",
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
  {
    group: "States",
    tokens: [
      {
        name: "state-hover",
        value: "oklch(95.4% 0.006 250)",
        previewClass: "bg-[oklch(95.4%_0.006_250)]",
        type: "swatch",
      },
      {
        name: "state-active",
        value: "oklch(92.8% 0.008 250)",
        previewClass: "bg-[oklch(92.8%_0.008_250)]",
        type: "swatch",
      },
      {
        name: "state-selected",
        value: "oklch(95.5% 0.032 255)",
        previewClass: "bg-[oklch(95.5%_0.032_255)]",
        type: "swatch",
      },
      {
        name: "focus-ring",
        value: "oklch(56% 0.18 255 / 0.35)",
        previewClass: "bg-[oklch(56%_0.18_255_/_0.35)]",
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
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[oklch(92.5%_0.006_250)] bg-[oklch(98.6%_0.004_250)] p-3">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-[oklch(18%_0.012_250)]">
          {name}
        </div>
        <div className="mt-0.5 truncate text-xs text-[oklch(62%_0.01_250)]">
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
            "h-9 w-14 shrink-0 rounded-lg border border-[oklch(88.5%_0.008_250)]",
            previewClass,
          ].join(" ")}
        />
      )}
    </div>
  );
}

export function AspektColorSystemDemo() {
  return (
    <div className="min-h-screen bg-[oklch(0.9791_0_0)] p-6 text-[oklch(18%_0.012_250)] md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-4">
          <div className="inline-flex rounded-full border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0)] px-3 py-1 text-sm text-[oklch(44%_0.012_250)] shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.04)]">
            Aspekt light mode
          </div>

          <div className="space-y-2">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              A smaller color system with clearer depth.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[oklch(44%_0.012_250)]">
              Four surface tokens handle the visual planes. Raised cards and
              overlays are created with shadow and border, not extra duplicate
              colors.
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0)] p-5 shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.06),0_8px_24px_oklch(20%_0.02_250_/_0.04)] md:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Surface stack
              </h2>
              <p className="mt-1 text-sm text-[oklch(44%_0.012_250)]">
                Ordered from deepest to closest.
              </p>
            </div>

            <div className="rounded-xl bg-[oklch(96.4%_0.006_250)] px-3 py-2 text-xs text-[oklch(44%_0.012_250)]">
              surface-sunken -&gt; surface -&gt; surface-raised -&gt; surface-floating
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {surfaces.map((surface, index) => (
              <div
                key={surface.name}
                className={[
                  "min-h-64 rounded-2xl border border-[oklch(88.5%_0.008_250)] p-5",
                  surface.className,
                ].join(" ")}
              >
                <div className="mb-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-[oklch(62%_0.01_250)]">
                      Layer {index}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-[oklch(18%_0.012_250)]">
                      {surface.name}
                    </h3>
                  </div>

                  <div className="rounded-full border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0_/_0.72)] px-2.5 py-1 text-xs text-[oklch(44%_0.012_250)] backdrop-blur">
                    {index === 0
                      ? "deepest"
                      : index === 3
                        ? "closest"
                        : `z-${index}`}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[oklch(44%_0.012_250)]">
                  {surface.description}
                </p>

                <div className="mt-5 rounded-xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0_/_0.6)] p-3 text-xs text-[oklch(62%_0.01_250)]">
                  {surface.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0)] p-5 shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.06),0_8px_24px_oklch(20%_0.02_250_/_0.04)] md:p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Real UI example
                </h2>
                <p className="mt-1 text-sm text-[oklch(44%_0.012_250)]">
                  Same four surfaces, used as an actual dashboard card.
                </p>
              </div>

              <button className="w-fit rounded-xl bg-[oklch(56%_0.18_255)] px-3.5 py-2 text-sm font-medium text-white shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.08)] transition hover:brightness-95 active:scale-[0.98]">
                New project
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-[oklch(0.9791_0_0)] p-4">
              <div className="rounded-2xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(1_0_0)] p-4 shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.06),0_8px_24px_oklch(20%_0.02_250_/_0.04)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">Aspekt components</h3>
                    <p className="text-sm text-[oklch(44%_0.012_250)]">
                      surface-raised treatment.
                    </p>
                  </div>

                  <span className="rounded-full border border-[oklch(82%_0.07_255)] bg-[oklch(95.5%_0.032_255)] px-2.5 py-1 text-xs font-medium text-[oklch(38%_0.14_255)]">
                    Selected
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-[oklch(0.9461_0_0)] p-3">
                  <div className="mb-3 flex items-center justify-between text-xs text-[oklch(62%_0.01_250)]">
                    <span>surface-sunken inset area</span>
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
                        className="flex items-center justify-between gap-3 rounded-lg border border-[oklch(92.5%_0.006_250)] bg-[oklch(100%_0_0)] px-3 py-2 text-sm"
                      >
                        <span>{item}</span>
                        <span className="text-xs text-[oklch(62%_0.01_250)]">
                          surface-raised
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <button className="rounded-xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0)] px-3 py-2 text-sm font-medium hover:bg-[oklch(95.4%_0.006_250)] active:bg-[oklch(92.8%_0.008_250)]">
                    Default
                  </button>
                  <button className="rounded-xl bg-[oklch(95.5%_0.032_255)] px-3 py-2 text-sm font-medium text-[oklch(38%_0.14_255)] hover:bg-[oklch(92.5%_0.045_255)]">
                    Soft
                  </button>
                  <button className="rounded-xl bg-[oklch(20%_0.012_250)] px-3 py-2 text-sm font-medium text-[oklch(98.5%_0.004_250)]">
                    Inverse
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[oklch(82%_0.07_255)] bg-[oklch(95.5%_0.032_255)] p-4 text-sm text-[oklch(38%_0.14_255)]">
              <strong className="font-semibold">Token rule:</strong> color
              describes the plane, shadow describes the elevation, semantic
              colors describe intent.
            </div>
          </div>

          <div className="rounded-3xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0)] p-5 shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.06),0_8px_24px_oklch(20%_0.02_250_/_0.04)] md:p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Supporting tokens
            </h2>
            <p className="mt-1 text-sm text-[oklch(44%_0.012_250)]">
              Not surfaces — these support text, borders, states, and intent.
            </p>

            <div className="mt-6 space-y-6">
              {supportingTokens.map((group) => (
                <div key={group.group}>
                  <h3 className="mb-2 text-sm font-semibold text-[oklch(44%_0.012_250)]">
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

        <section className="relative rounded-3xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(100%_0_0)] p-5 shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.06),0_8px_24px_oklch(20%_0.02_250_/_0.04)] md:p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Floating without extra surface bloat
          </h2>
          <p className="mt-1 text-sm text-[oklch(44%_0.012_250)]">
            The menu uses surface-floating. The trigger card uses
            surface-raised plus a raised shadow.
          </p>

          <div className="mt-6 rounded-2xl bg-[oklch(0.9461_0_0)] p-6">
            <div className="relative max-w-md rounded-2xl border border-[oklch(88.5%_0.008_250)] bg-[oklch(1_0_0)] p-4 shadow-[0_1px_2px_oklch(20%_0.02_250_/_0.06),0_8px_24px_oklch(20%_0.02_250_/_0.04)]">
              <div className="font-semibold">Command trigger</div>
              <div className="mt-1 text-sm text-[oklch(44%_0.012_250)]">
                This is surface-raised with raised treatment.
              </div>

              <div className="absolute left-6 top-20 z-10 w-72 rounded-2xl border border-[oklch(78%_0.012_250)] bg-[oklch(100%_0_0)] p-2 shadow-[0_8px_24px_oklch(20%_0.02_250_/_0.10),0_24px_64px_oklch(20%_0.02_250_/_0.08)]">
                {["Open components", "View tokens", "Copy theme"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl px-3 py-2 text-sm text-[oklch(18%_0.012_250)] hover:bg-[oklch(95.4%_0.006_250)]"
                    >
                      {item}
                    </div>
                  ),
                )}

                <div className="mt-2 rounded-xl bg-[oklch(20%_0.012_250)] px-3 py-2 text-xs text-[oklch(98.5%_0.004_250)]">
                  Tooltip uses inverse, not a surface token.
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
