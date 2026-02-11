import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { styles } from '../../styles/LoadingScreen/LoadingScreen.styles';
import { Svg, Circle, Path } from 'react-native-svg';

interface LoadingScreenProps {
  onAnimationComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onAnimationComplete,
  duration = 1800,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Scale animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 80,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Pulse animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Dot animations
    const createDotAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
    };

    const dot1 = createDotAnimation(dot1Anim, 0);
    const dot2 = createDotAnimation(dot2Anim, 200);
    const dot3 = createDotAnimation(dot3Anim, 400);

    dot1.start();
    dot2.start();
    dot3.start();

    // Exit animation
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        onAnimationComplete?.();
      });
    }, duration);

    return () => {
      dot1.stop();
      dot2.stop();
      dot3.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Background gradient circles */}
      <View style={styles.backgroundContainer}>
        <Animated.View
          style={[
            styles.backgroundCircle1,
            {
              transform: [
                {
                  scale: pulseAnim.interpolate({
                    inputRange: [1, 1.1],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundCircle2,
            {
              transform: [
                {
                  scale: pulseAnim.interpolate({
                    inputRange: [1, 1.1],
                    outputRange: [1, 1.3],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo */}
        <Animated.View
          style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}
        >
          <Svg width="90" height="90" viewBox="0 0 90 90">
            {/* Outer circle - Blue */}
            <Circle cx="45" cy="45" r="40" fill="#0F2792" />

            {/* Inner circle - Yellow */}
            <Circle cx="45" cy="45" r="30" fill="#FFB800" />

            {/* Book/Education icon - White */}
            <Path
              d="M35 35 L55 35 L55 55 L45 50 L35 55 Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />

            {/* Small accent - White */}
            <Circle cx="45" cy="40" r="3" fill="white" />
          </Svg>
        </Animated.View>

        {/* App name */}
        <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
          QuickCart
        </Animated.Text>

        {/* Loading dots */}
        <View style={styles.dotsContainer}>
          <Animated.View
            style={[
              styles.dot,
              styles.dotBlue,
              {
                opacity: dot1Anim,
                transform: [
                  {
                    translateY: dot1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              styles.dotYellow,
              {
                opacity: dot2Anim,
                transform: [
                  {
                    translateY: dot2Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              styles.dotBlue,
              {
                opacity: dot3Anim,
                transform: [
                  {
                    translateY: dot3Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        {/* Loading text */}
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          Loading...
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default LoadingScreen;
