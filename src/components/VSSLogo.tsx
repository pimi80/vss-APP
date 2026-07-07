import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { COLORS } from '../config';

interface VSSLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 56,
  xl: 80,
};

export default function VSSLogo({ size = 'md', animate = true }: VSSLogoProps) {
  const fontSize = sizeMap[size];
  
  const scaleV = useSharedValue(0);
  const scaleS1 = useSharedValue(0);
  const scaleS2 = useSharedValue(0);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (animate) {
      scaleV.value = withSpring(1, { damping: 12, stiffness: 200 });
      scaleS1.value = withDelay(150, withSpring(1, { damping: 12, stiffness: 200 }));
      scaleS2.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 200 }));
      
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1000 }),
          withTiming(0.4, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      scaleV.value = 1;
      scaleS1.value = 1;
      scaleS2.value = 1;
    }
  }, [animate]);

  const animatedV = useAnimatedStyle(() => ({
    transform: [{ scale: scaleV.value }],
    opacity: scaleV.value,
  }));

  const animatedS1 = useAnimatedStyle(() => ({
    transform: [{ scale: scaleS1.value }],
    opacity: scaleS1.value,
  }));

  const animatedS2 = useAnimatedStyle(() => ({
    transform: [{ scale: scaleS2.value }],
    opacity: scaleS2.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.letter,
          { fontSize, color: COLORS.brandRed },
          animatedV,
        ]}
      >
        v
      </Animated.Text>
      <Animated.Text
        style={[
          styles.letter,
          { fontSize, color: COLORS.brandBlue },
          animatedS1,
        ]}
      >
        s
      </Animated.Text>
      <Animated.Text
        style={[
          styles.letter,
          { fontSize, color: COLORS.brandBlue },
          animatedS2,
        ]}
      >
        s
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    writingDirection: 'ltr',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  letter: {
    fontWeight: '900',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
});