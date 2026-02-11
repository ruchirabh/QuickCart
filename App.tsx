import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { LoadingProvider } from './src/contexts/LoadingContext';
import LoadingManager from './src/components/Loading/LoadingManager';
import HomeScreen from './src/screens/HomeScreen';

// Define your navigation types
export type RootStackParamList = {
  Home: undefined;
  // Add more screens here as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  return (
    <LoadingManager minDisplayTime={2000} showOnAppLaunch={true}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoadingManager>
  );
}

function App() {
  const [isReduxReady, setIsReduxReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      // Simulate async setup
      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 500);
      });

      setIsReduxReady(true);
    };

    initialize();
  }, []);

  if (!isReduxReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
