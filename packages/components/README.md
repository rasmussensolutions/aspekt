# Aspekt Components

Internal React component source for the Aspekt docs app and CLI templates.

## Public usage

Use the Aspekt CLI to copy component source into your React and Tailwind
project:

```sh
npx @aspekt/ui init
npx @aspekt/ui add button
```

Then import the copied component from your app:

```tsx
import { Button } from "@/components/aspekt/button";

export function Example() {
  return <Button>Save</Button>;
}
```

This workspace package is private and should not be published.
