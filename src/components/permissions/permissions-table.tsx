import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Permission } from "@/types/permission.type";
import { PermissionRow } from "@/components/permissions/permisson-row";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { usePagination } from "@/hooks/use-pagination";
import { Activity, Settings } from "lucide-react";
import { Code } from "lucide-react";
import { User } from "lucide-react";

interface PermissionsTableProps {
  permissions: Permission[];
}

export function PermissionsTable({ permissions }: PermissionsTableProps) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedItems: paginatedPermissions,
    totalPages,
  } = usePagination({
    items: permissions,
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
                  <User className="w-4 h-4" />
                  Name
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Code className="w-4 h-4" />
                  ID
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4" />
                  Level
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  Actions
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPermissions.map((permission) => (
              <PermissionRow
                key={permission.id}
                permission={permission}
                level={0}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={permissions.length}
        totalPages={totalPages}
      />
    </div>
  );
}
