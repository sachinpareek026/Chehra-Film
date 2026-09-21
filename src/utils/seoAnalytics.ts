/**
 * Automated Google Analytics (GA4) & Google Search Console verification booster
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function initAnalyticsAndSEO(): void {
  try {
    // 1. Google Search Console Verification Meta Tag injection if provided in env
    const verificationKey = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    if (verificationKey && typeof verificationKey === 'string' && verificationKey.trim().length > 0) {
      let meta = document.querySelector('meta[name="google-site-verification"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', verificationKey.trim());
    }

    // 2. Google Analytics 4 (GA4) initialization
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (
      measurementId &&
      typeof measurementId === 'string' &&
      measurementId.startsWith('G-')
    ) {
      window.dataLayer = window.dataLayer || [];
      window.gtag =
        window.gtag ||
        function () {
          window.dataLayer.push(arguments);
        };

      // Check if script already injected
      const existingScript = document.querySelector(
        `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
      );
      if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
          page_path: window.location.pathname + window.location.hash,
        });
      }
    }
  } catch (err) {
    console.warn('SEO & Analytics init notice:', err);
  }
}
