import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

export function LearningDrawerContent(
  props: DrawerContentComponentProps,
): React.JSX.Element {
  const {navigation} = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <Text style={styles.headerHint}>
          Sections are listed on the home screen.
        </Text>
      </View>
      <Pressable
        style={({pressed}) => [styles.row, pressed && styles.rowPressed]}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.rowLabel}>Home</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerHint: {
    fontSize: 13,
    opacity: 0.65,
    marginTop: 6,
    lineHeight: 18,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowLabel: {
    fontSize: 16,
  },
});
