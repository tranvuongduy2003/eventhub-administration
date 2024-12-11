import { PermissionsTable } from "@/components/permissions/permissions-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Permission } from "@/types/permission.type";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const permissionsTree: Permission[] = [
  {
    id: "users",
    name: "Users Management",
    level: 1,
    children: [
      {
        id: "users.create",
        name: "Create Users",
        level: 2,
      },
      {
        id: "users.edit",
        name: "Edit Users",
        level: 2,
        children: [
          {
            id: "users.edit.profile",
            name: "Edit Profile",
            level: 3,
          },
          {
            id: "users.edit.roles",
            name: "Manage User Roles",
            level: 3,
          },
        ],
      },
      {
        id: "users.delete",
        name: "Delete Users",
        level: 2,
      },
    ],
  },
  {
    id: "roles",
    name: "Roles Management",
    level: 1,
    children: [
      {
        id: "roles.create",
        name: "Create Roles",
        level: 2,
      },
      {
        id: "roles.edit",
        name: "Edit Roles",
        level: 2,
      },
      {
        id: "roles.delete",
        name: "Delete Roles",
        level: 2,
      },
    ],
  },
  {
    id: "permissions",
    name: "Permissions Management",
    level: 1,
    children: [
      {
        id: "permissions.assign",
        name: "Assign Permissions",
        level: 2,
      },
      {
        id: "permissions.revoke",
        name: "Revoke Permissions",
        level: 2,
      },
    ],
  },
  {
    id: "audit",
    name: "Audit Logs",
    level: 1,
    children: [
      {
        id: "audit.view",
        name: "View Logs",
        level: 2,
      },
      {
        id: "audit.export",
        name: "Export Logs",
        level: 2,
      },
    ],
  },
];

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    setPermissions(permissionsTree);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-6 space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Permissions</CardTitle>
          <CardDescription>
            Manage system permissions and access control
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center pb-4 space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search permissions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <PermissionsTable permissions={permissions} />
      </CardContent>
    </Card>
  );
}
