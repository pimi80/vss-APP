import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './hooks/useTheme';
import SplashScreen from './components/SplashScreen';
import KillScreen from './components/KillScreen';
import AppNavigator from './navigation/AppNavigator';
import { checkAppStatus, AppConfig } from './services/KillSwitch';

type AppState = 
  | { status: 'splash' }
  | { status: 'checking' }
  | { status: 'running' }
  | { status: 'killed'; reason: 'disabled' | 'update_required' | 'maintenance'; config: AppConfig };

export default function App() {
  const [appState, setAppState] = useState<AppState>({ status: 'splash' });

  // بررسی وضعیت اپلیکیشن
  const checkStatus = useCallback(async () => {
    setAppState({ status: 'checking' });
    
    const result = await checkAppStatus();
    
    if (result.canRun) {
      setAppState({ status: 'running' });
    } else {
      setAppState({
        status: 'killed',
        reason: result.reason!,
        config: result.config,
      });
    }
  }, []);

  // وقتی Splash تمام شد
  const handleSplashFinish = useCallback(() => {
    checkStatus();
  }, [checkStatus]);

  // تلاش مجدد
  const handleRetry = useCallback(() => {
    setAppState({ status: 'splash' });
  }, []);

  // صفحه Splash
  if (appState.status === 'splash') {
    return (
      <ThemeProvider>
        <SplashScreen onFinish={handleSplashFinish} />
      </ThemeProvider>
    );
  }

  // در حال بررسی (نمایش Splash ادامه دارد)
  if (appState.status === 'checking') {
    return (
      <ThemeProvider>
        <SplashScreen onFinish={() => {}} />
      </ThemeProvider>
    );
  }

  // اپلیکیشن غیرفعال / نیاز به آپدیت / تعمیرات
  if (appState.status === 'killed') {
    return (
      <ThemeProvider>
        <KillScreen
          reason={appState.reason}
          config={appState.config}
          onRetry={handleRetry}
        />
      </ThemeProvider>
    );
  }

  // اپلیکیشن فعال - اجرای عادی
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
