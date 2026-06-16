#!/bin/bash

# VSS Browser - Quick Setup Script
# ================================

echo "🚀 راه‌اندازی پروژه VSS Browser"
echo "================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js نصب نیست. لطفاً از https://nodejs.org نصب کنید."
    exit 1
fi

echo "✅ Node.js: $(node -v)"

# Create React Native project
echo ""
echo "📦 ایجاد پروژه React Native..."
npx react-native@latest init VSSBrowser --skip-install

# Copy source files
echo ""
echo "📁 کپی فایل‌های سورس..."
cp -r src/* VSSBrowser/src/ 2>/dev/null || mkdir -p VSSBrowser/src && cp -r src/* VSSBrowser/src/
cp index.js VSSBrowser/
cp app.json VSSBrowser/
cp babel.config.js VSSBrowser/
cp tsconfig.json VSSBrowser/

# Navigate to project
cd VSSBrowser

# Install dependencies
echo ""
echo "📥 نصب پکیج‌ها..."
npm install react-native-webview @react-navigation/native @react-navigation/drawer react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @react-native-community/netinfo react-native-vector-icons @react-native-async-storage/async-storage

# iOS pods
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "🍎 نصب iOS Pods..."
    cd ios && pod install && cd ..
fi

echo ""
echo "✅ راه‌اندازی کامل شد!"
echo ""
echo "📱 برای اجرا:"
echo "   cd VSSBrowser"
echo "   npx react-native run-android   # اندروید"
echo "   npx react-native run-ios       # iOS (فقط macOS)"
echo ""
echo "📦 برای بیلد Release:"
echo "   cd android && ./gradlew assembleRelease"
