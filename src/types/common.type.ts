import { OrderDirection } from "@/enums/order-direction.enum";

export interface Order {
  orderBy: string | null;
  orderDirection: OrderDirection;
}

export interface Search {
  searchBy: string | null;
  searchValue: string | null;
}

export interface PaginationFilter {
  page: number;
  size: number;
  orders: Order[];
  searches: Search[];
  takeAll: boolean;
}

export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  takeAll: boolean;
  pageSize: number;
  totalCount: number;
  payloadSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface Pagination<T> {
  items: T[];
  metadata: PaginationMetadata;
}

export interface PaginationWithCustomMetadata<T, TMetadata> {
  items: T[];
  metadata: TMetadata;
}
