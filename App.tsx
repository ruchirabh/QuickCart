import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { store, persistor } from './src/store';
import { LoadingProvider } from './src/contexts/LoadingContext';
import { ThemeProvider, useAppTheme } from './src/contexts/ThemeContext';
import LoadingManager from './src/components/Loading/LoadingManager';
import { RootNavigator } from './src/navigation/RootNavigator';

function AppContent() {
  const { isDark } = useAppTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <LoadingManager minDisplayTime={2000} showOnAppLaunch={true}>
        <RootNavigator />
      </LoadingManager>
      <FlashMessage
        position="top"
        floating={true}
        statusBarHeight={StatusBar.currentHeight || 40} // Adjust this value
        style={{
          marginTop: 10, // Additional margin
        }}
        titleStyle={{
          fontSize: 14,
          fontWeight: '600',
        }}
        textStyle={{
          fontSize: 12,
        }}
      />
    </>
  );
}

function App() {
  const [isReduxReady, setIsReduxReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
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
        <ThemeProvider>
          <LoadingProvider>
            <AppContent />
          </LoadingProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
