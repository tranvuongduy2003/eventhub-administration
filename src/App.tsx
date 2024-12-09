import MainLayout from "@/components/layouts/main-layout";
import ProtectedLayout from "@/components/layouts/protected-layout";
import AuditLogsPage from "@/pages/audit-logs";
import DashboardPage from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/not-found";
import PermissionsPage from "@/pages/permissions";
import RolesPage from "@/pages/roles";
import SecuritySettingsPage from "@/pages/security-settings";
import SettingsPage from "@/pages/settings";
import UsersPage from "@/pages/users";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<MainLayout />}>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/audit-logs" element={<AuditLogsPage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
          <Route path="/security-settings" element={<SecuritySettingsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
