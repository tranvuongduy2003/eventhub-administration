import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { EditPermissionDialog } from "@/components/permissions/edit-permission-dialog";
import { AddSubPermissionDialog } from "@/components/permissions/add-sub-permission-dialog";
import { DeletePermissionDialog } from "@/components/permissions/delete-permission-dialog";
import { FunctionType } from "@/types/function.type";

export function PermissionRow({
  permission,
  level,
}: {
  permission: FunctionType;
  level: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <div className="flex items-center">
            <div
              style={{ marginLeft: `${level * 24}px` }}
              className="flex items-center"
            >
              {permission.children && permission.children.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <ChevronRight
                    className={cn("h-4 w-4 transition-transform", {
                      "transform rotate-90": isExpanded,
                    })}
                  />
                </Button>
              )}
              {permission.name}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <code className="px-2 py-1 font-mono text-sm rounded-md bg-muted">
            {permission.id}
          </code>
        </TableCell>
        <TableCell>{permission.level}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <EditPermissionDialog permission={permission} />
            <AddSubPermissionDialog parentPermission={permission} />
            <DeletePermissionDialog permission={permission} />
          </div>
        </TableCell>
      </TableRow>
      {isExpanded &&
        permission.children?.map((child) => (
          <PermissionRow key={child.id} permission={child} level={level + 1} />
        ))}
    </>
  );
}
