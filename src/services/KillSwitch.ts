/**
 * Kill Switch Service
 * ==================
 * 
 * این سرویس وضعیت اپلیکیشن را از سرور چک می‌کند.
 * 
 * روش استفاده:
 * ۱. یک فایل JSON در سایت خود آپلود کنید:
 *    https://vssgroup.ir/app-config.json
 * 
 * ۲. محتوای فایل:
 *    {
 *      "app_enabled": true,
 *      "min_version": "1.0.0",
 *      "message": "",
 *      "force_update": false,
 *      "update_url": "https://play.google.com/store/apps/details?id=com.vss.browser"
 *    }
 * 
 * ۳. برای غیرفعال کردن اپ:
 *    {
 *      "app_enabled": false,
 *      "message": "اپلیکیشن موقتاً غیرفعال است. لطفاً بعداً تلاش کنید."
 *    }
 */

export interface AppConfig {
  app_enabled: boolean;
  min_version?: string;
  current_version?: string;
  message?: string;
  message_title?: string;
  force_update?: boolean;
  update_url?: string;
  maintenance_mode?: boolean;
  maintenance_end_time?: string;
}

// ⚠️ این URL را به آدرس واقعی فایل JSON خود تغییر دهید
const CONFIG_URL = 'https://vssgroup.ir/app-config.json';

// نسخه فعلی اپلیکیشن
export const APP_VERSION = '1.0.0';

// تنظیمات پیش‌فرض (اگر سرور در دسترس نبود)
const DEFAULT_CONFIG: AppConfig = {
  app_enabled: true,
  min_version: '1.0.0',
  message: '',
  force_update: false,
};

/**
 * مقایسه نسخه‌ها
 * @returns true اگر version1 < version2
 */
function compareVersions(version1: string, version2: string): boolean {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1 = v1Parts[i] || 0;
    const v2 = v2Parts[i] || 0;
    if (v1 < v2) return true;
    if (v1 > v2) return false;
  }
  return false;
}

/**
 * دریافت تنظیمات از سرور
 */
export async function fetchAppConfig(): Promise<AppConfig> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(CONFIG_URL, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.log('Kill Switch: Server returned', response.status);
      return DEFAULT_CONFIG;
    }
    
    const config: AppConfig = await response.json();
    return config;
  } catch (error) {
    console.log('Kill Switch: Failed to fetch config', error);
    // اگر نتوانستیم به سرور وصل شویم، اپ را اجازه اجرا می‌دهیم
    return DEFAULT_CONFIG;
  }
}

/**
 * بررسی وضعیت اپلیکیشن
 */
export async function checkAppStatus(): Promise<{
  canRun: boolean;
  reason?: 'disabled' | 'update_required' | 'maintenance';
  config: AppConfig;
}> {
  const config = await fetchAppConfig();
  
  // ۱. چک کردن غیرفعال بودن کامل
  if (config.app_enabled === false) {
    return {
      canRun: false,
      reason: 'disabled',
      config,
    };
  }
  
  // ۲. چک کردن حالت تعمیرات
  if (config.maintenance_mode === true) {
    return {
      canRun: false,
      reason: 'maintenance',
      config,
    };
  }
  
  // ۳. چک کردن نسخه
  if (config.min_version && config.force_update) {
    if (compareVersions(APP_VERSION, config.min_version)) {
      return {
        canRun: false,
        reason: 'update_required',
        config,
      };
    }
  }
  
  return {
    canRun: true,
    config,
  };
}
