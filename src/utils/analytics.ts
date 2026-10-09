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
  | 'call_click';

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
export const INSTAGRAM_TAKEOVER_CAMPAIGN = 'baseln_instagram_takeover_2026q4';
export const INSTAGRAM_TAKEOVER_CONTENT = 'takeover_profile_link';

const parseUrlParams = () => {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
};

const attributionPath = (path = typeof window !== 'undefined' ? window.location.pathname : '/', params = parseUrlParams()) => {
  const allowed = new URLSearchParams();
  ATTRIBUTION_QUERY_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) allowed.set(key, value.slice(0, 240));
  });
  const query = allowed.toString();
  return `${path || '/'}${query ? `?${query}` : ''}`;
};

export const initAttribution = (): AttributionData => {
  if (typeof window === 'undefined') {
    return {
      referrer: 'direct',
      first_landing_page: '/',
      first_touch_at: new Date().toISOString(),
      last_touch_page: '/',
      last_touch_at: new Date().toISOString(),
    };
  }

  const now = new Date().toISOString();
  const currentPathWithSearch = attributionPath();
  const firstLandingOverride = sessionStorage.getItem('baseln_first_landing_override');
  const params = parseUrlParams();
  const currentReferrer = (() => {
    if (!document.referrer) return 'direct';
    try {
      const referrer = new URL(document.referrer);
      return referrer.origin !== window.location.origin
        ? `${referrer.origin}${referrer.pathname}`
        : 'direct';
    } catch {
      return 'direct';
    }
  })();

  const hasCurrentUtm =
    params.has('utm_source') ||
    params.has('utm_medium') ||
    params.has('utm_campaign') ||
    params.has('utm_content') ||
    params.has('utm_term');

  let existing: AttributionData | null = null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (raw) existing = JSON.parse(raw);
  } catch {
    // ignore
  }

  // 1. First touch calculation (strictly preserved forever in this visitor journey)
  const firstTouch: AttributionData = existing
    ? { ...existing }
    : {
        utm_source: params.get('utm_source') || (currentReferrer !== 'direct' ? new URL(currentReferrer).hostname : undefined),
        cta: params.get('cta') || undefined,
        utm_medium: params.get('utm_medium') || (currentReferrer !== 'direct' ? 'referral' : undefined),
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_content: params.get('utm_content') || undefined,
        utm_term: params.get('utm_term') || undefined,
        referrer: currentReferrer,
        first_landing_page: firstLandingOverride ? attributionPath(firstLandingOverride) : currentPathWithSearch,
        first_touch_at: now,
        last_touch_page: currentPathWithSearch,
        last_touch_at: now,
      };

  // 2. Last non-direct assist calculation
  if (hasCurrentUtm) {
    firstTouch.last_non_direct_source = params.get('utm_source') || undefined;
    firstTouch.last_non_direct_medium = params.get('utm_medium') || undefined;
    firstTouch.last_non_direct_campaign = params.get('utm_campaign') || undefined;
    firstTouch.last_non_direct_content = params.get('utm_content') || undefined;
    firstTouch.last_non_direct_at = now;
  } else if (!firstTouch.last_non_direct_source && firstTouch.utm_source) {
    firstTouch.last_non_direct_source = firstTouch.utm_source;
    firstTouch.last_non_direct_medium = firstTouch.utm_medium;
    firstTouch.last_non_direct_campaign = firstTouch.utm_campaign;
    firstTouch.last_non_direct_content = firstTouch.utm_content;
    firstTouch.last_non_direct_at = firstTouch.first_touch_at;
  }

  firstTouch.last_touch_page = currentPathWithSearch;
  firstTouch.last_touch_at = now;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(firstTouch));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(firstTouch));
    if (!existing && firstLandingOverride) sessionStorage.removeItem('baseln_first_landing_override');
  } catch {
    // ignore
  }

  return firstTouch;
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
    // ignore
  }

  return initAttribution();
};

export const captureUtmParams = initAttribution;

export const trackEvent = (event: AnalyticsEventType, metadata: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;

  const attribution = getAttribution();
  const payload: AnalyticsEventPayload = {
    event,
    path: window.location.pathname,
    metadata,
    attribution,
    timestamp: new Date().toISOString(),
  };

  try {
    window.dispatchEvent(new CustomEvent('baseln_analytics', { detail: payload }));
  } catch {
    // ignore
  }

  try {
    const win = window as unknown as { plausible?: (name: string, opts?: { props?: Record<string, unknown> }) => void };
    if (typeof win.plausible === 'function') {
      win.plausible(event, {
        props: {
          path: payload.path,
          conversion_funnel: SOCIAL_ACCOUNT,
          social_profile: INSTAGRAM_HANDLE,
          utm_source: attribution.utm_source || 'direct',
          utm_campaign: attribution.utm_campaign || 'none',
          last_non_direct_source: attribution.last_non_direct_source || 'direct',
          ...metadata,
        },
      });
    }
  } catch {
    // ignore
  }

  try {
    const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        ...payload,
      });
    }
  } catch {
    // ignore
  }

  console.info(`[BASELN Event: ${event}]`, payload);
};
