import React, { useRef, useCallback } from 'react';
import { Dimensions, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WebViewScreen from '../screens/WebViewScreen';
import RightDrawer from '../components/RightDrawer';
import { useTheme } from '../hooks/useTheme';

// Force RTL
I18nManager.forceRTL(true);

const { width } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

// We need to pass webview controls to drawer
// Using a context or ref forwarding pattern

export default function AppNavigator() {
  const { colors } = useTheme();
  
  // Store webview control functions
  const webViewControls = useRef({
    onBack: () => {},
    onForward: () => {},
    onRefresh: () => {},
    onNavigate: (_url: string) => {},
    canGoBack: false,
    canGoForward: false,
  });

  const renderDrawerContent = useCallback((props: DrawerContentComponentProps) => {
    return (
      <RightDrawer
        onNavigate={(url) => {
          webViewControls.current.onNavigate(url);
          props.navigation.closeDrawer();
        }}
        onBack={() => {
          webViewControls.current.onBack();
          props.navigation.closeDrawer();
        }}
        onForward={() => {
          webViewControls.current.onForward();
          props.navigation.closeDrawer();
        }}
        onRefresh={() => {
          webViewControls.current.onRefresh();
          props.navigation.closeDrawer();
        }}
        onClose={() => props.navigation.closeDrawer()}
        canGoBack={webViewControls.current.canGoBack}
        canGoForward={webViewControls.current.canGoForward}
      />
    );
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerPosition: 'right', // RTL drawer on right
            drawerType: 'front',
            drawerStyle: {
              width: width * 0.8,
              maxWidth: 320,
              backgroundColor: colors.surface,
            },
            overlayColor: 'rgba(0,0,0,0.6)',
            swipeEdgeWidth: 50,
            swipeEnabled: true,
          }}
          drawerContent={renderDrawerContent}
        >
          <Drawer.Screen name="WebView" component={WebViewScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
