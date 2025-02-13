import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import functionService from "@/services/function.service";
import { FunctionType } from "@/types/function.type";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  LucideLoader,
} from "lucide-react";
import { useEffect, useState } from "react";

interface IUpdateRolePermissionsTabProps {
  roleFunctions: FunctionType[];
}

export function UpdateRolePermissionsTab({
  roleFunctions,
}: IUpdateRolePermissionsTabProps) {
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    roleFunctions.map((r) => r.id)
  );

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

  const { toast } = useToast();

  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    );
  };

  const handlePermissionChange = (
    permission: FunctionType,
    checked: boolean
  ) => {
    let newPermissions = [...selectedPermissions];

    if (checked) {
      // Add the permission and all its children
      const addChildPermissions = (perm: FunctionType) => {
        newPermissions.push(perm.id);
        perm.children?.forEach(addChildPermissions);
      };
      addChildPermissions(permission);
    } else {
      // Remove the permission and all its children
      const removeChildPermissions = (perm: FunctionType) => {
        newPermissions = newPermissions.filter((id) => id !== perm.id);
        perm.children?.forEach(removeChildPermissions);
      };
      removeChildPermissions(permission);
    }

    setSelectedPermissions([...new Set(newPermissions)]);
  };

  const renderPermissionItem = (
    permissions: string[],
    permission: FunctionType,
    indent: number = 0
  ) => {
    const isChecked = permissions.includes(permission.id);
    const hasChildren = permission.children && permission.children.length > 0;
    const isExpanded = expandedNodes.includes(permission.id);

    return (
      <div key={permission.id} className="py-1">
        <div
          className="flex items-center space-x-2 hover:bg-gray-100 rounded-md p-1 transition-colors"
          style={{ marginLeft: `${indent * 16}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleNode(permission.id)}
              className="w-4 h-4 flex items-center justify-center"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          <Checkbox
            id={permission.id}
            checked={isChecked}
            onCheckedChange={(checked) =>
              handlePermissionChange(permission, !!checked)
            }
            className="data-[state=checked]:bg-blue-600"
          />
          <Label
            htmlFor={permission.id}
            className="flex-1 cursor-pointer text-sm font-medium"
          >
            {permission.name}
          </Label>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {permission.children?.map((child) =>
              renderPermissionItem(
                permission.children.map((c) => c.id),
                child,
                indent + 1
              )
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    // Handle permissions update
    toast({
      title: "Success",
      description: "Permissions updated successfully",
    });
  };

  return isLoading ? (
    <div className="w-full flex items-center justify-center">
      <LucideLoader className="animate-spin m-8" />
    </div>
  ) : (
    <div className="space-y-4">
      <Card className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          {functions.map((roleFunction) =>
            renderPermissionItem(selectedPermissions, roleFunction)
          )}
        </ScrollArea>
      </Card>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-yellow-600">
          <AlertTriangle className="h-4 w-4" />
          <p>
            <strong>Warning: </strong>
            Changes to your own role require a page reload.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="w-32">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
