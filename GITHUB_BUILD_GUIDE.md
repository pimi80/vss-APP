# 🚀 راهنمای بیلد APK با GitHub Actions

## مرحله ۱: ایجاد پروژه React Native (روی کامپیوتر خودتون)

```bash
# 1. نصب React Native CLI
npm install -g react-native-cli

# 2. ایجاد پروژه جدید
npx react-native@latest init VSSBrowser

# 3. وارد پوشه شوید
cd VSSBrowser

# 4. فایل‌های src را کپی کنید (از پوشه react-native-vss/src)
# 5. فایل‌های زیر را هم کپی کنید:
#    - index.js
#    - app.json  
#    - babel.config.js
#    - tsconfig.json
#    - package.json (یا پکیج‌ها رو نصب کنید)

# 6. نصب پکیج‌ها
npm install react-native-webview @react-navigation/native @react-navigation/drawer react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @react-native-community/netinfo react-native-vector-icons @react-native-async-storage/async-storage
```

---

## مرحله ۲: ایجاد ریپازیتوری GitHub

1. برید به **github.com**
2. روی **New Repository** کلیک کنید
3. اسم بذارید: `vss-browser`
4. **Create repository** بزنید

---

## مرحله ۳: آپلود کد به GitHub

```bash
# 1. داخل پوشه پروژه باشید
cd VSSBrowser

# 2. پوشه .github/workflows بسازید
mkdir -p .github/workflows

# 3. فایل build-android.yml را کپی کنید به این پوشه

# 4. گیت رو راه‌اندازی کنید
git init
git add .
git commit -m "Initial commit"

# 5. به GitHub وصل کنید (آدرس ریپوی خودتون)
git remote add origin https://github.com/USERNAME/vss-browser.git
git branch -M main
git push -u origin main
```

---

## مرحله ۴: بیلد خودکار شروع میشه! 🎉

1. برید به ریپازیتوری GitHub
2. تب **Actions** رو باز کنید
3. می‌بینید که بیلد شروع شده
4. صبر کنید تا ✅ سبز بشه (۱۰-۱۵ دقیقه)

---

## مرحله ۵: دانلود APK

1. روی بیلد سبز شده کلیک کنید
2. پایین صفحه قسمت **Artifacts** رو ببینید
3. دانلود کنید:
   - `app-debug` → برای تست
   - `app-release` → برای انتشار

---

## 🔄 هر بار که بخواید بیلد جدید بگیرید

**روش ۱: تغییر کد**
```bash
git add .
git commit -m "Update"
git push
```
بیلد خودکار شروع میشه!

**روش ۲: دستی**
1. تب Actions
2. کلیک روی "Build Android APK"
3. دکمه "Run workflow"

---

## ❓ مشکلات رایج

### بیلد فیل شد؟
1. تب Actions → روی بیلد قرمز کلیک کنید
2. لاگ رو بخونید ببینید کجا ارور داده
3. معمولاً مشکل پکیج یا تنظیمات gradle هست

### APK نصب نمیشه؟
- `app-debug.apk` رو امتحان کنید
- از تنظیمات گوشی "نصب از منابع ناشناس" رو فعال کنید

---

## 📁 ساختار پوشه نهایی

```
VSSBrowser/
├── .github/
│   └── workflows/
│       └── build-android.yml    ← فایل بیلد
├── android/                      ← پوشه اندروید
├── ios/                          ← پوشه iOS
├── src/                          ← کدهای شما
├── index.js
├── package.json
└── ...
```

---

## 🔐 برای Release امضادار (Google Play)

اگه بخواید APK امضادار برای گوگل‌پلی بسازید، باید:

1. یه فایل keystore بسازید
2. به GitHub Secrets اضافه کنید
3. workflow رو آپدیت کنید

بگید تا راهنماش رو هم بدم.
