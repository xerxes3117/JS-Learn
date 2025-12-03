import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderProps } from '../schemas';
import { colors, typography, spacing, borderRadius, layout } from '../styles/tokens';

const Header: React.FC<HeaderProps> = ({ title, showCrossIcon, onCrossIconPress }) => {
  return (
    <View style={styles.container}>
      {showCrossIcon && (
        <TouchableOpacity style={styles.closeButton} onPress={onCrossIconPress}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>
        {title}
      </Text>
      <View style={{ width: 34 }} />
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    minHeight: layout.height.header,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
		marginLeft: spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  closeButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.secondary,
  },
};

export default Header;
