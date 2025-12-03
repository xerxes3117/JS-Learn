import { FilterConfig } from '../schemas';
import { FILTER_TYPES } from './const';

export const generateClearedData = (filter: FilterConfig) : FilterConfig => {
  if (filter.type === FILTER_TYPES.SLIDER) {
    return { ...filter, data: { ...filter.data } };
  }
  else {
    return {
      ...filter,
      data: Array.isArray(filter.data)
        ? filter.data.map((option) => ({ ...option, isApplied: false }))
        : filter.data,
    };
  }
};
