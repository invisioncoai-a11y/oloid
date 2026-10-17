import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';
import { HomePage } from '../pages/HomePage';

// Lazy-loaded pages for optimal code splitting
const AboutPage = lazy(() => import('../pages/AboutPage'));
const MissionPage = lazy(() => import('../pages/MissionPage'));
const PartnersPage = lazy(() => import('../pages/PartnersPage'));
const ProductsServicesPage = lazy(() => import('../pages/ProductsServicesPage'));
const ProductServiceDetailPage = lazy(() => import('../pages/ProductServiceDetailPage'));
const NewsPage = lazy(() => import('../pages/NewsPage'));
const NewsDetailPage = lazy(() => import('../pages/NewsDetailPage'));
const CareersPage = lazy(() => import('../pages/CareersPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const SitemapPage = lazy(() => import('../pages/SitemapPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-brand-primary)'
    }}>
      <div style={{
        width: 36,
        height: 36,
        border: '3px solid var(--color-brand-primary-light)',
        borderTopColor: 'var(--color-brand-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        )
      },
      {
        path: 'mission',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MissionPage />
          </Suspense>
        )
      },
      {
        path: 'partners',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PartnersPage />
          </Suspense>
        )
      },
      {
        path: 'products-services',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductsServicesPage />
          </Suspense>
        )
      },
      {
        path: 'products-services/:slug',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductServiceDetailPage />
          </Suspense>
        )
      },
      {
        path: 'news',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewsPage />
          </Suspense>
        )
      },
      {
        path: 'news/:slug',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewsDetailPage />
          </Suspense>
        )
      },
      {
        path: 'careers',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CareersPage />
          </Suspense>
        )
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        )
      },
      {
        path: 'sitemap',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SitemapPage />
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        )
      }
    ]
  }
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;

