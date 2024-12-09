import { DeleteRoleDialog } from "@/components/roles/delete-role-dialog";
import { EditRoleDialog } from "@/components/roles/edit-role-dialog";
import { Badge } from "@/components/ui/badge";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/hooks/use-pagination";
import { Role } from "@/types/role.type";
import { format } from "date-fns";

interface RolesTableProps {
  roles: Role[];
}

export function RolesTable({ roles }: RolesTableProps) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedItems: paginatedRoles,
    totalPages,
  } = usePagination({
    items: roles,
    initialItemsPerPage: 10,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[150px]">Role Name</TableHead>
              <TableHead className="w-[150px]">Display Name</TableHead>
              <TableHead className="w-[300px]">Description</TableHead>
              <TableHead className="w-[150px]">Creation Time</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRoles.map((role) => (
              <TableRow key={role.id} className="hover:bg-muted/50">
                <TableCell>
                  <Badge variant="outline">{role.name}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {role.displayName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {role.description || "No description"}
                </TableCell>
                <TableCell>
                  {format(new Date(role.creationTime), "PPP")}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-2">
                    <EditRoleDialog role={role} />
                    <DeleteRoleDialog role={role} />
                  </div>
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
        totalItems={roles.length}
        totalPages={totalPages}
      />
    </div>
  );
}
