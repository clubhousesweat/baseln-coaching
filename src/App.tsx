import React, { useEffect, useState } from 'react';
import { PageRoute } from './types';
import { Header, Footer } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { CoachingPage } from './pages/CoachingPage';
import { AboutPage } from './pages/AboutPage';
import { FieldNotesPage } from './pages/FieldNotesPage';
import { ApplyPage, TrainingRoomPage } from './pages/ApplyPage';
import { LegalPage } from './pages/LegalPage';

const validPaths: PageRoute[] = [
  '/',
  '/coaching',
  '/about',
  '/field-notes',
  '/apply',
  '/training-room',
  '/privacy',
  '/terms',
];

const resolvePath = (path: string): PageRoute => {
  if (path === '/how-it-works') return '/coaching';
  return validPaths.includes(path as PageRoute) ? path as PageRoute : '/';
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<PageRoute>(() => resolvePath(window.location.pathname));

  useEffect(() => {
    const syncPath = () => {
      const resolvedPath = resolvePath(window.location.pathname);
      setCurrentPath(resolvedPath);
      if (window.location.pathname !== resolvedPath) window.history.replaceState({}, '', resolvedPath);
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
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
