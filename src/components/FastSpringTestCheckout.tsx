import React, { useEffect, useState } from 'react';

const FASTSPRING_SCRIPT_ID = 'fsc-api';
const FASTSPRING_TEST_STOREFRONT = 'baseln.test.onfastspring.com/popup-baseln';
const FASTSPRING_SCRIPT_URL = 'https://sbl.onfastspring.com/sbl/1.0.9/fastspring-builder.min.js';

type ScriptState = 'loading' | 'ready' | 'error';
type FastSpringWindow = Window & typeof globalThis & {
  fastspring?: {
    builder?: {
      checkout?: () => void;
    };
  };
};

export const isFastSpringTestMode = (): boolean =>
  new URLSearchParams(window.location.search).get('fastspring') === 'test';

export const FastSpringTestCheckout: React.FC = () => {
  const [scriptState, setScriptState] = useState<ScriptState>('loading');

  useEffect(() => {
    const markReady = () => {
      const canOpenCheckout = Boolean((window as FastSpringWindow).fastspring?.builder?.checkout);
      setScriptState(canOpenCheckout ? 'ready' : 'error');
    };
    const markError = () => setScriptState('error');
    const existingScript = document.getElementById(FASTSPRING_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if ((window as FastSpringWindow).fastspring) {
        markReady();
        return undefined;
      }

      existingScript.addEventListener('load', markReady, { once: true });
      existingScript.addEventListener('error', markError, { once: true });
      return () => {
        existingScript.removeEventListener('load', markReady);
        existingScript.removeEventListener('error', markError);
      };
    }

    const script = document.createElement('script');
    script.id = FASTSPRING_SCRIPT_ID;
    script.src = FASTSPRING_SCRIPT_URL;
    script.type = 'text/javascript';
    script.setAttribute('data-storefront', FASTSPRING_TEST_STOREFRONT);
    script.addEventListener('load', markReady, { once: true });
    script.addEventListener('error', markError, { once: true });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', markReady);
      script.removeEventListener('error', markError);
    };
  }, []);

  const statusCopy = scriptState === 'ready'
    ? 'Test checkout connected. Use FastSpring test payment details only.'
    : scriptState === 'error'
      ? 'FastSpring test checkout could not initialise. Confirm the popup checkout, product link and staging-domain whitelist in FastSpring, then refresh.'
      : 'Connecting to the FastSpring test checkout…';

  const openCheckout = () => {
    const checkout = (window as FastSpringWindow).fastspring?.builder?.checkout;

    if (!checkout) {
      setScriptState('error');
      return;
    }

    try {
      checkout();
    } catch {
      setScriptState('error');
    }
  };

  return (
    <section id="fastspring-test" className="bg-charcoal-900 border-b border-white/5" aria-labelledby="fastspring-test-title">
      <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-10 sm:py-12">
        <div className="max-w-3xl border border-smoke-500/30 bg-charcoal-950 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-smoke-300 block mb-3">FASTSPRING / TEST MODE ONLY</span>
          <h2 id="fastspring-test-title" className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">CHECKOUT CONNECTION TEST.</h2>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-paper-300 font-light leading-relaxed">This private test panel opens the configured BASELN / 6 FastSpring popup in its test environment. It is not a live customer payment route and must not be used with a real card.</p>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={openCheckout}
              disabled={scriptState !== 'ready'}
              className="inline-flex w-full sm:w-auto items-center justify-center bg-smoke-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-charcoal-950 transition-colors hover:bg-smoke-400 disabled:cursor-not-allowed disabled:bg-paper-200/25 disabled:text-paper-200/60"
            >
              {scriptState === 'ready' ? 'Open FastSpring test checkout' : 'Preparing test checkout'}
            </button>
            <p className={`text-sm leading-relaxed ${scriptState === 'error' ? 'text-red-300' : 'text-paper-400'}`} aria-live="polite">{statusCopy}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
