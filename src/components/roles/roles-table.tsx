import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role } from "@/types/role.type";
import { format } from "date-fns";
import { useState } from "react";
import { DeleteRoleDialog } from "./delete-role-dialog";
import { EditRoleDialog } from "./edit-role-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RolesTableProps {
  roles: Role[];
}

export function RolesTable({ roles }: RolesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(roles.length / itemsPerPage);

  const paginatedRoles = roles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        {/* Display current page information */}
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, roles.length)} of {roles.length}{" "}
          items
        </p>

        {/* Pagination controls */}
        <div className="flex-1 flex justify-center">
          <Pagination>
            <PaginationContent>
              {/* Previous page button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`transition-all duration-200 ${
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-muted"
                  }`}
                  aria-label="Go to previous page"
                />
              </PaginationItem>

              {/* Render page numbers - simplified view for 7 or fewer pages */}
              {totalPages <= 7 ? (
                [...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="transition-all duration-200"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              ) : (
                <>
                  {/* First 3 pages */}
                  {[...Array(3)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="transition-all duration-200"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* Ellipsis to indicate skipped pages */}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  {/* Last 3 pages */}
                  {[...Array(3)].map((_, i) => (
                    <PaginationItem key={totalPages - 2 + i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(totalPages - 2 + i)}
                        isActive={currentPage === totalPages - 2 + i}
                        className="transition-all duration-200"
                      >
                        {totalPages - 2 + i}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </>
              )}

              {/* Next page button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={`transition-all duration-200 ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-muted"
                  }`}
                  aria-label="Go to next page"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Items per page selector */}
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
