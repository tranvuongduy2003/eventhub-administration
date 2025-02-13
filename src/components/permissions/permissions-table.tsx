import { PermissionRow } from "@/components/permissions/permisson-row";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import functionService from "@/services/function.service";
import { FunctionType } from "@/types/function.type";
import { Activity, Code, LucideLoader, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";

export function PermissionsTable() {
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const items = await functionService.getFunctions();
        setFunctions(items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
              {functions.map((permission) => (
                <PermissionRow
                  key={permission.id}
                  permission={permission}
                  level={0}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
