import { useState, useCallback, useMemo } from 'react';
import { FilterConfig, FilterUpdate } from '../schemas';
import { generateClearedData } from '../utils/helpers';

export const useConfig = (
  filters: FilterConfig[],
  onFilterChange?: (filters: FilterConfig[]) => void,
) => {
  const [currentFilters, setCurrentFilters] = useState<FilterConfig[]>(filters);

  const isDefaultFilters = useMemo(() => {
    return currentFilters.every(filter => !filter.isApplied);
  }, [currentFilters]);

	/**
	 * This function is used to update the current filters.
	 */
  const updateCurrentFilters = useCallback((update: FilterUpdate) => {
    setCurrentFilters(prevFilters => {
      const updatedFilters = prevFilters.map((filter) =>
        filter.id === update.id
          ? { ...filter, data: update.data, isApplied: update.isApplied }
          : filter,
      );
      onFilterChange?.(updatedFilters);
      return updatedFilters;
    });
  }, [onFilterChange]);

	/**
	 * This function is used to clear a filter by id.
	 */
  const clearFilter = useCallback((id: string) => {
    const filterToClear = currentFilters.find((filter) => filter.id === id);
    if (!filterToClear) {
      return;
    }

    const clearedFilter = generateClearedData(filterToClear);
    updateCurrentFilters({ id, data: clearedFilter.data, isApplied: false });
  }, [currentFilters, updateCurrentFilters]);

	/**
	 * This function is used to clear all filters.
	 */
  const clearAllFilters = useCallback(() => {
    setCurrentFilters(prevFilters => {
      const clearedFilters = prevFilters.map((filter) => {
        const clearedFilter = generateClearedData(filter);
        return { ...clearedFilter, isApplied: false };
      });
      onFilterChange?.(clearedFilters);
      return clearedFilters;
    });
  }, [onFilterChange]);

  return {
    currentFilters,
    setCurrentFilters,
    updateCurrentFilters,
    clearAllFilters,
    clearFilter,
    isDefaultFilters,
  };
};
