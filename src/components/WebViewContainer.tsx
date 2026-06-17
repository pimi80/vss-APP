import { useRef, useState, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { isAllowedUrl } from '../config';
import { useTheme } from '../hooks/useTheme';
import OfflineScreen from './OfflineScreen';
import BlockedScreen from './BlockedScreen';

export interface WebViewHandle {
  reload: () => void;
  goBack: () => void;
  goForward: () => void;
  navigate: (url: string) => void;
}

interface WebViewContainerProps {
  initialUrl: string;
  onUrlChange: (url: string) => void;
  onLoadingChange: (loading: boolean) => void;
  onNavigationState: (state: { canGoBack: boolean; canGoForward: boolean }) => void;
}

const WebViewContainer = forwardRef<WebViewHandle, WebViewContainerProps>(
  ({ initialUrl, onUrlChange, onLoadingChange, onNavigationState }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [currentUrl, setCurrentUrl] = useState(initialUrl);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [hasError, setHasError] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [blockedUrl, setBlockedUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState<string[]>([initialUrl]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [iframeKey, setIframeKey] = useState(0);

    // Monitor online/offline status
    useEffect(() => {
      const handleOnline = () => { setIsOnline(true); setHasError(false); };
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);

    // Update navigation state
    useEffect(() => {
      onNavigationState({
        canGoBack: historyIndex > 0,
        canGoForward: historyIndex < history.length - 1,
      });
    }, [historyIndex, history.length, onNavigationState]);

    const navigateTo = useCallback((url: string, addToHistory = true) => {
      // Check if URL is allowed
      if (!isAllowedUrl(url)) {
        setIsBlocked(true);
        setBlockedUrl(url);
        return;
      }

      setIsBlocked(false);
      setHasError(false);
      setIsLoading(true);
      setCurrentUrl(url);
      onUrlChange(url);
      onLoadingChange(true);
      // Force iframe remount for new URL
      setIframeKey(prev => prev + 1);

      if (addToHistory) {
        const newHistory = [...history.slice(0, historyIndex + 1), url];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }, [history, historyIndex, onUrlChange, onLoadingChange]);

    useImperativeHandle(ref, () => ({
      reload: () => {
        setIsLoading(true);
        onLoadingChange(true);
        setHasError(false);
        setIframeKey(prev => prev + 1);
      },
      goBack: () => {
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          const url = history[newIndex];
          setCurrentUrl(url);
          onUrlChange(url);
          setIsLoading(true);
          onLoadingChange(true);
          setIsBlocked(false);
          setHasError(false);
          setIframeKey(prev => prev + 1);
        }
      },
      goForward: () => {
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          const url = history[newIndex];
          setCurrentUrl(url);
          onUrlChange(url);
          setIsLoading(true);
          onLoadingChange(true);
          setIsBlocked(false);
          setHasError(false);
          setIframeKey(prev => prev + 1);
        }
      },
      navigate: (url: string) => {
        navigateTo(url);
      },
    }));

    const handleIframeLoad = () => {
      setIsLoading(false);
      onLoadingChange(false);
    };

    const handleIframeError = () => {
      setHasError(true);
      setIsLoading(false);
      onLoadingChange(false);
    };

    const handleRetry = () => {
      setHasError(false);
      setIsLoading(true);
      onLoadingChange(true);
      setIframeKey(prev => prev + 1);
    };

    const handleGoBackFromBlocked = () => {
      setIsBlocked(false);
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const prevUrl = history[newIndex];
        setCurrentUrl(prevUrl);
        onUrlChange(prevUrl);
        setIframeKey(prev => prev + 1);
      }
    };

    const { isDark } = useTheme(); // eslint-disable-line

    // If offline
    if (!isOnline) {
      return <OfflineScreen onRetry={handleRetry} type="offline" />;
    }

    // If blocked
    if (isBlocked) {
      return <BlockedScreen blockedUrl={blockedUrl} onGoBack={handleGoBackFromBlocked} />;
    }

    // If error
    if (hasError) {
      return <OfflineScreen onRetry={handleRetry} type="error" />;
    }

    return (
      <div className={`relative flex-1 w-full h-full overflow-hidden transition-colors duration-300
        ${isDark ? 'bg-brand-darker' : 'bg-gray-100'}`}>
        {/* Loading bar at top */}
        {isLoading && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[3px] z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-l from-brand-red to-brand-blue rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: ['0%', '30%', '60%', '85%'] }}
              transition={{ duration: 6, ease: 'easeOut', times: [0, 0.3, 0.6, 1] }}
            />
          </motion.div>
        )}

        {/* Iframe WebView */}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={currentUrl}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="vss WebView"
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals allow-popups-to-escape-sandbox"
          allow="camera; microphone; geolocation; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff' }}
        />

        {/* Loading overlay */}
        {isLoading && (
          <motion.div
            className={`absolute inset-0 flex items-center justify-center z-10 transition-colors duration-300
              ${isDark ? 'bg-brand-darker/95' : 'bg-white/95'}`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Animated loader */}
              <div className="relative w-16 h-16">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-red border-r-brand-blue"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-transparent border-b-brand-blue border-l-brand-red"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold italic" dir="ltr">
                    <span className="text-brand-red">v</span>
                    <span className="text-brand-blue">ss</span>
                  </span>
                </div>
              </div>

              <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>در حال بارگذاری...</p>

              {/* URL being loaded */}
              <div className={`px-4 py-1.5 rounded-full border
                ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
                <p className={`text-[10px] font-mono ${isDark ? 'text-white/20' : 'text-gray-400'}`} dir="ltr">
                  {(() => {
                    try { return new URL(currentUrl).hostname; }
                    catch { return currentUrl; }
                  })()}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

WebViewContainer.displayName = 'WebViewContainer';

export default WebViewContainer;
