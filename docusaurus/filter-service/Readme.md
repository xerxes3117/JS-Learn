# Filter + Sort Package Design Document

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [API & Contract](#api--contract)
4. [Callbacks](#callbacks)
5. [Theme & Platform Support](#theme--platform-support)
6. [Integration Pattern](#integration-pattern)
7. [Testing & Publishing](#testing--publishing)

## Overview

A standalone reusable UI component package for dynamic filtering and sorting.

### Key Features

- **Filter Types**: Radio (single), Checkbox (multi), Slider (range)
- **Sort Integration**: Configurable sort options
- **Platform Support**: Web and React Native
- **Theme Support**: Multiple brand themes (gi, mmt) with support for custom overrides

## Architecture

### Standalone Package Structure

```
filter-sort-package/
├── src/
│   ├── components/            # UI Components
│   │   ├── container/         # Main container
│   │   ├── filters/           # RadioFilter, CheckboxFilter, SliderFilter  
│   ├── types/                 # TypeScript definitions
│   ├── utils/                 # Contract & query generators
│   ├── hooks/                 # State management hooks
│   └── themes/                # Theme definitions
├── dist/                      # Built package
├── tests/
└── package.json
```

## API & Contract

### PropTypes Interface

These are the input props that are passed to the component and used to render the component.

```typescript
interface FilterSortProps {
  title?: string;
  filters: FilterConfig[];
  defaultSelectedFilterId: string;
  footerData: FooterConfig;
  theme: ThemeConfig;
  platform: 'web' | 'native';
  onFilterChange: (filterUpdate: FilterUpdate) => void;
  onApply: (contract: FilterSortContract) => void;
  onReset: () => void;
 isLoading: boolean;
}

interface FilterConfig {
  id: string; // sort should have its own id to identify it
  type: 'radio' | 'checkbox' | 'slider';
  label: string;
  isApplied?: boolean;
  showClear?: boolean;
  showSearch?: boolean;
  data: Option[] | Range;
}

interface Option {
  id: string;
  label: string;
  value?: string;
  disabled?: boolean; 
  iconUrl?: string;
  count?: number;
  isApplied?: boolean;
}

interface Range {
  min: number;
  max: number;
}

interface FooterConfig {
  reset?: {
    label?: string;
    show?: boolean;
  };
  apply?: {
    label?: string;
    show?: boolean;
  };
}

interface ThemeConfig {
  name: 'gi' | 'mmt';           // Only 'gi' | 'mmt' allowed
  customOverrides?: ThemeOverrides; // For FilterSortCustomizable variant
}

interface FilterUpdate {
  filterId: string;
  options?: Option[];
}
```

### Output Contract

This is the output that is sent to the consumer on apply.

```typescript
interface FilterSortContract {
  filters: FilterOutput[]; //only send filter groups that have some applied options
}

interface FilterOutput {
   id: string;
   data: FilterOption[] | Range;
}
```

## Callbacks

#### onFilterChange

Called in real-time when any filter value changes. Sends only the changed data for optimal performance.

```typescript
onFilterChange: (filterUpdate: FilterUpdate) => {}

{
  id: 'seat_type',
  options: [
    { id: '1', applied: true }, 
    { id: '2', applied: false }
  ]
}
```

> ⚠️ **Important**
If this callback triggers an API call on consumer side, then consumer itself needs to handle debounce functionality and/or cancelling the API call in case of another filter change before previous API call is completed.

#### onApply

Called when user clicks apply button.

```typescript
onApply: (contract: FilterSortContract) => void

{
  filters: [
  {
   id: 'sort_by',
   options: [
    { id: '1', applied: true }, 
    { id: '2', applied: false }
   ]
  },
   { 
     id: 'seat_type', 
     options: [
      { id: '1', applied: true }, 
      { id: '2', applied: false }
     ]  
   },
   { 
     id: 'price', 
     options: [
      { id: '1', applied: true }, 
      { id: '2', applied: false }
     ]  
   }
  ],
}
```

#### onReset

Called when filters are reset to their default state. This is used to reset the filter options to their default state.

```typescript
onReset: () => void
// No parameters - consumer should reset their data/UI state
```

### Core Components Interface

```typescript
// Filter Types
interface RadioFilterProps {
  config: RadioFilterConfig; //TODO_VS: update these
  value: string | null;
  onChange: (value: string) => void;
  counts?: Record<string, number>;
}

interface CheckboxFilterProps {
  config: CheckboxFilterConfig; //TODO_VS: update these
  values: string[];
  onChange: (values: string[]) => void;
  counts?: Record<string, number>;
}

interface SliderFilterProps {
  config: SliderFilterConfig; //TODO_VS: update these
  range: [number, number];
  onChange: (range: [number, number]) => void;
  count?: number;
}
```

## Theme & Platform Support

### Supported Themes & Platforms

- **Base Themes**: `gi`, `mmt` (strict, immutable)
- **Platforms**: `web` , `native`,
- **Customization**: Theme overrides available in `FilterSortCustomizable`

### Dual Package Architecture

- **FilterSort**: Strict mode with only `gi` and `mmt` brand themes
- **FilterSortCustomizable**: Flexible mode allowing theme overrides on top of base themes

```typescript
// Option 1: Strict mode (design system consistency)
import { FilterSort } from '@yourorg/filter-service';

const filterConfig = {
  id: 'product-filters',
  theme: {
    name: 'gi',           // Only 'gi' | 'mmt' allowed
    platform: 'native'
  },
  filters: [...],
  sort: {...}
};

// Option 2: Flexible mode (custom branding)
import { FilterSortCustomizable } from '@yourorg/filter-service';

const customConfig = {
  id: 'product-filters',
  theme: {
    name: 'gi',           // TODO_VS: should this be required?
    platform: 'native',
    customOverrides: {
      colors: {
        selectedBackground: '#ff6b35',
        countBadge: '#2c3e50'
      }
    }
  },
  filters: [...],
  sort: {...}
};
```

### Theme Token Structure

```typescript
//TODO_VS: verify this as per the figma design
interface FilterSortThemeTokens {
  colors: { 
    filterBackground: string; 
    selectedBackground: string; 
    countBadge: string;
    borderColor: string;
  };
  spacing: { 
    filterPadding: string; 
    optionSpacing: string;
    containerMargin: string;
  };
  typography: { 
    filterLabel: string; 
    optionText: string;
    countText: string;
  };
  borderRadius: { 
    filter: string; 
    option: string; 
  };
}
```

## Integration Pattern

### Consumer Implementation (Split Props)

```typescript
const ConsumerComponent = () => {
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [title, setTitle] = useState('');
  const [footerData, setFooterData] = useState<FooterConfig>({});

  const handleReset = () => {
    setFilters(initialFilters);
    setFooterData(prev => ({
      ...prev,
      apply: { ...prev.apply, label: 'Apply Filters' }
    }));
  };

  const updateApplyLabel = (count: number) => {
    setFooterData(prev => ({
      ...prev,
      apply: { ...prev.apply, label: `View ${count} products` }
    }));
  };

  return (
    <FilterSort
      id="product-filters"
      title={title}                    
      filters={filters}                
      footerData={footerData}          
      theme={theme}                    
      onFilterChange={handleFilterChange}
      onApply={handleApply}
      onReset={handleReset}
    />
  );
};
```

## Testing & Error Handling

#### Error Handling

- Valibot validation
  - [ ] theme should be gi or mmt
  - [ ] config should match the contract otherwise log error in console
  - [ ] filterConfig should contain mandatory fields otherwise don't render the filter in sidebar

#### Test Coverage

- **Unit Tests**: Component rendering, filter selection, contract generation
- **Integration Tests**: Callback flows, count updates, apply/reset functionality  
- **Performance Tests**: React profiler

#### Grooming

- [ ] How to update counts in an optimized way avoiding unnecessary renders. How consumer will manage split props? zustand approach
- [ ] How to show toast from consumer
- [ ] How to handle the case where consumer doesn't have count system altogether
- [ ] Keeping responsibility of background screen to lob itself. What issues can arise? (gorhom bottomsheet etc.)

### Tech Stack

- Valibot
- Style dictionary

-----------------

Development:

**Contract discussion**

- [ ] `Clear selection` data in input contract and also need a callback for this cta
- [ ] Handling loading states from parent (mytra calling api only for particular filters)

**Todo**

- [ ] Contract changes
  - [ ] Add footer and header configs
  - [ ] Think if any changes required if we want to support date, slider, time filters
  - [ ] Think in terms of BE controlled UI (component order, all texts from BE) if any such changes are required
  - [ ] FilterConfig should also have default selected filter value
- [ ] Dev
  - [ ] Opacity for disabled states
  - [ ] Grouping filters by category
- [ ] Check TODO_VS in above doc
- [x] On filter select, how to send data to package from consumer
  - Use normal updation with full prop change along with simple memoization in component to avoid change in non affected nodes
- [x] How to show popups (do we need to provide support for consumer to trigger them)
  - Expose toast helpers from the library
- [ ] How design can break
  - [x] Filter option text greater than available space - move to next line center
  - [x] Sidebar item text greater than available space - move to next line
- [ ] Let of state updates will be required in this package. Is there any particular lib we can use for this.
- [ ] Responsive designs
- [ ] Which testing library to use?
- [ ] It will be responsibility of lob to add filter in a bottomsheet or any UI they want
  - [ ] Gorhom bottomsheet might give issues
- [ ] **How to do Analytics? Analytics will be responsibility of lob**
- [ ] Learnings
  - [ ] What is metro-react-native-babel-preset?
- [ ] How to add aliases in npm package avoiding conflicts with root?
  - [x] Compile package in local and use it rather than direct code in root
  - [ ] **How to do above**

**Test cases**

- [ ] Render in various containers (bottomsheet, modal, full screen)
