import { FunctionType } from "./function.type";

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  permissions: FunctionType[];
}
