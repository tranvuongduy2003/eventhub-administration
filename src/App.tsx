import { Settings, Users } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import ProtectedLayout from "@/components/layouts/protected-layout";
import AuditLogs from "@/pages/audit-logs";
import Permissions from "@/pages/permissions";
import Roles from "@/pages/roles";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
