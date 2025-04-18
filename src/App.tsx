
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Businesses from "./pages/Businesses";
import BusinessDetail from "./pages/BusinessDetail";
import BusinessSignup from "./pages/BusinessSignup";
import Services from "./pages/Services";
import BusinessProfile from "./pages/BusinessProfile";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import BusinessesPage from "./pages/dashboard/Businesses";
import UsersPage from "./pages/dashboard/Users";
import AppointmentsPage from "./pages/dashboard/Appointments";
import AdvertisementsPage from "./pages/dashboard/Advertisements";
import SettingsPage from "./pages/dashboard/Settings";
import PermissionsPage from "./pages/dashboard/Permissions";
import ReportsPage from "./pages/dashboard/Reports";
import NotificationsPage from "./pages/dashboard/Notifications";
import Portfolios from "./pages/Portfolios";
import BusinessAdvertisements from "./pages/BusinessAdvertisements";
import MyCollections from "./pages/MyCollections";
import Messages from "./pages/Messages";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Search from "./pages/Search";
import Pricing from "./pages/Pricing";
import ReportAnalysisPage from "./pages/dashboard/ReportAnalysis";
import SystemLogsPage from "./pages/dashboard/SystemLogs";
import DataManagementPage from "./pages/dashboard/DataManagement";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/business" element={<BusinessSignup />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/business-profile" element={<BusinessProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/businesses" element={<BusinessesPage />} />
            <Route path="/dashboard/users" element={<UsersPage />} />
            <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
            <Route path="/dashboard/advertisements" element={<AdvertisementsPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/permissions" element={<PermissionsPage />} />
            <Route path="/dashboard/reports" element={<ReportsPage />} />
            <Route path="/dashboard/notifications" element={<NotificationsPage />} />
            <Route path="/dashboard/report-analysis" element={<ReportAnalysisPage />} />
            <Route path="/dashboard/system-logs" element={<SystemLogsPage />} />
            <Route path="/dashboard/data-management" element={<DataManagementPage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/business-advertisements" element={<BusinessAdvertisements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/collections" element={<MyCollections />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
          
          {/* Static Pages */}
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
