import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import VSSLogo from './VSSLogo';
import { COLORS } from '../config';
import { AppConfig } from '../services/KillSwitch';

interface KillScreenProps {
  reason: 'disabled' | 'update_required' | 'maintenance';
  config: AppConfig;
  onRetry: () => void;
}

export default function KillScreen({ reason, config, onRetry }: KillScreenProps) {
  const handleUpdate = () => {
    if (config.update_url) {
      Linking.openURL(config.update_url);
    }
  };

  const getIcon = () => {
    switch (reason) {
      case 'disabled':
        return 'power-off';
      case 'update_required':
        return 'download';
      case 'maintenance':
        return 'wrench';
      default:
        return 'exclamation-circle';
    }
  };

  const getTitle = () => {
    if (config.message_title) return config.message_title;
    
    switch (reason) {
      case 'disabled':
        return 'اپلیکیشن غیرفعال است';
      case 'update_required':
        return 'نیاز به بروزرسانی';
      case 'maintenance':
        return 'در حال تعمیرات';
      default:
        return 'خطا';
    }
  };

  const getMessage = () => {
    if (config.message) return config.message;
    
    switch (reason) {
      case 'disabled':
        return 'اپلیکیشن موقتاً غیرفعال شده است. لطفاً بعداً دوباره تلاش کنید.';
      case 'update_required':
        return `نسخه جدید ${config.min_version} منتشر شده است. لطفاً اپلیکیشن را بروزرسانی کنید.`;
      case 'maintenance':
        return 'سیستم در حال تعمیرات است. به زودی برمی‌گردیم.';
      default:
        return 'خطایی رخ داده است.';
    }
  };

  const getIconColor = () => {
    switch (reason) {
      case 'disabled':
        return COLORS.brandRed;
      case 'update_required':
        return COLORS.brandBlue;
      case 'maintenance':
        return '#f59e0b'; // amber
      default:
        return COLORS.brandRed;
    }
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Logo */}
      <Animated.View entering={FadeIn.delay(100)}>
        <VSSLogo size="lg" animate={false} />
      </Animated.View>

      {/* Icon */}
      <Animated.View entering={ZoomIn.delay(200)} style={styles.iconContainer}>
        <View style={[styles.iconCircle, { borderColor: getIconColor() + '40' }]}>
          <Icon name={getIcon()} size={40} color={getIconColor()} />
        </View>
      </Animated.View>

      {/* Title */}
      <Animated.View entering={FadeIn.delay(300)}>
        <Text style={styles.title}>{getTitle()}</Text>
      </Animated.View>

      {/* Message */}
      <Animated.View entering={FadeIn.delay(400)}>
        <Text style={styles.message}>{getMessage()}</Text>
      </Animated.View>

      {/* Maintenance end time */}
      {reason === 'maintenance' && config.maintenance_end_time && (
        <Animated.View entering={FadeIn.delay(500)}>
          <View style={styles.timeBox}>
            <Icon name="clock-o" size={14} color="rgba(255,255,255,0.5)" />
            <Text style={styles.timeText}>
              پایان تعمیرات: {config.maintenance_end_time}
            </Text>
          </View>
        </Animated.View>
      )}

      {/* Buttons */}
      <Animated.View entering={FadeIn.delay(600)} style={styles.buttonContainer}>
        {reason === 'update_required' && config.update_url ? (
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Icon name="download" size={18} color="#fff" />
            <Text style={styles.buttonText}>بروزرسانی</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Icon name="refresh" size={18} color="#fff" />
            <Text style={styles.buttonText}>تلاش مجدد</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>vss Browser</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darker,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  bgCircle1: {
    position: 'absolute',
    top: '15%',
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(220,38,38,0.08)',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: '15%',
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(37,99,235,0.08)',
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 25,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  message: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  buttonContainer: {
    marginTop: 40,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: COLORS.brandBlue,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.2)',
    fontStyle: 'italic',
  },
});
