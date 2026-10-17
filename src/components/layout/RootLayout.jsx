import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../navigation/Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ErrorBoundary } from './ErrorBoundary';

export function RootLayout() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

export default RootLayout;

