import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseProfileModel {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  phoneNumber: string;

  @Expose()
  @ApiProperty({ nullable: true, required: false })
  avatar?: string;

  @Expose()
  @ApiProperty()
  birthdate: Date;
}
