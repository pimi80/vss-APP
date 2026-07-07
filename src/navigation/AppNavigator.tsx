import React from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WebViewScreen from '../screens/WebViewScreen';
import RightDrawer from '../components/RightDrawer';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerPosition: 'right',
            drawerType: 'front',
            drawerStyle: {
              width: width * 0.8,
              maxWidth: 320,
              backgroundColor: colors.surface,
            },
            overlayColor: 'rgba(0,0,0,0.6)',
            swipeEdgeWidth: 0,
            swipeEnabled: false,
          }}
          drawerContent={(props) => (
            <RightDrawer
              onNavigate={(url) => {
                props.navigation.navigate('WebView', { url });
                props.navigation.closeDrawer();
              }}
              onBack={() => {}}
              onForward={() => {}}
              onRefresh={() => {}}
              onClose={() => props.navigation.closeDrawer()}
              canGoBack={false}
              canGoForward={false}
            />
          )}
        >
          <Drawer.Screen name="WebView" component={WebViewScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}