import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initAnalyticsAndSEO } from './utils/seoAnalytics';

// Initialize Search Console & Google Analytics
initAnalyticsAndSEO();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

