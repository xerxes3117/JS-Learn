import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getCurrentTheme, SimpleTheme } from '../styles/theme';
import { colors, typography, spacing, borderRadius, layout } from '../styles/tokens';
import { FooterConfig } from '../schemas';

interface FooterProps {
  onReset: () => void;
  onApply: () => void;
	footerData: FooterConfig;
	isLoading: boolean;
	isDefaultFilters: boolean;
}

const getStyles = (theme: SimpleTheme) => ({
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
  resetButton: {
    paddingVertical: spacing.md,
		width: layout.width.leftSection - spacing.lg, //TODO_VS: use flex ratio instead of fixed width for both this and sidebar
  },
  resetButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.interactive.primary,
    textAlign: 'center' as const,
  },
  applyButton: {
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.md,
    backgroundColor: theme.applyButtonColor,
    borderRadius: borderRadius.md,
		flexDirection: 'row',
    flex: 1,
    marginLeft: spacing.md,
  },
  applyButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.inverse,
    textAlign: 'center' as const,
		flex: 1,
  },
});

const Footer: React.FC<FooterProps> = ({ onReset, onApply, footerData, isLoading, isDefaultFilters }) => {
	const theme = getCurrentTheme();
	const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resetButton} onPress={!isDefaultFilters ? onReset : undefined}>
        <Text style={[styles.resetButtonText, isDefaultFilters && { color: colors.text.disabled }]}>{footerData?.reset?.label}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyButton} onPress={onApply}>
        <Text style={styles.applyButtonText}>{footerData?.apply?.label}</Text>
				{isLoading && <ActivityIndicator size="small" color={colors.text.inverse} />}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
