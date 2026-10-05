import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react';
import { PageRoute } from '../types';
import { INSTAGRAM_HANDLE, SOCIAL_ACCOUNT, trackEvent } from '../utils/analytics';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, [mobileMenuOpen]);

  const navLinks: { label: string; href: PageRoute }[] = [
    { label: 'COACHING', href: '/coaching' },
    { label: 'ABOUT', href: '/about' },
    { label: 'FIELD NOTES', href: '/field-notes' },
  ];

  const handleNav = (href: PageRoute) => {
    if (href === '/apply') {
      trackEvent('consultation_booking', { source: 'header_cta' });
    }
    onNavigate(href);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-charcoal-900/95 backdrop-blur-md border-b border-white/5 py-4 shadow-xl'
            : 'bg-gradient-to-b from-charcoal-950/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          <button onClick={() => handleNav('/')} className="group flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-smoke-500 rounded-sm py-1" aria-label="BASELN home">
            <img src="/media/baseln-wordmark_ce64ccd9.png" alt="BASELN" className="h-5 sm:h-6 w-auto object-contain invert brightness-200 group-hover:brightness-250 transition-all" />
          </button>

          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[12px] tracking-widest font-medium text-paper-300">
            {navLinks.map((link) => {
              const active = currentPath === link.href;
              return <button key={link.href} onClick={() => handleNav(link.href)} className={`transition-colors py-1 hover:text-white uppercase relative ${active ? 'text-white font-semibold' : 'text-paper-400'}`}>
                {link.label}{active && <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-smoke-500 rounded-full" />}
              </button>;
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => handleNav('/training-room')} className="text-[12px] tracking-wider text-paper-400 hover:text-white px-3 py-2 transition-colors uppercase font-medium">Member Login</button>
            <button onClick={() => handleNav('/apply')} className="text-[12px] tracking-wider font-semibold uppercase bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-4 py-2.5 rounded-sm transition-all shadow-sm active:translate-y-[1px]">Apply for Coaching</button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => handleNav('/apply')} className="text-[11px] tracking-wider font-semibold uppercase bg-smoke-500 text-charcoal-950 px-3 py-1.5 rounded-sm">Apply</button>
            <button onClick={() => setMobileMenuOpen((open) => !open)} className="p-2 text-paper-200 hover:text-white focus:outline-none focus:ring-1 focus:ring-smoke-500 rounded" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] h-[100dvh] bg-charcoal-950 text-paper-200 isolate" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="h-full overflow-y-auto overscroll-contain">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-charcoal-950 px-5 py-5 shadow-[0_10px_30px_rgba(7,8,10,0.55)]">
              <button onClick={() => handleNav('/')} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-smoke-500 rounded-sm" aria-label="BASELN home">
                <img src="/media/baseln-wordmark_ce64ccd9.png" alt="BASELN" className="h-5 w-auto object-contain invert brightness-200" />
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => handleNav('/apply')} className="text-[11px] tracking-wider font-semibold uppercase bg-smoke-500 text-charcoal-950 px-3 py-2 rounded-sm">Apply</button>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-paper-100 hover:text-smoke-300 focus:outline-none focus-visible:ring-1 focus:ring-smoke-500 rounded" aria-label="Close navigation menu"><X size={27} /></button>
              </div>
            </div>

            <nav className="px-5 pt-8 pb-6" aria-label="Mobile primary navigation">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">Navigate</span>
              <div className="border-y border-white/10">
                {navLinks.map((link, index) => <button key={link.href} onClick={() => handleNav(link.href)} className={`w-full min-h-16 py-4 text-left flex items-center justify-between border-b border-white/10 last:border-b-0 transition-colors ${currentPath === link.href ? 'text-smoke-300' : 'text-white hover:text-smoke-300'}`}>
                  <span className="text-xl font-serif font-light">{link.label}</span>
                  <span className="flex items-center gap-3"><span className="text-[10px] font-mono text-paper-400">0{index + 1}</span><ChevronRight size={20} /></span>
                </button>)}
              </div>
            </nav>

            <div className="mx-5 border-t border-white/10 pt-6 pb-9 grid grid-cols-1 gap-3">
              <button onClick={() => handleNav('/training-room')} className="min-h-12 w-full text-left px-4 text-xs tracking-wider uppercase border border-white/15 text-paper-200 hover:bg-white/5 transition-colors rounded-sm">Member Login</button>
              <button onClick={() => handleNav('/apply')} className="min-h-13 w-full inline-flex items-center justify-center gap-3 text-xs tracking-widest font-semibold uppercase bg-smoke-500 text-charcoal-950 rounded-sm shadow-md active:scale-[0.99] transition-transform"><span>Apply for Private Coaching</span><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Footer: React.FC<{ onNavigate: (path: PageRoute) => void }> = ({ onNavigate }) => {
  const navigate = (path: PageRoute) => {
    onNavigate(path);
    window.scrollTo(0, 0);
  };

  const exploreLinks: { label: string; href: PageRoute }[] = [
    { label: 'Coaching', href: '/coaching' },
    { label: 'About Aian', href: '/about' },
    { label: 'Field Notes', href: '/field-notes' },
  ];

  return (
    <footer id="site-footer" className="bg-charcoal-950 border-t border-white/10 text-paper-400">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-white/10">
          <section className="py-6 sm:py-7 sm:pr-10 flex items-start">
            <img src="/media/baseln-wordmark_ce64ccd9.png" alt="BASELN" className="h-5 w-auto object-contain invert brightness-200" />
          </section>
          <section className="grid grid-cols-2 gap-7 py-6 sm:py-7 sm:pl-10 border-t sm:border-t-0 border-white/10">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-paper-200 mb-3">Explore</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {exploreLinks.map((link) => <li key={link.href}><button onClick={() => navigate(link.href)} className="hover:text-white transition-colors text-left">{link.label}</button></li>)}
              </ul>
            </div>
            <div className="text-right">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-paper-200 mb-3">Access</h4>
                <div className="space-y-2 text-xs sm:text-sm flex flex-col items-end">
                  <button onClick={() => navigate('/training-room')} className="hover:text-white transition-colors">Member Login</button>
                  <a
                    href="https://www.instagram.com/baseln_retreats/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('instagram_profile_click', { social_account: SOCIAL_ACCOUNT, social_handle: INSTAGRAM_HANDLE, placement: 'footer' })}
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="mailto:aian@baseln.co"
                    onClick={() => trackEvent('email_click', { recipient: 'aian@baseln.co', placement: 'footer' })}
                    className="text-smoke-400 hover:text-smoke-300 font-mono underline underline-offset-4 transition-colors"
                  >
                    aian@baseln.co
                  </a>
                </div>
              </div>
          </section>
        </div>

        <div className="border-t border-white/10 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-[10px] sm:text-xs text-paper-400/75">
          <span>© {new Date().getFullYear()} BASELN. Coached by Aian McLennan.</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-paper-200 underline underline-offset-2 transition-colors">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-paper-200 underline underline-offset-2 transition-colors">Terms</button>
            <button onClick={() => navigate('/refund-policy')} className="hover:text-paper-200 underline underline-offset-2 transition-colors">Refunds</button>
            <button onClick={() => navigate('/training-disclaimer')} className="hover:text-paper-200 underline underline-offset-2 transition-colors">Training disclaimer</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
