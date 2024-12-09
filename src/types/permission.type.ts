export interface Permission {
  id: string;
  name: string;
  level: number;
  children?: Permission[];
}
