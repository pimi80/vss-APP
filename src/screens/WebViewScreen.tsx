import React, { useRef, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
  Linking, StatusBar, Platform,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { COLORS, DEFAULT_URL, SITE_1, SITE_2, isAllowedUrl, isSpecialScheme } from '../config';
import OfflineScreen from '../components/OfflineScreen';
import BlockedScreen from '../components/BlockedScreen';
import LeftDrawer from '../components/LeftDrawer';
import RightDrawer from '../components/RightDrawer';

export default function WebViewScreen() {
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { isDark, colors } = useTheme();
  const webViewRef = useRef<WebView>(null);

  const initialUrl = route.params?.url || DEFAULT_URL;

  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedUrl, setBlockedUrl] = useState('');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (route.params?.url) setCurrentUrl(route.params.url);
  }, [route.params?.url]);

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
    setIsLoading(navState.loading);
  }, []);

  const handleShouldStartLoad = useCallback((event: { url: string }) => {
    const { url } = event;
    if (isSpecialScheme(url)) { Linking.openURL(url); return false; }
    if (!isAllowedUrl(url)) { setIsBlocked(true); setBlockedUrl(url); return false; }
    setIsBlocked(false);
    return true;
  }, []);

  const handleRefresh = useCallback(() => { setHasError(false); webViewRef.current?.reload(); }, []);
  const handleBack = useCallback(() => { webViewRef.current?.goBack(); }, []);
  const handleForward = useCallback(() => { webViewRef.current?.goForward(); }, []);
  const handleNavigate = useCallback((url: string) => { setIsBlocked(false); setHasError(false); setCurrentUrl(url); }, []);

  const getDisplayUrl = () => { try { return new URL(currentUrl).hostname; } catch { return currentUrl; } };

  const isAnyDrawerOpen = leftDrawerOpen || rightDrawerOpen;

  if (!isOnline) return <OfflineScreen onRetry={handleRefresh} type="offline" />;
  if (isBlocked) return <BlockedScreen blockedUrl={blockedUrl} onGoBack={() => { setIsBlocked(false); if (canGoBack) handleBack(); }} />;
  if (hasError) return <OfflineScreen onRetry={handleRefresh} type="error" />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />

      <View style={[styles.appBar, { backgroundColor: colors.surface, paddingTop: insets.top }]}>
        <View style={styles.gradientLine} />
        <View style={styles.appBarContent}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setLeftDrawerOpen(true)}>
            <Icon name="wrench" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.urlBar, { backgroundColor: colors.card }]}>
            {isLoading ? <ActivityIndicator size="small" color={COLORS.brandBlue} /> : <Icon name="lock" size={12} color="#22c55e" />}
            <Text style={[styles.urlText, { color: colors.textSecondary }]} numberOfLines={1}>{getDisplayUrl()}</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setRightDrawerOpen(true)}>
            <Icon name="bars" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.webViewContainer} pointerEvents={isAnyDrawerOpen ? 'none' : 'auto'}>
        {isLoading && <View style={styles.loadingBar}><View style={styles.loadingBarProgress} /></View>}
        <WebView
          ref={webViewRef} source={{ uri: currentUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          onShouldStartLoadWithRequest={handleShouldStartLoad}
          onError={() => setHasError(true)} onHttpError={() => setHasError(true)}
          onLoadStart={() => setIsLoading(true)} onLoadEnd={() => setIsLoading(false)}
          startInLoadingState
          javaScriptEnabled domStorageEnabled thirdPartyCookiesEnabled sharedCookiesEnabled
          allowsBackForwardNavigationGestures allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false} allowFileAccess allowFileAccessFromFileURLs scalesPageToFit
          style={{ flex: 1, backgroundColor: isDark ? COLORS.dark : '#fff' }}
        />
      </View>

      <View style={[styles.bottomBar, { backgroundColor: colors.surface, paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.bottomBtn} onPress={handleBack} disabled={!canGoBack}>
          <Icon name="arrow-right" size={18} color={canGoBack ? colors.text : colors.textSecondary} style={{ opacity: canGoBack ? 1 : 0.3 }} />
          <Text style={styles.bottomBtnText}>بازگشت</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={handleForward} disabled={!canGoForward}>
          <Icon name="arrow-left" size={18} color={canGoForward ? colors.text : colors.textSecondary} style={{ opacity: canGoForward ? 1 : 0.3 }} />
          <Text style={styles.bottomBtnText}>جلو</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={handleRefresh}>
          <Icon name="refresh" size={18} color={colors.text} /><Text style={styles.bottomBtnText}>بارگذاری</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={() => handleNavigate(SITE_1.url)}>
          <Icon name="home" size={18} color={COLORS.brandRed} /><Text style={styles.bottomBtnText}>{SITE_1.domain.split('.')[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={() => handleNavigate(SITE_2.url)}>
          <Icon name="home" size={18} color={COLORS.brandBlue} /><Text style={styles.bottomBtnText}>{SITE_2.domain.split('.')[0]}</Text>
        </TouchableOpacity>
      </View>

      <LeftDrawer
        isOpen={leftDrawerOpen}
        onClose={() => setLeftDrawerOpen(false)}
        onRefresh={handleRefresh}
        onBack={handleBack}
        onForward={handleForward}
        onGoHome={handleNavigate}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />

      <RightDrawer
        isOpen={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        onNavigate={handleNavigate}
        onRefresh={handleRefresh}
        onBack={handleBack}
        onForward={handleForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  gradientLine: { height: 2, backgroundColor: COLORS.brandBlue },
  appBarContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, gap: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  urlBar: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, gap: 8 },
  urlText: { flex: 1, fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  webViewContainer: { flex: 1, position: 'relative' },
  loadingBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: 'rgba(0,0,0,0.1)', zIndex: 10 },
  loadingBarProgress: { height: '100%', width: '60%', backgroundColor: COLORS.brandBlue, borderRadius: 2 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)' },
  bottomBtn: { alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 },
  bottomBtnText: { fontSize: 9, marginTop: 4, color: '#888' },
});