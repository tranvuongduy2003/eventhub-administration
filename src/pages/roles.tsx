import { CreateRoleDialog } from "@/components/roles/create-role-dialog";
import { RolesTable } from "@/components/roles/roles-table";
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
import { Role } from "@/types/role.type";
import { Search, SearchIcon } from "lucide-react";
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
    id: "content",
    name: "Content Management",
    level: 1,
    children: [
      {
        id: "content.create",
        name: "Create Content",
        level: 2,
      },
      {
        id: "content.moderate",
        name: "Moderate Content",
        level: 2,
        children: [
          {
            id: "content.moderate.approve",
            name: "Approve Content",
            level: 3,
          },
          {
            id: "content.moderate.reject",
            name: "Reject Content",
            level: 3,
          },
        ],
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    level: 1,
    children: [
      {
        id: "analytics.view",
        name: "View Reports",
        level: 2,
        children: [
          {
            id: "analytics.view.basic",
            name: "Basic Reports",
            level: 3,
          },
          {
            id: "analytics.view.advanced",
            name: "Advanced Reports",
            level: 3,
          },
        ],
      },
      {
        id: "analytics.export",
        name: "Export Data",
        level: 2,
      },
    ],
  },
];

const mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    displayName: "Administrator",
    description: "Full system access",
    creationTime: "2024-01-01T00:00:00Z",
    permissions: permissionsTree,
  },
  {
    id: 2,
    name: "user",
    displayName: "Standard User",
    description: "Basic user access",
    creationTime: "2024-01-01T00:00:00Z",
    permissions: [
      {
        id: "content",
        name: "Content Management",
        level: 1,
        children: [
          {
            id: "content.create",
            name: "Create Content",
            level: 2,
          },
        ],
      },
      {
        id: "analytics",
        name: "Analytics",
        level: 1,
        children: [
          {
            id: "analytics.view",
            name: "View Reports",
            level: 2,
            children: [
              {
                id: "analytics.view.basic",
                name: "Basic Reports",
                level: 3,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "moderator",
    displayName: "Content Moderator",
    description: "Can moderate user content",
    creationTime: "2024-01-15T00:00:00Z",
    permissions: [
      {
        id: "content",
        name: "Content Management",
        level: 1,
        children: [
          {
            id: "content.moderate",
            name: "Moderate Content",
            level: 2,
            children: [
              {
                id: "content.moderate.approve",
                name: "Approve Content",
                level: 3,
              },
              {
                id: "content.moderate.reject",
                name: "Reject Content",
                level: 3,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "analyst",
    displayName: "Data Analyst",
    description: "Access to analytics and reporting",
    creationTime: "2024-02-01T00:00:00Z",
    permissions: [
      {
        id: "analytics",
        name: "Analytics",
        level: 1,
        children: [
          {
            id: "analytics.view",
            name: "View Reports",
            level: 2,
            children: [
              {
                id: "analytics.view.basic",
                name: "Basic Reports",
                level: 3,
              },
              {
                id: "analytics.view.advanced",
                name: "Advanced Reports",
                level: 3,
              },
            ],
          },
          {
            id: "analytics.export",
            name: "Export Data",
            level: 2,
          },
        ],
      },
    ],
  },
];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setRoles(mockRoles);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-6 space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Roles</CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </div>
        <CreateRoleDialog />
      </CardHeader>
      <CardContent>
        <div className="flex items-center pb-4 space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
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

        <RolesTable roles={roles} />
      </CardContent>
    </Card>
  );
}
