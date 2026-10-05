import React, { useEffect, useState } from 'react';
import { PageRoute } from './types';
import { Header, Footer } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { CoachingPage } from './pages/CoachingPage';
import { AboutPage } from './pages/AboutPage';
import { FieldNotesPage } from './pages/FieldNotesPage';
import { ApplyPage, TrainingRoomPage } from './pages/ApplyPage';
import { LegalPage } from './pages/LegalPage';
import {
  captureUtmParams,
  INSTAGRAM_HANDLE,
  INSTAGRAM_TAKEOVER_CAMPAIGN,
  INSTAGRAM_TAKEOVER_CONTENT,
  SOCIAL_ACCOUNT,
  trackEvent,
} from './utils/analytics';

const INSTAGRAM_BIO_PATH = '/go/instagram';
const INSTAGRAM_BIO_EVENT_KEY = 'baseln_pending_instagram_bio_event';

const validPaths: PageRoute[] = [
  '/',
  '/coaching',
  '/about',
  '/field-notes',
  '/apply',
  '/training-room',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/training-disclaimer',
];

const resolvePath = (path: string): PageRoute => {
  if (path === '/how-it-works') return '/coaching';
  if (path === INSTAGRAM_BIO_PATH) return '/apply';
  return validPaths.includes(path as PageRoute) ? path as PageRoute : '/';
};

const redirectInstagramBioLink = (): boolean => {
  if (window.location.pathname !== INSTAGRAM_BIO_PATH) return false;

  // Keep the social entry route available for first-touch attribution before redirecting.
  window.sessionStorage.setItem('baseln_first_landing_override', window.location.pathname + window.location.search);
  window.sessionStorage.setItem(INSTAGRAM_BIO_EVENT_KEY, 'true');

  const params = new URLSearchParams(window.location.search);
  params.set('utm_source', params.get('utm_source') || 'instagram');
  params.set('utm_medium', params.get('utm_medium') || 'organic_social');
  params.set('utm_campaign', params.get('utm_campaign') || INSTAGRAM_TAKEOVER_CAMPAIGN);
  params.set('utm_content', params.get('utm_content') || INSTAGRAM_TAKEOVER_CONTENT);

  window.history.replaceState({}, '', `/apply?${params.toString()}`);
  return true;
};

const initialRoute = (): PageRoute => {
  // This runs before the Apply page can initialise its attribution-aware form state.
  redirectInstagramBioLink();
  captureUtmParams();
  return resolvePath(window.location.pathname);
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<PageRoute>(initialRoute);

  useEffect(() => {
    const syncPath = () => {
      const arrivedViaInstagramBio = redirectInstagramBioLink();

      // Captures first-touch attribution without overwriting it; later tagged visits are assists.
      captureUtmParams();

      const resolvedPath = resolvePath(window.location.pathname);
      setCurrentPath(resolvedPath);
      if (window.location.pathname !== resolvedPath) {
        window.history.replaceState({}, '', resolvedPath);
      }

      const shouldRecordBioView = arrivedViaInstagramBio || window.sessionStorage.getItem(INSTAGRAM_BIO_EVENT_KEY) === 'true';
      if (shouldRecordBioView) {
        trackEvent('instagram_takeover_profile_view', {
          social_account: SOCIAL_ACCOUNT,
          social_handle: INSTAGRAM_HANDLE,
          bio_route: INSTAGRAM_BIO_PATH,
          destination: '/apply',
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
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1 w-full bg-charcoal-900">
        {currentPath === '/' && <HomePage onNavigate={handleNavigate} />}
        {currentPath === '/coaching' && <CoachingPage onNavigate={handleNavigate} />}
        {currentPath === '/about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPath === '/field-notes' && <FieldNotesPage onNavigate={handleNavigate} />}
        {currentPath === '/apply' && <ApplyPage onNavigate={handleNavigate} />}
        {currentPath === '/training-room' && <TrainingRoomPage onNavigate={handleNavigate} />}
        {currentPath === '/privacy' && <LegalPage type="privacy" onNavigate={handleNavigate} />}
        {currentPath === '/terms' && <LegalPage type="terms" onNavigate={handleNavigate} />}
        {currentPath === '/refund-policy' && <LegalPage type="refund-policy" onNavigate={handleNavigate} />}
        {currentPath === '/training-disclaimer' && <LegalPage type="training-disclaimer" onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
