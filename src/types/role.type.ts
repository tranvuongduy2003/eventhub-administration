import { Permission } from "./permission.type";

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  permissions: Permission[];
}
