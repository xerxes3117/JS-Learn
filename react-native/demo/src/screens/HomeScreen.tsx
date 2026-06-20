import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {learningSections} from '../../../src/sections/registry';
import type {RootDrawerParamList} from '../navigation/types';

type Props = DrawerScreenProps<RootDrawerParamList, 'Home'>;

export function HomeScreen({navigation}: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Learning sections</Text>
      <Text style={styles.subtitle}>Pick a topic to open its demo screen.</Text>
      <FlatList
        data={learningSections}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <Pressable
            style={({pressed}) => [styles.row, pressed && styles.rowPressed]}
            onPress={() => navigation.navigate(item.id)}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowChevron}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.72,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  rowChevron: {
    fontSize: 22,
    opacity: 0.45,
    marginLeft: 8,
  },
});
