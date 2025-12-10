# UI Components Library

This folder contains reusable UI components for the Docusaurus documentation site.

## Components

### CategoryCardGrid
A grid component that displays multiple category cards in a 2-column layout.

**Usage:**
```tsx
import { CategoryCardGrid } from '@ui-components';

<CategoryCardGrid
  cards={[
    {
      title: 'Card Title',
      description: 'Card description',
      href: '/docs/path/to/page',
    },
  ]}
/>
```

### CategoryCard
An individual card component for displaying category/section links.

**Props:**
- `title: string` - The card title
- `description: string` - The card description
- `href: string` - The link URL

## Import Path

Components are imported using the `@ui-components` alias:
```tsx
import { CategoryCardGrid, CategoryCard } from '@ui-components';
```

This alias is configured in:
- `docusaurus/src/plugins/webpack-config.ts` (webpack resolution)
- `docusaurus/tsconfig.json` (TypeScript path mapping)

## Location

Components are located outside the `docusaurus/` folder at the repository root to allow reuse across different parts of the project if needed.

