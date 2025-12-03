import React, { useEffect } from 'react';
import { View } from 'react-native';
import { parse } from 'valibot';
import { FilterSortProps, FilterSortConfig, FilterUpdate } from '../schemas';
import { setGlobalTheme } from '../styles/theme';
import { colors, borderRadius, layout } from '../styles/tokens';
import Header from './header';
import Footer from './footer';
import Main from './main';
import { useConfig } from '../hooks/useConfig';
import { DEFAULT_TITLE } from '../utils/const';

const FilterSort: React.FC<FilterSortProps> = ({
  config,
  onFilterChange,
  onApply,
  onReset,
  isLoading,
}) => {
  try {
    parse(FilterSortConfig, config);
    setGlobalTheme(config?.theme?.name);
  } catch (error) {
    console.error('Invalid filter config:', error);
    return null;
  }

  const { currentFilters, setCurrentFilters, updateCurrentFilters, clearAllFilters, clearFilter, isDefaultFilters } =
    useConfig(config?.filters || [], onFilterChange);

  useEffect(() => {
    setCurrentFilters(config?.filters || []);
  }, [config?.filters]);

  const handleFilterChange = (update: FilterUpdate) => {
    updateCurrentFilters(update);
  };

  const handleApply = () => {
    const appliedFilters: { [key: string]: string | string[] } = {};

    currentFilters.forEach((filter) => {
      if (Array.isArray(filter.data)) {
        const appliedOptions = filter.data.filter((option) => option.isApplied);
        if (appliedOptions.length > 0) {
          if (filter.type === 'radio') {
            appliedFilters[filter.id] = appliedOptions[0]?.value || '';
          } else {
            appliedFilters[filter.id] = appliedOptions.map((option) => option.value);
          }
        }
      } else if (filter.type === 'slider') {
        appliedFilters[filter.id] = `${filter.data.min}-${filter.data.max}`;
      }
    });

    onApply?.({ filters: appliedFilters });
  };

  const handleReset = () => {
    onReset?.();
    clearAllFilters();
  };

  return (
    <View style={styles.container}>
      {/* TODO_VS: This header and main should be sticky to top (already working, test it) */}
      <Header
        title={config.title || DEFAULT_TITLE}
        showCrossIcon={true}
        onCrossIconPress={() => {}}
      />
      <Main
        filters={currentFilters}
        onFilterChange={handleFilterChange}
        clearFilter={clearFilter}
        defaultSelectedFilterId={config.defaultSelectedFilterId || currentFilters?.[0]?.id}
      />
      {/* TODO_VS: This footer should stick to the bottom of the screen */}
      <Footer
        onReset={handleReset}
        onApply={handleApply}
        footerData={config.footerData}
        isLoading={isLoading}
				isDefaultFilters={isDefaultFilters}
      />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    minHeight: layout.container.minHeight,
    maxHeight: layout.container.maxHeight,
  },
};

export default FilterSort;
