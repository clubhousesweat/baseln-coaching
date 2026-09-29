import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; href: PageRoute }[] = [
    { label: 'COACHING', href: '/coaching' },
    { label: 'HOW IT WORKS', href: '/how-it-works' },
    { label: 'ABOUT', href: '/about' },
    { label: 'FIELD NOTES', href: '/field-notes' },
  ];

  const handleNav = (href: PageRoute) => {
    onNavigate(href);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-charcoal-900/95 backdrop-blur-md border-b border-white/5 py-4 shadow-xl'
          : 'bg-gradient-to-b from-charcoal-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand wordmark */}
        <button
          onClick={() => handleNav('/')}
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-smoke-500 rounded-sm py-1"
          aria-label="BASELN home"
        >
          <img
            src="/media/baseln-wordmark_ce64ccd9.png"
            alt="BASELN"
            className="h-5 sm:h-6 w-auto object-contain invert brightness-200 group-hover:brightness-250 transition-all"
          />
          <span className="hidden lg:inline-block text-[10px] tracking-widest text-smoke-400 font-mono pl-2 border-l border-white/10 uppercase">
            Private Online Coaching
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[12px] tracking-widest font-medium text-paper-300">
          {navLinks.map((link) => {
            const active = currentPath === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`transition-colors py-1 hover:text-white uppercase relative ${
                  active ? 'text-white font-semibold' : 'text-paper-400'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-smoke-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNav('/training-room')}
            className="text-[12px] tracking-wider text-paper-400 hover:text-white px-3 py-2 transition-colors uppercase font-medium"
          >
            Member Login
          </button>
          <button
            onClick={() => handleNav('/apply')}
            className="text-[12px] tracking-wider font-semibold uppercase bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-4 py-2.5 rounded-sm transition-all shadow-sm active:translate-y-[1px]"
          >
            Apply for Coaching
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => handleNav('/apply')}
            className="text-[11px] tracking-wider font-semibold uppercase bg-smoke-500 text-charcoal-950 px-3 py-1.5 rounded-sm"
          >
            Apply
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-paper-200 hover:text-white focus:outline-none focus:ring-1 focus:ring-smoke-500 rounded"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-charcoal-900/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 text-base font-medium tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`text-left py-2 border-b border-white/5 flex items-center justify-between uppercase ${
                  currentPath === link.href ? 'text-smoke-400 font-semibold' : 'text-paper-300'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight size={18} className="text-paper-400/50" />
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => handleNav('/training-room')}
              className="w-full text-center py-3 text-sm tracking-wider uppercase border border-white/10 text-paper-300 rounded-sm hover:bg-white/5 transition-colors"
            >
              Member Login (Training Room)
            </button>
            <button
              onClick={() => handleNav('/apply')}
              className="w-full text-center py-3.5 text-sm tracking-widest font-semibold uppercase bg-smoke-500 text-charcoal-950 rounded-sm shadow-md active:scale-[0.99] transition-transform"
            >
              Apply for Private Coaching
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC<{ onNavigate: (path: PageRoute) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-charcoal-950 border-t border-white/10 pt-16 pb-12 text-paper-400 text-sm">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-14">
          <div className="md:col-span-2 space-y-4">
            <img
              src="/media/baseln-wordmark_ce64ccd9.png"
              alt="BASELN"
              className="h-6 w-auto object-contain invert brightness-200"
            />
            <p className="text-paper-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Private online coaching with Aian McLennan. Individual training prescription, clear nutrition guidance, and regular hands-on review.
            </p>
            <div className="pt-2 text-xs text-smoke-400 font-mono tracking-wider">
              NOT MADE FOR EVERYONE. Made for you.
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('/coaching'); window.scrollTo(0,0); }}
                  className="hover:text-white transition-colors"
                >
                  Coaching & BASELN / 6
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/how-it-works'); window.scrollTo(0,0); }}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/about'); window.scrollTo(0,0); }}
                  className="hover:text-white transition-colors"
                >
                  Meet Aian McLennan
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/field-notes'); window.scrollTo(0,0); }}
                  className="hover:text-white transition-colors"
                >
                  Field Notes (Articles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/training-room'); window.scrollTo(0,0); }}
                  className="hover:text-white transition-colors"
                >
                  Member Training Room
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Direct Contact
            </h4>
            <p className="text-xs sm:text-sm text-paper-400 mb-3">
              Enquiries & Private Coaching Briefs:
            </p>
            <a
              href="mailto:aian@baseln.co"
              className="text-smoke-400 hover:text-smoke-300 font-mono text-sm underline underline-offset-4"
            >
              aian@baseln.co
            </a>
            <div className="mt-5">
              <button
                onClick={() => { onNavigate('/apply'); window.scrollTo(0,0); }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-white px-3.5 py-2 rounded-sm transition-colors"
              >
                <span>Start Application</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper-400/70">
          <div>
            © {new Date().getFullYear()} BASELN. All rights reserved. Coached by Aian McLennan.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => { onNavigate('/privacy'); window.scrollTo(0,0); }}
              className="hover:text-paper-300 underline underline-offset-2"
            >
              Privacy Notice
            </button>
            <button
              onClick={() => { onNavigate('/terms'); window.scrollTo(0,0); }}
              className="hover:text-paper-300 underline underline-offset-2"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
