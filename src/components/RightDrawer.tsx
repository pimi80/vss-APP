import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, { FadeInRight, FadeIn } from 'react-native-reanimated';
import VSSLogo from './VSSLogo';
import { useTheme } from '../hooks/useTheme';
import { QUICK_LINKS, SITE_1, SITE_2, COLORS } from '../config';

interface RightDrawerProps {
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  onClose: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export default function RightDrawer({
  onNavigate,
  onBack,
  onForward,
  onRefresh,
  onClose,
  canGoBack,
  canGoForward,
}: RightDrawerProps) {
  const { isDark, colors, toggleTheme } = useTheme();

  const handleLinkPress = (url: string) => {
    onNavigate(url);
    onClose();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.closeBtn, { backgroundColor: colors.card }]} onPress={onClose}>
          <Icon name="times" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textSecondary }]}>منوی اصلی</Text>
      </View>

      {/* Logo card */}
      <Animated.View entering={FadeIn.delay(100)} style={[styles.logoCard, { backgroundColor: colors.card }]}>
        <VSSLogo size="lg" animate={true} />
        <Text style={[styles.logoSubtitle, { color: colors.textSecondary }]}>
          مرورگر اختصاصی{' '}
          <Text style={{ writingDirection: 'ltr' }}>
            <Text style={{ color: COLORS.brandRed, fontStyle: 'italic' }}>v</Text>
            <Text style={{ color: COLORS.brandBlue, fontStyle: 'italic' }}>ss</Text>
          </Text>
        </Text>
      </Animated.View>

      {/* Navigation toolbar */}
      <Animated.View entering={FadeIn.delay(150)} style={[styles.toolbar, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={styles.toolBtn}
          onPress={() => { onBack(); onClose(); }}
          disabled={!canGoBack}
        >
          <Icon
            name="arrow-right"
            size={18}
            color={canGoBack ? colors.text : colors.textSecondary}
            style={{ opacity: canGoBack ? 1 : 0.3 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolBtn}
          onPress={() => { onForward(); onClose(); }}
          disabled={!canGoForward}
        >
          <Icon
            name="arrow-left"
            size={18}
            color={canGoForward ? colors.text : colors.textSecondary}
            style={{ opacity: canGoForward ? 1 : 0.3 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolBtn}
          onPress={() => { onRefresh(); onClose(); }}
        >
          <Icon name="refresh" size={18} color={colors.text} />
        </TouchableOpacity>

        <View style={[styles.separator, { backgroundColor: colors.border }]} />

        <TouchableOpacity style={styles.toolBtn} onPress={toggleTheme}>
          <Icon
            name={isDark ? 'sun-o' : 'moon-o'}
            size={18}
            color={isDark ? '#fbbf24' : '#6366f1'}
          />
        </TouchableOpacity>
      </Animated.View>

      <Text style={[styles.themeLabel, { color: colors.textSecondary }]}>
        {isDark ? '🌙 حالت تاریک' : '☀️ حالت روشن'}
      </Text>

      <View style={styles.dividerContainer}>
        <View style={[styles.dividerLine, { backgroundColor: COLORS.brandRed + '30' }]} />
        <View style={[styles.dividerDot, { backgroundColor: colors.border }]} />
        <View style={[styles.dividerLine, { backgroundColor: COLORS.brandBlue + '30' }]} />
      </View>

      <ScrollView style={styles.linksContainer} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInRight.delay(200)}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: COLORS.brandRed + '20' }]}>
              <Icon name="globe" size={12} color={COLORS.brandRed} />
            </View>
            <Text style={[styles.sectionTitle, { color: COLORS.brandRed }]}>{SITE_1.name}</Text>
          </View>
          {QUICK_LINKS.filter(l => l.site === 1).map((link, i) => (
            <TouchableOpacity
              key={i}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url)}
              activeOpacity={0.7}
            >
              <Icon name={link.icon} size={16} color={colors.textSecondary} />
              <Text style={[styles.linkText, { color: colors.text }]}>{link.label}</Text>
              <Icon name="external-link" size={10} color={colors.textSecondary} style={{ opacity: 0.3 }} />
            </TouchableOpacity>
          ))}
        </Animated.View>

        <View style={{ height: 15 }} />

        <Animated.View entering={FadeInRight.delay(300)}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: COLORS.brandBlue + '20' }]}>
              <Icon name="globe" size={12} color={COLORS.brandBlue} />
            </View>
            <Text style={[styles.sectionTitle, { color: COLORS.brandBlue }]}>{SITE_2.name}</Text>
          </View>
          {QUICK_LINKS.filter(l => l.site === 2).map((link, i) => (
            <TouchableOpacity
              key={i}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url)}
              activeOpacity={0.7}
            >
              <Icon name={link.icon} size={16} color={colors.textSecondary} />
              <Text style={[styles.linkText, { color: colors.text }]}>{link.label}</Text>
              <Icon name="external-link" size={10} color={colors.textSecondary} style={{ opacity: 0.3 }} />
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View style={[styles.footerDot, { backgroundColor: COLORS.brandRed + '60' }]} />
        <Text style={[styles.footerText, { color: colors.textSecondary, writingDirection: 'ltr' }]}>
          vss Browser App v1.0
        </Text>
        <View style={[styles.footerDot, { backgroundColor: COLORS.brandBlue + '60' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  closeBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 12, fontWeight: '500' },
  logoCard: { marginHorizontal: 20, padding: 25, borderRadius: 16, alignItems: 'center' },
  logoSubtitle: { fontSize: 11, marginTop: 12 },
  toolbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 15, padding: 6, borderRadius: 16 },
  toolBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  separator: { width: 1, height: 24 },
  themeLabel: { fontSize: 10, textAlign: 'center', marginTop: 8 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, marginVertical: 15 },
  dividerLine: { flex: 1, height: 1 },
  dividerDot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 10 },
  linksContainer: { flex: 1, paddingHorizontal: 15 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 8 },
  sectionIcon: { width: 22, height: 22, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '600' },
  linkItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 12, gap: 12 },
  linkText: { flex: 1, fontSize: 13, textAlign: 'right' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderTopWidth: 1, gap: 10 },
  footerDot: { width: 4, height: 4, borderRadius: 2 },
  footerText: { fontSize: 10 },
});