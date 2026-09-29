import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header, Footer } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { CoachingPage } from './pages/CoachingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { FieldNotesPage } from './pages/FieldNotesPage';
import { ApplyPage, TrainingRoomPage } from './pages/ApplyPage';
import { LegalPage } from './pages/LegalPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<PageRoute>('/');

  useEffect(() => {
    // Initial sync with URL path if present
    const path = window.location.pathname as PageRoute;
    const validPaths: PageRoute[] = [
      '/',
      '/coaching',
      '/how-it-works',
      '/about',
      '/field-notes',
      '/apply',
      '/training-room',
      '/privacy',
      '/terms',
    ];
    if (validPaths.includes(path)) {
      setCurrentPath(path);
    }

    const handlePopState = () => {
      const p = window.location.pathname as PageRoute;
      if (validPaths.includes(p)) {
        setCurrentPath(p);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: PageRoute) => {
    setCurrentPath(path);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-paper-200 flex flex-col font-sans selection:bg-smoke-500 selection:text-charcoal-950">
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPath === '/' && <HomePage onNavigate={handleNavigate} />}
        {currentPath === '/coaching' && <CoachingPage onNavigate={handleNavigate} />}
        {currentPath === '/how-it-works' && <HowItWorksPage onNavigate={handleNavigate} />}
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
