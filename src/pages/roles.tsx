import { CreateRoleDialog } from "@/components/roles/create-role-dialog";
import { RolesTable } from "@/components/roles/roles-table";
import { SearchBar } from "@/components/ui/search-bar";
import { useEffect, useState } from "react";
import { Permission } from "@/types/permission.type";
import { Role } from "@/types/role.type";

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
    isStatic: true,
    isDefault: false,
    creationTime: "2024-01-01T00:00:00Z",
    permissions: permissionsTree,
  },
  {
    id: 2,
    name: "user",
    displayName: "Standard User",
    description: "Basic user access",
    isStatic: true,
    isDefault: true,
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
    isStatic: false,
    isDefault: false,
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
    isStatic: false,
    isDefault: false,
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

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setRoles(mockRoles);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        <CreateRoleDialog />
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <RolesTable roles={roles} />
    </div>
  );
}
