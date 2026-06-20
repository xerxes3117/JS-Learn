import React, {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  NativeModules,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type AndroidAdjustMode = 'default' | 'resize' | 'pan' | 'nothing';

const SoftInputModeNative = NativeModules.SoftInputMode as
  | {setAdjustMode: (mode: AndroidAdjustMode) => void}
  | undefined;

function applyAndroidSoftInputMode(mode: AndroidAdjustMode) {
  if (Platform.OS === 'android' && SoftInputModeNative?.setAdjustMode) {
    SoftInputModeNative.setAdjustMode(mode);
  }
}

const TABS: {mode: AndroidAdjustMode; label: string; hint: string}[] = [
  {
    mode: 'default',
    label: 'Default',
    hint: 'Default (ADJUST_UNSPECIFIED): OS chooses resize vs pan.',
  },
  {
    mode: 'resize',
    label: 'Resize',
    hint: 'adjustResize: layout shrinks above the IME.',
  },
  {
    mode: 'pan',
    label: 'Pan',
    hint: 'adjustPan: window pans to keep focus above the keyboard.',
  },
  {
    mode: 'nothing',
    label: 'Nothing',
    hint: 'adjustNothing: no resize/pan — IME can cover fields.',
  },
];

export function KeyboardBehavioursScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [activeMode, setActiveMode] = useState<AndroidAdjustMode>('default');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    applyAndroidSoftInputMode(activeMode);
  }, [activeMode]);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, event => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const applyModeForFocus = useCallback(() => {
    applyAndroidSoftInputMode(activeMode);
  }, [activeMode]);

  const activeHint =
    TABS.find(t => t.mode === activeMode)?.hint ?? '';

  const rootBottomInset = Math.max(insets.bottom, 12);
  const resizeKeyboardInset =
    Platform.OS === 'android' && activeMode === 'resize' && keyboardHeight > 0
      ? keyboardHeight
      : 0;

  return (
    <View style={[styles.root, {paddingBottom: rootBottomInset}]}>
      <Text style={styles.screenTitle}>Keyboard behaviours</Text>
      {Platform.OS !== 'android' ? (
        <Text style={styles.platformNote}>
          Soft-input modes apply on Android only; tabs still switch the demo layout.
        </Text>
      ) : null}

      <View style={styles.tabRow}>
        {TABS.map(({mode, label}) => {
          const selected = activeMode === mode;
          return (
            <Pressable
              key={mode}
              style={[styles.tab, selected && styles.tabSelected]}
              onPress={() => setActiveMode(mode)}>
              <Text
                style={[styles.tabLabel, selected && styles.tabLabelSelected]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.modeHint}>{activeHint}</Text>

      <View style={[styles.panel, {paddingBottom: resizeKeyboardInset}]}>
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Top</Text>
          <TextInput
            style={styles.input}
            placeholder="Focus top — watch IME vs layout"
            placeholderTextColor="#888"
            onFocus={applyModeForFocus}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Middle</Text>
          <TextInput
            style={styles.input}
            placeholder="Focus middle"
            placeholderTextColor="#888"
            onFocus={applyModeForFocus}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Bottom</Text>
          <TextInput
            style={styles.input}
            placeholder="Focus bottom — often covered first with adjustNothing"
            placeholderTextColor="#888"
            onFocus={applyModeForFocus}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  platformNote: {
    fontSize: 12,
    opacity: 0.72,
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  tabSelected: {
    backgroundColor: '#007aff',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  tabLabelSelected: {
    color: '#fff',
  },
  modeHint: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.75,
    marginBottom: 12,
  },
  panel: {
    flex: 1,
    minHeight: 0,
    justifyContent: 'space-between',
  },
  fieldBlock: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    opacity: 0.75,
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
