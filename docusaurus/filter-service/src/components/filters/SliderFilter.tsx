import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Range, FilterUpdate } from '../../schemas';
import { FILTER_TYPES } from '../../utils/const';

interface SliderFilterProps {
  id: string;
  data: Range;
  onFilterChange?: (update: FilterUpdate) => void;
}

const SliderFilter: React.FC<SliderFilterProps> = ({ id, data, onFilterChange }) => {
  const [currentRange, setCurrentRange] = useState<Range>(data);

  const handleSliderChange = (value: number) => {
    const updatedRange = { ...currentRange, max: value };
    setCurrentRange(updatedRange);

    onFilterChange?.({
      id,
      type: FILTER_TYPES.SLIDER,
      data: updatedRange,
    });
  };

  return (
    <View testID="slider-filter" style={styles.container}>
      <Text style={styles.label}>
        {`Range: ${currentRange.min} - ${currentRange.max}`}
      </Text>
      {/* TODO: Replace with proper Slider component from @react-native-community/slider */}
      <Text style={styles.placeholder}>
        Slider Component (needs @react-native-community/slider)
      </Text>
    </View>
  );
};

const styles = {
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic' as const,
  },
};

export default SliderFilter;
