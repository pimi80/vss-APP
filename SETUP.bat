@echo off
chcp 65001 >nul
echo.
echo 🚀 راه‌اندازی پروژه VSS Browser
echo ================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js نصب نیست. لطفاً از https://nodejs.org نصب کنید.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do echo ✅ Node.js: %%i

REM Create React Native project
echo.
echo 📦 ایجاد پروژه React Native...
call npx react-native@latest init VSSBrowser --skip-install

REM Copy source files
echo.
echo 📁 کپی فایل‌های سورس...
xcopy /E /I /Y src VSSBrowser\src
copy /Y index.js VSSBrowser\
copy /Y app.json VSSBrowser\
copy /Y babel.config.js VSSBrowser\
copy /Y tsconfig.json VSSBrowser\

REM Navigate to project
cd VSSBrowser

REM Install dependencies
echo.
echo 📥 نصب پکیج‌ها...
call npm install react-native-webview @react-navigation/native @react-navigation/drawer react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @react-native-community/netinfo react-native-vector-icons @react-native-async-storage/async-storage

echo.
echo ✅ راه‌اندازی کامل شد!
echo.
echo 📱 برای اجرا:
echo    cd VSSBrowser
echo    npx react-native run-android
echo.
echo 📦 برای بیلد Release APK:
echo    cd android ^&^& gradlew assembleRelease
echo.
pause
