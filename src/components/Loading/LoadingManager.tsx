import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

interface LoadingManagerProps {
  children: React.ReactNode;
  minDisplayTime?: number;
  showOnAppLaunch?: boolean;
}

const LoadingManager: React.FC<LoadingManagerProps> = ({
  children,
  minDisplayTime = 1500,
  showOnAppLaunch = true,
}) => {
  const [isLoading, setIsLoading] = useState(showOnAppLaunch);
  const [showLoading, setShowLoading] = useState(showOnAppLaunch);
  const animationTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      if (!showOnAppLaunch) {
        setIsLoading(false);
        setShowLoading(false);
        return;
      }

      try {
        const hasLaunched = await AsyncStorage.getItem('@app_has_launched');

        if (!hasLaunched) {
          // First launch
          await AsyncStorage.setItem('@app_has_launched', 'true');
          // Show loading for minimum time
          animationTimeoutRef.current = setTimeout(() => {
            setIsLoading(false);
          }, minDisplayTime);
        } else {
          // Subsequent launches - shorter loading
          const shortDuration = Math.min(minDisplayTime, 800);
          animationTimeoutRef.current = setTimeout(() => {
            setIsLoading(false);
          }, shortDuration);
        }
      } catch (error) {
        console.error('Error checking app launch:', error);
        // Fallback: hide loading after min time
        animationTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, minDisplayTime);
      }
    };

    checkFirstLaunch();

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [minDisplayTime, showOnAppLaunch]);

  const handleAnimationComplete = () => {
    setShowLoading(false);
  };

  return (
    <View style={styles.container}>
      {children}

      {showLoading && (
        <LoadingScreen
          onAnimationComplete={handleAnimationComplete}
          duration={isLoading ? minDisplayTime : 1000}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoadingManager;