import { Role } from "@/types/role.type";
import { Permission } from "@/types/permission.type";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ChevronDown, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IUpdateRolePermissionsTabProps {
  selectedRole: Role | null;
}

export function UpdateRolePermissionsTab({
  selectedRole,
}: IUpdateRolePermissionsTabProps) {
  const { toast } = useToast();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    selectedRole?.permissions.map((p) => p.id) || []
  );
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    );
  };

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    let newPermissions = [...selectedPermissions];

    if (checked) {
      // Add the permission and all its children
      const addChildPermissions = (perm: Permission) => {
        newPermissions.push(perm.id);
        perm.children?.forEach(addChildPermissions);
      };
      addChildPermissions(permission);
    } else {
      // Remove the permission and all its children
      const removeChildPermissions = (perm: Permission) => {
        newPermissions = newPermissions.filter((id) => id !== perm.id);
        perm.children?.forEach(removeChildPermissions);
      };
      removeChildPermissions(permission);
    }

    setSelectedPermissions([...new Set(newPermissions)]);
  };

  const renderPermissionItem = (permission: Permission, indent: number = 0) => {
    const isChecked = selectedPermissions.includes(permission.id);
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
              renderPermissionItem(child, indent + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    // Handle permissions update
    console.log(selectedPermissions);
    toast({
      title: "Success",
      description: "Permissions updated successfully",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          {selectedRole?.permissions.map((permission) =>
            renderPermissionItem(permission)
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
