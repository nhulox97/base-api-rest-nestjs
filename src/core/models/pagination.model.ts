import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationModel {
  @ApiProperty()
  @Expose()
  page: number;
  @ApiProperty()
  @Expose()
  limit: number;
  @ApiProperty()
  @Expose()
  totalPages: number;
  @ApiProperty()
  @Expose()
  totalItems: number;
  @ApiProperty({ required: false })
  @Expose()
  nextPage?: number;
  @ApiProperty({ required: false })
  @Expose()
  previousPage?: number;
}
