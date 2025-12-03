import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FilterOption, FilterUpdate } from '../../schemas';
import { colors, typography, spacing, layout, semantic } from '../../styles/tokens';
import { FILTER_TYPES } from '../../utils/const';

interface RadioFilterProps {
  id: string;
  data: FilterOption[];
  searchQuery?: string;
  onFilterChange?: (update: FilterUpdate) => void;
}

const RadioFilter: React.FC<RadioFilterProps> = ({ id, data, searchQuery, onFilterChange }) => {
  const [currentOptions, setCurrentOptions] = useState<FilterOption[]>(data);

  useEffect(() => {
    setCurrentOptions(data);
  }, [data]);

  const filteredOptions = useMemo(() => {
    return currentOptions?.filter((option) =>
      option.label.toLowerCase().includes(searchQuery?.toLowerCase() || '')
    ) || [];
  }, [currentOptions, searchQuery]);

  const handlePress = (value: string, disabled?: boolean) => {
    if (!disabled) {
      const updatedOptions = currentOptions.map((option) => ({
        ...option,
        isApplied: option.value === value,
      }));

      setCurrentOptions(updatedOptions);

      onFilterChange?.({
        id,
        type: FILTER_TYPES.RADIO,
        data: updatedOptions,
				isApplied: updatedOptions.some((option) => option.isApplied),
      });
    }
  };

  const renderOption = ({ item }: { item: FilterOption }) => {
    const { value, label, count, isApplied, disabled } = item;
    const isSelected = isApplied || false;
    const isDisabled = disabled || false;

    return (
      <TouchableOpacity
        style={[styles.optionContainer, isDisabled && { opacity: 0.5 }]}
        onPress={() => handlePress(value, isDisabled)}
        disabled={isDisabled}
      >
        <View
          style={styles.radioButton}
        >
          {isSelected && (
            <View
              style={styles.radioInner}
            />
          )}
        </View>
        <Text style={styles.optionText}>
          {label}
        </Text>
        {count !== undefined && (
          <Text style={styles.countText}>
            {count}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View testID="radio-filter" style={styles.container}>
      <FlatList
        data={filteredOptions}
        renderItem={renderOption}
        keyExtractor={(item) => item.value}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = {
  container: {
    paddingVertical: spacing.sm,
  },
  optionContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  radioButton: {
    width: layout.width.radioButton,
    height: layout.width.radioButton,
    borderRadius: layout.width.radioButton / 2,
    borderWidth: semantic.radioButton.borderWidth,
    borderColor: colors.text.mediumEmphasis,
    marginRight: spacing.md,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  radioInner: {
    width: layout.width.radioButton * 0.6,
    height: layout.width.radioButton * 0.6,
    borderRadius: layout.width.radioButton * 0.5,
    backgroundColor: colors.interactive.primary,
  },
  optionText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.mediumEmphasis,
    flex: 1,
    marginRight: spacing.sm,
  },
  countText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.mediumEmphasis,
    fontWeight: typography.fontWeight.medium,
  },
  disabled: {
    color: colors.text.disabled,
  },
};

export default RadioFilter;
