import React from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {learningSections} from '../../../src/sections/registry';
import {HomeScreen} from '../screens/HomeScreen';
import {LearningDrawerContent} from './LearningDrawerContent';
import type {RootDrawerParamList} from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function AppDrawer(): React.JSX.Element {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        drawerContent={props => <LearningDrawerContent {...props} />}
        initialRouteName="Home"
        screenOptions={{
          headerTitle: 'Learning',
          drawerPosition: 'left',
          drawerType: 'front',
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        {learningSections.map(section => (
          <Drawer.Screen
            key={section.id}
            name={section.id}
            component={section.component}
            options={{title: section.title}}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
