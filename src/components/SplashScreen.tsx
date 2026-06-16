import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import VSSLogo from './VSSLogo';
import { COLORS } from '../config';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const progressWidth = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  
  // Loading dots
  const dot1Scale = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot3Scale = useSharedValue(1);

  useEffect(() => {
    // Progress bar animation
    progressWidth.value = withTiming(width * 0.5, { duration: 2500, easing: Easing.out(Easing.ease) });
    
    // Loading dots
    dot1Scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1
    );
    dot2Scale.value = withDelay(200, withRepeat(
      withSequence(
        withTiming(1.5, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1
    ));
    dot3Scale.value = withDelay(400, withRepeat(
      withSequence(
        withTiming(1.5, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1
    ));

    // Exit animation after 3 seconds
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 });
      scale.value = withTiming(1.1, { duration: 500 }, () => {
        runOnJS(onFinish)();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
  }));

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
  }));
  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
  }));
  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Background circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Logo */}
      <VSSLogo size="xl" animate={true} />

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        مرورگر اختصاصی{' '}
        <Text style={{ color: COLORS.brandRed, fontStyle: 'italic' }}>v</Text>
        <Text style={{ color: COLORS.brandBlue, fontStyle: 'italic' }}>ss</Text>
      </Text>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>

      {/* Loading dots */}
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, { backgroundColor: COLORS.brandRed }, dot1Style]} />
        <Animated.View style={[styles.dot, { backgroundColor: COLORS.brandBlue }, dot2Style]} />
        <Animated.View style={[styles.dot, { backgroundColor: COLORS.brandBlue }, dot3Style]} />
      </View>

      {/* Version */}
      <View style={styles.footer}>
        <Text style={styles.version}>نسخه ۱.۰</Text>
        <Text style={styles.appName}>vss Browser App</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.darker,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  bgCircle1: {
    position: 'absolute',
    top: '20%',
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(220,38,38,0.1)',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: '20%',
    left: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(37,99,235,0.1)',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'System',
  },
  progressContainer: {
    width: width * 0.5,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: COLORS.brandBlue,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  version: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    marginBottom: 4,
  },
  appName: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
    fontStyle: 'italic',
  },
});
