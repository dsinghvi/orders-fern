import { OrderDto } from "./OrderDto";

export interface ProblemDetails {
  uid: string | null | undefined;
  createdAt: string | null | undefined;
  pageIndex: number | null | undefined;
  totalPages: number | null | undefined;
  totalItems: number | null | undefined;
  items: OrderDto[] | null | undefined;
  type: string | null | undefined;
  title: string | null | undefined;
  status: number | null | undefined;
  detail: string | null | undefined;
  instance: string | null | undefined;
}
