import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { FilterConfig } from '../schemas';
import { colors, typography, spacing } from '../styles/tokens';

interface SearchBoxProps {
  filter: FilterConfig;
  onSearchChange: (query: string) => void;
  searchQuery?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  filter,
  onSearchChange,
  searchQuery = '',
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchChange = (text: string) => {
    setLocalSearchQuery(text);
    onSearchChange(text);
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    onSearchChange('');
  };

  if (!filter?.showSearch) {
    return null;
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        {/* <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}></Text>
        </View> */}
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${filter.label}`}
          placeholderTextColor={colors.text.secondary}
          value={localSearchQuery}
          onChangeText={handleSearchChange}
        />
        {localSearchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  searchContainer: {
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.border.divider,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchIconText: {
    fontSize: typography.fontSize.sm,
    color: colors.interactive.primary,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: spacing.sm,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: 'bold',
  },
} as const;

export default SearchBox;
