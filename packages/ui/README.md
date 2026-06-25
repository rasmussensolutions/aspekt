# Aspekt UI

React components for Aspekt.

## Recommended usage

Use the Aspekt CLI to copy component source into your React and Tailwind
project:

```sh
npx aspekt init
npx aspekt add button
```

Then import the copied component from your app:

```tsx
import { Button } from "@/components/aspekt/button";

export function Example() {
  return <Button>Save</Button>;
}
```

## Package install

The compiled package is still available if you prefer a traditional npm
dependency:

```sh
npm install @aspekt/ui
```

Import components from the root package or focused subpaths:

```tsx
import { Button } from "@aspekt/ui/button";

export function Example() {
  return <Button>Save</Button>;
}
```

The package includes Base UI-powered primitives, Tailwind-generated styles, and Aspekt theme variables. Add the `dark` class to your root element to enable dark mode.

Component entrypoints automatically load the package stylesheet. If your bundler requires explicit CSS imports, you can still import `@aspekt/ui/styles.css` once in your app entrypoint.
