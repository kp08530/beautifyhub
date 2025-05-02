
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import { default as HomePage } from './pages/Index';
import Dashboard from './pages/Dashboard';
import BusinessesPage from './pages/dashboard/Businesses';
import UsersPage from './pages/dashboard/Users';
import SettingsPage from './pages/dashboard/Settings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PricingPage from './pages/Pricing';
import SupportPage from './pages/Support';
import BusinessDetailsPage from './pages/BusinessDetail';
import ServicesPage from './pages/Services';
import PortfoliosPage from './pages/Portfolios';
import FAQ from './pages/FAQ';
import PaymentSuccess from './pages/PaymentSuccess';
import BusinessPermissionsPage from './pages/dashboard/BusinessPermissions';
import AppointmentsPage from './pages/dashboard/Appointments';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/businesses/:id" element={<BusinessDetailsPage />} />
              <Route path="/businesses" element={<BusinessesPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolios" element={<PortfoliosPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/dashboard/businesses" element={<PrivateRoute><BusinessesPage /></PrivateRoute>} />
              <Route path="/dashboard/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
              <Route path="/dashboard/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
              <Route path="/dashboard/business-permissions" element={<PrivateRoute><BusinessPermissionsPage /></PrivateRoute>} />
              <Route path="/dashboard/appointments" element={<PrivateRoute><AppointmentsPage /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
