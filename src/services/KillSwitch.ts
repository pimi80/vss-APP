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

import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CONFIG_URL = 'http://vss-orginal-gr.com/app-config.json';
export const APP_VERSION = '1.0.0';
const CACHE_KEY = '@killswitch_cache';
const CACHE_TIME = 30 * 60 * 1000; // ۳۰ دقیقه

const DEFAULT_CONFIG: AppConfig = {
  app_enabled: true,
  min_version: '1.0.0',
  message: '',
  force_update: false,
};

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

export async function fetchAppConfig(): Promise<AppConfig> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(CONFIG_URL, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache', 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) return DEFAULT_CONFIG;
    return await response.json();
  } catch (error) {
    console.log('Kill Switch: Failed to fetch config', error);
    return DEFAULT_CONFIG;
  }
}

function checkConfig(config: AppConfig): {
  canRun: boolean;
  reason?: 'disabled' | 'update_required' | 'maintenance';
  config: AppConfig;
} {
  if (config.app_enabled === false) return { canRun: false, reason: 'disabled', config };
  if (config.maintenance_mode === true) return { canRun: false, reason: 'maintenance', config };
  if (config.min_version && config.force_update) {
    if (compareVersions(APP_VERSION, config.min_version)) {
      return { canRun: false, reason: 'update_required', config };
    }
  }
  return { canRun: true, config };
}

/**
 * بررسی وضعیت اپلیکیشن
 * فعلاً غیرفعال است - همیشه اجازه اجرا می‌دهد
 * برای فعال‌سازی، خط کامنت‌شده را برگردانید
 */
export async function checkAppStatus(): Promise<{
  canRun: boolean;
  reason?: 'disabled' | 'update_required' | 'maintenance';
  config: AppConfig;
}> {
  // *** موقتاً غیرفعال - برای فعال‌سازی، کد زیر را از کامنت خارج کنید ***
  return { canRun: true, config: DEFAULT_CONFIG };

  /*
  // *** نسخه فعال با کش ۳۰ دقیقه ***
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const { config, time } = JSON.parse(cached);
      if (Date.now() - time < CACHE_TIME) {
        return checkConfig(config);
      }
    }
    const config = await fetchAppConfig();
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ config, time: Date.now() }));
    return checkConfig(config);
  } catch {
    return { canRun: true, config: DEFAULT_CONFIG };
  }
  */
}