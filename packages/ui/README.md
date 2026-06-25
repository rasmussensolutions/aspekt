# Aspekt UI

React components for Aspekt.

## Install

```sh
npm install @aspekt/ui
```

Import the package CSS once in your app entrypoint:

```tsx
import "@aspekt/ui/styles.css";
```

Then import components from the root package or focused subpaths:

```tsx
import { Button } from "@aspekt/ui/button";

export function Example() {
  return <Button>Save</Button>;
}
```

The package includes Base UI-powered primitives, Tailwind-generated styles, and Aspekt theme variables. Add the `dark` class to your root element to enable dark mode.
