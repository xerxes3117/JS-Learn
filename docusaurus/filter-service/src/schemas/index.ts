import {
  object,
  string,
  number,
  boolean,
  array,
  optional,
  union,
  record,
  literal,
  InferInput,
	function as func,
} from 'valibot';
import { FILTER_TYPES } from '../utils/const';

// Filter Option Schema
const FilterOption = object({
  id: string(),
  label: string(),
  value: string(),
  disabled: optional(boolean()),
  count: optional(number()),
  isApplied: optional(boolean()),
});

// Range
const Range = object({
  min: number(),
  max: number(),
});

// Filter Config
export const FilterConfig = object({
  id: string(),
  type: union([literal('radio'), literal('checkbox'), literal('slider')]),
  label: string(),
  isSelected: optional(boolean()),
  isApplied: optional(boolean()),
  showClear: optional(boolean()),
  showSearch: optional(boolean()),
  data: union([array(FilterOption), Range]),
});

// Theme Config
const ThemeConfig = object({
  name: union([literal('gi'), literal('mmt')]),
  customOverrides: optional(object({})),
});

// Footer Config
const FooterConfig = object({
	reset: optional(object({
		label: optional(string()),
		show: optional(boolean()),
	})),
	apply: optional(object({
		label: optional(string()),
		show: optional(boolean()),
	})),
});

// Header Config
const HeaderConfig = object({
	title: optional(string()),
	showCrossIcon: optional(boolean()),
});

// Filter Update
const FilterUpdate = object({
	id: string(),
	type: optional(union([
		literal(FILTER_TYPES.RADIO),
		literal(FILTER_TYPES.CHECKBOX),
		literal(FILTER_TYPES.SLIDER),
	])),
	data: union([array(FilterOption), Range]),
	isApplied: boolean(),
});

// Filter Sort Contract
const FilterSortContract = object({
	filters: record(string(), union([string(), array(string()), Range])),
});

// Filter Sort Config  (Root config)
export const FilterSortConfig = object({
  title: optional(string()),
  filters: array(FilterConfig),
	theme: ThemeConfig,
	platform: union([literal('web'), literal('native')]),
	footerData: FooterConfig,
	defaultSelectedFilterId: optional(string()),
});

// Inferred Types
export type FilterOption = InferInput<typeof FilterOption>;
export type Range = InferInput<typeof Range>;
export type FilterConfig = InferInput<typeof FilterConfig>;
export type FilterSortConfig = InferInput<typeof FilterSortConfig>;
export type FilterSortContract = InferInput<typeof FilterSortContract>;
export type FilterUpdate = InferInput<typeof FilterUpdate>;
export type FooterConfig = InferInput<typeof FooterConfig>;

// Component Props interfaces
export interface FilterSortProps {
  config: FilterSortConfig;
  onFilterChange?: (filters: FilterConfig[]) => void;
  onApply?: (contract: FilterSortContract) => void;
  onReset?: () => void;
	isLoading: boolean;
}

export interface HeaderProps {
  title: string;
  showCrossIcon?: boolean;
  onCrossIconPress?: () => void;
}
