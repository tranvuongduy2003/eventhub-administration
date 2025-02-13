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
import roleService from "@/services/role.service";
import { PaginationMetadata } from "@/types/common.type";
import { Role } from "@/types/role.type";
import { format } from "date-fns";
import {
  Clock,
  FileText,
  LucideLoader,
  Settings,
  Tag,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface RolesTableProps {
  searchTerm?: string;
}

export function RolesTable({ searchTerm }: RolesTableProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<PaginationMetadata>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { items, metadata } = await roleService.getPaginatedRoles({
          page: currentPage,
          size: itemsPerPage,
          ...(searchTerm
            ? {
                searches: [{ searchBy: "name", searchValue: searchTerm }],
              }
            : {}),
        });
        setRoles(items);
        setMeta(metadata);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage, itemsPerPage, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <LucideLoader className="animate-spin m-8" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    Role Name
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4" />
                    Display Name
                  </div>
                </TableHead>
                <TableHead className="w-[300px] font-semibold">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4" />
                    Description
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4" />
                    Creation Time
                  </div>
                </TableHead>
                <TableHead className="w-[100px] text-right font-semibold">
                  <div className="flex items-center justify-end gap-3">
                    <Settings className="w-4 h-4" />
                    Actions
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Badge variant="outline">{role.name}</Badge>
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    {role.name.toLowerCase()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {role.description || "No description"}
                  </TableCell>
                  <TableCell>
                    {format(new Date(role.createdAt), "PPP")}
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
        )}
      </div>
      <CustomPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={meta?.totalCount || 0}
        totalPages={meta?.totalPages}
      />
    </div>
  );
}
