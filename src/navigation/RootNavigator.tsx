import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from './types';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen/InfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { theme } = useAppTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Info' component={InfoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};