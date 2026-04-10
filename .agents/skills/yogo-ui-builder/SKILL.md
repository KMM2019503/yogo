---
name: yogo-ui-builder
description: "Build and refactor UI for the Yogo Next.js app using local components/ui building blocks, Tailwind utilities, and project form patterns. Use when creating new pages or components, restyling existing interfaces, improving accessibility and responsiveness, or implementing form UX in app and components."
---

# Yogo Ui Builder

## Overview

Use this skill to ship consistent UI quickly in this codebase. Reuse existing UI wrappers, keep direct Radix imports contained to `components/ui`, and follow the same form and styling conventions used across the app.

## Workflow

1. Inspect nearby code before adding new UI.
- Read the target page/component and adjacent files first.
- Match existing spacing, typography, naming, and interaction patterns.

2. Compose screens from local UI primitives first.
- Import primitives from `@/components/ui/*` in feature code.
- Prefer existing building blocks such as `Button`, `Input`, `Textarea`, `Select`, `Dialog`, `Table`, and `Badge`.
- Reuse `SubmitButton` when handling pending/disabled submit states.

3. Keep Radix imports at the UI boundary.
- Do not import `@radix-ui/*` in feature files under `app/`, `actions/`, or non-UI feature components.
- Add or update wrappers in `components/ui/*` when a primitive is missing, then consume only that wrapper outside `components/ui`.

4. Apply styling with project conventions.
- Use `cn()` from `@/lib/utils` for class composition.
- Prefer tokens/utilities already defined in `tailwind.config.ts` and `app/globals.css`.
- Keep focus-visible styles and disabled states explicit for interactive controls.

5. Validate UX and implementation quality.
- Verify mobile and desktop behavior.
- Verify keyboard focus, label association, and error message rendering.
- Run `npm run lint`; run `npm run build` for broader UI refactors.

## Form Pattern (React Hook Form + Zod + UI Wrappers)

Use this baseline pattern when adding forms:

```tsx
const form = useForm<z.infer<typeof Schema>>({
  resolver: zodResolver(Schema),
  defaultValues: { email: "" },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>;
```

## Decision Rules

- Prefer class overrides in feature components before changing shared primitives.
- Extract repeated visual patterns into reusable utility classes or variants when repeated 3+ times.
- Add a new file in `components/ui/` when introducing a new interactive primitive.
- Preserve backwards compatibility for existing props when modifying shared UI components.

## Constraint: Shadcn and Radix

- Treat `shadcn/ui` in this repo as local wrapper components stored in `components/ui/`.
- Assume many wrappers internally use `@radix-ui/*`; removing those packages requires rewriting the affected wrappers rather than only changing imports.
- Enforce the boundary rule: use `@/components/ui/*` in feature code and avoid direct Radix usage outside `components/ui`.

## References

- Read `references/project-ui-conventions.md` before broad UI refactors.
