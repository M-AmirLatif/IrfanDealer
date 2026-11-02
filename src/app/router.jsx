import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './Layout';
import NotFound from '../pages/NotFound';

// Lazy-loaded pages for optimized code splitting
const Home = lazy(() => import('../pages/Home'));
const Properties = lazy(() => import('../pages/Properties'));
const PropertyDetails = lazy(() => import('../pages/PropertyDetails'));
const Areas = lazy(() => import('../pages/Areas'));
const AreaDetails = lazy(() => import('../pages/AreaDetails'));
const Dealers = lazy(() => import('../pages/Dealers'));
const DealerProfile = lazy(() => import('../pages/DealerProfile'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Layout>
        <NotFound />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'properties',
        element: <Properties />,
      },
      {
        path: 'properties/:slug',
        element: <PropertyDetails />,
      },
      {
        path: 'areas',
        element: <Areas />,
      },
      {
        path: 'areas/:areaSlug',
        element: <AreaDetails />,
      },
      {
        path: 'dealers',
        element: <Dealers />,
      },
      {
        path: 'dealers/:dealerSlug',
        element: <DealerProfile />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      // Shortcuts
      {
        path: 'buy',
        element: <Navigate to="/properties?listingType=sale" replace />,
      },
      {
        path: 'rent',
        element: <Navigate to="/properties?listingType=rent" replace />,
      },
      // 404 Catch-all
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
