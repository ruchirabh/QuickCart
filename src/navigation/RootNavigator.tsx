import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from './types';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
// Import other screens as you create them
// import ProductDetailsScreen from '../screens/ProductDetailsScreen';
// import SearchScreen from '../screens/SearchScreen';
// import CartScreen from '../screens/CartScreen';
// import ProfileScreen from '../screens/ProfileScreen';

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
        {/* Add more stack screens here */}
        {/* <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} /> */}
        {/* <Stack.Screen name="Search" component={SearchScreen} /> */}
        {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};