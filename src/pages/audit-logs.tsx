import { AuditLogFilters } from "@/components/audit-log/audit-log-filters";
import { AuditLogsTable } from "@/components/audit-log/audit-logs-table";
import { ExcelExportDialog } from "@/components/audit-log/excel-export-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuditLog } from "@/types/audit-log.type";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    time: new Date("2024-01-15T08:30:00"),
    userId: "1",
    userName: "john.doe",
    service: "Authentication",
    action: "Login",
    duration: "150ms",
    ipAddress: "192.168.1.1",
    browser: "Chrome 120.0.0",
    parameters: "method=password",
  },
  {
    id: "2",
    time: new Date("2024-01-15T09:15:00"),
    userId: "2",
    userName: "jane.smith",
    service: "UserManagement",
    action: "UpdateProfile",
    duration: "250ms",
    ipAddress: "192.168.1.2",
    browser: "Firefox 121.0",
    parameters: "fields=email,phone",
  },
  {
    id: "3",
    time: new Date("2024-01-15T10:00:00"),
    userId: "1",
    userName: "john.doe",
    service: "UserManagement",
    action: "CreateUser",
    duration: "350ms",
    ipAddress: "192.168.1.1",
    browser: "Chrome 120.0.0",
    parameters: "role=user",
  },
  {
    id: "4",
    time: new Date("2024-01-15T11:30:00"),
    userId: "3",
    userName: "mike.j",
    service: "Authentication",
    action: "ResetPassword",
    duration: "200ms",
    ipAddress: "192.168.1.3",
    browser: "Safari 17.2",
    parameters: "method=email",
  },
  {
    id: "5",
    time: new Date("2024-01-15T13:45:00"),
    userId: "2",
    userName: "jane.smith",
    service: "RoleManagement",
    action: "UpdatePermissions",
    duration: "300ms",
    ipAddress: "192.168.1.2",
    browser: "Firefox 121.0",
    parameters: "role=admin",
  },
];

export default function AuditLogsPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>();

  useEffect(() => {
    setAuditLogs(mockAuditLogs);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-6 space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Audit Logs</CardTitle>
          <CardDescription>View and export system audit logs</CardDescription>
        </div>
        <div className="flex justify-end space-x-2">
          <ExcelExportDialog />
          <Button variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AuditLogFilters
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <AuditLogsTable logs={auditLogs || []} />
        </div>
      </CardContent>
    </Card>
  );
}
