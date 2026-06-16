# VSS Browser - React Native App

مرورگر اختصاصی vss برای نمایش دو وب‌سایت وردپرسی

## 🚀 راه‌اندازی سریع

### پیش‌نیازها
- Node.js 18+
- React Native CLI
- Android Studio (برای اندروید)
- Xcode (برای iOS - فقط macOS)

### ۱. ایجاد پروژه جدید
```bash
npx react-native@latest init VSSBrowser
cd VSSBrowser
```

### ۲. نصب پکیج‌ها
```bash
npm install react-native-webview @react-navigation/native @react-navigation/drawer react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @react-native-community/netinfo react-native-vector-icons lottie-react-native

# برای iOS
cd ios && pod install && cd ..
```

### ۳. کپی فایل‌ها
فایل‌های پوشه `src/` را به پروژه کپی کنید.

### ۴. بیلد

**اندروید:**
```bash
# Debug APK
npx react-native run-android

# Release APK
cd android && ./gradlew assembleRelease
# خروجی: android/app/build/outputs/apk/release/app-release.apk

# Release AAB (برای Google Play)
cd android && ./gradlew bundleRelease
# خروجی: android/app/build/outputs/bundle/release/app-release.aab
```

**iOS:**
```bash
npx react-native run-ios

# یا از Xcode برای Archive و IPA
```

## 📁 ساختار پروژه
```
src/
├── App.tsx                 # کامپوننت اصلی
├── config.ts               # تنظیمات دامنه‌ها
├── hooks/
│   └── useTheme.tsx        # مدیریت تم
├── components/
│   ├── SplashScreen.tsx    # صفحه لودینگ
│   ├── WebViewScreen.tsx   # صفحه اصلی WebView
│   ├── RightDrawer.tsx     # منوی راست
│   ├── OfflineScreen.tsx   # صفحه آفلاین
│   └── VSSLogo.tsx         # لوگو
└── navigation/
    └── AppNavigator.tsx    # ناوبری
```

## 🎨 برند
- **v** = قرمز (#dc2626)
- **ss** = آبی (#2563eb)
