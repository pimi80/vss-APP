import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { SITE_1, SITE_2 } from '../config';

interface LeftDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onBack: () => void;
  onForward: () => void;
  onGoHome: (url: string) => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export default function LeftDrawer({
  isOpen,
  onClose,
  onRefresh,
  onBack,
  onForward,
  onGoHome,
  canGoBack,
  canGoForward,
}: LeftDrawerProps) {
  const { isDark, colors } = useTheme();

  if (!isOpen) return null;

  const tools = [
    { label: 'بازگشت', icon: 'arrow-right', action: () => { onBack(); onClose(); }, disabled: !canGoBack },
    { label: 'جلو', icon: 'arrow-left', action: () => { onForward(); onClose(); }, disabled: !canGoForward },
    { label: 'بارگذاری مجدد', icon: 'refresh', action: () => { onRefresh(); onClose(); }, disabled: false },
  ];

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

      <Animated.View entering={SlideInLeft.duration(300)} style={[styles.drawer, { backgroundColor: colors.surface }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>ابزارها</Text>
          <TouchableOpacity style={[styles.closeBtn, { backgroundColor: colors.card }]} onPress={onClose}>
            <Icon name="times" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>ناوبری</Text>
          {tools.map((tool, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.toolItem, { opacity: tool.disabled ? 0.3 : 1 }]}
              onPress={tool.action}
              disabled={tool.disabled}
            >
              <View style={[styles.toolIcon, { backgroundColor: colors.card }]}>
                <Icon name={tool.icon} size={18} color={colors.text} />
              </View>
              <Text style={[styles.toolLabel, { color: colors.text }]}>{tool.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.divider, { opacity: 0.3 }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>صفحات اصلی</Text>

          <TouchableOpacity style={styles.homeBtn} onPress={() => { onGoHome(SITE_1.url); onClose(); }}>
            <View style={[styles.homeIcon, { backgroundColor: '#ef444420' }]}>
              <Icon name="home" size={18} color="#ef4444" />
            </View>
            <View>
              <Text style={[styles.homeName, { color: colors.text }]}>{SITE_1.name}</Text>
              <Text style={[styles.homeDomain, { color: colors.textSecondary }]}>{SITE_1.domain}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeBtn} onPress={() => { onGoHome(SITE_2.url); onClose(); }}>
            <View style={[styles.homeIcon, { backgroundColor: '#3b82f620' }]}>
              <Icon name="home" size={18} color="#3b82f6" />
            </View>
            <View>
              <Text style={[styles.homeName, { color: colors.text }]}>{SITE_2.name}</Text>
              <Text style={[styles.homeDomain, { color: colors.textSecondary }]}>{SITE_2.domain}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            ابزارهای ناوبری VSS
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 999 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  drawer: {
    position: 'absolute', top: 0, left: 0, bottom: 0,
    width: 280, maxWidth: '80%',
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, paddingTop: 30,
  },
  headerTitle: { fontSize: 14, fontWeight: '600' },
  closeBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#88888820', marginHorizontal: 20 },
  section: { padding: 16 },
  sectionLabel: { fontSize: 10, marginBottom: 10, paddingHorizontal: 5 },
  toolItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10,
    borderRadius: 12, gap: 12,
  },
  toolIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  toolLabel: { fontSize: 13, fontWeight: '500' },
  homeBtn: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10,
    borderRadius: 12, gap: 12,
  },
  homeIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  homeName: { fontSize: 13, fontWeight: '500' },
  homeDomain: { fontSize: 10, marginTop: 2 },
  footer: { marginTop: 'auto', padding: 16, borderTopWidth: 1, alignItems: 'center' },
  footerText: { fontSize: 10 },
});