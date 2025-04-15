
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Businesses from "./pages/Businesses";
import Services from "./pages/Services";
import Portfolios from "./pages/Portfolios";
import BusinessDetail from "./pages/BusinessDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import BusinessSignup from "./pages/BusinessSignup";
import BusinessProfile from "./pages/BusinessProfile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<><Navbar /><Index /></>} />
              <Route path="/businesses" element={<><Navbar /><Businesses /></>} />
              <Route path="/services" element={<><Navbar /><Services /></>} />
              <Route path="/portfolios" element={<><Navbar /><Portfolios /></>} />
              <Route path="/business/:id" element={<><Navbar /><BusinessDetail /></>} />
              <Route path="/login" element={<><Navbar /><Login /></>} />
              <Route path="/register" element={<><Navbar /><Register /></>} />
              <Route path="/business-signup" element={<><Navbar /><BusinessSignup /></>} />
              <Route path="/terms" element={<><Navbar /><Terms /></>} />
              <Route path="/privacy" element={<><Navbar /><Privacy /></>} />
              <Route path="/search" element={<><Navbar /><Search /></>} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Navbar />
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/appointments" element={
                <ProtectedRoute>
                  <Navbar />
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="/business-profile" element={
                <ProtectedRoute allowedRoles={['business']}>
                  <Navbar />
                  <BusinessProfile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<><Navbar /><NotFound /></>} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
