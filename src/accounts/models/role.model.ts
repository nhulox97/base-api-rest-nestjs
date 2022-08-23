import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RoleModel {
  @Expose()
  @ApiProperty({ required: false })
  id?: number;

  @Expose()
  @ApiProperty()
  name: string;
}
