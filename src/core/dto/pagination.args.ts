import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationArgs {
  @ApiProperty({ type: Number, required: false, default: 1 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  page?: number = 1; // Default value

  @ApiProperty({ type: Number, required: false, default: 10 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  limit?: number = 10; // Default value
}
