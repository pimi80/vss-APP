import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { COLORS } from '../config';

interface OfflineScreenProps {
  onRetry: () => void;
  type?: 'offline' | 'error';
}

export default function OfflineScreen({ onRetry, type = 'offline' }: OfflineScreenProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Icon */}
      <Animated.View entering={ZoomIn.springify()} style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Icon
            name={type === 'offline' ? 'wifi' : 'cloud'}
            size={50}
            color={COLORS.brandRed}
          />
          {type === 'offline' && (
            <View style={styles.slashLine} />
          )}
        </View>
      </Animated.View>

      {/* Text */}
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={[styles.title, { color: colors.text }]}>
          {type === 'offline' ? 'اتصال اینترنت قطع است' : 'خطا در اتصال به سرور'}
        </Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(300)}>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          {type === 'offline'
            ? 'لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.'
            : 'سرور در حال حاضر پاسخ نمی‌دهد. لطفاً کمی بعد دوباره امتحان کنید.'}
        </Text>
      </Animated.View>

      {/* Retry button */}
      <Animated.View entering={FadeIn.delay(400)}>
        <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.8}>
          <Icon name="refresh" size={18} color="#fff" />
          <Text style={styles.buttonText}>تلاش مجدد</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  iconContainer: {
    marginBottom: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(220,38,38,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(220,38,38,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slashLine: {
    position: 'absolute',
    width: 70,
    height: 3,
    backgroundColor: COLORS.brandRed,
    transform: [{ rotate: '-45deg' }],
    borderRadius: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    maxWidth: 280,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: COLORS.brandBlue,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
