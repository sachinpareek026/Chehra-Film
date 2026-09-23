import React, { StrictMode, Component, ReactNode, ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initAnalyticsAndSEO } from './utils/seoAnalytics';

// Initialize Search Console & Google Analytics
initAnalyticsAndSEO();

// Clear legacy caches and service workers to guarantee immediate fresh public view
if (typeof window !== 'undefined') {
  try {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister());
      });
    }
  } catch (e) {
    // Ignore in unsupported environments
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Chehra Films App Error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#05070B',
          color: '#EDE8DF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '480px',
            backgroundColor: '#080E1C',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '32px 24px',
            borderRadius: '4px'
          }}>
            <h1 style={{
              fontSize: '18px',
              fontFamily: 'serif',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#FBBF24',
              marginBottom: '12px'
            }}>
              CHEHRA FILMS
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#94A3B8',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              The cinema expedition portal encountered a temporary loading issue. Refresh to resume uninterrupted.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#EAB308',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/';
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: '#EDE8DF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
);

