import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './Layout';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import AdminLayout from '../components/admin/AdminLayout';

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

// Admin pages
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const PropertyForm = lazy(() => import('../pages/admin/PropertyForm'));

export const router = createBrowserRouter([
  // Public Customer Facing Routes
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

  // Dedicated Admin Authentication
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  // Protected Admin Portal (Irfan Umri only)
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/properties',
    element: <Navigate to="/admin" replace />,
  },
  {
    path: '/admin/properties/new',
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <PropertyForm />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/properties/:id/edit',
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <PropertyForm />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
]);
