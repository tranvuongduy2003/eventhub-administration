import { CustomPagination } from "@/components/ui/custom-pagination";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditLog } from "@/types/audit-log.type";
import { format } from "date-fns";
import {
  Activity,
  Chrome,
  Clock,
  Code,
  Globe,
  Server,
  Timer,
  User,
} from "lucide-react";
import { usePagination } from "@/hooks/use-pagination";

export function AuditLogsTable({ logs }: { logs: AuditLog[] }) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedItems: paginatedLogs,
    totalPages,
  } = usePagination({
    items: logs,
    initialItemsPerPage: 10,
  });

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  Time
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  User
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Server className="w-4 h-4" />
                  Service
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4" />
                  Action
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Timer className="w-4 h-4" />
                  Duration
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4" />
                  IP Address
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Chrome className="w-4 h-4" />
                  Browser
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Code className="w-4 h-4" />
                  Parameters
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/50">
                <TableCell className="p-3 font-medium">
                  {format(log.time, "PPP HH:mm:ss")}
                </TableCell>
                <TableCell className="p-3">
                  <Badge variant="outline" className="px-3 py-1 font-medium">
                    {log.userName}
                  </Badge>
                </TableCell>
                <TableCell className="p-3">
                  <Badge variant="secondary" className="px-3 py-1">
                    {log.service}
                  </Badge>
                </TableCell>
                <TableCell className="p-3">
                  <Badge className="px-3 py-1">{log.action}</Badge>
                </TableCell>
                <TableCell className="p-3 font-mono">{log.duration}</TableCell>
                <TableCell className="p-3 font-mono">{log.ipAddress}</TableCell>
                <TableCell className="p-3">{log.browser}</TableCell>
                <TableCell className="p-3">
                  <code className="px-3 py-1 rounded bg-muted">
                    {log.parameters}
                  </code>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={logs.length}
        totalPages={totalPages}
      />
    </div>
  );
}
