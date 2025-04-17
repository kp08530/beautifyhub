
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
import BusinessAdvertisements from "./pages/BusinessAdvertisements";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import MyCollections from "./pages/MyCollections";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Messages from "./pages/Messages";

// Import dashboard pages
import DashboardUsers from "./pages/dashboard/Users";
import DashboardBusinesses from "./pages/dashboard/Businesses";
import DashboardAppointments from "./pages/dashboard/Appointments";
import DashboardReports from "./pages/dashboard/Reports";
import DashboardSettings from "./pages/dashboard/Settings";
import DashboardAdvertisements from "./pages/dashboard/Advertisements";
import DashboardNotifications from "./pages/dashboard/Notifications";

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
              <Route path="/pricing" element={<><Navbar /><Pricing /></>} />
              <Route path="/support" element={<><Navbar /><Support /></>} />
              <Route path="/my-collections" element={
                <ProtectedRoute>
                  <Navbar />
                  <MyCollections />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
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
              <Route path="/business-advertisements" element={
                <ProtectedRoute allowedRoles={['business']}>
                  <Navbar />
                  <BusinessAdvertisements />
                </ProtectedRoute>
              } />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardUsers />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/businesses" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardBusinesses />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/appointments" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardAppointments />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardReports />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardSettings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/advertisements" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardAdvertisements />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/notifications" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardNotifications />
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
