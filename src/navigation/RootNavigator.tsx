import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { useAppTheme } from '../contexts/ThemeContext';
import { RootStackParamList, BottomTabParamList } from './types';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
// Import other screens as you create them
// import ProductDetailsScreen from '../screens/ProductDetailsScreen';
// import SearchScreen from '../screens/SearchScreen';
// import CartScreen from '../screens/CartScreen';
// import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { theme, isDark } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: isDark ? '#888' : '#999',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'SearchTab':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'CartTab':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={HomeScreen} // Replace with SearchScreen
        options={{ title: 'Search' }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={HomeScreen} // Replace with CartScreen
        options={{ title: 'Cart' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={HomeScreen} // Replace with ProfileScreen
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

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
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        {/* Add more stack screens here */}
        {/* <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};