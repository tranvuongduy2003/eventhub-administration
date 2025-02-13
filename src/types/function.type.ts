export interface FunctionType {
  id: string;
  name: string;
  level: number;
  url: string;
  parentId: string;
  children: FunctionType[];
}
