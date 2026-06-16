// VSS App Configuration
// Domain whitelist and navigation links

export const SITE_1 = {
  name: 'سایت اول vss',
  domain: 'vssgroup.ir',
  url: 'https://vssgroup.ir',
  icon: 'home',
  color: '#dc2626',
};

export const SITE_2 = {
  name: 'سایت دوم vss',
  domain: 'vss-co.com',
  url: 'https://vss-co.com',
  icon: 'globe',
  color: '#2563eb',
};

// Allowed domains
export const ALLOWED_DOMAINS = [
  SITE_1.domain,
  SITE_2.domain,
  `www.${SITE_1.domain}`,
  `www.${SITE_2.domain}`,
];

// Default home URL
export const DEFAULT_URL = SITE_1.url;

// Quick links for drawer
export const QUICK_LINKS = [
  { label: 'صفحه اصلی سایت اول', url: SITE_1.url, icon: 'home', site: 1 },
  { label: 'صفحه اصلی سایت دوم', url: SITE_2.url, icon: 'home', site: 2 },
  { label: 'درباره ما', url: `${SITE_1.url}/about`, icon: 'info-circle', site: 1 },
  { label: 'تماس با ما', url: `${SITE_1.url}/contact`, icon: 'phone', site: 1 },
  { label: 'خدمات', url: `${SITE_1.url}/services`, icon: 'cogs', site: 1 },
  { label: 'بلاگ', url: `${SITE_2.url}/blog`, icon: 'newspaper-o', site: 2 },
  { label: 'محصولات', url: `${SITE_2.url}/products`, icon: 'cube', site: 2 },
  { label: 'پشتیبانی', url: `${SITE_2.url}/support`, icon: 'life-ring', site: 2 },
];

// Brand colors
export const COLORS = {
  brandRed: '#dc2626',
  brandRedDark: '#b91c1c',
  brandBlue: '#2563eb',
  brandBlueDark: '#1d4ed8',
  dark: '#0f172a',
  darker: '#020617',
  light: '#f8fafc',
  lightGray: '#e2e8f0',
};

// Check if URL is allowed
export function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    return ALLOWED_DOMAINS.some(
      domain => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

// Check special schemes (tel:, mailto:, etc.)
export function isSpecialScheme(url: string): boolean {
  return /^(tel:|mailto:|sms:|whatsapp:|tg:)/i.test(url);
}
