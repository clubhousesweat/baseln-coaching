export interface AttributionData {
  cta?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer: string;
  first_landing_page: string;
  first_touch_at: string;
  last_non_direct_source?: string;
  last_non_direct_medium?: string;
  last_non_direct_campaign?: string;
  last_non_direct_content?: string;
  last_non_direct_at?: string;
  last_touch_page: string;
  last_touch_at: string;
}

export type AnalyticsEventType =
  | 'apply_page_view'
  | 'application_start'
  | 'application_complete'
  | 'instagram_takeover_profile_view'
  | 'instagram_profile_click'
  | 'consultation_booking'
  | 'email_click'
  | 'call_click'
  | 'member_login_attempt';

export interface AnalyticsEventPayload {
  event: AnalyticsEventType;
  path: string;
  metadata?: Record<string, unknown>;
  attribution: AttributionData;
  timestamp: string;
}

const STORAGE_KEY = 'baseln_attribution_v1';
const ATTRIBUTION_QUERY_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'cta'];

// @baseln_fit is the active flagship BASELN Online Coaching social account.
export const SOCIAL_ACCOUNT = 'baseln_online_coaching';
export const INSTAGRAM_HANDLE = '@baseln_fit';
export const INSTAGRAM_BIO_PATH = '/go/instagram';
export const INSTAGRAM_TAKEOVER_CTA = 'instagram-profile';
export const INSTAGRAM_TAKEOVER_CAMPAIGN = 'baseln_instagram_takeover_2026q4';
export const INSTAGRAM_TAKEOVER_CONTENT = 'takeover_profile_link';

const parseUrlParams = () => {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
};

export const getAttribution = (): AttributionData => {
  if (typeof window === 'undefined') {
    return {
      referrer: 'direct',
      first_landing_page: '/',
      first_touch_at: new Date().toISOString(),
      last_touch_page: '/',
      last_touch_at: new Date().toISOString(),
    };
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // storage fallback
  }

  return captureUtmParams();
};

export const captureUtmParams = (): AttributionData => {
  if (typeof window === 'undefined') {
    return {
      referrer: 'direct',
      first_landing_page: '/',
      first_touch_at: new Date().toISOString(),
      last_touch_page: '/',
      last_touch_at: new Date().toISOString(),
    };
  }

  const searchParams = parseUrlParams();
  const currentPath = window.location.pathname;
  const currentFull = currentPath + window.location.search;
  const referrer = document.referrer ? new URL(document.referrer, window.location.origin).origin : 'direct';
  const now = new Date().toISOString();

  let existing: AttributionData | null = null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (stored) existing = JSON.parse(stored);
  } catch {
    existing = null;
  }

  const currentUtm: Record<string, string> = {};
  ATTRIBUTION_QUERY_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) currentUtm[key] = value;
  });

  const hasNewUtm = Object.keys(currentUtm).length > 0;

  const attribution: AttributionData = {
    cta: existing?.cta || currentUtm.cta,
    utm_source: existing?.utm_source || currentUtm.utm_source,
    utm_medium: existing?.utm_medium || currentUtm.utm_medium,
    utm_campaign: existing?.utm_campaign || currentUtm.utm_campaign,
    utm_content: existing?.utm_content || currentUtm.utm_content,
    utm_term: existing?.utm_term || currentUtm.utm_term,
    referrer: existing?.referrer || referrer,
    first_landing_page: existing?.first_landing_page || currentFull,
    first_touch_at: existing?.first_touch_at || now,
    last_non_direct_source: hasNewUtm ? currentUtm.utm_source : existing?.last_non_direct_source,
    last_non_direct_medium: hasNewUtm ? currentUtm.utm_medium : existing?.last_non_direct_medium,
    last_non_direct_campaign: hasNewUtm ? currentUtm.utm_campaign : existing?.last_non_direct_campaign,
    last_non_direct_content: hasNewUtm ? currentUtm.utm_content : existing?.last_non_direct_content,
    last_non_direct_at: hasNewUtm ? now : existing?.last_non_direct_at,
    last_touch_page: currentFull,
    last_touch_at: now,
  };

  try {
    const serialised = JSON.stringify(attribution);
    sessionStorage.setItem(STORAGE_KEY, serialised);
    localStorage.setItem(STORAGE_KEY, serialised);
  } catch {
    // storage optional
  }

  return attribution;
};

export const trackEvent = (event: AnalyticsEventType, metadata?: Record<string, unknown>): void => {
  const payload: AnalyticsEventPayload = {
    event,
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    metadata,
    attribution: getAttribution(),
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    (window as unknown as { dataLayer?: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('baseln_analytics', { detail: payload }));
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info(`[BASELN Analytics] ${event}`, payload);
  }
};
