export interface Pageable<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  next?: string;
  previous?: string;
  items: T[]
}