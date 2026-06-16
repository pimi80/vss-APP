import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { COLORS } from '../config';

interface BlockedScreenProps {
  blockedUrl: string;
  onGoBack: () => void;
}

export default function BlockedScreen({ blockedUrl, onGoBack }: BlockedScreenProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Icon */}
      <Animated.View entering={ZoomIn.springify()} style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Icon name="shield" size={45} color={COLORS.brandRed} />
          <View style={styles.xMark}>
            <Icon name="times" size={20} color="#fff" />
          </View>
        </View>
      </Animated.View>

      {/* Text */}
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={[styles.title, { color: colors.text }]}>
          دسترسی مسدود شد
        </Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(300)}>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          این لینک خارج از دامنه‌های مجاز است و امکان باز کردن آن وجود ندارد.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(400)}>
        <View style={[styles.urlBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.urlText, { color: colors.textSecondary }]} numberOfLines={2}>
            {blockedUrl}
          </Text>
        </View>
      </Animated.View>

      {/* Back button */}
      <Animated.View entering={FadeIn.delay(500)}>
        <TouchableOpacity style={styles.button} onPress={onGoBack} activeOpacity={0.8}>
          <Icon name="arrow-right" size={18} color="#fff" />
          <Text style={styles.buttonText}>بازگشت</Text>
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
    marginBottom: 25,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(220,38,38,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(220,38,38,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xMark: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.brandRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
    maxWidth: 280,
  },
  urlBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 25,
    maxWidth: 280,
  },
  urlText: {
    fontSize: 11,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.brandBlue,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
