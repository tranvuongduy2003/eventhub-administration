import { Permission } from "./permission.type";

export interface Role {
  id: number;
  name: string;
  displayName: string;
  description: string;
  creationTime: string;
  permissions: Permission[];
}
