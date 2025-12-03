import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FilterConfig } from '../schemas';
import { parse } from 'valibot';
import { colors, typography, spacing, layout } from '../styles/tokens';

interface SidebarProps {
  filters: FilterConfig[];
  filterClick: (filterId: string) => void;
  selectedFilterId: string;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, filterClick, selectedFilterId }) => {
  //TODO_VS: test if this is working
  const filtersToShow = filters?.filter((filter) => parse(FilterConfig, filter));

  const renderFilter = ({ item, index }: { item: FilterConfig; index: number }) => (
    <TouchableOpacity
      style={[
        styles.filterItem, 
        item.id === selectedFilterId && styles.filterItemSelected,
        index === filtersToShow.length - 1 && styles.lastItem
      ]}
      onPress={() => filterClick(item.id)}
    >
      {item.id === selectedFilterId && (
        <View style={styles.leftBorderIndicator} />
      )}
      <Text
        style={[
          styles.filterText,
          item.id === selectedFilterId && {
            color: colors.interactive.primary,
          },
        ]}
      >
        {item.label}
      </Text>
      {item.isApplied && <View style={styles.redDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtersToShow}
        renderItem={renderFilter}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      />
    </View>
  );
};

const styles = {
  container: {
    width: layout.width.leftSection,
    backgroundColor: colors.background.secondary,
    borderRightWidth: 1,
    borderRightColor: colors.border.primary,
  },
  scrollView: {
    flex: 1,
		width: layout.width.leftSection,
    backgroundColor: colors.background.secondary,
    borderRightWidth: 1,
    borderRightColor: colors.border.primary,
  },
  filterItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.secondary,
    position: 'relative' as const,
  },
	filterItemSelected: {
		backgroundColor: colors.background.primary,
	},
  filterText: {
    fontSize: typography.fontSize.sm,
		lineHeight: 40,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  redDot: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
	leftBorderIndicator: {
		position: 'absolute' as const,
		left: 0,
		top: 7,
		bottom: 7,
		width: 3,
		backgroundColor: colors.interactive.primary,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	lastItem: {
		borderBottomWidth: 0,
	},
};

export default Sidebar;
