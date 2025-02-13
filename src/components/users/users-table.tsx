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
import { EditUserDialog } from "@/components/users/edit-user-dialog";
import { UserStatus } from "@/enums/user-status.enum";
import userService from "@/services/user.service";
import { PaginationMetadata } from "@/types/common.type";
import { User } from "@/types/user.type";
import { format } from "date-fns";
import {
  Activity,
  AtSign,
  Clock,
  LucideLoader,
  Mail,
  Phone,
  Settings,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface IUsersTableProps {
  searchTerm?: string;
}

export function UsersTable({ searchTerm }: IUsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<PaginationMetadata>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { items, metadata } = await userService.getPaginatedUsers({
          page: currentPage,
          size: itemsPerPage,
          ...(searchTerm
            ? {
                searches: [
                  { searchBy: "fullName", searchValue: searchTerm },
                  { searchBy: "email", searchValue: searchTerm },
                  { searchBy: "userName", searchValue: searchTerm },
                ],
              }
            : {}),
        });
        setUsers(items);
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
                    <UserIcon className="w-4 h-4" />
                    Full Name
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <AtSign className="w-4 h-4" />
                    Username
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                </TableHead>
                <TableHead className="w-[100px] font-semibold">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4" />
                    Status
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4" />
                    Roles
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-semibold">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4" />
                    Created At
                  </div>
                </TableHead>
                <TableHead className="w-[100px] font-semibold text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Settings className="w-4 h-4" />
                    Actions
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.phoneNumber || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === UserStatus.Active
                          ? "success"
                          : "destructive"
                      }
                      className="capitalize"
                    >
                      {user.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <Badge key={role} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{format(user.createdAt, "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <EditUserDialog userId={user.id} />
                      {/* <DeleteUserDialog user={user} /> */}
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
