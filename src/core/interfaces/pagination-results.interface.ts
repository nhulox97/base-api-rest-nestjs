import { PaginationModel } from '../models/pagination.model';

export interface PaginationResultInterface<T> {
  data: T;
  pagination?: PaginationModel;
}
