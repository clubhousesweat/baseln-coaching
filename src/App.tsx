import React, { useEffect, useState } from 'react';
import { PageRoute } from './types';
import { Header, Footer } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { CoachingPage } from './pages/CoachingPage';
import { AboutPage } from './pages/AboutPage';
import { FieldNotesPage } from './pages/FieldNotesPage';
import { ApplyPage, TrainingRoomPage } from './pages/ApplyPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { MemberLoginPage } from './pages/MemberLoginPage';
import { CoachPortalPage } from './pages/CoachPortalPage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import {
  captureUtmParams,
  INSTAGRAM_HANDLE,
  INSTAGRAM_TAKEOVER_CAMPAIGN,
  INSTAGRAM_TAKEOVER_CONTENT,
  SOCIAL_ACCOUNT,
  trackEvent,
} from './utils/analytics';

const INSTAGRAM_BIO_PATH = '/go/instagram';
const CANONICAL_APPLICATION_PATH: PageRoute = '/online/register';
const INSTAGRAM_BIO_EVENT_KEY = 'baseln_pending_instagram_bio_event';

const validPaths: PageRoute[] = [
  '/',
  '/coaching',
  '/about',
  '/field-notes',
  CANONICAL_APPLICATION_PATH,
  '/online/thank-you',
  '/training-room',
  '/member-login',
  '/app',
  '/coach',
  '/contact',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/training-disclaimer',
];

const resolvePath = (path: string): PageRoute => {
  if (path === '/how-it-works') return '/coaching';
  if (path === '/apply' || path === INSTAGRAM_BIO_PATH) return CANONICAL_APPLICATION_PATH;
  return validPaths.includes(path as PageRoute) ? (path as PageRoute) : '/';
};

const redirectInstagramBioLink = (): boolean => {
  if (window.location.pathname !== INSTAGRAM_BIO_PATH) return false;

  window.sessionStorage.setItem('baseln_first_landing_override', window.location.pathname + window.location.search);
  window.sessionStorage.setItem(INSTAGRAM_BIO_EVENT_KEY, 'true');

  const params = new URLSearchParams(window.location.search);
  params.set('cta', params.get('cta') || 'instagram-profile');
  params.set('utm_source', params.get('utm_source') || 'instagram');
  params.set('utm_medium', params.get('utm_medium') || 'organic_social');
  params.set('utm_campaign', params.get('utm_campaign') || INSTAGRAM_TAKEOVER_CAMPAIGN);
  params.set('utm_content', params.get('utm_content') || INSTAGRAM_TAKEOVER_CONTENT);

  window.history.replaceState({}, '', `${CANONICAL_APPLICATION_PATH}?${params.toString()}`);
  return true;
};

const initialRoute = (): PageRoute => {
  redirectInstagramBioLink();
  captureUtmParams();
  return resolvePath(window.location.pathname);
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<PageRoute>(initialRoute);

  useEffect(() => {
    const syncPath = () => {
      const arrivedViaInstagramBio = redirectInstagramBioLink();
      captureUtmParams();

      const resolvedPath = resolvePath(window.location.pathname);
      setCurrentPath(resolvedPath);
      if (window.location.pathname !== resolvedPath) {
        window.history.replaceState({}, '', `${resolvedPath}${window.location.search}`);
      }

      const shouldRecordBioView = arrivedViaInstagramBio || window.sessionStorage.getItem(INSTAGRAM_BIO_EVENT_KEY) === 'true';
      if (shouldRecordBioView) {
        trackEvent('instagram_takeover_profile_view', {
          social_account: SOCIAL_ACCOUNT,
          social_handle: INSTAGRAM_HANDLE,
          bio_route: INSTAGRAM_BIO_PATH,
          destination: CANONICAL_APPLICATION_PATH,
        });
        window.sessionStorage.removeItem(INSTAGRAM_BIO_EVENT_KEY);
      }
    };

    syncPath();
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const handleNavigate = (path: PageRoute) => {
    setCurrentPath(path);
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-charcoal-950 text-paper-200 flex flex-col font-sans selection:bg-smoke-500 selection:text-charcoal-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-smoke-500 focus:text-charcoal-950 focus:font-semibold focus:rounded-sm focus:shadow-xl text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      <main id="main-content" className="flex-1 w-full bg-charcoal-900 focus:outline-none" tabIndex={-1}>
        {currentPath === '/' && <HomePage onNavigate={handleNavigate} />}
        {currentPath === '/coaching' && <CoachingPage onNavigate={handleNavigate} />}
        {currentPath === '/about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPath === '/field-notes' && <FieldNotesPage onNavigate={handleNavigate} />}
        {currentPath === CANONICAL_APPLICATION_PATH && <ApplyPage onNavigate={handleNavigate} />}
        {currentPath === '/online/thank-you' && <ThankYouPage onNavigate={handleNavigate} />}
        {currentPath === '/training-room' && <TrainingRoomPage onNavigate={handleNavigate} />}
        {currentPath === '/member-login' && <MemberLoginPage onNavigate={handleNavigate} />}
        {currentPath === '/app' && <MemberLoginPage onNavigate={handleNavigate} />}
        {currentPath === '/coach' && <CoachPortalPage onNavigate={handleNavigate} />}
        {currentPath === '/contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPath === '/privacy' && <LegalPage type="privacy" onNavigate={handleNavigate} />}
        {currentPath === '/terms' && <LegalPage type="terms" onNavigate={handleNavigate} />}
        {currentPath === '/refund-policy' && <LegalPage type="refund-policy" onNavigate={handleNavigate} />}
        {currentPath === '/training-disclaimer' && <LegalPage type="training-disclaimer" onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
