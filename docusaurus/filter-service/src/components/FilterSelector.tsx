import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FilterConfig, FilterUpdate } from '../schemas';
import { RadioFilter, CheckboxFilter, SliderFilter } from './filters';
import { colors, typography, spacing } from '../styles/tokens';
import SearchBox from './SearchBox';
import { FILTER_TYPES } from '../utils/const';

interface FilterOptionsProps {
  filters: FilterConfig[];
  filterId: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterChange?: (update: FilterUpdate) => void;
  clearFilter: (id: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filters,
  filterId,
  onFilterChange,
  clearFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
	console.log('>>>received filters in filter selector', filters);
  const filter = useMemo(() => {
    return filters.find((filter) => filter.id === filterId) || filters[0];
  }, [filters, filterId]);

  const FILTER_COMPONENTS = {
    [FILTER_TYPES.RADIO]: RadioFilter,
    [FILTER_TYPES.CHECKBOX]: CheckboxFilter,
    [FILTER_TYPES.SLIDER]: SliderFilter,
  };

  const renderFilterBasedonType = useCallback(
    (query: string) => {
      const baseProps = {
        key: filter.id,
        id: filter.id,
        searchQuery: query || '',
        onFilterChange,
        data: filter.data,
      };

      const FilterComponent = FILTER_COMPONENTS[filter.type];
      return FilterComponent ? <FilterComponent {...baseProps} /> : null;
    },
    [filter, onFilterChange],
  );

  return (
    <View style={styles.container}>
      <SearchBox filter={filter} onSearchChange={setSearchQuery} searchQuery={searchQuery} />

      <View style={styles.header}>
        <Text style={styles.headerText}>{filter.label}</Text>
        {filter?.showClear && (
          <TouchableOpacity onPress={() => clearFilter(filter?.id)}>
            <Text style={styles.clearSelectionText}>Clear selection</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>{renderFilterBasedonType(searchQuery)}</View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.caution,
    paddingHorizontal: spacing.lg,
  },
  headerText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.mediumEmphasis,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  clearSelectionText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.interactive.primary,
  },
};

export default FilterOptions;
